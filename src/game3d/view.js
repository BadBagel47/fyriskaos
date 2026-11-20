// The game drawn in 3D (F-042): Sommarkväll+ from the style test with the
// tilted camera. The camera looks north at a fixed tilt and follows the
// player, further out at speed. Quality levels and an fps meter are kept
// from the style test; the evening (F-039) dims the sun and lights lamps,
// windows and car lights. On top (F-059 to F-062): glow on strong lights,
// a sky with a low sun as the environment map, a low warm evening sun with
// long shadows, exponential fog, and Fyrisån as a mirror on High.

import * as THREE from '../../vendor/three/three.module.js';
import * as L from '../stiltest/look.js';
import { createCity } from './city.js';
import { buildLandmarks, buildPlaceSigns } from './landmarks.js';
import { createEntities } from './entities.js';
import { cut, withCut } from './cut.js';
import { eveningLevel } from '../daylight.js';
import { treeTextures, loadModels } from './load.js';
import { createPost, createSkyEnv, createRiver } from './effects.js';

const TILT = THREE.MathUtils.degToRad(33);
// Average light of the sky map (linear, over all directions) by day and in the evening.
const ENV_DAY = 0.3;
const ENV_EVE = 0.32; // the low sun's glare is most of the evening sky's average
const FOV = 24; // a long lens: less leaning at the screen edges (B-050)
const TEX = (n) => new URL(`stiltest/tex/${n}.webp`, document.baseURI).href;
const SMALL = (n) => new URL(`stiltest/tex/small/${n}.webp`, document.baseURI).href;

// Lit windows are glass with a warm colour (red channel full); they glow,
// more in the evening. One material for all glass saves draw calls.
const litLevel = { value: 0.25 };
function litWindows(m) {
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uLit = litLevel;
    sh.fragmentShader = 'uniform float uLit;\n' + sh.fragmentShader.replace(
      '#include <emissivemap_fragment>',
      `#include <emissivemap_fragment>
      #ifdef USE_INSTANCING_COLOR
        totalEmissiveRadiance += vColor * step(0.97, vColor.r) * uLit;
      #endif`,
    );
  };
  m.customProgramCacheKey = () => 'litwin';
  return m;
}

// bloom: the glow's resolution as a part of the screen (0 = no glow, and no
// post-processing at all); mirror: Fyrisån reflects the city.
export const QUALITY = {
  low: { name: 'Låg', ratio: 1, shadow: 0, bloom: 0, mirror: false },
  medium: { name: 'Medel', ratio: 1.5, shadow: 1024, bloom: 0.5, mirror: false },
  high: { name: 'Hög', ratio: 2, shadow: 2048, bloom: 1, mirror: true },
};

// The sun's place in the sky (degrees over the horizon), by day and in the
// evening (F-061), and its compass direction: from the west, almost along the east-west streets, so the evening sun lights long strips down them.
const SUN = { dayElev: 21, eveElev: 4.5, az: 262 };
const sunVector = (elev, az, out) => {
  const e = THREE.MathUtils.degToRad(elev);
  const a = THREE.MathUtils.degToRad(az);
  return out.set(Math.sin(a) * Math.cos(e), Math.sin(e), -Math.cos(a) * Math.cos(e));
};

