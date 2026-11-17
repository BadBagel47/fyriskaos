// Game simulation: walking, cycling and driving, with collisions.
// Pure logic, no drawing, so it can later run on the co-op host only.

import { PERSON, VEHICLES } from './config.js';

const TAU = Math.PI * 2;
const DEADZONE = 0.12;

export function wrapAngle(a) {
  a = (a + Math.PI) % TAU;
  if (a < 0) a += TAU;
  return a - Math.PI;
}

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

export function createGame(map) {
  const s = map.spawns.player;
  const player = {
    id: 'p1',
    kind: 'person',
    x: s.x,
    y: s.y,
    vx: 0,
    vy: 0,
    heading: s.heading,
    vehicle: null,
    stun: 0,
    mass: PERSON.mass,
  };
  const vehicles = [];
  map.spawns.bikes.forEach((b, i) => vehicles.push(makeVehicle('bike', b, i)));
  map.spawns.cars.forEach((c, i) => vehicles.push(makeVehicle('car', c, i)));
  const game = { map, player, vehicles, time: 0, events: [], shake: 0, grid: buildGrid(map) };
  return game;
}

function makeVehicle(type, s, i) {
  return {
    id: `${type}${i}`,
    kind: 'vehicle',
    type,
    spec: VEHICLES[type],
    x: s.x,
    y: s.y,
    heading: s.heading,
    vx: 0,
    vy: 0,
    color: s.color,
    driver: null,
    reversing: false,
    mass: VEHICLES[type].mass,
    awake: false,
  };
}

// ---------- static obstacles in a grid for quick lookups ----------

const CELL = 20;

function buildGrid(map) {
  const cols = Math.ceil(map.width / CELL);
  const rows = Math.ceil(map.height / CELL);
  const cells = Array.from({ length: cols * rows }, () => ({ rects: [], circles: [] }));
  const addRect = (r) => {
    for (let cx = Math.floor(r.x / CELL); cx <= Math.floor((r.x + r.w) / CELL); cx++)
      for (let cy = Math.floor(r.y / CELL); cy <= Math.floor((r.y + r.h) / CELL); cy++)
        if (cx >= 0 && cy >= 0 && cx < cols && cy < rows) cells[cy * cols + cx].rects.push(r);
  };
  map.buildings.forEach(addRect);
  map.water.forEach(addRect);
  for (const t of map.trees) {
    const cx = Math.floor(t.x / CELL);
    const cy = Math.floor(t.y / CELL);
    if (cx >= 0 && cy >= 0 && cx < cols && cy < rows) cells[cy * cols + cx].circles.push(t);
  }
  return { cols, rows, cells };
}

function nearbyStatics(grid, x, y, out) {
  out.rects.length = 0;
  out.circles.length = 0;
  const cx = Math.floor(x / CELL);
  const cy = Math.floor(y / CELL);
  for (let i = cx - 1; i <= cx + 1; i++)
    for (let j = cy - 1; j <= cy + 1; j++) {
      if (i < 0 || j < 0 || i >= grid.cols || j >= grid.rows) continue;
      const c = grid.cells[j * grid.cols + i];
      for (const r of c.rects) if (!out.rects.includes(r)) out.rects.push(r);
      for (const t of c.circles) if (!out.circles.includes(t)) out.circles.push(t);
    }
  return out;
}

// ---------- bodies ----------

export function bodyCircles(e) {
  if (e.kind === 'person') return [{ x: e.x, y: e.y, r: PERSON.radius }];
  const fx = Math.cos(e.heading);
  const fy = Math.sin(e.heading);
  return e.spec.circles.map((c) => ({ x: e.x + fx * c.o, y: e.y + fy * c.o, r: c.r }));
}

function boundRadius(e) {
  return e.kind === 'person' ? PERSON.radius : e.spec.length / 2 + 0.2;
}

