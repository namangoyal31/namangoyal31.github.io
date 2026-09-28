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

// The contour family is drawn in the site accent (a single warm yellow)
// with descending opacity: one deliberate accent, no rainbow.

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
  let accent = [242, 201, 76];

  // familyShift: position within the family (0 = the drawn set, 1 = deeper
  // into it, left focus further out). Dragging the figure sweeps this one
  // genuine parameter of the family; the pins hold for every value.

  function readTheme() {
    ink = hexToRgb(cssVar('--ink', '#eae8e1'));
    accent = hexToRgb(cssVar('--accent', '#f2c94c'));
  }

  function rgba(a) {
    return `rgba(${ink[0]},${ink[1]},${ink[2]},${a})`;
  }

  function rgbaA(a) {
    return `rgba(${accent[0]},${accent[1]},${accent[2]},${a})`;
  }

  // Layout: the origin (right focus, t = 0) sits right of the hero text;
  // mu_0 is the pixel distance from the origin to the common right
  // extremity; the family is a set of left-focus distances c_j, increasing,
  // so the ellipses grow leftward while sharing the pinned right side.
  let geom = null;

  function layout() {
    const mobile = W < 700;
    const O = { x: W * 0.68, y: H * 0.54 };
    const mu0 = Math.min(W * 0.16, H * 0.22);
    // c_j grows toward the parabolic limit: e = c/(c + 2 mu_0) runs from 0.2
    // (compact) to 0.88 (nearly parabolic within the visible region).
    const cs = (mobile ? [0.5, 2, 8] : [0.5, 1.5, 4.5, 15]).map((m) => m * mu0);
    // Innermost contour most visible; larger ones progressively softer.
    const alphas = mobile ? [0.5, 0.42, 0.36] : [0.5, 0.42, 0.36, 0.3];
    const family = cs.map((c0, i) => ({ c0, phase: i * 0.9, alpha: alphas[i] }));
    geom = { O, mu0, family };
  }

  // Draw one member of the family. c is the (possibly breathing) left-focus
  // distance in pixels; the right focus and right extremity stay pinned.
  function drawEllipse(c, alpha) {
    const { O, mu0 } = geom;
    const a = mu0 + c / 2;
    const b = Math.sqrt(mu0 * (mu0 + c));
    const cx = O.x - c / 2;
    ctx.strokeStyle = rgbaA(alpha);
    ctx.lineWidth = 1;
    ctx.beginPath();
    const steps = 160;
    for (let i = 0; i <= steps; i++) {
      const phi = (i / steps) * TAU;
      let x = cx + a * Math.cos(phi);
      let y = O.y - b * Math.sin(phi);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  function render(t, open) {
    // t in [0, 1): one loop. All motion uses sin/cos(t * TAU).
    // open: 0..1 with page scroll; the analyticity domain enlarges as the
    // visitor reads. Both pins still hold because a, b, center derive from c.
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
    ctx.strokeStyle = rgbaA(0.5);
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
    for (const e of geom.family) {
      const c = e.c0 * Math.pow(3, familyShift) * (1 + 0.054 * Math.sin(t * TAU + e.phase) + open);
      drawEllipse(c, e.alpha);
    }

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
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / max));
    familyShift += (shiftTarget - familyShift) * 0.08;
    render(t, 0.12 * progress);
    // the figure recedes gently once its section has been read
    const heroH = canvas.parentElement.offsetHeight || 1;
    canvas.style.opacity = String(Math.max(0, Math.min(1, 1 - window.scrollY / (heroH * 0.9))));
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

  // Interaction: dragging horizontally sweeps the family parameter (the
  // left-focus distance c_j, here scaled by up to 3x) - the actual quantity
  // that generates the domains. Double-click returns to the drawn set.
  let dragging = false;
  let dragX = 0;
  let dragStart = 0;
  let familyShift = 0;
  let shiftTarget = 0;
  canvas.addEventListener('pointerdown', (e) => {
    dragging = true;
    dragX = e.clientX;
    dragStart = shiftTarget;
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const rect = canvas.getBoundingClientRect();
    shiftTarget = Math.max(0, Math.min(1, dragStart + (e.clientX - dragX) / (rect.width * 0.6)));
  });
  const endDrag = () => {
    dragging = false;
  };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  canvas.addEventListener('dblclick', () => {
    shiftTarget = 0;
  });
  canvas.ampReset = () => {
    shiftTarget = 0;
  };

  resize();
  readTheme();
  if (staticPhase !== null) {
    familyShift = shiftTarget = staticPhase;
    render(staticPhase, 0);
  } else {
    start();
  }
}
