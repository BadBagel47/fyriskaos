// Moving things in the 3D game (F-042): cars, bikes and the player, plus
// tyre marks. One small group of meshes per vehicle, sharing geometry; the
// renderer's frustum culling skips the ones out of view.

import * as THREE from '../../vendor/three/three.module.js';
import { Builder, m4 } from '../stiltest/geo.js';
import * as P3 from '../stiltest/props3.js';
import { carParts, MODELS } from '../stiltest/rich.js';
import * as L from '../stiltest/look.js';
import { people, getLoaded } from './models.js';

const CAR_MODEL = { small: ['hatch'], car: ['sedan', 'estate', 'sedan'], sport: ['sport'] };

export function createEntities(game, mats) {
  const group = new THREE.Group();
  const parts = {};
  // One glossy material for every car and bike; colours are baked into each
  // vehicle's own merged geometry, so a car is one draw call (F-042).
  const carMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.34, metalness: 0.35, envMapIntensity: 1.4 });
  const merged = (list) => {
    const n = list.reduce((s, [g]) => s + (g.index ? g.index.count : g.attributes.position.count), 0);
    const pos = new Float32Array(n * 3);
    const nor = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    let o = 0;
    const c = new THREE.Color();
    for (const [g0, colour] of list) {
      const g = g0.index ? g0.toNonIndexed() : g0;
      const P = g.attributes.position;
      const N = g.attributes.normal;
      const C = g.attributes.color;
      if (colour != null) c.set(colour);
      for (let i = 0; i < P.count; i++, o++) {
        pos.set([P.getX(i), P.getY(i), P.getZ(i)], o * 3);
        const nx = N.getX(i), ny = N.getY(i), nz = N.getZ(i);
        const l = Math.hypot(nx, ny, nz) || 1;
        nor.set([nx / l, ny / l, nz / l], o * 3);
        if (colour != null) col.set([c.r, c.g, c.b], o * 3);
        else col.set([C.getX(i), C.getY(i), C.getZ(i)], o * 3);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.computeBoundingSphere();
    return g;
  };
  const geoCache = new Map();
  const cached = (key, make) => geoCache.get(key) || geoCache.set(key, make()).get(key);
  const bikeGeo = new Map();
  const bikeOf = (color) => {
    let g = bikeGeo.get(color);
    if (!g) {
      const B = new Builder();
      P3.addBike(B, m4(0, 0, 0), color);
      bikeGeo.set(color, (g = B.build({ outline: false })));
    }
    return g;
  };

  const views = new Map();
  const shadeGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2).translate(0, 0.02, 0);
  const shadeMat = new THREE.MeshBasicMaterial({ map: L.shadeTex(), transparent: true, depthWrite: false, opacity: 0.8 });
  const policeLights = [];
  const bodyOf = (v) => {
    if (v.police) {
      // Police car (D-036: "POLIS", own blue and white, no real emblem).
      const p = (parts.sedan ||= carParts('sedan'));
      const box = (w, h, d, x, y, z, c) => [new THREE.BoxGeometry(w, h, d).translate(x, y, z), c];
      const geo = cached('police', () => merged([[p.paint, 0xf4f4f2], [p.glass, 0x1d2633], [p.det, null], box(4.0, 0.22, 1.86, 0, 0.62, 0, 0x1f4fae), box(0.5, 0.06, 1.2, -0.3, 1.6, 0, 0x2a2a2e)]));
      const m = new THREE.Mesh(geo, carMat);
      m.castShadow = true;
      const g = new THREE.Group();
      g.add(m);
      const bar = [0x2a6bff, 0xff3030].map((c, i) => {
        const l = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.16, 0.5), new THREE.MeshBasicMaterial({ color: c }));
        l.position.set(-0.3, 1.7, i ? 0.32 : -0.32);
        g.add(l);
        return l;
      });
      policeLights.push([v, bar]);
      return g;
    }
    if (v.spec.class === 'car') {
      const list = CAR_MODEL[v.type] || CAR_MODEL.car;
      const name = list[Math.abs(hash(v.id)) % list.length];
      const p = (parts[name] ||= carParts(name));
      const geo = cached(`${name}:${v.color}`, () => merged([[p.paint, v.color], [p.glass, 0x1d2633], [p.det, null]]));
      const m = new THREE.Mesh(geo, carMat);
      m.scale.set(v.spec.length / MODELS[name].L, 1, (v.spec.width / 1.8) * 0.98);
      m.castShadow = true;
      m.receiveShadow = true;
      return m;
    }
    // B-056: the code-built city bike (thick frame, basket) reads as a bike
    // from the tilted camera; the thin CC0 frames looked like lines on the ground.
    const m = new THREE.Mesh(bikeOf(v.color), mats.solid);
    m.scale.setScalar(1.2);
    m.castShadow = true;
    const g = new THREE.Group();
    g.add(m);
    const shade = new THREE.Mesh(shadeGeo, shadeMat);
    shade.scale.set(2.4, 1, 0.9);
    g.add(shade);
    return g;
  };
  for (const v of game.vehicles) {
    const root = new THREE.Group();
    root.add(bodyOf(v));
    group.add(root);
    views.set(v, root);
  }

  // The player: a CC0 figure when the models are there, otherwise the
  // code-built person. Walking swaps between a few poses.
  const player = new THREE.Group();
  let poses = [];
  const setPoses = () => {
    for (const p of poses) player.remove(p);
    poses = people.player(mats);
    for (const p of poses) {
      p.visible = false;
      p.castShadow = true;
      player.add(p);
    }
  };
  setPoses();
  group.add(player);
  player.scale.setScalar(1.25); // B-056: a little larger than everyone else
  const ring = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.6).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: L.ringTex(), color: 0xffb040, transparent: true, depthWrite: false, opacity: 1 }));
  // A marker over the player's head, seen through everything.
  const marker = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.8, 4).rotateX(Math.PI), new THREE.MeshBasicMaterial({ color: 0xffa020, depthTest: false, transparent: true, opacity: 0.95 }));
  marker.renderOrder = 10;
  group.add(marker);
  // The way to the target (F-023): an arrow round the player and a light pillar at the target.
  const arrowShape = new THREE.Shape([[0, 1.2], [0.75, 0], [0.28, 0.1], [0.28, -0.9], [-0.28, -0.9], [-0.28, 0.1], [-0.75, 0]].map(([x, y]) => new THREE.Vector2(x, y)));
  const arrow = new THREE.Mesh(new THREE.ShapeGeometry(arrowShape).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xffb020, depthTest: false, transparent: true, opacity: 0.92 }));
  arrow.renderOrder = 9;
  group.add(arrow);
  const pillar = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 40, 16, 1, true), new THREE.MeshBasicMaterial({ color: 0xffc040, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
  group.add(pillar);
  const crowd = createCrowd(group, game, mats);
  ring.renderOrder = 2;
  group.add(ring);

  const skids = createSkidMarks();
  group.add(skids.mesh);

  // Head and tail lights for the player's vehicle in the evening.
  const glowTex = L.glowTex();
  const glowMat = (c) => new THREE.MeshBasicMaterial({ map: glowTex, color: c, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
  const beams = [0, 1].map(() => new THREE.Mesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), glowMat(0xffe2a8)));
  const tails = [0, 1].map(() => new THREE.Mesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), glowMat(0xff3020)));
  for (const b of [...beams, ...tails]) {
    b.renderOrder = 3;
    b.visible = false;
    group.add(b);
  }

  let walk = 0;
  function update(dt, night) {
    // Only vehicles that move need a new place (most stand parked).
    for (const [v, root] of views) {
      if (root.userData.x === v.x && root.userData.y === v.y && root.userData.h === v.heading) continue;
      root.position.set(v.x, 0.14, v.y);
      root.rotation.y = -v.heading;
      root.userData.x = v.x;
      root.userData.y = v.y;
      root.userData.h = v.heading;
    }
    const p = game.player;
    const veh = p.vehicle;
    const inCar = veh && veh.spec.class === 'car';
    player.visible = !inCar;
    const speed = Math.hypot(p.vx, p.vy);
    walk += dt * speed * 2.2;
    const onBike = veh && veh.spec.class === 'bike';
    const k = onBike ? poses.length - 1 : speed > 0.4 ? 1 + (Math.floor(walk) % (poses.length - 2)) : 0;
    poses.forEach((m, i) => (m.visible = i === Math.min(k, poses.length - 1)));
    const at = veh || p;
    player.position.set(at.x, onBike ? 0.14 + 0.35 : 0.14, at.y);
    player.rotation.y = -(veh ? veh.heading : p.heading);
    // Knocked over: lie flat and blink.
    if (p.stun > 0) {
      player.rotation.z = Math.PI / 2.4;
      player.visible = Math.floor(game.time * 10) % 2 === 0;
    } else player.rotation.z = 0;
    ring.visible = !inCar;
    ring.position.set(at.x, 0.16, at.y);
    const pulse = 1 + 0.12 * Math.sin(game.time * 5);
    ring.scale.set(pulse, 1, pulse);
    marker.position.set(at.x, (inCar ? 3.2 : 3.0) + 0.2 * Math.sin(game.time * 4), at.y);
    marker.rotation.y = game.time * 2;
    const st = game.play;
    const tgt = st && st.target;
    arrow.visible = pillar.visible = !!tgt;
    if (tgt) {
      const a = Math.atan2(tgt.y - at.y, tgt.x - at.x);
      const r = inCar ? 4.2 : 2.4;
      arrow.position.set(at.x + Math.cos(a) * r, 0.5, at.y + Math.sin(a) * r);
      arrow.rotation.y = -a - Math.PI / 2;
      arrow.scale.setScalar(inCar ? 1.5 : 1.1);
      pillar.position.set(tgt.x, 20, tgt.y);
      pillar.material.opacity = 0.25 + 0.12 * Math.sin(game.time * 3);
    }
    // Blue lights on police cars that are after you.
    for (const [v, bar] of policeLights) {
      const on = !!v.ai;
      const k = Math.floor(game.time * 6) % 2;
      bar[0].visible = on ? k === 0 : true;
      bar[1].visible = on ? k === 1 : true;
      bar[0].material.color.setHex(on ? 0x3a7bff : 0x1f3f8f);
      bar[1].material.color.setHex(on ? 0xff3a3a : 0x8f1f1f);
    }
    crowd.update(game.play ? game.play.peds : []);
    skids.update(game.vehicles);
    const showLights = veh && night > 0.05;
    for (const b of [...beams, ...tails]) b.visible = !!showLights;
    if (showLights) {
      const fx = Math.cos(veh.heading);
      const fy = Math.sin(veh.heading);
      const Lh = veh.spec.length / 2;
      const car = veh.spec.class === 'car';
      [-0.55, 0.55].forEach((side, i) => {
        const len = car ? 11 : 5;
        const bx = veh.x + fx * (Lh + len / 2) - fy * side * (car ? 1 : 0);
        const by = veh.y + fy * (Lh + len / 2) + fx * side * (car ? 1 : 0);
        beams[i].position.set(bx, 0.17, by);
        beams[i].rotation.y = -veh.heading;
        beams[i].scale.set(len, 1, car ? 3.2 : 2.2);
        beams[i].material.opacity = 0.5 * night;
        beams[i].visible = car || i === 0;
        tails[i].position.set(veh.x - fx * Lh - fy * side, 0.17, veh.y - fy * Lh + fx * side);
        tails[i].scale.set(1.4, 1, 1.4);
        tails[i].material.opacity = (game.braking ? 0.9 : 0.55) * night;
        tails[i].visible = car;
      });
    }
  }
  // The CC0 bikes and figure arrive after the start (D-048).
  function upgrade() {
    setPoses();
    crowd.load();
  }
  return { group, update, views, upgrade };
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

