// The test block: a Luthagen-style street in Uppsala with four stone houses,
// a street with parking, bike lanes and sidewalks, a park strip, trees,
// lamps, benches, bins, bike racks, parked bikes and cars, and a moving car,
// cyclist and pedestrian. Built per style variant.

import * as THREE from '../../vendor/three/three.module.js';
import { Builder, m4 } from './geo.js';
import * as M from './models.js';

export const CAM_HEIGHT = 70; // metres above the street
export const VIEW_SHORT = 36; // metres visible across the screen's short side

function toonMaterial(v) {
  const data = new Uint8Array(v.steps.map((s) => Math.round(s * 255)));
  const grad = new THREE.DataTexture(data, v.steps.length, 1, THREE.RedFormat);
  grad.minFilter = grad.magFilter = THREE.NearestFilter;
  grad.needsUpdate = true;
  return new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: grad });
}

// Inverted-hull outline: the same shape, grown along its smooth normals and
// drawn from the inside in the outline colour, so only a thin rim shows.
function outlineMaterial(v) {
  const m = new THREE.MeshBasicMaterial({ color: v.outline.color, side: THREE.BackSide });
  const width = { value: v.outline.width };
  m.onBeforeCompile = (sh) => {
    sh.uniforms.outlineWidth = width;
    sh.vertexShader = 'attribute vec3 outlineNormal;\nuniform float outlineWidth;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed += outlineNormal * outlineWidth;');
  };
  return m;
}

function withOutline(group, mesh, outlineMat) {
  const hull = mesh.isInstancedMesh ? new THREE.InstancedMesh(mesh.geometry, outlineMat, mesh.count) : new THREE.Mesh(mesh.geometry, outlineMat);
  if (mesh.isInstancedMesh) hull.instanceMatrix = mesh.instanceMatrix;
  hull.matrixAutoUpdate = mesh.matrixAutoUpdate;
  hull.userData.isOutline = true;
  group.add(mesh, hull);
  return hull;
}

function instanced(group, geo, mat, outlineMat, items, colorize) {
  const mesh = new THREE.InstancedMesh(geo, mat, items.length);
  const c = new THREE.Color();
  items.forEach((it, i) => {
    mesh.setMatrixAt(i, m4(it.x, it.y || 0, it.z, it.rot || 0, it.s || 1, it.s || 1, it.s || 1));
    if (colorize) mesh.setColorAt(i, c.setScalar(it.tint || 1));
  });
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.frustumCulled = false;
  withOutline(group, mesh, outlineMat);
  return mesh;
}

