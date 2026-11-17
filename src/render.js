// Drawing with PixiJS. The world is drawn in "units" (U px per metre)
// and the whole world container is scaled to fit the screen.

import { Container, Graphics } from '../vendor/pixi/pixi.min.mjs';
import { COLORS } from './config.js';
import { speedOf } from './sim.js';

const U = 16;
const LEAN = 0.009; // how far roofs lean away from the camera, per metre of height and distance

export function createRenderer(app, game) {
  const world = new Container();
  app.stage.addChild(world);

  const ground = new Graphics();
  drawGround(ground, game.map);
  world.addChild(ground);

  const shadows = new Graphics();
  world.addChild(shadows);
  const entityLayer = new Container();
  world.addChild(entityLayer);
  const buildings = new Graphics();
  world.addChild(buildings);

  const views = new Map();
  for (const v of game.vehicles) {
    const view = v.type === 'car' ? carView(v.color) : bikeView(v.color);
    views.set(v, view);
    entityLayer.addChild(view);
  }
  const playerView = personView(COLORS.player, COLORS.playerHead);
  entityLayer.addChild(playerView);

  const cam = { x: game.player.x, y: game.player.y, ppm: 0 };

  function targetPpm() {
    const p = game.player;
    const short = Math.min(app.screen.width, app.screen.height);
    let metres = 17; // visible metres across the short side of the screen, on foot
    if (p.vehicle) {
      const s = speedOf(p.vehicle);
      metres = p.vehicle.type === 'car' ? 26 + s * 0.9 : 20 + s * 0.6;
    }
    return short / metres;
  }

  function frame(dt) {
    const p = game.player;
    const focus = p.vehicle || p;
    const look = p.vehicle ? 0.7 : 0.25;
    let tx = focus.x + focus.vx * look;
    let ty = focus.y + focus.vy * look;
    const k = 1 - Math.exp(-6 * dt);
    if (cam.ppm === 0) {
      cam.ppm = targetPpm();
      cam.x = tx;
      cam.y = ty;
    }
    cam.x += (tx - cam.x) * k;
    cam.y += (ty - cam.y) * k;
    cam.ppm += (targetPpm() - cam.ppm) * (1 - Math.exp(-2 * dt));

    let sx = 0;
    let sy = 0;
    if (game.shake > 0) {
      sx = (Math.random() - 0.5) * game.shake * 10;
      sy = (Math.random() - 0.5) * game.shake * 10;
    }
    const scale = cam.ppm / U;
    world.scale.set(scale);
    world.position.set(app.screen.width / 2 - cam.x * cam.ppm + sx, app.screen.height / 2 - cam.y * cam.ppm + sy);

    // Visible area in metres, with a margin for leaning roofs.
    const halfW = app.screen.width / 2 / cam.ppm + 12;
    const halfH = app.screen.height / 2 / cam.ppm + 12;
    const vis = (x, y, r = 0) => Math.abs(x - cam.x) < halfW + r && Math.abs(y - cam.y) < halfH + r;

    shadows.clear();
    for (const v of game.vehicles) {
      const view = views.get(v);
      const on = vis(v.x, v.y, 3);
      view.visible = on;
      if (!on) continue;
      view.position.set(v.x * U, v.y * U);
      view.rotation = v.heading;
    }

    playerView.visible = !(p.vehicle && p.vehicle.type === 'car');
    playerView.position.set(p.x * U, p.y * U);
    playerView.rotation = p.heading;
    // Knocked over: the figure lies flat and blinks.
    playerView.scale.set(p.stun > 0 ? 1.25 : 1, p.stun > 0 ? 0.6 : 1);
    playerView.alpha = p.stun > 0 && Math.floor(game.time * 10) % 2 ? 0.55 : 1;
    entityLayer.setChildIndex(playerView, entityLayer.children.length - 1);

    drawBuildings(buildings, game.map, cam, vis);
  }

  return { frame, cam };
}

// ---------- static ground ----------

function rect(g, r, color, grow = 0) {
  g.rect((r.x - grow) * U, (r.y - grow) * U, (r.w + grow * 2) * U, (r.h + grow * 2) * U).fill(color);
}

