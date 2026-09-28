/**
 * amp-field.js
 *
 * Homepage background: a family of analyticity contours in the complex
 * Mandelstam t-plane, drawn as a living research-paper figure.
 *
 * Geometry (pinned invariants, see docs/ANIMATION.md):
 *
 *   Every ellipse has its RIGHT FOCUS at t = 0 and its RIGHTMOST EXTREMITY
 *   at t = mu_0 > 0. With the left focus at t = -c_j, the ellipse is
 *
 *       t_j(phi) = -c_j/2
 *                  + (mu_0 + c_j/2) cos(phi)
 *                  + i sqrt(mu_0 (mu_0 + c_j)) sin(phi)
 *
 *   so a_j = mu_0 + c_j/2, b_j = sqrt(mu_0 (mu_0 + c_j)), center = -c_j/2,
 *   focal distance = c_j/2, and t_j(0) = mu_0 for EVERY member. Varying c_j
 *   generates the family; the pins never move.
 *
 * Motion: each ellipse breathes slowly in c_j (the only time dependence),
 * which slides the left focus and reshapes the contour while both pinned
 * invariants hold exactly. One sinusoid per ellipse with period T = 3.6 s
 * makes the loop seamless. There is no cursor interaction and no orbiting
 * marker; the geometry itself is the visual.
 *
 * Single ink color, Canvas 2D, no dependencies. See docs/ANIMATION.md.
 */

const LOOP_MS = 3600;
const TAU = Math.PI * 2;

