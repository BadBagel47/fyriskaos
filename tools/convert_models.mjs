// Convert the fetched CC0 models (assets/cc0, see F-049) into small binary
// files for the game (D-048): models/trees.bin, models/people.bin and
// models/bikes.bin, plus the tree pictures in models/tex/.
// Usage: node tools/convert_models.mjs   (needs the dev dependency "three")
//
// File format (read by src/game3d/models.js): uint32 header length, a JSON
// header { models: { name: [ { mat, n, index, uv, wide } ] } }, padded to 4
// bytes, then per part: positions (Float32 x3), normals (Int8 x4; the fourth
// byte marks arms and legs of people, see rigCodes), colours
// (Uint8 x4), uvs (Float32 x2, if uv) and the index (Uint16, or Uint32 if wide).

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// The loaders expect a browser; these stubs are enough for parsing.
globalThis.self = globalThis;
globalThis.window = globalThis;
globalThis.document = { createElementNS: () => ({ style: {}, addEventListener() {}, removeEventListener() {} }) };
const THREE = await import('three');
const { FBXLoader } = await import('three/examples/jsm/loaders/FBXLoader.js');
const { OBJLoader } = await import('three/examples/jsm/loaders/OBJLoader.js');
const { mergeVertices } = await import('three/examples/jsm/utils/BufferGeometryUtils.js');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'assets/cc0/quaternius');
const OUT = path.join(ROOT, 'models');
fs.mkdirSync(OUT, { recursive: true });

const quiet = console.warn;
console.warn = () => {};

function loadFBX(file) {
  const buf = fs.readFileSync(path.join(SRC, file));
  return new FBXLoader().parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '');
}

// OBJ with the colours from its .mtl file (Kd).
function loadOBJ(file) {
  const obj = new OBJLoader().parse(fs.readFileSync(path.join(SRC, file), 'utf8'));
  const mtlFile = path.join(SRC, file.replace(/\.obj$/, '.mtl'));
  const kd = {};
  if (fs.existsSync(mtlFile)) {
    let cur = null;
    for (const line of fs.readFileSync(mtlFile, 'utf8').split('\n')) {
      const p = line.trim().split(/\s+/);
      if (p[0] === 'newmtl') cur = p[1];
      if (p[0] === 'Kd' && cur) kd[cur] = new THREE.Color().setRGB(+p[1], +p[2], +p[3], THREE.SRGBColorSpace);
    }
  }
  obj.traverse((m) => {
    if (!m.isMesh) return;
    for (const mat of Array.isArray(m.material) ? m.material : [m.material]) if (kd[mat.name]) mat.color.copy(kd[mat.name]);
  });
  return obj;
}

// Split a loaded object into parts by material kind, in model space.
// kindOf(material) -> part name; colourOf(material) -> THREE.Color.
function collect(obj, kindOf, colourOf = (m) => m.color) {
  obj.updateMatrixWorld(true);
  const parts = {};
  obj.traverse((mesh) => {
    if (!mesh.isMesh) return;
    let g = mesh.geometry.clone();
    g.applyMatrix4(mesh.matrixWorld);
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    const groups = g.groups.length ? g.groups : [{ start: 0, count: g.index ? g.index.count : g.attributes.position.count, materialIndex: 0 }];
    const idx = g.index ? g.index.array : null;
    for (const gr of groups) {
      const mat = mats[gr.materialIndex] || mats[0];
      const kind = kindOf(mat);
      if (!kind) continue;
      const col = colourOf(mat) || new THREE.Color(1, 1, 1);
      const P = (parts[kind] ||= { position: [], normal: [], color: [], uv: [] });
      for (let k = gr.start; k < gr.start + gr.count; k++) {
        const i = idx ? idx[k] : k;
        P.position.push(g.attributes.position.getX(i), g.attributes.position.getY(i), g.attributes.position.getZ(i));
        if (g.attributes.normal) P.normal.push(g.attributes.normal.getX(i), g.attributes.normal.getY(i), g.attributes.normal.getZ(i));
        P.color.push(col.r, col.g, col.b);
        if (g.attributes.uv) P.uv.push(g.attributes.uv.getX(i), g.attributes.uv.getY(i));
      }
    }
  });
  return parts;
}

