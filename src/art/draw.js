// Shared drawing for people, vehicles, houses and street furniture (D-003, F-004).
// Everything is drawn in metres times U, looking straight down, with tall
// things leaning away from the camera. One style object (styles.js) decides
// colours, outlines and shadows, so the variants differ only in numbers.

import { shade, saturate, mix } from './color.js';
import * as D from './detail.js';

export const U = 16; // px per metre in local coordinates
export const LEAN = 0.009; // lean per metre of height and metre from the camera

// ---------- basics ----------

function col(style, c) {
  return saturate(c, style.saturation);
}

// Vehicles can have a stronger outline than buildings (style.vehicleOutline).
let outlineScale = 1;

// Fill the current path, then outline it if the style has outlines.
function fin(g, style, color, { alpha = 1, outline = 1 } = {}) {
  g.fill({ color, alpha });
  if (style.outline.width && outline) {
    g.stroke({ width: style.outline.width * outline * outlineScale, color: style.outline.color, alpha: style.outline.alpha, join: 'round', cap: 'round' });
  }
  return g;
}

function line(g, style, pts, width, color, alpha = 1) {
  g.moveTo(pts[0] * U, pts[1] * U);
  for (let i = 2; i < pts.length; i += 2) g.lineTo(pts[i] * U, pts[i + 1] * U);
  g.stroke({ width: width * U, color, alpha, cap: 'round', join: 'round' });
}

const P = (pts) => pts.map((v) => v * U);

// Things drawn rotated (cars, bikes, people) must still cast their shadow
// towards the sun's direction in the world, not their own.
let localRot = 0;
let skipShadows = false;
// Draw without the small built-in shadows (the game draws them separately,
// so they stay in the world's sun direction while the object turns).
export function withoutShadows(fn) {
  const before = skipShadows;
  skipShadows = true;
  try {
    fn();
  } finally {
    skipShadows = before;
  }
}
export function rotated(rot, fn) {
  const before = localRot;
  localRot = rot;
  try {
    fn();
  } finally {
    localRot = before;
  }
}

// Drop shadow of a flat shape, offset by the sun (north-west light).
// Soft styles stack several slightly larger, fainter copies.
function shadowShape(g, style, drawPath, lift = 1) {
  if (skipShadows) return;
  const s = style.shadow;
  const c = Math.cos(-localRot);
  const sn = Math.sin(-localRot);
  const dx = (s.dx * c - s.dy * sn) * lift;
  const dy = (s.dx * sn + s.dy * c) * lift;
  for (let i = 0; i < s.layers; i++) {
    drawPath(dx, dy, i * 0.05);
    g.fill({ color: s.color, alpha: s.alpha });
  }
}

// Shadow of something thin and tall (a pole), as a line on the ground.
function poleShadow(g, style, x, y, height, width = 0.12) {
  const s = style.shadow;
  const k = height * 0.12;
  for (let i = 0; i < s.layers; i++) {
    g.moveTo(x * U, y * U).lineTo((x + s.dx * k) * U, (y + s.dy * k) * U);
    g.stroke({ width: (width + i * 0.05) * U, color: s.color, alpha: s.alpha, cap: 'round' });
  }
}

// Seeded random, so test pages look the same every time.
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- people ----------

export function drawPerson(g, style, { shirt = 0xf0a43a, hair = 0x5a3b26, skin = 0xf3cfa0, ring = false } = {}) {
  const po = style.personOutline ?? 1;
  shadowShape(g, style, (dx, dy, gr) => g.ellipse(dx * 0.35 * U, dy * 0.35 * U, (0.22 + gr) * U, (0.36 + gr) * U), 1);
  if (ring) g.circle(0, 0, 0.75 * U).fill({ color: 0xffffff, alpha: 0.14 }).stroke({ width: 2, color: 0xffffff, alpha: 0.6 });
  // Arms, then shoulders, then the head seen from above.
  g.circle(0.05 * U, -0.33 * U, 0.09 * U);
  fin(g, style, col(style, skin), { outline: 0.6 * po });
  g.circle(0.05 * U, 0.33 * U, 0.09 * U);
  fin(g, style, col(style, skin), { outline: 0.6 * po });
  g.ellipse(0, 0, 0.2 * U, 0.34 * U);
  // The player's shirt keeps full colour in every variant, so you always find yourself.
  fin(g, style, ring ? shirt : col(style, shirt), { outline: po });
  g.circle(0.02 * U, 0, 0.155 * U);
  fin(g, style, col(style, skin), { outline: 0.8 * po });
  g.ellipse(-0.03 * U, 0, 0.12 * U, 0.14 * U).fill(col(style, hair)); // hair on top, face towards +x
}

// ---------- vehicles (facing +x) ----------

