// D-045: street furniture, bikes and people at the same detail level as the
// cars and trees, plus the 3D car bodies and tree crowns that carry the
// generated pictures. Everything is added to Builders (merged meshes with
// colour per corner), so the whole street is still only a few draw calls.

import * as THREE from '../../vendor/three/three.module.js';
import { m4 } from './geo.js';

const Rx = (a) => new THREE.Matrix4().makeRotationX(a);
const Rz = (a) => new THREE.Matrix4().makeRotationZ(a);
const Ry = (a) => new THREE.Matrix4().makeRotationY(a);

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

// A tube between two points.
function tube(B, place, a, b, r, color, seg = 6) {
  const A = new THREE.Vector3(...a);
  const C = new THREE.Vector3(...b);
  const len = A.distanceTo(C);
  const g = new THREE.CylinderGeometry(r, r, len, seg, 1);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), C.clone().sub(A).normalize());
  const m = new THREE.Matrix4().compose(A.clone().add(C).multiplyScalar(0.5), q, new THREE.Vector3(1, 1, 1));
  B.add(g, color, place.clone().multiply(m));
}

// ---------- people ----------

const SKIN = [0xf1c9a5, 0xe0ac86, 0xc58c64, 0x8d5a3b];
const HAIR = [0x2b2018, 0x5a3b22, 0xb8874a, 0x1a1a1a, 0x8a8a8a];

// A person about 1.8 m tall, facing +x. scale makes the player a little larger.
export function addPerson(B, place, { jacket = 0x3a5a8a, pants = 0x2f3440, skin = 0, hair = 0, scale = 1, bag = false, walk = 0 } = {}) {
  const at = (x, y, z, extra) => {
    const m = place.clone().multiply(m4(x * scale, y * scale, z * scale, 0, scale, scale, scale));
    return extra ? m.multiply(extra) : m;
  };
  const sk = SKIN[skin % SKIN.length];
  const hr = HAIR[hair % HAIR.length];
  const sw = Math.sin(walk) * 0.25;
  // Shoes and legs (slightly apart, swinging when walking).
  for (const [side, ph] of [[0.11, sw], [-0.11, -sw]]) {
    B.add(new THREE.BoxGeometry(0.26, 0.09, 0.11), 0x1d1d20, at(0.05 + ph * 0.4, 0.045, side));
    B.add(new THREE.CapsuleGeometry(0.075, 0.68, 2, 6), pants, at(ph * 0.25, 0.47, side, Rz(-ph * 0.5)));
  }
  // Hips, torso (jacket), collar, arms with hands.
  B.add(new THREE.BoxGeometry(0.22, 0.18, 0.36), pants, at(0, 0.88, 0));
  B.add(new THREE.CapsuleGeometry(0.17, 0.36, 2, 8), jacket, at(0, 1.2, 0, new THREE.Matrix4().makeScale(0.85, 1, 1.15)));
  B.add(new THREE.CylinderGeometry(0.08, 0.1, 0.08, 8), new THREE.Color(jacket).multiplyScalar(0.8).getHex(), at(0, 1.5, 0));
  for (const [side, ph] of [[0.26, -sw], [-0.26, sw]]) {
    B.add(new THREE.CapsuleGeometry(0.06, 0.5, 2, 6), jacket, at(ph * 0.3, 1.15, side, Rz(ph * 0.6)));
    B.add(new THREE.SphereGeometry(0.055, 6, 5), sk, at(ph * 0.55, 0.84, side));
  }
  // Head, hair, nose so the facing reads.
  B.add(new THREE.SphereGeometry(0.12, 8, 6), sk, at(0.01, 1.66, 0));
  B.add(new THREE.SphereGeometry(0.128, 8, 4, 0, Math.PI * 2, 0, Math.PI * 0.55), hr, at(-0.015, 1.68, 0, Rz(0.25)));
  B.add(new THREE.BoxGeometry(0.04, 0.04, 0.04), sk, at(0.13, 1.65, 0));
  if (bag) B.add(new THREE.BoxGeometry(0.16, 0.3, 0.26), 0x5a3a24, at(-0.2, 1.2, 0));
}

// ---------- bikes ----------