export async function createRenderer3d(container, game) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  container.appendChild(renderer.domElement);

  // Small pictures first, so the city shows at once; full ones afterwards.
  const names = ['asphalt', 'slabs', 'grass', 'plaster', 'roof', 'foliage'];
  const TT = (n, t) => (globalThis.__times ||= []).push([n, Math.round(performance.now() - t)]);
  let tq = performance.now();
  const tex = Object.fromEntries(await Promise.all(names.map(async (n) => [n, await L.loadTexture(SMALL(n))])));

  const haze = new THREE.Color(0xd9b48a);
  const scene = new THREE.Scene();
  scene.background = haze;
  // Exponential fog in a warm, muted tone (F-061); its density follows the
  // camera's distance every frame.
  scene.fog = new THREE.FogExp2(haze, 0.005);
  TT('textures', tq);
  tq = performance.now();
  // The sky with the low sun as the environment (F-060): paint, glass and
  // water reflect it.
  const skyEnv = createSkyEnv(renderer);
  skyEnv.update(SUN.dayElev, SUN.az, 0);
  scene.environment = skyEnv.texture;
  scene.environmentIntensity = ENV_DAY / skyEnv.level;
  TT('env', tq);

  const mats = {
    asphalt: L.worldMapped(tex.asphalt, 6, { vertexColors: true, roughness: 0.92, vary: 0.7 }),
    slabs: L.worldMapped(tex.slabs, 4, { vertexColors: true, roughness: 0.88, vary: 0.5 }),
    grass: L.worldMapped(tex.grass, 4, { vertexColors: true, roughness: 1, vary: 0.8 }),
    wall: withCut(L.worldMapped(tex.plaster, 5, { vertexColors: true, roughness: 0.95, vary: 0.6 })),
    roof: withCut(L.worldMapped(tex.roof, 0.7, { vertexColors: true, roughness: 0.8, vary: 0.9 })),
    leaf: withCut(L.worldMapped(tex.foliage, 3.6, { vertexColors: true, roughness: 0.9, triplanar: true, mapNormal: true }), 4.5),
    hedge: withCut(L.worldMapped(tex.foliage, 2.4, { vertexColors: true, roughness: 0.9, triplanar: true }), 4.5),
    wood: withCut(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95 }), 4.5),
    plain: withCut(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.75, envMapIntensity: 0.4 })),
    solid: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.75, envMapIntensity: 0.4 }),
    paint: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6, color: 0xe6e3dc, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }),
    trimI: withCut(new THREE.MeshStandardMaterial({ roughness: 0.7, envMapIntensity: 0.4 })),
    darkI: withCut(new THREE.MeshStandardMaterial({ roughness: 0.9, envMapIntensity: 0.3 })),
    glassI: withCut(litWindows(new THREE.MeshStandardMaterial({ roughness: 0.12, metalness: 0.3, envMapIntensity: 0.9 }))),
    lantern: withCut(new THREE.MeshBasicMaterial({ color: 0xfff0c8 })),
    // Halos at the lanterns, lit in the evening (F-059).
    halo: new THREE.MeshBasicMaterial({ map: L.glowTex(), color: 0x000000, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
  };

  // CC0 trees (D-048): leaf clusters with see-through gaps, bark pictures.
  // Until the models arrive the code-built trees use the plain leaf material.
  const leafOf = (t) => (t ? withCut(new THREE.MeshStandardMaterial({ map: t, alphaTest: 0.45, side: THREE.DoubleSide, vertexColors: true, roughness: 0.85, envMapIntensity: 0.5 }), 4.5) : mats.leaf);
  const barkOf = (t) => (t ? withCut(new THREE.MeshStandardMaterial({ map: t, vertexColors: true, roughness: 0.95 }), 4.5) : mats.wood);
  Object.assign(mats, { leafV: withCut(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9 }), 4.5), vc: mats.solid });

  const map = game.map;
  const city = createCity(map, mats);
  scene.add(city.group);
  scene.add(buildLandmarks(map, mats));
  scene.add(buildPlaceSigns(map));
  // Build the pieces around the start at once; the rest follow as you move.
  city.update(game.player.x, game.player.y, Infinity);

  // Water under the whole map (land covers it except in the river) and
  // flat ground outside the map.
  // Low and Medium: the water reflects the sky map only (F-062).
  const water = new THREE.Mesh(new THREE.PlaneGeometry(map.width + 40, map.height + 40).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x24485a, roughness: 0.06, metalness: 0.3, envMapIntensity: 1.6 }));
  water.position.set(map.width / 2, -0.85, map.height / 2);
  water.receiveShadow = true;
  scene.add(water);
  const outside = new THREE.Group();
  const pad = 200;
  for (const [x, z, w, d] of [[-pad / 2, map.height / 2, pad, map.height + pad * 2], [map.width + pad / 2, map.height / 2, pad, map.height + pad * 2], [map.width / 2, -pad / 2, map.width, pad], [map.width / 2, map.height + pad / 2, map.width, pad]]) {
    const g = new THREE.PlaneGeometry(w, d).rotateX(-Math.PI / 2);
    const col = new Float32Array(g.attributes.position.count * 3).fill(0.75);
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const m = new THREE.Mesh(g, mats.grass);
    m.position.set(x, 0.08, z);
    m.receiveShadow = true;
    outside.add(m);
  }
  scene.add(outside);

  // Light pools under the lamps (stronger in the evening).
  const glowMat = new THREE.MeshBasicMaterial({ map: L.glowTex(), color: 0xffc070, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.3 });
  const pools = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), glowMat, map.lamps.length);
  map.lamps.forEach((l, i) => {
    const m = new THREE.Matrix4().compose(new THREE.Vector3(l.x + (l.ax || 0) * 1.1, 0.14, l.y + (l.ay || 0) * 1.1), new THREE.Quaternion(), new THREE.Vector3(7, 1, 7));
    pools.setMatrixAt(i, m);
  });
  pools.renderOrder = 2;
  scene.add(pools);

  const ents = createEntities(game, mats);
  scene.add(ents.group);

  // Low warm evening sun from the south-west, cool sky, a little fill.
  const sun = new THREE.DirectionalLight(0xffa848, 8.2);
  sun.castShadow = true;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.05;
  sun.shadow.radius = 3;
  const sunDir = sunVector(SUN.dayElev, SUN.az, new THREE.Vector3());
  scene.add(sun, sun.target);
  const river = createRiver(map, water, sunDir, () => skyEnv.texture);
  const hemi = new THREE.HemisphereLight(0xb4b0c0, 0x7a5434, 0.85);
  scene.add(hemi);
  const fill = new THREE.DirectionalLight(0x9aa8d0, 0.3);
  fill.position.set(60, 30, -10);
  scene.add(fill);

  const camera = new THREE.PerspectiveCamera(FOV, 1, 4, 260);
  const post = createPost(renderer, scene, camera);
  const cam = { x: game.player.x, z: game.player.y, metres: 0 };

  let quality = 'medium';
  function setQuality(q) {
    quality = q;
    const Q = QUALITY[q];
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, Q.ratio));
    sun.castShadow = Q.shadow > 0;
    post.set(Q.bloom > 0, Q.bloom);
    if (Q.shadow) {
      sun.shadow.mapSize.set(Q.shadow, Q.shadow);
      if (sun.shadow.map) {
        sun.shadow.map.dispose();
        sun.shadow.map = null;
      }
    }
    resize();
  }
  function resize() {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    post.setSize(w, h, renderer.getPixelRatio());
  }
  window.addEventListener('resize', resize);
  setQuality('medium');

  function targetMetres() {
    const v = game.player.vehicle;
    if (!v) return 24;
    const s = Math.hypot(v.vx, v.vy);
    return v.spec.class === 'car' ? 28 + s * 0.6 : 26 + s * 0.5;
  }

  // Day and evening light (F-039, F-061): in the evening the sun is low,
  // orange and still strong on what faces it, the sky light is weaker (more
  // contrast) and the haze is warm and muted.
  const day = { sun: new THREE.Color(0xffa848), sky: new THREE.Color(0xb4b0c0), ground: new THREE.Color(0x7a5434), haze: new THREE.Color(0xcfae8c) };
  const eve = { sun: new THREE.Color(0xff6a24), sky: new THREE.Color(0x5468a0), ground: new THREE.Color(0x2a2430), haze: new THREE.Color(0x5e5058) };
  const sunState = { dir: sunDir, color: new THREE.Color() };
  const lightRight = new THREE.Vector3();
  const lightUp = new THREE.Vector3();
  const UP = new THREE.Vector3(0, 1, 0);
  let lastNight = -1;

  function frame(dt) {
    const p = game.player;
    const focus = p.vehicle || p;
    // Look ahead in the direction of travel (B-055), more at speed, but keep
    // the player on screen.
    const look = p.vehicle ? 1.1 : 0.25;
    const lim = (cam.metres || 24) * 0.32;
    let ax = focus.vx * look;
    let az = focus.vy * look;
    const al = Math.hypot(ax, az);
    if (al > lim) {
      ax *= lim / al;
      az *= lim / al;
    }
    const tx = focus.x + ax;
    const tz = focus.y + az;
    const k = 1 - Math.exp(-6 * dt);
    if (cam.metres === 0) {
      cam.x = tx;
      cam.z = tz;
      cam.metres = targetMetres();
    }
    cam.x += (tx - cam.x) * k;
    cam.z += (tz - cam.z) * k;
    cam.metres += (targetMetres() - cam.metres) * (1 - Math.exp(-2 * dt));
    let sx = 0;
    let sz = 0;
    if (game.shake > 0) {
      sx = (Math.random() - 0.5) * game.shake * 0.6;
      sz = (Math.random() - 0.5) * game.shake * 0.6;
    }
    // Distance so the screen's height shows `metres` of ground.
    const dist = cam.metres / 2 / Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    camera.position.set(cam.x + sx, Math.cos(TILT) * dist, cam.z + Math.sin(TILT) * dist + sz);
    camera.lookAt(cam.x + sx, 0, cam.z + sz);
    // Pieces of the city near what is on screen (the view reaches further up the screen).
    const tb = performance.now();
    if (api.debugTop) city.update(api.debugTop.x, api.debugTop.y, 1000);
    else city.update(cam.x, cam.z - cam.metres * 0.3, Math.min(30, Math.max(2, dt * 250)));
    api.buildMs = performance.now() - tb;
    camera.far = dist * 2.4 + 40;
    camera.updateProjectionMatrix();
    // Fog: in the evening about 8 % at the player's distance and under half at
    // the top of the screen; thinner by day, so daylight stays clear.
    scene.fog.density = (0.17 + 0.12 * lastNight) / dist;

    // The cut-away plane runs from just above the player towards the camera.
    cut.value.set(focus.x, focus.y, 1 / Math.tan(TILT), 0.9);

    // Sun and its shadow box follow the camera. The box is just big enough for
    // what is on screen (about twice as wide as high) and the houses on it; a
    // low sun sees the ground almost edge-on, so the box is wide and low. Its
    // place is snapped to whole shadow-map pixels so shadows do not shimmer.
    const across = Math.ceil((Math.hypot(cam.metres * 1.2, cam.metres * 0.8) + 6) / 4) * 4;
    const se = sunDir.y;
    const ce = Math.sqrt(1 - se * se);
    const sc = sun.shadow.camera;
    sc.left = -across;
    sc.right = across;
    sc.top = Math.ceil(across * se + 34 * ce);
    sc.bottom = -Math.ceil(across * se + 3);
    // Houses up to this far towards the sun cast shadows onto the screen.
    const reach = 60 + 100 * ce * ce;
    sc.near = 1;
    sc.far = reach + across * 2 + 40;
    sc.updateProjectionMatrix();
    lightRight.crossVectors(sunDir, UP).normalize();
    lightUp.crossVectors(lightRight, sunDir).normalize();
    const ms = sun.shadow.mapSize.x || 1024;
    const texX = (2 * across) / ms;
    const texY = (sc.top - sc.bottom) / ms;
    const target = sun.target.position.set(cam.x, 0, cam.z - 4);
    const pr = target.dot(lightRight);
    const pu = target.dot(lightUp);
    target.addScaledVector(lightRight, Math.round(pr / texX) * texX - pr).addScaledVector(lightUp, Math.round(pu / texY) * texY - pu);
    sun.position.copy(target).addScaledVector(sunDir, reach);

    // Evening (F-039).
    const night = eveningLevel(game.time + (game.clockOffset || 0));
    if (Math.abs(night - lastNight) > 0.002) {
      lastNight = night;
      sunVector(SUN.dayElev + (SUN.eveElev - SUN.dayElev) * night, SUN.az, sunDir);
      // A low sun meets the ground almost edge-on: more bias against stripes.
      sun.shadow.bias = -0.0004 - 0.0009 * night;
      sun.shadow.normalBias = 0.05 + 0.1 * night;
      sun.intensity = 8.2 * (1 - 0.45 * night);
      sun.color.copy(day.sun).lerp(eve.sun, night);
      sunState.color.copy(sun.color).multiplyScalar(0.6 + 0.4 * (1 - night));
      hemi.color.copy(day.sky).lerp(eve.sky, night);
      hemi.groundColor.copy(day.ground).lerp(eve.ground, night);
      hemi.intensity = 0.75 - 0.15 * night; // blue sky light in the shade, against the warm sun and lamps
      fill.intensity = 0.3 * (1 - 0.6 * night);
      scene.background.copy(day.haze).lerp(eve.haze, night);
      scene.fog.color.copy(scene.background);
      renderer.toneMappingExposure = 1.15 - 0.1 * night;
      // The sky map in five steps from day to evening.
      const step = Math.round(night * 4) / 4;
      if (skyEnv.update(SUN.dayElev + (SUN.eveElev - SUN.dayElev) * step, SUN.az, step)) scene.environment = skyEnv.texture;
      scene.environmentIntensity = (ENV_DAY + (ENV_EVE - ENV_DAY) * night) / skyEnv.level;
      glowMat.opacity = 0.08 + 0.4 * night;
      // Strong lights are above the glow's threshold in the evening (F-059):
      // lit windows about 2×, lamps about 8× the threshold (linear HDR).
      litLevel.value = 0.25 + 5 * night;
      mats.lantern.color.setRGB(1, 0.94, 0.78).multiplyScalar(0.9 + 20 * night);
      mats.halo.color.setRGB(1, 0.8, 0.52).multiplyScalar(7 * night);
      mats.halo.visible = night > 0.02;
      ents.night = night;
    }
    ents.update(dt, night);
    // Fyrisån as a mirror on High, while it is on screen (F-062).
    const m = cam.metres;
    api.mirror = river.update(dt, QUALITY[quality].mirror && !api.debugTop, cam.x - m * 1.2, cam.z - m * 0.95, cam.x + m * 1.2, cam.z + m * 0.7, sunState);
    // An overview from high up (checks and screenshots only).
    if (api.debugTop) {
      camera.position.set(api.debugTop.x, api.debugTop.h, api.debugTop.y + api.debugTop.h * 0.6);
      camera.lookAt(api.debugTop.x, 0, api.debugTop.y);
      camera.far = api.debugTop.h * 2;
      scene.fog.density = 0;
      camera.updateProjectionMatrix();
    }
    post.render(dt);
  }

  // Prepare the shaders before the first frame (in parallel where the browser
  // can), the river's mirror and the glow's passes too.
  // With post-processing everything is drawn into its buffer, which needs
  // other shader variants than the screen: compile for that buffer.
  if (post.on) renderer.setRenderTarget(post.composer.renderTarget1);
  if (renderer.compileAsync) await renderer.compileAsync(scene, camera).catch(() => {});
  renderer.setRenderTarget(null);
  // The river's mirror is prepared a little after the start, when the game
  // already shows: its shader and its sky background are set up on first
  // use, which would otherwise stall the first time the river shows (F-062).
  setTimeout(() => {
    const hide = river.prepare();
    if (river.mirror) {
      renderer.setRenderTarget(post.on ? post.composer.renderTarget1 : null);
      renderer.compile(river.mirror, camera, scene);
      river.mirror.onBeforeRender(renderer, scene, camera);
      renderer.setRenderTarget(null);
    }
    hide();
  }, 2500);

  const api = {
    frame,
    renderer,
    scene,
    camera,
    setQuality,
    get quality() {
      return quality;
    },
    city,
    ents,
    post,
    river,
    // Load the CC0 models after the start and swap them in (D-048).
    async upgradeModels() {
      const [, tt] = await Promise.all([loadModels(), treeTextures(L.loadTexture)]);
      Object.assign(mats, { leafA: leafOf(tt.leafA), leafB: leafOf(tt.leafB), barkA: barkOf(tt.barkA), barkB: barkOf(tt.barkB) });
      city.rebuildTrees();
      ents.upgrade();
    },
    // Swap in the full-size pictures after the first frames.
    async upgradeTextures() {
      await Promise.all(
        names.map(async (n) => {
          const full = await L.loadTexture(TEX(n));
          const t = tex[n];
          if (!full || !t) return;
          t.dispose();
          t.image = full.image;
          t.needsUpdate = true;
        }),
      );
    },
  };
  return api;
}
