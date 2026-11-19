// D-044: the Luthagen block lifted towards the target picture: textures,
// rounded cars with gloss, dense layered trees, front gardens, clutter,
// a low warm evening sun with long soft shadows, baked shade, light pools.
// Mobile budget: merged meshes per material, instancing for repeats.

import * as THREE from '../../vendor/three/three.module.js';
import { Builder, m4, gableRoof } from './geo.js';
import * as L from './look.js';
import * as P3 from './props3.js';

// height = distance from the street to the camera (straight down or tilted).
export const CAMERA = { height: 64, viewShort: 30, tiltViewShort: 34, center: new THREE.Vector3(30, 0, -1.5), tiltCenter: new THREE.Vector3(30, 0, -3.5), tiltDistance: 56 };

const FLOOR = 3.2;
// Pictures sit next to the built bundle (stiltest/app.js -> stiltest/tex/).
// Pictures sit next to the built bundle. A tiny version of every picture is
// loaded first so the street shows at once; the full pictures follow (D-045).
const TEX = (n) => new URL(`./tex/${n}.webp`, import.meta.url).href;
const PNG = TEX;
const SMALL = (n) => new URL(`./tex/small/${n}.webp`, import.meta.url).href;
const upgrades = [];
async function loadProgressive(name) {
  const t = await L.loadTexture(SMALL(name));
  if (t) upgrades.push([t, name]);
  return t;
}
// Swap in the full pictures one after another, after the first frames.
export async function upgradeTextures() {
  await Promise.all(
    upgrades.map(async ([t, name]) => {
      const full = await L.loadTexture(TEX(name));
      if (!full) return;
      // A bigger picture needs new GPU storage: release the old one first.
      t.dispose();
      t.image = full.image;
      t.needsUpdate = true;
    }),
  );
}

// Generated pictures seen from straight above (cars, tree crowns), laid flat at
// their height so they cast matching, cut-out shadows.
function topPlane(w, d) {
  const g = new THREE.PlaneGeometry(w, d);
  g.rotateX(-Math.PI / 2);
  return g;
}

// Small deterministic random numbers, so every load looks the same.
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Darken colours near the ground and in the lower part of walls (baked shade).
function bakeGroundShade(geo, strength = 0.45, height = 2.4) {
  const p = geo.attributes.position.array;
  const c = geo.attributes.color.array;
  for (let i = 0; i < p.length; i += 3) {
    const y = p[i + 1];
    const k = 1 - strength * Math.max(0, 1 - y / height);
    c[i] *= k;
    c[i + 1] *= k;
    c[i + 2] *= k;
  }
  geo.attributes.color.needsUpdate = true;
  return geo;
}

// Flat decal planes (shade, stains, paint, light) drawn as one instanced mesh per picture.
function decals(group, tex, items, { additive = false, opacity = 1, order = 1 } = {}) {
  if (!items.length) return null;
  const geo = new THREE.PlaneGeometry(1, 1);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, opacity, polygonOffset: true, polygonOffsetFactor: -2 - order, polygonOffsetUnits: -2 - order });
  if (additive) mat.blending = THREE.AdditiveBlending;
  const mesh = new THREE.InstancedMesh(geo, mat, items.length);
  items.forEach((it, i) => mesh.setMatrixAt(i, m4(it.x, it.y ?? 0.03 + order * 0.004, it.z, it.rot || 0, it.w, 1, it.d ?? it.w)));
  mesh.renderOrder = order;
  mesh.frustumCulled = false;
  group.add(mesh);
  return mesh;
}

// ---------- houses ----------

const FACADES = [0xe2b25c, 0xf0d58c, 0xe7a184, 0xf3eee4, 0xd9c7a6, 0xe9c27a, 0xc8d3b8];