function circleRect(cx, cy, r, rect) {
  const px = clamp(cx, rect.x, rect.x + rect.w);
  const py = clamp(cy, rect.y, rect.y + rect.h);
  const dx = cx - px;
  const dy = cy - py;
  const d2 = dx * dx + dy * dy;
  if (d2 >= r * r) return null;
  if (d2 > 1e-9) {
    const d = Math.sqrt(d2);
    return { nx: dx / d, ny: dy / d, pen: r - d };
  }
  // Centre inside the rectangle: push out through the nearest side.
  const left = cx - rect.x;
  const right = rect.x + rect.w - cx;
  const top = cy - rect.y;
  const bottom = rect.y + rect.h - cy;
  const m = Math.min(left, right, top, bottom);
  if (m === left) return { nx: -1, ny: 0, pen: left + r };
  if (m === right) return { nx: 1, ny: 0, pen: right + r };
  if (m === top) return { nx: 0, ny: -1, pen: top + r };
  return { nx: 0, ny: 1, pen: bottom + r };
}

const scratch = { rects: [], circles: [] };

// Push a body out of walls, water, trees and the map edge.
// Returns the hardest impact speed (m/s) and its normal.
function resolveStatics(game, e) {
  const map = game.map;
  let impact = 0;
  let inx = 0;
  let iny = 0;
  for (let pass = 0; pass < 2; pass++) {
    const circles = bodyCircles(e);
    for (const c of circles) {
      const near = nearbyStatics(game.grid, c.x, c.y, scratch);
      const hits = [];
      for (const r of near.rects) {
        const h = circleRect(c.x, c.y, c.r, r);
        if (h) hits.push(h);
      }
      for (const t of near.circles) {
        const dx = c.x - t.x;
        const dy = c.y - t.y;
        const d = Math.hypot(dx, dy);
        const min = c.r + t.r;
        if (d < min && d > 1e-6) hits.push({ nx: dx / d, ny: dy / d, pen: min - d });
      }
      if (c.x - c.r < 0) hits.push({ nx: 1, ny: 0, pen: c.r - c.x });
      if (c.y - c.r < 0) hits.push({ nx: 0, ny: 1, pen: c.r - c.y });
      if (c.x + c.r > map.width) hits.push({ nx: -1, ny: 0, pen: c.x + c.r - map.width });
      if (c.y + c.r > map.height) hits.push({ nx: 0, ny: -1, pen: c.y + c.r - map.height });
      for (const h of hits) {
        e.x += h.nx * h.pen;
        e.y += h.ny * h.pen;
        c.x += h.nx * h.pen;
        c.y += h.ny * h.pen;
        const vn = e.vx * h.nx + e.vy * h.ny;
        if (vn < 0) {
          if (-vn > impact) {
            impact = -vn;
            inx = h.nx;
            iny = h.ny;
          }
          const bounce = e.kind === 'person' ? 1 : 1.2;
          e.vx -= bounce * vn * h.nx;
          e.vy -= bounce * vn * h.ny;
          if (e.kind === 'vehicle' && -vn > 2) {
            // Scraping along a wall slows you down.
            e.vx *= 0.85;
            e.vy *= 0.85;
          }
        }
      }
    }
  }
  return { impact, nx: inx, ny: iny };
}

// Bodies pushing each other (player on foot, all vehicles).
function resolvePair(game, a, b) {
  const rr = boundRadius(a) + boundRadius(b);
  if (Math.abs(a.x - b.x) > rr || Math.abs(a.y - b.y) > rr) return;
  const ca = bodyCircles(a);
  const cb = bodyCircles(b);
  for (const p of ca)
    for (const q of cb) {
      const dx = q.x - p.x;
      const dy = q.y - p.y;
      const d = Math.hypot(dx, dy);
      const min = p.r + q.r;
      if (d >= min || d < 1e-6) continue;
      const nx = dx / d;
      const ny = dy / d;
      const pen = min - d;
      const ia = 1 / a.mass;
      const ib = 1 / b.mass;
      const sum = ia + ib;
      a.x -= nx * pen * (ia / sum);
      a.y -= ny * pen * (ia / sum);
      b.x += nx * pen * (ib / sum);
      b.y += ny * pen * (ib / sum);
      const rel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
      if (rel < 0) {
        const j = (-(1.2) * rel) / sum;
        a.vx -= (j * ia) * nx;
        a.vy -= (j * ia) * ny;
        b.vx += (j * ib) * nx;
        b.vy += (j * ib) * ny;
        a.awake = true;
        b.awake = true;
        onBump(game, a, b, -rel);
      }
    }
}