const CAR_SHAPES = {
  small: { L: 3.6, W: 1.7, r: 0.7, cabin: [-1.3, 0.85], glassFront: 0.65, glassRear: 0.4 },
  car: { L: 4.4, W: 1.9, r: 0.5, cabin: [-1.55, 1.1], glassFront: 0.75, glassRear: 0.5 },
  sport: { L: 4.5, W: 1.95, r: 0.55, cabin: [-1.35, 0.25], glassFront: 0.6, glassRear: 0.45 },
};

export function drawCar(g, style, kind, color, { burnt = false } = {}) {
  outlineScale = style.vehicleOutline || 1;
  try {
    drawCarBody(g, style, kind, color, burnt);
  } finally {
    outlineScale = 1;
  }
}

function drawCarBody(g, style, kind, color, burnt = false) {
  const s = CAR_SHAPES[kind];
  const L = s.L / 2;
  const W = s.W / 2;
  const body = col(style, color);
  shadowShape(g, style, (dx, dy, gr) => g.roundRect((-L + dx * 0.6 - gr) * U, (-W + dy * 0.6 - gr) * U, (s.L + gr * 2) * U, (s.W + gr * 2) * U, (s.r + gr) * U), 0.6);
  // Wheels peeking out at the corners.
  for (const wx of [L - 0.85, -L + 0.85])
    for (const wy of [-W - 0.04, W + 0.04 - 0.28]) {
      g.roundRect((wx - 0.35) * U, wy * U, 0.7 * U, 0.28 * U, 0.1 * U);
      fin(g, style, 0x1f2024, { outline: 0.5 });
    }
  g.roundRect(-L * U, -W * U, s.L * U, s.W * U, s.r * U);
  fin(g, style, body);
  // Lit left side (north-west sun) and shaded right side give some shape.
  g.roundRect((-L + 0.15) * U, (-W + 0.08) * U, (s.L - 0.3) * U, 0.22 * U, 0.1 * U).fill({ color: 0xffffff, alpha: style.light * 1.4 });
  g.roundRect((-L + 0.15) * U, (W - 0.3) * U, (s.L - 0.3) * U, 0.22 * U, 0.1 * U).fill({ color: 0x000000, alpha: style.light * 1.2 });
  const glass = col(style, 0x2c3a4c);
  const [c0, c1] = s.cabin;
  // Windscreen, rear window and roof.
  g.roundRect(c1 * U, (-W + 0.18) * U, s.glassFront * U, (s.W - 0.36) * U, 0.18 * U);
  fin(g, style, glass, { outline: 0.6 });
  g.roundRect((c0 - s.glassRear + 0.05) * U, (-W + 0.22) * U, s.glassRear * U, (s.W - 0.44) * U, 0.14 * U);
  fin(g, style, glass, { outline: 0.6 });
  g.roundRect(c0 * U, (-W + 0.2) * U, (c1 - c0) * U, (s.W - 0.4) * U, 0.22 * U);
  fin(g, style, shade(body, style.light), { outline: 0.6 });
  g.roundRect((c0 + 0.1) * U, (-W + 0.26) * U, (c1 - c0 - 0.2) * U, 0.18 * U, 0.08 * U).fill({ color: 0xffffff, alpha: 0.25 }); // glint
  // Side mirrors.
  g.roundRect((c1 + 0.1) * U, (-W - 0.14) * U, 0.18 * U, 0.16 * U, 0.05 * U);
  fin(g, style, body, { outline: 0.5 });
  g.roundRect((c1 + 0.1) * U, (W - 0.02) * U, 0.18 * U, 0.16 * U, 0.05 * U);
  fin(g, style, body, { outline: 0.5 });
  if (kind === 'sport') {
    g.rect((c1 + s.glassFront) * U, -0.3 * U, (L - c1 - s.glassFront - 0.05) * U, 0.18 * U).fill({ color: 0xffffff, alpha: 0.85 });
    g.rect((c1 + s.glassFront) * U, 0.12 * U, (L - c1 - s.glassFront - 0.05) * U, 0.18 * U).fill({ color: 0xffffff, alpha: 0.85 });
    g.roundRect((-L - 0.12) * U, (-W + 0.05) * U, 0.32 * U, (s.W - 0.1) * U, 0.06 * U);
    fin(g, style, col(style, 0x1f1f22), { outline: 0.6 }); // rear wing
    // Bonnet vents.
    g.rect((L - 1.0) * U, -0.55 * U, 0.35 * U, 0.12 * U).fill({ color: 0x000000, alpha: 0.35 });
    g.rect((L - 1.0) * U, 0.43 * U, 0.35 * U, 0.12 * U).fill({ color: 0x000000, alpha: 0.35 });
  }
  if (kind === 'car') {
    // Roof rails, a very Swedish estate-car detail.
    g.rect((c0 + 0.05) * U, (-W + 0.24) * U, (c1 - c0 - 0.1) * U, 0.07 * U).fill({ color: 0x1f2024, alpha: 0.7 });
    g.rect((c0 + 0.05) * U, (W - 0.31) * U, (c1 - c0 - 0.1) * U, 0.07 * U).fill({ color: 0x1f2024, alpha: 0.7 });
  }
  if (burnt) {
    // Soot over the body, smashed lights.
    g.roundRect(-L * U, -W * U, s.L * U, s.W * U, s.r * U).fill({ color: 0x0d0c0b, alpha: 0.55 });
    return;
  }
  // Lights.
  g.roundRect((L - 0.14) * U, (-W + 0.18) * U, 0.12 * U, 0.38 * U, 0.05 * U).fill(0xfff2c0);
  g.roundRect((L - 0.14) * U, (W - 0.56) * U, 0.12 * U, 0.38 * U, 0.05 * U).fill(0xfff2c0);
  g.roundRect((-L + 0.02) * U, (-W + 0.18) * U, 0.1 * U, 0.34 * U, 0.04 * U).fill(0xc0392b);
  g.roundRect((-L + 0.02) * U, (W - 0.52) * U, 0.1 * U, 0.34 * U, 0.04 * U).fill(0xc0392b);
}