function addHouse(H, h, place) {
  // H: builders { wall, trim, glass, roof, dark }
  const { w, d, floors } = h;
  const top = floors * FLOOR + 1.0;
  const at = (x, y, z, r = 0) => place.clone().multiply(m4(x, y, z, r));
  const wallC = FACADES[h.facade % FACADES.length];
  const plinth = 0x8f8a82;
  H.wall.add(new THREE.BoxGeometry(w, top, d), wallC, at(0, top / 2, 0));
  // Bands around the walls only (not solid slabs), so a cut-away house is hollow inside.
  const band = (B, out, hgt, y, c) => {
    B.add(new THREE.BoxGeometry(w + out * 2, hgt, out + 0.06), c, at(0, y, d / 2 + out / 2));
    B.add(new THREE.BoxGeometry(w + out * 2, hgt, out + 0.06), c, at(0, y, -d / 2 - out / 2));
    B.add(new THREE.BoxGeometry(out + 0.06, hgt, d), c, at(w / 2 + out / 2, y, 0));
    B.add(new THREE.BoxGeometry(out + 0.06, hgt, d), c, at(-w / 2 - out / 2, y, 0));
  };
  band(H.wall, 0.06, 1.0, 0.5, plinth);
  // Ground floor in a darker, banded stone finish; corner pilasters; ornate houses also between bays.
  const ground = new THREE.Color(wallC).multiplyScalar(0.82).getHex();
  band(H.wall, 0.04, FLOOR - 0.2, 1.0 + (FLOOR - 0.2) / 2, ground);
  for (let k = 0; k < 4; k++) band(H.trim, 0.07, 0.06, 1.3 + k * 0.7, new THREE.Color(ground).multiplyScalar(0.85).getHex());
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) H.trim.add(new THREE.BoxGeometry(0.5, top - 1, 0.5), new THREE.Color(wallC).multiplyScalar(0.92).getHex(), at(sx * (w / 2 - 0.15), (top - 1) / 2 + 1, sz * (d / 2 - 0.15)));
  for (let f = 1; f < floors; f++) band(H.trim, 0.05, 0.16, 1.0 + f * FLOOR, 0xf4efe6);
  band(H.trim, 0.3, 0.45, top + 0.22, 0xf4efe6);
  const cols = Math.max(3, Math.floor(w / (h.narrow ? 2.3 : h.ornate ? 2.9 : 2.6)));
  const step = w / cols;
  const bayCols = h.bay ? [1, cols - 2] : [];
  const doorCol = Math.floor(cols / 2);
  const HR = rng(Math.floor(h.x * 31 + h.facade * 7 + w));
  const frameC = HR() < 0.3 ? 0x5a3a2a : HR() < 0.5 ? 0x2f4a3a : 0xf6f2ea;
  const ww = h.narrow ? 0.85 : 1.05;
  const win = (x, y, z, rot) => {
    // Recess, frame, two sashes with a cross bar, glass, sill and a lintel.
    const glass = [0x8fa6bf, 0x6f879f, 0xa9bccc, 0x5d7186][Math.floor(HR() * 4)];
    H.dark.add(new THREE.BoxGeometry(ww + 0.32, 1.86, 0.06), 0x3c3530, at(x, y, z, rot));
    H.trim.add(new THREE.BoxGeometry(ww + 0.2, 1.72, 0.1), frameC, at(x, y, z, rot));
    H.glass.add(new THREE.BoxGeometry(ww, 1.5, 0.12), glass, at(x, y, z, rot));
    const r = HR();
    if (r < 0.35) H.trim.add(new THREE.BoxGeometry(ww * 0.42, 1.3, 0.13), [0xf3eee0, 0xd9c7a0, 0xc7d4e0][Math.floor(HR() * 3)], at(x - ww * 0.24 * (r < 0.17 ? 1 : -1), y + 0.05, z, rot)); // curtain
    if (r > 0.88) H.trim.add(new THREE.BoxGeometry(ww * 0.95, 0.5, 0.13), 0xe8dcc0, at(x, y + 0.45, z, rot)); // blind
    H.trim.add(new THREE.BoxGeometry(0.06, 1.5, 0.15), frameC, at(x, y, z, rot)); // mullion
    H.trim.add(new THREE.BoxGeometry(ww, 0.05, 0.15), frameC, at(x, y + 0.3, z, rot)); // transom
    H.trim.add(new THREE.BoxGeometry(ww + 0.3, 0.08, 0.3), 0x8e949a, at(x, y - 0.93, z, rot)); // sheet-metal sill
    if (h.ornate) {
      H.trim.add(new THREE.BoxGeometry(ww + 0.45, 0.22, 0.14), 0xf4efe6, at(x, y + 1.0, z, rot)); // lintel
      H.trim.add(new THREE.ConeGeometry((ww + 0.4) / 2, 0.3, 4, 1), 0xf4efe6, at(x, y + 1.25, z, rot).multiply(new THREE.Matrix4().makeScale(1, 1, 0.25)).multiply(new THREE.Matrix4().makeRotationY(Math.PI / 4))); // pediment
    }
    // A window box with flowers on some windows facing the street.
    if (rot === 0 && z > 0 && y > 3 && HR() < 0.3) {
      H.dark.add(new THREE.BoxGeometry(ww + 0.1, 0.22, 0.25), 0x5a3a26, at(x, y - 0.82, z + 0.16, rot));
      for (let k = 0; k < 5; k++) H.trim.add(new THREE.IcosahedronGeometry(0.11, 0), [0xe0506a, 0x4f8f3a, 0xf2c94c, 0x4f8f3a, 0xd96aa0][k], at(x - ww / 2 + 0.1 + k * (ww / 4.4), y - 0.65, z + 0.2, rot));
    }
  };
  for (const side of [1, -1])
    for (let f = 0; f < floors; f++)
      for (let c = 0; c < cols; c++) {
        if (side === 1 && f === 0 && c === doorCol) continue;
        if (side === 1 && f > 0 && bayCols.includes(c)) continue;
        win(-w / 2 + step * (c + 0.5), 1.0 + f * FLOOR + 1.6, side * (d / 2 + 0.04), 0);
        if (h.ornate && side === 1 && c > 0 && f > 0) H.trim.add(new THREE.BoxGeometry(0.3, FLOOR - 0.1, 0.12), new THREE.Color(wallC).multiplyScalar(1.06).getHex(), at(-w / 2 + step * c, 1.0 + f * FLOOR + FLOOR / 2, d / 2 + 0.06));
      }
  for (const side of [1, -1]) {
    const n = Math.max(1, Math.floor(d / 4));
    for (let f = 0; f < floors; f++)
      for (let c = 0; c < n; c++) win(side * (w / 2 + 0.04), 1.0 + f * FLOOR + 1.6, -d / 2 + (d / n) * (c + 0.5), Math.PI / 2);
  }
  // Door with a stone portal and steps.
  const dx = -w / 2 + step * (doorCol + 0.5);
  H.trim.add(new THREE.BoxGeometry(2.1, 3.2, 0.22), 0xd8d0c2, at(dx, 1.6, d / 2 + 0.07));
  const doorC = [0x5a3626, 0x2f4a3a, 0x3b4a6a, 0x6a2a24][h.facade % 4];
  H.dark.add(new THREE.BoxGeometry(1.4, 2.6, 0.25), doorC, at(dx, 1.3, d / 2 + 0.09));
  for (const ox of [-0.33, 0.33]) for (const oy of [0.7, 1.75]) H.dark.add(new THREE.BoxGeometry(0.5, 0.75, 0.27), new THREE.Color(doorC).multiplyScalar(1.25).getHex(), at(dx + ox, oy, d / 2 + 0.1));
  H.glass.add(new THREE.BoxGeometry(1.3, 0.38, 0.26), 0xffd9a0, at(dx, 2.85, d / 2 + 0.09)); // fanlight
  H.trim.add(new THREE.BoxGeometry(0.05, 0.25, 0.08), 0xc9a24a, at(dx + 0.55, 1.25, d / 2 + 0.24)); // handle
  H.trim.add(new THREE.BoxGeometry(2.6, 0.35, 1.1), 0xa29a8e, at(dx, 0.17, d / 2 + 0.55));
  // Bay windows (burspråk) with small tower roofs.
  for (const bc of bayCols) {
    const bx = -w / 2 + step * (bc + 0.5);
    const bh = (floors - 1) * FLOOR;
    H.wall.add(new THREE.BoxGeometry(step * 1.15, bh, 1.0), wallC, at(bx, 1.0 + FLOOR + bh / 2, d / 2 + 0.5));
    for (let f = 1; f < floors; f++) win(bx, 1.0 + f * FLOOR + 1.6, d / 2 + 1.04, 0);
    // A low sheet-metal cap; a tall cone turns into a big wedge at the screen edge.
    H.trim.add(new THREE.BoxGeometry(step * 1.25, 0.3, 1.2), 0x6f7880, at(bx, 1.0 + FLOOR + bh + 0.15, d / 2 + 0.5));
  }
  // Roof with dormers and chimneys.
  const rh = Math.min(d * 0.42, 5.2);
  H.roof.add(gableRoof(w, d, rh, 0.45), h.slate ? 0x8d939c : 0xffffff, at(0, top + 0.45, 0));
  H.trim.add(new THREE.BoxGeometry(w + 1.0, 0.18, 0.4), h.slate ? 0x5f656e : 0x9a4e3a, at(0, top + 0.45 + rh, 0));
  for (let c = 1; c < cols - 1; c += 2) {
    const x = -w / 2 + step * (c + 0.5);
    for (const side of [1, -1]) {
      const zf = side * (d / 2 - 1.5);
      H.wall.add(new THREE.BoxGeometry(1.5, 1.6, 1.4), wallC, at(x, top + 0.45 + 1.1, zf));
      H.roof.add(gableRoof(1.5, 1.4, 0.8, 0.15), h.slate ? 0x8d939c : 0xffffff, place.clone().multiply(m4(x, top + 0.45 + 1.9, zf, Math.PI / 2)));
      H.glass.add(new THREE.BoxGeometry(0.9, 0.9, 0.08), 0xffffff, at(x, top + 0.45 + 1.1, zf + side * 0.72));
    }
  }
  for (const cx of [-w * 0.32, w * 0.28]) {
    H.wall.add(new THREE.BoxGeometry(0.9, 2.8, 0.9), 0xa85c48, at(cx, top + 0.45 + rh * 0.65, -0.6));
    H.trim.add(new THREE.BoxGeometry(1.05, 0.15, 1.05), 0x6a3a2e, at(cx, top + 0.45 + rh * 0.65 + 1.45, -0.6));
  }
}