// Scale to a height (or length along z), stand on y = 0, centre on x/z,
// optionally turn so the model's length runs along +x.
function normalise(parts, { height, length, turn = 0 }) {
  const box = new THREE.Box3();
  const v = new THREE.Vector3();
  for (const P of Object.values(parts)) for (let i = 0; i < P.position.length; i += 3) box.expandByPoint(v.set(P.position[i], P.position[i + 1], P.position[i + 2]));
  const size = box.getSize(new THREE.Vector3());
  const s = height ? height / size.y : length / Math.max(size.x, size.z);
  let cx = (box.min.x + box.max.x) / 2;
  let cz = (box.min.z + box.max.z) / 2;
  if (height) {
    // Trees and people stand on their base: centre on the lowest points (the trunk or the feet).
    let n = 0, sx = 0, sz = 0;
    const low = box.min.y + size.y * 0.06;
    for (const P of Object.values(parts))
      for (let i = 0; i < P.position.length; i += 3)
        if (P.position[i + 1] < low) {
          sx += P.position[i];
          sz += P.position[i + 2];
          n++;
        }
    if (n) {
      cx = sx / n;
      cz = sz / n;
    }
  }
  const c = Math.cos(turn);
  const sn = Math.sin(turn);
  for (const P of Object.values(parts)) {
    for (let i = 0; i < P.position.length; i += 3) {
      const x = (P.position[i] - cx) * s;
      const y = (P.position[i + 1] - box.min.y) * s;
      const z = (P.position[i + 2] - cz) * s;
      P.position[i] = c * x + sn * z;
      P.position[i + 1] = y;
      P.position[i + 2] = -sn * x + c * z;
    }
    for (let i = 0; i < P.normal.length; i += 3) {
      const x = P.normal[i];
      const z = P.normal[i + 2];
      P.normal[i] = c * x + sn * z;
      P.normal[i + 2] = -sn * x + c * z;
    }
  }
  return parts;
}

// Leaf cards light as one soft crown: bend their normals away from the
// crown's centre (a common foliage trick).
function softCrown(P, tint = [1, 1, 1]) {
  const n = P.position.length / 3;
  let cx = 0, cy = 0, cz = 0;
  for (let i = 0; i < P.position.length; i += 3) {
    cx += P.position[i];
    cy += P.position[i + 1];
    cz += P.position[i + 2];
  }
  cx /= n;
  cy /= n;
  cz /= n;
  const v = new THREE.Vector3();
  const o = new THREE.Vector3();
  for (let i = 0; i < P.position.length; i += 3) {
    v.set(P.position[i] - cx, (P.position[i + 1] - cy) * 1.3, P.position[i + 2] - cz).normalize();
    o.set(P.normal[i] || 0, P.normal[i + 1] || 1, P.normal[i + 2] || 0).normalize();
    v.multiplyScalar(0.75).addScaledVector(o, 0.25).normalize();
    P.normal[i] = v.x;
    P.normal[i + 1] = v.y;
    P.normal[i + 2] = v.z;
    // Darker inside and underneath, a little lighter on top.
    const k = 0.62 + 0.38 * Math.max(0, Math.min(1, (P.position[i + 1] - cy) / 3 + 0.5));
    P.color[i] *= k * tint[0];
    P.color[i + 1] *= k * tint[1];
    P.color[i + 2] *= k * tint[2];
  }
}

