// Driving-model checks without a browser (F-033, F-034).
// Usage: node tests/driving.mjs

import { buildTestMap } from '../src/map.js';
import { createGame, step, wrapAngle } from '../src/sim.js';
import { STEP } from '../src/config.js';

let failed = 0;
const check = (ok, msg) => {
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${msg}`);
  if (!ok) failed++;
};

// An empty field, so nothing gets in the way.
function field(type) {
  const map = buildTestMap(1);
  map.buildings = [];
  map.water = [];
  map.trees = [];
  map.spawns.cars = [{ x: 60, y: 200, heading: 0, type, color: 0 }];
  map.spawns.bikes = [];
  map.spawns.player = { x: 60, y: 198.4, heading: 0 };
  const game = createGame(map);
  const input = { stick: { x: 0, y: 0, m: 0 }, brake: false, action: true, consumeAction() { const a = this.action; this.action = false; return a; } };
  step(game, input, STEP); // get in
  return { game, input, car: game.player.vehicle };
}

function run(ctx, seconds, stick, brake = false) {
  ctx.input.stick = stick;
  ctx.input.brake = brake;
  for (let t = 0; t < seconds; t += STEP) step(ctx.game, ctx.input, STEP);
}
const speed = (v) => Math.hypot(v.vx, v.vy);
// Up is forward (F-040): y = -1 is full throttle, x steers.
const ahead = { x: 0, y: -1, m: 1 };
const aheadRight = { x: 1, y: -1, m: 1.4 };
const back = { x: 0, y: 1, m: 1 };

// Top speed and acceleration per type.
const results = {};
for (const type of ['small', 'car', 'sport']) {
  const ctx = field(type);
  check(ctx.car && ctx.car.type === type, `got into the ${type}`);
  run(ctx, 1.5, ahead);
  const at3 = speed(ctx.car);
  run(ctx, 14, ahead);
  results[type] = { at3, top: speed(ctx.car) };
  console.log(`     ${type}: ${(at3 * 3.6).toFixed(0)} km/h after 1.5 s, top ${(results[type].top * 3.6).toFixed(0)} km/h`);
}
check(results.small.top < results.car.top && results.car.top < results.sport.top, 'small < car < sport in top speed');
check(results.car.top * 3.6 > 85 && results.car.top * 3.6 < 95, 'ordinary car about 90 km/h');
check(results.sport.top * 3.6 > 112 && results.sport.top * 3.6 < 125, 'sports car about 120 km/h');
check(results.sport.at3 > results.car.at3 * 1.2, 'sports car pulls away faster');

// A 90-degree corner from 70 km/h: with and without the handbrake.
function corner(handbrake) {
  const ctx = field('car');
  run(ctx, 10, ahead);
  ctx.car.vx = 19.5; // 70 km/h, straight east
  ctx.car.vy = 0;
  ctx.car.heading = 0;
  const x0 = ctx.car.x;
  let t = 0;
  ctx.input.stick = aheadRight;
  ctx.input.brake = handbrake;
  let slid = false;
  // Like a player: hold the brake through the turn, let go when lined up,
  // and count until the car is really heading south.
  while (t < 5) {
    const h = wrapAngle(ctx.car.heading);
    const dir = Math.atan2(ctx.car.vy, ctx.car.vx);
    if (h > Math.PI / 2 - 0.25) ctx.input.brake = false;
    if (h > Math.PI / 2 - 0.1 && dir > Math.PI / 2 - 0.25) break;
    step(ctx.game, ctx.input, STEP);
    slid ||= ctx.car.handbrake;
    t += STEP;
  }
  return { t, overshoot: ctx.car.x - x0, speed: speed(ctx.car), slid };
}
const plain = corner(false);
const hb = corner(true);
console.log(`     plain: ${plain.t.toFixed(2)} s, ${plain.overshoot.toFixed(1)} m wide, ${(plain.speed * 3.6).toFixed(0)} km/h out`);
console.log(`     handbrake: ${hb.t.toFixed(2)} s, ${hb.overshoot.toFixed(1)} m wide, ${(hb.speed * 3.6).toFixed(0)} km/h out`);
check(hb.slid, 'handbrake makes the rear let go');
check(hb.t < plain.t * 0.85, 'handbrake turns the car round quicker');
check(hb.overshoot < plain.overshoot * 0.8, 'handbrake takes the corner tighter');
check(hb.speed > 8, 'handbrake keeps some speed (not a full stop)');

// Braking straight is still a normal stop.
{
  const ctx = field('car');
  run(ctx, 4, ahead);
  run(ctx, 2, ahead, true);
  check(speed(ctx.car) < 0.5, 'brake while going straight stops the car');
}

// Pulling down brakes, then reverses; steering right turns clockwise.
{
  const ctx = field('car');
  run(ctx, 3, ahead);
  const before = speed(ctx.car);
  run(ctx, 0.8, back);
  check(speed(ctx.car) < before - 5, 'pulling down brakes');
  run(ctx, 3, back);
  const fx = Math.cos(ctx.car.heading);
  const vF = ctx.car.vx * fx + ctx.car.vy * Math.sin(ctx.car.heading);
  check(vF < -2, 'keeping it down reverses');
  const ctx2 = field('car');
  run(ctx2, 1, ahead);
  run(ctx2, 1, { x: 1, y: -1, m: 1.4 });
  check(ctx2.car.heading > 0.3, 'stick right turns the car to the right');
  const ctx3 = field('car');
  run(ctx3, 1, { x: 1, y: 0, m: 1 });
  check(speed(ctx3.car) < 0.1, 'only sideways does not move a standing car');
}

if (failed) {
  console.log(`${failed} failed`);
  process.exit(1);
}
console.log('OK: driving model');
