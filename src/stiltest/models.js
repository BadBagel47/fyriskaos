// Low-poly models built with code (no outside files): Luthagen stone houses,
// trees, lamps, benches, bins, bike racks, bikes, cars and people.
// Sizes are in metres; see docs/STYLE.md for the ratios.

import * as THREE from '../../vendor/three/three.module.js';
import { Builder, m4, gableRoof, mansardRoof } from './geo.js';

export const FLOOR = 3.2;
export const PERSON_SCALE = 1.3; // people are drawn a little larger so they read on a phone

// One stone house. Local frame: front facade towards +z, centred on x.
// The caller passes a matrix that places and turns it.
export function addHouse(B, P, h, place) {
  const { w, d, floors } = h;
  const H = floors * FLOOR + 1.0;
  const facade = P.facades[h.facade % P.facades.length];
  const at = (x, y, z, rot = 0) => place.clone().multiply(m4(x, y, z, rot));
  const box = (bw, bh, bd, c, x, y, z) => B.add(new THREE.BoxGeometry(bw, bh, bd), c, at(x, y, z));
  // Body, plinth, floor bands and cornice.
  box(w, H, d, facade, 0, H / 2, 0);
  box(w + 0.12, 1.0, d + 0.12, P.plinth, 0, 0.5, 0);
  for (let f = 1; f < floors; f++) box(w + 0.08, 0.14, d + 0.08, P.trim, 0, 1.0 + f * FLOOR, 0);
  box(w + 0.5, 0.4, d + 0.5, P.trim, 0, H + 0.2, 0);
  // Windows on the front and back: a light frame with dark glass.
  const cols = Math.max(2, Math.floor(w / 2.7));
  const step = w / cols;
  const bay = h.bay ? Math.floor(cols / 3) : -1;
  for (const side of [1, -1]) {
    for (let f = 0; f < floors; f++) {
      for (let c = 0; c < cols; c++) {
        const x = -w / 2 + step * (c + 0.5);
        if (side === 1 && f === 0 && c === Math.floor(cols / 2)) continue; // the door
        if (side === 1 && h.bay && (c === bay || c === bay + 1) && f > 0) continue;
        const y = 1.0 + f * FLOOR + 1.55;
        box(1.25, 1.75, 0.12, P.trim, x, y, side * (d / 2 + 0.03));
        box(0.95, 1.45, 0.14, P.window, x, y, side * (d / 2 + 0.06));
      }
    }
  }
  // Side windows, fewer.
  for (const side of [1, -1]) {
    const n = Math.max(1, Math.floor(d / 4));
    for (let f = 0; f < floors; f++)
      for (let c = 0; c < n; c++) {
        const z = -d / 2 + (d / n) * (c + 0.5);
        const y = 1.0 + f * FLOOR + 1.55;
        B.add(new THREE.BoxGeometry(0.12, 1.75, 1.25), P.trim, at(side * (w / 2 + 0.03), y, z));
        B.add(new THREE.BoxGeometry(0.14, 1.45, 0.95), P.window, at(side * (w / 2 + 0.06), y, z));
      }
  }
  // Front door with a portal and steps.
  const dx = -w / 2 + step * (Math.floor(cols / 2) + 0.5);
  box(2.0, 3.0, 0.2, P.trim, dx, 1.5, d / 2 + 0.06);
  box(1.4, 2.5, 0.24, P.door, dx, 1.25, d / 2 + 0.08);
  box(2.4, 0.3, 1.0, P.plinth, dx, 0.15, d / 2 + 0.5);
  // A bay window (burspråk) over two columns.
  if (h.bay) {
    const bx = -w / 2 + step * (bay + 1);
    const bh = (floors - 1) * FLOOR;
    box(step * 1.8, bh, 1.0, facade, bx, 1.0 + FLOOR + bh / 2, d / 2 + 0.5);
    box(step * 1.8 + 0.2, 0.25, 1.2, P.trim, bx, 1.0 + FLOOR + bh + 0.12, d / 2 + 0.55);
    for (let f = 1; f < floors; f++)
      for (const ox of [-step * 0.45, step * 0.45]) {
        const y = 1.0 + f * FLOOR + 1.55;
        box(1.25, 1.75, 0.12, P.trim, bx + ox, y, d / 2 + 1.03);
        box(0.95, 1.45, 0.14, P.window, bx + ox, y, d / 2 + 1.06);
      }
  }
  // Balconies on the courtyard side.
  for (let f = 1; f < floors; f++)
    for (let c = 1; c < cols; c += 3) {
      const x = -w / 2 + step * (c + 0.5);
      const y = 1.0 + f * FLOOR;
      box(2.0, 0.15, 0.9, P.trim, x, y, -d / 2 - 0.45);
      box(2.0, 0.9, 0.05, P.metal, x, y + 0.5, -d / 2 - 0.88);
    }
  // Roof: gable or mansard, with dormers and chimneys.
  const roofC = P.roofs[h.roof % P.roofs.length];
  const rh = h.roofType === 'mansard' ? 4.2 : Math.min(d * 0.4, 5);
  B.add(h.roofType === 'mansard' ? mansardRoof(w, d, rh) : gableRoof(w, d, rh), roofC, at(0, H + 0.4, 0));
  for (let c = 1; c < cols; c += 2) {
    const x = -w / 2 + step * (c + 0.5);
    const zf = d / 2 - (h.roofType === 'mansard' ? 0.6 : 1.4);
    box(1.4, 1.5, 1.2, facade, x, H + 0.4 + 1.0, zf);
    B.add(gableRoof(1.4, 1.2, 0.7, 0.1), roofC, place.clone().multiply(m4(x, H + 0.4 + 1.75, zf, Math.PI / 2)));
    box(0.8, 0.9, 0.08, P.window, x, H + 0.4 + 1.0, zf + 0.62);
  }
  // Roof detail: a ridge cap and rows of tiles or seams, a shade darker.
  const seam = new THREE.Color(roofC).multiplyScalar(0.8).getHex();
  if (h.roofType === 'mansard') {
    for (const f of [0.25, 0.5]) for (const side of [1, -1]) box(w + 0.4, 0.08, 0.1, seam, 0, H + 0.4 + 4.2 * 0.7 * f, side * (d / 2 + 0.3 - (d / 2 - (d / 2 - 1.6)) * f - 0.02));
    box(w - 3.2, 0.12, 0.3, seam, 0, H + 0.4 + 4.2 + 0.02, 0);
  } else {
    box(w + 0.8, 0.22, 0.45, seam, 0, H + 0.4 + rh + 0.02, 0);
    for (const f of [0.2, 0.4, 0.6, 0.8]) for (const side of [1, -1]) box(w + 0.6, 0.07, 0.1, seam, 0, H + 0.4 + rh * f + 0.03, side * (d / 2 + 0.35) * (1 - f));
  }
  for (const cx of [-w * 0.3, w * 0.25]) box(0.8, 2.4, 0.8, P.chimney, cx, H + 0.4 + rh * 0.7, -d * 0.1);
}