function onBump(game, a, b, speed) {
  const p = game.player;
  const walker = !p.vehicle && (a === p || b === p);
  if (walker && speed > 5 && p.stun <= 0) {
    p.stun = 1.0;
    toast(game, 'Påkörd! Titta åt båda hållen nästa gång.');
  }
  for (const v of [a, b]) {
    if (v.kind === 'vehicle' && v.driver && v.type === 'bike' && speed > v.spec.fallImpact) {
      const other = v === a ? b : a;
      const nx = v.x - other.x;
      const ny = v.y - other.y;
      const d = Math.hypot(nx, ny) || 1;
      fallOff(game, v, nx / d, ny / d);
    }
  }
  if (p.vehicle && (a === p.vehicle || b === p.vehicle) && speed > 6) game.shake = Math.min(1, speed / 15);
}

// ---------- controls ----------

function walk(p, input, dt) {
  const s = p.stun > 0 ? { x: 0, y: 0, m: 0 } : input.stick;
  const speed = PERSON.walkSpeed * (s.m > DEADZONE ? s.m : 0);
  const tx = s.m > DEADZONE ? (s.x / s.m) * speed : 0;
  const ty = s.m > DEADZONE ? (s.y / s.m) * speed : 0;
  const k = Math.min(1, (p.stun > 0 ? 4 : PERSON.response) * dt);
  p.vx += (tx - p.vx) * k;
  p.vy += (ty - p.vy) * k;
  if (Math.hypot(p.vx, p.vy) > 0.3 && p.stun <= 0) p.heading = Math.atan2(p.vy, p.vx);
}

function onGrass(game, x, y) {
  for (const g of game.map.grass) if (x >= g.x && x <= g.x + g.w && y >= g.y && y <= g.y + g.h) {
    for (const r of game.map.paths) if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) return false;
    return true;
  }
  return false;
}

// Drag the stick where you want to go: the vehicle turns there and
// accelerates by itself. Pull the opposite way while (almost) stopped to reverse.
function drive(game, v, input, dt) {
  const spec = v.spec;
  const fx = Math.cos(v.heading);
  const fy = Math.sin(v.heading);
  let vF = v.vx * fx + v.vy * fy;
  let vR = -v.vx * fy + v.vy * fx;
  const s = input.stick;
  const active = s.m > DEADZONE;
  const target = Math.atan2(s.y, s.x);
  const d = wrapAngle(target - v.heading);
  const grassFactor = onGrass(game, v.x, v.y) ? spec.grassFactor : 1;
  const maxF = spec.maxSpeed * grassFactor;

  if (!active) v.reversing = false;
  else if (!v.reversing && Math.abs(d) > 2.3 && vF < 2) v.reversing = true;
  else if (v.reversing && Math.abs(d) < 1.4) v.reversing = false;

  let throttle = 0;
  let steer = 0;
  if (active) {
    if (v.reversing) {
      const dr = wrapAngle(target + Math.PI - v.heading);
      steer = clamp(dr * spec.steerGain, -1, 1);
      throttle = -s.m;
    } else {
      steer = clamp(d * spec.steerGain, -1, 1);
      throttle = s.m * (0.3 + 0.7 * Math.max(0, Math.cos(d)));
    }
  }

  if (input.brake) {
    const dv = spec.brake * dt;
    if (vF > 0) vF = Math.max(0, vF - dv);
    else vF = Math.min(0, vF + dv);
  } else if (throttle > 0) {
    if (vF < maxF) vF = Math.min(maxF, vF + spec.accel * throttle * dt);
    else vF -= (vF - maxF) * Math.min(1, 2 * dt);
    if (vF < 0) vF = Math.min(0, vF + spec.brake * dt);
  } else if (throttle < 0) {
    if (vF > 0) vF = Math.max(0, vF - spec.brake * dt);
    else vF = Math.max(-spec.reverseSpeed, vF + spec.accel * throttle * 0.6 * dt);
  } else {
    const dv = spec.coast * dt;
    vF = vF > 0 ? Math.max(0, vF - dv) : Math.min(0, vF + dv);
  }
  vF -= vF * spec.drag * dt;
  if (grassFactor < 1 && Math.abs(vF) > maxF) vF -= (vF - Math.sign(vF) * maxF) * Math.min(1, 3 * dt);
  vR *= Math.exp(-spec.grip * dt);

  v.vx = fx * vF - fy * vR;
  v.vy = fy * vF + fx * vR;

  const speedFactor = clamp(Math.abs(vF) / spec.turnRefSpeed, spec.minTurn, 1);
  const highFactor = 1 - 0.35 * clamp(Math.abs(vF) / spec.maxSpeed, 0, 1);
  v.heading = wrapAngle(v.heading + steer * spec.turnRate * speedFactor * highFactor * dt);
}

