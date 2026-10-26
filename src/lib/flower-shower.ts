// A short shower of marigold, rose and jasmine petals as the doors finish opening.
// canvas-confetti is loaded only at that moment, so it never delays the first paint.
const colors = ["#e9a12b", "#f2c14e", "#c2213f", "#d9475f", "#fffaf0"];

export async function showerFlowers() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const { default: confetti } = await import("canvas-confetti");
  const petal = confetti.shapeFromPath({ path: "M6 0C11 5 11 13 6 18C1 13 1 5 6 0Z" });
  const shapes = [petal, petal, "circle" as const];
  const base = {
    colors,
    shapes,
    ticks: 320,
    gravity: 0.55,
    scalar: 1.15,
    drift: 0.2,
    disableForReducedMotion: true,
  };
  // Two garland-thrower bursts from the lower corners…
  confetti({
    ...base,
    particleCount: 55,
    angle: 62,
    spread: 58,
    startVelocity: 48,
    origin: { x: 0, y: 0.92 },
  });
  confetti({
    ...base,
    particleCount: 55,
    angle: 118,
    spread: 58,
    startVelocity: 48,
    origin: { x: 1, y: 0.92 },
  });
  // …then a gentle fall from above for a couple of seconds.
  const end = performance.now() + 2200;
  (function fall() {
    confetti({
      ...base,
      particleCount: 3,
      startVelocity: 0,
      gravity: 0.35,
      ticks: 420,
      origin: { x: Math.random(), y: -0.05 },
    });
    if (performance.now() < end && !document.hidden) requestAnimationFrame(fall);
  })();
}