// Dark tyre marks where cars slide (F-034): thin quads in a ring buffer.
function createSkidMarks() {
  const MAX = 1200;
  const geo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
  const mat = new THREE.MeshBasicMaterial({ color: 0x1a1b1e, transparent: true, opacity: 0.5, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 });
  const mesh = new THREE.InstancedMesh(geo, mat, MAX);
  mesh.count = 0;
  mesh.frustumCulled = false;
  mesh.renderOrder = 1;
  let next = 0;
  const last = new Map();
  const mm = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  return {
    mesh,
    update(vehicles) {
      let changed = false;
      for (const v of vehicles) {
        if (v.spec.class !== 'car') continue;
        const fx = Math.cos(v.heading);
        const fy = Math.sin(v.heading);
        const lateral = Math.abs(-v.vx * fy + v.vy * fx);
        const sliding = (v.handbrake && Math.hypot(v.vx, v.vy) > 3) || lateral > 2.5;
        if (!sliding) {
          last.delete(v);
          continue;
        }
        const rx = v.x - fx * v.spec.length * 0.32;
        const ry = v.y - fy * v.spec.length * 0.32;
        const w = v.spec.width * 0.4;
        const wheels = [[rx + fy * w, ry - fx * w], [rx - fy * w, ry + fx * w]];
        const prev = last.get(v);
        if (prev)
          for (let i = 0; i < 2; i++) {
            const [ax, ay] = prev[i];
            const [bx, by] = wheels[i];
            const len = Math.hypot(bx - ax, by - ay);
            if (len < 0.05) continue;
            q.setFromAxisAngle(up, -Math.atan2(by - ay, bx - ax));
            mm.compose(new THREE.Vector3((ax + bx) / 2, 0.145, (ay + by) / 2), q, new THREE.Vector3(len + 0.1, 1, 0.26));
            mesh.setMatrixAt(next, mm);
            next = (next + 1) % MAX;
            mesh.count = Math.min(MAX, mesh.count + 1);
            changed = true;
          }
        last.set(v, wheels);
      }
      if (changed) mesh.instanceMatrix.needsUpdate = true;
    },
  };
}

