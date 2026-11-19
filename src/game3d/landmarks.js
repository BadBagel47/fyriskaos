// Landmarks of central Uppsala as their own models (F-005): the cathedral
// (Domkyrkan), the castle (Slottet) on its terrace, and the bell tower
// Gunillaklockan. Placed and turned after their outlines in the map.
// Simplified, built from boxes, cylinders and cones like the rest.

import * as THREE from '../../vendor/three/three.module.js';
import { Builder, m4, gableRoof } from '../stiltest/geo.js';

const BRICK = 0xb5553f;
const BRICK_DARK = 0x8e3f30;
const COPPER = 0x5f9e8a;
const STONE = 0xc9c0b2;
const CASTLE = 0xd98a70;
const WHITE = 0xf2ece2;

// Centre, length direction and size of an outline (principal axes).
function frame(pts) {
  const n = pts.length;
  const cx = pts.reduce((s, p) => s + p[0], 0) / n;
  const cz = pts.reduce((s, p) => s + p[1], 0) / n;
  let sxx = 0, szz = 0, sxz = 0;
  for (const [x, z] of pts) {
    sxx += (x - cx) ** 2;
    szz += (z - cz) ** 2;
    sxz += (x - cx) * (z - cz);
  }
  const a = 0.5 * Math.atan2(2 * sxz, sxx - szz);
  const ux = Math.cos(a), uz = Math.sin(a);
  let lo = Infinity, hi = -Infinity, wlo = Infinity, whi = -Infinity;
  for (const [x, z] of pts) {
    const u = (x - cx) * ux + (z - cz) * uz;
    const w = -(x - cx) * uz + (z - cz) * ux;
    lo = Math.min(lo, u);
    hi = Math.max(hi, u);
    wlo = Math.min(wlo, w);
    whi = Math.max(whi, w);
  }
  const mu = (lo + hi) / 2;
  const mw = (wlo + whi) / 2;
  return { x: cx + ux * mu - uz * mw, z: cz + uz * mu + ux * mw, angle: a, L: hi - lo, W: whi - wlo };
}

export function buildLandmarks(map, mats) {
  const group = new THREE.Group();
  const wall = new Builder();
  const roof = new Builder();
  const trim = new Builder();
  // Real west in map coordinates (the map is turned along the street grid).
  const east = [Math.cos(map.north + Math.PI / 2), Math.sin(map.north + Math.PI / 2)];
  for (const b of map.houses) {
    if (!b.landmark || !b.outline) continue;
    const f = frame(b.outline);
    const place = m4(f.x, 0, f.z, -f.angle);
    // Local x runs along the length; flip so +x points east-ish.
    const flip = Math.cos(f.angle) * east[0] + Math.sin(f.angle) * east[1] < 0 ? -1 : 1;
    const at = (x, y, z, rot = 0) => place.clone().multiply(m4(x * flip, y, z, rot));
    if (b.landmark === 'domkyrkan') cathedral(wall, roof, trim, at, f, flip);
    if (b.landmark === 'slottet') castle(wall, roof, trim, at, f, flip);
  }
  const g = map.places.gunillaklockan;
  if (g) bellTower(wall, roof, trim, (x, y, z, rot = 0) => m4(g[0] + x, y, g[1] + z, rot));
  const add = (B, mat) => {
    if (!B.pos.length) return;
    const m = new THREE.Mesh(B.build({ outline: false }), mat);
    m.castShadow = true;
    m.receiveShadow = true;
    group.add(m);
  };
  add(wall, mats.wall);
  add(roof, mats.plain);
  add(trim, mats.plain);
  return group;
}