// Walking people (B-058): each vertex of a standing person is marked as part
// of an arm or a leg, so the game can swing the limbs in the vertex shader.
// The figure faces +x, up is y, its left and right are -z and +z. Stored in
// the normal's spare fourth byte: 0 body, ±1..60 leg (weight), ±64..124 arm;
// the sign is the side. Proportions below are of a figure 1.75 m tall.
const rigs = new Map(); // parts -> height
// The joints, as parts of the height; written into the file for the game.
const RIG = { hip: 0.5, knee: 0.27, shoulder: 0.79 };
function rigCodes(pos, index, H) {
  const n = pos.length / 3;
  // The figures are flat shaded: corners in the same place are separate
  // vertices. Weld them by place to follow the surface.
  const weld = new Int32Array(n);
  const at = new Map();
  for (let i = 0; i < n; i++) {
    const k = `${Math.round(pos[i * 3] * 2000)},${Math.round(pos[i * 3 + 1] * 2000)},${Math.round(pos[i * 3 + 2] * 2000)}`;
    if (!at.has(k)) at.set(k, at.size);
    weld[i] = at.get(k);
  }
  const m = at.size;
  const wpos = new Float32Array(m * 3);
  for (let i = 0; i < n; i++) wpos.set(pos.subarray(i * 3, i * 3 + 3), weld[i] * 3);
  const f = (i) => wpos[i * 3 + 1] / H;
  const az = (i) => (Math.abs(wpos[i * 3 + 2]) * 1.75) / H;
  const ramp = (a, b, v) => Math.max(0, Math.min(1, (v - a) / (b - a)));
  const next = Array.from({ length: m }, () => []);
  for (let t = 0; t < index.length; t += 3)
    for (let k = 0; k < 3; k++) next[weld[index[t + k]]].push(weld[index[t + (k + 1) % 3]], weld[index[t + (k + 2) % 3]]);
  // Arms: start from the upper arms (clearly outside the chest) and follow the
  // surface down to the fingertips. Below the armpit an arm hangs free, so the
  // fill never reaches the body, and the hands never mix with the thighs.
  const arm = new Uint8Array(m);
  const stack = [];
  for (let i = 0; i < m; i++)
    if (f(i) > 0.55 && f(i) < 0.7 && az(i) > 0.19) {
      arm[i] = 1;
      stack.push(i);
    }
  while (stack.length) {
    const i = stack.pop();
    for (const j of next[i])
      if (!arm[j] && f(j) < 0.7) {
        arm[j] = 1;
        stack.push(j);
      }
  }
  // Hands that are separate pieces: a piece that touches an arm goes with it.
  const piece = new Int32Array(m).fill(-1);
  const pieces = [];
  for (let i = 0; i < m; i++) {
    if (piece[i] >= 0) continue;
    const list = [i];
    piece[i] = pieces.length;
    for (let k = 0; k < list.length; k++) for (const j of next[list[k]]) if (piece[j] < 0) ((piece[j] = pieces.length), list.push(j));
    pieces.push(list);
  }
  const armList = [];
  for (let i = 0; i < m; i++) if (arm[i] && f(i) < 0.6) armList.push(i);
  const near = 0.03 * (H / 1.75);
  for (const list of pieces) {
    if (arm[list[0]] || list.length > m / 4) continue;
    const touches = list.some((i) => f(i) < 0.6 && armList.some((j) => Math.hypot(wpos[i * 3] - wpos[j * 3], wpos[i * 3 + 1] - wpos[j * 3 + 1], wpos[i * 3 + 2] - wpos[j * 3 + 2]) < near));
    if (touches) for (const i of list) arm[i] = 1;
  }
  const out = new Int8Array(n);
  for (let v = 0; v < n; v++) {
    const i = weld[v];
    const side = wpos[i * 3 + 2] < 0 ? -1 : 1;
    if (arm[i] || (f(i) >= 0.7 && f(i) < 0.81 && az(i) > 0.19)) out[v] = side * (64 + Math.round(60 * ramp(0.8, 0.73, f(i))));
    // Legs from the hip down; the shirt hem and the crotch line (z near 0) stay with the body.
    else if (f(i) < 0.5) out[v] = side * Math.round(60 * ramp(0.5, 0.43, f(i)) * ramp(0.004, 0.03, az(i)));
  }
  return out;
}

