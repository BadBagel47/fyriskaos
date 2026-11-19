// The game's city in 3D (F-042), built from the same map as the simulation.
// The map is cut into 64 m pieces; each piece is a handful of meshes (ground,
// walls, roofs, trim, windows, props, trees), so the phone only draws the
// pieces in view. Windows and facade details are instanced unit boxes.

import * as THREE from '../../vendor/three/three.module.js';
import { Builder, m4, gableRoof, mansardRoof } from '../stiltest/geo.js';
import * as P3 from '../stiltest/props3.js';
import { treeKinds } from './trees.js';

export const CHUNK = 64;
const FLOOR = 3.2;
const FACADES = [0xe2b25c, 0xf0d58c, 0xe7a184, 0xf3eee4, 0xd9c7a6, 0xe9c27a, 0xc8d3b8];

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

// Instances of a unit box: position, turn and size per instance, one colour each.
class Boxes {
  constructor() {
    this.m = [];
    this.c = [];
  }
  add(x, y, z, rotY, sx, sy, sz, color, extra) {
    const mm = m4(x, y, z, rotY, 1, 1, 1);
    if (extra) mm.multiply(extra);
    mm.multiply(new THREE.Matrix4().makeScale(sx, sy, sz));
    this.m.push(mm);
    this.c.push(color);
  }
  mesh(material, geo) {
    if (!this.m.length) return null;
    const im = new THREE.InstancedMesh(geo, material, this.m.length);
    const col = new THREE.Color();
    this.m.forEach((mm, i) => {
      im.setMatrixAt(i, mm);
      im.setColorAt(i, col.set(this.c[i]));
    });
    im.computeBoundingSphere();
    return im;
  }
}

function chunkOf(map, x, z) {
  return `${Math.floor(x / CHUNK)},${Math.floor(z / CHUNK)}`;
}

const CELL = 32;
const cells = new Map();
function cellOf(x, z) {
  const key = `${Math.floor(x / CELL)},${Math.floor(z / CELL)}`;
  let c = cells.get(key);
  if (!c) cells.set(key, (c = { trim: new Boxes(), glass: new Boxes() }));
  return c;
}

function newChunk() {
  return {
    asphalt: new Builder(),
    slabs: new Builder(),
    grass: new Builder(),
    wall: new Builder(),
    roof: new Builder(),
    trimB: new Builder(),
    props: new Builder(),
    trees: new Map(),
  };
}

// ---------- ground: classify the map in half-metre cells, then merge into rectangles ----------

const RES = 0.5;
const C = { slab: 1, grass: 2, path: 3, road: 4, water: 5, edge: 6, deck: 7 };

function classify(map) {
  const nx = Math.ceil(map.width / RES);
  const nz = Math.ceil(map.height / RES);
  const g = new Uint8Array(nx * nz).fill(C.slab);
  const fill = (r, v) => {
    const x0 = Math.max(0, Math.round(r.x / RES));
    const x1 = Math.min(nx, Math.round((r.x + r.w) / RES));
    const z0 = Math.max(0, Math.round(r.y / RES));
    const z1 = Math.min(nz, Math.round((r.y + r.h) / RES));
    for (let z = z0; z < z1; z++) g.fill(v, z * nx + x0, z * nx + x1);
  };
  map.grass.forEach((r) => fill(r, C.grass));
  map.paths.forEach((r) => fill(r, C.path));
  const rv = map.river;
  fill({ x: 0, y: rv.y0 - 0.6, w: map.width, h: rv.y1 - rv.y0 + 1.2 }, C.edge);
  map.water.forEach((r) => fill(r, C.water));
  map.bridges.forEach((r) => fill(r, C.deck));
  map.roads.forEach((r) => fill(r, C.road));
  return { g, nx, nz };
}

// Greedy rectangles of one class inside one piece of the map.
function rects(cells, cls, x0, z0, x1, z1) {
  const { g, nx } = cells;
  const used = new Uint8Array((x1 - x0) * (z1 - z0));
  const w = x1 - x0;
  const out = [];
  for (let z = z0; z < z1; z++)
    for (let x = x0; x < x1; x++) {
      if (used[(z - z0) * w + (x - x0)] || g[z * nx + x] !== cls) continue;
      let xe = x;
      while (xe + 1 < x1 && !used[(z - z0) * w + (xe + 1 - x0)] && g[z * nx + xe + 1] === cls) xe++;
      let ze = z;
      grow: while (ze + 1 < z1) {
        for (let k = x; k <= xe; k++) if (used[(ze + 1 - z0) * w + (k - x0)] || g[(ze + 1) * nx + k] !== cls) break grow;
        ze++;
      }
      for (let zz = z; zz <= ze; zz++) used.fill(1, (zz - z0) * w + (x - x0), (zz - z0) * w + (xe - x0) + 1);
      out.push([x * RES, z * RES, (xe + 1) * RES, (ze + 1) * RES]);
    }
  return out;
}