// A city bike 1.8 m long along +x, standing on y = 0.
export function addBike(B, place, color, { basket = true } = {}) {
  const tyre = 0x1b1b1f;
  const steel = 0xb8bcc2;
  const wheel = (cx) => {
    B.add(new THREE.TorusGeometry(0.33, 0.04, 4, 14), tyre, place.clone().multiply(m4(cx, 0.35, 0)));
    for (let k = 0; k < 2; k++) B.add(new THREE.BoxGeometry(0.56, 0.01, 0.01), steel, place.clone().multiply(m4(cx, 0.35, 0)).multiply(Rz((k * Math.PI) / 2)));
    B.add(new THREE.CylinderGeometry(0.035, 0.035, 0.1, 6), steel, place.clone().multiply(m4(cx, 0.35, 0)).multiply(Rx(Math.PI / 2)));
  };
  wheel(-0.6);
  wheel(0.6);
  const p = (x, y) => [x, y, 0];
  const bb = p(-0.05, 0.36);
  const seat = p(-0.22, 0.86);
  const head = p(0.48, 0.82);
  tube(B, place, bb, seat, 0.025, color); // seat tube
  tube(B, place, bb, p(0.46, 0.66), 0.028, color); // down tube
  tube(B, place, p(-0.2, 0.74), p(0.47, 0.74), 0.022, color); // top tube
  tube(B, place, bb, p(-0.6, 0.35), 0.018, color); // chain stay
  tube(B, place, p(-0.2, 0.78), p(-0.6, 0.35), 0.018, color); // seat stay
  tube(B, place, head, p(0.6, 0.35), 0.02, color); // fork
  tube(B, place, seat, [-0.24, 0.92, 0], 0.016, steel);
  B.add(new THREE.BoxGeometry(0.24, 0.05, 0.12), 0x2a2420, place.clone().multiply(m4(-0.26, 0.95, 0)));
  tube(B, place, head, [0.46, 0.98, 0], 0.016, steel);
  tube(B, place, [0.44, 0.98, -0.28], [0.44, 0.98, 0.28], 0.016, 0x222226);
  // Mudguards, chain guard, rear rack.
  B.add(new THREE.TorusGeometry(0.37, 0.025, 3, 6, Math.PI * 0.75), color, place.clone().multiply(m4(-0.6, 0.35, 0)).multiply(Rz(Math.PI * 0.15)));
  B.add(new THREE.TorusGeometry(0.37, 0.025, 3, 5, Math.PI * 0.6), color, place.clone().multiply(m4(0.6, 0.35, 0)).multiply(Rz(Math.PI * 0.2)));
  B.add(new THREE.BoxGeometry(0.42, 0.08, 0.03), 0x2a2a2e, place.clone().multiply(m4(-0.3, 0.38, 0.06)));
  B.add(new THREE.BoxGeometry(0.44, 0.03, 0.2), steel, place.clone().multiply(m4(-0.55, 0.74, 0)));
  if (basket) {
    const bk = place.clone().multiply(m4(0.66, 0.92, 0));
    B.add(new THREE.BoxGeometry(0.32, 0.03, 0.34), 0x6b4a2a, bk);
    for (const [x, z, w, d] of [[0.15, 0, 0.02, 0.34], [-0.15, 0, 0.02, 0.34], [0, 0.16, 0.32, 0.02], [0, -0.16, 0.32, 0.02]]) B.add(new THREE.BoxGeometry(w, 0.2, d), 0x8a6640, bk.clone().multiply(m4(x, 0.1, z)));
  }
}

// A galvanised hoop rack (common in Uppsala) with a slot per bike.
export function addRack(B, place, n, spacing = 0.8) {
  const steel = 0xa9adb3;
  for (let i = 0; i < n; i++) {
    const x = i * spacing;
    const hoop = place.clone().multiply(m4(x, 0, 0, Math.PI / 2));
    B.add(new THREE.TorusGeometry(0.42, 0.03, 4, 8, Math.PI), steel, hoop.clone().multiply(m4(0, 0.4, 0)));
    tube(B, hoop, [-0.42, 0, 0], [-0.42, 0.4, 0], 0.03, steel);
    tube(B, hoop, [0.42, 0, 0], [0.42, 0.4, 0], 0.03, steel);
  }
  tube(B, place, [-0.1, 0.06, 0], [(n - 1) * spacing + 0.1, 0.06, 0], 0.035, steel);
}

// ---------- street lamp (Uppsala style cast iron with a lantern) ----------

export function addLamp(B, place, dir = 1) {
  const iron = 0x1f2a26;
  const at = (x, y, z, e) => (e ? place.clone().multiply(m4(x, y, z)).multiply(e) : place.clone().multiply(m4(x, y, z)));
  B.add(new THREE.CylinderGeometry(0.22, 0.3, 0.5, 8), iron, at(0, 0.25, 0));
  B.add(new THREE.TorusGeometry(0.22, 0.04, 4, 10), iron, at(0, 0.5, 0, Rx(Math.PI / 2)));
  B.add(new THREE.CylinderGeometry(0.1, 0.17, 1.2, 8), iron, at(0, 1.1, 0));
  B.add(new THREE.CylinderGeometry(0.1, 0.13, 3.9, 8), iron, at(0, 3.6, 0));
  B.add(new THREE.SphereGeometry(0.11, 8, 6), iron, at(0, 1.75, 0));
  // Curved arm towards the street.
  B.add(new THREE.TorusGeometry(0.55, 0.045, 5, 10, Math.PI / 2), iron, at(0, 5.0, dir * 0.55, Ry(dir > 0 ? -Math.PI / 2 : Math.PI / 2)));
  B.add(new THREE.CylinderGeometry(0.015, 0.015, 0.5, 4), iron, at(0, 5.25, dir * 0.95));
  // Classic lantern: a small pointed roof with a gold knob, a bright glass
  // body (drawn separately so it glows), a thin frame and a bottom cup.
  const lz = dir * 1.12;
  B.add(new THREE.CylinderGeometry(0.05, 0.27, 0.22, 6), iron, at(0, 4.98, lz));
  B.add(new THREE.CylinderGeometry(0.29, 0.29, 0.05, 6), 0xb8923a, at(0, 4.86, lz));
  B.add(new THREE.SphereGeometry(0.07, 6, 4), 0xd4aa48, at(0, 5.15, lz));
  for (let k = 0; k < 6; k++) {
    const a = (k / 6) * Math.PI * 2 + Math.PI / 6;
    B.add(new THREE.BoxGeometry(0.035, 0.66, 0.035), iron, at(Math.cos(a) * 0.3, 4.52, lz + Math.sin(a) * 0.3));
  }
  B.add(new THREE.CylinderGeometry(0.24, 0.12, 0.12, 6), iron, at(0, 4.16, lz));
  return [place.elements[12], place.elements[14] + dir * 1.12];
}

