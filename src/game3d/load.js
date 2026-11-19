// Load the converted CC0 models (D-048) before the city is built. Missing
// files are fine: the code-built shapes are used instead.

import * as THREE from '../../vendor/three/three.module.js';
import { loadModelFile, setLoaded } from './models.js';
import { setTreeModels } from './trees.js';

const URL_OF = (n) => new URL(`models/${n}`, document.baseURI).href;

export async function loadModels() {
  let files = [];
  try {
    const res = await fetch(URL_OF('index.json'));
    if (res.ok) files = (await res.json()).files || [];
  } catch {
    files = [];
  }
  const get = (f) => (files.includes(f) ? loadModelFile(URL_OF(f)).catch(() => null) : null);
  const [trees, bikes, people] = await Promise.all([get('trees.bin'), get('bikes.bin'), get('people.bin')]);
  if (trees) setTreeModels(trees);
  if (bikes) setLoaded('bikes', bikes);
  if (people) {
    for (const [n, parts] of Object.entries(people)) if (n.startsWith('ped_')) setLoaded(n, parts);
    // The player: walking (arms and legs swing, B-058) and riding.
    if (people.player_stand && people.player_ride) setLoaded('player', [people.player_stand, people.player_ride]);
  }
}

// Pictures for the CC0 trees (leaf clusters with see-through gaps, bark).
export async function treeTextures(loadTexture) {
  const out = {};
  await Promise.all(
    ['leafA', 'leafB', 'barkA', 'barkB'].map(async (n) => {
      const t = await loadTexture(URL_OF(`tex/${n}.webp`));
      if (t) {
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        out[n] = t;
      }
    }),
  );
  return out;
}
