// Textured ground and dense vegetation for the detailed style (D-038).
// Everything is built from many small seeded shapes; in the game these
// would be drawn once per map chunk and kept as a picture, not every frame.

import { U, rng } from './draw.js';
import { shade, saturate } from './color.js';

const col = (style, c) => saturate(c, style.saturation);

// How many small specks and blades to draw (1 = gallery). The game uses
// less, since its ground pictures are made while you play.
let density = 1;
export function setDetailDensity(d) {
  density = d;
}

// Fine grain of light and dark specks, and darker wheel tracks along lanes.
export function asphaltTexture(g, style, x, y, w, h, seed, lanes = []) {
  const r = rng(seed);
  const base = style.ground.asphalt;
  for (const ly of lanes) {
    for (const off of [-1.1, 1.1]) g.rect(x * U, (ly + off - 0.4) * U, w * U, 0.8 * U).fill({ color: 0x000000, alpha: 0.03 });
  }
  const n = Math.floor(w * h * 9 * density);
  for (let i = 0; i < n; i++) {
    const light = r() < 0.5;
    g.rect((x + r() * w) * U, (y + r() * h) * U, 0.07 * U, 0.07 * U).fill({ color: light ? shade(base, 0.35) : shade(base, -0.35), alpha: 0.35 });
  }
  // A few oil stains.
  for (let i = 0; i < w * h * 0.01; i++) g.ellipse((x + r() * w) * U, (y + r() * h) * U, (0.4 + r() * 0.5) * U, (0.25 + r() * 0.3) * U).fill({ color: 0x000000, alpha: 0.07 });
}

// Paving slabs that differ a little in tone, with the odd stain or crack.
export function slabTexture(g, style, x, y, w, h, seed) {
  const r = rng(seed);
  const base = style.ground.sidewalk;
  for (let yy = y, row = 0; yy < y + h - 0.01; yy += 1, row++) {
    for (let xx = x - (row % 2) * 0.5; xx < x + w - 0.01; xx += 1) {
      const x0 = Math.max(x, xx);
      const x1 = Math.min(x + w, xx + 1);
      const y1 = Math.min(y + h, yy + 1);
      g.rect((x0 + 0.03) * U, (yy + 0.03) * U, (x1 - x0 - 0.06) * U, (y1 - yy - 0.06) * U).fill(shade(base, (r() - 0.5) * 0.08));
      if (r() < 0.06) g.circle((x0 + r() * (x1 - x0)) * U, (yy + r() * 0.8) * U, (0.12 + r() * 0.15) * U).fill({ color: 0x000000, alpha: 0.05 });
    }
  }
  for (let i = 0; i < w * h * 4 * density; i++) g.rect((x + r() * w) * U, (y + r() * h) * U, 0.05 * U, 0.05 * U).fill({ color: shade(base, -0.3), alpha: 0.3 });
}

// Curb stones in 1 m lengths with joints and granite speckle.
export function curbStones(g, style, x, y, w, seed) {
  const r = rng(seed);
  const c = style.ground.curb;
  for (let xx = x; xx < x + w; xx += 1) {
    g.rect(xx * U, (y - 0.16) * U, Math.min(1, x + w - xx) * U, 0.32 * U).fill(shade(c, (r() - 0.5) * 0.12));
    g.rect(xx * U, (y - 0.16) * U, 0.04 * U, 0.32 * U).fill({ color: 0x000000, alpha: 0.25 });
    for (let k = 0; k < 6; k++) g.rect((xx + r()) * U, (y - 0.14 + r() * 0.26) * U, 0.05 * U, 0.05 * U).fill({ color: r() < 0.5 ? 0xffffff : 0x000000, alpha: 0.2 });
  }
  g.rect(x * U, (y + 0.1) * U, w * U, 0.06 * U).fill({ color: 0x000000, alpha: 0.18 });
}

// Lawn with short strokes of light and dark green and a few flowers.
export function grassTexture(g, style, x, y, w, h, seed) {
  const r = rng(seed);
  const base = style.ground.grass;
  g.rect(x * U, y * U, w * U, h * U).fill(base);
  for (let i = 0; i < w * h * 30 * density; i++) {
    const px = x + r() * w;
    const py = y + r() * h;
    const t = r();
    g.rect(px * U, py * U, 0.05 * U, 0.16 * U).fill({ color: t < 0.5 ? shade(base, -0.18) : shade(base, 0.15), alpha: 0.55 });
  }
  const flowers = [0xffffff, 0xf2d24c, 0xd96a9a];
  // Sparse, soft flowers, so they never look like something to pick up.
  for (let i = 0; i < w * h * 0.08; i++) g.circle((x + r() * w) * U, (y + r() * h) * U, 0.05 * U).fill({ color: col(style, flowers[Math.floor(r() * 3)]), alpha: 0.55 });
}

// A clump of leaves. Lit clumps (towards the sun, north-west) get a
// highlight; the rest stay in the mid or dark tone, so the crown has volume.
function leafClump(g, style, x, y, rad, r, tones, lit) {
  g.circle((x + rad * 0.12) * U, (y + rad * 0.12) * U, rad * U).fill(mix3(tones[0], tones[1], 0.35));
  g.circle(x * U, y * U, rad * 0.85 * U).fill(lit > 0.2 ? tones[1] : mix3(tones[0], tones[1], 0.5));
  if (lit > 0.45) g.circle((x - rad * 0.28) * U, (y - rad * 0.28) * U, rad * 0.42 * U).fill({ color: tones[2], alpha: 0.5 + lit * 0.4 });
  // A few single leaves sticking out make the edge ragged.
  for (let k = 0; k < 2; k++) {
    const a = r() * Math.PI * 2;
    g.ellipse((x + Math.cos(a) * rad * 0.95) * U, (y + Math.sin(a) * rad * 0.95) * U, rad * 0.22 * U, rad * 0.13 * U).fill(tones[r() < 0.5 ? 0 : 1]);
  }
}