export function lanternGlass() {
  return new THREE.CylinderGeometry(0.31, 0.22, 0.64, 6);
}

// ---------- signs (faces as small drawn pictures) ----------

function signCanvas(draw) {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  draw(c.getContext('2d'));
  return c;
}

// An atlas with the sign faces: P (parking), street name, bus stop, no entry.
export function signAtlas() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 128;
  const g = c.getContext('2d');
  const faces = [
    (h) => {
      h.fillStyle = '#1f5fbf';
      h.fillRect(6, 6, 116, 116);
      h.strokeStyle = '#fff';
      h.lineWidth = 6;
      h.strokeRect(10, 10, 108, 108);
      h.fillStyle = '#fff';
      h.font = 'bold 86px sans-serif';
      h.textAlign = 'center';
      h.textBaseline = 'middle';
      h.fillText('P', 64, 70);
    },
    (h) => {
      h.fillStyle = '#1d4f9e';
      h.fillRect(0, 34, 128, 60);
      h.strokeStyle = '#fff';
      h.lineWidth = 4;
      h.strokeRect(4, 38, 120, 52);
      h.fillStyle = '#fff';
      h.font = 'bold 15px sans-serif';
      h.textAlign = 'center';
      h.textBaseline = 'middle';
      h.fillText('SYSSLOMANSG.', 64, 64);
    },
    (h) => {
      h.fillStyle = '#f2c94c';
      h.fillRect(14, 6, 100, 116);
      h.fillStyle = '#2e7d4f';
      h.fillRect(28, 30, 72, 44);
      h.fillStyle = '#f2c94c';
      h.fillRect(36, 38, 22, 16);
      h.fillRect(66, 38, 22, 16);
      h.fillStyle = '#1a1a1a';
      h.font = 'bold 22px sans-serif';
      h.textAlign = 'center';
      h.fillText('BUSS', 64, 104);
    },
    (h) => {
      h.fillStyle = '#c62828';
      h.beginPath();
      h.arc(64, 64, 58, 0, Math.PI * 2);
      h.fill();
      h.fillStyle = '#fff';
      h.fillRect(24, 54, 80, 20);
    },
  ];
  faces.forEach((f, i) => {
    const s = signCanvas(f);
    g.drawImage(s, i * 128, 0);
  });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// A sign plate with the face from the atlas (u0 = 0..3), facing +z.
export function signPlate(face, w = 0.6, h = 0.6) {
  const g = new THREE.PlaneGeometry(w, h);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setX(i, (face + uv.getX(i)) / 4);
  return g;
}

export function addSignPost(B, place, height = 2.6) {
  B.add(new THREE.CylinderGeometry(0.035, 0.035, height, 6), 0x9aa0a6, place.clone().multiply(m4(0, height / 2, 0)));
  B.add(new THREE.CylinderGeometry(0.05, 0.05, 0.06, 6), 0x5a5e64, place.clone().multiply(m4(0, height, 0)));
}

// ---------- benches, crates, flower boxes, bins, bollards ----------

export function addBench(B, place) {
  const iron = 0x1f2a26;
  const wood = [0x8a5a36, 0x95643c, 0x7f5232];
  for (let i = 0; i < 4; i++) B.add(new THREE.BoxGeometry(1.8, 0.04, 0.11), wood[i % 3], place.clone().multiply(m4(0, 0.46, -0.18 + i * 0.12)));
  for (let i = 0; i < 3; i++) B.add(new THREE.BoxGeometry(1.8, 0.11, 0.035), wood[(i + 1) % 3], place.clone().multiply(m4(0, 0.62 + i * 0.13, -0.27)).multiply(Rx(-0.15)));
  for (const x of [-0.75, 0.75]) {
    B.add(new THREE.BoxGeometry(0.06, 0.44, 0.06), iron, place.clone().multiply(m4(x, 0.22, 0.17)));
    B.add(new THREE.BoxGeometry(0.06, 0.85, 0.06), iron, place.clone().multiply(m4(x, 0.42, -0.24)).multiply(Rx(-0.15)));
    B.add(new THREE.BoxGeometry(0.06, 0.05, 0.48), iron, place.clone().multiply(m4(x, 0.44, -0.02)));
    B.add(new THREE.BoxGeometry(0.06, 0.04, 0.42), iron, place.clone().multiply(m4(x, 0.68, -0.02)));
  }
}

