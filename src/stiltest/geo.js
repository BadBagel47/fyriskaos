// Geometry helpers: build many small low-poly parts into one geometry with
// vertex colours, so a whole block is one draw call. Also adds the smooth
// "outline normals" the inverted-hull outline needs.

import * as THREE from '../../vendor/three/three.module.js';

const tmpColor = new THREE.Color();

export class Builder {
  constructor() {
    this.pos = [];
    this.nor = [];
    this.col = [];
  }

  // Add a geometry (any three.js geometry) with a colour and a transform.
  // Works straight on the arrays (no copies), which matters on slow phones.
  add(geometry, color, matrix) {
    const pa = geometry.attributes.position.array;
    if (!geometry.attributes.normal) geometry.computeVertexNormals();
    const na = geometry.attributes.normal.array;
    const index = geometry.index ? geometry.index.array : null;
    const count = index ? index.length : pa.length / 3;
    tmpColor.set(color);
    const r = tmpColor.r, g = tmpColor.g, b = tmpColor.b;
    const e = matrix ? matrix.elements : null;
    // Normal matrix: for rotation and uniform-ish scale the upper 3x3 is close enough
    // once the result is normalised.
    for (let k = 0; k < count; k++) {
      const i = (index ? index[k] : k) * 3;
      const x = pa[i], y = pa[i + 1], z = pa[i + 2];
      let nx = na[i], ny = na[i + 1], nz = na[i + 2];
      if (e) {
        this.pos.push(e[0] * x + e[4] * y + e[8] * z + e[12], e[1] * x + e[5] * y + e[9] * z + e[13], e[2] * x + e[6] * y + e[10] * z + e[14]);
        const tx = e[0] * nx + e[4] * ny + e[8] * nz, ty = e[1] * nx + e[5] * ny + e[9] * nz, tz = e[2] * nx + e[6] * ny + e[10] * nz;
        const l = Math.hypot(tx, ty, tz) || 1;
        nx = tx / l;
        ny = ty / l;
        nz = tz / l;
      } else this.pos.push(x, y, z);
      this.nor.push(nx, ny, nz);
      this.col.push(r, g, b);
    }
    geometry.dispose();
    return this;
  }

  box(w, h, d, color, x, y, z, rotY = 0) {
    return this.add(new THREE.BoxGeometry(w, h, d), color, m4(x, y, z, rotY));
  }

  build({ outline = true } = {}) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.nor, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.col, 3));
    if (outline) addOutlineNormals(g);
    g.computeBoundingSphere();
    return g;
  }
}

export function m4(x, y, z, rotY = 0, sx = 1, sy = 1, sz = 1) {
  const m = new THREE.Matrix4();
  m.compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotY), new THREE.Vector3(sx, sy, sz));
  return m;
}

// Average the normals of all corners at the same place, so the outline
// shell grows evenly and has no cracks at hard edges.
export function addOutlineNormals(g) {
  const p = g.attributes.position.array;
  const n = g.attributes.normal.array;
  const map = new Map();
  const key = (i) => `${Math.round(p[i] * 500)},${Math.round(p[i + 1] * 500)},${Math.round(p[i + 2] * 500)}`;
  for (let i = 0; i < p.length; i += 3) {
    const k = key(i);
    let a = map.get(k);
    if (!a) map.set(k, (a = [0, 0, 0]));
    a[0] += n[i];
    a[1] += n[i + 1];
    a[2] += n[i + 2];
  }
  const out = new Float32Array(p.length);
  for (let i = 0; i < p.length; i += 3) {
    const a = map.get(key(i));
    const l = Math.hypot(a[0], a[1], a[2]) || 1;
    out[i] = a[0] / l;
    out[i + 1] = a[1] / l;
    out[i + 2] = a[2] / l;
  }
  g.setAttribute('outlineNormal', new THREE.BufferAttribute(out, 3));
}