// ---------- trees (instanced) ----------

function lump(r, seed, detail = 2) {
  const g = new THREE.IcosahedronGeometry(r, detail);
  const p = g.attributes.position;
  const R = rng(seed);
  const bumps = Array.from({ length: 6 }, () => [R() * 2 - 1, R() * 2 - 1, R() * 2 - 1, 0.1 + R() * 0.14]);
  for (let i = 0; i < p.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(p, i).normalize();
    let k = 1;
    for (const [bx, by, bz, a] of bumps) k += a * Math.max(0, v.x * bx + v.y * by + v.z * bz);
    v.multiplyScalar(r * k * (v.y < -0.3 ? 0.85 : 1));
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

function treeCrown() {
  const B = new Builder();
  const parts = [[0, 5.4, 0, 2.5, 1], [1.6, 4.7, 1.0, 1.8, 2], [-1.5, 4.8, -0.9, 1.9, 3], [0.5, 6.7, -0.4, 1.7, 4], [-0.8, 4.5, 1.5, 1.6, 5], [1.1, 5.1, -1.6, 1.6, 6], [-1.6, 6.0, 0.6, 1.4, 7]];
  for (const [x, y, z, r, s] of parts) B.add(lump(r * 0.88, s, 1), 0xffffff, m4(x, y, z));
  const g = B.build({ outline: false });
  // Shade inside and underneath the crown, light on the sunny west top.
  const p = g.attributes.position.array;
  const c = g.attributes.color.array;
  for (let i = 0; i < p.length; i += 3) {
    const k = 0.45 + 0.55 * Math.min(1, Math.max(0, (p[i + 1] - 3.4) / 3.4)) + Math.max(-0.15, -p[i] / 3) * 0.3;
    c[i] = c[i + 1] = c[i + 2] = Math.min(1.1, k);
  }
  return g;
}

// Leaf cards: small upright squares of leaf picture, cut out where the
// picture is dark, set around the crown so light shows through its edge.
function leafCards(count, seed) {
  const R = rng(seed);
  const pos = [];
  const uv = [];
  const nor = [];
  const col = [];
  const centers = [[0, 5.4, 0, 2.6], [1.6, 4.7, 1.0, 1.9], [-1.5, 4.8, -0.9, 2.0], [0.5, 6.7, -0.4, 1.8], [-1.6, 6.0, 0.6, 1.5]];
  for (let i = 0; i < count; i++) {
    const [cx, cy, cz, cr] = centers[i % centers.length];
    const v = new THREE.Vector3(R() * 2 - 1, R() * 1.4 - 0.4, R() * 2 - 1).normalize();
    const c = new THREE.Vector3(cx, cy, cz).addScaledVector(v, cr * (0.85 + R() * 0.25));
    const size = 1.1 + R() * 0.8;
    // Face roughly outward and upward, so they read from above.
    const n = v.clone().add(new THREE.Vector3(0, 1.2, 0)).normalize();
    const t = new THREE.Vector3(R() - 0.5, 0, R() - 0.5).cross(n).normalize();
    const b = n.clone().cross(t).normalize();
    const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, d]) => c.clone().addScaledVector(t, (a * size) / 2).addScaledVector(b, (d * size) / 2));
    const u0 = Math.floor(R() * 3) / 3;
    const v0 = Math.floor(R() * 3) / 3;
    const uvs = [[u0, v0], [u0 + 0.33, v0], [u0 + 0.33, v0 + 0.33], [u0, v0 + 0.33]];
    const light = 0.6 + 0.5 * Math.min(1, Math.max(0, (c.y - 3.6) / 3.4)) + Math.max(-0.15, -c.x / 3) * 0.3;
    for (const k of [0, 1, 2, 0, 2, 3]) {
      pos.push(...corners[k].toArray());
      uv.push(...uvs[k]);
      nor.push(...n.toArray());
      col.push(light, light, light);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return g;
}

// Leaf picture with see-through gaps, made from the foliage picture's darkest parts.
function leafCutout(image) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  g.drawImage(image, 0, 0, 256, 256);
  const d = g.getImageData(0, 0, 256, 256);
  for (let i = 0; i < d.data.length; i += 4) {
    const l = (d.data[i] + d.data[i + 1] + d.data[i + 2]) / 3;
    d.data[i + 3] = l < 38 ? 0 : 255;
  }
  g.putImageData(d, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function treeTrunk() {
  const B = new Builder();
  B.add(new THREE.CylinderGeometry(0.17, 0.26, 4.4, 7), 0x5a4232, m4(0, 2.2, 0));
  B.add(new THREE.CylinderGeometry(0.08, 0.12, 2.0, 5), 0x5a4232, m4(0.5, 3.8, 0.2).multiply(new THREE.Matrix4().makeRotationZ(-0.6)));
  return B.build({ outline: false });
}

// ---------- cars: three rounded models ----------

const MODELS = {
  hatch: { L: 4.1, body: [[-2.05, 0.28], [2.05, 0.28], [2.05, 0.66], [1.92, 0.86], [0.85, 0.98], [-1.95, 0.98], [-2.05, 0.82]], cabin: [[0.8, 0.95], [0.05, 1.45], [-1.6, 1.45], [-1.98, 0.95]], roof: [-1.55, 0.0] },
  sedan: { L: 4.6, body: [[-2.3, 0.3], [2.3, 0.3], [2.3, 0.66], [2.15, 0.84], [1.0, 0.96], [-2.15, 0.96], [-2.3, 0.8]], cabin: [[0.95, 0.93], [0.15, 1.42], [-1.25, 1.42], [-1.85, 0.93]], roof: [-1.2, 0.1] },
  estate: { L: 4.8, body: [[-2.4, 0.3], [2.4, 0.3], [2.4, 0.66], [2.25, 0.86], [1.05, 0.98], [-2.35, 0.98], [-2.4, 0.82]], cabin: [[1.0, 0.95], [0.2, 1.48], [-2.15, 1.48], [-2.3, 0.95]], roof: [-2.05, 0.15] },
};
const W = 1.8;

function profileGeo(points, depth, bevel) {
  const s = new THREE.Shape();
  points.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: 2 });
  g.translate(0, 0, -depth / 2);
  return g;
}