function coast(v, dt) {
  // Vehicles without a driver roll to a stop.
  const fx = Math.cos(v.heading);
  const fy = Math.sin(v.heading);
  let vF = v.vx * fx + v.vy * fy;
  let vR = -v.vx * fy + v.vy * fx;
  const dv = v.spec.brake * 0.4 * dt;
  vF = vF > 0 ? Math.max(0, vF - dv) : Math.min(0, vF + dv);
  vR *= Math.exp(-v.spec.grip * dt);
  v.vx = fx * vF - fy * vR;
  v.vy = fy * vF + fx * vR;
  if (Math.abs(v.vx) + Math.abs(v.vy) < 0.01) {
    v.vx = 0;
    v.vy = 0;
    v.awake = false;
  }
}

// ---------- smart button ----------

export function nearestVehicle(game) {
  const p = game.player;
  let best = null;
  let bestD = PERSON.reach;
  for (const v of game.vehicles) {
    if (v.driver) continue;
    for (const c of bodyCircles(v)) {
      const d = Math.hypot(c.x - p.x, c.y - p.y) - c.r - PERSON.radius;
      if (d < bestD) {
        bestD = d;
        best = v;
      }
    }
  }
  return best;
}

export function actionLabel(game) {
  const p = game.player;
  if (p.stun > 0) return null;
  if (p.vehicle) return p.vehicle.spec.label.exit;
  const v = nearestVehicle(game);
  return v ? v.spec.label.enter : null;
}

function doAction(game) {
  const p = game.player;
  if (p.stun > 0) return;
  if (p.vehicle) {
    exitVehicle(game, p.vehicle);
    return;
  }
  const v = nearestVehicle(game);
  if (!v) return;
  p.vehicle = v;
  v.driver = p;
  v.reversing = false;
  v.awake = true;
  p.vx = 0;
  p.vy = 0;
}

function placeFree(game, x, y) {
  const probe = { kind: 'person', x, y, vx: 0, vy: 0 };
  const near = nearbyStatics(game.grid, x, y, { rects: [], circles: [] });
  for (const r of near.rects) if (circleRect(x, y, PERSON.radius + 0.05, r)) return false;
  for (const t of near.circles) if (Math.hypot(t.x - x, t.y - y) < t.r + PERSON.radius) return false;
  for (const v of game.vehicles) {
    if (v === game.player.vehicle) continue;
    for (const c of bodyCircles(v)) if (Math.hypot(c.x - probe.x, c.y - probe.y) < c.r + PERSON.radius) return false;
  }
  return x > 0.5 && y > 0.5 && x < game.map.width - 0.5 && y < game.map.height - 0.5;
}

