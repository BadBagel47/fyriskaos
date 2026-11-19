// The game drawn in 3D (F-042): Sommarkväll+ from the style test with the
// tilted camera. The camera looks north at a fixed tilt and follows the
// player, further out at speed. Quality levels and an fps meter are kept
// from the style test; the evening (F-039) dims the sun and lights lamps,
// windows and car lights.

import * as THREE from '../../vendor/three/three.module.js';
import * as L from '../stiltest/look.js';
import { buildCity } from './city.js';
import { createEntities } from './entities.js';
import { cut, withCut } from './cut.js';
import { eveningLevel } from '../daylight.js';
import { treeTextures } from './load.js';

const TILT = THREE.MathUtils.degToRad(33);
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

export const QUALITY = {
  low: { name: 'Låg', ratio: 1, shadow: 0 },
  medium: { name: 'Medel', ratio: 1.5, shadow: 1024 },
  high: { name: 'Hög', ratio: 2, shadow: 2048 },
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
  const tex = Object.fromEntries(await Promise.all(names.map(async (n) => [n, await L.loadTexture(SMALL(n))])));

  const haze = new THREE.Color(0xd9b48a);
  const scene = new THREE.Scene();
  scene.background = haze;
  scene.fog = new THREE.Fog(haze, 70, 150);
  scene.environment = L.eveningEnvironment(renderer);

  const mats = {
    asphalt: L.worldMapped(tex.asphalt, 6, { vertexColors: true, roughness: 0.92, vary: 0.7 }),
    slabs: L.worldMapped(tex.slabs, 4, { vertexColors: true, roughness: 0.88, vary: 0.5 }),
    grass: L.worldMapped(tex.grass, 4, { vertexColors: true, roughness: 1, vary: 0.8 }),
    wall: withCut(L.worldMapped(tex.plaster, 5, { vertexColors: true, roughness: 0.95, vary: 0.6 })),
    roof: withCut(L.worldMapped(tex.roof, 0.7, { vertexColors: true, roughness: 0.8, vary: 0.9 })),
    leaf: withCut(L.worldMapped(tex.foliage, 3.6, { vertexColors: true, roughness: 0.9, triplanar: true, mapNormal: true }), 4.5),
    wood: withCut(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95 }), 4.5),
    plain: withCut(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.75, envMapIntensity: 0.4 })),
    solid: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.75, envMapIntensity: 0.4 }),
    paint: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6, color: 0xe6e3dc, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }),
    trimI: withCut(new THREE.MeshStandardMaterial({ roughness: 0.7, envMapIntensity: 0.4 })),
    darkI: withCut(new THREE.MeshStandardMaterial({ roughness: 0.9, envMapIntensity: 0.3 })),
    glassI: withCut(litWindows(new THREE.MeshStandardMaterial({ roughness: 0.12, metalness: 0.3, envMapIntensity: 0.9 }))),
    lantern: withCut(new THREE.MeshBasicMaterial({ color: 0xfff0c8 })),
  };

  // CC0 trees (D-048): leaf clusters with see-through gaps, bark pictures.
  const tt = await treeTextures(L.loadTexture);
  const leafOf = (t) => (t ? withCut(new THREE.MeshStandardMaterial({ map: t, alphaTest: 0.45, side: THREE.DoubleSide, vertexColors: true, roughness: 0.85, envMapIntensity: 0.5 }), 4.5) : mats.leaf);
  const barkOf = (t) => (t ? withCut(new THREE.MeshStandardMaterial({ map: t, vertexColors: true, roughness: 0.95 }), 4.5) : mats.wood);
  Object.assign(mats, { leafA: leafOf(tt.leafA), leafB: leafOf(tt.leafB), barkA: barkOf(tt.barkA), barkB: barkOf(tt.barkB), leafV: withCut(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9 }), 4.5), vc: mats.solid });

  const map = game.map;
  const city = buildCity(map, mats);
  scene.add(city.group);

  // Water under the whole map (land covers it except in the river) and
  // flat ground outside the map.
  const water = new THREE.Mesh(new THREE.PlaneGeometry(map.width + 40, map.height + 40).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x2f5a70, roughness: 0.15, metalness: 0.2, envMapIntensity: 1.2 }));
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
  const sunDir = new THREE.Vector3(-52, 24, 34).normalize();
  scene.add(sun, sun.target);
  const hemi = new THREE.HemisphereLight(0xb4b0c0, 0x7a5434, 0.85);
  scene.add(hemi);
  const fill = new THREE.DirectionalLight(0x9aa8d0, 0.3);
  fill.position.set(60, 30, -10);
  scene.add(fill);

  const camera = new THREE.PerspectiveCamera(FOV, 1, 4, 260);
  const cam = { x: game.player.x, z: game.player.y, metres: 0 };

  let quality = 'medium';
  function setQuality(q) {
    quality = q;
    const Q = QUALITY[q];
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, Q.ratio));
    sun.castShadow = Q.shadow > 0;
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
  }
  window.addEventListener('resize', resize);
  setQuality('medium');

  function targetMetres() {
    const v = game.player.vehicle;
    if (!v) return 26;
    const s = Math.hypot(v.vx, v.vy);
    return v.spec.class === 'car' ? 34 + s * 0.85 : 29 + s * 0.6;
  }

  const day = { sun: new THREE.Color(0xffa848), sky: new THREE.Color(0xb4b0c0), ground: new THREE.Color(0x7a5434), haze: new THREE.Color(0xd9b48a) };
  const eve = { sun: new THREE.Color(0xff8a40), sky: new THREE.Color(0x4a5a8a), ground: new THREE.Color(0x2a2430), haze: new THREE.Color(0x3a4060) };
  let lastNight = -1;

  function frame(dt) {
    const p = game.player;
    const focus = p.vehicle || p;
    const look = p.vehicle ? 0.7 : 0.25;
    const tx = focus.x + focus.vx * look;
    const tz = focus.y + focus.vy * look;
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
    camera.far = dist * 2.4 + 40;
    camera.updateProjectionMatrix();
    scene.fog.near = dist * 1.25;
    scene.fog.far = dist * 2.6;

    // The cut-away plane runs from just above the player towards the camera.
    cut.value.set(focus.x, focus.y, 1 / Math.tan(TILT), 2.6);

    // Sun and its shadow box follow the camera, snapped so shadows do not shimmer.
    // Just big enough for what is on screen (the screen is about twice as wide as high).
    const half = cam.metres * 0.62;
    const sc = sun.shadow.camera;
    sc.left = -half * 1.9;
    sc.right = half * 1.9;
    sc.top = half * 1.3;
    sc.bottom = -half * 1.3;
    sc.near = 1;
    sc.far = 260;
    sc.updateProjectionMatrix();
    const snap = (half * 2) / (sun.shadow.mapSize.x || 1024);
    const ox = Math.round(cam.x / snap) * snap;
    const oz = Math.round((cam.z - 4) / snap) * snap;
    sun.target.position.set(ox, 0, oz);
    sun.position.set(ox + sunDir.x * 120, sunDir.y * 120, oz + sunDir.z * 120);

    // Evening (F-039).
    const night = eveningLevel(game.time + (game.clockOffset || 0));
    if (Math.abs(night - lastNight) > 0.002) {
      lastNight = night;
      sun.intensity = 8.2 * (1 - 0.88 * night);
      sun.color.copy(day.sun).lerp(eve.sun, night);
      hemi.color.copy(day.sky).lerp(eve.sky, night);
      hemi.groundColor.copy(day.ground).lerp(eve.ground, night);
      hemi.intensity = 0.85 - 0.35 * night;
      scene.background.copy(day.haze).lerp(eve.haze, night);
      scene.fog.color.copy(scene.background);
      renderer.toneMappingExposure = 1.15 - 0.15 * night;
      glowMat.opacity = 0.3 + 0.6 * night;
      litLevel.value = 0.25 + 0.95 * night;
      mats.lantern.color.setRGB(1, 0.94, 0.78).multiplyScalar(0.9 + 0.8 * night);
      ents.night = night;
    }
    ents.update(dt, night);
    renderer.render(scene, camera);
  }

  return {
    frame,
    renderer,
    scene,
    camera,
    setQuality,
    get quality() {
      return quality;
    },
    city,
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
}
