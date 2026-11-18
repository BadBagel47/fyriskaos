// D-041: the gallery street built three ways in 2D, to compare with the 3D test.
//  tex – generated pictures for asphalt, slabs, roofs, trees and cars
//  fx  – long soft shadows, shade at the foot of walls, grain, contrast and a vignette
// Both can be combined. Street furniture also gets the clutter of reference
// picture 3 (crates, a pallet, a fence, barrels).

import { Container, Graphics, Sprite, TilingSprite, BlurFilter, ColorMatrixFilter, NoiseFilter, Assets, Texture } from '../vendor/pixi/pixi.min.mjs';
import * as A from '../src/art/draw.js';
import { createLightLayer, glowTexture } from '../src/art/light.js';

const U = A.U;
const LEAN = A.LEAN;
let TEX = null;

export async function loadDetailAssets() {
  if (TEX) return TEX;
  const names = ['asphalt', 'sidewalk', 'grass', 'roof', 'tree', 'car'];
  const files = { asphalt: 'asphalt.jpg', sidewalk: 'sidewalk.jpg', grass: 'grass.jpg', roof: 'roof.jpg', tree: 'tree.png', car: 'car.png' };
  const loaded = await Promise.all(names.map((n) => Assets.load(new URL(`./assets/${files[n]}`, import.meta.url).href)));
  TEX = Object.fromEntries(names.map((n, i) => [n, loaded[i]]));
  for (const n of ['asphalt', 'sidewalk', 'grass', 'roof']) TEX[n].source.addressMode = 'repeat';
  return TEX;
}

export const assetUrls = () => ({
  asphalt: new URL('./assets/asphalt.jpg', import.meta.url).href,
  sidewalk: new URL('./assets/sidewalk.jpg', import.meta.url).href,
  grass: new URL('./assets/grass.jpg', import.meta.url).href,
  roof: new URL('./assets/roof.jpg', import.meta.url).href,
  tree: new URL('./assets/tree.png', import.meta.url).href,
  car: new URL('./assets/car.png', import.meta.url).href,
});

function tiled(tex, x, y, w, h, metresPerTile, tint = 0xffffff) {
  const t = new TilingSprite({ texture: tex, width: w * U, height: h * U });
  t.position.set(x * U, y * U);
  t.tileScale.set((metresPerTile * U) / tex.width);
  t.tint = tint;
  return t;
}

function at(parent, x, y, rot, fn) {
  const c = new Container();
  const g = new Graphics();
  A.rotated(rot, () => fn(g));
  c.addChild(g);
  c.position.set(x * U, y * U);
  c.rotation = rot;
  parent.addChild(c);
  return c;
}

// ---------- clutter from reference picture 3 ----------

function crate(g, x, y, s, rot = 0) {
  const c = Math.cos(rot);
  const sn = Math.sin(rot);
  const P = (dx, dy) => [(x + dx * c - dy * sn) * U, (y + dx * sn + dy * c) * U];
  const h = s / 2;
  g.poly([...P(-h, -h), ...P(h, -h), ...P(h, h), ...P(-h, h)]).fill(0xb08250).stroke({ width: 1.4, color: 0x3b3430, alpha: 0.8 });
  g.poly([...P(-h + 0.08, -h + 0.08), ...P(h - 0.08, -h + 0.08), ...P(h - 0.08, h - 0.08), ...P(-h + 0.08, h - 0.08)]).stroke({ width: 0.06 * U, color: 0x7a5530, alpha: 0.9 });
  g.moveTo(...P(-h + 0.1, -h + 0.1)).lineTo(...P(h - 0.1, h - 0.1)).stroke({ width: 0.07 * U, color: 0x7a5530 });
  g.moveTo(...P(h - 0.1, -h + 0.1)).lineTo(...P(-h + 0.1, h - 0.1)).stroke({ width: 0.07 * U, color: 0x7a5530 });
}

function pallet(g, x, y) {
  for (let i = 0; i < 5; i++) g.rect((x + i * 0.24) * U, y * U, 0.18 * U, 1.0 * U).fill(0xa98a62).stroke({ width: 1, color: 0x3b3430, alpha: 0.6 });
  for (const yy of [0.08, 0.46, 0.84]) g.rect(x * U, (y + yy) * U, 1.16 * U, 0.08 * U).fill({ color: 0x6b5235, alpha: 0.8 });
}