function mix3(a, b, t) {
  const ar = (a >> 16) & 255, ag = (a >> 8) & 255, ab = a & 255;
  const br = (b >> 16) & 255, bg = (b >> 8) & 255, bb = b & 255;
  return (Math.round(ar + (br - ar) * t) << 16) | (Math.round(ag + (bg - ag) * t) << 8) | Math.round(ab + (bb - ab) * t);
}

function leafTones(style, base) {
  const b = col(style, base);
  return [shade(b, -0.38), b, shade(b, 0.3)];
}

// How much a point in a crown faces the sun: 1 at the north-west edge, 0 at the south-east.
function litAt(dx, dy, radius) {
  return Math.max(0, Math.min(1, 0.5 - (dx + dy) / (2.4 * radius)));
}

// A tree built from many leaf clumps with a ragged edge.
export function treeShadow(g, style, x, y, radius) {
  const s = style.shadow;
  const k = (7 * 0.12) / 0.65;
  g.circle((x + s.dx * k * 1.2) * U, (y + s.dy * k * 1.2) * U, radius * 0.85 * U).fill({ color: s.color, alpha: s.alpha * 1.25 });
}

export function detailedTree(g, style, x, y, radius, seed, { shadow = true } = {}) {
  const r = rng(seed);
  const tones = leafTones(style, style.tree[0]);
  const s = style.shadow;
  const k = (7 * 0.12) / 0.65;
  // One clear shadow, offset towards the south-east.
  if (shadow) g.circle((x + s.dx * k * 1.2) * U, (y + s.dy * k * 1.2) * U, radius * 0.85 * U).fill({ color: s.color, alpha: s.alpha * 1.25 });
  g.circle(x * U, y * U, radius * 0.75 * U).fill(tones[0]);
  const clumps = Math.floor(radius * radius * 5);
  const list = [];
  for (let i = 0; i < clumps; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * radius * 0.78;
    list.push([Math.cos(a) * d, Math.sin(a) * d, 0.32 + r() * 0.3]);
  }
  // Inner and shaded clumps first, lit edge clumps last.
  list.sort((p, q) => litAt(p[0], p[1], radius) - litAt(q[0], q[1], radius));
  for (const [dx, dy, cr] of list) leafClump(g, style, x + dx, y + dy, cr, r, tones, litAt(dx, dy, radius) + (r() - 0.5) * 0.2);
}

// A clipped hedge or a bush along a bed.
export function hedge(g, style, x, y, w, h, seed) {
  const r = rng(seed);
  const tones = leafTones(style, style.tree[1]);
  const s = style.shadow;
  g.roundRect((x + s.dx * 0.7) * U, (y + s.dy * 0.7) * U, w * U, h * U, 0.4 * U).fill({ color: s.color, alpha: s.alpha * 1.3 });
  g.roundRect(x * U, y * U, w * U, h * U, 0.4 * U).fill(tones[0]);
  const n = Math.floor(w * h * 6);
  const list = [];
  for (let i = 0; i < n; i++) list.push([x + 0.25 + r() * (w - 0.5), y + 0.25 + r() * (h - 0.5), 0.22 + r() * 0.16]);
  const lit = (p) => Math.max(0, Math.min(1, 1 - ((p[1] - y) / h) * 0.9 - ((p[0] - x) / w) * 0.2));
  list.sort((p, q) => lit(p) - lit(q));
  for (const p of list) leafClump(g, style, p[0], p[1], p[2], r, tones, lit(p) + (r() - 0.5) * 0.3);
}

// Low round shrub with a few flowers.
export function shrub(g, style, x, y, radius, seed, flower = 0xd96a9a) {
  const r = rng(seed);
  const tones = leafTones(style, style.tree[1]);
  const s = style.shadow;
  g.circle((x + s.dx * 0.5) * U, (y + s.dy * 0.5) * U, radius * U).fill({ color: s.color, alpha: s.alpha * 1.2 });
  g.circle(x * U, y * U, radius * U).fill(tones[0]);
  const list = [];
  for (let i = 0; i < radius * radius * 9; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * radius * 0.8;
    list.push([Math.cos(a) * d, Math.sin(a) * d, 0.2 + r() * 0.14]);
  }
  list.sort((p, q) => litAt(p[0], p[1], radius) - litAt(q[0], q[1], radius));
  for (const [dx, dy, cr] of list) leafClump(g, style, x + dx, y + dy, cr, r, tones, litAt(dx, dy, radius));
  for (let i = 0; i < radius * 6; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * radius * 0.8;
    g.circle((x + Math.cos(a) * d) * U, (y + Math.sin(a) * d) * U, 0.07 * U).fill(col(style, flower));
  }
}

// Gravel path with stones.
export function gravelPath(g, style, x, y, w, h, seed) {
  const r = rng(seed);
  const base = col(style, 0xcdbf9f);
  g.rect(x * U, y * U, w * U, h * U).fill(base);
  for (let i = 0; i < w * h * 25 * density; i++) g.circle((x + r() * w) * U, (y + r() * h) * U, (0.03 + r() * 0.04) * U).fill({ color: r() < 0.5 ? shade(base, -0.2) : shade(base, 0.2), alpha: 0.7 });
  g.rect(x * U, y * U, w * U, 0.08 * U).fill({ color: 0x000000, alpha: 0.12 });
}
