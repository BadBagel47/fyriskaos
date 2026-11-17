// Drawing the game with PixiJS in the Sommarkväll+ style (F-037).
// The ground is baked into pictures piece by piece (ground.js); houses,
// lamps and tree crowns lean away from the camera and are drawn each frame;
// vehicles and people use the same drawing code as the graphics gallery.

import { Container, Graphics, RenderTexture, Sprite } from '../vendor/pixi/pixi.min.mjs';
import { COLORS } from './config.js';
import { speedOf } from './sim.js';
import * as A from './art/draw.js';
import * as D from './art/detail.js';
import { PLUS_STYLE } from './art/styles.js';
import { createGround } from './ground.js';

const U = A.U;
const LEAN = A.LEAN;
const STYLE = PLUS_STYLE;
const BAKE_PX = 40; // picture pixels per metre for roofs and tree crowns

D.setDetailDensity(0.35);

// Bake something drawn in metres into a sprite, so it costs nothing per frame.
function bakeSprite(app, draw, x, y, w, h) {
  const g = new Graphics();
  draw(g);
  const holder = new Container();
  holder.addChild(g);
  g.position.set(-x * U, -y * U);
  holder.scale.set(BAKE_PX / U);
  const rt = RenderTexture.create({ width: Math.ceil(w * BAKE_PX), height: Math.ceil(h * BAKE_PX), antialias: true });
  app.renderer.render({ container: holder, target: rt, clear: true });
  holder.destroy({ children: true });
  const sp = new Sprite(rt);
  sp.scale.set(U / BAKE_PX);
  return sp;
}