// Uppsala cathedral: a long red-brick church, transept, two west towers with
// slender green spires, steep copper roof, buttresses and pointed windows.
function cathedral(wall, roof, trim, at, f) {
  const L = Math.max(60, f.L);
  const W = Math.min(Math.max(18, f.W * 0.75), 26);
  const H = 22;
  const west = -L / 2;
  // Nave and choir.
  wall.add(new THREE.BoxGeometry(L - 16, H, W), BRICK, at(8, H / 2, 0));
  roof.add(gableRoof(L - 16, W, 14, 0.5), COPPER, at(8, H, 0));
  // Transept.
  wall.add(new THREE.BoxGeometry(14, H, W + 18), BRICK, at(4, H / 2, 0));
  roof.add(gableRoof(W + 18, 14, 12, 0.5), COPPER, at(4, H, 0, Math.PI / 2));
  // Rounded east end (choir).
  wall.add(new THREE.CylinderGeometry(W / 2, W / 2, H, 10, 1, false, 0, Math.PI), BRICK, at(L / 2 - 8, H / 2, 0, -Math.PI / 2));
  roof.add(new THREE.ConeGeometry(W / 2 + 0.5, 12, 10, 1, false, 0, Math.PI), COPPER, at(L / 2 - 8, H + 6, 0, -Math.PI / 2));
  // Buttresses and pointed windows along both sides.
  for (let x = west + 22; x < L / 2 - 10; x += 6)
    for (const s of [-1, 1]) {
      if (Math.abs(x - 4) < 9) continue;
      trim.add(new THREE.BoxGeometry(1.4, H * 0.8, 1.6), BRICK_DARK, at(x, H * 0.4, s * (W / 2 + 0.8)));
      trim.add(new THREE.BoxGeometry(2.2, 8, 0.3), 0x3d4a5c, at(x + 3, H * 0.55, s * (W / 2 + 0.05)));
      trim.add(new THREE.ConeGeometry(1.1, 2.2, 4), 0x3d4a5c, at(x + 3, H * 0.55 + 5, s * (W / 2 + 0.05)).multiply(new THREE.Matrix4().makeScale(1, 1, 0.15)));
    }
  // West front: two square towers with spires, a rose window and the portal.
  const tw = 11;
  for (const s of [-1, 1]) {
    const z = s * (W / 2 - tw / 2 + 2);
    wall.add(new THREE.BoxGeometry(tw, 46, tw), BRICK, at(west + tw / 2, 23, z));
    for (const y of [16, 30, 42]) trim.add(new THREE.BoxGeometry(tw + 0.6, 0.6, tw + 0.6), BRICK_DARK, at(west + tw / 2, y, z));
    for (const y of [20, 34]) trim.add(new THREE.BoxGeometry(0.3, 5, 2), 0x2a2f38, at(west - 0.05, y, z));
    // Copper spire with a lantern and a gilded tip.
    roof.add(new THREE.CylinderGeometry(tw * 0.42, tw * 0.5, 4, 8), COPPER, at(west + tw / 2, 48, z));
    roof.add(new THREE.ConeGeometry(tw * 0.42, 30, 8), COPPER, at(west + tw / 2, 65, z));
    trim.add(new THREE.SphereGeometry(0.7, 8, 6), 0xd4aa48, at(west + tw / 2, 80.5, z));
  }
  wall.add(new THREE.BoxGeometry(tw, 30, W - 2 * tw + 4), BRICK, at(west + tw / 2, 15, 0));
  trim.add(new THREE.CylinderGeometry(3.2, 3.2, 0.4, 16), 0x3d4a5c, at(west - 0.1, 22, 0).multiply(new THREE.Matrix4().makeRotationZ(Math.PI / 2)));
  trim.add(new THREE.BoxGeometry(0.6, 9, 5), 0x4a2e22, at(west - 0.2, 4.5, 0));
  trim.add(new THREE.ConeGeometry(2.6, 3, 4), STONE, at(west - 0.3, 10.5, 0).multiply(new THREE.Matrix4().makeScale(0.2, 1, 1)));
}