export function drawBike(g, style, color) {
  outlineScale = style.vehicleOutline || 1;
  try {
    drawBikeBody(g, style, color);
  } finally {
    outlineScale = 1;
  }
}

function drawBikeBody(g, style, color) {
  shadowShape(g, style, (dx, dy, gr) => g.roundRect((-0.9 + dx * 0.4 - gr) * U, (-0.12 + dy * 0.4 - gr) * U, (1.8 + gr * 2) * U, (0.24 + gr * 2) * U, 0.12 * U), 0.4);
  const tyre = 0x1f2024;
  g.roundRect(-0.92 * U, -0.09 * U, 0.66 * U, 0.18 * U, 0.09 * U);
  fin(g, style, tyre, { outline: 0.5 });
  g.roundRect(0.26 * U, -0.09 * U, 0.66 * U, 0.18 * U, 0.09 * U);
  fin(g, style, tyre, { outline: 0.5 });
  g.roundRect(-0.62 * U, -0.07 * U, 1.12 * U, 0.14 * U, 0.06 * U);
  fin(g, style, col(style, color), { outline: 0.6 });
  // A basket on the front, a pannier rack at the back: a proper Uppsala bike.
  g.roundRect(0.62 * U, -0.2 * U, 0.34 * U, 0.4 * U, 0.06 * U);
  fin(g, style, col(style, 0x6b5a45), { outline: 0.5 });
  g.rect(0.66 * U, -0.14 * U, 0.26 * U, 0.28 * U).fill({ color: 0x000000, alpha: 0.18 });
  g.rect(-0.9 * U, -0.11 * U, 0.42 * U, 0.22 * U).fill({ color: style.metal, alpha: 0.8 });
  g.roundRect(0.46 * U, -0.36 * U, 0.1 * U, 0.72 * U, 0.05 * U);
  fin(g, style, style.metal, { outline: 0.5 });
  g.roundRect(-0.46 * U, -0.11 * U, 0.3 * U, 0.22 * U, 0.09 * U);
  fin(g, style, col(style, 0x2f2f33), { outline: 0.5 });
}

// ---------- houses ----------

function lerp2(p1, p2, o, u, v) {
  return [p1[0] + (p2[0] - p1[0]) * u + o[0] * v, p1[1] + (p2[1] - p1[1]) * u + o[1] * v];
}

// House: { x, y, w, h, height, roof: 'flat' | 'gable', facade, roofColor, seed }
// cam: { x, y } in metres. Returns nothing; draws shadow, walls, roof.
export function drawHouseShadow(g, style, b) {
  const s = style.shadow;
  const len = b.height * 0.12;
  const sx = s.dx * len;
  const sy = s.dy * len;
  const { x, y, w, h } = b;
  for (let i = 0; i < s.layers; i++) {
    const gr = i * 0.08;
    g.poly(P([x - gr, y - gr, x + w + gr, y - gr, x + w + sx + gr, y + sy - gr, x + w + sx + gr, y + h + sy + gr, x + sx - gr, y + h + sy + gr, x - gr, y + h + gr]));
    g.fill({ color: s.color, alpha: s.alpha * 1.1 });
  }
}

// Walls, windows and doors only, leaning away from the camera.
export function drawHouseWalls(g, style, b, cam) {
  drawHouseParts(g, style, b, cam, false);
}