export function createRenderer(app, game) {
  const map = game.map;
  const world = new Container();
  app.stage.addChild(world);

  const ground = createGround(app, map, STYLE, COLORS.outside);
  world.addChild(ground.layer);

  const skids = new Graphics();
  world.addChild(skids);
  const skidMarks = createSkidMarks(skids);

  // Shadows of moving things: same shape as the body, turned with it, but
  // always offset towards the south-east.
  const shadowLayer = new Container();
  world.addChild(shadowLayer);
  const entityLayer = new Container();
  world.addChild(entityLayer);
  const walls = new Graphics();
  world.addChild(walls);
  const roofLayer = new Container();
  world.addChild(roofLayer);
  const tops = new Graphics();
  world.addChild(tops);
  const crownLayer = new Container();
  world.addChild(crownLayer);

  const views = new Map();
  for (const v of game.vehicles) {
    const view = vehicleView(v);
    views.set(v, view);
    entityLayer.addChild(view.body);
    shadowLayer.addChild(view.shadow);
  }
  const playerView = personView();
  entityLayer.addChild(playerView.body);
  shadowLayer.addChild(playerView.shadow);

  // Roofs are baked once per house (lazily), then only moved with the lean.
  const roofs = new Map();
  function roofOf(b) {
    let sp = roofs.get(b);
    if (!sp) {
      const look = { ...b, facade: STYLE.facades[b.facadeIndex], roofColor: b.roof === 'flat' ? 0x9a978f : STYLE.roofs[b.roofIndex] };
      sp = bakeSprite(app, (g) => A.drawHouseRoofFlat(g, STYLE, look), b.x - 1.5, b.y - 1.5, b.w + 3, b.h + 3);
      sp.userData = { ox: b.x - 1.5, oy: b.y - 1.5 };
      roofLayer.addChild(sp);
      roofs.set(b, sp);
    }
    return sp;
  }

  // A handful of tree crowns, baked once and reused (scaled per tree).
  const crownTextures = [];
  const CROWN_R = 3;
  for (let k = 0; k < 6; k++) {
    const sp = bakeSprite(app, (g) => D.detailedTree(g, STYLE, 0, 0, CROWN_R, 101 + k, { shadow: false }), -CROWN_R - 0.5, -CROWN_R - 0.5, CROWN_R * 2 + 1, CROWN_R * 2 + 1);
    crownTextures.push(sp.texture);
    sp.destroy();
  }
  const crowns = map.trees.map((t, i) => {
    const sp = new Sprite(crownTextures[i % crownTextures.length]);
    sp.anchor.set(0.5);
    const scale = t.canopy / CROWN_R;
    sp.scale.set((U / BAKE_PX) * scale);
    sp.visible = false;
    crownLayer.addChild(sp);
    return sp;
  });

  const cam = { x: game.player.x, y: game.player.y, ppm: 0 };

  function targetPpm() {
    const p = game.player;
    const short = Math.min(app.screen.width, app.screen.height, 420);
    let metres = 17;
    if (p.vehicle) {
      const s = speedOf(p.vehicle);
      metres = p.vehicle.spec.class === 'car' ? 26 + s * 0.85 : 20 + s * 0.6;
    }
    return short / metres;
  }

  function frame(dt) {
    const p = game.player;
    const focus = p.vehicle || p;
    const look = p.vehicle ? 0.7 : 0.25;
    const tx = focus.x + focus.vx * look;
    const ty = focus.y + focus.vy * look;
    const k = 1 - Math.exp(-6 * dt);
    const first = cam.ppm === 0;
    if (first) {
      cam.ppm = targetPpm();
      cam.x = tx;
      cam.y = ty;
    }
    cam.x += (tx - cam.x) * k;
    cam.y += (ty - cam.y) * k;
    cam.ppm += (targetPpm() - cam.ppm) * (1 - Math.exp(-2 * dt));

    let sx = 0;
    let sy = 0;
    if (game.shake > 0) {
      sx = (Math.random() - 0.5) * game.shake * 10;
      sy = (Math.random() - 0.5) * game.shake * 10;
    }
    world.scale.set(cam.ppm / U);
    world.position.set(app.screen.width / 2 - cam.x * cam.ppm + sx, app.screen.height / 2 - cam.y * cam.ppm + sy);

    const halfW = app.screen.width / 2 / cam.ppm + 12;
    const halfH = app.screen.height / 2 / cam.ppm + 12;
    const vis = (x, y, r = 0) => Math.abs(x - cam.x) < halfW + r && Math.abs(y - cam.y) < halfH + r;

    // At the start, make the whole screen at once; then a little per frame.
    ground.update(cam.x, cam.y, halfW + 10, halfH + 10, first ? 99 : 1);

    skidMarks.update(game.vehicles);
    const sun = STYLE.shadow;
    for (const v of game.vehicles) {
      const view = views.get(v);
      const on = vis(v.x, v.y, 3);
      view.body.visible = view.shadow.visible = on;
      if (!on) continue;
      view.body.position.set(v.x * U, v.y * U);
      view.body.rotation = v.heading;
      view.shadow.position.set((v.x + sun.dx * view.lift) * U, (v.y + sun.dy * view.lift) * U);
      view.shadow.rotation = v.heading;
    }

    const inCar = p.vehicle && p.vehicle.spec.class === 'car';
    playerView.body.visible = playerView.shadow.visible = !inCar;
    playerView.body.position.set(p.x * U, p.y * U);
    playerView.body.rotation = p.heading;
    playerView.shadow.position.set((p.x + sun.dx * 0.35) * U, (p.y + sun.dy * 0.35) * U);
    // Knocked over: the figure lies flat and blinks.
    playerView.body.scale.set(p.stun > 0 ? 1.25 : 1, p.stun > 0 ? 0.6 : 1);
    playerView.body.alpha = p.stun > 0 && Math.floor(game.time * 10) % 2 ? 0.55 : 1;
    entityLayer.setChildIndex(playerView.body, entityLayer.children.length - 1);

    // Houses: walls lean each frame, the baked roof just moves.
    walls.clear();
    const list = [];
    for (const b of map.buildings) {
      const sp = roofs.get(b);
      const on = vis(b.x + b.w / 2, b.y + b.h / 2, Math.max(b.w, b.h) / 2);
      if (!on) {
        if (sp) sp.visible = false;
        continue;
      }
      list.push(b);
    }
    list.sort((a, b) => dist2(b, cam) - dist2(a, cam));
    for (const b of list) {
      const look2 = { ...b, facade: STYLE.facades[b.facadeIndex], roofColor: STYLE.roofs[b.roofIndex] };
      A.drawHouseWalls(walls, STYLE, look2, cam);
      const sp = roofOf(b);
      const ox = (b.x + b.w / 2 - cam.x) * LEAN * b.height;
      const oy = (b.y + b.h / 2 - cam.y) * LEAN * b.height;
      sp.position.set((sp.userData.ox + ox) * U, (sp.userData.oy + oy) * U);
      sp.visible = true;
    }
    // Keep roofs in the same far-to-near order as the walls.
    list.forEach((b, i) => roofLayer.setChildIndex(roofs.get(b), Math.min(i, roofLayer.children.length - 1)));

    // Lamps (they lean too) and tree crowns.
    tops.clear();
    for (const l of map.lamps) if (vis(l.x, l.y, 3)) A.drawLamp(tops, STYLE, l.x, l.y, l.ay || 1, cam, l.ax);
    map.trees.forEach((t, i) => {
      const sp = crowns[i];
      const on = vis(t.x, t.y, t.canopy + 2);
      sp.visible = on;
      if (!on) return;
      const h = 7;
      sp.position.set((t.x + (t.x - cam.x) * LEAN * h) * U, (t.y + (t.y - cam.y) * LEAN * h) * U);
    });
  }

  return { frame, cam, ground };
}