function mergeBuilders(a, b) {
  if (!a.pos.length && !b.pos.length) return null;
  const g = new THREE.BufferGeometry();
  const cat = (k) => new Float32Array(a[k].length + b[k].length).fill(0).map((_, i) => (i < a[k].length ? a[k][i] : b[k][i - a[k].length]));
  g.setAttribute('position', new THREE.BufferAttribute(cat('pos'), 3));
  g.setAttribute('normal', new THREE.BufferAttribute(cat('nor'), 3));
  g.setAttribute('color', new THREE.BufferAttribute(cat('col'), 3));
  g.computeBoundingSphere();
  return g;
}

function slabBox(B, r, top, color, bottom = -1.2) {
  const [x0, z0, x1, z1] = r;
  B.add(new THREE.BoxGeometry(x1 - x0, top - bottom, z1 - z0), color, m4((x0 + x1) / 2, (top + bottom) / 2, (z0 + z1) / 2));
}

function buildGround(map, chunks) {
  const cells = classify(map);
  const n = CHUNK / RES;
  for (let cz = 0; cz * CHUNK < map.height; cz++)
    for (let cx = 0; cx * CHUNK < map.width; cx++) {
      const ch = getChunk(chunks, `${cx},${cz}`);
      const x0 = cx * n;
      const z0 = cz * n;
      const x1 = Math.min(cells.nx, x0 + n);
      const z1 = Math.min(cells.nz, z0 + n);
      for (const r of rects(cells, C.road, x0, z0, x1, z1)) slabBox(ch.asphalt, r, 0, 0xffffff);
      for (const r of rects(cells, C.slab, x0, z0, x1, z1)) slabBox(ch.slabs, r, 0.12, 0xffffff);
      for (const r of rects(cells, C.deck, x0, z0, x1, z1)) slabBox(ch.slabs, r, 0.12, 0xd9d4ca, -0.9);
      for (const r of rects(cells, C.path, x0, z0, x1, z1)) slabBox(ch.slabs, r, 0.11, 0xe8d6b0);
      for (const r of rects(cells, C.edge, x0, z0, x1, z1)) slabBox(ch.slabs, r, 0.16, 0x9a958c, -1.6);
      for (const r of rects(cells, C.grass, x0, z0, x1, z1)) slabBox(ch.grass, r, 0.1, 0xffffff);
    }
  // Curb stones along every road edge.
  for (const rd of map.roads) {
    const len = rd.dir === 'h' ? rd.w : rd.h;
    for (let t = 0; t < len; t += 16) {
      const l = Math.min(16, len - t);
      for (const side of [-1, 1]) {
        const [x, z, w, d] = rd.dir === 'h' ? [rd.x + t + l / 2, rd.c + side * (map.roadHalf + 0.12), l, 0.24] : [rd.c + side * (map.roadHalf + 0.12), rd.y + t + l / 2, 0.24, l];
        getChunk(chunks, chunkOf(map, x, z)).trimB.add(new THREE.BoxGeometry(w, 0.15, d), 0xb4b0a8, m4(x, 0.075, z));
      }
    }
  }
  // Bridge railings.
  for (const b of map.bridges)
    for (const x of [b.x + 0.2, b.x + b.w - 0.2]) {
      const ch = getChunk(chunks, chunkOf(map, x, b.y + b.h / 2));
      P3.addRailing(ch.props, m4(x, 0.12, b.y, -Math.PI / 2), b.h);
    }
  // Road paint: dashed centre lines and zebra crossings.
  const dash = (x, z, w, d) => getChunk(chunks, chunkOf(map, x, z)).slabs.add(new THREE.BoxGeometry(w, 0.02, d), 0xffffff, m4(x, 0.006, z));
  const e = map.edge;
  for (const rd of map.roads) {
    if (rd.dir === 'h') {
      for (let x = rd.x + 2; x < rd.x + rd.w - 3; x += 6) if (!map.vRoads.some((c) => Math.abs(x + 1.5 - c) < e + 1)) dash(x + 1.5, rd.c, 3, 0.18);
    } else {
      for (let z = rd.y + 2; z < rd.y + rd.h - 3; z += 6) if (!map.hRoads.some((c) => Math.abs(z + 1.5 - c) < e + 1)) dash(rd.c, z + 1.5, 0.18, 3);
    }
  }
  const half = map.roadHalf;
  for (const vx of map.vRoads)
    for (const hy of map.hRoads) {
      const crosses = map.roads.some((rd) => rd.dir === 'v' && rd.c === vx && hy > rd.y && hy < rd.y + rd.h);
      if (!crosses) continue;
      for (const sgn of [-1, 1])
        for (let k = -half + 0.6; k < half - 0.4; k += 1.2) {
          dash(vx + sgn * (half + 1.2), hy + k + 0.3, 1.8, 0.55);
          dash(vx + k + 0.3, hy + sgn * (half + 1.2), 0.55, 1.8);
        }
    }
}

