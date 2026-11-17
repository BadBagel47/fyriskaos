// Touch joystick, buttons and keyboard, combined into one input state.

const JOY_RADIUS = 60; // px the knob can travel

export function createInput(els) {
  const input = {
    stick: { x: 0, y: 0, m: 0 },
    brake: false,
    enabled: false,
    actionQueued: false,
    consumeAction() {
      const a = this.actionQueued;
      this.actionQueued = false;
      return a && this.enabled;
    },
  };

  // ---------- keyboard ----------
  const keys = new Set();
  const keyVector = () => {
    let x = 0;
    let y = 0;
    if (keys.has('ArrowLeft') || keys.has('KeyA')) x -= 1;
    if (keys.has('ArrowRight') || keys.has('KeyD')) x += 1;
    if (keys.has('ArrowUp') || keys.has('KeyW')) y -= 1;
    if (keys.has('ArrowDown') || keys.has('KeyS')) y += 1;
    const m = Math.hypot(x, y);
    return m ? { x: x / m, y: y / m, m: 1 } : null;
  };
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code.startsWith('Arrow')) e.preventDefault();
    if (!e.repeat && (e.code === 'KeyE' || e.code === 'Enter')) input.actionQueued = true;
    keys.add(e.code);
  });
  window.addEventListener('keyup', (e) => keys.delete(e.code));
  window.addEventListener('blur', () => keys.clear());

  // ---------- touch / mouse joystick ----------
  let joyId = null;
  let ox = 0;
  let oy = 0;
  let joy = { x: 0, y: 0, m: 0 };

  const showJoy = (kx, ky) => {
    els.joy.hidden = false;
    els.joy.style.transform = `translate(${ox}px, ${oy}px)`;
    els.knob.style.transform = `translate(${kx}px, ${ky}px)`;
  };

  els.surface.addEventListener('pointerdown', (e) => {
    if (joyId !== null) return;
    if (e.pointerType !== 'mouse' && e.clientX > window.innerWidth * 0.6) return;
    joyId = e.pointerId;
    ox = e.clientX;
    oy = e.clientY;
    joy = { x: 0, y: 0, m: 0 };
    els.surface.setPointerCapture?.(e.pointerId);
    showJoy(0, 0);
    e.preventDefault();
  });
  els.surface.addEventListener('pointermove', (e) => {
    if (e.pointerId !== joyId) return;
    let dx = e.clientX - ox;
    let dy = e.clientY - oy;
    const d = Math.hypot(dx, dy);
    if (d > JOY_RADIUS) {
      // The stick follows the thumb, so it never runs out of room.
      ox += (dx / d) * (d - JOY_RADIUS);
      oy += (dy / d) * (d - JOY_RADIUS);
      dx = e.clientX - ox;
      dy = e.clientY - oy;
    }
    const m = Math.min(1, Math.hypot(dx, dy) / JOY_RADIUS);
    joy = m > 0 ? { x: (dx / JOY_RADIUS), y: (dy / JOY_RADIUS), m } : { x: 0, y: 0, m: 0 };
    showJoy(dx, dy);
  });
  const endJoy = (e) => {
    if (e.pointerId !== joyId) return;
    joyId = null;
    joy = { x: 0, y: 0, m: 0 };
    els.joy.hidden = true;
  };
  els.surface.addEventListener('pointerup', endJoy);
  els.surface.addEventListener('pointercancel', endJoy);

  // ---------- buttons ----------
  els.action.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    input.actionQueued = true;
  });
  const brakeOn = (e) => {
    e.preventDefault();
    els.brake.classList.add('down');
    brakeTouch = true;
  };
  const brakeOff = () => {
    els.brake.classList.remove('down');
    brakeTouch = false;
  };
  let brakeTouch = false;
  els.brake.addEventListener('pointerdown', brakeOn);
  els.brake.addEventListener('pointerup', brakeOff);
  els.brake.addEventListener('pointercancel', brakeOff);
  els.brake.addEventListener('pointerleave', brakeOff);

  // Block the page from scrolling, zooming or opening menus while playing.
  for (const ev of ['touchstart', 'touchmove', 'gesturestart', 'contextmenu'])
    document.addEventListener(ev, (e) => e.target.closest?.('.overlay') || e.preventDefault(), { passive: false });

  input.update = () => {
    const k = keyVector();
    input.stick = input.enabled ? k || joy : { x: 0, y: 0, m: 0 };
    input.brake = input.enabled && (brakeTouch || keys.has('Space'));
  };
  return input;
}
