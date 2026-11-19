// Keep the player visible behind houses (F-042). Everything on the camera
// side of the player is cut away above a slanted plane that runs from just
// above the player towards the camera. The plane passes (almost) through the
// camera, so the cut edges are seen edge-on and the houses read as whole.
// Shadows are drawn without the cut, so the cut-away parts still cast them.

import * as THREE from '../../vendor/three/three.module.js';

// x, z: the player; y: rise per metre towards the camera; w: height above the player.
export const cut = { value: new THREE.Vector4(0, 0, 1.54, 2.6) };

// width: how far to the sides of the player the cut reaches (houses: all the
// way, so the cut is seen edge-on; trees and lamps: only the ones in the way).
export function withCut(material, width = 1e4) {
  const before = material.onBeforeCompile;
  const key = material.customProgramCacheKey ? material.customProgramCacheKey.bind(material) : () => '';
  material.onBeforeCompile = (sh, r) => {
    if (before) before(sh, r);
    sh.uniforms.uCut = cut;
    sh.vertexShader = 'varying vec3 vCutP;\n' + sh.vertexShader.replace(
      '#include <project_vertex>',
      `#include <project_vertex>
      vec4 cutP = vec4(transformed, 1.0);
      #ifdef USE_INSTANCING
        cutP = instanceMatrix * cutP;
      #endif
      vCutP = (modelMatrix * cutP).xyz;`,
    );
    sh.fragmentShader = 'uniform vec4 uCut;\nvarying vec3 vCutP;\n' + sh.fragmentShader.replace(
      'void main() {',
      `void main() {
      float cutD = vCutP.z - uCut.y;
      ${width > 1000
        ? 'if (cutD > 1.2 && vCutP.y > uCut.w + cutD * uCut.z) discard;'
        : // Trees and lamps in the way turn see-through (a fine screen-door pattern) instead of being cut.
          `if (cutD > 0.5 && abs(vCutP.x - uCut.x) < ${width.toFixed(1)} && vCutP.y > uCut.w + cutD * uCut.z - 1.5 && fract(sin(dot(floor(gl_FragCoord.xy), vec2(12.9898, 78.233))) * 43758.5453) < 0.72) discard;`}`,
    );
  };
  material.customProgramCacheKey = () => 'cut' + width + key();
  return material;
}
