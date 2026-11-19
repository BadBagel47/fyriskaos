// The game layer on top of the simulation (F-005, F-011, F-023): money,
// wanted stars, health, health centres, police, pedestrians and the first
// mission. Pure logic; the renderer and the HUD read the state.

import { VEHICLES } from './config.js';

const POLICE_SPEC = { ...VEHICLES.car, name: 'Polisbil', maxSpeed: 28, accel: 10.5 };
const START_MONEY = 500;
const CARE_COST = 100;
const FINE = 200;
const SHIRTS = [0x3a6ea5, 0xb5443a, 0x4f8a4a, 0xd9a43a, 0x6a4a8a, 0x2f2f33, 0xe8e2d4, 0x3a8a8a];

export function createPlay(game) {
  const map = game.map;
  const G = map.G;
  const P = map.places;
  const walkable = (t) => t === G.sidewalk || t === G.slab || t === G.path || t === G.deck;
  const passable = (t) => t !== 0 && t !== G.building && t !== G.water;
  const state = {
    money: START_MONEY,
    stars: 0,
    health: 100,
    peds: [],
    police: [],
    mission: null,
    target: null,
    phone: null, // { from, text, until }
    ticket: 0, // seconds left showing the queue ticket (kölapp)
    calm: 0, // seconds with no police near
    seen: 0, // seconds a police car has been close to a slow player
    bustedFor: 0,
  };
  game.play = state;

  // Three police cars wait at the police station.
  for (let i = 0; i < 3; i++) {
    const v = {
      id: `police${i}`,
      kind: 'vehicle',
      type: 'car',
      spec: POLICE_SPEC,
      police: true,
      x: P.polis[0] + i * 6,
      y: P.polis[1] + 4,
      heading: 0,
      vx: 0,
      vy: 0,
      color: 0xf4f4f2,
      driver: null,
      reversing: false,
      grip: POLICE_SPEC.grip,
      handbrake: false,
      mass: POLICE_SPEC.mass,
      awake: false,
      ai: null,
    };
    game.vehicles.push(v);
    state.police.push(v);
  }

  const say = (text) => game.events.push({ type: 'toast', text });
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const player = game.player;
  const R = (() => {
    let a = 12345;
    return () => ((a = (a * 16807) % 2147483647) / 2147483647);
  })();

  // ---------- respawn, health centre and arrest ----------
  function leaveVehicle() {
    const v = player.vehicle;
    if (!v) return;
    v.driver = null;
    v.vx = v.vy = 0;
    player.vehicle = null;
  }
  function placePlayer([x, y]) {
    leaveVehicle();
    Object.assign(player, { x, y, vx: 0, vy: 0, stun: 0 });
  }
  function clearWanted() {
    state.stars = 0;
    state.calm = 0;
    state.seen = 0;
    state.police.forEach((v, i) => {
      v.ai = null;
      Object.assign(v, { x: P.polis[0] + i * 6, y: P.polis[1] + 4, vx: 0, vy: 0, heading: 0, awake: false });
    });
  }
  function die() {
    const near = P.vardcentraler.reduce((b, c) => (Math.hypot(c[0] - player.x, c[1] - player.y) < Math.hypot(b[0] - player.x, b[1] - player.y) ? c : b));
    placePlayer(near);
    state.money = Math.max(0, state.money - CARE_COST);
    state.health = 100;
    clearWanted();
    state.ticket = 4;
    say(`Vårdcentralen tog ${CARE_COST} kr.`);
    if (state.mission && state.mission.step === 'deliver') failMission('Mackorna blev kvar på olycksplatsen.');
  }
  function arrest() {
    placePlayer(P.polis);
    state.money = Math.max(0, state.money - FINE);
    clearWanted();
    say(`Gripen! Böter: ${FINE} kr.`);
    if (state.mission && state.mission.step === 'deliver') failMission('Polisen beslagtog nattmackorna.');
  }
  function wanted(n, why) {
    const before = state.stars;
    state.stars = Math.min(3, state.stars + n);
    state.calm = 0;
    if (state.stars > before) say(`${why} Efterlyst: ${'★'.repeat(state.stars)}`);
  }

  // ---------- the first mission: night sandwiches (from the design) ----------
  function offerMission() {
    state.mission = { step: 'pickup', sandwiches: 0, time: 0 };
    state.phone = { from: 'Punschbergs nation', text: 'Sittningen har slut på nattmackor! Hämta 12 mackor på Mackbaren och kör hit innan sittningen slutar. Swosh: 300 kr.', until: game.time + 9 };
  }
  function failMission(why) {
    say(`Uppdraget misslyckades. ${why}`);
    state.mission = { step: 'retry', at: game.time + 8 };
  }
  function updateMission(dt) {
    const m = state.mission;
    if (!m) {
      if (game.time > 4) offerMission();
      return;
    }
    if (m.step === 'retry') {
      if (game.time > m.at) offerMission();
      return;
    }
    const slow = (player.vehicle ? Math.hypot(player.vehicle.vx, player.vehicle.vy) : 0) < 4;
    const near = (p, r) => Math.hypot(player.x - p[0], player.y - p[1]) < r;
    if (m.step === 'pickup') {
      state.target = { x: P.kiosk[0], y: P.kiosk[1], label: 'Mackbaren' };
      if (near(P.kiosk, 5) && slow) {
        m.step = 'deliver';
        m.sandwiches = 12;
        m.time = 120;
        m.goal = P.nation;
        m.label = 'Punschbergs nation';
        m.twisted = false;
        say('Du hämtade 12 nattmackor. Kör försiktigt: varje krock tappar en macka.');
      }
    } else if (m.step === 'deliver') {
      m.time -= dt;
      state.target = { x: m.goal[0], y: m.goal[1], label: m.label };
      if (m.time <= 0) return failMission('Sittningen tog slut.');
      if (m.sandwiches < 6) return failMission('För få mackor kvar.');
      if (near(m.goal, 6) && slow) {
        if (!m.twisted) {
          // The twist: the customer lied about the place.
          m.twisted = true;
          m.goal = P.slottsgard || P.slottet;
          m.label = 'Slottet';
          m.time += 50;
          state.phone = { from: 'Punschbergs nation', text: 'Haha, fel ställe! Sittningen flyttade till Slottet. Skynda!', until: game.time + 7 };
          return;
        }
        const pay = 300 + (m.sandwiches - 6) * 20;
        state.money += pay;
        say(`Levererat! ${m.sandwiches} mackor. Swosh: +${pay} kr.`);
        state.mission = { step: 'done' };
        state.target = null;
      }
    }
  }

  // ---------- pedestrians on the sidewalks ----------
  function spawnPed() {
    for (let tries = 0; tries < 30; tries++) {
      const a = R() * Math.PI * 2;
      const d = 25 + R() * 50;
      const x = player.x + Math.cos(a) * d;
      const y = player.y + Math.sin(a) * d;
      if (!walkable(map.cellAt(x, y))) continue;
      return { x, y, heading: Math.floor(R() * 4) * (Math.PI / 2), speed: 1.1 + R() * 0.6, kind: Math.floor(R() * 2), stand: R() < 0.2, shirt: SHIRTS[Math.floor(R() * SHIRTS.length)], down: 0, turn: 0 };
    }
    return null;
  }
  function updatePeds(dt) {
    while (state.peds.length < 34) {
      const p = spawnPed();
      if (!p) break;
      state.peds.push(p);
    }
    const v = player.vehicle;
    const vs = v ? Math.hypot(v.vx, v.vy) : 0;
    for (let i = state.peds.length - 1; i >= 0; i--) {
      const p = state.peds[i];
      if (dist(p, player) > 95) {
        state.peds.splice(i, 1);
        continue;
      }
      if (p.down > 0) {
        p.down -= dt;
        if (p.down <= 0) p.speed = 3; // get up and hurry off
        continue;
      }
      // Hit by the player's vehicle.
      if (v && vs > 3 && Math.hypot(p.x - v.x, p.y - v.y) < v.spec.length / 2 + 0.4) {
        p.down = 5;
        p.heading = Math.atan2(v.vy, v.vx);
        p.x += Math.cos(p.heading) * 1.2;
        p.y += Math.sin(p.heading) * 1.2;
        wanted(1, 'Du körde på någon!');
        continue;
      }
      if (p.stand) continue;
      const nx = p.x + Math.cos(p.heading) * p.speed * dt;
      const ny = p.y + Math.sin(p.heading) * p.speed * dt;
      const ahead = map.cellAt(p.x + Math.cos(p.heading) * 1.2, p.y + Math.sin(p.heading) * 1.2);
      if (!walkable(ahead)) p.heading += (R() < 0.5 ? 1 : -1) * (Math.PI / 2) * (R() < 0.2 ? 2 : 1);
      else {
        p.x = nx;
        p.y = ny;
      }
    }
  }

  // ---------- police: a distance field over the streets to the player ----------
  const FIELD = 2; // metres per field cell
  const SPAN = 160; // field cells across (320 m)
  const field = new Float32Array(SPAN * SPAN);
  let fx0 = 0;
  let fy0 = 0;
  let fieldAt = -1;
  function buildField() {
    fx0 = Math.floor(player.x / FIELD) - SPAN / 2;
    fy0 = Math.floor(player.y / FIELD) - SPAN / 2;
    field.fill(Infinity);
    const q = new Int32Array(SPAN * SPAN);
    let head = 0;
    let tail = 0;
    const s = (SPAN / 2) * SPAN + SPAN / 2;
    field[s] = 0;
    q[tail++] = s;
    while (head < tail) {
      const c = q[head++];
      const cx = c % SPAN;
      const cy = (c - cx) / SPAN;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const x = cx + dx;
        const y = cy + dy;
        if (x < 0 || y < 0 || x >= SPAN || y >= SPAN) continue;
        const n = y * SPAN + x;
        if (field[n] !== Infinity) continue;
        if (!passable(map.cellAt((fx0 + x + 0.5) * FIELD, (fy0 + y + 0.5) * FIELD))) continue;
        field[n] = field[c] + 1;
        q[tail++] = n;
      }
    }
    fieldAt = game.time;
  }
  const fieldValue = (x, y) => {
    const cx = Math.floor(x / FIELD) - fx0;
    const cy = Math.floor(y / FIELD) - fy0;
    return cx < 0 || cy < 0 || cx >= SPAN || cy >= SPAN ? Infinity : field[cy * SPAN + cx];
  };
  function spawnPolice(v) {
    for (let tries = 0; tries < 60; tries++) {
      const a = R() * Math.PI * 2;
      const d = 75 + R() * 40;
      const x = player.x + Math.cos(a) * d;
      const y = player.y + Math.sin(a) * d;
      if (map.cellAt(x, y) !== G.road || fieldValue(x, y) === Infinity) continue;
      Object.assign(v, { x, y, vx: 0, vy: 0, heading: a + Math.PI, awake: true, stuck: 0, backUp: 0 });
      v.ai = { steer: 'screen', stick: { x: 0, y: 0, m: 0 }, brake: false };
      return;
    }
  }
  function drivePolice(v, dt) {
    const d = dist(v, player);
    let tx = player.x - v.x;
    let ty = player.y - v.y;
    if (d > 9) {
      // Downhill in the distance field, looking a few cells ahead.
      let best = fieldValue(v.x, v.y);
      let bx = 0;
      let by = 0;
      for (let a = 0; a < 16; a++) {
        const ang = (a / 16) * Math.PI * 2;
        const val = fieldValue(v.x + Math.cos(ang) * 6, v.y + Math.sin(ang) * 6);
        if (val < best) {
          best = val;
          bx = Math.cos(ang);
          by = Math.sin(ang);
        }
      }
      if (bx || by) {
        tx = bx;
        ty = by;
      }
    }
    const l = Math.hypot(tx, ty) || 1;
    const speed = Math.hypot(v.vx, v.vy);
    // Unstick: back away for a moment.
    v.stuck = speed < 1 && d > 10 ? v.stuck + dt : 0;
    if (v.stuck > 1.5) v.backUp = 1;
    if (v.backUp > 0) {
      v.backUp -= dt;
      v.ai.stick = { x: -Math.cos(v.heading), y: -Math.sin(v.heading), m: 1 };
      return;
    }
    const m = d < 9 ? 0.45 : 1;
    v.ai.stick = { x: tx / l, y: ty / l, m };
    v.ai.brake = d < 6 && speed > 4;
  }
  function updatePolice(dt) {
    const active = state.police.filter((v) => v.ai);
    const want = state.stars;
    for (const v of state.police) if (!v.ai && active.length < want) {
      if (game.time - fieldAt > 0.5) buildField();
      spawnPolice(v);
      if (v.ai) active.push(v);
    }
    if (!active.length) return;
    if (game.time - fieldAt > 0.6) buildField();
    let close = false;
    for (const v of active) {
      drivePolice(v, dt);
      if (dist(v, player) < 70) close = true;
    }
    // Caught: a police car next to a player who has (nearly) stopped.
    const ps = player.vehicle ? Math.hypot(player.vehicle.vx, player.vehicle.vy) : Math.hypot(player.vx, player.vy);
    state.seen = active.some((v) => dist(v, player) < 5) && ps < 1.5 ? state.seen + dt : 0;
    if (state.seen > 2) return arrest();
    // Lost them: no police near for a while lowers the wanted level.
    state.calm = close ? 0 : state.calm + dt;
    if (state.calm > 14) {
      state.stars -= 1;
      state.calm = 0;
      say(state.stars ? `Efterlyst: ${'★'.repeat(state.stars)}` : 'Polisen tappade bort dig.');
      if (!state.stars) clearWanted();
      else {
        const v = active.pop();
        v.ai = null;
        Object.assign(v, { x: P.polis[0], y: P.polis[1] + 4, vx: 0, vy: 0, awake: false });
      }
    }
  }

  // ---------- each fixed step ----------
  function step(dt, events) {
    for (const ev of events) {
      if (ev.type === 'hurt') state.health -= ev.amount;
      if (ev.type === 'policeBump') wanted(1, 'Du rammade en polisbil!');
      if (ev.type === 'crash' && state.mission && state.mission.step === 'deliver' && state.mission.sandwiches > 0 && game.time - (state.mission.lastDrop || 0) > 0.6) {
        state.mission.sandwiches -= 1;
        state.mission.lastDrop = game.time;
        say(`En macka flög ut! ${state.mission.sandwiches} kvar.`);
      }
      if (ev.type === 'crash' && ev.speed > 14) state.health -= (ev.speed - 14) * 3;
    }
    if (state.health <= 0) die();
    if (state.ticket > 0) state.ticket -= dt;
    // Slowly heal while nothing happens.
    if (state.health < 100) state.health = Math.min(100, state.health + dt * 1.5);
    updateMission(dt);
    updatePeds(dt);
    updatePolice(dt);
    if (state.phone && game.time > state.phone.until) state.phone = null;
  }
  return { state, step };
}