// The roof drawn flat (no lean), for baking into a picture once.
export function drawHouseRoofFlat(g, style, b) {
  const r = rng(Math.floor(b.seed * 1e6) + 17);
  const center = { x: b.x + b.w / 2, y: b.y + b.h / 2 };
  if (b.roof === 'gable') drawGableRoof(g, style, b, center, [0, 0], r);
  else drawFlatRoof(g, style, b, [0, 0], r);
}

export function drawHouse(g, style, b, cam) {
  drawHouseParts(g, style, b, cam, true);
}

function drawHouseParts(g, style, b, cam, withRoof) {
  const cx = b.x + b.w / 2;
  const cy = b.y + b.h / 2;
  const o = [(cx - cam.x) * LEAN * b.height, (cy - cam.y) * LEAN * b.height];
  const x0 = b.x, y0 = b.y, x1 = b.x + b.w, y1 = b.y + b.h;
  const facade = col(style, b.facade);
  const r = rng(Math.floor(b.seed * 1e6));
  const sides = [
    // p1, p2, outward normal, lightness
    { p1: [x0, y1], p2: [x1, y1], n: [0, 1], lit: -style.light, door: true }, // south
    { p1: [x1, y0], p2: [x0, y0], n: [0, -1], lit: style.light }, // north
    { p1: [x1, y1], p2: [x1, y0], n: [1, 0], lit: -style.light * 0.5 }, // east
    { p1: [x0, y0], p2: [x0, y1], n: [-1, 0], lit: style.light * 0.5 }, // west
  ];
  for (const sd of sides) {
    // A wall shows when the roof leans away from it, i.e. towards the camera side.
    const vis = -(o[0] * sd.n[0] + o[1] * sd.n[1]);
    if (vis <= 0.02) continue;
    const [p1, p2] = [sd.p1, sd.p2];
    const quad = [...p1, ...p2, p2[0] + o[0], p2[1] + o[1], p1[0] + o[0], p1[1] + o[1]];
    g.poly(P(quad));
    fin(g, style, shade(facade, sd.lit));
    if (vis < 0.9) continue; // too thin to show windows
    // Plinth.
    const pl = 0.6 / b.height;
    g.poly(P([...p1, ...p2, ...lerp2(p1, p2, o, 1, pl), ...lerp2(p1, p2, o, 0, pl)])).fill({ color: 0x000000, alpha: 0.12 });
    const wallLen = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
    const n = Math.max(1, Math.floor(wallLen / 3));
    const floors = Math.max(1, Math.floor((b.height - 0.5) / 3));
    const doorAt = sd.door ? Math.floor(r() * n) : -1;
    for (let f = 0; f < floors; f++) {
      for (let i = 0; i < n; i++) {
        const uc = (i + 0.5) / n;
        const hw = 0.55 / wallLen;
        const isDoor = f === 0 && i === doorAt;
        const v0 = isDoor ? 0.02 : (f * 3 + 0.8) / b.height;
        const v1 = isDoor ? 2.4 / b.height : (f * 3 + 2.6) / b.height;
        const q = [...lerp2(p1, p2, o, uc - hw, v0), ...lerp2(p1, p2, o, uc + hw, v0), ...lerp2(p1, p2, o, uc + hw, v1), ...lerp2(p1, p2, o, uc - hw, v1)];
        g.poly(P(q));
        if (isDoor) fin(g, style, col(style, shade(b.roofColor, -0.25)), { outline: 0.6 });
        else fin(g, style, r() < (style.litChance ?? 0.2) ? style.windowLit : style.window, { outline: 0.6 });
      }
    }
  }
  if (!withRoof) return;
  if (b.roof === 'gable') drawGableRoof(g, style, b, cam, o, r);
  else drawFlatRoof(g, style, b, o, r);
}

