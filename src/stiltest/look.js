// Materials and small textures for the richer look (D-044): picture
// textures mapped by world position (no hand-made UVs needed), drawn decals
// for shade, stains and light pools, and a soft sky for reflections.

import * as THREE from '../../vendor/three/three.module.js';

const loader = new THREE.TextureLoader();

export function loadTexture(url) {
  return new Promise((resolve) => {
    loader.load(url, (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.anisotropy = 4;
      resolve(t);
    }, undefined, () => resolve(null));
  });
}

// A standard material whose picture is laid on by world position: from above
// for floors and roofs, from the front or side for walls. One texture read.
// With triplanar: true the picture is blended from all three directions, so
// round shapes (tree crowns, hedges) are not smeared; it costs three reads.
export function worldMapped(map, metresPerTile, opts = {}) {
  const { triplanar = false, vary = 0, ...rest } = opts;
  const m = new THREE.MeshStandardMaterial({ map, roughness: 0.9, metalness: 0, ...rest });
  const scale = { value: 1 / metresPerTile };
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uvScale = scale;
    sh.vertexShader = 'varying vec3 vWP;\nvarying vec3 vWN;\n' + sh.vertexShader.replace(
      '#include <worldpos_vertex>',
      `#include <worldpos_vertex>
      vec4 wpos = vec4(transformed, 1.0);
      #ifdef USE_INSTANCING
        wpos = instanceMatrix * wpos;
      #endif
      wpos = modelMatrix * wpos;
      vWP = wpos.xyz;
      vec3 wn = objectNormal;
      #ifdef USE_INSTANCING
        wn = mat3(instanceMatrix) * wn;
      #endif
      vWN = normalize(mat3(modelMatrix) * wn);`,
    );
    sh.fragmentShader = 'uniform float uvScale;\nvarying vec3 vWP;\nvarying vec3 vWN;\n' + sh.fragmentShader.replace(
      '#include <map_fragment>',
      triplanar
        ? `vec3 tw = pow(abs(vWN), vec3(4.0));
      tw /= (tw.x + tw.y + tw.z);
      vec4 sampledDiffuseColor = texture2D(map, vWP.zy * uvScale) * tw.x + texture2D(map, vWP.xz * uvScale) * tw.y + texture2D(map, vWP.xy * uvScale) * tw.z;
      diffuseColor *= sampledDiffuseColor;`
        : `vec3 an = abs(vWN);
      vec2 wuv = an.y > max(an.x, an.z) ? vWP.xz : (an.x > an.z ? vWP.zy : vWP.xy);
      vec4 sampledDiffuseColor = texture2D(map, wuv * uvScale);
      ${vary > 0 ? `// Break up repetition: a second, larger and turned sample of the same picture
      // and a soft brightness wave across the surface.
      vec2 ruv = mat2(0.8, -0.6, 0.6, 0.8) * wuv * uvScale * 0.31 + 0.37;
      float big = dot(texture2D(map, ruv).rgb, vec3(0.333));
      float wave = 0.5 + 0.5 * sin(wuv.x * 0.21 + sin(wuv.y * 0.17) * 2.0) * sin(wuv.y * 0.13 + 1.3);
      sampledDiffuseColor.rgb *= mix(1.0, (0.75 + big * 0.6) * (0.88 + wave * 0.24), ${vary.toFixed(2)});` : ''}
      diffuseColor *= sampledDiffuseColor;`,
    );
  };
  m.customProgramCacheKey = () => `wm${metresPerTile}${triplanar}${vary}`;
  return m;
}