// Pedestrians (D-057): instanced CC0 people (man and woman, walking and
// standing), each with its own shirt colour. Shown when the models have loaded.
function createCrowd(group, game, mats) {
  const MAX = 40;
  let sets = null; // [kind*2 + stand] -> { body, shirt }
  const shirtMat = new THREE.MeshStandardMaterial({ roughness: 0.8 });
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const one = new THREE.Vector3(1, 1, 1);
  const c = new THREE.Color();
  return {
    load() {
      const names = ['ped_male_walk', 'ped_male_stand', 'ped_female_walk', 'ped_female_stand'];
      const got = names.map((n) => getLoaded(n));
      if (got.some((g) => !g)) return;
      sets = got.map((parts) => {
        const mk = (p, mat) => {
          const im = new THREE.InstancedMesh(p.geo, mat, MAX);
          im.count = 0;
          im.castShadow = true;
          im.frustumCulled = false;
          group.add(im);
          return im;
        };
        const body = parts.find((p) => p.mat === 'vc');
        const shirt = parts.find((p) => p.mat === 'shirt');
        const sh = shirt ? mk(shirt, shirtMat) : null;
        if (sh) sh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(MAX * 3).fill(1), 3);
        return { body: mk(body, mats.solid), shirt: sh };
      });
    },
    update(peds) {
      if (!sets) return;
      for (const s of sets) {
        s.body.count = 0;
        if (s.shirt) s.shirt.count = 0;
      }
      for (const p of peds) {
        const s = sets[p.kind * 2 + (p.stand || p.down > 0 ? 1 : 0)];
        const i = s.body.count;
        if (i >= MAX) continue;
        const bob = p.stand || p.down > 0 ? 0 : Math.abs(Math.sin(game.time * 7 + p.x)) * 0.05;
        e.set(p.down > 0 ? Math.PI / 2 : 0, -p.heading, 0, 'YXZ');
        q.setFromEuler(e);
        m.compose(new THREE.Vector3(p.x, 0.14 + bob + (p.down > 0 ? 0.3 : 0), p.y), q, one);
        s.body.setMatrixAt(i, m);
        s.body.count = i + 1;
        if (s.shirt) {
          s.shirt.setMatrixAt(i, m);
          s.shirt.setColorAt(i, c.setHex(p.shirt));
          s.shirt.count = i + 1;
        }
      }
      for (const s of sets) {
        s.body.instanceMatrix.needsUpdate = true;
        if (s.shirt) {
          s.shirt.instanceMatrix.needsUpdate = true;
          if (s.shirt.instanceColor) s.shirt.instanceColor.needsUpdate = true;
        }
      }
    },
  };
}