function writeModels(file, models) {
  const head = { models: {} };
  const chunks = [];
  for (const [name, parts] of Object.entries(models)) {
    head.models[name] = Object.entries(parts).map(([mat, P]) => {
      let g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(P.position, 3));
      if (P.normal.length === P.position.length) g.setAttribute('normal', new THREE.Float32BufferAttribute(P.normal, 3));
      else g.computeVertexNormals();
      g.setAttribute('color', new THREE.Float32BufferAttribute(P.color, 3));
      const hasUv = P.uv.length * 3 === P.position.length * 2;
      if (hasUv) g.setAttribute('uv', new THREE.Float32BufferAttribute(P.uv, 2));
      g = mergeVertices(g, 1e-4);
      const n = g.attributes.position.count;
      const idx = g.index.array;
      const wide = n > 65535;
      const pos = new Float32Array(g.attributes.position.array);
      const nor = new Int8Array(n * 4);
      const col = new Uint8Array(n * 4);
      for (let i = 0; i < n; i++) {
        for (let k = 0; k < 3; k++) {
          nor[i * 4 + k] = Math.round(Math.max(-1, Math.min(1, g.attributes.normal.array[i * 3 + k])) * 127);
          col[i * 4 + k] = Math.round(Math.max(0, Math.min(1, g.attributes.color.array[i * 3 + k])) * 255);
        }
        col[i * 4 + 3] = 255;
      }
      if (rigs.has(parts)) rigCodes(pos, idx, rigs.get(parts)).forEach((v, i) => (nor[i * 4 + 3] = v));
      chunks.push(Buffer.from(pos.buffer), Buffer.from(nor.buffer), Buffer.from(col.buffer));
      if (hasUv) chunks.push(Buffer.from(new Float32Array(g.attributes.uv.array).buffer));
      const ib = wide ? new Uint32Array(idx) : new Uint16Array(idx);
      const ibuf = Buffer.from(ib.buffer);
      chunks.push(ibuf, Buffer.alloc((4 - (ibuf.length % 4)) % 4));
      return rigs.has(parts) ? { mat, n, index: idx.length, uv: hasUv, wide, rig: { h: rigs.get(parts), ...RIG } } : { mat, n, index: idx.length, uv: hasUv, wide };
    });
  }
  const hb = Buffer.from(JSON.stringify(head));
  const pad = (4 - ((4 + hb.length) % 4)) % 4;
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32LE(hb.length, 0);
  const out = Buffer.concat([lenBuf, hb, Buffer.alloc(pad), ...chunks]);
  fs.writeFileSync(path.join(OUT, file), out);
  return out.length;
}

const report = [];

// ---------- trees ----------
const trees = {};
const stylised = (name, leaf, bark, height) => {
  const parts = collect(loadFBX(`stylizedtree/FBX/${name}.fbx`), (m) => (/leaves/i.test(m.name) ? leaf : bark), () => new THREE.Color(1, 1, 1));
  normalise(parts, { height });
  // The leaf pictures are light; under the orange evening sun they need to be greener and darker.
  if (parts[leaf]) softCrown(parts[leaf], leaf === 'leafA' ? [0.6, 0.78, 0.5] : [0.78, 0.9, 0.72]);
  return parts;
};
for (const [n, h] of [['Tree_1', 9], ['Tree_3', 10], ['Tree_5', 9.5], ['Tree_7', 10.5], ['Tree_9', 9]]) trees[n] = stylised(n, 'leafA', 'barkA', h);
for (const [n, h] of [['Birch_2', 11], ['Birch_6', 10]]) trees[n] = stylised(n, 'leafB', 'barkB', h);
for (const [n, h] of [['CommonTree_1', 9], ['CommonTree_3', 10]]) {
  const parts = collect(loadFBX(`ultimatenature/FBX/${n}.fbx`), (m) => (/wood|bark/i.test(m.name) ? 'wood' : 'leafV'), (m) => (/wood/i.test(m.name) ? new THREE.Color(0x4a3526) : /dark/i.test(m.name) ? new THREE.Color(0x3f6a2c) : new THREE.Color(0x5f8e3a)));
  normalise(parts, { height: h });
  if (parts.leafV) softCrown(parts.leafV);
  trees[n] = parts;
}
report.push(`trees.bin ${writeModels('trees.bin', trees)} bytes, ${Object.keys(trees).length} trees`);