function roundedSlab(x0, x1, width, y, thick) {
  const s = new THREE.Shape();
  const r = 0.25;
  const hw = width / 2;
  s.moveTo(x0 + r, -hw);
  s.lineTo(x1 - r, -hw);
  s.quadraticCurveTo(x1, -hw, x1, -hw + r);
  s.lineTo(x1, hw - r);
  s.quadraticCurveTo(x1, hw, x1 - r, hw);
  s.lineTo(x0 + r, hw);
  s.quadraticCurveTo(x0, hw, x0, hw - r);
  s.lineTo(x0, -hw + r);
  s.quadraticCurveTo(x0, -hw, x0 + r, -hw);
  const g = new THREE.ExtrudeGeometry(s, { depth: thick, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.1, bevelSegments: 2, curveSegments: 3 });
  g.rotateX(Math.PI / 2);
  g.translate(0, y + thick, 0);
  return g;
}

function carParts(name) {
  const m = MODELS[name];
  const paint = new Builder();
  paint.add(profileGeo(m.body, W - 0.5, 0.25), 0xffffff);
  paint.add(roundedSlab(m.roof[0], m.roof[1], W - 0.36, 1.5, 0.07), 0xffffff);
  const glass = new Builder();
  glass.add(profileGeo(m.cabin, W - 0.5, 0.08), 0xffffff);
  const det = new Builder();
  for (const sx of [-1, 1])
    for (const sz of [-1, 1]) det.add(new THREE.CylinderGeometry(0.33, 0.33, 0.25, 10), 0x1b1b1f, m4(sx * (m.L / 2 - 0.75), 0.33, sz * (W / 2 - 0.12)).multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2)));
  for (const sz of [-1, 1]) {
    det.add(new THREE.BoxGeometry(0.3, 0.16, 0.42), 0xfff4d0, m4(m.L / 2 - 0.05, 0.86, sz * 0.55));
    det.add(new THREE.BoxGeometry(0.22, 0.16, 0.4), 0xd02a1e, m4(-m.L / 2 + 0.02, 0.9, sz * 0.56));
    det.add(new THREE.BoxGeometry(0.22, 0.1, 0.12), 0x222226, m4(0.75, 1.05, sz * (W / 2 + 0.02))); // mirrors
  }
  if (name === 'estate') for (const sz of [-1, 1]) det.add(new THREE.BoxGeometry(2.0, 0.06, 0.06), 0x2a2a2e, m4(-1.05, 1.62, sz * 0.62)); // roof rails
  if (name === 'hatch') det.add(new THREE.BoxGeometry(0.7, 0.04, 0.7), 0x2c3846, m4(-0.75, 1.6, 0)); // sunroof
  return { paint: paint.build({ outline: false }), glass: glass.build({ outline: false }), det: det.build({ outline: false }) };
}

const addPerson = P3.addPerson;
const addBike = P3.addBike;

// ---------- the scene ----------

const T0 = { t: 0 };
function T(name) {
  const now = performance.now();
  (globalThis.__times ||= []).push([name, Math.round(now - T0.t)]);
  T0.t = now;
}