export function addCrate(B, place, s = 0.9, tone = 0) {
  const wood = [0xb98a58, 0xa87a4a, 0xc49562][tone % 3];
  const dark = new THREE.Color(wood).multiplyScalar(0.62).getHex();
  const h = s * 0.75;
  B.add(new THREE.BoxGeometry(s * 0.94, h * 0.94, s * 0.94), dark, place.clone().multiply(m4(0, h / 2, 0)));
  for (const side of [1, -1]) {
    for (let k = 0; k < 3; k++) {
      const y = h * (0.18 + k * 0.32);
      B.add(new THREE.BoxGeometry(s, h * 0.24, 0.04), wood, place.clone().multiply(m4(0, y, side * s * 0.49)));
      B.add(new THREE.BoxGeometry(0.04, h * 0.24, s), wood, place.clone().multiply(m4(side * s * 0.49, y, 0)));
    }
    B.add(new THREE.BoxGeometry(0.08, h, 0.08), dark, place.clone().multiply(m4(side * s * 0.46, h / 2, s * 0.46)));
    B.add(new THREE.BoxGeometry(0.08, h, 0.08), dark, place.clone().multiply(m4(side * s * 0.46, h / 2, -s * 0.46)));
  }
  for (let k = 0; k < 4; k++) B.add(new THREE.BoxGeometry(s, 0.03, s * 0.2), wood, place.clone().multiply(m4(0, h, -s * 0.36 + k * s * 0.24)));
}

export function addPallet(B, place) {
  const wood = 0xb79a6e;
  for (let k = 0; k < 6; k++) B.add(new THREE.BoxGeometry(1.2, 0.025, 0.12), wood, place.clone().multiply(m4(0, 0.135, -0.45 + k * 0.18)));
  for (const x of [-0.55, 0, 0.55]) B.add(new THREE.BoxGeometry(0.12, 0.1, 1.0), 0x9a7c52, place.clone().multiply(m4(x, 0.06, 0)));
}

export function addFlowerBox(B, place, seed) {
  const R = rng(seed);
  const wood = [0x7a5234, 0x86603c];
  for (let k = 0; k < 4; k++) B.add(new THREE.BoxGeometry(1.8, 0.14, 0.05), wood[k % 2], place.clone().multiply(m4(0, 0.1 + k * 0.14, 0.36)));
  for (let k = 0; k < 4; k++) B.add(new THREE.BoxGeometry(1.8, 0.14, 0.05), wood[(k + 1) % 2], place.clone().multiply(m4(0, 0.1 + k * 0.14, -0.36)));
  for (const x of [-0.88, 0.88]) B.add(new THREE.BoxGeometry(0.05, 0.56, 0.76), wood[0], place.clone().multiply(m4(x, 0.31, 0)));
  B.add(new THREE.BoxGeometry(1.74, 0.04, 0.7), 0x3a2a1e, place.clone().multiply(m4(0, 0.58, 0)));
  const petals = [0xe0506a, 0xf2c94c, 0xffffff, 0xd96aa0, 0xff8a3a, 0x8a6ad6];
  for (let i = 0; i < 16; i++) {
    const x = (R() - 0.5) * 1.6;
    const z = (R() - 0.5) * 0.55;
    B.add(new THREE.IcosahedronGeometry(0.13 + R() * 0.06, 0), [0x3f7a35, 0x4f8f3a][i % 2], place.clone().multiply(m4(x, 0.68, z)));
    if (R() < 0.75) B.add(new THREE.IcosahedronGeometry(0.07, 0), petals[Math.floor(R() * petals.length)], place.clone().multiply(m4(x + 0.03, 0.82, z)));
  }
}

export function addBin(B, place) {
  B.add(new THREE.CylinderGeometry(0.27, 0.23, 0.85, 12), 0x2f5a42, place.clone().multiply(m4(0, 0.5, 0)));
  B.add(new THREE.CylinderGeometry(0.29, 0.29, 0.06, 12), 0x24262a, place.clone().multiply(m4(0, 0.95, 0)));
  B.add(new THREE.CylinderGeometry(0.05, 0.05, 0.5, 6), 0x24262a, place.clone().multiply(m4(0, 0.25, -0.3)));
}

export function addBollard(B, place) {
  B.add(new THREE.CylinderGeometry(0.1, 0.13, 0.9, 10), 0x1f2a26, place.clone().multiply(m4(0, 0.45, 0)));
  B.add(new THREE.SphereGeometry(0.11, 6, 3, 0, Math.PI * 2, 0, Math.PI / 2), 0x1f2a26, place.clone().multiply(m4(0, 0.9, 0)));
  B.add(new THREE.CylinderGeometry(0.105, 0.105, 0.08, 10), 0xe8e4da, place.clone().multiply(m4(0, 0.72, 0)));
}

// Railing: posts with rounded tops and two rails.
export function addRailing(B, place, len) {
  const iron = 0x1c2220;
  for (let x = 0; x <= len + 0.01; x += 0.32) {
    B.add(new THREE.BoxGeometry(0.035, 0.95, 0.035), iron, place.clone().multiply(m4(x, 0.48, 0)));
  }
  for (const y of [0.15, 0.85]) B.add(new THREE.BoxGeometry(len, 0.045, 0.045), iron, place.clone().multiply(m4(len / 2, y, 0)));
}