// Tree pictures, smaller and as WebP is done by the Python step below (PIL);
// here they are only copied.
fs.mkdirSync(path.join(OUT, 'tex'), { recursive: true });
for (const [src, dst] of [['Tree_Leaves.png', 'leafA.png'], ['Birch_Leaves_Green.png', 'leafB.png'], ['Tree_Bark.jpg', 'barkA.jpg'], ['Birch_Bark.png', 'barkB.png']]) fs.copyFileSync(path.join(SRC, 'stylizedtree/Textures', src), path.join(OUT, 'tex', dst));

// ---------- bikes ----------
const bikes = {};
for (const n of ['Bicycle', 'SquareFrameBicycle']) {
  const obj = loadOBJ(`publictransport/OBJ/${n}.obj`);
  const parts = collect(obj, (m) => (/^bike$/i.test(m.name) ? 'paint' : 'vc'));
  normalise(parts, { length: 1.8, turn: -Math.PI / 2 });
  bikes[n] = parts;
}
report.push(`bikes.bin ${writeModels('bikes.bin', bikes)} bytes`);

// ---------- people ----------
const people = {};
const posed = path.join(SRC, 'backgroundposedhumans');
if (fs.existsSync(posed)) {
  const find = (re) => {
    const out = [];
    const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : re.test(e.name) && out.push(path.relative(SRC, path.join(d, e.name)))));
    walk(posed);
    return out;
  };
  // The player: a man in an orange jacket, standing and sitting on the bike.
  const hairFile = (sex) => find(new RegExp(`^${sex}_Hairstyle_1\\.obj$`))[0];
  const pose = (file, recolour) => {
    const parts = collect(loadOBJ(file), () => 'vc', (m) => recolour(m) || m.color);
    // Hair is a separate model in the same pose space; dark brown.
    const hf = hairFile(path.basename(file).split('_')[0]);
    if (hf) {
      const hair = collect(loadOBJ(hf), () => 'vc', () => new THREE.Color(0x3a2618));
      // Put the hair on the head: the head is the top few percent of the figure.
      const P = parts.vc.position;
      const H = hair.vc.position;
      let maxY = -1e9, minY = 1e9;
      for (let i = 1; i < P.length; i += 3) {
        maxY = Math.max(maxY, P[i]);
        minY = Math.min(minY, P[i]);
      }
      const top = maxY - (maxY - minY) * 0.06;
      let hx = 0, hz = 0, n = 0;
      for (let i = 0; i < P.length; i += 3)
        if (P[i + 1] > top) {
          hx += P[i];
          hz += P[i + 2];
          n++;
        }
      hx /= n;
      hz /= n;
      const hb = new THREE.Box3();
      const v = new THREE.Vector3();
      for (let i = 0; i < H.length; i += 3) hb.expandByPoint(v.set(H[i], H[i + 1], H[i + 2]));
      const dx = hx - (hb.min.x + hb.max.x) / 2;
      const dz = hz - (hb.min.z + hb.max.z) / 2;
      const dy = maxY + (maxY - minY) * 0.015 - hb.max.y;
      for (let i = 0; i < H.length; i += 3) {
        H[i] += dx;
        H[i + 1] += dy;
        H[i + 2] += dz;
      }
      for (const k of ['position', 'normal', 'color', 'uv']) parts.vc[k].push(...hair.vc[k]);
    }
    normalise(parts, { height: 1.85, turn: Math.PI / 2 });
    return parts;
  };
  const playerCol = (m) => (/shirt|jacket|top|body|cloth/i.test(m.name) ? new THREE.Color(0xf0a43a) : null);
  const files = find(/^(Male|Female)_(Standing|Walking|Running|Sitting)\.obj$/);
  const byName = Object.fromEntries(files.map((f) => [path.basename(f, '.obj'), f]));
  // Prefer the man; use the woman if one of his poses is missing.
  const sex = ['Male', 'Female'].find((x) => byName[`${x}_Standing`]);
  if (sex) {
    // Standing, with arms and legs marked so the game can swing them (B-058),
    // and sitting on the bike.
    people.player_stand = pose(byName[`${sex}_Standing`], playerCol);
    rigs.set(people.player_stand, 1.85);
    people.player_ride = pose(byName[`${sex}_Sitting`] || byName[`${sex}_Standing`], playerCol);
    report.push(`player: ${sex} poses`);
  }
  // Pedestrians (D-057): the shirt is its own part so each person can get a colour.
  const pedPose = (file) => {
    const parts = collect(loadOBJ(file), (m) => (/shirt|dress|top|tank/i.test(m.name) ? 'shirt' : 'vc'), (m) => (/shirt|dress|top|tank/i.test(m.name) ? new THREE.Color(1, 1, 1) : m.color));
    const hf = hairFile(path.basename(file).split('_')[0]);
    if (hf) {
      const hair = collect(loadOBJ(hf), () => 'vc', () => new THREE.Color(0x3a2618));
      const all = { vc: { position: [...parts.vc.position], normal: [], color: [], uv: [] } };
      const P = parts.vc.position;
      let maxY = -1e9, minY = 1e9;
      for (let i = 1; i < P.length; i += 3) {
        maxY = Math.max(maxY, P[i]);
        minY = Math.min(minY, P[i]);
      }
      const top = maxY - (maxY - minY) * 0.06;
      let hx = 0, hz = 0, n = 0;
      for (let i = 0; i < P.length; i += 3)
        if (P[i + 1] > top) {
          hx += P[i];
          hz += P[i + 2];
          n++;
        }
      const H = hair.vc.position;
      const hb = new THREE.Box3();
      const v = new THREE.Vector3();
      for (let i = 0; i < H.length; i += 3) hb.expandByPoint(v.set(H[i], H[i + 1], H[i + 2]));
      for (let i = 0; i < H.length; i += 3) {
        H[i] += hx / n - (hb.min.x + hb.max.x) / 2;
        H[i + 1] += maxY + (maxY - minY) * 0.015 - hb.max.y;
        H[i + 2] += hz / n - (hb.min.z + hb.max.z) / 2;
      }
      for (const k of ['position', 'normal', 'color', 'uv']) parts.vc[k].push(...hair.vc[k]);
      void all;
    }
    normalise(parts, { height: 1.75, turn: Math.PI / 2 });
    return parts;
  };
  // One standing figure each; the game swings the arms and legs (B-058).
  for (const sx of ['Male', 'Female'])
    if (byName[`${sx}_Standing`]) {
      const parts = pedPose(byName[`${sx}_Standing`]);
      rigs.set(parts, 1.75);
      people[`ped_${sx.toLowerCase()}`] = parts;
    }
}
if (Object.keys(people).length) report.push(`people.bin ${writeModels('people.bin', people)} bytes`);
else report.push('people: posed humans missing, skipped');

// List of the files, so the game only asks for what is there.
const files = ['trees.bin', 'bikes.bin', 'people.bin'].filter((f) => fs.existsSync(path.join(OUT, f)) && (f !== 'people.bin' || Object.keys(people).length));
fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify({ files }) + '\n');
console.warn = quiet;
console.log(report.join('\n'));
console.log('Now run: python3 tools/model_textures.py (tree pictures to WebP)');