function dist2(b, cam) {
  const dx = b.x + b.w / 2 - cam.x;
  const dy = b.y + b.h / 2 - cam.y;
  return dx * dx + dy * dy;
}

// ---------- views ----------

function vehicleView(v) {
  const body = new Container();
  const g = new Graphics();
  A.withoutShadows(() => (v.spec.class === 'car' ? A.drawCar(g, STYLE, v.type, v.color) : A.drawBike(g, STYLE, v.color)));
  body.addChild(g);
  const shadow = new Graphics();
  const s = STYLE.shadow;
  if (v.spec.class === 'car') shadow.roundRect((-v.spec.length / 2) * U, (-v.spec.width / 2) * U, v.spec.length * U, v.spec.width * U, 0.5 * U).fill({ color: s.color, alpha: s.alpha * 1.1 });
  else shadow.roundRect(-0.9 * U, -0.12 * U, 1.8 * U, 0.24 * U, 0.12 * U).fill({ color: s.color, alpha: s.alpha });
  return { body, shadow, lift: v.spec.class === 'car' ? 0.6 : 0.4 };
}

function personView() {
  const body = new Container();
  const g = new Graphics();
  A.withoutShadows(() => A.drawPerson(g, STYLE, { shirt: COLORS.player, ring: true }));
  body.addChild(g);
  const s = STYLE.shadow;
  const shadow = new Graphics().ellipse(0, 0, 0.24 * U, 0.38 * U).fill({ color: s.color, alpha: s.alpha });
  return { body, shadow };
}

// Dark tyre marks where cars slide (F-034).
function createSkidMarks(g) {
  const MAX = 900;
  const marks = [];
  const last = new Map();
  let dirty = false;
  return {
    update(vehicles) {
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
        const wheels = [
          [rx + fy * w, ry - fx * w],
          [rx - fy * w, ry + fx * w],
        ];
        const prev = last.get(v);
        if (prev) {
          for (let i = 0; i < 2; i++) {
            const [ax, ay] = prev[i];
            const [bx, by] = wheels[i];
            if (Math.hypot(bx - ax, by - ay) > 0.05) marks.push(ax, ay, bx, by);
          }
          dirty = true;
        }
        last.set(v, wheels);
      }
      if (marks.length > MAX * 4) {
        marks.splice(0, marks.length - MAX * 4);
        dirty = true;
      }
      if (!dirty) return;
      dirty = false;
      g.clear();
      for (let i = 0; i < marks.length; i += 4) g.moveTo(marks[i] * U, marks[i + 1] * U).lineTo(marks[i + 2] * U, marks[i + 3] * U);
      if (marks.length) g.stroke({ width: 0.28 * U, color: 0x2a2b2e, alpha: 0.45, cap: 'round' });
    },
  };
}