function drawGround(g, map) {
  g.rect(-2000 * U, -2000 * U, (map.width + 4000) * U, (map.height + 4000) * U).fill(COLORS.outside);
  g.rect(0, 0, map.width * U, map.height * U).fill(COLORS.sidewalk);
  for (const gr of map.grass) rect(g, gr, COLORS.grass);
  for (const p of map.paths) rect(g, p, COLORS.path);

  // River with darker edges.
  const ry0 = map.water[0].y;
  const ry1 = ry0 + map.water[0].h;
  g.rect(0, (ry0 - 0.6) * U, map.width * U, (ry1 - ry0 + 1.2) * U).fill(COLORS.waterEdge);
  g.rect(0, ry0 * U, map.width * U, (ry1 - ry0) * U).fill(COLORS.water);

  for (const r of map.roads) rect(g, r, COLORS.curb, 0.35);
  for (const b of map.bridges) rect(g, b, COLORS.sidewalk);
  for (const r of map.roads) rect(g, r, COLORS.road);

  // Bridge railings.
  for (const b of map.bridges) {
    g.rect(b.x * U, b.y * U, 0.4 * U, b.h * U).fill(COLORS.bridgeRail);
    g.rect((b.x + b.w - 0.4) * U, b.y * U, 0.4 * U, b.h * U).fill(COLORS.bridgeRail);
  }

  // Dashed centre lines, not inside crossings.
  const e = map.edge;
  for (const r of map.roads) {
    if (r.dir === 'h') {
      for (let x = r.x + 2; x < r.x + r.w - 3; x += 6) {
        if (map.vRoads.some((c) => Math.abs(x + 1.5 - c) < e + 1)) continue;
        g.rect(x * U, (r.c - 0.12) * U, 3 * U, 0.24 * U).fill(COLORS.lane);
      }
    } else {
      for (let y = r.y + 2; y < r.y + r.h - 3; y += 6) {
        if (map.hRoads.some((c) => Math.abs(y + 1.5 - c) < e + 1)) continue;
        g.rect((r.c - 0.12) * U, y * U, 0.24 * U, 3 * U).fill(COLORS.lane);
      }
    }
  }

  // Zebra crossings at the edges of each crossing.
  const half = map.roadHalf;
  for (const vx of map.vRoads)
    for (const hy of map.hRoads) {
      const crosses = map.roads.some((r) => r.dir === 'v' && r.c === vx && hy > r.y && hy < r.y + r.h);
      if (!crosses) continue;
      for (const sgn of [-1, 1]) {
        for (let k = -half + 0.6; k < half - 0.4; k += 1.2) {
          g.rect((vx + sgn * (half + 1.2) - 0.9) * U, (hy + k) * U, 1.8 * U, 0.6 * U).fill(COLORS.lane);
          g.rect((vx + k) * U, (hy + sgn * (half + 1.2) - 0.9) * U, 0.6 * U, 1.8 * U).fill(COLORS.lane);
        }
      }
    }
}

// ---------- buildings that lean away from the camera ----------

function drawBuildings(g, map, cam, vis) {
  g.clear();
  const list = [];
  for (const b of map.buildings) {
    const cx = b.x + b.w / 2;
    const cy = b.y + b.h / 2;
    if (!vis(cx, cy, Math.max(b.w, b.h) / 2)) continue;
    list.push(b);
  }
  // Far buildings first, so near ones cover them.
  list.sort((a, b) => dist2(b, cam) - dist2(a, cam));
  for (const b of list) {
    const cx = b.x + b.w / 2;
    const cy = b.y + b.h / 2;
    const ox = (cx - cam.x) * LEAN * b.height;
    const oy = (cy - cam.y) * LEAN * b.height;
    const x0 = b.x;
    const y0 = b.y;
    const x1 = b.x + b.w;
    const y1 = b.y + b.h;
    const quad = (ax, ay, bx, by, color) =>
      g.poly([ax * U, ay * U, bx * U, by * U, (bx + ox) * U, (by + oy) * U, (ax + ox) * U, (ay + oy) * U]).fill(color);
    if (oy < 0) quad(x0, y1, x1, y1, COLORS.wallLight); // south wall, facing the camera
    if (oy > 0) quad(x0, y0, x1, y0, COLORS.wallDark);
    if (ox < 0) quad(x1, y0, x1, y1, COLORS.wallMid);
    if (ox > 0) quad(x0, y0, x0, y1, COLORS.wallMid);
    g.rect((x0 + ox) * U, (y0 + oy) * U, b.w * U, b.h * U).fill(COLORS.roof);
    const inset = 0.6;
    g.rect((x0 + ox + inset) * U, (y0 + oy + inset) * U, (b.w - inset * 2) * U, (b.h - inset * 2) * U).fill(COLORS.roofInset);
    // A roof hatch or two, so roofs are not completely flat.
    const hx = x0 + ox + 1.5 + b.seed * Math.max(0, b.w - 4);
    const hy = y0 + oy + 1.5 + ((b.seed * 7) % 1) * Math.max(0, b.h - 4);
    g.rect(hx * U, hy * U, 1.2 * U, 1.2 * U).fill(COLORS.wallMid);
  }
  for (const t of map.trees) {
    if (!vis(t.x, t.y, 4)) continue;
    const ox = (t.x - cam.x) * LEAN * 6;
    const oy = (t.y - cam.y) * LEAN * 6;
    g.circle((t.x + ox * 0.5) * U, (t.y + oy * 0.5) * U, t.canopy * U).fill({ color: COLORS.treeCanopy, alpha: 0.92 });
    g.circle((t.x + ox - t.canopy * 0.2) * U, (t.y + oy - t.canopy * 0.2) * U, t.canopy * 0.55 * U).fill({ color: COLORS.treeCanopyLight, alpha: 0.9 });
  }
}