export async function buildRich(renderer) {
  T0.t = performance.now();
  const all = await Promise.all(['asphalt', 'slabs', 'grass', 'plaster', 'roof', 'foliage', 'car-1', 'car-2', 'car-3', 'car-4', 'tree-1', 'tree-2', 'tree-3'].map(loadProgressive));
  const [asphalt, slabs, grass, plaster, roof, foliage] = all;
  const carTex = all.slice(6, 10).filter(Boolean);
  const treeTex = all.slice(10).filter(Boolean);
  for (const t of [...carTex, ...treeTex]) t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  T('textures');
  const scene = new THREE.Scene();
  const haze = 0xd9b98f;
  scene.background = new THREE.Color(haze);
  scene.fog = new THREE.Fog(haze, CAMERA.height * 1.15, CAMERA.height * 1.6);
  scene.environment = L.eveningEnvironment(renderer);
  const world = new THREE.Group();
  scene.add(world);
  const R = rng(44);

  const mats = {
    asphalt: L.worldMapped(asphalt, 6, { vertexColors: true, roughness: 0.92, vary: 0.7 }),
    slabs: L.worldMapped(slabs, 4, { vertexColors: true, roughness: 0.88, vary: 0.5 }),
    grass: L.worldMapped(grass, 4, { vertexColors: true, roughness: 1, vary: 0.8 }),
    wall: L.worldMapped(plaster, 5, { vertexColors: true, roughness: 0.95, vary: 0.6 }),
    roof: L.worldMapped(roof, 0.95, { vertexColors: true, roughness: 0.8, vary: 0.9 }),
    foliage: L.worldMapped(foliage, 3.6, { vertexColors: true, roughness: 0.85, triplanar: true }),
    plain: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.75, envMapIntensity: 0.4 }),
    glass: new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.05, metalness: 0.3, envMapIntensity: 1.6 }),
    paint: new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.35, metalness: 0.45, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 1.6 }),
    lantern: new THREE.MeshBasicMaterial({ color: 0xffd99a }),
  };
  const mesh = (geo, mat, { cast = true, receive = true } = {}) => {
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = cast;
    m.receiveShadow = receive;
    world.add(m);
    return m;
  };

  T('env');
  // ---------- ground ----------
  const X0 = -40;
  const X1 = 100;
  const A = new Builder();
  const S = new Builder();
  const Gr = new Builder();
  const P = new Builder(); // props, curbs, furniture
  const slab = (B, x0, x1, z0, z1, color = 0xffffff, y = 0) => B.box(x1 - x0, 0.1, z1 - z0, color, (x0 + x1) / 2, y - 0.05, (z0 + z1) / 2);
  slab(A, X0, X1, -6.3, -4.5, 0xd2604a, 0.012); // north bike lane
  slab(A, X0, X1, -4.5, -2.3, 0xa8acb4, 0.004); // parking strip, a little lighter
  slab(A, X0, X1, -2.3, 4.2, 0x9ea3ad, 0); // two lanes
  slab(A, X0, X1, 4.2, 6.0, 0xd2604a, 0.012); // south bike lane
  // Sidewalks a curb higher, laid in 2 m patches that differ a little in tone.
  for (const [z0, z1] of [[-9.3, -6.3], [6.0, 9.0]])
    for (let x = X0; x < X1; x += 2) {
      const v = 0.86 + R() * 0.16;
      slab(S, x, x + 2, z0, z1, new THREE.Color(v, v * 0.98, v * 0.95).getHex(), 0.12);
    }
  // Courtyards, passages and front gardens; gravel under everything else.
  slab(S, X0, X1, -40, 40, 0xb9ad98, -0.03);
  slab(Gr, X0, X1, -40, -21.3, 0xffffff, 0);
  slab(Gr, X0, X1, 10.2, 40, 0xffffff, -0.01); // gardens on the camera side (seen when that row is cut away)
  slab(S, 26.7, 29.3, -21.3, -9.3, 0xd8d2c6, 0.1); // passage between north houses
  slab(S, 40.6, 43.0, 9.0, 21, 0xd8d2c6, 0.1);
  for (const z of [-6.3, -4.5, 4.2, 6.0]) P.box(X1 - X0, 0.16, 0.25, 0x9c968c, (X0 + X1) / 2, 0.08, z); // granite curbs
  const ground = [mesh(A.build({ outline: false }), mats.asphalt, { cast: false }), mesh(S.build({ outline: false }), mats.slabs, { cast: false }), mesh(Gr.build({ outline: false }), mats.grass, { cast: false })];

  T('ground');
  // ---------- houses ----------
  const H = { wall: new Builder(), trim: new Builder(), glass: new Builder(), roof: new Builder(), dark: new Builder() };
  const north = [
    { x: -6, w: 14, floors: 4, facade: 4, bay: true, ornate: true },
    { x: 7.5, w: 13, floors: 4, facade: 0, bay: true, narrow: true },
    { x: 20.3, w: 12.6, floors: 5, facade: 3, bay: false, slate: true },
    { x: 36.6, w: 15.2, floors: 4, facade: 1, bay: true, ornate: true },
    { x: 51.4, w: 14.2, floors: 4, facade: 2, bay: false },
    { x: 65.5, w: 13.6, floors: 5, facade: 5, bay: true, ornate: true },
  ];
  const south = [
    { x: -2, w: 15, floors: 4, facade: 2, bay: false },
    { x: 13.4, w: 14, floors: 4, facade: 3, bay: true },
    { x: 27.6, w: 13.8, floors: 5, facade: 0, bay: true },
    { x: 52.3, w: 18.5, floors: 4, facade: 6, bay: true, slate: true },
    { x: 69, w: 14.5, floors: 4, facade: 1, bay: false },
  ];
  // The camera looks between the two rows, so houses face the street.
  const Hs = { wall: new Builder(), trim: new Builder(), glass: new Builder(), roof: new Builder(), dark: new Builder() };
  for (const h of north) addHouse(H, { ...h, d: 12 }, m4(h.x, 0, -9.3 - 6 - 1.4, 0));
  for (const h of south) addHouse(Hs, { ...h, d: 12 }, m4(h.x, 0, 9.0 + 6 + 1.4, Math.PI));
  const houseMeshes = (B, list) => [
    mesh(bakeGroundShade(B.wall.build({ outline: false }), 0.5, 2.6), list.wall),
    mesh(bakeGroundShade(B.trim.build({ outline: false }), 0.35, 2.0), list.plain),
    mesh(B.glass.build({ outline: false }), list.glass),
    mesh(B.roof.build({ outline: false }), list.roof),
    mesh(B.dark.build({ outline: false }), list.plain),
  ];
  houseMeshes(H, mats);
  // The row on the camera side gets its own materials, so it can fade when
  // the tilted camera looks over it at the street (as in many top-down games).
  const nearMats = { wall: mats.wall.clone(), plain: mats.plain.clone(), glass: mats.glass.clone(), roof: mats.roof.clone() };
  for (const k of ['wall', 'roof']) nearMats[k].onBeforeCompile = mats[k].onBeforeCompile;
  for (const k of ['wall', 'roof']) nearMats[k].customProgramCacheKey = mats[k].customProgramCacheKey;
  const nearHouses = houseMeshes(Hs, nearMats);
  // Inside of the cut: dark, like the section of a cut-away model.
  const inside = new THREE.MeshBasicMaterial({ color: 0x2a2220, side: THREE.BackSide });
  const insideMeshes = nearHouses.map((nm) => {
    const im = new THREE.Mesh(nm.geometry, inside);
    im.visible = false;
    world.add(im);
    return im;
  });
  // Tilted view: the row on the camera side is cut along the line of sight
  // that just grazes the sidewalk, so roofs and back walls still show below
  // the street on screen but never cover it (D-045).
  const setNearFade = (on, tilt = 0.576) => {
    const k = 1 / Math.tan(tilt);
    const n = new THREE.Vector3(0, -1, k);
    const len = n.length();
    const plane = new THREE.Plane(n.divideScalar(len), (-k * 9.6 + 0.2) / len);
    // The cut along the line of sight still showed dark sections; simpler and
    // cleaner: in the tilted view the row is not drawn but still casts its shadow.
    void plane;
    for (const m of Object.values(nearMats)) {
      m.colorWrite = !on;
      m.depthWrite = !on;
      m.needsUpdate = true;
    }
    for (const im of insideMeshes) im.visible = false;
    for (const nm of nearHouses) {
      nm.renderOrder = on ? 10 : 0;
      nm.castShadow = true;
    }
  };

  T('houses');
  // ---------- front gardens: hedges, flower boxes, fences ----------
  const F = new Builder();
  const gardens = [
    ...north.map((h) => ({ x0: h.x - h.w / 2 + 0.6, x1: h.x + h.w / 2 - 0.6, z: -10.0, door: h.x - h.w / 2 + (h.w / Math.max(3, Math.floor(h.w / 2.6))) * (Math.floor(Math.max(3, Math.floor(h.w / 2.6)) / 2) + 0.5) })),
    ...south.map((h) => ({ x0: h.x - h.w / 2 + 0.6, x1: h.x + h.w / 2 - 0.6, z: 9.7, door: h.x + h.w / 2 - (h.w / Math.max(3, Math.floor(h.w / 2.6))) * (Math.floor(Math.max(3, Math.floor(h.w / 2.6)) / 2) + 0.5) })),
  ];
  for (const gd of gardens) {
    for (const [a, b] of [[gd.x0, gd.door - 1.6], [gd.door + 1.6, gd.x1]]) {
      if (b - a < 1) continue;
      // A clipped hedge built from a few lumps.
      F.box(b - a, 0.9, 0.9, 0xc8c8c8, (a + b) / 2, 0.45, gd.z); // the clipped block of the hedge
      for (let x = a + 0.5; x < b - 0.2; x += 1.0) F.add(lump(0.62, Math.floor(x * 10), 1), 0xffffff, m4(x, 0.95, gd.z, 0, 1, 0.55, 0.85));
      // Low metal fence on the street side of the hedge.
      const fz = gd.z + Math.sign(gd.z) * -0.75;
      P3.addRailing(P, m4(a, 0.12, fz), b - a);
    }
  }
  const flowerBox = (x, z, rot = 0) => P3.addFlowerBox(P, m4(x, 0.12, z, rot), Math.floor(x * 7 + z));
  const oldFlowerBox = (x, z, rot = 0) => {
    P.add(new THREE.BoxGeometry(1.9, 0.6, 0.8), 0x8a6040, m4(x, 0.42, z, rot));
    const r2 = rng(Math.floor(x * 7 + z));
    for (let i = 0; i < 12; i++) {
      const fx = (r2() - 0.5) * 1.6;
      const fz = (r2() - 0.5) * 0.55;
      P.add(new THREE.IcosahedronGeometry(0.24, 0), [0xe0506a, 0xf2c94c, 0xffffff, 0x5c8f4c, 0xd96aa0][i % 5], m4(x + fx * Math.cos(rot), 0.82, z + fz, rot));
    }
  };
  for (const gd of gardens) flowerBox(gd.door + (gd.z < 0 ? 2.3 : -2.3), gd.z + (gd.z < 0 ? 1.0 : -1.0));
  mesh(F.build({ outline: false }), mats.foliage);

  T('gardens');
  // ---------- street furniture and clutter (one mesh) ----------
  const lampSpots = [];
  for (let x = -10; x < 90; x += 16) {
    lampSpots.push([x, -6.85, 1]);
    lampSpots.push([x + 8, 6.55, -1]);
  }
  const heads = lampSpots.map(([x, z, dir]) => P3.addLamp(P, m4(x, 0.12, z), dir));
  const lanterns = new THREE.InstancedMesh(P3.lanternGlass(), mats.lantern, lampSpots.length);
  lampSpots.forEach(([x, z, dir], i) => lanterns.setMatrixAt(i, m4(x, 4.85, z + dir * 1.12)));
  world.add(lanterns);
  // Hoop racks with bikes, and a few bikes leaning elsewhere.
  const bikeColors = [0x2b2d33, 0x7a2a22, 0x2a4a70, 0x3a5a3a, 0x8a8f96, 0xc9c2b0, 0x1f1f24];
  const rack = (x0, z, n) => {
    P3.addRack(P, m4(x0, 0.12, z), n);
    for (let i = 0; i < n; i++) if (R() < 0.8) addBike(P, m4(x0 + i * 0.8, 0.12, z, Math.PI / 2 + (R() - 0.5) * 0.15), bikeColors[Math.floor(R() * bikeColors.length)], { basket: R() < 0.6 });
  };
  rack(6.5, -7.6, 7);
  rack(44.5, 7.7, 6);
  addBike(P, m4(15.3, 0.12, -8.9, 0.1), 0x7a2a22);
  addBike(P, m4(58.6, 0.12, 8.6, Math.PI - 0.15), 0x2a4a70);
  // Crates, a pallet and a barrel by two doors (picture 3's clutter).
  for (const [cx, cz] of [[38.5, 7.7], [22.5, -8.1]]) {
    P3.addCrate(P, m4(cx, 0.12, cz, 0.1), 1.2, 0);
    P3.addCrate(P, m4(cx + 1.3, 0.12, cz + 0.1, -0.15), 1.05, 1);
    P3.addCrate(P, m4(cx + 0.6, 0.12 + 1.2 * 0.75, cz + 0.05, 0.3), 0.95, 2);
    P3.addPallet(P, m4(cx + 2.4, 0.12, cz + 0.2, 0.05));
    P.add(new THREE.CylinderGeometry(0.3, 0.3, 0.88, 12), 0x2f6aa0, m4(cx - 1.0, 0.56, cz + 0.2));
    for (const y of [0.32, 0.8]) P.add(new THREE.TorusGeometry(0.3, 0.025, 4, 12), 0x24507a, m4(cx - 1.0, y, cz + 0.2).multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2)));
  }
  // Benches, bins, bollards.
  P3.addBench(P, m4(18, 0.12, 8.0, Math.PI, 1.3, 1.3, 1.3));
  P3.addBench(P, m4(34, 0.12, -8.2, 0, 1.3, 1.3, 1.3));
  for (const [x, z] of [[21, 8.0], [31.5, -8.2], [47.5, -8.3]]) P3.addBin(P, m4(x, 0.12, z));
  for (const [x, z] of [[28, -6.0], [32, -6.0], [28, 5.7], [32, 5.7]]) P3.addBollard(P, m4(x, 0.12, z));
  // Signs: posts in the merged mesh, faces as small pictures turned towards the camera.
  const signs = [[3, -6.75, 0, 0.9, 0.9, 2.6], [26.6, 6.4, 0, 0.9, 0.9, 2.6], [27.2, -6.75, 1, 1.7, 0.8, 3.1], [55.5, 6.4, 2, 0.8, 1.0, 2.5], [-4, 6.4, 3, 0.85, 0.85, 2.6]];
  const atlas = P3.signAtlas();
  const signMat = new THREE.MeshStandardMaterial({ map: atlas, roughness: 0.5, side: THREE.DoubleSide });
  for (const [x, z, face, w2, h2, y] of signs) {
    P3.addSignPost(P, m4(x, 0.12, z), y + h2 / 2);
    const plate = new THREE.Mesh(P3.signPlate(face, w2, h2), signMat);
    plate.position.set(x, y + 0.12, z + 0.04);
    plate.rotation.x = -0.25; // tipped back a little so it reads from above
    plate.castShadow = true;
    world.add(plate);
    P.add(new THREE.BoxGeometry(w2 + 0.04, h2 + 0.04, 0.03), 0x9aa0a6, m4(x, y + 0.12, z).multiply(new THREE.Matrix4().makeRotationX(-0.25)).multiply(m4(0, 0, 0.02)));
  }
  // People on the sidewalks.
  addPerson(P, m4(35.5, 0.12, 7.0, 0.4), { jacket: 0x6a5acd, pants: 0x2f3440, skin: 1, hair: 2, walk: 0.5, scale: 1.55 });
  addPerson(P, m4(36.5, 0.12, 7.5, Math.PI + 0.3), { jacket: 0x3f9a6a, pants: 0x44506a, skin: 0, hair: 0, bag: true, walk: 2, scale: 1.55 });
  addPerson(P, m4(10.2, 0.12, -8.6, -Math.PI / 2), { jacket: 0xc0504a, pants: 0x2a2a30, skin: 2, hair: 3, scale: 1.55 });
  addPerson(P, m4(46.5, 0.12, -8.0, Math.PI / 2 + 0.4), { jacket: 0x2a6a9a, pants: 0x3a3a40, skin: 3, hair: 4, scale: 1.55, walk: 1 });
  mesh(P.build({ outline: false }), mats.plain);

  T('props');
  // ---------- trees: three kinds, rounded crowns carrying the crown pictures ----------
  const treeSpots = [];
  for (let x = -8; x < 90; x += 9.5) if (Math.abs(x - 30) > 3.5) treeSpots.push([x + (R() - 0.5), 7.75, 'lind']);
  for (const [x, z, k] of [[14, -11.3, 'bjork'], [45, -11.2, 'bjork'], [-1, 11.5, 'lonn'], [41.8, 12.5, 'bjork'], [62, 11.3, 'lonn'], [28, -24, 'lonn'], [10, -27, 'lind'], [50, -26, 'bjork'], [20, 25, 'lonn'], [60, 26, 'lind'], [5, 17, 'bjork'], [33, 18, 'lind'], [48, 17.5, 'bjork'], [70, 18, 'lonn']]) treeSpots.push([x, z, k]);
  const kinds = { lind: 0, lonn: 1, bjork: 2 };
  const crownMats = treeTex.map((t) => new THREE.MeshStandardMaterial({ map: t, vertexColors: true, roughness: 0.9 }));
  for (const [kind, ti] of Object.entries(kinds)) {
    const list = treeSpots.filter((t) => t[2] === kind);
    if (!list.length) continue;
    const TB = new Builder();
    P3.trunkGeometry(TB, kind);
    const trunks = new THREE.InstancedMesh(TB.build({ outline: false }), mats.plain, list.length);
    const crowns = new THREE.InstancedMesh(P3.crownGeometry(kind, ti + 3), crownMats[ti % crownMats.length], list.length);
    const c = new THREE.Color();
    list.forEach(([x, z], i) => {
      const sc = 0.88 + R() * 0.24;
      const mtx = m4(x, 0, z, R() * 6.28, sc, sc, sc);
      trunks.setMatrixAt(i, mtx);
      crowns.setMatrixAt(i, mtx);
      const tint = { lind: [1, 1.02, 0.92], lonn: [0.82, 0.94, 0.78], bjork: [1.18, 1.22, 0.92] }[kind];
      const v = 0.94 + R() * 0.1;
      crowns.setColorAt(i, c.setRGB(tint[0] * v, tint[1] * v, tint[2] * v));
    });
    for (const t of [trunks, crowns]) {
      t.castShadow = true;
      t.receiveShadow = true;
      world.add(t);
    }
  }

  T('trees');
  // ---------- cars ----------
  const parts = { hatch: carParts('hatch'), sedan: carParts('sedan'), estate: carParts('estate') };
  const paints = [0xb0b6bc, 0x3a78c8, 0x6a6f78, 0xd9dcdf, 0xf3f3f1, 0xc8382c, 0x2f9a90, 0x7a8b55];
  const parked = [];
  let px = -12;
  while (px < 92) {
    const model = ['hatch', 'sedan', 'estate'][Math.floor(R() * 3)];
    const len = MODELS[model].L;
    if (Math.abs(px - 30) > 4.5 && R() < 0.85) parked.push({ model, x: px + len / 2, z: -3.4, rot: R() < 0.5 ? 0 : Math.PI, color: paints[Math.floor(R() * paints.length)] });
    px += len + 1.2 + R() * 1.6;
  }
  // Parked cars: rounded 3D bodies whose top carries a generated car picture,
  // tinted per car, with wheels, sills and lights underneath.
  const CAR_META = { 'car-1': { aspect: 0.412, cab: [-0.38, 0.24], kind: 'sedan' }, 'car-2': { aspect: 0.403, cab: [-0.4, 0.25], kind: 'sedan' }, 'car-3': { aspect: 0.424, cab: [-0.46, 0.25], kind: 'estate' }, 'car-4': { aspect: 0.387, cab: [-0.46, 0.26], kind: 'estate' } };
  const carMats = carTex.map((t) => new THREE.MeshPhysicalMaterial({ map: t, roughness: 0.32, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0.1, envMapIntensity: 1.2 }));
  const carBody = carTex.map((t, k) => {
    const meta = CAR_META[`car-${k + 1}`];
    const Lc = 4.5;
    const g = P3.carBodyGeometry(Lc, Lc * meta.aspect * 1.05, meta.kind, meta.cab);
    const ub = new Builder();
    P3.carUnderGeometry(ub, Lc, Lc * meta.aspect);
    return { body: g, under: ub.build({ outline: false }), L: Lc };
  });
  carMats.forEach((mat, k) => {
    const list = parked.filter((_, i) => i % carMats.length === k);
    if (!list.length) return;
    const body = new THREE.InstancedMesh(carBody[k].body, mat, list.length);
    const under = new THREE.InstancedMesh(carBody[k].under, mats.plain, list.length);
    const c = new THREE.Color();
    list.forEach((car, i) => {
      const s2 = MODELS[car.model].L / carBody[k].L;
      const mtx = m4(car.x, 0.02, car.z, car.rot, s2, 1, 1);
      body.setMatrixAt(i, mtx);
      under.setMatrixAt(i, mtx);
      body.setColorAt(i, k < 2 ? c.set(car.color).lerp(new THREE.Color(1, 1, 1), 0.3) : c.setScalar(0.85 + (i % 3) * 0.1));
    });
    for (const im of [body, under]) {
      im.castShadow = true;
      im.receiveShadow = true;
      world.add(im);
    }
  });
  // A moving car with its own colour.
  const car = new THREE.Group();
  if (carMats.length) {
    const red = carMats[1 % carMats.length].clone();
    red.color.set(0xd84030);
    const bm = new THREE.Mesh(carBody[1 % carMats.length].body, red);
    const um = new THREE.Mesh(carBody[1 % carMats.length].under, mats.plain);
    for (const m of [bm, um]) {
      m.castShadow = true;
      car.add(m);
    }
  }
  world.add(car);
  // The player (walking) and a cyclist.
  const actor = (build) => {
    const b = new Builder();
    build(b);
    const m = new THREE.Mesh(b.build({ outline: false }), mats.plain);
    m.castShadow = true;
    const g = new THREE.Group();
    g.add(m);
    world.add(g);
    return g;
  };
  // The player: the same person model, a little larger, in an orange jacket.
  const player = actor((b) => addPerson(b, m4(0, 0, 0), { jacket: 0xf07a1a, pants: 0x2a3550, skin: 0, hair: 1, scale: 1.8, walk: 0.6 }));
  const cyclist = actor((b) => {
    addBike(b, m4(0, 0, 0), 0x2a4a70);
    addPerson(b, m4(-0.2, 0.42, 0, 0, 1, 0.82, 1), { jacket: 0xd4ac0d, pants: 0x2f3440, skin: 1, hair: 2, scale: 1.15 });
  });

  T('cars');
  // ---------- decals: baked shade, stains, paint, manholes, light pools ----------
  const D = new THREE.Group();
  world.add(D);
  const shade = L.shadeTex();
  decals(D, shade, [
    ...treeSpots.map(([x, z]) => ({ x, z, w: 6.5, y: 0.14 })),
    ...parked.map((c) => ({ x: c.x, z: c.z, w: MODELS[c.model].L + 1.2, d: 2.8, rot: c.rot })),
    ...lampSpots.map(([x, z]) => ({ x, z, w: 1.2, y: 0.14 })),
    ...parked.map((c) => ({ x: c.x, z: c.z, w: MODELS[c.model].L + 0.9, d: 2.7, rot: c.rot, y: 0.02 })),
    ...[[18, 7.9], [34, -8.1], [21, 7.9], [31, -8.1], [47.5, -8.2], [38.5, 7.6], [22.5, -8.0], [39.6, 7.7], [23.6, -7.9]].map(([x, z]) => ({ x, z, w: 2.2, d: 1.4, y: 0.14 })),
    ...[[6.5, -7.4, 7], [44.5, 7.6, 6]].map(([x0, z, n]) => ({ x: x0 + n * 0.37, z, w: n * 0.75 + 1.2, d: 2.2, y: 0.14 })),
    ...parked.map((c) => ({ x: c.x, z: c.z, w: MODELS[c.model].L * 0.75, d: 1.5, rot: c.rot, y: 0.021 })),
  ], { order: 1, opacity: 1 });
  const wallShade = L.wallShadeTex();
  decals(D, wallShade, [
    ...north.map((h) => ({ x: h.x, z: -9.3 + 0.9, w: h.w + 0.4, d: 1.8, y: 0.135 })),
    ...south.map((h) => ({ x: h.x, z: 9.0 - 0.9, w: h.w + 0.4, d: 1.8, y: 0.135, rot: Math.PI })),
    ...[-6.3, 6.0].map((z) => ({ x: 30, z: z + Math.sign(z) * -0.35, w: 140, d: 0.7, y: 0.015, rot: z < 0 ? 0 : Math.PI })),
    ...gardens.map((gd) => ({ x: (gd.x0 + gd.x1) / 2, z: gd.z + Math.sign(gd.z) * -1.2, w: gd.x1 - gd.x0, d: 1.2, y: 0.136, rot: gd.z < 0 ? 0 : Math.PI })),
  ], { order: 2, opacity: 0.85 });
  const stains = [];
  for (let i = 0; i < 14; i++) stains.push({ x: -10 + R() * 100, z: -4 + R() * 7.8, w: 1.2 + R() * 1.6, rot: R() * 6, y: 0.012 });
  for (let i = 0; i < 18; i++) stains.push({ x: -10 + R() * 100, z: R() < 0.5 ? -5.4 : 5.1, w: 1.0 + R() * 1.4, rot: R() * 6, y: 0.017 });
  for (let i = 0; i < 30; i++) stains.push({ x: -10 + R() * 100, z: R() < 0.5 ? -7.8 + R() * 2 : 6.6 + R() * 1.8, w: 0.9 + R() * 1.6, rot: R() * 6, y: 0.135 });
  decals(D, L.stainTex(), stains, { order: 1, opacity: 0.55 });
  // A dark line where the raised curbs meet the road and bike lanes.
  decals(D, wallShade, [-6.3, -4.5, 4.2, 6.0].map((z) => ({ x: 30, z: z + (z < 0 ? 0.32 : -0.32), w: 140, d: 0.45, y: 0.0135, rot: z < 0 ? 0 : Math.PI })), { order: 2, opacity: 0.7 });
  const paint = L.paintTex();
  const lines = [];
  for (let x = -38; x < 98; x += 6) if (Math.abs(x + 1.5 - 30) > 3.6) lines.push({ x: x + 1.5, z: 0.95, w: 3, d: 0.15, y: 0.013 });
  for (let x = -38; x < 98; x += 5.6) if (Math.abs(x - 30) > 3.6) lines.push({ x, z: -3.4, w: 0.12, d: 2.0, y: 0.013 });
  const zebra = [];
  for (let z = -4.3; z < 4.0; z += 1.05) zebra.push({ x: 30, z: z + 0.3, w: 3.2, d: 0.55, y: 0.013 });
  decals(D, L.zebraTex(), zebra, { order: 3 });
  for (const z of [-4.55, 4.25, -2.3]) lines.push({ x: 30, z, w: 140, d: 0.1, y: 0.014 });
  decals(D, paint, lines, { order: 3, opacity: 0.62 });
  const patches = [];
  for (let i = 0; i < 9; i++) patches.push({ x: -8 + R() * 96, z: -1.8 + R() * 5.5, w: 1.6 + R() * 2.4, d: 1.0 + R() * 1.6, y: 0.011 });
  decals(D, L.patchTex(), patches, { order: 1, opacity: 0.22 });
  decals(D, L.trackTex(), [{ x: 30, z: -0.7, w: 140, d: 2.2, y: 0.0115 }, { x: 30, z: 2.6, w: 140, d: 2.2, y: 0.0115 }], { order: 1, opacity: 0.55 });
  const covers = [];
  for (let x = -6; x < 90; x += 21) covers.push({ x: x + R() * 4, z: -1.0 + R() * 3, w: 0.8, y: 0.016 });
  decals(D, L.manholeTex(), covers, { order: 4 });
  const grates = [];
  for (let x = -8; x < 92; x += 13) grates.push({ x, z: -4.35, w: 0.55, d: 0.35, y: 0.016 }, { x: x + 6, z: 4.05, w: 0.55, d: 0.35, y: 0.016 });
  decals(D, L.grateTex(), grates, { order: 4 });
  const glows = decals(D, L.glowTex(), lampSpots.map(([x, z, dir]) => ({ x, z: z + dir * 1.15, w: 7.5, y: 0.2 })), { additive: true, order: 6, opacity: 0.5 });
  const ring = decals(D, L.ringTex(), [{ x: 0, z: 0, w: 3.0, y: 0.15 }], { order: 7 });
  // Parking lights: a faint warm glow at the front and red at the back of each car.
  const glowT = L.glowTex();
  decals(D, glowT, parked.flatMap((c) => {
    const h = (MODELS[c.model].L / 2 + 0.1) * Math.cos(c.rot);
    return [{ x: c.x + h, z: c.z - 0.5, w: 0.9, y: 1.3 }, { x: c.x + h, z: c.z + 0.5, w: 0.9, y: 1.3 }];
  }), { additive: true, order: 9, opacity: 0.55 });


  const update = (t) => {
    car.position.set(-14 + ((t * 8) % 112), 0.02, 2.4);
    cyclist.position.set(-12 + ((t * 4.2) % 108), 0.02, 5.1);
    const wx = 30 + Math.sin(t * 0.22) * 9;
    player.position.set(wx, 0.12, -7.3);
    player.rotation.y = Math.cos(t * 0.22) > 0 ? 0 : Math.PI;
    ring.setMatrixAt(0, m4(wx, 0.15, -7.3, 0, 2.2, 1, 2.2));
    ring.instanceMatrix.needsUpdate = true;
  };

  // ---------- light: low warm evening sun from the west, cool sky ----------
  const sun = new THREE.DirectionalLight(0xffb052, 7.4);
  sun.castShadow = true;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.05;
  const sunOffset = new THREE.Vector3(-60, 23, 15); // west-south-west, about 20° above the horizon
  scene.add(sun, sun.target);
  scene.add(new THREE.HemisphereLight(0xc8b8a8, 0x8a6440, 0.85));
  const fill = new THREE.DirectionalLight(0x9aa8d0, 0.3); // cool light from the east fills the shadows
  fill.position.set(60, 30, -10);
  scene.add(fill);

  return { scene, sun, sunOffset, update, camera: CAMERA, glows, setNearFade, toneMapping: THREE.ACESFilmicToneMapping, exposure: 1.15 };
}
