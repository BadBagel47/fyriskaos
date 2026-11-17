// The DOM layer on top of the game: buttons, speed and messages.

export function createHud(els) {
  let toastTimer = 0;
  let lastLabel = undefined;
  return {
    update(game, label, dt) {
      if (label !== lastLabel) {
        lastLabel = label;
        els.action.hidden = !label;
        if (label) els.action.textContent = label;
      }
      const v = game.player.vehicle;
      els.brake.hidden = !v;
      els.speed.hidden = !v;
      if (v) els.speed.textContent = `${Math.round(Math.hypot(v.vx, v.vy) * 3.6)} km/h`;
      if (toastTimer > 0) {
        toastTimer -= dt;
        if (toastTimer <= 0) els.toast.hidden = true;
      }
    },
    toast(text) {
      els.toast.textContent = text;
      els.toast.hidden = false;
      toastTimer = 2.5;
    },
  };
}
