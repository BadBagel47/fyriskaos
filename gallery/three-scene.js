// D-041 test (c): the same street as the gallery's street scene, built in 3D
// with three.js so light and shadows are calculated (sun, lamps, headlights).
// Used only by the gallery; renders one picture and returns it as a data URL.

import * as THREE from '../vendor/three/three.module.js';

const W = 30;
const H = 26.5;

function canvasTexture(w, h, draw, repeat = null) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat[0], repeat[1]);
  }
  t.anisotropy = 4;
  return t;
}

function loadTexture(url, repeat) {
  return new Promise((resolve) => {
    if (!url) return resolve(null);
    new THREE.TextureLoader().load(
      url,
      (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        if (repeat) {
          t.wrapS = t.wrapT = THREE.RepeatWrapping;
          t.repeat.set(repeat[0], repeat[1]);
        }
        t.anisotropy = 4;
        resolve(t);
      },
      undefined,
      () => resolve(null),
    );
  });
}

// A facade with rows of windows, a plinth and a door.
function facadeTexture(color, floors, cols, lit, seed) {
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  return canvasTexture(256, 256, (g, w, h) => {
    g.fillStyle = color;
    g.fillRect(0, 0, w, h);
    for (let i = 0; i < 400; i++) {
      g.fillStyle = `rgba(0,0,0,${0.03 + rnd() * 0.04})`;
      g.fillRect(rnd() * w, rnd() * h, 2, 2);
    }
    const fh = h / floors;
    for (let f = 0; f < floors; f++) {
      for (let c = 0; c < cols; c++) {
        const x = (c + 0.3) * (w / cols);
        const y = h - (f + 0.75) * fh;
        const ww = (w / cols) * 0.4;
        const wh = fh * 0.45;
        g.fillStyle = '#e9e4da';
        g.fillRect(x - 3, y - 3, ww + 6, wh + 6);
        g.fillStyle = lit && rnd() < 0.5 ? '#ffcf7a' : '#4b5b70';
        g.fillRect(x, y, ww, wh);
        g.fillStyle = 'rgba(255,255,255,0.25)';
        g.fillRect(x + 2, y + 2, ww * 0.3, wh - 4);
      }
    }
    g.fillStyle = 'rgba(0,0,0,0.18)';
    g.fillRect(0, h - fh * 0.2, w, fh * 0.2);
  });
}

function box(w, h, d, mat, x, y, z) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function cyl(r, h, mat, x, y, z, seg = 12) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