function barrel(g, x, y, color) {
  g.circle(x * U, y * U, 0.36 * U).fill(color).stroke({ width: 1.3, color: 0x2a2a2e, alpha: 0.8 });
  g.circle(x * U, y * U, 0.26 * U).stroke({ width: 0.04 * U, color: 0x000000, alpha: 0.3 });
  g.circle((x - 0.1) * U, (y - 0.1) * U, 0.08 * U).fill({ color: 0xffffff, alpha: 0.35 });
}

function fence(g, x0, x1, y) {
  for (let x = x0; x <= x1; x += 0.5) g.rect((x - 0.05) * U, (y - 0.05) * U, 0.1 * U, 0.1 * U).fill(0x3f4247);
  g.rect(x0 * U, (y - 0.03) * U, (x1 - x0) * U, 0.06 * U).fill(0x55585e);
}

function clutter(g) {
  crate(g, 25.6, 5.7, 1.0, 0.1);
  crate(g, 26.3, 6.6, 0.8, -0.2);
  pallet(g, 23.6, 5.3);
  barrel(g, 21.2, 5.6, 0x3a6aa0);
  barrel(g, 21.9, 5.9, 0x9a3a2a);
  fence(g, 20.3, 29.5, 4.9);
}

// ---------- shadows for the fx look ----------

function longShadows(houses, cars, trees, lamps, people, style) {
  const c = new Container();
  const g = new Graphics();
  const k = 2.4; // long, low sun as in picture 3
  const dx = style.shadow.dx;
  const dy = style.shadow.dy;
  const col = 0x161320;
  for (const b of houses) {
    const len = b.height * 0.12 * k;
    const sx = dx * len;
    const sy = dy * len;
    const { x, y, w, h } = b;
    g.poly([x, y, x + w, y, x + w + sx, y + sy, x + w + sx, y + h + sy, x + sx, y + h + sy, x, y + h].map((v) => v * U)).fill({ color: col, alpha: 0.55 });
    // Shade gathers at the foot of the wall.
    g.rect((x - 0.4) * U, (y + h) * U, (w + 0.8) * U, 0.9 * U).fill({ color: col, alpha: 0.35 });
  }
  for (const [x, y, r] of trees) g.circle((x + dx * 2.6) * U, (y + dy * 2.6) * U, r * 0.9 * U).fill({ color: col, alpha: 0.5 });
  for (const [x, y, rot] of cars) {
    const cc = Math.cos(rot);
    const s = Math.sin(rot);
    const P = (a, b) => [(x + dx * 0.9 + a * cc - b * s) * U, (y + dy * 0.9 + a * s + b * cc) * U];
    g.poly([...P(-2.2, -0.95), ...P(2.2, -0.95), ...P(2.2, 0.95), ...P(-2.2, 0.95)]).fill({ color: col, alpha: 0.55 });
  }
  for (const [x, y] of lamps) g.moveTo(x * U, y * U).lineTo((x + dx * 4) * U, (y + dy * 4) * U).stroke({ width: 0.18 * U, color: col, alpha: 0.5 });
  for (const [x, y] of people) g.ellipse((x + dx * 0.6) * U, (y + dy * 0.6) * U, 0.25 * U, 0.5 * U).fill({ color: col, alpha: 0.45 });
  c.addChild(g);
  c.filters = [new BlurFilter({ strength: 5, quality: 3 })];
  return c;
}

// Darker edges: a picture that is clear in the middle and dark at the rim.
let vignetteTex = null;
function vignette(w, h) {
  if (!vignetteTex) {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const ctx = c.getContext('2d');
    const gr = ctx.createRadialGradient(128, 128, 60, 128, 128, 182);
    gr.addColorStop(0, 'rgba(0,0,0,0)');
    gr.addColorStop(1, 'rgba(0,0,0,0.22)');
    ctx.fillStyle = gr;
    ctx.fillRect(0, 0, 256, 256);
    vignetteTex = Texture.from(c);
  }
  const s = new Sprite(vignetteTex);
  s.width = w * U;
  s.height = h * U;
  return s;
}

// ---------- the street ----------