function drawFlatRoof(g, style, b, o, r) {
  const x = b.x + o[0];
  const y = b.y + o[1];
  const roof = col(style, b.roofColor);
  g.rect(x * U, y * U, b.w * U, b.h * U);
  fin(g, style, roof);
  const inset = 0.5;
  g.rect((x + inset) * U, (y + inset) * U, (b.w - inset * 2) * U, (b.h - inset * 2) * U).fill(shade(roof, 0.12));
  // Gravel speckles.
  for (let i = 0; i < b.w * b.h * 0.35; i++) {
    g.circle((x + inset + r() * (b.w - inset * 2)) * U, (y + inset + r() * (b.h - inset * 2)) * U, 0.06 * U).fill({ color: 0x000000, alpha: 0.1 });
  }
  // An air-conditioning box and a couple of vents.
  const ax = x + 1 + r() * Math.max(0.1, b.w - 4);
  const ay = y + 1 + r() * Math.max(0.1, b.h - 3.5);
  g.rect((ax + 0.3) * U, (ay + 0.4) * U, 2 * U, 1.4 * U).fill({ color: style.shadow.color, alpha: 0.25 });
  g.rect(ax * U, ay * U, 2 * U, 1.4 * U);
  fin(g, style, col(style, 0xb9bcc0), { outline: 0.7 });
  for (let k = 0; k < 4; k++) g.rect((ax + 0.2 + k * 0.45) * U, (ay + 0.25) * U, 0.12 * U, 0.9 * U).fill({ color: 0x000000, alpha: 0.2 });
  for (let k = 0; k < 3; k++) {
    const vx = x + 1 + r() * (b.w - 2);
    const vy = k === 2 ? y + b.h - 1.2 : y + 1 + r() * (b.h - 2);
    g.circle(vx * U, vy * U, 0.3 * U);
    fin(g, style, col(style, 0x8e9195), { outline: 0.6 });
    g.circle(vx * U, vy * U, 0.14 * U).fill({ color: 0x000000, alpha: 0.35 });
  }
}

function drawGableRoof(g, style, b, cam, o, r) {
  const along = b.w >= b.h; // ridge along the longer side
  const roofH = Math.min(b.w, b.h) * 0.35;
  const cx = b.x + b.w / 2;
  const cy = b.y + b.h / 2;
  const k = LEAN * (b.height + roofH);
  const o2 = [(cx - cam.x) * k, (cy - cam.y) * k];
  const ov = 0.3; // eaves overhang
  const x0 = b.x - ov + o[0], x1 = b.x + b.w + ov + o[0];
  const y0 = b.y - ov + o[1], y1 = b.y + b.h + ov + o[1];
  const roof = col(style, b.roofColor);
  const planes = along
    ? [
        { pts: [x0, y0, x1, y0, b.x + b.w + ov + o2[0], cy + o2[1], b.x - ov + o2[0], cy + o2[1]], lit: style.light },
        { pts: [x0, y1, x1, y1, b.x + b.w + ov + o2[0], cy + o2[1], b.x - ov + o2[0], cy + o2[1]], lit: -style.light },
      ]
    : [
        { pts: [x0, y0, x0, y1, cx + o2[0], b.y + b.h + ov + o2[1], cx + o2[0], b.y - ov + o2[1]], lit: style.light },
        { pts: [x1, y0, x1, y1, cx + o2[0], b.y + b.h + ov + o2[1], cx + o2[0], b.y - ov + o2[1]], lit: -style.light },
      ];
  for (const pl of planes) {
    g.poly(P(pl.pts));
    fin(g, style, shade(roof, pl.lit));
    // Rows of tiles, parallel to the ridge.
    const [ax, ay, bx, by, cx2, cy2, dx, dy] = pl.pts;
    for (let t = 0.12; t < 1; t += 0.14) {
      const p = [ax + (dx - ax) * t, ay + (dy - ay) * t, bx + (cx2 - bx) * t, by + (cy2 - by) * t];
      line(g, style, p, 0.06, shade(roof, -0.25), 0.55);
    }
  }
  // Ridge.
  const ridge = along ? [b.x - ov + o2[0], cy + o2[1], b.x + b.w + ov + o2[0], cy + o2[1]] : [cx + o2[0], b.y - ov + o2[1], cx + o2[0], b.y + b.h + ov + o2[1]];
  line(g, style, ridge, 0.16, shade(roof, -0.35));
  // Chimney: a small box with sides, a top and its own shadow on the roof.
  const t = 0.25 + r() * 0.5;
  const chx = along ? b.x + b.w * t : cx - b.w * 0.2;
  const chy = along ? cy - b.h * 0.2 : b.y + b.h * t;
  const baseH = b.height + roofH * 0.5;
  const topH = b.height + roofH + 1.2;
  const off = (h) => [(chx - cam.x) * LEAN * h, (chy - cam.y) * LEAN * h];
  const [bx, by] = off(baseH);
  const [tx, ty] = off(topH);
  const s0 = style.shadow;
  g.rect((chx + bx - 0.45 + s0.dx * 0.6) * U, (chy + by - 0.45 + s0.dy * 0.6) * U, 0.9 * U, 0.9 * U).fill({ color: s0.color, alpha: Math.min(0.35, s0.alpha * 1.6) });
  const brick = col(style, 0x9a5a48);
  const box = (dx0, dy0, dx1, dy1, sx0, sy0, sx1, sy1, c) => {
    g.poly(P([chx + bx + dx0, chy + by + dy0, chx + bx + dx1, chy + by + dy1, chx + tx + sx1, chy + ty + sy1, chx + tx + sx0, chy + ty + sy0]));
    fin(g, style, c, { outline: 0.6 });
  };
  const hw = 0.45;
  box(-hw, hw, hw, hw, -hw, hw, hw, hw, shade(brick, -style.light)); // south side
  box(hw, -hw, hw, hw, hw, -hw, hw, hw, shade(brick, -style.light * 0.5)); // east side
  box(-hw, -hw, -hw, hw, -hw, -hw, -hw, hw, shade(brick, style.light * 0.5)); // west side
  box(-hw, -hw, hw, -hw, -hw, -hw, hw, -hw, shade(brick, style.light)); // north side
  g.rect((chx + tx - hw) * U, (chy + ty - hw) * U, 0.9 * U, 0.9 * U);
  fin(g, style, brick, { outline: 0.8 });
  g.rect((chx + tx - 0.28) * U, (chy + ty - 0.28) * U, 0.56 * U, 0.56 * U).fill({ color: 0x000000, alpha: 0.45 });
}

