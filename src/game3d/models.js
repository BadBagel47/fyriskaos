// Models for the 3D game (D-048). CC0 models converted by
// tools/convert_models.mjs live in models/ as small binary files; when they
// are missing, the code-built shapes from the style test are used instead.

import * as THREE from '../../vendor/three/three.module.js';
import { Builder, m4 } from '../stiltest/geo.js';
import * as P3 from '../stiltest/props3.js';
import { rigGeometry, walkMaterial, walkDepthMaterial } from './walk.js';

const PLAYER = { jacket: 0xf0a43a, pants: 0x2f3440, skin: 0, hair: 1, scale: 1.1 };

// Loaded model sets: name -> list of { geo, material kind }.
const loaded = new Map();

// The player's step (B-058): phase and amount, set each frame by entities.js.
export const playerWalk = { value: new THREE.Vector2() };

export const people = {
  // [walking, riding]
  player(mats) {
    const set = loaded.get('player');
    if (set) return set.map((parts) => meshOf(parts, mats));
    const B = new Builder();
    P3.addPerson(B, m4(0, 0, 0), { ...PLAYER, walk: 0 });
    const geo = B.build({ outline: false });
    return [new THREE.Mesh(geo, mats.solid), new THREE.Mesh(geo, mats.solid)];
  },
};

function meshOf(parts, mats) {
  const g = new THREE.Group();
  for (const p of parts) {
    const base = mats[p.mat] || mats.solid;
    const m = new THREE.Mesh(p.geo, p.rig ? walkMaterial(base, p.rig, playerWalk) : base);
    if (p.rig) m.customDepthMaterial = walkDepthMaterial(p.rig, playerWalk);
    m.castShadow = true;
    g.add(m);
  }
  return g;
}

// Binary model file written by tools/convert_models.mjs (see the format there).
export async function loadModelFile(url) {
  const res = await fetch(url);
  if (!res.ok) return null;
  const buf = await res.arrayBuffer();
  const hl = new DataView(buf).getUint32(0, true);
  const head = JSON.parse(new TextDecoder().decode(new Uint8Array(buf, 4, hl)));
  let off = (4 + hl + 3) & ~3;
  const take = (Type, count) => {
    const a = new Type(buf, off, count);
    off += a.byteLength;
    off = (off + 3) & ~3;
    return a;
  };
  const models = {};
  for (const [name, partsHead] of Object.entries(head.models)) {
    models[name] = partsHead.map((ph) => {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(take(Float32Array, ph.n * 3), 3));
      g.setAttribute('normal', new THREE.BufferAttribute(take(Int8Array, ph.n * 4), 4, true));
      g.setAttribute('color', new THREE.BufferAttribute(take(Uint8Array, ph.n * 4), 4, true));
      if (ph.uv) g.setAttribute('uv', new THREE.BufferAttribute(take(Float32Array, ph.n * 2), 2));
      g.setIndex(new THREE.BufferAttribute(take(ph.wide ? Uint32Array : Uint16Array, ph.index), 1));
      g.computeBoundingSphere();
      // People with marked arms and legs walk in the vertex shader (B-058).
      if (ph.rig) rigGeometry(g);
      return ph.rig ? { geo: g, mat: ph.mat, rig: ph.rig } : { geo: g, mat: ph.mat };
    });
  }
  return models;
}

export function setLoaded(name, value) {
  loaded.set(name, value);
}

export function getLoaded(name) {
  return loaded.get(name);
}
