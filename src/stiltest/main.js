// Style test page (D-043): camera, render loop, fps meter, automatic quality
// levels and the variant button. Not part of the game.

import * as THREE from '../../vendor/three/three.module.js';
import { VARIANTS } from './variants.js';
import { buildScene, CAM_HEIGHT, VIEW_SHORT } from './scene.js';

const params = new URLSearchParams(location.search);
const still = params.has('still'); // fixed camera and time, for screenshots
const $ = (id) => document.getElementById(id);

const QUALITY = {
  low: { name: 'Låg', ratio: 1, shadow: 0 },
  medium: { name: 'Medel', ratio: 1.5, shadow: 1024 },
  high: { name: 'Hög', ratio: 2, shadow: 2048 },
};
const ORDER = ['low', 'medium', 'high'];

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.type = THREE.PCFShadowMap;
$('view').appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(20, 1, CAM_HEIGHT * 0.6, CAM_HEIGHT * 1.4);
camera.up.set(0, 0, -1); // north is up on the screen

let variantIndex = Math.max(0, VARIANTS.findIndex((v) => v.id === params.get('variant')));
let built = null;
let qualityMode = params.get('q') || 'auto'; // auto or a fixed level
let level = ORDER.includes(qualityMode) ? qualityMode : matchMedia('(pointer: coarse)').matches ? 'medium' : 'high';

function applyQuality() {
  const q = QUALITY[level];
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, q.ratio));
  const shadows = q.shadow > 0;
  if (renderer.shadowMap.enabled !== shadows) {
    renderer.shadowMap.enabled = shadows;
    built?.scene.traverse((o) => o.material && (o.material.needsUpdate = true));
  }
  if (built && shadows) {
    built.sun.shadow.mapSize.set(q.shadow, q.shadow);
    built.sun.shadow.map?.dispose();
    built.sun.shadow.map = null;
  }
  resize();
}

function setVariant(i) {
  variantIndex = (i + VARIANTS.length) % VARIANTS.length;
  if (built) built.scene.traverse((o) => o.geometry && o.geometry.dispose());
  built = buildScene(VARIANTS[variantIndex]);
  fitShadowBox();
  renderer.shadowMap.enabled = !renderer.shadowMap.enabled; // force applyQuality to refresh materials
  applyQuality();
  $('variant').textContent = VARIANTS[variantIndex].name;
  $('note').textContent = VARIANTS[variantIndex].note;
}

// Sun shadows only near the camera: a box just larger than what is on screen.
function fitShadowBox() {
  if (!built) return;
  const long = VIEW_SHORT * Math.max(camera.aspect, 1 / camera.aspect);
  const half = long / 2 + 10;
  const sc = built.sun.shadow.camera;
  sc.left = -half;
  sc.right = half;
  sc.top = half;
  sc.bottom = -half;
  sc.near = 10;
  sc.far = 220;
  sc.updateProjectionMatrix();
}

function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  // The short side of the screen always shows VIEW_SHORT metres of street.
  const half = Math.atan(VIEW_SHORT / 2 / CAM_HEIGHT);
  camera.fov = THREE.MathUtils.radToDeg(w >= h ? 2 * half : 2 * Math.atan(Math.tan(half) / camera.aspect));
  camera.updateProjectionMatrix();
  fitShadowBox();
}
window.addEventListener('resize', resize);

// ---------- fps meter and automatic quality ----------
let frames = 0;
let acc = 0;
let fps = 60;
let slowFor = 0;
let fastFor = 0;
let lastDrop = -99;
let clock = 0;
const samples = [];
const cpu = [];

function judge(dt) {
  frames++;
  acc += dt;
  if (acc < 0.5) return;
  fps = frames / acc;
  samples.push(fps);
  if (samples.length > 240) samples.shift();
  frames = 0;
  acc = 0;
  if (qualityMode !== 'auto' || clock < 1.5) return;
  // Below 50 fps for a second: step down. Steady 59+ for 8 s, and no drop in
  // the last 20 s: step up again.
  if (fps < 50) {
    slowFor += 0.5;
    fastFor = 0;
  } else if (fps >= 59) {
    fastFor += 0.5;
    slowFor = 0;
  } else {
    slowFor = 0;
    fastFor = 0;
  }
  const i = ORDER.indexOf(level);
  if (slowFor >= 1 && i > 0) {
    level = ORDER[i - 1];
    lastDrop = clock;
    slowFor = 0;
    applyQuality();
  } else if (fastFor >= 8 && i < ORDER.length - 1 && clock - lastDrop > 20) {
    level = ORDER[i + 1];
    fastFor = 0;
    applyQuality();
  }
}

function meter() {
  const info = renderer.info.render;
  $('fps').textContent = `${fps.toFixed(0)} fps · ${QUALITY[level].name}${qualityMode === 'auto' ? ' (auto)' : ''} · ${info.calls} anrop · ${(info.triangles / 1000).toFixed(0)}k trianglar`;
  $('fps').className = fps >= 55 ? 'good' : fps >= 30 ? 'ok' : 'bad';
}

// ---------- loop ----------
let last = performance.now();
let t = 0;
let panning = !still;
function frame(now) {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  clock += dt;
  if (!still) t += dt;
  built.update(still ? 3 : t);
  const tx = panning ? 30 + Math.sin(t * 0.15) * 9 : 30;
  const tz = 1;
  camera.position.set(tx, CAM_HEIGHT, tz);
  camera.lookAt(tx, 0, tz);
  // Keep the sun's shadow box around the camera, snapped to whole metres so shadows do not shimmer.
  const sx = Math.round(tx);
  built.sun.target.position.set(sx, 0, tz);
  built.sun.position.set(sx + built.sunOffset.x, built.sunOffset.y, tz + built.sunOffset.z);
  const r0 = performance.now();
  renderer.render(built.scene, camera);
  cpu.push(performance.now() - r0 + (r0 - now > 0 ? 0 : 0));
  if (cpu.length > 600) cpu.shift();
  judge(dt);
  if (frames === 0) meter();
  requestAnimationFrame(frame);
}

$('btn-variant').addEventListener('click', () => setVariant(variantIndex + 1));
$('btn-quality').addEventListener('click', () => {
  const modes = ['auto', ...ORDER];
  qualityMode = modes[(modes.indexOf(qualityMode) + 1) % modes.length];
  if (qualityMode !== 'auto') level = qualityMode;
  $('btn-quality').textContent = `Kvalitet: ${qualityMode === 'auto' ? 'auto' : QUALITY[level].name}`;
  applyQuality();
});
$('btn-pan').addEventListener('click', () => {
  panning = !panning;
  $('btn-pan').textContent = panning ? 'Kamera: rör sig' : 'Kamera: still';
});
$('btn-pan').textContent = panning ? 'Kamera: rör sig' : 'Kamera: still';

setVariant(variantIndex);
const t0 = performance.now();
requestAnimationFrame((now) => {
  last = now;
  frame(now);
  window.__stiltest.firstFrameMs = performance.now() - t0;
});

// Read-only handle for the automatic tests and measurements.
window.__stiltest = {
  renderer,
  get level() {
    return level;
  },
  get fps() {
    return fps;
  },
  samples,
  cpu,
  setVariant,
  get variant() {
    return VARIANTS[variantIndex].id;
  },
};
