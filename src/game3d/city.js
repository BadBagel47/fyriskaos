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

function chunkOf(x, z) {
  return `${Math.floor(x / CHUNK)},${Math.floor(z / CHUNK)}`;
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
    trim: new Boxes(),
    glass: new Boxes(),
    lanterns: [],
    hedge: new Builder(),
    signs: [],
  };
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

function addHouse(chunk, b, index, env) {
  const R = rng(Math.floor(b.seed * 1e6) + index * 7);
  const ch = chunk;
  ch.dark = ch.trim;
  const floors = Math.max(1, Math.min(7, Math.round((b.height - 1) / FLOOR)));
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
  const shop = b.shop ?? R() < 0.3;
  const awnC = [0x2f6a4a, 0x8a2a2a, 0x2a4a7a, 0x6a4a2a][Math.floor(R() * 4)];

  // Body, plinth, darker ground floor, white bands and the main cornice.
  ch.wall.add(new THREE.BoxGeometry(W, top, D), wallC, m4(cx, top / 2, cz));
  // Bands go round the walls only (not slabs through the house), so a
  // cut-away house shows its floor, not white sheets.
  const band = (B, out, h, y, c) => {
    const t = out + 0.06;
    B.add(new THREE.BoxGeometry(W + out * 2, h, t), c, m4(cx, y, cz + D / 2 + out - t / 2));
    B.add(new THREE.BoxGeometry(W + out * 2, h, t), c, m4(cx, y, cz - D / 2 - out + t / 2));
    B.add(new THREE.BoxGeometry(t, h, D), c, m4(cx + W / 2 + out - t / 2, y, cz));
    B.add(new THREE.BoxGeometry(t, h, D), c, m4(cx - W / 2 - out + t / 2, y, cz));
  };
  band(ch.wall, 0.06, 1.0, 0.5, 0x8f8a82);
  band(ch.wall, 0.04, FLOOR - 0.2, 1.0 + (FLOOR - 0.2) / 2, ground);
  for (let f = 1; f < floors; f++) band(ch.trimB, 0.05, 0.16, 1.0 + f * FLOOR, white);
  band(ch.trimB, 0.3, 0.45, top + 0.22, white);

  const F = faces(cx, cz, W, D);
  // The front (door, bays, shops) faces a street the camera can see.
  const front = [F.S, F.E, F.W].find((f) => env.street(f)) || (W >= D ? F.S : b.seed < 0.5 ? F.E : F.W);
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
    if (f !== F.S && env.blocked(f)) continue;
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
        if (c % 2 === 0) {
          const [px, , pz] = at(f, u, 0, 1.5);
          stamp(ch.props, protoOf('flowers', (B) => P3.addFlowerBox(B, m4(0, 0, 0), 7)), m4(px, 0.12, pz, f.rot, 0.7, 0.8, 0.7));
        }
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

  // Roof: gable (most) or mansard, dormers and chimneys. Blocks made of
  // several parts get a flat roof with a parapet, vents and skylights.
  const along = W >= D;
  const rw = along ? W : D;
  const rd = along ? D : W;
  const rot = along ? 0 : Math.PI / 2;
  const roofKind = b.roof === 'mansard' && (rw < 7 || rd < 7) ? 'gable' : b.roof;
  if (roofKind === 'flat') {
    ch.trimB.add(new THREE.BoxGeometry(W - 0.2, 0.25, D - 0.2), [0x4c4a46, 0x464a50, 0x55493f][index % 3], m4(cx, top + 0.3, cz));
    for (let k = 0; k < Math.max(1, Math.floor((W * D) / 120)); k++) {
      const vx = cx + (R() - 0.5) * (W - 3);
      const vz = cz + (R() - 0.5) * (D - 3);
      if (R() < 0.5) ch.trimB.add(new THREE.BoxGeometry(1.2, 0.7, 1.2), 0x9a958c, m4(vx, top + 0.75, vz));
      else ch.glass.add(vx, top + 0.5, vz, 0, 1.6, 0.2, 1.1, 0x5d7186);
    }
    ch.wall.add(new THREE.BoxGeometry(0.9, 2.2, 0.9), 0xa85c48, m4(cx + (R() - 0.5) * (W - 2), top + 1.4, cz + (R() - 0.5) * (D - 2)));
    return;
  }
  const rh = Math.min(rd * 0.42, 5.2);
  const roofC = [0xffffff, 0xf0d8d0, 0xe8e0d8, 0x9aa0a8][b.roofIndex % 4];
  const roofGeo = roofKind === 'gable' ? gableRoof(rw, rd, rh, 0.45) : mansardRoof(rw, rd, rh, 0.4);
  ch.roof.add(roofGeo, roofC, m4(cx, top + 0.45, cz, rot));
  if (roofKind === 'gable') ch.trimB.add(new THREE.BoxGeometry(rw + 1.0, 0.18, 0.4), 0x9a4e3a, m4(cx, top + 0.45 + rh, cz, rot));
  const dormers = rw > 6 ? Math.max(1, Math.floor(rw / 5)) : 0;
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

// Copy a finished geometry into a builder at a place (much faster than
// building the same lamp or bench again from its parts).
function stamp(B, geo, mm) {
  const p = geo.attributes.position.array;
  const n = geo.attributes.normal.array;
  const c = geo.attributes.color.array;
  const e = mm.elements;
  for (let i = 0; i < p.length; i += 3) {
    const x = p[i], y = p[i + 1], z = p[i + 2];
    B.pos.push(e[0] * x + e[4] * y + e[8] * z + e[12], e[1] * x + e[5] * y + e[9] * z + e[13], e[2] * x + e[6] * y + e[10] * z + e[14]);
    const nx = n[i], ny = n[i + 1], nz = n[i + 2];
    const tx = e[0] * nx + e[4] * ny + e[8] * nz, ty = e[1] * nx + e[5] * ny + e[9] * nz, tz = e[2] * nx + e[6] * ny + e[10] * nz;
    const l = Math.hypot(tx, ty, tz) || 1;
    B.nor.push(tx / l, ty / l, tz / l);
    B.col.push(c[i], c[i + 1], c[i + 2]);
  }
}
const proto = {};
function protoOf(name, make) {
  if (!proto[name]) {
    const B = new Builder();
    make(B);
    proto[name] = B.build({ outline: false });
  }
  return proto[name];
}


// ---------- the city map (F-005): ground, houses and furniture per piece, built as you go ----------

// Greedy rectangles of one ground type inside one piece of the map.
function rects(map, type, x0, z0, x1, z1) {
  const { cells, width } = map;
  const w = x1 - x0;
  const used = new Uint8Array(w * (z1 - z0));
  const out = [];
  for (let z = z0; z < z1; z++)
    for (let x = x0; x < x1; x++) {
      if (used[(z - z0) * w + (x - x0)] || cells[z * width + x] !== type) continue;
      let xe = x;
      while (xe + 1 < x1 && !used[(z - z0) * w + (xe + 1 - x0)] && cells[z * width + xe + 1] === type) xe++;
      let ze = z;
      grow: while (ze + 1 < z1) {
        for (let k = x; k <= xe; k++) if (used[(ze + 1 - z0) * w + (k - x0)] || cells[(ze + 1) * width + k] !== type) break grow;
        ze++;
      }
      for (let zz = z; zz <= ze; zz++) used.fill(1, (zz - z0) * w + (x - x0), (zz - z0) * w + (xe - x0) + 1);
      out.push([x, z, xe + 1, ze + 1]);
    }
  return out;
}

function slabBox(B, r, top, color, bottom = -1.2) {
  const [x0, z0, x1, z1] = r;
  const g = new THREE.BoxGeometry(x1 - x0, top - bottom, z1 - z0);
  // The side walls are lit almost like the top: thin cracks between two
  // slabs show the wall below, and a low evening sun would light it far more
  // than the ground and draw bright lines (F-061).
  const N = g.attributes.normal;
  for (let i = 0; i < N.count; i++)
    if (Math.abs(N.getY(i)) < 0.5) {
      const l = Math.hypot(N.getX(i) * 0.25, 1, N.getZ(i) * 0.25);
      N.setXYZ(i, (N.getX(i) * 0.25) / l, 1 / l, (N.getZ(i) * 0.25) / l);
    }
  B.add(g, color, m4((x0 + x1) / 2, (top + bottom) / 2, (z0 + z1) / 2));
}

function mergeBuilders(a, b) {
  if (!a.pos.length && !b.pos.length) return null;
  const g = new THREE.BufferGeometry();
  const cat = (k) => {
    const out = new Float32Array(a[k].length + b[k].length);
    out.set(a[k], 0);
    out.set(b[k], a[k].length);
    return out;
  };
  g.setAttribute('position', new THREE.BufferAttribute(cat('pos'), 3));
  g.setAttribute('normal', new THREE.BufferAttribute(cat('nor'), 3));
  g.setAttribute('color', new THREE.BufferAttribute(cat('col'), 3));
  g.computeBoundingSphere();
  return g;
}

// A thin box lying along a segment (road paint, railings, hedges).
function along(B, ax, az, bx, bz, y, width, height, color) {
  const L = Math.hypot(bx - ax, bz - az);
  if (L < 0.05) return;
  B.add(new THREE.BoxGeometry(L, height, width), color, m4((ax + bx) / 2, y, (az + bz) / 2, -Math.atan2(bz - az, bx - ax)));
}

const BIKE_COLORS = [0xc0504a, 0x4a76c0, 0x3f9a6a, 0xd6b13c, 0x2f2f33];

// A unit box with only the faces the tilted camera can see on a facade
// detail: the front and the top (a third of a full box's triangles).
function frontTopBox() {
  const g = new THREE.BufferGeometry();
  const p = [-0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5];
  const n = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];
  g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(n, 3));
  g.setIndex([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]);
  g.computeBoundingSphere();
  return g;
}