// Uppsala castle: a long salmon-red palace with white trim, a dark roof, and
// round towers with domes at the ends, on a stone terrace.
function castle(wall, roof, trim, at, f) {
  const L = Math.max(70, f.L * 0.95);
  const W = Math.min(Math.max(14, f.W * 0.45), 22);
  const H = 17;
  // Terrace.
  trim.add(new THREE.BoxGeometry(L + 16, 1.6, W + 16), STONE, at(0, 0.8, 0));
  wall.add(new THREE.BoxGeometry(L, H, W), CASTLE, at(0, H / 2 + 1.6, 0));
  roof.add(gableRoof(L, W, 7, 0.6), 0x3e4246, at(0, H + 1.6, 0));
  for (const y of [6, 11.5]) trim.add(new THREE.BoxGeometry(L + 0.3, 0.35, W + 0.3), WHITE, at(0, y + 1.6, 0));
  trim.add(new THREE.BoxGeometry(L + 0.8, 0.6, W + 0.8), WHITE, at(0, H + 1.6, 0));
  // Windows in rows on both long sides.
  for (let x = -L / 2 + 3; x < L / 2 - 2; x += 3.4)
    for (const s of [-1, 1])
      for (const y of [4, 9.5, 14]) trim.add(new THREE.BoxGeometry(1.3, 2.1, 0.2), 0x3a4656, at(x, y + 1.6, s * (W / 2 + 0.05)));
  // Round towers with domes and lanterns.
  for (const [s, r, h] of [[-1, 9, 30], [1, 7, 26]]) {
    const x = s * (L / 2);
    wall.add(new THREE.CylinderGeometry(r, r + 0.6, h, 16), CASTLE, at(x, h / 2 + 1.6, W / 2 - r * 0.4));
    trim.add(new THREE.CylinderGeometry(r + 0.4, r + 0.4, 0.6, 16), WHITE, at(x, h + 1.6, W / 2 - r * 0.4));
    roof.add(new THREE.SphereGeometry(r, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), 0x3e4246, at(x, h + 1.6, W / 2 - r * 0.4));
    roof.add(new THREE.CylinderGeometry(1.2, 1.4, 3, 8), 0x3e4246, at(x, h + r + 2.8, W / 2 - r * 0.4));
    roof.add(new THREE.ConeGeometry(1.4, 3, 8), 0x3e4246, at(x, h + r + 5.6, W / 2 - r * 0.4));
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2;
      for (const y of [8, 14, 20]) trim.add(new THREE.BoxGeometry(1.2, 2, 0.3), 0x3a4656, at(x + Math.cos(a) * (r + 0.05), y + 1.6, W / 2 - r * 0.4 + Math.sin(a) * (r + 0.05), -a + Math.PI / 2));
    }
  }
  // A central gate.
  trim.add(new THREE.BoxGeometry(4, 6, 0.6), WHITE, at(0, 4.6, W / 2 + 0.2));
  trim.add(new THREE.BoxGeometry(2.6, 4.4, 0.7), 0x3b2a20, at(0, 3.8, W / 2 + 0.25));
}

// Gunillaklockan: a small pink bell tower with a curved copper cap.
function bellTower(wall, roof, trim, at) {
  wall.add(new THREE.BoxGeometry(5, 9, 5), 0xe7a08a, at(0, 4.5, 0));
  trim.add(new THREE.BoxGeometry(5.6, 0.5, 5.6), WHITE, at(0, 9, 0));
  for (const r of [0, Math.PI / 2]) trim.add(new THREE.BoxGeometry(1.6, 2.4, 5.1), 0x2a2a2e, at(0, 7, 0, r));
  roof.add(new THREE.CylinderGeometry(1.2, 3.4, 3.4, 8), COPPER, at(0, 10.9, 0));
  roof.add(new THREE.SphereGeometry(1.3, 8, 6), COPPER, at(0, 13, 0));
  roof.add(new THREE.ConeGeometry(0.5, 2.4, 8), COPPER, at(0, 15, 0));
  trim.add(new THREE.SphereGeometry(0.3, 6, 4), 0xd4aa48, at(0, 16.3, 0));
  trim.add(new THREE.BoxGeometry(6.4, 0.6, 6.4), STONE, at(0, 0.3, 0));
}
