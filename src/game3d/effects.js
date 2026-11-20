// Light effects on top of the city (F-059 to F-062), after a quick Three.js
// demo of a quay at dusk that looked far better than its geometry thanks to
// light and effects:
//   - glow (bloom): only strong light sources (lamps, car lights, lit windows,
//     blue lights) are above the threshold in linear HDR and glow;
//   - an environment map made from a sky with a low sun, so car paint, glass
//     and water reflect the evening sky;
//   - Fyrisån as a mirror (High only, and only while the river is on screen).

import * as THREE from '../../vendor/three/three.module.js';
import { EffectComposer } from '../../vendor/three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from '../../vendor/three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from '../../vendor/three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from '../../vendor/three/addons/postprocessing/OutputPass.js';
import { Sky } from '../../vendor/three/addons/objects/Sky.js';
import { Water } from '../../vendor/three/addons/objects/Water.js';

// The threshold is in linear HDR. The game's sun is strong: sunlit walls
// reach 1–2, so the threshold is 2.6 and the light sources are set in the
// same proportion to it as in the demo (lamps about 8×, windows about 2×).
export const BLOOM = { strength: 0.5, radius: 0.45, threshold: 2.6 };

// ---------- glow ----------

// Render pass, bloom and the output pass (tone mapping and sRGB). `scale` is
// the bloom's resolution as a part of the screen's (Medium: half).
export function createPost(renderer, scene, camera) {
  const target = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
  const composer = new EffectComposer(renderer, target);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), BLOOM.strength, BLOOM.radius, BLOOM.threshold);
  let scale = 1;
  const setBloomSize = bloom.setSize.bind(bloom);
  bloom.setSize = (w, h) => setBloomSize(Math.max(1, Math.round(w * scale)), Math.max(1, Math.round(h * scale)));
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  let on = true;
  return {
    composer,
    bloom,
    // on: draw through the composer at all; s: bloom resolution.
    set(enabled, s) {
      on = enabled;
      scale = s;
    },
    get on() {
      return on;
    },
    setSize(w, h, ratio) {
      composer.setPixelRatio(ratio);
      composer.setSize(w, h);
    },
    render(dt) {
      if (on) composer.render(dt);
      else renderer.render(scene, camera);
    },
  };
}

// ---------- sky as the environment ----------

// The sky with the sun at `elev` degrees over the horizon and `az` degrees
// (0 = north, 90 = east, 180 = south, 270 = west), over dark ground, made into
// an environment map. Made again only when the sun has moved a step.
export function createSkyEnv(renderer) {
  const pm = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  const sky = new Sky();
  sky.scale.setScalar(50);
  envScene.add(sky);
  const u = sky.material.uniforms;
  u.turbidity.value = 6;
  u.rayleigh.value = 1.6;
  u.mieCoefficient.value = 0.006;
  u.mieDirectionalG.value = 0.86;
  // The ground under the horizon: dim, warm (streets and roofs).
  const ground = new THREE.Mesh(new THREE.CircleGeometry(60, 24).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x3a332c }));
  ground.position.y = -1.5;
  envScene.add(ground);
  // To measure the sky's average light: a tiny cube of it, read back.
  const probe = new THREE.WebGLCubeRenderTarget(8, { type: THREE.FloatType });
  const cubeCam = new THREE.CubeCamera(0.1, 200, probe);
  const px = new Float32Array(8 * 8 * 4);
  const average = () => {
    cubeCam.update(renderer, envScene);
    let sum = 0;
    for (let f = 0; f < 6; f++) {
      renderer.readRenderTargetPixels(probe, 0, 0, 8, 8, px, f);
      for (let i = 0; i < px.length; i += 4) sum += 0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2];
    }
    return sum / 384 || 1;
  };
  let current = null;
  let key = '';
  let level = 1;
  return {
    get texture() {
      return current;
    },
    // The map's average light (linear); the sky model is far brighter with a
    // high sun, so the game scales the map to a fixed level.
    get level() {
      return level;
    },
    // Returns true when a new map was made.
    update(elev, az, dusk) {
      const k = `${elev.toFixed(1)}:${az.toFixed(0)}:${dusk.toFixed(2)}`;
      if (k === key) return false;
      key = k;
      const phi = THREE.MathUtils.degToRad(90 - elev);
      const theta = THREE.MathUtils.degToRad(az);
      // Three's spherical coordinates: theta from +z towards +x; north is -z.
      u.sunPosition.value.setFromSphericalCoords(1, phi, Math.PI - theta);
      // Later in the evening the sky is darker and redder.
      u.rayleigh.value = 1.6 + 1.4 * dusk;
      u.turbidity.value = 6 + 4 * dusk;
      ground.material.color.setHex(0x3a332c).multiplyScalar(1 - 0.5 * dusk);
      const tone = renderer.toneMapping;
      renderer.toneMapping = THREE.NoToneMapping;
      level = average();
      renderer.toneMapping = tone;
      const rt = pm.fromScene(envScene, 0.02, 0.1, 200);
      if (current) current.dispose();
      current = rt.texture;
      return true;
    },
  };
}