// A parked car (static, merged into the block).
export function addCar(B, P, color, place) {
  const at = (x, y, z) => place.clone().multiply(m4(x, y, z));
  const darker = new THREE.Color(color).multiplyScalar(0.85).getHex();
  B.add(new THREE.BoxGeometry(4.2, 0.7, 1.78), color, at(0, 0.6, 0));
  B.add(new THREE.BoxGeometry(2.3, 0.62, 1.58), darker, at(-0.25, 1.25, 0));
  B.add(new THREE.BoxGeometry(0.1, 0.5, 1.4), P.window, at(0.92, 1.25, 0));
  B.add(new THREE.BoxGeometry(0.1, 0.45, 1.4), P.window, at(-1.42, 1.25, 0));
  B.add(new THREE.BoxGeometry(1.9, 0.42, 1.62), P.window, at(-0.25, 1.22, 0));
  for (const [wx, wz] of [[1.35, 0.82], [1.35, -0.82], [-1.35, 0.82], [-1.35, -0.82]])
    B.add(new THREE.CylinderGeometry(0.34, 0.34, 0.24, 8), 0x1d1d22, place.clone().multiply(m4(wx, 0.34, wz)).multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2)));
  B.add(new THREE.BoxGeometry(0.06, 0.16, 0.4), 0xfff2c0, at(2.11, 0.75, 0.55));
  B.add(new THREE.BoxGeometry(0.06, 0.16, 0.4), 0xfff2c0, at(2.11, 0.75, -0.55));
  B.add(new THREE.BoxGeometry(0.06, 0.16, 0.36), 0xc0392b, at(-2.11, 0.78, 0.6));
  B.add(new THREE.BoxGeometry(0.06, 0.16, 0.36), 0xc0392b, at(-2.11, 0.78, -0.6));
}