// ---------- street ----------

export function drawSidewalk(g, style, x, y, w, h) {
  const gr = style.ground;
  if (style.detail) {
    g.rect(x * U, y * U, w * U, h * U).fill(gr.tileLine);
    D.slabTexture(g, style, x, y, w, h, Math.floor(x * 31 + y * 17) + 1);
    return;
  }
  g.rect(x * U, y * U, w * U, h * U).fill(gr.sidewalk);
  // Paving slabs, 1 m apart, in a running pattern.
  for (let yy = y + 1; yy < y + h; yy += 1) line(g, style, [x, yy, x + w, yy], 0.04, gr.tileLine);
  for (let yy = y, row = 0; yy < y + h; yy += 1, row++)
    for (let xx = x + (row % 2) * 0.5 + 1; xx < x + w; xx += 1) line(g, style, [xx, yy, xx, Math.min(y + h, yy + 1)], 0.04, gr.tileLine);
}

export function drawRoad(g, style, x, y, w, h, r, { patch = true, lanes = [] } = {}) {
  const gr = style.ground;
  g.rect(x * U, y * U, w * U, h * U).fill(gr.asphalt);
  if (style.detail) D.asphaltTexture(g, style, x, y, w, h, Math.floor(x * 13 + y * 7) + 3, lanes);
  if (patch) {
    // A repaired patch: a bit darker, with tar seams round the edge.
    const px = x + w * 0.62;
    const py = y + h * 0.55;
    g.rect(px * U, py * U, 2.4 * U, 1.6 * U).fill(gr.asphaltDark).stroke({ width: 0.07 * U, color: gr.crack, alpha: 0.6 });
  }
  // Hairline cracks: a wandering line with a small branch.
  for (let i = 0; i < 5; i++) {
    let px = x + 1 + r() * (w - 2);
    let py = y + 1 + r() * (h - 2);
    let a = r() * Math.PI * 2;
    const pts = [px, py];
    for (let k = 0; k < 7; k++) {
      a += (r() - 0.5) * 0.9;
      px += Math.cos(a) * 0.35;
      py += Math.sin(a) * 0.35;
      pts.push(px, py);
    }
    line(g, style, pts, 0.035, gr.crack, 0.5);
    const m = 4 * 2;
    line(g, style, [pts[m], pts[m + 1], pts[m] + Math.cos(a + 1.2) * 0.5, pts[m + 1] + Math.sin(a + 1.2) * 0.5], 0.03, gr.crack, 0.45);
  }
}

export function drawCurb(g, style, x, y, w) {
  if (style.detail) return D.curbStones(g, style, x, y, w, Math.floor(x * 5 + y * 11) + 2);
  g.rect(x * U, (y - 0.15) * U, w * U, 0.3 * U);
  fin(g, style, style.ground.curb, { outline: 0.5 });
}

export function drawLaneDashes(g, style, x, y, w) {
  for (let xx = x + 1; xx < x + w - 2; xx += 6) g.rect(xx * U, (y - 0.08) * U, 3 * U, 0.16 * U).fill(style.ground.lane);
}

export function drawCrosswalk(g, style, x, y, h) {
  for (let yy = y + 0.3; yy < y + h - 0.4; yy += 1.2) g.rect(x * U, yy * U, 3 * U, 0.6 * U).fill(style.ground.lane);
}

export function drawManhole(g, style, x, y) {
  g.circle(x * U, y * U, 0.35 * U);
  fin(g, style, mix(style.metal, style.ground.asphalt, 0.4), { outline: 0.5 });
  for (let k = -2; k <= 2; k++) line(g, style, [x - 0.22, y + k * 0.1, x + 0.22, y + k * 0.1], 0.03, 0x000000, 0.3);
}