export function createCity(map, mats) {
  const G = map.G;
  const at = (x, z) => map.cellAt(x, z);
  const isStreet = (t) => t === G.road || t === G.sidewalk || t === G.bike;
  const group = new THREE.Group();
  const unit = frontTopBox();

  // What goes in each piece: house parts, lamps, props, trees, road paint, railings.
  const plan = new Map();
  const planOf = (x, z) => {
    const k = chunkOf(x, z);
    let p = plan.get(k);
    if (!p) plan.set(k, (p = { parts: [], lamps: [], props: [], trees: [], paint: [], rails: [], strips: [], signs: [] }));
    return p;
  };
  map.buildings.forEach((b, i) => !b.landmark && planOf(b.x + b.w / 2, b.y + b.h / 2).parts.push([b, i]));
  for (const l of map.lamps) planOf(l.x, l.y).lamps.push(l);
  for (const p of map.props) planOf(p.x, p.y).props.push(p);
  const R = rng(91);
  for (const t of map.trees) {
    const pick = R();
    const sc = (t.canopy / 2.7) * (0.9 + R() * 0.2);
    planOf(t.x, t.y).trees.push({ pick, m: m4(t.x, 0.1, t.y, R() * Math.PI * 2, sc, sc * (0.92 + R() * 0.16), sc) });
  }
  // Road paint: dashed centre lines on wide roads, zebra crossings at junctions.
  const drive = map.roads.filter((r) => !r.foot && r.kind !== 'service');
  const ends = new Map();
  for (const r of drive)
    for (const [i, j] of [[0, 1], [r.pts.length - 1, r.pts.length - 2]]) {
      const key = `${Math.round(r.pts[i][0])},${Math.round(r.pts[i][1])}`;
      if (!ends.has(key)) ends.set(key, []);
      ends.get(key).push({ r, p: r.pts[i], q: r.pts[j] });
    }
  for (const r of drive) {
    if (r.w < 9 || r.bridge) continue;
    let carry = 0;
    for (let k = 0; k + 1 < r.pts.length; k++) {
      const [ax, az] = r.pts[k];
      const [bx, bz] = r.pts[k + 1];
      const L = Math.hypot(bx - ax, bz - az);
      for (let t = carry; t < L; t += 6) {
        const t2 = Math.min(L, t + 3);
        if (t > 9 && t2 < L - 9) planOf(ax, az).paint.push([ax + ((bx - ax) * t) / L, az + ((bz - az) * t) / L, ax + ((bx - ax) * t2) / L, az + ((bz - az) * t2) / L, 0.16]);
      }
      carry = 0;
    }
  }
  for (const arms of ends.values()) {
    if (arms.length < 3) continue;
    // A street sign on one corner of each junction (D-057).
    {
      const { r, p, q } = arms[0];
      const L = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1;
      const dx = (q[0] - p[0]) / L;
      const dz = (q[1] - p[1]) / L;
      const off = r.w / 2 + 1.0;
      planOf(p[0], p[1]).signs.push([p[0] + dx * (r.w / 2 + 3) - dz * off, p[1] + dz * (r.w / 2 + 3) + dx * off, 1]);
    }
    for (const { r, p, q } of arms) {
      const L = Math.hypot(q[0] - p[0], q[1] - p[1]);
      if (L < 14 || r.w < 7) continue;
      const dx = (q[0] - p[0]) / L;
      const dz = (q[1] - p[1]) / L;
      const d = r.w / 2 + 4.5;
      for (let k = -r.w / 2 + 0.7; k < r.w / 2 - 0.5; k += 1.1) {
        const cx = p[0] + dx * d - dz * k;
        const cz = p[1] + dz * d + dx * k;
        planOf(cx, cz).paint.push([cx - dx * 1.4, cz - dz * 1.4, cx + dx * 1.4, cz + dz * 1.4, 0.55]);
      }
    }
  }
  map.spawns.cars.forEach((c, i) => {
    if (i < 2 || i % 6) return;
    const nx = -Math.sin(c.heading);
    const nz = Math.cos(c.heading);
    for (const s of [1, -1]) {
      const x = c.x + nx * s * 2.9;
      const z = c.y + nz * s * 2.9;
      if (at(x, z) === G.sidewalk) {
        planOf(x, z).signs.push([x, z, 0]);
        break;
      }
    }
  });
  // Smooth road surfaces along the centre lines, over the 1 m ground grid
  // (so diagonal streets and paths are not stepped): sidewalk, carriageway,
  // red bike lanes at the edges, curbs. [x0, z0, x1, z1, width, y, colour, layer]
  for (const r of map.roads) {
    for (let k = 0; k + 1 < r.pts.length; k++) {
      const [ax, az] = r.pts[k];
      const [bx, bz] = r.pts[k + 1];
      const L = Math.hypot(bx - ax, bz - az);
      if (L < 0.2) continue;
      const ux = (bx - ax) / L;
      const uz = (bz - az) / L;
      const nx = -uz;
      const nz = ux;
      const list = planOf((ax + bx) / 2, (az + bz) / 2).strips;
      // Overlap a little at both ends so bends have no gaps.
      const e = r.foot ? r.w / 2 : r.w / 2 + 1;
      const seg = (off, w, y, col, layer, ext = e) => list.push([ax - ux * ext + nx * off, az - uz * ext + nz * off, bx + ux * ext + nx * off, bz + uz * ext + nz * off, w, y, col, layer]);
      if (r.foot) {
        if (r.kind === 'cycleway') seg(0, r.w, 0.128, 0xd0705c, 'asphalt');
        else seg(0, r.w, 0.126, r.kind === 'pedestrian' ? 0xffffff : 0xe8d6b0, 'slabs');
        continue;
      }
      const side = r.kind === 'service' ? 1.2 : 3;
      seg(0, r.w + side * 2 + 1, 0.124, 0xffffff, 'slabs', e + side);
      seg(0, r.w, 0.13, 0xffffff, 'asphalt');
      if (r.bike) for (const sgn of [-1, 1]) seg(sgn * (r.w / 2 - 0.85), 1.7, 0.133, 0xd0705c, 'asphalt', e - 1);
      for (const sgn of [-1, 1]) seg(sgn * (r.w / 2 + 0.12), 0.24, 0.15, 0xb4b0a8, 'trimB', 0);
    }
  }
  for (const br of map.bridges)
    for (let k = 0; k + 1 < br.pts.length; k++) {
      const [ax, az] = br.pts[k];
      const [bx, bz] = br.pts[k + 1];
      const L = Math.hypot(bx - ax, bz - az);
      if (L < 1) continue;
      const nx = -(bz - az) / L;
      const nz = (bx - ax) / L;
      for (const s of [-1, 1]) planOf(ax, az).rails.push([ax + nx * s * (br.w / 2 - 0.2), az + nz * s * (br.w / 2 - 0.2), bx + nx * s * (br.w / 2 - 0.2), bz + nz * s * (br.w / 2 - 0.2)]);
    }

  // Is a facade hidden (another house right outside) or facing a street?
  const outside = (f, d) => [-0.3, 0, 0.3].map((u) => at(f.x + f.tx * f.L * u + f.nx * d, f.z + f.tz * f.L * u + f.nz * d));
  const env = {
    blocked: (f) => outside(f, 1.5).filter((t) => t === G.building).length >= 2,
    street: (f) => outside(f, 5).some(isStreet),
  };

  // Build one piece as a series of small steps, so a frame never stalls.
  function* buildChunk(key) {
    const [cx, cz] = key.split(',').map(Number);
    const x0 = cx * CHUNK;
    const z0 = cz * CHUNK;
    const x1 = Math.min(map.width, x0 + CHUNK);
    const z1 = Math.min(map.height, z0 + CHUNK);
    const ch = newChunk();
    const p = plan.get(key) || { parts: [], lamps: [], props: [], trees: [], paint: [], rails: [], strips: [], signs: [] };
    if (x0 < map.width && z0 < map.height) {
      for (const r of rects(map, G.road, x0, z0, x1, z1)) slabBox(ch.asphalt, r, 0.12, 0xffffff);
      for (const r of rects(map, G.bike, x0, z0, x1, z1)) slabBox(ch.asphalt, r, 0.12, 0xd0705c);
      for (const r of rects(map, G.sidewalk, x0, z0, x1, z1)) slabBox(ch.slabs, r, 0.12, 0xffffff);
      for (const r of rects(map, G.slab, x0, z0, x1, z1)) slabBox(ch.slabs, r, 0.12, 0xece6da);
      for (const r of rects(map, G.path, x0, z0, x1, z1)) slabBox(ch.slabs, r, 0.11, 0xe8d6b0);
      for (const r of rects(map, G.deck, x0, z0, x1, z1)) slabBox(ch.slabs, r, 0.12, 0xd9d4ca, -0.9);
      // Under the houses: a dark floor, seen when a house is cut away.
      for (const r of rects(map, G.building, x0, z0, x1, z1)) slabBox(ch.slabs, r, 0.13, 0x6a6258);
      for (const r of rects(map, G.grass, x0, z0, x1, z1)) slabBox(ch.grass, r, 0.1, 0xffffff);
      yield;
      hedges(ch, x0, z0, x1, z1);
      yield;
    }
    for (const [ax, az, bx, bz, w, y, col, layer] of p.strips) along(ch[layer], ax, az, bx, bz, y - 0.02, w, 0.04, col);
    for (const [ax, az, bx, bz, w] of p.paint) along(ch.slabs, ax, az, bx, bz, 0.138, w, 0.02, 0xffffff);
    for (const [ax, az, bx, bz] of p.rails) {
      along(ch.trimB, ax, az, bx, bz, -0.4, 0.5, 1.1, 0x8a8278); // stone edge of the bridge
      const L = Math.hypot(bx - ax, bz - az);
      P3.addRailing(ch.props, m4(ax, 0.12, az, -Math.atan2(bz - az, bx - ax)), L);
    }
    for (const [b, i] of p.parts) {
      const h = b.house;
      const one = h.parts === 1;
      addHouse(ch, { x: b.x, y: b.y, w: b.w, h: b.h, height: b.height, roof: one ? h.roof : Math.min(b.w, b.h) >= 9 ? 'gable' : 'flat', facadeIndex: h.facade, roofIndex: h.facade % 3, seed: h.seed + (i % 7) * 0.013, shop: h.shop }, i, env);
      yield;
    }
    for (const [sx, sz, face] of p.signs) {
      P3.addSignPost(ch.props, m4(sx, 0.12, sz), 2.7);
      ch.signs.push([sx, sz, face]);
    }
    for (const l of p.lamps) {
      const rot = Math.atan2(l.ax || 0, l.ay || 1);
      const place = m4(l.x, 0.12, l.y, rot);
      stamp(ch.props, protoOf('lamp', (B) => P3.addLamp(B, m4(0, 0, 0), 1)), place);
      ch.lanterns.push(place.clone().multiply(m4(0, 4.64, 1.12)));
    }
    for (const q of p.props) {
      if (q.kind === 'bench') stamp(ch.props, protoOf('bench', (B) => P3.addBench(B, m4(0, 0, 0))), m4(q.x, 0.12, q.y, -(q.rot || 0)));
      else if (q.kind === 'bin') stamp(ch.props, protoOf('bin', (B) => P3.addBin(B, m4(0, 0, 0))), m4(q.x, 0.12, q.y));
      else if (q.kind === 'rack') {
        // A hoop rack with bikes in most slots (D-057).
        const n = q.n || 4;
        stamp(ch.props, protoOf(`rack${n}`, (B) => P3.addRack(B, m4(0, 0, 0), n)), m4(q.x - (n * 0.8) / 2, 0.12, q.y));
        for (let k = 0; k < n; k++) if ((k * 7 + Math.round(q.x)) % 4 !== 0) stamp(ch.props, protoOf(`bike${k % 5}`, (B) => P3.addBike(B, m4(0, 0, 0, Math.PI / 2), BIKE_COLORS[k % 5])), m4(q.x - (n * 0.8) / 2 + k * 0.8, 0.12, q.y));
      }
    }
    yield;
    finish(key, ch, p);
  }

  // Hedges (and some railings) where grass meets the sidewalk (D-057).
  function hedges(ch, x0, z0, x1, z1) {
    const W = map.width;
    const run = (cond, fixed, from, to, horiz, side) => {
      let s = -1;
      for (let v = from; v <= to; v++) {
        const ok = v < to && cond(v);
        if (ok && s < 0) s = v;
        if (!ok && s >= 0) {
          if (v - s >= 3) {
            const [ax, az, bx, bz] = horiz ? [s, fixed + 0.45 * side + 0.5, v, fixed + 0.45 * side + 0.5] : [fixed + 0.45 * side + 0.5, s, fixed + 0.45 * side + 0.5, v];
            along(ch.hedge, ax, az, bx, bz, 0.55, 0.75, 0.9, 0x9ab878);
            const L = v - s;
            for (let t = 0.5; t < L; t += 1.3) {
              const px = horiz ? s + t : ax;
              const pz = horiz ? az : s + t;
              ch.hedge.add(new THREE.IcosahedronGeometry(0.55, 1), 0xa8c884, m4(px, 0.92, pz));
            }
            if ((s + fixed) % 3 === 0) P3.addRailing(ch.props, m4(horiz ? s : ax - side * 0.6, 0.12, horiz ? az - side * 0.6 : s, horiz ? 0 : -Math.PI / 2), L);
          }
          s = -1;
        }
      }
    };
    for (let z = z0; z < z1; z++)
      for (const dz of [-1, 1]) {
        if (z + dz < 0 || z + dz >= map.height) continue;
        run((x) => map.cells[z * W + x] === G.grass && [G.sidewalk, G.slab].includes(map.cells[(z + dz) * W + x]), z, x0, x1, true, dz < 0 ? -1 : 1);
      }
    for (let x = x0; x < x1; x++)
      for (const dx of [-1, 1]) {
        if (x + dx < 0 || x + dx >= W) continue;
        run((z) => map.cells[z * W + x] === G.grass && [G.sidewalk, G.slab].includes(map.cells[z * W + x + dx]), x, z0, z1, false, dx < 0 ? -1 : 1);
      }
  }

  const live = new Map(); // key -> { meshes, trees }
  const building = new Map(); // key -> generator
  const built = (B) => (B.pos.length ? B.build({ outline: false }) : null);
  function finish(key, ch, p) {
    const meshes = [];
    const add = (geo, mat, cast = true, receive = true) => {
      if (!geo) return;
      const m = geo.isInstancedMesh ? geo : new THREE.Mesh(geo, mat);
      m.castShadow = cast;
      m.receiveShadow = receive;
      group.add(m);
      meshes.push(m);
    };
    add(built(ch.asphalt), mats.asphalt, false);
    add(built(ch.slabs), mats.slabs, false);
    add(built(ch.grass), mats.grass, false);
    add(built(ch.hedge), mats.hedge);
    add(built(ch.wall), mats.wall);
    add(built(ch.roof), mats.roof);
    add(mergeBuilders(ch.trimB, ch.props), mats.plain, false);
    add(ch.trim.mesh(mats.trimI, unit), null, false);
    add(ch.glass.mesh(mats.glassI, unit), null, false);
    if (ch.signs.length) {
      // Sign faces from the style test's atlas, turned towards the camera.
      const pos = [];
      const uv = [];
      for (const [sx, sz, face] of ch.signs) {
        const w = face === 1 ? 1.6 : 0.7;
        const h = face === 1 ? 0.4 : 0.7;
        const y = 2.7 + h / 2;
        const quad = [[-w / 2, -h / 2, 0, 0], [w / 2, -h / 2, 1, 0], [w / 2, h / 2, 1, 1], [-w / 2, -h / 2, 0, 0], [w / 2, h / 2, 1, 1], [-w / 2, h / 2, 0, 1]];
        for (const [qx, qy, u, v] of quad) {
          pos.push(sx + qx, y + qy, sz + 0.06);
          uv.push((face + u) / 4, v);
        }
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
      g.computeVertexNormals();
      g.computeBoundingSphere();
      add(g, signMat, false, false);
    }
    if (ch.lanterns.length) {
      const lg = new THREE.InstancedMesh(lanternGeo, mats.lantern, ch.lanterns.length);
      ch.lanterns.forEach((mm, i) => lg.setMatrixAt(i, mm));
      lg.computeBoundingSphere();
      add(lg, null, false, false);
      // A halo at each lantern (F-059): from the tilted camera the lantern's
      // roof hides its glass, so the light shows as a small glow facing the
      // camera; bright enough in the evening for the bloom to pick it up.
      if (mats.halo) {
        const hm = new THREE.InstancedMesh(haloGeo, mats.halo, ch.lanterns.length);
        ch.lanterns.forEach((mm, i) => hm.setMatrixAt(i, haloAt.makeTranslation(mm.elements[12], mm.elements[13] + 0.1, mm.elements[14])));
        hm.computeBoundingSphere();
        hm.renderOrder = 4;
        add(hm, null, false, false);
      }
    }
    const entry = { meshes, trees: [], plan: p };
    live.set(key, entry);
    treesFor(entry);
  }
  const lanternGeo = P3.lanternGlass();
  // The halo faces the camera, which always looks north at the same tilt.
  const haloGeo = new THREE.PlaneGeometry(1.5, 1.5).rotateX(-(Math.PI / 2 - THREE.MathUtils.degToRad(33)));
  const haloAt = new THREE.Matrix4();
  const signMat = new THREE.MeshStandardMaterial({ map: P3.signAtlas(), roughness: 0.5, side: THREE.DoubleSide });
  function treesFor(entry) {
    for (const m of entry.trees) group.remove(m);
    entry.trees = [];
    const kinds = treeKinds();
    const byShape = new Map();
    for (const t of entry.plan.trees) {
      const shape = Math.min(kinds.length - 1, Math.floor(t.pick * kinds.length));
      if (!byShape.has(shape)) byShape.set(shape, []);
      byShape.get(shape).push(t.m);
    }
    for (const [shape, list] of byShape)
      for (const [geo, mat] of kinds[shape].parts(mats)) {
        const im = new THREE.InstancedMesh(geo, mat, list.length);
        list.forEach((mm, i) => im.setMatrixAt(i, mm));
        im.computeBoundingSphere();
        im.castShadow = true;
        im.receiveShadow = true;
        group.add(im);
        entry.trees.push(im);
      }
  }
  function drop(key) {
    const e = live.get(key);
    if (!e) return;
    for (const m of [...e.meshes, ...e.trees]) {
      group.remove(m);
      // Shared shapes (trees, lanterns, the unit box) stay; the piece's own geometry goes.
      if (m.geometry !== unit && m.geometry !== lanternGeo && !e.trees.includes(m)) m.geometry.dispose();
      if (m.isInstancedMesh) m.dispose();
    }
    live.delete(key);
  }

  // Keep the pieces near the camera built, nearest first, within a time budget.
  const RADIUS = 190;
  function update(x, z, budgetMs = 4) {
    const t0 = performance.now();
    const want = [];
    const r = Math.ceil(RADIUS / CHUNK);
    const kx = Math.floor(x / CHUNK);
    const kz = Math.floor(z / CHUNK);
    for (let i = kx - r; i <= kx + r; i++)
      for (let j = kz - r; j <= kz + r; j++) {
        if (i < -1 || j < -1 || i * CHUNK > map.width || j * CHUNK > map.height) continue;
        const d = Math.hypot((i + 0.5) * CHUNK - x, (j + 0.5) * CHUNK - z);
        if (d < RADIUS) want.push([d, `${i},${j}`]);
      }
    want.sort((a, b) => a[0] - b[0]);
    for (const [, key] of want) {
      if (live.has(key)) continue;
      let gen = building.get(key);
      if (!gen) building.set(key, (gen = buildChunk(key)));
      while (performance.now() - t0 < budgetMs) {
        if (gen.next().done) {
          building.delete(key);
          break;
        }
      }
      if (performance.now() - t0 >= budgetMs) break;
    }
    for (const key of [...live.keys()]) {
      const [i, j] = key.split(',').map(Number);
      if (Math.hypot((i + 0.5) * CHUNK - x, (j + 0.5) * CHUNK - z) > RADIUS + CHUNK * 1.5) drop(key);
    }
  }

  return {
    group,
    update,
    get pieces() {
      return live.size;
    },
    // CC0 trees arrive after the start (D-048).
    rebuildTrees() {
      for (const e of live.values()) treesFor(e);
    },
  };
}
