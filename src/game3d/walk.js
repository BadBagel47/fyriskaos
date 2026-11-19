// Walking people (B-058). The CC0 people are standing figures whose arms
// and legs are marked per vertex by tools/convert_models.mjs (the fourth byte
// of the normal: 0 body, ±1..60 leg, ±64..124 arm, the sign is the side).
// The vertex shader swings them round the hip and the shoulder and bends the
// knee, so walking is smooth at any speed and costs nothing on the CPU.
// Instanced people (the crowd) take their step from an instance attribute
// `walk` (phase, amount); a single mesh (the player) from the uniform `uWalk`.

import * as THREE from '../../vendor/three/three.module.js';

// Swing of the thigh, the knee and the arm (radians) at amount 1.
const LEG = 0.55;
const KNEE = 0.9;
const ARM = 0.5;

// Geometry from the model file: split the four-byte normal into the normal
// and the limb mark, sharing one buffer.
export function rigGeometry(geo) {
  const n = geo.attributes.normal;
  if (!n || n.itemSize !== 4 || n.isInterleavedBufferAttribute) return geo;
  const ib = new THREE.InterleavedBuffer(n.array, 4);
  geo.setAttribute('normal', new THREE.InterleavedBufferAttribute(ib, 3, 0, true));
  geo.setAttribute('rig', new THREE.InterleavedBufferAttribute(ib, 1, 3, true));
  return geo;
}

const HEAD = `
attribute float rig;
uniform vec4 uRig; // hip, knee, shoulder (metres), figure height
#ifdef USE_INSTANCING
  attribute vec2 walk;
#else
  uniform vec2 uWalk;
#endif
mat2 rigRot(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }
// Turns about the side axis (z), so the limbs swing forwards (+x) and back:
// first the shin round the knee, then the whole limb round the hip or shoulder.
void rigPose(out mat2 m1, out mat2 m2, out vec2 p1, out vec2 p2, out float bob) {
  #ifdef USE_INSTANCING
    vec2 wk = walk;
  #else
    vec2 wk = uWalk;
  #endif
  float a = abs(rig) * 127.0;
  float side = sign(rig);
  bool arm = a > 63.5;
  float w = a < 0.5 ? 0.0 : arm ? (a - 64.0) / 60.0 : a / 60.0;
  float s = sin(wk.x) * side;
  // The thigh swings forward and back; the knee bends while the leg swings forward.
  float leg = ${LEG.toFixed(3)} * wk.y * s * w;
  float knee = -${KNEE.toFixed(3)} * wk.y * max(0.0, cos(wk.x) * side) * w * smoothstep(uRig.y + 0.06, uRig.y - 0.04, position.y);
  float sw = -${ARM.toFixed(3)} * wk.y * s * w;
  m1 = rigRot(arm ? 0.0 : knee);
  m2 = rigRot(arm ? sw : leg);
  p1 = vec2(0.0, uRig.y);
  p2 = vec2(0.0, arm ? uRig.z : uRig.x);
  // The body rises a little when a leg is straight under it.
  bob = 0.03 * wk.y * (abs(cos(wk.x)) - 0.5);
}
`;

function patch(sh) {
  sh.vertexShader = HEAD + sh.vertexShader
    .replace(
      '#include <beginnormal_vertex>',
      `#include <beginnormal_vertex>
      {
        mat2 m1, m2; vec2 p1, p2; float bob;
        rigPose(m1, m2, p1, p2, bob);
        objectNormal.xy = m2 * (m1 * objectNormal.xy);
      }`,
    )
    .replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      {
        mat2 m1, m2; vec2 p1, p2; float bob;
        rigPose(m1, m2, p1, p2, bob);
        transformed.xy = m1 * (transformed.xy - p1) + p1;
        transformed.xy = m2 * (transformed.xy - p2) + p2;
        transformed.y += bob;
      }`,
    );
}

// A material for walking people, made from a base material; `rig` holds the
// joints from the model file ({ h, hip, knee, shoulder } as parts of h).
export function walkMaterial(base, rig, walkUniform) {
  const m = base.clone();
  const uRig = { value: new THREE.Vector4(rig.hip * rig.h, rig.knee * rig.h, rig.shoulder * rig.h, rig.h) };
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uRig = uRig;
    sh.uniforms.uWalk = walkUniform || { value: new THREE.Vector2() };
    patch(sh);
  };
  m.customProgramCacheKey = () => 'walk';
  return m;
}

// The shadow of a walking person walks too.
export function walkDepthMaterial(rig, walkUniform) {
  return walkMaterial(new THREE.MeshDepthMaterial(), rig, walkUniform);
}

// How fast and how far a person steps at a speed (m/s): the phase moves one
// full step pair per stride, longer strides when running.
export function stepRate(speed) {
  const stride = 1.3 + Math.min(1.6, speed * 0.28);
  return (speed / stride) * Math.PI * 2;
}

export function stepAmount(speed) {
  return Math.min(1, speed / 1.4) * (0.75 + 0.25 * Math.min(1, speed / 5));
}
