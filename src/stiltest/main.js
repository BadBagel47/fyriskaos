// Style test page (D-043): camera, render loop, fps meter, automatic quality
// levels and the variant button. Not part of the game.

import * as THREE from '../../vendor/three/three.module.js';
import { VARIANTS } from './variants.js';
import { buildScene, CAM_HEIGHT, VIEW_SHORT } from './scene.js';
import { buildRich, upgradeTextures } from './rich.js';
import { GL_NONE, showGlMessage, watchContext, webglAvailable } from '../glcheck.js';

(globalThis.__times ||= []).push(['moduleStart', Math.round(performance.now())]);
const params = new URLSearchParams(location.search);
const still = params.has('still'); // fixed camera and time, for screenshots
// Tilted camera (fixed angle, D-045) is the default; ?vy=ovan starts straight down.
let view = params.get('vy') === 'ovan' ? 'ovan' : 'lutad';
const TILT = THREE.MathUtils.degToRad(33);
const $ = (id) => document.getElementById(id);

const QUALITY = {
  low: { name: 'Låg', ratio: 1, shadow: 0 },
  medium: { name: 'Medel', ratio: 1.5, shadow: 1024 },
  high: { name: 'Hög', ratio: 2, shadow: 2048 },
};
const ORDER = ['low', 'medium', 'high'];

// B-053: without WebGL there is nothing to draw; say so and stop here.
if (!webglAvailable()) {
  showGlMessage(GL_NONE);
  throw new Error('WebGL 2 is not available');
}
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
let glLost = false;
watchContext(renderer.domElement, () => {
  glLost = true;
  $('fps').hidden = true;
});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.localClippingEnabled = true;
$('view').appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(20, 1, 10, 200);

// Mode 0 is the richer evening look (D-044); 1-3 are the cartoon variants from D-043.
const MODES = [{ id: 'sommarkvall', name: 'Sommarkväll+ (D-044)', note: 'Texturer, rundade bilar med glans, täta träd, låg kvällssol med långa skuggor och lampor som lyser upp marken.' }, ...VARIANTS];
let variantIndex = Math.max(0, MODES.findIndex((v) => v.id === params.get('variant')));
let cam = { height: CAM_HEIGHT, viewShort: VIEW_SHORT, center: new THREE.Vector3(30, 0, -4), rotatePortrait: false };
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

let building = false;
async function setVariant(i) {
  if (building) return;
  building = true;
  variantIndex = (i + MODES.length) % MODES.length;
  const mode = MODES[variantIndex];
  if (built) built.scene.traverse((o) => o.geometry && o.geometry.dispose());
  if (mode.id === 'sommarkvall') {
    built = await buildRich(renderer);
    cam = { height: built.camera.height, viewShort: built.camera.viewShort, center: built.camera.center, tiltCenter: built.camera.tiltCenter, tiltDistance: built.camera.tiltDistance, tiltViewShort: built.camera.tiltViewShort, rotatePortrait: true };
    renderer.toneMapping = built.toneMapping;
    renderer.toneMappingExposure = built.exposure;
  } else {
    built = buildScene(mode);
    cam = { height: CAM_HEIGHT, viewShort: VIEW_SHORT, center: new THREE.Vector3(30, 0, -4), rotatePortrait: false };
    renderer.toneMapping = THREE.NoToneMapping;
  }
  camera.near = cam.height * 0.3;
  camera.far = cam.height * 2.2;
  renderer.shadowMap.enabled = !renderer.shadowMap.enabled; // force applyQuality to refresh materials
  applyQuality();
  $('variant').textContent = mode.name;
  $('note').textContent = mode.note;
  document.body.dataset.mode = mode.id;
  building = false;
}

// Sun shadows only near the camera: a box just larger than what is on screen.
function fitShadowBox() {
  if (!built) return;
  const long = cam.viewShort * Math.max(camera.aspect, 1 / camera.aspect);
  // The tilted view sees further towards the top of the screen.
  const half = (view === 'lutad' && cam.rotatePortrait ? long * 0.75 : long / 2) + 10;
  const sc = built.sun.shadow.camera;
  sc.left = -half;
  sc.right = half;
  sc.top = half;
  sc.bottom = -half;
  sc.near = 1;
  sc.far = 260;
  sc.updateProjectionMatrix();
}