// A flat picture standing in for something seen from above (tree crown, car),
// lifted to its height so it casts a matching shadow.
function topSprite(tex, w, d, x, y, z, rot = 0) {
  const mat = new THREE.MeshStandardMaterial({ map: tex, transparent: true, alphaTest: 0.7, roughness: 0.7 });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
  m.rotation.x = -Math.PI / 2;
  m.rotation.z = -rot;
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export async function render3D({ evening = false, assets = {}, px = 24 } = {}) {
  const width = Math.round(W * px);
  const height = Math.round(H * px);
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(2);
  renderer.setSize(width, height, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = evening ? 1.5 : 1.05;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2b2c2e);
  // Camera high above the middle, looking straight down; walls show at the edges.
  const cam = new THREE.PerspectiveCamera(24, W / H, 1, 200);
  const camH = (H / 2) / Math.tan(THREE.MathUtils.degToRad(12));
  cam.position.set(W / 2, camH, H / 2);
  cam.up.set(0, 0, -1);
  cam.lookAt(W / 2, 0, H / 2);

  const [asphaltT, slabT, grassT, roofT, treeT, carT] = await Promise.all([
    loadTexture(assets.asphalt, [4, 2]),
    loadTexture(assets.sidewalk, [8, 3]),
    loadTexture(assets.grass, [2, 2]),
    loadTexture(assets.roof, [3, 3]),
    loadTexture(assets.tree),
    loadTexture(assets.car),
  ]);

  const mat = (opts) => new THREE.MeshStandardMaterial({ roughness: 0.9, metalness: 0, ...opts });
  const ground = (w, d, x, z, m, y = 0) => {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(w, d), m);
    p.rotation.x = -Math.PI / 2;
    p.position.set(x + w / 2, y, z + d / 2);
    p.receiveShadow = true;
    scene.add(p);
    return p;
  };
  const asphalt = mat({ color: asphaltT ? 0xffffff : 0x606268, map: asphaltT });
  const slabs = mat({ color: slabT ? 0xffffff : 0xcfc9bc, map: slabT });
  ground(W, 9.5, 0, 0, slabs);
  ground(W, 1.6, 0, 9.5, mat({ color: 0xb07a6c }), 0.01);
  ground(W, 12, 0, 11.25, asphalt);
  const slabs2 = mat({ color: slabT ? 0xffffff : 0xcfc9bc, map: slabT ? slabT.clone() : null });
  ground(W, 3.1, 0, 23.4, slabs2);
  // Curbs.
  const curbM = mat({ color: 0xa9a294 });
  scene.add(box(W, 0.14, 0.3, curbM, W / 2, 0.07, 11.2));
  scene.add(box(W, 0.14, 0.3, curbM, W / 2, 0.07, 23.3));
  // Road paint.
  const paint = mat({ color: 0xf2efe6 });
  for (let x = 1; x < 18; x += 6) ground(3, 0.16, x, 17.17, paint, 0.012);
  for (let z = 11.6; z < 23; z += 1.2) ground(3, 0.6, 21, z, paint, 0.012);
  if (grassT) ground(3.2, 1.4, 1.2, 5.6, mat({ map: grassT }), 0.25);

  // Houses: boxes with window facades and gable or flat roofs.
  const houses = [
    { x: 0.5, z: -4, w: 9.5, d: 8.5, h: 14, roof: 'gable', color: '#e3b25a', seed: 3 },
    { x: 10.5, z: -4, w: 9, d: 8.5, h: 17, roof: 'flat', color: '#ece6da', seed: 7 },
    { x: 20, z: -4, w: 9.5, d: 8.5, h: 11, roof: 'gable', color: '#c96b4e', seed: 11 },
  ];
  for (const hs of houses) {
    const floors = Math.floor(hs.h / 3);
    const front = facadeTexture(hs.color, floors, Math.round(hs.w / 3), evening, hs.seed);
    const side = facadeTexture(hs.color, floors, Math.round(hs.d / 3), evening, hs.seed + 1);
    const wallM = [mat({ map: side }), mat({ map: side }), mat({ color: 0x777777 }), mat({ color: 0x777777 }), mat({ map: front }), mat({ map: front })];
    const b = new THREE.Mesh(new THREE.BoxGeometry(hs.w, hs.h, hs.d), wallM);
    b.position.set(hs.x + hs.w / 2, hs.h / 2, hs.z + hs.d / 2);
    b.castShadow = b.receiveShadow = true;
    scene.add(b);
    if (hs.roof === 'gable') {
      const rh = hs.d * 0.35;
      const shape = new THREE.Shape();
      shape.moveTo(-hs.d / 2 - 0.3, 0);
      shape.lineTo(0, rh);
      shape.lineTo(hs.d / 2 + 0.3, 0);
      shape.lineTo(-hs.d / 2 - 0.3, 0);
      const geo = new THREE.ExtrudeGeometry(shape, { depth: hs.w + 0.6, bevelEnabled: false });
      const roofM = roofT ? mat({ map: roofT }) : mat({ color: 0xb85a43 });
      const r = new THREE.Mesh(geo, roofM);
      r.rotation.y = Math.PI / 2;
      r.position.set(hs.x - 0.3, hs.h, hs.z + hs.d / 2);
      r.castShadow = r.receiveShadow = true;
      scene.add(r);
      scene.add(box(0.8, 2.2, 0.8, mat({ color: 0x8a4a3a }), hs.x + hs.w * 0.6, hs.h + rh * 0.7, hs.z + hs.d * 0.35));
    } else {
      scene.add(box(hs.w, 0.6, hs.d, mat({ color: 0x9a978f }), hs.x + hs.w / 2, hs.h + 0.3, hs.z + hs.d / 2));
      scene.add(box(2, 1.2, 1.4, mat({ color: 0xbfc2c6, metalness: 0.4, roughness: 0.5 }), hs.x + 3, hs.h + 1.2, hs.z + 3));
      scene.add(box(1.2, 0.8, 1.2, mat({ color: 0x8e9195 }), hs.x + 6.5, hs.h + 1, hs.z + 5));
    }
  }

  // Street furniture and the kind of clutter bild 3 has: crates, pallets, a fence.
  const metal = mat({ color: 0x3f4247, metalness: 0.5, roughness: 0.5 });
  const wood = mat({ color: 0x8a6a48 });
  const crate = mat({ color: 0xa4794a });
  scene.add(box(1.8, 0.45, 0.5, wood, 7, 0.45, 6.2));
  scene.add(cyl(0.3, 0.9, mat({ color: 0x3f6b4f }), 9.2, 0.45, 6.2));
  scene.add(cyl(0.3, 0.9, mat({ color: 0x3f6b4f }), 17.4, 0.45, 24.9));
  for (let i = 0; i < 4; i++) scene.add(box(0.06, 0.8, 0.9, metal, 12.5 + i * 0.8, 0.4, 7.4));
  scene.add(box(1.0, 0.8, 1.0, crate, 25.6, 0.4, 5.6));
  scene.add(box(0.8, 0.6, 0.8, crate, 26.2, 1.1, 5.7));
  scene.add(box(1.2, 0.15, 1.0, wood, 24.3, 0.08, 6.0));
  for (let x = 20.3; x < 29.5; x += 0.5) scene.add(box(0.08, 1.2, 0.08, metal, x, 0.6, 4.9));
  scene.add(box(9.4, 0.06, 0.06, metal, 24.9, 1.15, 4.9));
  for (const [x, z] of [[19, 8.9], [24.5, 8.9]]) {
    scene.add(cyl(0.05, 2.4, metal, x, 1.2, z));
    scene.add(box(0.6, 0.6, 0.06, mat({ color: x < 20 ? 0x2a5ca8 : 0xf2c94c }), x, 2.3, z));
  }
  // Planters with flowers.
  for (const [x, z, w, d] of [[1.2, 5.6, 3.2, 1.4], [13, 24.3, 3, 1.3]]) {
    scene.add(box(w, 0.5, d, mat({ color: 0xa9a294 }), x + w / 2, 0.25, z + d / 2));
    let q = Math.floor(x * 1000 + z);
    const rnd = () => ((q = (q * 16807 + 11) % 2147483647) / 2147483647);
    for (let i = 0; i < 22; i++) {
      const f = new THREE.Mesh(new THREE.IcosahedronGeometry(0.16, 0), mat({ color: [0x5c8f4c, 0xe0506a, 0xf2c94c, 0x5c8f4c][i % 4] }));
      f.position.set(x + 0.3 + rnd() * (w - 0.6), 0.55, z + 0.3 + rnd() * (d - 0.6));
      f.castShadow = true;
      scene.add(f);
    }
  }
  // Lamps: pole, arm and a lit head.
  const heads = [];
  for (const [x, z] of [[5.5, 8.6], [19.8, 8.6]]) {
    scene.add(cyl(0.09, 6, metal, x, 3, z));
    scene.add(box(0.08, 0.08, 1.2, metal, x, 6, z + 0.6));
    const head = box(0.4, 0.15, 0.7, mat({ color: 0x55585e, emissive: evening ? 0xffd28a : 0x000000, emissiveIntensity: evening ? 1.2 : 0 }), x, 5.95, z + 1.2);
    scene.add(head);
    heads.push([x, z + 1.2]);
  }
  // Trees: a trunk and a crown (the generated picture, or a cluster of spheres).
  for (const [x, z, r] of [[27.5, 6.3, 2.3], [25, 25, 1.8]]) {
    scene.add(cyl(0.18, 6, mat({ color: 0x5a4632 }), x, 3, z, 8));
    if (treeT) scene.add(topSprite(treeT, r * 2.3, r * 2.3, x, 6.5, z));
    else {
      for (let i = 0; i < 14; i++) {
        const a = i * 2.4;
        const s = new THREE.Mesh(new THREE.IcosahedronGeometry(r * 0.45, 1), mat({ color: i % 3 ? 0x5c8f4c : 0x7aae62, flatShading: true }));
        s.position.set(x + Math.cos(a) * r * 0.5, 6 + (i % 3) * 0.3, z + Math.sin(a) * r * 0.5);
        s.castShadow = true;
        scene.add(s);
      }
    }
  }
  // Cars: the generated picture lifted to roof height over a dark body, or plain boxes.
  const car = (x, z, heading, color, lights) => {
    const g = new THREE.Group();
    if (carT) {
      // The picture faces left; turn it to face +x.
      g.add(topSprite(carT, 4.4, 2.1, 0, 1.35, 0, Math.PI));
    } else {
      g.add(box(4.4, 0.8, 1.9, mat({ color, metalness: 0.3, roughness: 0.35 }), 0, 0.6, 0));
      g.add(box(2.2, 0.6, 1.6, mat({ color: 0x2c3a4c, metalness: 0.5, roughness: 0.2 }), -0.3, 1.25, 0));
    }
    g.position.set(x, 0, z);
    g.rotation.y = -heading;
    scene.add(g);
    if (lights && evening) {
      for (const side of [-0.6, 0.6]) {
        const sp = new THREE.SpotLight(0xfff0d0, 45, 16, 0.6, 0.6, 1.4);
        sp.position.set(x + Math.cos(heading) * 2.2 - Math.sin(heading) * side, 0.8, z + Math.sin(heading) * 2.2 + Math.cos(heading) * side);
        sp.target.position.set(x + Math.cos(heading) * 7, 0, z + Math.sin(heading) * 7 + side);
        scene.add(sp, sp.target);
        const tail = new THREE.PointLight(0xff2a10, 3, 3, 2);
        tail.position.set(x - Math.cos(heading) * 2.3 - Math.sin(heading) * side, 0.8, z - Math.sin(heading) * 2.3 + Math.cos(heading) * side);
        scene.add(tail);
      }
    }
  };
  car(5.5, 14.3, Math.PI, 0x7f95b0, false);
  car(14, 20.2, 0, 0xd0cdc5, true);
  // People: simple capsules seen from above.
  for (const [x, z, c] of [[4.5, 7.7, 0xf0a43a], [17, 6.4, 0x6a5acd], [4, 25, 0x3f9a6a], [4.9, 25.3, 0xc0504a], [9, 10.3, 0xd6b13c]]) {
    const pmesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.25, 1.1, 4, 8), mat({ color: c }));
    pmesh.position.set(x, 0.85, z);
    pmesh.castShadow = true;
    scene.add(pmesh);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), mat({ color: 0xf3cfa0 }));
    head.position.set(x, 1.65, z);
    head.castShadow = true;
    scene.add(head);
  }

  // Light: sun from the north-west, sky light, and in the evening warm lamps.
  const sun = new THREE.DirectionalLight(evening ? 0x8090c0 : 0xfff1dd, evening ? 0.35 : 3.0);
  sun.position.set(W / 2 - 18, 22, H / 2 - 18);
  sun.target.position.set(W / 2, 0, H / 2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -30;
  sun.shadow.camera.right = 30;
  sun.shadow.camera.top = 30;
  sun.shadow.camera.bottom = -30;
  sun.shadow.bias = -0.0005;
  sun.shadow.radius = 4;
  scene.add(sun, sun.target);
  scene.add(new THREE.HemisphereLight(evening ? 0x4a5a90 : 0xcfe0ff, evening ? 0x2a2a32 : 0x8a7a68, evening ? 0.9 : 1.6));
  if (evening) {
    for (const [x, z] of heads) {
      const pl = new THREE.PointLight(0xffc27a, 22, 13, 1.7);
      pl.position.set(x, 5.6, z);
      pl.castShadow = true;
      pl.shadow.mapSize.set(512, 512);
      scene.add(pl);
    }
    for (const [x, z] of [[2, 4.6], [5, 4.6], [12, 4.6], [15, 4.6], [22, 4.6], [26, 4.6]]) {
      const wl = new THREE.PointLight(0xffc070, 4, 5, 2);
      wl.position.set(x, 2, z + 0.4);
      scene.add(wl);
    }
  }

  renderer.render(scene, cam);
  const url = renderer.domElement.toDataURL('image/png');
  renderer.dispose();
  renderer.forceContextLoss();
  return url;
}