// A bike, 1.8 m long, along +x.
export function addBike(B, P, color, place) {
  const at = (x, y, z) => place.clone().multiply(m4(x, y, z));
  for (const wx of [-0.62, 0.62]) B.add(new THREE.TorusGeometry(0.33, 0.045, 4, 10), 0x1d1d22, at(wx, 0.36, 0));
  B.add(new THREE.BoxGeometry(1.1, 0.07, 0.07), color, at(0, 0.62, 0));
  B.add(new THREE.BoxGeometry(0.07, 0.5, 0.07), color, at(-0.25, 0.55, 0));
  B.add(new THREE.BoxGeometry(0.28, 0.07, 0.16), 0x22232a, at(-0.3, 0.86, 0));
  B.add(new THREE.BoxGeometry(0.07, 0.07, 0.62), P.metal, at(0.55, 0.92, 0));
  B.add(new THREE.BoxGeometry(0.34, 0.24, 0.36), P.wood, at(0.78, 0.82, 0)); // basket
}

// A person standing or walking, facing +x. phase swings the legs.
export function addPerson(B, P, shirt, place, phase = 0) {
  const s = PERSON_SCALE;
  const at = (x, y, z) => place.clone().multiply(m4(x * s, y * s, z * s, 0, s, s, s));
  const swing = Math.sin(phase) * 0.18;
  B.add(new THREE.BoxGeometry(0.18, 0.8, 0.16), P.pants, at(swing, 0.4, 0.12));
  B.add(new THREE.BoxGeometry(0.18, 0.8, 0.16), P.pants, at(-swing, 0.4, -0.12));
  B.add(new THREE.BoxGeometry(0.26, 0.62, 0.46), shirt, at(0, 1.12, 0));
  B.add(new THREE.BoxGeometry(0.14, 0.56, 0.12), shirt, at(-swing, 1.1, 0.3));
  B.add(new THREE.BoxGeometry(0.14, 0.56, 0.12), shirt, at(swing, 1.1, -0.3));
  B.add(new THREE.BoxGeometry(0.26, 0.26, 0.26), P.skin, at(0.02, 1.6, 0));
  B.add(new THREE.BoxGeometry(0.28, 0.1, 0.28), 0x3a2a1e, at(-0.02, 1.76, 0));
}

// ---------- geometries for instancing (built once, drawn many times) ----------

export function treeGeometry(P) {
  const B = new Builder();
  B.add(new THREE.CylinderGeometry(0.16, 0.24, 3.0, 6), P.trunk, m4(0, 1.5, 0));
  const blobs = [[0, 4.2, 0, 1.9, 0], [0.9, 3.7, 0.6, 1.3, 1], [-0.8, 3.8, -0.5, 1.35, 2], [0.3, 5.2, -0.3, 1.2, 1], [-0.5, 3.6, 0.9, 1.1, 0]];
  for (const [x, y, z, r, c] of blobs) B.add(new THREE.IcosahedronGeometry(r, 0), P.leaves[c], m4(x, y, z));
  return B.build();
}

export function lampGeometry(P) {
  const B = new Builder();
  B.add(new THREE.CylinderGeometry(0.07, 0.1, 5.2, 6), P.metal, m4(0, 2.6, 0));
  B.add(new THREE.BoxGeometry(0.08, 0.08, 1.3), P.metal, m4(0, 5.15, 0.6));
  B.add(new THREE.BoxGeometry(0.42, 0.18, 0.62), P.metal, m4(0, 5.05, 1.2));
  B.add(new THREE.BoxGeometry(0.3, 0.05, 0.46), 0xfff2c0, m4(0, 4.94, 1.2));
  return B.build();
}

export function benchGeometry(P) {
  const B = new Builder();
  B.box(1.8, 0.08, 0.5, P.wood, 0, 0.45, 0);
  B.box(1.8, 0.4, 0.07, P.wood, 0, 0.7, -0.24);
  for (const x of [-0.75, 0.75]) B.box(0.08, 0.45, 0.45, P.metal, x, 0.22, 0);
  return B.build();
}

export function binGeometry(P) {
  const B = new Builder();
  B.add(new THREE.CylinderGeometry(0.28, 0.24, 0.9, 8), 0x3f6b4f, m4(0, 0.45, 0));
  B.add(new THREE.CylinderGeometry(0.3, 0.3, 0.08, 8), P.metal, m4(0, 0.92, 0));
  return B.build();
}

export function rackGeometry(P) {
  const B = new Builder();
  for (const z of [-0.35, 0.35]) B.box(0.06, 0.8, 0.06, P.metal, 0, 0.4, z);
  B.box(0.06, 0.06, 0.76, P.metal, 0, 0.8, 0);
  return B.build();
}

export function bollardGeometry(P) {
  const B = new Builder();
  B.add(new THREE.CylinderGeometry(0.1, 0.12, 0.9, 6), P.metal, m4(0, 0.45, 0));
  B.add(new THREE.CylinderGeometry(0.11, 0.11, 0.08, 6), 0xf2efe6, m4(0, 0.75, 0));
  return B.build();
}