function getChunk(chunks, key) {
  let c = chunks.get(key);
  if (!c) chunks.set(key, (c = newChunk()));
  return c;
}

// ---------- houses ----------

// One facade: centre on the wall, outward normal, along-direction and turn.
function faces(cx, cz, W, D) {
  return {
    S: { x: cx, z: cz + D / 2, nx: 0, nz: 1, tx: 1, tz: 0, L: W, rot: 0 },
    E: { x: cx + W / 2, z: cz, nx: 1, nz: 0, tx: 0, tz: -1, L: D, rot: Math.PI / 2 },
    W: { x: cx - W / 2, z: cz, nx: -1, nz: 0, tx: 0, tz: 1, L: D, rot: -Math.PI / 2 },
    N: { x: cx, z: cz - D / 2, nx: 0, nz: -1, tx: -1, tz: 0, L: W, rot: Math.PI },
  };
}

function addHouse(chunk, b, index, neighbours) {
  const R = rng(Math.floor(b.seed * 1e6) + index * 7);
  const ch = { ...chunk, ...cellOf(b.x + b.w / 2, b.y + b.h / 2) };
  ch.dark = ch.trim;
  const floors = Math.max(2, Math.min(6, Math.round((b.height - 1) / FLOOR)));
  const top = floors * FLOOR + 1.0;
  const W = b.w;
  const D = b.h;
  const cx = b.x + W / 2;
  const cz = b.y + D / 2;
  const wallC = FACADES[(b.facadeIndex + index) % FACADES.length];
  const ground = new THREE.Color(wallC).multiplyScalar(0.82).getHex();
  const white = 0xf4efe6;
  const ornate = R() < 0.4;
  const frameC = R() < 0.3 ? 0x5a3a2a : R() < 0.5 ? 0x2f4a3a : 0xf6f2ea;
  const wstyle = Math.floor(R() * 4);
  const lintel = ornate ? (R() < 0.5 ? 'pediment' : 'hood') : ['hood', 'keystone', 'none'][Math.floor(R() * 3)];
  const shop = R() < 0.3;
  const awnC = [0x2f6a4a, 0x8a2a2a, 0x2a4a7a, 0x6a4a2a][Math.floor(R() * 4)];

  // Body, plinth, darker ground floor, white bands and the main cornice.
  ch.wall.add(new THREE.BoxGeometry(W, top, D), wallC, m4(cx, top / 2, cz));
  const band = (B, out, h, y, c) => B.add(new THREE.BoxGeometry(W + out * 2, h, D + out * 2), c, m4(cx, y, cz));
  band(ch.wall, 0.06, 1.0, 0.5, 0x8f8a82);
  band(ch.wall, 0.04, FLOOR - 0.2, 1.0 + (FLOOR - 0.2) / 2, ground);
  for (let f = 1; f < floors; f++) band(ch.trimB, 0.05, 0.16, 1.0 + f * FLOOR, white);
  band(ch.trimB, 0.3, 0.45, top + 0.22, white);

  const F = faces(cx, cz, W, D);
  const front = W >= D ? F.S : b.seed < 0.5 ? F.E : F.W;
  const at = (f, u, y, o) => [f.x + f.tx * u + f.nx * o, y, f.z + f.tz * u + f.nz * o];

  const win = (f, u, y, fl, rot = f.rot, out = 0, narrow = 0) => {
    const topFloor = fl === floors - 1;
    const gh = topFloor ? 1.15 : wstyle === 3 ? 1.8 : 1.5;
    const yc = y + (gh - 1.5) / 2;
    const nx = Math.sin(rot);
    const nz = Math.cos(rot);
    const tx = Math.cos(rot);
    const tz = -Math.sin(rot);
    const p = (du, dy, o) => [f.x + f.tx * u + f.nx * out + tx * du + nx * o, yc + dy, f.z + f.tz * u + f.nz * out + tz * du + nz * o];
    const pane = (du, ww) => {
      const lit = R() < 0.1;
      ch.trim.add(...p(du, 0, 0.04), rot, ww + 0.22, gh + 0.24, 0.1, frameC);
      ch.glass.add(...p(du, 0, 0.05), rot, ww, gh, 0.12, lit ? 0xffc98a : [0x8fa6bf, 0x6f879f, 0xa9bccc, 0x5d7186][Math.floor(R() * 4)]);
      if (ww > 0.7) ch.trim.add(...p(du, 0, 0.06), rot, 0.06, gh, 0.15, frameC);
      if (!lit && R() < 0.25) ch.trim.add(...p(du - ww * 0.24, 0.05, 0.065), rot, ww * 0.4, gh * 0.85, 0.13, [0xf3eee0, 0xd9c7a0, 0xc7d4e0][Math.floor(R() * 3)]);
    };
    let ww = narrow || 1.05;
    if (wstyle === 1 && f === front && !narrow) {
      pane(-0.36, 0.52);
      pane(0.36, 0.52);
      ww = 1.3;
    } else pane(0, ww);
    ch.trim.add(...p(0, -gh / 2 - 0.18, 0.12), rot, ww + 0.3, 0.08, 0.3, 0x8e949a);
    if (wstyle === 2 && !topFloor) ch.trim.add(...p(0, gh / 2 + 0.2, 0.05), rot, ww * 0.8, 0.36, 0.1, frameC);
    const ly = gh / 2 + (wstyle === 2 && !topFloor ? 0.55 : 0.25);
    if (lintel === 'pediment' && !topFloor) {
      ch.trim.add(...p(0, ly, 0.07), rot, ww + 0.45, 0.22, 0.14, white);
      ch.trim.add(...p(0, ly + 0.2, 0.07), rot, ww * 0.7, 0.16, 0.12, white);
    } else if (lintel === 'hood') ch.trim.add(...p(0, ly, 0.12), rot, ww + 0.5, 0.16, 0.24, white);
    else if (lintel === 'keystone') ch.trim.add(...p(0, ly, 0.08), rot, 0.28, 0.34, 0.16, white);
  };

  // Facades the camera can see: south, east and west (the camera looks north).
  const bayCols = new Set();
  for (const f of [F.S, F.E, F.W]) {
    if (f !== F.S && neighbours(b, f.nx)) continue;
    const cols = Math.max(2, Math.floor(f.L / (ornate ? 2.9 : 2.6)));
    const step = f.L / cols;
    const doorCol = Math.floor(cols / 2);
    const isFront = f === front;
    bayCols.clear();
    if (isFront && cols >= 5 && R() < 0.65) {
      const k = Math.floor(R() * 3);
      if (k === 0) [1, cols - 2].forEach((c) => bayCols.add(c));
      else if (k === 1) bayCols.add(doorCol);
      else bayCols.add(cols - 2);
    }
    for (let fl = 0; fl < floors; fl++)
      for (let c = 0; c < cols; c++) {
        const u = -f.L / 2 + step * (c + 0.5);
        if (isFront && fl === 0 && c === doorCol) continue;
        if (isFront && fl === 0 && shop) continue;
        if (fl > 0 && bayCols.has(c)) continue;
        win(f, u, 1.0 + fl * FLOOR + 1.6, fl, f.rot, 0.04);
      }
    // Pilasters between the windows on ornate fronts.
    if (isFront && ornate)
      for (let c = 1; c < cols; c++) {
        const [x, , z] = at(f, -f.L / 2 + step * c, 0, 0.06);
        ch.trim.add(x, 1.0 + FLOOR + ((floors - 1) * FLOOR) / 2, z, f.rot, 0.3, (floors - 1) * FLOOR, 0.12, new THREE.Color(wallC).multiplyScalar(1.06).getHex());
      }
    if (!isFront) continue;
    // Brackets under the cornice.
    for (let k = 0; k < Math.floor(f.L / 0.9); k++) {
      const [x, , z] = at(f, -f.L / 2 + 0.45 + k * 0.9, 0, 0.25);
      ch.trim.add(x, top - 0.15, z, f.rot, 0.22, 0.35, 0.5, 0xe6dfd2);
    }
    // Door with a stone portal and steps.
    const du = -f.L / 2 + step * (doorCol + 0.5);
    const door = [0x5a3626, 0x2f4a3a, 0x3b4a6a, 0x6a2a24][b.facadeIndex % 4];
    const q = (dy, o) => at(f, du, dy, o);
    ch.trim.add(...q(1.6, 0.05), f.rot, 2.1, 3.2, 0.06, 0xd8d0c2);
    ch.trim.add(...q(3.6, 0.2), f.rot, 2.8, 0.3, 0.5, 0xe6dfd2);
    for (const s of [-1.1, 1.1]) {
      const [x, , z] = at(f, du + s, 0, 0.18);
      ch.trim.add(x, 1.65, z, f.rot, 0.3, 3.3, 0.4, 0xe6dfd2);
    }
    ch.dark.add(...q(1.3, 0.09), f.rot, 1.4, 2.6, 0.25, door);
    ch.glass.add(...q(2.85, 0.1), f.rot, 1.3, 0.38, 0.26, 0xffd9a0);
    ch.trim.add(...q(0.17, 0.55), f.rot, 2.6, 0.35, 1.1, 0xa29a8e);
    ch.trim.add(...q(0.06, 1.05), f.rot, 2.6, 0.12, 0.6, 0xa29a8e);
    // Shop windows and striped awnings.
    if (shop)
      for (let c = 0; c < cols; c++) {
        if (c === doorCol) continue;
        const u = -f.L / 2 + step * (c + 0.5);
        const [x, , z] = at(f, u, 0, 0.05);
        ch.glass.add(x, 1.55, z, f.rot, step * 0.82, 2.1, 0.16, 0xc8a878);
        for (let k = 0; k < 6; k++) {
          const [ax, , az] = at(f, u - step * 0.45 + (k + 0.5) * (step * 0.9 / 6), 0, 0.65);
          ch.trim.add(ax, 2.95, az, f.rot, step * 0.15, 0.06, 1.3, k % 2 ? 0xf2ede2 : awnC, new THREE.Matrix4().makeRotationX(0.32));
        }
      }
    // Bay windows: three-sided or square, from the first floor to the top.
    for (const bc of bayCols) {
      const u = -f.L / 2 + step * (bc + 0.5);
      const bh = (floors - 1) * FLOOR;
      const by = 1.0 + FLOOR;
      const bw = step * 1.3;
      const square = R() < 0.4;
      const fw = square ? bw : bw * 0.5;
      const Dp = square ? 0.9 : 1.3;
      const [bx, , bz] = at(f, u, 0, 0);
      const place = m4(bx, 0, bz, f.rot);
      ch.wall.add(bayPrism(bw, fw, Dp, bh), new THREE.Color(wallC).multiplyScalar(1.04).getHex(), place.clone().multiply(m4(0, by, 0)));
      for (let fl = 0; fl < floors; fl++) ch.trimB.add(bayPrism(bw + 0.3, fw + 0.2, Dp + 0.12, 0.18), white, place.clone().multiply(m4(0, by + fl * FLOOR - 0.09, 0)));
      const sa = Math.atan2(Dp, (bw - fw) / 2);
      const sx = (bw + fw) / 4;
      for (let fl = 1; fl < floors; fl++) {
        const y = 1.0 + fl * FLOOR + 1.6;
        win(f, u, y, fl, f.rot, Dp + 0.02);
        if (!square)
          for (const sg of [-1, 1]) {
            const g = { ...f, x: f.x + f.tx * (sg * sx) + f.nx * 0, z: f.z + f.tz * (sg * sx) };
            win(g, u, y, fl, f.rot + sg * sa, Dp / 2 + 0.03, Math.min(1.05, Math.hypot((bw - fw) / 2, Dp) - 0.6));
          }
      }
      ch.roof.add(bayCap(bw, fw, Dp), 0x6f7a82, place.clone().multiply(m4(0, by + bh + 0.05, 0)));
    }
  }

  // Roof: gable (most) or mansard, dormers and chimneys.
  const along = W >= D;
  const rw = along ? W : D;
  const rd = along ? D : W;
  const rh = Math.min(rd * 0.42, 5.2);
  const rot = along ? 0 : Math.PI / 2;
  const roofC = [0xffffff, 0xf0d8d0, 0xe8e0d8, 0x9aa0a8][b.roofIndex % 4];
  const roofGeo = b.roof === 'gable' ? gableRoof(rw, rd, rh, 0.45) : mansardRoof(rw, rd, rh, 0.4);
  ch.roof.add(roofGeo, roofC, m4(cx, top + 0.45, cz, rot));
  if (b.roof === 'gable') ch.trimB.add(new THREE.BoxGeometry(rw + 1.0, 0.18, 0.4), 0x9a4e3a, m4(cx, top + 0.45 + rh, cz, rot));
  const dormers = Math.max(1, Math.floor(rw / 5));
  for (let k = 0; k < dormers; k++) {
    const t = -rw / 2 + (rw / dormers) * (k + 0.5);
    const off = rd / 2 - 1.6;
    const [dx, dz] = along ? [cx + t, cz + off] : [cx + (b.seed < 0.5 ? off : -off), cz + t];
    const drot = along ? 0 : b.seed < 0.5 ? Math.PI / 2 : -Math.PI / 2;
    ch.wall.add(new THREE.BoxGeometry(1.5, 1.6, 1.4), wallC, m4(dx, top + 0.45 + 1.1, dz, drot));
    ch.roof.add(gableRoof(1.5, 1.4, 0.8, 0.15), roofC, m4(dx, top + 0.45 + 1.9, dz, drot + Math.PI / 2));
    const nx = Math.sin(drot);
    const nz = Math.cos(drot);
    ch.glass.add(dx + nx * 0.72, top + 0.45 + 1.1, dz + nz * 0.72, drot, 0.9, 0.9, 0.08, 0x6f879f);
  }
  for (const s of [-0.3, 0.28]) {
    const [hx, hz] = along ? [cx + rw * s, cz - 0.6] : [cx - 0.6, cz + rw * s];
    ch.wall.add(new THREE.BoxGeometry(0.9, 2.8, 0.9), 0xa85c48, m4(hx, top + 0.45 + rh * 0.65, hz));
    ch.trimB.add(new THREE.BoxGeometry(1.05, 0.15, 1.05), 0x6a3a2e, m4(hx, top + 0.45 + rh * 0.65 + 1.45, hz));
  }
}

