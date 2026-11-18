// The ground (F-037): streets, sidewalks, grass, water, shadows and flat
// street furniture are drawn once per 32 x 32 m piece of the map and kept as
// a picture. Only the pieces near the camera are kept, so the detailed
// style costs almost nothing while you play.

import { Container, Graphics, RenderTexture, Sprite } from '../vendor/pixi/pixi.min.mjs';
import * as A from './art/draw.js';
import * as D from './art/detail.js';
import { shade } from './art/color.js';

const U = A.U;
const CH = 32; // metres per piece
const PX = 30; // picture pixels per metre
const KEEP = 28; // pieces kept in memory

function inter(r, x, y, w, h) {
  const x0 = Math.max(r.x, x);
  const y0 = Math.max(r.y, y);
  const x1 = Math.min(r.x + r.w, x + w);
  const y1 = Math.min(r.y + r.h, y + h);
  return x1 > x0 && y1 > y0 ? { x: x0, y: y0, w: x1 - x0, h: y1 - y0 } : null;
}

const hits = (o, x, y, w, h, pad) => o.x > x - pad && o.x < x + w + pad && o.y > y - pad && o.y < y + h + pad;

export function drawGroundRegion(g, map, style, outside, x, y, w, h, seed) {
  const r = A.rng(seed);
  g.rect(x * U, y * U, w * U, h * U).fill(outside);
  const inMap = inter({ x: 0, y: 0, w: map.width, h: map.height }, x, y, w, h);
  if (!inMap) return;
  // Sidewalk slabs everywhere, then grass, gravel and water on top.
  g.rect(inMap.x * U, inMap.y * U, inMap.w * U, inMap.h * U).fill(style.ground.tileLine);
  D.slabTexture(g, style, inMap.x, inMap.y, inMap.w, inMap.h, seed + 1);
  map.grass.forEach((gr, i) => {
    const q = inter(gr, x, y, w, h);
    if (q) D.grassTexture(g, style, q.x, q.y, q.w, q.h, seed + 10 + i);
  });
  map.paths.forEach((p, i) => {
    const q = inter(p, x, y, w, h);
    if (q) D.gravelPath(g, style, q.x, q.y, q.w, q.h, seed + 30 + i);
  });
  const river = map.river;
  const band = inter({ x: 0, y: river.y0 - 0.6, w: map.width, h: river.y1 - river.y0 + 1.2 }, x, y, w, h);
  if (band) {
    g.rect(band.x * U, band.y * U, band.w * U, band.h * U).fill(0x5b7891);
    const wq = inter({ x: 0, y: river.y0, w: map.width, h: river.y1 - river.y0 }, x, y, w, h);
    if (wq) {
      g.rect(wq.x * U, wq.y * U, wq.w * U, wq.h * U).fill(0x6f8ea6);
      for (let i = 0; i < wq.w * wq.h * 0.15; i++) g.ellipse((wq.x + r() * wq.w) * U, (wq.y + r() * wq.h) * U, (0.3 + r() * 0.4) * U, 0.06 * U).fill({ color: 0xffffff, alpha: 0.14 });
    }
  }
  // Curbs: a strip of stone along both long sides of each road, with joints.
  for (const rd of map.roads) {
    const strips = rd.dir === 'h'
      ? [{ x: rd.x, y: rd.y - 0.35, w: rd.w, h: 0.35 }, { x: rd.x, y: rd.y + rd.h, w: rd.w, h: 0.35 }]
      : [{ x: rd.x - 0.35, y: rd.y, w: 0.35, h: rd.h }, { x: rd.x + rd.w, y: rd.y, w: 0.35, h: rd.h }];
    for (const st of strips) {
      const q = inter(st, x, y, w, h);
      if (!q) continue;
      g.rect(q.x * U, q.y * U, q.w * U, q.h * U).fill(style.ground.curb);
      if (rd.dir === 'h') for (let xx = Math.ceil(q.x); xx < q.x + q.w; xx++) g.rect(xx * U, q.y * U, 0.04 * U, q.h * U).fill({ color: 0x000000, alpha: 0.22 });
      else for (let yy = Math.ceil(q.y); yy < q.y + q.h; yy++) g.rect(q.x * U, yy * U, q.w * U, 0.04 * U).fill({ color: 0x000000, alpha: 0.22 });
    }
  }
  // Bridge decks with railings.
  for (const b of map.bridges) {
    const q = inter(b, x, y, w, h);
    if (!q) continue;
    g.rect(q.x * U, q.y * U, q.w * U, q.h * U).fill(style.ground.sidewalk);
    g.rect(b.x * U, b.y * U, 0.4 * U, b.h * U).fill(style.metal);
    g.rect((b.x + b.w - 0.4) * U, b.y * U, 0.4 * U, b.h * U).fill(style.metal);
  }
  // Asphalt with grain and wheel tracks.
  map.roads.forEach((rd, i) => {
    const q = inter(rd, x, y, w, h);
    if (!q) return;
    g.rect(q.x * U, q.y * U, q.w * U, q.h * U).fill(style.ground.asphalt);
    for (const off of [-4.1, -1.9, 1.9, 4.1]) {
      const band = rd.dir === 'h' ? { x: rd.x, y: rd.c + off - 0.4, w: rd.w, h: 0.8 } : { x: rd.c + off - 0.4, y: rd.y, w: 0.8, h: rd.h };
      const bq = inter(band, x, y, w, h);
      if (bq) g.rect(bq.x * U, bq.y * U, bq.w * U, bq.h * U).fill({ color: 0x000000, alpha: 0.03 });
    }
    D.asphaltTexture(g, style, q.x, q.y, q.w, q.h, seed + 50 + i);
  });
  // Dashed centre lines and zebra crossings.
  const e = map.edge;
  const lane = style.ground.lane;
  for (const rd of map.roads) {
    if (rd.dir === 'h') {
      if (rd.c < y - 1 || rd.c > y + h + 1) continue;
      for (let xx = Math.max(rd.x + 2, Math.floor((x - 8) / 6) * 6 + 2); xx < Math.min(rd.x + rd.w - 3, x + w + 2); xx += 6) {
        if (map.vRoads.some((c) => Math.abs(xx + 1.5 - c) < e + 1)) continue;
        g.rect(xx * U, (rd.c - 0.12) * U, 3 * U, 0.24 * U).fill(lane);
      }
    } else {
      if (rd.c < x - 1 || rd.c > x + w + 1) continue;
      for (let yy = Math.max(rd.y + 2, Math.floor((y - 8) / 6) * 6 + 2); yy < Math.min(rd.y + rd.h - 3, y + h + 2); yy += 6) {
        if (map.hRoads.some((c) => Math.abs(yy + 1.5 - c) < e + 1)) continue;
        g.rect((rd.c - 0.12) * U, yy * U, 0.24 * U, 3 * U).fill(lane);
      }
    }
  }
  const half = map.roadHalf;
  for (const vx of map.vRoads)
    for (const hy of map.hRoads) {
      if (!hits({ x: vx, y: hy }, x, y, w, h, 12)) continue;
      const crosses = map.roads.some((rd) => rd.dir === 'v' && rd.c === vx && hy > rd.y && hy < rd.y + rd.h);
      if (!crosses) continue;
      for (const sgn of [-1, 1])
        for (let k = -half + 0.6; k < half - 0.4; k += 1.2) {
          g.rect((vx + sgn * (half + 1.2) - 0.9) * U, (hy + k) * U, 1.8 * U, 0.6 * U).fill(lane);
          g.rect((vx + k) * U, (hy + sgn * (half + 1.2) - 0.9) * U, 0.6 * U, 1.8 * U).fill(lane);
        }
    }
  // Drains along the curbs and the odd manhole cover.
  for (const rd of map.roads) {
    const len = rd.dir === 'h' ? rd.w : rd.h;
    for (let t = 9; t < len; t += 17) {
      const p = (rd.dir === 'h' ? rd.x : rd.y) + t;
      if ((rd.dir === 'h' ? map.vRoads : map.hRoads).some((c) => Math.abs(p - c) < e + 2)) continue;
      const pt = rd.dir === 'h' ? { x: p, y: rd.c - half + 0.3 } : { x: rd.c - half + 0.3, y: p };
      if (hits(pt, x, y, w, h, 1)) A.drawDrain(g, style, pt.x, pt.y);
      if (t % 51 === 9) {
        const mh = rd.dir === 'h' ? { x: p + 4, y: rd.c + 2.6 } : { x: rd.c + 2.6, y: p + 4 };
        if (hits(mh, x, y, w, h, 1)) A.drawManhole(g, style, mh.x, mh.y);
      }
    }
  }
  // Shadows of houses and trees fall on the ground and never move.
  for (const b of map.buildings) if (inter({ x: b.x - 2, y: b.y - 2, w: b.w + 6, h: b.h + 6 }, x, y, w, h)) A.drawHouseShadow(g, style, b);
  for (const t of map.trees) if (hits(t, x, y, w, h, 6)) D.treeShadow(g, style, t.x, t.y, t.canopy);
  // Flat street furniture.
  for (const b of map.spawns.bikes) if (hits(b, x, y, w, h, 2)) {
    // A rack under each parked bike.
    const vert = Math.abs(Math.sin(b.heading)) > 0.5;
    if (vert) A.drawBikeRack(g, style, b.x, b.y, 1);
    else g.rect((b.x - 0.45) * U, (b.y - 0.04) * U, 0.9 * U, 0.08 * U).fill(style.metal);
  }
  for (const p of map.props) {
    if (!hits(p, x, y, w, h, 3)) continue;
    if (p.kind === 'bin') A.drawBin(g, style, p.x, p.y);
    else if (p.kind === 'planter') A.drawPlanter(g, style, p.x, p.y, p.w, p.h, 7);
    else if (p.kind === 'bench') {
      if (Math.abs(Math.sin(p.rot)) < 0.5) A.drawBench(g, style, p.x, p.y);
      else {
        // Benches along north-south streets, turned a quarter.
        g.rect((p.x - 0.25) * U, (p.y - 0.9) * U, 0.5 * U, 1.8 * U).fill(shade(0x8a6a48, -0.05)).stroke({ width: style.outline.width, color: style.outline.color, alpha: style.outline.alpha });
        for (let k = 0; k < 4; k++) g.rect((p.x - 0.2 + k * 0.13) * U, (p.y - 0.85) * U, 0.03 * U, 1.7 * U).fill({ color: 0x000000, alpha: 0.25 });
      }
    }
  }
}

