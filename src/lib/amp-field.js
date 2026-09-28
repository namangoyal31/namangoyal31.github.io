/**
 * amp-field.js
 *
 * Homepage background: the Lehmann/Martin analyticity geometry in the
 * complex Mandelstam t-plane, drawn as a living research-paper figure.
 *
 * The mathematics (verified in docs/ANIMATION.md):
 *
 *   Lehmann ellipse in the z-plane (foci z = +-1):
 *       z(phi) = cosh(eta) cos(phi) + i sinh(eta) sin(phi)
 *
 *   High-energy map to the Mandelstam plane:
 *       t = 2 k^2 (z - 1)
 *
 *   Image ellipse (foci t = 0 and t = -4 k^2, center -2 k^2):
 *       t(phi) = 2 k^2 [ cosh(eta) cos(phi) - 1 + i sinh(eta) sin(phi) ]
 *
 *   Physical region z in [-1, 1] maps to the real segment between the foci.
 *
 * The figure draws a small family of such ellipses (a domain of analyticity,
 * eta increasing), the physical segment between the foci, both foci marked,
 * and one small marker performing analytic continuation once around the
 * middle ellipse per loop. Each ellipse also breathes by a few percent in
 * eta, evoking the enlargement of the analyticity domain (Martin's argument)
 * without inventing any formula. All time dependence is a single sinusoid of
 * period T = 3.6 s, so the loop is exactly seamless.
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

function easeInOut(x) {
  const c = Math.max(0, Math.min(1, x));
  return c * c * (3 - 2 * c);
}

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

  function readTheme() {
    ink = hexToRgb(cssVar('--ink', '#22262e'));
  }

  function rgba(a) {
    return `rgba(${ink[0]},${ink[1]},${ink[2]},${a})`;
  }

  // Geometry of the analyticity domains, in pixels.
  //
  // t = 0 (the right focus) sits right of the hero text; t = -4k^2 lies to
  // its left. S is the pixel length of 2 k^2, so the foci are S*2 apart and
  // an ellipse of parameter eta has semi-axes S*cosh(eta) and S*sinh(eta).
  // The family is ordered by eta: inner = partial-wave (Lehmann) domain,
  // outer = enlarged analyticity domain (Martin's argument).
  let geom = null;

  function layout() {
    const mobile = W < 700;
    const fociRight = { x: W * (mobile ? 0.8 : 0.74), y: H * (mobile ? 0.66 : 0.58) };
    const S = mobile ? Math.min(W * 0.22, H * 0.15) : Math.min(W * 0.1, H * 0.21);
    const family = mobile
      ? [
          { eta: 0.7, alpha: 0.1, phase: 0.0 },
          { eta: 1.3, alpha: 0.14, phase: 1.1 },
        ]
      : [
          { eta: 0.65, alpha: 0.1, phase: 0.0 },
          { eta: 0.95, alpha: 0.13, phase: 0.8 },
          { eta: 1.3, alpha: 0.16, phase: 1.6 },
        ];
    geom = { fociRight, S, family, fociLeft: { x: fociRight.x - 2 * S, y: fociRight.y } };
  }

  // t-plane point of the ellipse with parameter eta at angle phi, around the
  // ellipse center (-2k^2 in t; (fociRight.x - S, fociRight.y) in pixels).
  function ellipsePoint(eta, phi) {
    const c = geom.fociRight.x - geom.S;
    const a = geom.S * Math.cosh(eta);
    const b = geom.S * Math.sinh(eta);
    return { x: c + a * Math.cos(phi), y: geom.fociRight.y - b * Math.sin(phi) };
  }

  function drawEllipse(eta, alpha) {
    ctx.strokeStyle = rgba(alpha);
    ctx.lineWidth = 1;
    ctx.beginPath();
    const steps = 160;
    for (let i = 0; i <= steps; i++) {
      const phi = (i / steps) * TAU;
      const p = ellipsePoint(eta, phi);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  function render(t) {
    // t in [0, 1): one loop. All motion uses sin/cos(t * TAU).
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;
    const { fociRight, fociLeft } = geom;

    // Real-t axis through both foci.
    ctx.strokeStyle = rgba(0.07);
    ctx.beginPath();
    ctx.moveTo(0, fociRight.y + 0.5);
    ctx.lineTo(W, fociRight.y + 0.5);
    ctx.stroke();

    // Physical region: the real segment between the foci, t in [-4k^2, 0].
    ctx.strokeStyle = rgba(0.2);
    ctx.beginPath();
    ctx.moveTo(fociLeft.x + 0.5, fociRight.y);
    ctx.lineTo(fociRight.x - 0.5, fociRight.y);
    ctx.stroke();

    // Foci markers: small precise ticks, slightly stronger than the lines.
    ctx.strokeStyle = rgba(0.32);
    for (const f of [fociRight, fociLeft]) {
      ctx.beginPath();
      ctx.moveTo(f.x + 0.5, f.y - 4);
      ctx.lineTo(f.x + 0.5, f.y + 4);
      ctx.stroke();
    }

    // The family of analyticity domains, each breathing by a few percent in
    // eta with its own phase (the Martin-enlargement motif).
    for (const e of geom.family) {
      drawEllipse(e.eta * (1 + 0.035 * Math.sin(t * TAU + e.phase)), e.alpha);
    }

    // Analytic continuation marker: one traversal of the middle ellipse per
    // loop, with a short fading trail along the just-covered arc.
    const mid = geom.family.length > 1 ? geom.family[1] : geom.family[0];
    const phi = t * TAU;
    const trail = 0.85;
    ctx.strokeStyle = rgba(0.16);
    ctx.beginPath();
    for (let i = 0; i <= 24; i++) {
      const p = ellipsePoint(mid.eta, phi - trail + (i / 24) * trail);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    const head = ellipsePoint(mid.eta, phi);
    ctx.strokeStyle = rgba(0.4);
    ctx.beginPath();
    ctx.arc(head.x, head.y, 2.4, 0, TAU);
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