export function drawDrain(g, style, x, y) {
  g.rect((x - 0.25) * U, (y - 0.18) * U, 0.5 * U, 0.36 * U);
  fin(g, style, style.metal, { outline: 0.5 });
  for (let k = 0; k < 4; k++) g.rect((x - 0.2 + k * 0.11) * U, (y - 0.13) * U, 0.05 * U, 0.26 * U).fill({ color: 0x000000, alpha: 0.5 });
}

export function drawBikeLane(g, style, x, y, w, h) {
  g.rect(x * U, y * U, w * U, h * U).fill(style.ground.bikeLane);
  // A painted bike symbol every 12 m.
  for (let xx = x + 3; xx < x + w - 1; xx += 12) {
    const cy = y + h / 2;
    const c = style.ground.lane;
    const by = cy + 0.15;
    g.circle((xx - 0.42) * U, by * U, 0.27 * U).stroke({ width: 0.06 * U, color: c });
    g.circle((xx + 0.42) * U, by * U, 0.27 * U).stroke({ width: 0.06 * U, color: c });
    // Frame: rear wheel, pedals, front wheel, saddle and handlebar.
    line(g, style, [xx - 0.42, by, xx - 0.02, by, xx + 0.3, by - 0.38, xx - 0.12, by - 0.38, xx - 0.02, by], 0.06, c);
    line(g, style, [xx - 0.42, by, xx - 0.12, by - 0.38], 0.06, c);
    line(g, style, [xx + 0.3, by - 0.38, xx + 0.42, by], 0.06, c);
    line(g, style, [xx - 0.22, by - 0.46, xx - 0.02, by - 0.46], 0.07, c); // saddle
    line(g, style, [xx + 0.24, by - 0.48, xx + 0.38, by - 0.42], 0.07, c); // handlebar
  }
}

export function drawLamp(g, style, x, y, armDir = 1, cam = null, armX = 0) {
  poleShadow(g, style, x, y, 6);
  // The luminaire sits 6 m up, so it leans away from the camera like a roof.
  const ox = cam ? (x - cam.x) * LEAN * 6 : 0;
  const oy = cam ? (y - cam.y) * LEAN * 6 : 0;
  const tx = x + ox;
  const ty = y + oy;
  // The arm points along y (armDir) or, for roads running north-south, along x (armX).
  const ax = armX;
  const ay = armX ? 0 : armDir;
  const hx = tx + ax * 1.2;
  const hy = ty + ay * 1.2;
  // Foot on the sidewalk, the pole up to the top, then the arm out over the lane.
  g.roundRect((x - 0.22) * U, (y - 0.22) * U, 0.44 * U, 0.44 * U, 0.08 * U);
  fin(g, style, shade(style.metal, 0.15), { outline: 0.6 });
  line(g, style, [x, y, tx, ty], 0.14, style.metal);
  line(g, style, [tx, ty, hx - ax * 0.25, hy - ay * 0.25], 0.08, style.metal);
  g.circle(tx * U, ty * U, 0.1 * U).fill(style.metal);
  const lw = ax ? 0.44 : 0.76;
  const lh = ax ? 0.76 : 0.44;
  g.roundRect((hx - lw / 2) * U, (hy - lh / 2) * U, lw * U, lh * U, 0.18 * U);
  fin(g, style, style.metal, { outline: 0.7 });
  g.roundRect((hx - lw * 0.32) * U, (hy - lh * 0.23) * U, lw * 0.64 * U, lh * 0.46 * U, 0.08 * U).fill({ color: 0xfff2c0, alpha: 0.9 });
  return [hx, hy];
}

export function drawBench(g, style, x, y) {
  shadowShape(g, style, (dx, dy, gr) => g.roundRect((x + dx * 0.5 - 0.9 - gr) * U, (y + dy * 0.5 - 0.25 - gr) * U, (1.8 + gr * 2) * U, (0.5 + gr * 2) * U, (0.05 + gr) * U), 1);
  g.rect((x - 0.9) * U, (y - 0.25) * U, 1.8 * U, 0.5 * U);
  fin(g, style, col(style, 0x8a6a48), { outline: 0.7 });
  for (let k = 0; k < 4; k++) line(g, style, [x - 0.85, y - 0.2 + k * 0.13, x + 0.85, y - 0.2 + k * 0.13], 0.03, 0x000000, 0.25);
  g.rect((x - 0.9) * U, (y - 0.32) * U, 1.8 * U, 0.12 * U);
  fin(g, style, style.metal, { outline: 0.5 });
}

export function drawBin(g, style, x, y) {
  shadowShape(g, style, (dx, dy, gr) => g.circle((x + dx * 0.6) * U, (y + dy * 0.6) * U, (0.3 + gr) * U), 1);
  g.circle(x * U, y * U, 0.3 * U);
  fin(g, style, col(style, 0x3f6b4f), { outline: 0.7 });
  g.circle(x * U, y * U, 0.18 * U).fill({ color: 0x000000, alpha: 0.45 });
}