function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  // The short side of the screen always shows the same metres of street.
  const tiltOn = view === 'lutad' && cam.rotatePortrait;
  const dist = tiltOn ? cam.tiltDistance : cam.height;
  // In portrait the tilted view is zoomed in a little, so the street fills the screen.
  const short = tiltOn ? (w < h ? cam.tiltViewShort * 0.72 : cam.tiltViewShort) : cam.viewShort;
  const half = Math.atan(short / 2 / dist);
  camera.fov = THREE.MathUtils.radToDeg(w >= h ? 2 * half : 2 * Math.atan(Math.tan(half) / camera.aspect));
  // Near, far and fog follow the camera distance (the tilted camera is further away, B-050).
  camera.near = Math.max(cam.height, dist) * 0.3;
  camera.far = Math.max(cam.height, dist) * 2.2;
  if (built && built.scene.fog && cam.rotatePortrait) {
    built.scene.fog.near = Math.max(cam.height, dist) * 1.15;
    built.scene.fog.far = Math.max(cam.height, dist) * 1.6;
  }
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
  if (glLost) return;
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  clock += dt;
  if (!still) t += dt;
  built.update(still ? 3 : t);
  const tilted = view === 'lutad' && cam.rotatePortrait;
  if (built.setNearFade && built.nearFade !== tilted) {
    built.setNearFade(tilted, TILT);
    built.nearFade = tilted;
  }
  // In portrait the tilted view looks a little further north, at the facades.
  const c = tilted ? (camera.aspect < 1 ? cam.tiltCenter.clone().setZ(cam.tiltCenter.z - 1) : cam.tiltCenter) : cam.center;
  const portrait = camera.aspect < 1;
  const tx = panning ? c.x + Math.sin(t * 0.15) * 9 : c.x;
  const tz = c.z;
  if (view === 'lutad' && cam.rotatePortrait) {
    // Fixed tilt from the south, about 35° from vertical, north up.
    camera.position.set(tx, cam.tiltDistance * Math.cos(TILT), tz + cam.tiltDistance * Math.sin(TILT));
    camera.up.set(0, 1, 0);
    camera.lookAt(tx, 0, tz);
  } else {
    camera.position.set(tx, cam.height, tz);
    // North up; in portrait the richer scene turns so the street runs up the screen.
    if (portrait && cam.rotatePortrait) camera.up.set(1, 0, 0);
    else camera.up.set(0, 0, -1);
    camera.lookAt(tx, 0, tz);
  }
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
window.addEventListener('resize', () => fitShadowBox());
$('btn-quality').addEventListener('click', () => {
  const modes = ['auto', ...ORDER];
  qualityMode = modes[(modes.indexOf(qualityMode) + 1) % modes.length];
  if (qualityMode !== 'auto') level = qualityMode;
  $('btn-quality').textContent = `Kvalitet: ${qualityMode === 'auto' ? 'auto' : QUALITY[level].name}`;
  applyQuality();
});
const viewLabel = () => ($('btn-view').textContent = view === 'lutad' ? 'Vy: lutad' : 'Vy: rakt ovanifrån');
$('btn-view').addEventListener('click', () => {
  view = view === 'lutad' ? 'ovan' : 'lutad';
  viewLabel();
  resize();
});
viewLabel();
$('btn-pan').addEventListener('click', () => {
  panning = !panning;
  $('btn-pan').textContent = panning ? 'Kamera: rör sig' : 'Kamera: still';
});
$('btn-pan').textContent = panning ? 'Kamera: rör sig' : 'Kamera: still';

const t0 = performance.now();
(globalThis.__times ||= []).push(['t0', Math.round(t0)]);
setVariant(variantIndex).then(() => {
  requestAnimationFrame((now) => {
    last = now;
    frame(now);
    window.__stiltest.firstFrameMs = performance.now() - t0;
    // Time from the start of the page load to the first picture, as the browser measures it.
    window.__stiltest.startMs = performance.now();
    (globalThis.__times ||= []).push(['firstFrame', Math.round(performance.now() - t0)]);
    // Full-size pictures after the first frames.
    setTimeout(() => upgradeTextures().then(() => (window.__stiltest.fullMs = performance.now())), 300);
  });
});

// Read-only handle for the automatic tests and measurements.
window.__stiltest = {
  renderer,
  get glLost() {
    return glLost;
  },
  get scene() {
    return built && built.scene;
  },
  get level() {
    return level;
  },
  get fps() {
    return fps;
  },
  samples,
  cpu,
  setVariant,
  get view() {
    return view;
  },
  get variant() {
    return MODES[variantIndex].id;
  },
};