export function streetTest(baseStyle, { evening = false, tex = false, fx = false } = {}) {
  const T = tex ? TEX : null;
  const style = evening ? { ...baseStyle, shadow: { ...baseStyle.shadow, alpha: baseStyle.shadow.alpha * 0.3 } } : baseStyle;
  const root = new Container();
  const cam = { x: 15, y: 13 };
  const r = A.rng(17);
  const ground = new Container();
  const gv = new Graphics();
  if (T) {
    ground.addChild(tiled(T.sidewalk, 0, 0, 30, 9.5, 4));
    ground.addChild(tiled(T.asphalt, 0, 9.5, 30, 1.6, 6, 0xd99a88));
    ground.addChild(tiled(T.asphalt, 0, 11.25, 30, 12, 11));
    ground.addChild(tiled(T.sidewalk, 0, 23.4, 30, 3.1, 4));
  } else {
    A.drawSidewalk(gv, style, 0, 0, 30, 9.5);
    A.drawBikeLane(gv, style, 0, 9.5, 30, 1.6);
    A.drawRoad(gv, style, 0, 11.25, 30, 12, r, { lanes: [14.25, 20.25] });
    A.drawSidewalk(gv, style, 0, 23.4, 30, 3.1);
  }
  if (T) {
    // Only the painted bike symbols from the bike lane.
    const bl = new Graphics();
    A.drawBikeLane(bl, style, 0, 9.5, 30, 1.6);
    bl.children?.length;
    ground.addChild(tiled(T.asphalt, 0, 9.5, 30, 1.6, 6, 0xd99a88));
    const sym = new Graphics();
    A.drawBikeLane(sym, { ...style, ground: { ...style.ground, bikeLane: 0x000000 } }, 0, 9.5, 30, 1.6);
    sym.alpha = 1;
    // drawBikeLane paints the lane first; mask it out by drawing only symbols.
    bl.destroy();
    sym.destroy();
    const s2 = new Graphics();
    for (let xx = 3; xx < 29; xx += 12) {
      const cy = 10.3 + 0.15;
      s2.circle((xx - 0.42) * U, cy * U, 0.27 * U).stroke({ width: 0.06 * U, color: 0xf2efe6, alpha: 0.85 });
      s2.circle((xx + 0.42) * U, cy * U, 0.27 * U).stroke({ width: 0.06 * U, color: 0xf2efe6, alpha: 0.85 });
      s2.moveTo((xx - 0.42) * U, cy * U).lineTo((xx - 0.02) * U, cy * U).lineTo((xx + 0.3) * U, (cy - 0.38) * U).lineTo((xx - 0.12) * U, (cy - 0.38) * U).lineTo((xx - 0.02) * U, cy * U).stroke({ width: 0.06 * U, color: 0xf2efe6, alpha: 0.85 });
    }
    ground.addChild(s2);
  }
  A.drawCurb(gv, style, 0, 11.2, 30);
  A.drawLaneDashes(gv, style, 0, 17.25, 20);
  A.drawCrosswalk(gv, style, 21, 11.3, 12);
  A.drawCurb(gv, style, 0, 23.25, 30);
  A.drawManhole(gv, style, 10.5, 15.2);
  A.drawDrain(gv, style, 12, 11.55);
  A.drawDrain(gv, style, 27, 11.55);
  A.drawDrain(gv, style, 6, 22.95);
  ground.addChild(gv);
  root.addChild(ground);

  const list = [
    { x: 0.5, y: -4, w: 9.5, h: 8.5, height: 14, roof: 'gable', facade: style.facades[0], roofColor: style.roofs[0], seed: 0.21 },
    { x: 10.5, y: -4, w: 9, h: 8.5, height: 17, roof: 'flat', facade: style.facades[3], roofColor: 0x9a978f, seed: 0.62 },
    { x: 20, y: -4, w: 9.5, h: 8.5, height: 11, roof: 'gable', facade: style.facades[2], roofColor: style.roofs[3], seed: 0.83 },
  ];
  const cars = [[5.5, 14.3, Math.PI, 0x7f95b0, 'car'], [14, 20.2, 0, 0xd0cdc5, 'small']];
  const trees = [[27.5, 6.3, 2.3], [25, 25, 1.8]];
  const lamps = [[5.5, 8.6], [19.8, 8.6]];
  const people = [[4.5, 7.7], [17, 6.4], [4, 25], [4.9, 25.3], [9, 10.3]];

  const draw = (fn) => (fx ? A.withoutShadows(fn) : fn());
  if (fx) root.addChild(longShadows(list, cars, trees, lamps, people, style));
  else {
    const sh = new Graphics();
    for (const b of list) A.drawHouseShadow(sh, style, b);
    root.addChild(sh);
  }
  const furn = new Graphics();
  draw(() => {
    A.drawBench(furn, style, 7, 6.2);
    A.drawBin(furn, style, 9.2, 6.2);
    A.drawBikeRack(furn, style, 12.5, 7.4, 4);
    A.drawSign(furn, style, 19, 8.9, 'parking');
    A.drawSign(furn, style, 24.5, 8.9, 'bus');
    A.drawPlanter(furn, style, 1.2, 5.6, 3.2, 1.4, 4);
    A.drawPlanter(furn, style, 13, 24.3, 3, 1.3, 8);
    A.drawBin(furn, style, 17.4, 24.9);
  });
  clutter(furn);
  root.addChild(furn);
  draw(() => {
    at(root, 12.5, 7.4, Math.PI / 2, (g) => A.drawBike(g, style, 0xc0504a));
    at(root, 13.3, 7.4, Math.PI / 2, (g) => A.drawBike(g, style, 0x4a76c0));
    at(root, 14.9, 7.4, Math.PI / 2, (g) => A.drawBike(g, style, 0x2f2f33));
  });
  for (const [x, y, rot, color, kind] of cars) {
    if (T) {
      if (!fx) {
        const s0 = new Sprite(T.car);
        s0.anchor.set(0.5);
        s0.tint = 0x000000;
        s0.alpha = 0.3;
        s0.position.set((x + 0.4) * U, (y + 0.5) * U);
        s0.rotation = rot + Math.PI;
        s0.scale.set(((kind === 'small' ? 3.8 : 4.4) * U) / T.car.width);
        s0.filters = [new BlurFilter({ strength: 3 })];
        root.addChild(s0);
      }
      const s = new Sprite(T.car);
      s.anchor.set(0.5);
      // The generated car faces left; the game's cars face +x.
      s.rotation = rot + Math.PI;
      s.position.set(x * U, y * U);
      s.scale.set(((kind === 'small' ? 3.8 : 4.4) * U) / T.car.width);
      root.addChild(s);
    } else draw(() => at(root, x, y, rot, (g) => A.drawCar(g, style, kind, color)));
  }
  draw(() => {
    at(root, 9, 10.3, 0, (g) => {
      A.drawBike(g, style, 0x3f9a6a);
      A.drawPerson(g, style, { shirt: 0xd6b13c, hair: 0x2b2b2b });
    });
    at(root, 17, 6.4, Math.PI, (g) => A.drawPerson(g, style, { shirt: 0x6a5acd, hair: 0xd9b26a }));
    at(root, 4, 25, 0, (g) => A.drawPerson(g, style, { shirt: 0x3f9a6a, hair: 0x7a4a2a, skin: 0xb07a4f }));
    at(root, 4.9, 25.3, 0, (g) => A.drawPerson(g, style, { shirt: 0xc0504a, hair: 0x2b2b2b }));
    at(root, 4.5, 7.7, 0.3, (g) => A.drawPerson(g, style, { shirt: 0xf0a43a, ring: true }));
  });

  // Houses: leaning walls; roofs from the generated picture or drawn.
  const hs = evening ? { ...style, windowLit: 0xffcf7a, litChance: 0.5 } : style;
  const d2 = (b) => (b.x + b.w / 2 - cam.x) ** 2 + (b.y + b.h / 2 - cam.y) ** 2;
  for (const b of [...list].sort((p, q) => d2(q) - d2(p))) {
    const hg = new Graphics();
    if (T && b.roof === 'gable') {
      A.drawHouseWalls(hg, hs, b, cam);
      root.addChild(hg);
      root.addChild(texturedGable(b, cam, T.roof, style));
    } else {
      A.drawHouse(hg, hs, b, cam);
      root.addChild(hg);
    }
  }
  const top = new Graphics();
  let lampHeads;
  draw(() => {
    lampHeads = lamps.map(([x, y]) => A.drawLamp(top, style, x, y, 1, cam));
  });
  root.addChild(top);
  for (const [x, y, rr] of trees) {
    if (T) {
      const ox = (x - cam.x) * LEAN * 7;
      const oy = (y - cam.y) * LEAN * 7;
      if (!fx) {
        const s0 = new Sprite(T.tree);
        s0.anchor.set(0.5);
        s0.tint = 0x000000;
        s0.alpha = 0.35;
        s0.position.set((x + 1.0) * U, (y + 1.0) * U);
        s0.scale.set((rr * 2.3 * U) / T.tree.width);
        s0.filters = [new BlurFilter({ strength: 4 })];
        root.addChild(s0);
      }
      const s = new Sprite(T.tree);
      s.anchor.set(0.5);
      s.position.set((x + ox) * U, (y + oy) * U);
      s.scale.set((rr * 2.3 * U) / T.tree.width);
      root.addChild(s);
    } else {
      const tg = new Graphics();
      draw(() => A.drawTree(tg, style, x, y, rr, x === 27.5 ? 9 : 3));
      root.addChild(tg);
    }
  }

  if (evening) {
    const L = createLightLayer(30, 26.5, 0.58);
    root.addChild(L.root);
    const ring = new Graphics().circle(4.5 * U, 7.7 * U, 0.75 * U).stroke({ width: 2.5, color: 0xffffff, alpha: 0.85 });
    root.addChild(ring);
    for (const [hx, hy] of lampHeads) {
      L.glow(hx, hy, 8, 0xffb35a, 0.6);
      L.glow(hx, hy, 3, 0xffd89a, 0.45);
      L.glow(hx, hy, 0.7, 0xffffff, 0.5);
    }
    L.cone(15.9, 19.65, -0.04, 10, 0xffe2a8, 0.32);
    L.cone(15.9, 20.75, 0.04, 10, 0xffe2a8, 0.32);
    L.glow(12.1, 19.7, 0.8, 0xff3020, 0.7);
    L.glow(12.1, 20.7, 0.8, 0xff3020, 0.7);
    L.cone(9.9, 10.3, 0, 5, 0xfff6d8, 0.45);
    L.glow(24.5, 8.4, 1.4, 0xfff0a0, 0.4);
    for (const wx of [2, 5, 8, 12, 15, 18, 22, 25, 28]) L.glow(wx, 4.6, 1.3, 0xffb050, 0.25);
  }

  if (fx) {
    // Picture 3's look: more contrast, a touch warmer, fine grain and darker edges.
    const cm = new ColorMatrixFilter();
    cm.contrast(0.18, true);
    cm.saturate(0.12, true);
    const noise = new NoiseFilter({ noise: 0.03, seed: 0.42 });
    root.filters = [cm, noise];
    const outer = new Container();
    outer.addChild(root);
    outer.addChild(vignette(30, 26.5));
    return { root: outer, w: 30, h: 26.5 };
  }
  return { root, w: 30, h: 26.5 };
}