// ---------- 3D car body for a picture seen from above ----------

// A rounded body whose top carries the generated car picture (projected
// straight down), so the car reads from above and from the tilted camera.
export function carBodyGeometry(L, W, kind = 'sedan', cabin = null) {
  const nx = 28;
  const nz = 10;
  const cab = cabin || (kind === 'estate' ? [-0.47, 0.22] : kind === 'hatch' ? [-0.44, 0.16] : [-0.33, 0.18]);
  const height = (u, v) => {
    // u along the car (-0.5 rear .. 0.5 front), v across (-0.5..0.5)
    const edge = Math.min(1, (0.5 - Math.abs(v)) / 0.12);
    const ends = Math.min(1, (0.5 - Math.abs(u)) / 0.07);
    let h = 0.82 + 0.06 * Math.min(1, (0.5 - Math.abs(u)) / 0.2);
    // Cabin with a sloping windscreen and rear window.
    const rise = (x, a, b) => Math.min(1, Math.max(0, (x - a) / (b - a)));
    const front = 1 - rise(u, cab[1], cab[1] + 0.13);
    const back = rise(u, cab[0] - (kind === 'sedan' ? 0.12 : 0.04), cab[0]);
    const cabin = Math.min(front, back) * Math.min(1, (0.5 - Math.abs(v)) / 0.16);
    h += cabin * 0.62;
    return 0.3 + (h - 0.3) * Math.sqrt(Math.max(0, Math.min(edge, ends)));
  };
  const pos = [];
  const uv = [];
  const idx = [];
  const grid = [];
  for (let i = 0; i <= nx; i++) {
    for (let j = 0; j <= nz; j++) {
      const u = i / nx - 0.5;
      const v = j / nz - 0.5;
      // Round the corners of the footprint.
      const cu = Math.max(0, Math.abs(u) - 0.42) / 0.08;
      const cv = Math.max(0, Math.abs(v) - 0.36) / 0.14;
      const k = Math.min(1, Math.hypot(cu, cv)) > 0.999 ? 0.9 : 1;
      grid.push(pos.length / 3);
      pos.push(u * L * k, height(u, v), v * W * k);
      uv.push(u + 0.5, 0.5 - v);
    }
  }
  const at = (i, j) => i * (nz + 1) + j;
  for (let i = 0; i < nx; i++)
    for (let j = 0; j < nz; j++) {
      const a = at(i, j), b = at(i + 1, j), c = at(i + 1, j + 1), d = at(i, j + 1);
      idx.push(a, d, b, b, d, c);
    }
  // Skirt: the sides drop to just above the road; they take the edge colour of the picture.
  const ring = [];
  for (let i = 0; i <= nx; i++) ring.push(at(i, 0));
  for (let j = 1; j <= nz; j++) ring.push(at(nx, j));
  for (let i = nx - 1; i >= 0; i--) ring.push(at(i, nz));
  for (let j = nz - 1; j >= 1; j--) ring.push(at(0, j));
  const base = pos.length / 3;
  for (const r of ring) {
    pos.push(pos[r * 3] * 0.98, 0.32, pos[r * 3 + 2] * 0.98);
    uv.push(uv[r * 2], uv[r * 2 + 1]);
  }
  for (let k = 0; k < ring.length; k++) {
    const k2 = (k + 1) % ring.length;
    idx.push(ring[k], ring[k2], base + k, ring[k2], base + k2, base + k);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

// Wheels, sills and lights under the body, as one geometry with colours.
export function carUnderGeometry(B, L, W) {
  for (const sx of [-1, 1])
    for (const sz of [-1, 1]) {
      B.add(new THREE.CylinderGeometry(0.32, 0.32, 0.22, 12), 0x161618, m4(sx * (L / 2 - 0.78), 0.32, sz * (W / 2 - 0.1)).multiply(Rx(Math.PI / 2)));
      B.add(new THREE.CylinderGeometry(0.19, 0.19, 0.23, 8), 0x9aa0a8, m4(sx * (L / 2 - 0.78), 0.32, sz * (W / 2 - 0.09)).multiply(Rx(Math.PI / 2)));
    }
  B.add(new THREE.BoxGeometry(L * 0.86, 0.14, W * 0.94), 0x1c1c20, m4(0, 0.26, 0));
  for (const sz of [-1, 1]) {
    B.add(new THREE.BoxGeometry(0.08, 0.13, 0.34), 0xfff4d6, m4(L / 2 - 0.02, 0.66, sz * (W / 2 - 0.3)));
    B.add(new THREE.BoxGeometry(0.08, 0.13, 0.34), 0xc0221a, m4(-L / 2 + 0.02, 0.7, sz * (W / 2 - 0.28)));
  }
}

// ---------- tree crowns (rounded, soft, carrying the crown picture) ----------

function lumpy(r, seed, detail = 2) {
  const g = new THREE.IcosahedronGeometry(r, detail);
  const p = g.attributes.position;
  const R = rng(seed);
  const bumps = Array.from({ length: 5 }, () => [R() * 2 - 1, R() * 2 - 1, R() * 2 - 1, 0.02 + R() * 0.03]);
  for (let i = 0; i < p.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(p, i).normalize();
    let k = 1;
    for (const [bx, by, bz, a] of bumps) {
      const d = v.x * bx + v.y * by + v.z * bz;
      k += a * Math.max(0, d) * Math.max(0, d);
    }
    v.multiplyScalar(r * k);
    if (v.y < 0) v.y *= 0.6; // flatter underside
    p.setXYZ(i, v.x, v.y, v.z);
  }
  smoothNormals(g);
  return g;
}

// Smooth normals for a shape whose corners are stored separately per
// triangle: average the face normals of all corners at the same place.
function smoothNormals(g) {
  g.computeVertexNormals();
  const p = g.attributes.position;
  const n = g.attributes.normal;
  const acc = new Map();
  const key = (i) => `${Math.round(p.getX(i) * 1000)},${Math.round(p.getY(i) * 1000)},${Math.round(p.getZ(i) * 1000)}`;
  for (let i = 0; i < p.count; i++) {
    const k = key(i);
    const a = acc.get(k) || [0, 0, 0];
    a[0] += n.getX(i);
    a[1] += n.getY(i);
    a[2] += n.getZ(i);
    acc.set(k, a);
  }
  for (let i = 0; i < p.count; i++) {
    const a = acc.get(key(i));
    const l = Math.hypot(a[0], a[1], a[2]) || 1;
    n.setXYZ(i, a[0] / l, a[1] / l, a[2] / l);
  }
  n.needsUpdate = true;
}

// kind: 'lind' (round, wide), 'lonn' (larger, darker), 'bjork' (tall, light, narrow).
export const TREE_KINDS = {
  lind: { trunkH: 4.0, lumps: [[0, 0, 0, 2.7], [1.5, -0.5, 1.0, 1.9], [-1.4, -0.4, -1.0, 2.0], [0.2, 1.2, -0.3, 1.9], [-0.9, -0.2, 1.4, 1.7]], top: 6.2, squash: 0.85 },
  lonn: { trunkH: 3.6, lumps: [[0, 0, 0, 3.1], [1.8, -0.6, 0.6, 2.1], [-1.6, -0.5, -0.8, 2.2], [0.4, 1.0, 1.3, 2.0], [-0.6, 1.1, -1.3, 1.9]], top: 6.0, squash: 0.75 },
  bjork: { trunkH: 4.6, lumps: [[0, 0, 0, 1.7], [0.4, 1.6, 0.2, 1.4], [-0.3, -1.3, 0.3, 1.5], [0.6, 0.4, -0.8, 1.2]], top: 7.0, squash: 1.35 },
};

// Crown geometry in local space with uv from straight above (for the picture)
// and a colour per corner: dark underneath and inside, light on top.
export function crownGeometry(kind, seed) {
  const K = TREE_KINDS[kind];
  const parts = [];
  K.lumps.forEach(([x, y, z, r], i) => {
    const g = lumpy(r, seed * 7 + i);
    g.scale(1, K.squash, 1);
    g.translate(x, K.top + y * K.squash, z);
    parts.push(g.toNonIndexed());
  });
  const pos = [];
  const nor = [];
  for (const g of parts) {
    pos.push(...g.attributes.position.array);
    nor.push(...g.attributes.normal.array);
    g.dispose();
  }
  let reach = 0;
  for (let i = 0; i < pos.length; i += 3) reach = Math.max(reach, Math.hypot(pos[i], pos[i + 2]));
  const uv = [];
  const col = [];
  let minY = Infinity;
  let maxY = -Infinity;
  for (let i = 1; i < pos.length; i += 3) {
    minY = Math.min(minY, pos[i]);
    maxY = Math.max(maxY, pos[i]);
  }
  for (let i = 0; i < pos.length; i += 3) {
    // The crown fills the inner 84 % of the picture, so no see-through edge shows.
    // Picture coordinates from position (top) blended with the normal (sides),
    // so the sides show leaves from the crown's rim instead of streaks.
    const px = pos[i] / reach;
    const pz = pos[i + 2] / reach;
    const t = Math.max(0, Math.min(1, nor[i + 1] * 1.4));
    uv.push(0.5 + (px * t + nor[i] * (1 - t)) * 0.42, 0.5 - (pz * t + nor[i + 2] * (1 - t)) * 0.42);
    const up = (pos[i + 1] - minY) / (maxY - minY);
    const outward = Math.max(0, nor[i] * pos[i] + nor[i + 2] * pos[i + 2]) / (Math.hypot(pos[i], pos[i + 2]) + 0.01);
    // Light from the low sun in the west-south-west: warm on that side, cooler and darker underneath.
    const sunSide = Math.max(0, -nor[i] * 0.8 + nor[i + 2] * 0.35);
    const k = 0.55 + 0.42 * up + 0.08 * outward + Math.max(0, nor[i + 1]) * 0.1;
    col.push(k * 1.08 + sunSide * 0.32, k * 1.06 + sunSide * 0.24, k * 0.88 + sunSide * 0.02);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return g;
}

export function trunkGeometry(B, kind) {
  const K = TREE_KINDS[kind];
  const bark = kind === 'bjork' ? 0xe8e4dc : 0x4f3c2c;
  B.add(new THREE.CylinderGeometry(kind === 'bjork' ? 0.15 : 0.22, kind === 'bjork' ? 0.2 : 0.32, K.trunkH + 1.2, 8), bark, m4(0, (K.trunkH + 1.2) / 2, 0));
  B.add(new THREE.CylinderGeometry(0.07, 0.11, 1.8, 6), bark, m4(0.45, K.trunkH + 0.4, 0.15).multiply(Rz(-0.55)));
  B.add(new THREE.CylinderGeometry(0.07, 0.1, 1.6, 6), bark, m4(-0.4, K.trunkH + 0.5, -0.2).multiply(Rz(0.5)));
  if (kind === 'bjork') for (let y = 0.6; y < K.trunkH; y += 0.45) B.add(new THREE.BoxGeometry(0.22, 0.05, 0.3), 0x2a2a2a, m4(0, y, 0));
  // Tree grate and a little soil.
  B.add(new THREE.BoxGeometry(1.4, 0.04, 1.4), 0x2c2f33, m4(0, 0.135, 0));
  B.add(new THREE.CylinderGeometry(0.42, 0.42, 0.045, 10), 0x3a2c22, m4(0, 0.14, 0));
}

// ---------- trees v2 (D-047): branches with leaf clusters and gaps ----------

// A tree built like a real one: a trunk that forks into a few main branches,
// each ending in two or three irregular leaf clusters. Light comes from the
// low west-south-west sun: clusters on that side are warm and bright, inner
// and lower ones darker. Returns { wood, leaves } geometries with colours.
export function treeV2(kind, seed) {
  const R = rng(seed * 97 + 13);
  const K = {
    lind: { h: 3.4, br: 5, reach: 2.4, rise: 2.4, cl: [0.85, 1.25], n: 2, leaf: [0.55, 1.2, 0.42], bark: 0x4a3a2c, w: 0.32 },
    lonn: { h: 3.0, br: 6, reach: 2.8, rise: 2.0, cl: [0.9, 1.3], n: 2, leaf: [0.5, 1.12, 0.38], bark: 0x3f3328, w: 0.34 },
    bjork: { h: 4.2, br: 5, reach: 1.6, rise: 2.8, cl: [0.65, 0.95], n: 2, leaf: [0.56, 1.2, 0.42], bark: 0xe6e1d6, w: 0.17 },
  }[kind];
  const wood = new Builder2();
  const leaves = new Builder2();
  // Trunk, slightly leaning.
  const lean = [(R() - 0.5) * 0.3, (R() - 0.5) * 0.3];
  const top = [lean[0], K.h, lean[1]];
  wood.tube([0, 0, 0], top, K.w, K.w * 0.75, K.bark, 7);
  if (kind === 'bjork') for (let y = 0.5; y < K.h; y += 0.42) wood.box(K.w * 2.1, 0.05, K.w * 2.1, 0x2a2a2a, lean[0] * (y / K.h), y, lean[1] * (y / K.h));
  const sun = new THREE.Vector3(-0.9, 0.35, 0.3).normalize();
  const clusters = [];
  for (let b = 0; b < K.br; b++) {
    const a = (b / K.br) * Math.PI * 2 + R() * 0.9;
    const reach = K.reach * (0.7 + R() * 0.5);
    const rise = K.rise * (0.7 + R() * 0.5);
    const start = [top[0], K.h - R() * 0.8, top[2]];
    const mid = [start[0] + Math.cos(a) * reach * 0.55, start[1] + rise * 0.55, start[2] + Math.sin(a) * reach * 0.55];
    const end = [start[0] + Math.cos(a) * reach, start[1] + rise, start[2] + Math.sin(a) * reach];
    wood.tube(start, mid, K.w * 0.55, K.w * 0.4, K.bark, 5);
    wood.tube(mid, end, K.w * 0.4, K.w * 0.22, K.bark, 4);
    for (let c = 0; c < K.n; c++) {
      const t = c === 0 ? 1 : 0.55 + R() * 0.35;
      const p = [start[0] + (end[0] - start[0]) * t + (R() - 0.5) * 0.6, start[1] + (end[1] - start[1]) * t + 0.3 + R() * 0.5, start[2] + (end[2] - start[2]) * t + (R() - 0.5) * 0.6];
      clusters.push([p, K.cl[0] + R() * (K.cl[1] - K.cl[0])]);
    }
  }
  // A crown top cluster or two.
  clusters.push([[top[0], K.h + K.rise + 0.6, top[2]], K.cl[1] * 1.05]);
  if (kind !== 'bjork') clusters.push([[top[0] + 0.5, K.h + K.rise * 0.7, top[2] - 0.6], K.cl[1]]);
  const cy = clusters.reduce((s, c) => s + c[0][1], 0) / clusters.length;
  const cx = clusters.reduce((s, c) => s + c[0][0], 0) / clusters.length;
  const cz = clusters.reduce((s, c) => s + c[0][2], 0) / clusters.length;
  const tmpN = new THREE.Vector3();
  for (const [p, r] of clusters) {
    const g = lumpCluster(r, Math.floor(R() * 1e6));
    const pos = g.attributes.position.array;
    const nor = g.attributes.normal.array;
    // Shade the crown as one soft shape: bend each normal towards the
    // direction from the crown centre (a common foliage trick), so the
    // clusters do not light up as separate faceted balls.
    g.setAttribute('mapNormal', new THREE.BufferAttribute(nor.slice(), 3));
    for (let i = 0; i < pos.length; i += 3) {
      tmpN.set(p[0] + pos[i] - cx, (p[1] + pos[i + 1] - cy) * 1.2, p[2] + pos[i + 2] - cz).normalize();
      tmpN.multiplyScalar(0.7).add(new THREE.Vector3(nor[i], nor[i + 1], nor[i + 2]).multiplyScalar(0.3)).normalize();
      nor[i] = tmpN.x;
      nor[i + 1] = tmpN.y;
      nor[i + 2] = tmpN.z;
    }
    const col = new Float32Array(pos.length);
    const tone = 0.9 + R() * 0.2;
    for (let i = 0; i < pos.length; i += 3) {
      const ndl = Math.max(0, nor[i] * sun.x + nor[i + 1] * sun.y + nor[i + 2] * sun.z);
      const height = (p[1] + pos[i + 1] - cy) / 3;
      const inner = Math.max(0, -(nor[i] * p[0] + nor[i + 2] * p[2])) * 0.08;
      // Bright crown top, clearly darker underside and inside.
      const up = nor[i + 1] * 0.5 + 0.5;
      const k = tone * (0.45 + 0.3 * up + 0.25 * Math.min(1, Math.max(0, height + 0.5)) - inner);
      // Leaf green, warmed towards gold where the evening sun hits.
      // The real sun already brightens the lit side; damp it there so lit
      // leaves stay yellow-green instead of burning out to gold.
      const damp = 1 - 0.4 * ndl;
      col[i] = K.leaf[0] * k * damp * 0.9;
      col[i + 1] = K.leaf[1] * k * damp;
      col[i + 2] = K.leaf[2] * k * damp;
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.translate(p[0], p[1], p[2]);
    leaves.addColoured(g);
  }
  return { wood: wood.build(), leaves: leaves.build() };
}

// An irregular, flattened leaf cluster (not a ball): a low-poly sphere pushed
// out in a few directions and squashed underneath.
function lumpCluster(r, seed) {
  const g = new THREE.IcosahedronGeometry(r, 1);
  const R = rng(seed);
  const p = g.attributes.position;
  const bumps = Array.from({ length: 5 }, () => [R() * 2 - 1, R() * 2 - 1, R() * 2 - 1, 0.1 + R() * 0.2]);
  for (let i = 0; i < p.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(p, i).normalize();
    let k = 0.82 + R() * 0.08;
    for (const [bx, by, bz, a] of bumps) k += a * Math.max(0, v.x * bx + v.y * by + v.z * bz) ** 2;
    v.multiplyScalar(r * k);
    v.y *= v.y < 0 ? 0.5 : 0.8;
    v.x *= 1.15;
    v.z *= 1.15;
    p.setXYZ(i, v.x, v.y, v.z);
  }
  const ng = g.toNonIndexed();
  ng.computeVertexNormals();
  smoothNormals(ng);
  g.dispose();
  return ng;
}

// Minimal builder for coloured pieces (trees), separate from geo.js so it can
// keep per-corner colours from the source geometry.
class Builder2 {
  constructor() {
    this.pos = [];
    this.nor = [];
    this.col = [];
    this.mapN = [];
  }
  addColoured(g) {
    const ng = g.index ? g.toNonIndexed() : g;
    this.pos.push(...ng.attributes.position.array);
    this.nor.push(...ng.attributes.normal.array);
    this.col.push(...ng.attributes.color.array);
    this.mapN.push(...(ng.attributes.mapNormal || ng.attributes.normal).array);
  }
  addSolid(g, color) {
    const ng = g.index ? g.toNonIndexed() : g;
    ng.computeVertexNormals();
    const c = new THREE.Color(color);
    const n = ng.attributes.position.count;
    const col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) col.set([c.r, c.g, c.b], i * 3);
    ng.setAttribute('color', new THREE.BufferAttribute(col, 3));
    this.addColoured(ng);
  }
  tube(a, b, r0, r1, color, seg) {
    const A = new THREE.Vector3(...a);
    const C = new THREE.Vector3(...b);
    const g = new THREE.CylinderGeometry(r1, r0, A.distanceTo(C), seg, 1, true);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), C.clone().sub(A).normalize());
    g.applyMatrix4(new THREE.Matrix4().compose(A.clone().add(C).multiplyScalar(0.5), q, new THREE.Vector3(1, 1, 1)));
    this.addSolid(g, color);
  }
  box(w, h, d, color, x, y, z) {
    const g = new THREE.BoxGeometry(w, h, d);
    g.translate(x, y, z);
    this.addSolid(g, color);
  }
  build() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.nor, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.col, 3));
    g.setAttribute('mapNormal', new THREE.Float32BufferAttribute(this.mapN, 3));
    return g;
  }
}