function canvasTex(size, draw) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  draw(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Soft dark blob for shade under trees and cars and at the foot of walls.
export const shadeTex = () => canvasTex(128, (g, s) => {
  const gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  gr.addColorStop(0, 'rgba(0,0,0,0.7)');
  gr.addColorStop(0.55, 'rgba(0,0,0,0.38)');
  gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr;
  g.fillRect(0, 0, s, s);
});

// A dark band that fades upwards: shade along the foot of a wall.
export const wallShadeTex = () => canvasTex(64, (g, s) => {
  const gr = g.createLinearGradient(0, 0, 0, s);
  gr.addColorStop(0, 'rgba(0,0,0,0.5)');
  gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr;
  g.fillRect(0, 0, s, s);
});

// Warm light pool for street lamps (added on top).
export const glowTex = () => canvasTex(128, (g, s) => {
  const gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  gr.addColorStop(0, 'rgba(255,220,160,1)');
  gr.addColorStop(0.35, 'rgba(255,190,120,0.45)');
  gr.addColorStop(1, 'rgba(255,170,90,0)');
  g.fillStyle = gr;
  g.fillRect(0, 0, s, s);
});

// Oil stains and wear spots on asphalt.
export const stainTex = () => canvasTex(128, (g, s) => {
  let q = 7;
  const r = () => ((q = (q * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 14; i++) {
    const x = s / 2 + (r() - 0.5) * s * 0.5;
    const y = s / 2 + (r() - 0.5) * s * 0.5;
    const rad = s * (0.08 + r() * 0.18);
    const gr = g.createRadialGradient(x, y, 0, x, y, rad);
    gr.addColorStop(0, 'rgba(10,10,12,0.22)');
    gr.addColorStop(1, 'rgba(10,10,12,0)');
    g.fillStyle = gr;
    g.fillRect(0, 0, s, s);
  }
});

// Zebra paint: mostly whole, a little worn at the edges.
export const zebraTex = () => canvasTex(128, (g, s) => {
  g.fillStyle = 'rgba(244,241,232,0.96)';
  g.fillRect(0, 0, s, s);
  let q = 5;
  const r = () => ((q = (q * 16807) % 2147483647) / 2147483647);
  g.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 18; i++) {
    g.fillStyle = `rgba(0,0,0,${0.2 + r() * 0.4})`;
    g.beginPath();
    g.arc(r() * s, r() < 0.5 ? r() * 14 : s - r() * 14, 2 + r() * 6, 0, Math.PI * 2);
    g.fill();
  }
});

// A darker repaired patch of asphalt with a seam.
export const patchTex = () => canvasTex(128, (g, s) => {
  g.fillStyle = 'rgba(25,25,28,0.45)';
  g.fillRect(8, 8, s - 16, s - 16);
  g.strokeStyle = 'rgba(15,15,18,0.6)';
  g.lineWidth = 3;
  g.strokeRect(8, 8, s - 16, s - 16);
});

// Tyre tracks: two soft dark bands.
export const trackTex = () => canvasTex(64, (g, s) => {
  for (const y of [s * 0.25, s * 0.75]) {
    const gr = g.createLinearGradient(0, y - 10, 0, y + 10);
    gr.addColorStop(0, 'rgba(0,0,0,0)');
    gr.addColorStop(0.5, 'rgba(0,0,0,0.35)');
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr;
    g.fillRect(0, y - 10, s, 20);
  }
});

// A soft white streak: the shine of sky on car paint and glass.
export const shineTex = () => canvasTex(64, (g, s) => {
  const gr = g.createLinearGradient(0, 0, s, 0);
  gr.addColorStop(0, 'rgba(255,255,255,0)');
  gr.addColorStop(0.5, 'rgba(255,250,240,0.85)');
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr;
  g.fillRect(0, 0, s, s);
});

// Worn road paint: white with gaps where tyres have rubbed it away.
export const paintTex = () => canvasTex(128, (g, s) => {
  g.fillStyle = 'rgba(242,239,230,0.95)';
  g.fillRect(0, 0, s, s);
  let q = 11;
  const r = () => ((q = (q * 16807) % 2147483647) / 2147483647);
  g.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 70; i++) {
    g.fillStyle = `rgba(0,0,0,${0.25 + r() * 0.6})`;
    g.beginPath();
    g.arc(r() * s, r() * s, 2 + r() * 9, 0, Math.PI * 2);
    g.fill();
  }
});

// Manhole cover and drain grate, drawn.
export const manholeTex = () => canvasTex(128, (g, s) => {
  g.fillStyle = '#3c3d40';
  g.beginPath();
  g.arc(s / 2, s / 2, s * 0.48, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = '#55575c';
  g.lineWidth = 3;
  for (let r = 10; r < s * 0.45; r += 9) {
    g.beginPath();
    g.arc(s / 2, s / 2, r, 0, Math.PI * 2);
    g.stroke();
  }
  g.strokeStyle = '#2a2b2e';
  g.lineWidth = 4;
  g.beginPath();
  g.arc(s / 2, s / 2, s * 0.47, 0, Math.PI * 2);
  g.stroke();
});

export const grateTex = () => canvasTex(64, (g, s) => {
  g.fillStyle = '#2f3033';
  g.fillRect(0, 0, s, s);
  g.fillStyle = '#121214';
  for (let x = 6; x < s - 4; x += 8) g.fillRect(x, 6, 4, s - 12);
});

// White ring under the player, so the figure is found at once.
export const ringTex = () => canvasTex(128, (g, s) => {
  g.strokeStyle = 'rgba(255,255,255,1)';
  g.lineWidth = 12;
  g.beginPath();
  g.arc(s / 2, s / 2, s * 0.42, 0, Math.PI * 2);
  g.stroke();
  g.fillStyle = 'rgba(255,200,120,0.28)';
  g.beginPath();
  g.arc(s / 2, s / 2, s * 0.38, 0, Math.PI * 2);
  g.fill();
});

// A warm evening sky as a reflection map, so glass and car paint shine.
export function eveningEnvironment(renderer) {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 128;
  const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, 128);
  gr.addColorStop(0, '#5f86c0');
  gr.addColorStop(0.42, '#bcc9d8');
  gr.addColorStop(0.5, '#ffd39a');
  gr.addColorStop(0.56, '#8a7766');
  gr.addColorStop(1, '#2b2724');
  g.fillStyle = gr;
  g.fillRect(0, 0, 256, 128);
  // The low sun to the west.
  const sun = g.createRadialGradient(64, 60, 0, 64, 60, 30);
  sun.addColorStop(0, 'rgba(255,240,200,1)');
  sun.addColorStop(1, 'rgba(255,200,120,0)');
  g.fillStyle = sun;
  g.fillRect(0, 0, 256, 128);
  const t = new THREE.CanvasTexture(c);
  t.mapping = THREE.EquirectangularReflectionMapping;
  t.colorSpace = THREE.SRGBColorSpace;
  const pm = new THREE.PMREMGenerator(renderer);
  const env = pm.fromEquirectangular(t).texture;
  pm.dispose();
  t.dispose();
  return env;
}