export function drawPlanter(g, style, x, y, w, h, seed) {
  const r = rng(seed);
  shadowShape(g, style, (dx, dy, gr) => g.roundRect((x + dx * 0.5 - gr) * U, (y + dy * 0.5 - gr) * U, (w + gr * 2) * U, (h + gr * 2) * U, (0.15 + gr) * U), 1);
  g.roundRect(x * U, y * U, w * U, h * U, 0.15 * U);
  fin(g, style, style.ground.curb, { outline: 0.6 });
  g.rect((x + 0.15) * U, (y + 0.15) * U, (w - 0.3) * U, (h - 0.3) * U).fill(col(style, 0x6b5440));
  const flowers = [0xe0506a, 0xf2c94c, 0xffffff, 0x9b6bd6];
  for (let i = 0; i < w * h * 6; i++) {
    const fx = x + 0.3 + r() * (w - 0.6);
    const fy = y + 0.3 + r() * (h - 0.6);
    g.circle(fx * U, fy * U, 0.16 * U).fill(col(style, style.tree[0]));
    if (r() < 0.5) g.circle(fx * U, fy * U, 0.08 * U).fill(col(style, flowers[Math.floor(r() * flowers.length)]));
  }
}

export function drawBikeRack(g, style, x, y, n) {
  for (let i = 0; i < n; i++) {
    const xx = x + i * 0.8;
    line(g, style, [xx, y - 0.45, xx, y + 0.45], 0.07, style.metal);
  }
  line(g, style, [x, y - 0.45, x + (n - 1) * 0.8, y - 0.45], 0.06, style.metal);
}

export function drawSign(g, style, x, y, kind) {
  poleShadow(g, style, x, y, 2.4, 0.08);
  g.circle(x * U, y * U, 0.07 * U).fill(style.metal);
  // Sign plate, tilted up so it reads from above.
  if (kind === 'parking') {
    g.roundRect((x - 0.32) * U, (y - 0.7) * U, 0.64 * U, 0.64 * U, 0.08 * U);
    fin(g, style, col(style, 0x2a5ca8), { outline: 0.8 });
    // A white "P" built from strokes.
    line(g, style, [x - 0.1, y - 0.18, x - 0.1, y - 0.58, x + 0.08, y - 0.58, x + 0.12, y - 0.48, x + 0.08, y - 0.38, x - 0.1, y - 0.38], 0.08, 0xffffff);
  } else {
    // Bus stop: yellow plate with a green bus outline.
    g.roundRect((x - 0.32) * U, (y - 0.7) * U, 0.64 * U, 0.64 * U, 0.08 * U);
    fin(g, style, col(style, 0xf2c94c), { outline: 0.8 });
    g.roundRect((x - 0.2) * U, (y - 0.55) * U, 0.4 * U, 0.3 * U, 0.05 * U);
    fin(g, style, col(style, 0x2e7d4f), { outline: 0.4 });
  }
}

export function drawTree(g, style, x, y, r, seed) {
  if (style.detail) {
    g.rect((x - 0.7) * U, (y - 0.7) * U, 1.4 * U, 1.4 * U).fill({ color: style.metal, alpha: 0.85 });
    return D.detailedTree(g, style, x, y, r, seed);
  }
  const rr = rng(seed);
  const [dark, light] = style.tree.map((c) => col(style, c));
  // Grate around the trunk.
  g.rect((x - 0.7) * U, (y - 0.7) * U, 1.4 * U, 1.4 * U);
  fin(g, style, style.metal, { outline: 0.4, alpha: 0.85 });
  // Same shadow length per metre of height as the houses (a tree is about 7 m).
  shadowShape(g, style, (dx, dy, gr) => g.circle((x + dx) * U, (y + dy) * U, (r * 0.9 + gr) * U), 7 * 0.12 / 0.65);
  // Canopy built from overlapping blobs.
  const blobs = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + rr();
    blobs.push([x + Math.cos(a) * r * 0.45, y + Math.sin(a) * r * 0.45, r * (0.5 + rr() * 0.15)]);
  }
  for (const [bx, by, br] of blobs) {
    g.circle(bx * U, by * U, br * U);
    fin(g, style, dark, { outline: 0.7 });
  }
  g.circle(x * U, y * U, r * 0.6 * U).fill(dark);
  for (const [bx, by, br] of blobs.slice(0, 3)) g.circle((bx - 0.25) * U, (by - 0.25) * U, br * 0.55 * U).fill({ color: light, alpha: 0.9 });
}