function bayPrism(bw, fw, D, h) {
  const sh = new THREE.Shape();
  sh.moveTo(-bw / 2, 0);
  sh.lineTo(-fw / 2, -D);
  sh.lineTo(fw / 2, -D);
  sh.lineTo(bw / 2, 0);
  sh.lineTo(-bw / 2, 0);
  const g = new THREE.ExtrudeGeometry(sh, { depth: h, bevelEnabled: false, curveSegments: 1 });
  g.rotateX(-Math.PI / 2);
  return g;
}

function bayCap(bw, fw, D) {
  const o = 0.18;
  const ch = 0.85;
  const P = [[-bw / 2 - o, 0, 0], [-fw / 2 - o * 0.5, 0, D + o], [fw / 2 + o * 0.5, 0, D + o], [bw / 2 + o, 0, 0], [-fw * 0.3, ch, 0], [fw * 0.3, ch, 0]];
  const tri = [0, 1, 4, 1, 2, 5, 1, 5, 4, 2, 3, 5];
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(tri.flatMap((i) => P[i]), 3));
  g.computeVertexNormals();
  return g;
}

// ---------- street furniture and trees ----------

const lanterns = [];
function addFurniture(map, chunks) {
  for (const l of map.lamps) {
    const ch = getChunk(chunks, chunkOf(map, l.x, l.y));
    const rot = Math.atan2(l.ax || 0, l.ay || 1);
    const place = m4(l.x, 0.12, l.y, rot);
    P3.addLamp(ch.props, place, 1);
    lanterns.push(place.clone().multiply(m4(0, 4.64, 1.12)));
  }
  for (const p of map.props) {
    const ch = getChunk(chunks, chunkOf(map, p.x, p.y));
    if (p.kind === 'bench') P3.addBench(ch.props, m4(p.x, 0.12, p.y, -(p.rot || 0)));
    else if (p.kind === 'bin') P3.addBin(ch.props, m4(p.x, 0.12, p.y));
    else if (p.kind === 'planter') P3.addFlowerBox(ch.props, m4(p.x, 0.1, p.y, 0, (p.w || 3) / 1.8, 1, (p.h || 1.4) / 0.8), 7);
  }
  const R = rng(91);
  map.trees.forEach((t) => {
    const ch = getChunk(chunks, chunkOf(map, t.x, t.y));
    const kinds = treeKinds();
    const shape = Math.floor(R() * kinds.length);
    const s = (t.canopy / 2.7) * (0.9 + R() * 0.2);
    const list = ch.trees.get(shape) || [];
    list.push(m4(t.x, 0.1, t.y, R() * Math.PI * 2, s, s * (0.92 + R() * 0.16), s));
    ch.trees.set(shape, list);
  });
}