function exitVehicle(game, v) {
  const p = game.player;
  const fx = Math.cos(v.heading);
  const fy = Math.sin(v.heading);
  const side = v.spec.width / 2 + PERSON.radius + 0.2;
  const back = v.spec.length / 2 + PERSON.radius + 0.2;
  const options = [
    [fy * side, -fx * side], // left
    [-fy * side, fx * side], // right
    [-fx * back, -fy * back], // behind
    [fx * back, fy * back], // in front
  ];
  let spot = null;
  for (const [ox, oy] of options) {
    if (placeFree(game, v.x + ox, v.y + oy)) {
      spot = [v.x + ox, v.y + oy];
      break;
    }
  }
  if (!spot) {
    toast(game, 'Det går inte att kliva ur här.');
    return;
  }
  const speed = Math.hypot(v.vx, v.vy);
  p.vehicle = null;
  v.driver = null;
  p.x = spot[0];
  p.y = spot[1];
  p.heading = v.heading;
  if (speed > 4) {
    p.vx = v.vx * 0.4;
    p.vy = v.vy * 0.4;
    p.stun = 0.8;
    toast(game, v.type === 'bike' ? 'Du hoppade av i farten.' : 'Du kastade dig ut ur bilen. Snyggt.');
  } else {
    p.vx = 0;
    p.vy = 0;
  }
}

function fallOff(game, bike, nx, ny) {
  const p = game.player;
  if (p.vehicle !== bike) return;
  p.vehicle = null;
  bike.driver = null;
  let x = bike.x + nx * 1.1;
  let y = bike.y + ny * 1.1;
  if (!placeFree(game, x, y)) {
    x = bike.x;
    y = bike.y;
  }
  p.x = x;
  p.y = y;
  p.vx = nx * 2;
  p.vy = ny * 2;
  p.stun = 1.2;
  bike.vx *= 0.3;
  bike.vy *= 0.3;
  game.shake = 0.6;
  toast(game, 'Aj! Du ramlade av cykeln.');
}

function toast(game, text) {
  game.events.push({ type: 'toast', text });
}

// ---------- one fixed step ----------

export function step(game, input, dt) {
  game.time += dt;
  const p = game.player;
  if (input.consumeAction()) doAction(game);

  if (p.vehicle) drive(game, p.vehicle, input, dt);
  else walk(p, input, dt);

  for (const v of game.vehicles) if (!v.driver && v.awake) coast(v, dt);

  const movers = [];
  if (!p.vehicle) movers.push(p);
  for (const v of game.vehicles) if (v.driver || v.awake) movers.push(v);

  for (const m of movers) {
    m.x += m.vx * dt;
    m.y += m.vy * dt;
  }

  // Moving bodies against everything else.
  const bodies = p.vehicle ? game.vehicles : [p, ...game.vehicles];
  for (const m of movers)
    for (const o of bodies) if (o !== m && (!movers.includes(o) || movers.indexOf(o) > movers.indexOf(m))) resolvePair(game, m, o);

  for (const m of [...movers, ...game.vehicles.filter((v) => v.awake && !movers.includes(v))]) {
    const hit = resolveStatics(game, m);
    if (m.kind === 'vehicle' && m.driver && hit.impact > 0) {
      if (m.type === 'bike' && hit.impact > m.spec.fallImpact) fallOff(game, m, hit.nx, hit.ny);
      else if (hit.impact > 6) game.shake = Math.min(1, hit.impact / 15);
    }
  }

  if (p.vehicle) {
    p.x = p.vehicle.x;
    p.y = p.vehicle.y;
    p.heading = p.vehicle.heading;
  }
  if (p.stun > 0) p.stun = Math.max(0, p.stun - dt);
  game.shake = Math.max(0, game.shake - dt * 2);
}

export function speedOf(e) {
  return Math.hypot(e.vx, e.vy);
}