function dist2(b, cam) {
  const dx = b.x + b.w / 2 - cam.x;
  const dy = b.y + b.h / 2 - cam.y;
  return dx * dx + dy * dy;
}

// ---------- vehicles and people (drawn facing +x) ----------

function carView(color) {
  const c = new Container();
  const g = new Graphics();
  g.roundRect(-2.2 * U + 3, -0.95 * U + 4, 4.4 * U, 1.9 * U, 0.45 * U).fill({ color: COLORS.shadow, alpha: 0.25 });
  g.roundRect(-2.2 * U, -0.95 * U, 4.4 * U, 1.9 * U, 0.45 * U).fill(color);
  g.roundRect(0.35 * U, -0.78 * U, 0.75 * U, 1.56 * U, 0.2 * U).fill(0x2c3440); // windscreen
  g.roundRect(-1.55 * U, -0.72 * U, 0.5 * U, 1.44 * U, 0.15 * U).fill(0x2c3440); // rear window
  g.roundRect(-1.0 * U, -0.8 * U, 1.3 * U, 1.6 * U, 0.2 * U).fill({ color: 0xffffff, alpha: 0.18 }); // roof
  g.rect(2.05 * U, -0.75 * U, 0.12 * U, 0.35 * U).fill(0xf3e7b0);
  g.rect(2.05 * U, 0.4 * U, 0.12 * U, 0.35 * U).fill(0xf3e7b0);
  g.rect(-2.18 * U, -0.75 * U, 0.1 * U, 0.3 * U).fill(0xb03a32);
  g.rect(-2.18 * U, 0.45 * U, 0.1 * U, 0.3 * U).fill(0xb03a32);
  c.addChild(g);
  return c;
}

function bikeView(color) {
  const c = new Container();
  const g = new Graphics();
  g.roundRect(-0.85 * U + 2, -0.1 * U + 3, 1.7 * U, 0.2 * U, 0.1 * U).fill({ color: COLORS.shadow, alpha: 0.2 });
  g.roundRect(-0.9 * U, -0.1 * U, 0.62 * U, 0.2 * U, 0.1 * U).fill(0x222326);
  g.roundRect(0.28 * U, -0.1 * U, 0.62 * U, 0.2 * U, 0.1 * U).fill(0x222326);
  g.roundRect(-0.55 * U, -0.09 * U, 1.1 * U, 0.18 * U, 0.06 * U).fill(color);
  g.roundRect(0.48 * U, -0.34 * U, 0.12 * U, 0.68 * U, 0.05 * U).fill(0x222326); // handlebar
  g.roundRect(-0.48 * U, -0.13 * U, 0.34 * U, 0.26 * U, 0.1 * U).fill(0x2f2f33); // saddle
  c.addChild(g);
  return c;
}

function personView(body, head) {
  const c = new Container();
  const g = new Graphics();
  // A soft ring so you always find yourself on a small screen.
  g.circle(0, 0, 0.75 * U).fill({ color: 0xffffff, alpha: 0.12 }).stroke({ width: 2, color: 0xffffff, alpha: 0.55 });
  g.ellipse(2, 3, 0.24 * U, 0.36 * U).fill({ color: COLORS.shadow, alpha: 0.25 });
  g.ellipse(0, 0, 0.22 * U, 0.36 * U).fill(body);
  g.circle(0.04 * U, 0, 0.16 * U).fill(head);
  g.rect(0.14 * U, -0.05 * U, 0.08 * U, 0.1 * U).fill(0x6b4a2a); // nose, shows the facing
  c.addChild(g);
  return c;
}
