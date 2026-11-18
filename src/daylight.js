// Day and evening (F-039). The light follows the game clock, so both
// players in co-op later see the same sky. Night proper comes later.

export const CYCLE = 600; // seconds for a whole day and evening

// 0 = full daylight, 1 = full evening.
export function eveningLevel(t) {
  const p = (((t % CYCLE) + CYCLE) % CYCLE) / CYCLE;
  if (p < 0.4) return 0; // day
  if (p < 0.5) return smooth((p - 0.4) / 0.1); // dusk
  if (p < 0.9) return 1; // evening
  return 1 - smooth((p - 0.9) / 0.1); // dawn
}

function smooth(x) {
  return x * x * (3 - 2 * x);
}