export function createGround(app, map, styles, outside) {
  const layer = new Container();
  const pieces = new Map();
  let tick = 0;

  // Day and evening have their own pictures (the sun's shadows fade in the
  // evening). When the light changes, old pieces stay until their new
  // version is ready, so there are never holes in the ground.
  function bake(i, j, mode) {
    const g = new Graphics();
    drawGroundRegion(g, map, styles[mode], outside, i * CH, j * CH, CH, CH, (i * 73856093) ^ (j * 19349663));
    const holder = new Container();
    holder.addChild(g);
    g.position.set(-i * CH * U, -j * CH * U);
    holder.scale.set(PX / U);
    const rt = RenderTexture.create({ width: CH * PX, height: CH * PX, antialias: true });
    app.renderer.render({ container: holder, target: rt, clear: true });
    holder.destroy({ children: true });
    const sp = new Sprite(rt);
    sp.position.set(i * CH * U, j * CH * U);
    sp.scale.set(U / PX);
    layer.addChild(sp);
    return { sp, rt, used: tick, mode };
  }

  // Make sure the pieces around the camera exist; bake at most `budget` new ones.
  function update(cx, cy, halfW, halfH, budget = 2, mode = 'day') {
    tick++;
    const i0 = Math.floor((cx - halfW) / CH);
    const i1 = Math.floor((cx + halfW) / CH);
    const j0 = Math.floor((cy - halfH) / CH);
    const j1 = Math.floor((cy + halfH) / CH);
    // Nearest pieces first.
    const want = [];
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) want.push([i, j, (i + 0.5) * CH - cx, (j + 0.5) * CH - cy]);
    want.sort((a, b) => a[2] ** 2 + a[3] ** 2 - (b[2] ** 2 + b[3] ** 2));
    for (const [i, j] of want) {
      const key = `${i},${j}`;
      let p = pieces.get(key);
      if (!p || p.mode !== mode) {
        if (budget > 0) {
          budget--;
          const fresh = bake(i, j, mode);
          if (p) {
            p.sp.destroy();
            p.rt.destroy(true);
          }
          p = fresh;
          pieces.set(key, p);
        }
      }
      if (p) p.used = tick;
    }
    for (const p of pieces.values()) p.sp.visible = p.used === tick;
    if (pieces.size > KEEP) {
      const old = [...pieces.entries()].sort((a, b) => a[1].used - b[1].used).slice(0, pieces.size - KEEP);
      for (const [k, p] of old) {
        if (p.used === tick) continue;
        p.sp.destroy();
        p.rt.destroy(true);
        pieces.delete(k);
      }
    }
  }

  return { layer, update, count: () => pieces.size };
}
