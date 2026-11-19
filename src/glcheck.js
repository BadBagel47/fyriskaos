// When 3D graphics stop working (B-053): the WebGL context is lost, or WebGL
// cannot start at all. The page stops drawing and says so in Swedish. Shared
// by the game and the style test; styled inline so it works on both pages.

export const GL_LOST = '3D-grafiken slutade fungera i webbläsaren. Det kan hjälpa att prova en annan webbläsare, till exempel Chrome.';
export const GL_NONE = '3D-grafiken kunde inte starta i webbläsaren. Det kan hjälpa att prova en annan webbläsare, till exempel Chrome.';

// Three.js needs WebGL 2.
export function webglAvailable() {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

export function showGlMessage(text) {
  let el = document.getElementById('gl-fail');
  if (!el) {
    el = document.createElement('div');
    el.id = 'gl-fail';
    el.setAttribute('role', 'alert');
    el.style.cssText = 'position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;padding:24px;background:#1d1e20f2;color:#f2f1ee;font:18px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;text-align:center';
    const p = document.createElement('p');
    p.style.cssText = 'max-width:520px;margin:0';
    el.appendChild(p);
    document.body.appendChild(el);
  }
  el.firstChild.textContent = text;
  el.hidden = false;
}

// Call onLost (stop drawing) and show the message when the context is lost.
export function watchContext(canvas, onLost) {
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    onLost();
    showGlMessage(GL_LOST);
  });
}