// ---------- build everything ----------

export function buildCity(map, mats, onProgress) {
  const chunks = new Map();
  buildGround(map, chunks);
  cells.clear();
  lanterns.length = 0;
  // A side wall closer than 3 m to another house is not seen: no windows there.
  const neighbours = (b, side) =>
    map.buildings.some((o) => o !== b && o.y < b.y + b.h - 1 && o.y + o.h > b.y + 1 && (side > 0 ? o.x >= b.x + b.w - 0.1 && o.x - (b.x + b.w) < 3 : o.x + o.w <= b.x + 0.1 && b.x - (o.x + o.w) < 3));
  map.buildings.forEach((b, i) => addHouse(getChunk(chunks, chunkOf(map, b.x + b.w / 2, b.y + b.h / 2)), b, i, neighbours));
  addFurniture(map, chunks);
  const unit = new THREE.BoxGeometry(1, 1, 1);
  const kinds = treeKinds();
  const group = new THREE.Group();
  const meshes = [];
  const add = (geo, mat, { cast = true, receive = true } = {}) => {
    if (!geo) return null;
    const m = geo.isMesh || geo.isInstancedMesh ? geo : new THREE.Mesh(geo, mat);
    if (geo.isInstancedMesh) m.material = mat;
    m.castShadow = cast;
    m.receiveShadow = receive;
    group.add(m);
    meshes.push(m);
    return m;
  };
  const built = (B) => (B.pos.length ? B.build({ outline: false }) : null);
  let n = 0;
  for (const ch of chunks.values()) {
    add(built(ch.asphalt), mats.asphalt, { cast: false });
    add(built(ch.slabs), mats.slabs, { cast: false });
    add(built(ch.grass), mats.grass, { cast: false });
    add(built(ch.wall), mats.wall);
    add(built(ch.roof), mats.roof);
    // Trim and street furniture share one material: one mesh.
    add(mergeBuilders(ch.trimB, ch.props), mats.plain);
    for (const [shape, list] of ch.trees) {
      const k = kinds[shape];
      for (const [geo, mat] of k.parts(mats)) {
        const im = new THREE.InstancedMesh(geo, mat, list.length);
        list.forEach((mm, i) => im.setMatrixAt(i, mm));
        im.computeBoundingSphere();
        add(im, mat);
      }
    }
    if (onProgress) onProgress(++n / chunks.size);
  }
  for (const c of cells.values()) {
    add(c.trim.mesh(mats.trimI, unit), mats.trimI, { cast: false });
    add(c.glass.mesh(mats.glassI, unit), mats.glassI, { cast: false });
  }
  // All lantern glasses in one instanced mesh.
  const lg = new THREE.InstancedMesh(P3.lanternGlass(), mats.lantern, lanterns.length);
  lanterns.forEach((mm, i) => lg.setMatrixAt(i, mm));
  lg.computeBoundingSphere();
  add(lg, mats.lantern, { cast: false, receive: false });
  let tris = 0;
  for (const m of meshes) {
    const g = m.geometry;
    const t = (g.index ? g.index.count : g.attributes.position.count) / 3;
    tris += t * (m.isInstancedMesh ? m.count : 1);
  }
  return { group, chunks: chunks.size, meshes: meshes.length, tris: Math.round(tris) };
}