function cssVar(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function hexToRgb(hex) {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h, 16);
  if (Number.isNaN(n)) return [34, 38, 46];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// Restrained academic palette for the contour family, one hue per ellipse
// (blue, cyan, violet, teal from the innermost outward). Light mode uses
// deep versions at higher opacity so the thin strokes read on the paper
// ground; dark mode slightly luminous ones at low opacity. The axes stay
// neutral ink.
const PALETTES = {
  light: ['#2f538c', '#22677a', '#55449b', '#2b7261'],
  dark: ['#86a8d8', '#7fc4cf', '#a493c9', '#6fb3a6'],
};

export function mountAmpField(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const staticPhase = (() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
        !new URLSearchParams(window.location.search).has('static')) return null;
    const p = parseFloat(new URLSearchParams(window.location.search).get('phase') ?? '0');
    return Math.max(0, Math.min(1, p));
  })();

  let W = 0;
  let H = 0;
  let ink = [34, 38, 46];
  let ellipseColors = [];
  let dark = false;

  function readTheme() {
    ink = hexToRgb(cssVar('--ink', '#22262e'));
    dark = document.documentElement.getAttribute('data-theme') === 'dark';
    const pal = dark ? PALETTES.dark : PALETTES.light;
    ellipseColors = pal.map(hexToRgb);
  }

  function rgba(a) {
    return `rgba(${ink[0]},${ink[1]},${ink[2]},${a})`;
  }

  function rgbaC(rgb, a) {
    return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
  }

  // Layout: the origin (right focus, t = 0) sits right of the hero text;
  // mu_0 is the pixel distance from the origin to the common right
  // extremity; the family is a set of left-focus distances c_j, increasing,
  // so the ellipses grow leftward while sharing the pinned right side.
  let geom = null;

  function layout() {
    const mobile = W < 700;
    const O = { x: W * (mobile ? 0.8 : 0.72), y: H * (mobile ? 0.55 : 0.5) };
    const mu0 = mobile ? Math.min(W * 0.24, H * 0.16) : Math.min(W * 0.12, H * 0.2);
    // c_j grows toward the parabolic limit: e = c/(c + 2 mu_0) runs from 0.2
    // (compact) to 0.88 (nearly parabolic within the visible region).
    const cs = (mobile ? [0.5, 2, 8] : [0.5, 1.5, 4.5, 15]).map((m) => m * mu0);
    // Innermost contour slightly more visible; larger ones progressively
    // softer. Light mode runs at higher opacity (the paper ground is near
    // white), dark mode at low opacity with luminous hues.
    const alphaLight = mobile ? [0.55, 0.52, 0.5] : [0.5, 0.47, 0.45, 0.43];
    const alphaDark = mobile ? [0.24, 0.22, 0.21] : [0.2, 0.19, 0.18, 0.17];
    const family = cs.map((c0, i) => ({
      c0,
      phase: i * 0.9,
      alphaLight: alphaLight[i],
      alphaDark: alphaDark[i],
      color: i,
    }));
    geom = { O, mu0, family };
  }

  // Draw one member of the family. c is the (possibly breathing) left-focus
  // distance in pixels; the right focus and right extremity stay pinned.
  function drawEllipse(c, color, alpha) {
    const { O, mu0 } = geom;
    const a = mu0 + c / 2;
    const b = Math.sqrt(mu0 * (mu0 + c));
    const cx = O.x - c / 2;
    ctx.strokeStyle = rgbaC(color, alpha);
    ctx.lineWidth = 1;
    ctx.beginPath();
    const steps = 160;
    for (let i = 0; i <= steps; i++) {
      const phi = (i / steps) * TAU;
      const x = cx + a * Math.cos(phi);
      const y = O.y - b * Math.sin(phi);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  function render(t) {
    // t in [0, 1): one loop. All motion uses sin/cos(t * TAU).
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;
    const { O, mu0 } = geom;

    // Complex-plane axes through the origin t = 0.
    ctx.strokeStyle = rgba(0.07);
    ctx.beginPath();
    ctx.moveTo(0, O.y + 0.5);
    ctx.lineTo(W, O.y + 0.5);
    ctx.moveTo(O.x + 0.5, 0);
    ctx.lineTo(O.x + 0.5, H);
    ctx.stroke();

    // Origin marker: a small open circle at t = 0.
    ctx.strokeStyle = rgba(0.35);
    ctx.beginPath();
    ctx.arc(O.x, O.y, 2.4, 0, TAU);
    ctx.stroke();

    // Right-extremity tick at t = mu_0 (the pinned edge of every domain).
    ctx.strokeStyle = rgba(0.2);
    ctx.beginPath();
    ctx.moveTo(O.x + mu0 + 0.5, O.y - 4);
    ctx.lineTo(O.x + mu0 + 0.5, O.y + 4);
    ctx.stroke();

    // The family of analyticity contours, breathing in c_j.
    geom.family.forEach((e, i) => {
      const c = e.c0 * (1 + 0.054 * Math.sin(t * TAU + e.phase));
      drawEllipse(c, ellipseColors[i % ellipseColors.length], dark ? e.alphaDark : e.alphaLight);
    });

    // The c -> infinity limit of the family: the parabola with focus t = 0
    // and vertex t = mu_0 (drawn as the faintest reference curve). It crosses
    // the imaginary axis at +-2 mu_0, opening leftward.
    ctx.strokeStyle = rgba(0.06);
    ctx.beginPath();
    const yMax = Math.sqrt(4 * mu0 * (mu0 + O.x + 60));
    for (let dy = -yMax; dy <= yMax; dy += 6) {
      const x = O.x + mu0 - (dy * dy) / (4 * mu0);
      const y = O.y + dy;
      if (dy === -yMax) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // --- lifecycle ------------------------------------------------------------

  let raf = 0;
  let running = false;
  let inView = true;
  let t0 = 0;

  function frame(now) {
    if (!running) return;
    if (!t0) t0 = now;
    const t = ((now - t0) % LOOP_MS) / LOOP_MS;
    render(t);
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || staticPhase !== null) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  const io = new IntersectionObserver((entries) => {
    inView = entries[0]?.isIntersecting ?? true;
    if (inView) start();
    else stop();
  });
  io.observe(canvas);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (inView) start();
  });

  const themeObserver = new MutationObserver(() => {
    readTheme();
    if (staticPhase !== null) render(staticPhase);
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  const ro = new ResizeObserver(() => {
    resize();
    if (staticPhase !== null) render(staticPhase);
  });
  ro.observe(canvas.parentElement);

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = Math.max(320, rect.width);
    H = Math.max(320, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    layout();
  }

  resize();
  readTheme();
  if (staticPhase !== null) {
    render(staticPhase);
  } else {
    start();
  }
}