export function buildScene(v) {
  const P = v.p;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(v.background);
  scene.fog = new THREE.Fog(v.background, CAM_HEIGHT * 1.08, CAM_HEIGHT * 1.45);
  const mat = toonMaterial(v);
  const outline = outlineMaterial(v);
  const world = new THREE.Group();
  scene.add(world);

  // ---------- ground (one mesh, no outline) ----------
  const G = new Builder();
  const flat = (x0, x1, z0, z1, color, y = 0) => G.box(x1 - x0, 0.1, z1 - z0, color, (x0 + x1) / 2, y - 0.05, (z0 + z1) / 2);
  flat(-30, 90, -45, 45, P.sidewalk, -0.01);
  flat(-30, 90, -50, -22.25, P.grass); // courtyard
  flat(26, 34, -50, -22.25, P.gravel, 0.005);
  flat(-30, 90, 26, 50, P.grass); // courtyards behind the south houses
  flat(-30, 90, -10.25, -7.25, P.sidewalk, 0.02); // north sidewalk
  flat(-30, 90, -7.25, -5.45, P.bike, 0.01); // north bike lane
  flat(-30, 90, -5.45, 3.25, P.road, 0.0); // parking strip + two lanes
  flat(-30, 90, 3.25, 5.05, P.bike, 0.01); // south bike lane
  flat(-30, 90, 5.05, 8.05, P.sidewalk, 0.02); // south sidewalk
  flat(-30, 90, 8.05, 14, P.grass, 0.01); // park strip
  flat(-30, 90, 10.4, 11.6, P.gravel, 0.015); // path in the park
  // Curbs.
  for (const z of [-7.25, -5.45, 3.25, 5.05]) G.box(120, 0.14, 0.22, P.curb, 30, 0.07, z);
  // Road paint: centre dashes, parking bays, zebra crossing and bike-lane edges.
  for (let x = -28; x < 88; x += 6) if (Math.abs(x + 1.5 - 30) > 4) G.box(3, 0.02, 0.14, P.lane, x + 1.5, 0.02, -1.1);
  for (let x = -28; x < 88; x += 6.5) G.box(0.12, 0.02, 2.0, P.lane, x, 0.02, -4.35);
  for (let z = -5.2; z < 3.1; z += 1.0) G.box(3.0, 0.025, 0.5, P.lane, 30, 0.02, z + 0.25);
  for (const z of [-6.35, 4.15]) for (let x = -28; x < 88; x += 12) G.box(0.9, 0.02, 0.08, P.lane, x, 0.03, z);
  // Tree pits on the south sidewalk.
  for (let x = 4; x < 60; x += 10) if (Math.abs(x - 30) > 3) G.box(1.4, 0.02, 1.4, P.metal, x, 0.035, 6.6);
  const groundMesh = new THREE.Mesh(G.build(), mat);
  groundMesh.receiveShadow = true;
  world.add(groundMesh);

  // ---------- the block: houses and parked vehicles, merged ----------
  const B = new Builder();
  const north = [
    { x: 9, w: 14, d: 12, floors: 4, facade: 0, roof: 0, roofType: 'gable', bay: true },
    { x: 23.1, w: 13, d: 12, floors: 5, facade: 3, roof: 1, roofType: 'mansard', bay: false },
    { x: 37.3, w: 15, d: 12, floors: 4, facade: 2, roof: 0, roofType: 'gable', bay: true },
    { x: 51.5, w: 13, d: 12, floors: 4, facade: 1, roof: 2, roofType: 'mansard', bay: false },
  ];
  // North houses face the street (+z); their fronts stand at z = -10.25.
  for (const h of north) M.addHouse(B, P, h, m4(h.x, 0, -10.25 - h.d / 2, 0));
  // South houses face north (turned half a turn), fronts at z = 14.
  const south = [
    { x: 12, w: 16, d: 12, floors: 4, facade: 4, roof: 0, roofType: 'gable', bay: true },
    { x: 30.3, w: 14, d: 12, floors: 4, facade: 5, roof: 2, roofType: 'gable', bay: false },
    { x: 47, w: 15, d: 12, floors: 5, facade: 0, roof: 1, roofType: 'mansard', bay: true },
  ];
  for (const h of south) M.addHouse(B, P, h, m4(h.x, 0, 14 + h.d / 2, Math.PI));
  // Parked cars in the parking strip, bikes in the rack and by a door.
  [[12, 0], [18.6, 2], [46, 4], [52.5, 1]].forEach(([x, c]) => M.addCar(B, P, P.cars[c], m4(x, 0, -4.35, 0)));
  [40.4, 41.2, 42.8].forEach((x, i) => M.addBike(B, P, P.bikes[i], m4(x, 0, -8.6, Math.PI / 2)));
  M.addBike(B, P, P.bikes[3], m4(21, 0, -9.7, 0.1));
  // A person waiting at the crossing.
  M.addPerson(B, P, 0x6a5acd, m4(27.2, 0, -8.0, -Math.PI / 2));
  const blockMesh = new THREE.Mesh(B.build(), mat);
  blockMesh.castShadow = true;
  blockMesh.receiveShadow = true;
  withOutline(world, blockMesh, outline);

  // ---------- repeated things, instanced ----------
  const trees = [];
  for (let x = 4; x < 60; x += 10) if (Math.abs(x - 30) > 3) trees.push({ x, z: 6.6, rot: x, s: 0.95 + ((x * 7) % 5) / 20, tint: 0.9 + ((x * 13) % 7) / 35 });
  for (const [x, z] of [[8, 10.8], [21, 12.5], [43, 9.6], [55, 12.2], [6, -27], [16, -25], [44, -27.5], [53, -25.5], [30, -28.5], [12, -35], [40, -36], [10, 31], [36, 32], [52, 30]]) trees.push({ x, z, rot: x + z, s: 1.05 + ((x * 3) % 4) / 10, tint: 0.88 + ((x * 11) % 7) / 30 });
  instanced(world, M.treeGeometry(P), mat, outline, trees, true);
  const lamps = [];
  for (const x of [6, 22, 38, 54]) lamps.push({ x, z: -9.9, rot: 0 });
  for (const x of [14, 46]) lamps.push({ x, z: 7.6, rot: Math.PI });
  instanced(world, M.lampGeometry(P), mat, outline, lamps);
  instanced(world, M.benchGeometry(P), mat, outline, [{ x: 12, z: 9.6, rot: Math.PI }, { x: 36, z: 9.6, rot: Math.PI }, { x: 26, z: -27, rot: 0 }]);
  instanced(world, M.binGeometry(P), mat, outline, [{ x: 14.2, z: 9.5 }, { x: 38.2, z: 9.5 }, { x: 33.5, z: -9.6 }]);
  instanced(world, M.rackGeometry(P), mat, outline, [40, 40.8, 41.6, 42.4, 43.2].map((x) => ({ x, z: -8.6 })));
  instanced(world, M.bollardGeometry(P), mat, outline, [{ x: 28.2, z: -7.6 }, { x: 31.8, z: -7.6 }, { x: 28.2, z: 5.4 }, { x: 31.8, z: 5.4 }]);

  // ---------- moving things ----------
  const actor = (build) => {
    const b = new Builder();
    build(b);
    const mesh = new THREE.Mesh(b.build(), mat);
    mesh.castShadow = true;
    const g = new THREE.Group();
    withOutline(g, mesh, outline);
    world.add(g);
    return g;
  };
  const car = actor((b) => M.addCar(b, P, P.cars[1], m4(0, 0, 0)));
  const cyclist = actor((b) => {
    M.addBike(b, P, P.bikes[0], m4(0, 0, 0));
    M.addPerson(b, P, 0x16a085, m4(-0.15, 0.55, 0, 0, 0.85, 0.85, 0.85));
  });
  const walker = actor((b) => M.addPerson(b, P, P.shirt, m4(0, 0, 0)));
  const update = (t) => {
    car.position.set(-12 + ((t * 9) % 84), 0, 1.6);
    cyclist.position.set(-10 + ((t * 4.5) % 80), 0, 4.15);
    const wx = 30 + Math.sin(t * 0.25) * 14;
    walker.position.set(wx, Math.abs(Math.sin(t * 6)) * 0.05, -8.9);
    walker.rotation.y = Math.cos(t * 0.25) > 0 ? 0 : Math.PI;
  };

  // ---------- light: sun from the north-west plus sky light ----------
  const sun = new THREE.DirectionalLight(v.sun.color, v.sun.intensity);
  sun.castShadow = true;
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.04;
  // Sun from the south-west, as in Uppsala; shadows fall to the north-east.
  const sunOffset = new THREE.Vector3(-32, 75, 42);
  scene.add(sun, sun.target);
  scene.add(new THREE.HemisphereLight(v.sky.color, v.sky.ground, v.sky.intensity));

  return { scene, world, sun, sunOffset, update, outlineMeshes: () => scene.children };
}