// Gable roof planes filled with the roof picture, shaded by the sun.
function texturedGable(b, cam, tex, style) {
  const c = new Container();
  const roofH = Math.min(b.w, b.h) * 0.35;
  const cx = b.x + b.w / 2;
  const cy = b.y + b.h / 2;
  const o = [(cx - cam.x) * LEAN * b.height, (cy - cam.y) * LEAN * b.height];
  const k = LEAN * (b.height + roofH);
  const o2 = [(cx - cam.x) * k, (cy - cam.y) * k];
  const ov = 0.3;
  const x0 = b.x - ov + o[0], x1 = b.x + b.w + ov + o[0];
  const y0 = b.y - ov + o[1], y1 = b.y + b.h + ov + o[1];
  const planes = [
    { pts: [x0, y0, x1, y0, b.x + b.w + ov + o2[0], cy + o2[1], b.x - ov + o2[0], cy + o2[1]], shade: [0xffffff, 0.06] },
    { pts: [x0, y1, x1, y1, b.x + b.w + ov + o2[0], cy + o2[1], b.x - ov + o2[0], cy + o2[1]], shade: [0x000000, 0.28] },
  ];
  for (const pl of planes) {
    const xs = pl.pts.filter((_, i) => i % 2 === 0);
    const ys = pl.pts.filter((_, i) => i % 2 === 1);
    const minX = Math.min(...xs), minY = Math.min(...ys);
    const t = tiled(tex, minX, minY, Math.max(...xs) - minX, Math.max(...ys) - minY, 5, 0xe8d8d0);
    const m = new Graphics().poly(pl.pts.map((v) => v * U)).fill(0xffffff);
    t.mask = m;
    c.addChild(t, m);
    c.addChild(new Graphics().poly(pl.pts.map((v) => v * U)).fill({ color: pl.shade[0], alpha: pl.shade[1] }).stroke({ width: style.outline.width, color: style.outline.color, alpha: style.outline.alpha }));
  }
  c.addChild(new Graphics().moveTo((b.x - ov + o2[0]) * U, (cy + o2[1]) * U).lineTo((b.x + b.w + ov + o2[0]) * U, (cy + o2[1]) * U).stroke({ width: 0.16 * U, color: 0x5a2a20 }));
  return c;
}
