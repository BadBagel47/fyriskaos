// Tree shapes for the game (F-042, D-048). Each shape is a list of
// [geometry, material] parts drawn with instancing. The CC0 tree models are
// used when they are in the repo (models/trees.bin); otherwise the
// code-built trees from the style test.

import { treeV2 } from '../stiltest/props3.js';

let shapes = null;
let models = null;

export function setTreeModels(m) {
  models = m;
  shapes = null;
}

export function treeKinds() {
  if (shapes) return shapes;
  shapes = [];
  if (models) {
    for (const [name, parts] of Object.entries(models))
      shapes.push({ kind: name, parts: (mats) => parts.map((p) => [p.geo, mats[p.mat] || mats.leaf]) });
    if (shapes.length) return shapes;
  }
  let seed = 11;
  for (const kind of ['lind', 'lonn', 'bjork'])
    for (let v = 0; v < 2; v++) {
      const g = treeV2(kind, seed++);
      shapes.push({ kind, parts: (mats) => [[g.wood, mats.wood], [g.leaves, mats.leaf]] });
    }
  return shapes;
}