// Make every triangle face outwards from a centre point, so hand-written
// shapes light correctly whatever order their corners were listed in.
function outward(flat, cx, cy, cz) {
  for (let i = 0; i < flat.length; i += 9) {
    const ax = flat[i], ay = flat[i + 1], az = flat[i + 2];
    const bx = flat[i + 3] - ax, by = flat[i + 4] - ay, bz = flat[i + 5] - az;
    const qx = flat[i + 6] - ax, qy = flat[i + 7] - ay, qz = flat[i + 8] - az;
    const nx = by * qz - bz * qy, ny = bz * qx - bx * qz, nz = bx * qy - by * qx;
    const mx = (ax + flat[i + 3] + flat[i + 6]) / 3 - cx;
    const my = (ay + flat[i + 4] + flat[i + 7]) / 3 - cy;
    const mz = (az + flat[i + 5] + flat[i + 8]) / 3 - cz;
    if (nx * mx + ny * my + nz * mz < 0) {
      for (let k = 0; k < 3; k++) {
        const t = flat[i + 3 + k];
        flat[i + 3 + k] = flat[i + 6 + k];
        flat[i + 6 + k] = t;
      }
    }
  }
  return flat;
}

// A gable (saddle) roof as a prism: width along x, depth along z, ridge along x.
export function gableRoof(w, d, h, overhang = 0.35) {
  const hw = w / 2 + overhang;
  const hd = d / 2 + overhang;
  const v = [
    // two slopes
    [-hw, 0, -hd], [hw, 0, -hd], [hw, h, 0], [-hw, 0, -hd], [hw, h, 0], [-hw, h, 0],
    [-hw, 0, hd], [-hw, h, 0], [hw, h, 0], [-hw, 0, hd], [hw, h, 0], [hw, 0, hd],
    // gable ends
    [-hw, 0, -hd], [-hw, h, 0], [-hw, 0, hd],
    [hw, 0, -hd], [hw, 0, hd], [hw, h, 0],
    // underside
    [-hw, 0, -hd], [-hw, 0, hd], [hw, 0, hd], [-hw, 0, -hd], [hw, 0, hd], [hw, 0, -hd],
  ];
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(outward(v.flat(), 0, h * 0.3, 0), 3));
  g.computeVertexNormals();
  return g;
}

// A mansard-like roof: steep lower part, flatter top (common in Luthagen).
export function mansardRoof(w, d, h, overhang = 0.3) {
  const hw = w / 2 + overhang;
  const hd = d / 2 + overhang;
  const iw = w / 2 - 1.2;
  const id = d / 2 - 1.6;
  const h1 = h * 0.7;
  const P = {
    a: [-hw, 0, -hd], b: [hw, 0, -hd], c: [hw, 0, hd], d: [-hw, 0, hd],
    e: [-iw, h1, -id], f: [iw, h1, -id], g: [iw, h1, id], hh: [-iw, h1, id],
    r1: [-iw + 0.6, h, 0], r2: [iw - 0.6, h, 0],
  };
  const t = (a, b, c) => [...P[a], ...P[b], ...P[c]];
  const v = [
    ...t('a', 'f', 'b'), ...t('a', 'e', 'f'),
    ...t('d', 'c', 'g'), ...t('d', 'g', 'hh'),
    ...t('a', 'd', 'hh'), ...t('a', 'hh', 'e'),
    ...t('b', 'f', 'g'), ...t('b', 'g', 'c'),
    ...t('e', 'r2', 'f'), ...t('e', 'r1', 'r2'),
    ...t('hh', 'g', 'r2'), ...t('hh', 'r2', 'r1'),
    ...t('e', 'hh', 'r1'), ...t('f', 'r2', 'g'),
    ...t('a', 'c', 'd'), ...t('a', 'b', 'c'),
  ];
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(outward(v, 0, h * 0.3, 0), 3));
  g.computeVertexNormals();
  return g;
}