// ---------- Fyrisån as a mirror ----------

// Normals for the water, made in code from a few sine waves (tiles seamlessly).
function waterNormals(size = 128) {
  const data = new Uint8Array(size * size * 4);
  const waves = [
    [1, 2, 0.6, 0.3],
    [3, -1, 0.35, 1.7],
    [-2, 5, 0.22, 4.1],
    [6, 3, 0.12, 2.2],
    [-7, -4, 0.08, 0.9],
  ];
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      let dx = 0;
      let dy = 0;
      for (const [kx, ky, a, ph] of waves) {
        const t = ((kx * x + ky * y) / size) * Math.PI * 2 + ph;
        const c = Math.cos(t) * a;
        dx += c * kx * 0.05;
        dy += c * ky * 0.05;
      }
      const l = Math.hypot(dx, dy, 1);
      const i = (y * size + x) * 4;
      data[i] = Math.round((-dx / l) * 127.5 + 127.5);
      data[i + 1] = Math.round((-dy / l) * 127.5 + 127.5);
      data[i + 2] = Math.round((1 / l) * 127.5 + 127.5);
      data[i + 3] = 255;
    }
  const t = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.magFilter = THREE.LinearFilter;
  t.needsUpdate = true;
  return t;
}

// The mirror covers the river's extent only (the land hides the rest).
// `plain` is the simple water (it reflects only the environment map).
export function createRiver(map, plain, sunDir, skyTexture) {
  const W = map.cells ? map.G.water : -1;
  // Where the river is, in 16 m squares, to know when it is on screen.
  const S = 16;
  const gw = Math.ceil(map.width / S);
  const gh = Math.ceil(map.height / S);
  const has = new Uint8Array(gw * gh);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  if (map.cells)
    for (let y = 0; y < map.height; y += 2)
      for (let x = 0; x < map.width; x += 2)
        if (map.cells[y * map.width + x] === W) {
          has[Math.floor(y / S) * gw + Math.floor(x / S)] = 1;
          x0 = Math.min(x0, x);
          y0 = Math.min(y0, y);
          x1 = Math.max(x1, x);
          y1 = Math.max(y1, y);
        }
  let mirror = null;
  const make = () => {
    if (mirror || x1 < x0) return mirror;
    const w = x1 - x0 + 20;
    const h = y1 - y0 + 20;
    mirror = new Water(new THREE.PlaneGeometry(w, h), {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals(),
      sunDirection: sunDir.clone(),
      sunColor: 0xffb070,
      waterColor: 0x2a5266,
      distortionScale: 0.9,
      fog: true,
    });
    mirror.rotation.x = -Math.PI / 2;
    mirror.position.set((x0 + x1) / 2, plain.position.y + 0.01, (y0 + y1) / 2);
    mirror.material.uniforms.size.value = 6;
    mirror.visible = false;
    // The mirror sees the sky (the main view never does; it keeps the haze colour).
    // The mirror is drawn again every other frame only (half the cost; the
    // waves hide the lag).
    const render = mirror.onBeforeRender;
    let odd = false;
    mirror.onBeforeRender = (renderer, scene, camera) => {
      odd = !odd;
      if (odd && !mirror.userData.always) return;
      // The fog stays: without it every material would need another shader
      // variant, compiled the first time the river shows.
      const bg = scene.background;
      const bgLevel = scene.backgroundIntensity;
      scene.background = skyTexture() || bg;
      scene.backgroundIntensity = scene.environmentIntensity;
      render(renderer, scene, camera);
      scene.background = bg;
      scene.backgroundIntensity = bgLevel;
    };
    plain.parent.add(mirror);
    return mirror;
  };
  // Is any river square inside the ground rectangle (x0..x1, z0..z1)?
  const inView = (ax, az, bx, bz) => {
    const i0 = Math.max(0, Math.floor(ax / S)), i1 = Math.min(gw - 1, Math.floor(bx / S));
    const j0 = Math.max(0, Math.floor(az / S)), j1 = Math.min(gh - 1, Math.floor(bz / S));
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) if (has[j * gw + i]) return true;
    return false;
  };
  return {
    get mirror() {
      return mirror;
    },
    // Make the mirror before the first frame, shown, so its shader is
    // compiled with the rest (no stall the first time the river shows).
    prepare() {
      const m = make();
      if (m) {
        m.visible = true;
        m.userData.always = true;
      }
      return () => {
        if (m) {
          m.visible = false;
          m.userData.always = false;
        }
      };
    },
    // real: the quality allows the mirror; the rest: the ground on screen.
    update(dt, real, ax, az, bx, bz, sun) {
      const show = real && inView(ax, az, bx, bz);
      if (show) make();
      // The simple water would cover the mirror; the land covers the rest.
      plain.visible = !show;
      if (mirror) {
        mirror.visible = show;
        if (show) {
          const u = mirror.material.uniforms;
          u.time.value += dt * 0.35;
          u.sunDirection.value.copy(sun.dir);
          u.sunColor.value.copy(sun.color);
        }
      }
      return show;
    },
  };
}
