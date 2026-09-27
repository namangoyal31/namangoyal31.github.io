/**
 * amp-field.js
 *
 * Homepage background: the analytic structure of a scattering amplitude in the
 * complexified Mandelstam plane, drawn as a quiet mathematical figure.
 *
 * Elements (see docs/ANIMATION.md):
 *   - faint coordinate grid + real/imaginary axes
 *   - resonance poles (crossed-circle markers) with breathing halos
 *   - a short branch cut on the real axis near a threshold point
 *   - two nested analytic continuation contours encircling the poles,
 *     deforming smoothly and returning to their start (seamless loop)
 *   - faint Regge trajectories drifting across the plane
 *
 * All time dependence is a sum of sin/cos terms with period T, so the loop is
 * exactly seamless. Pure Canvas 2D, no dependencies, no accumulation fills:
 * every frame is a clearRect followed by low-alpha strokes.
 */

const TAU = Math.PI * 2;
const LOOP_MS = 3600;

function cssVar(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function hexToRgb(hex) {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h, 16);
  if (Number.isNaN(n)) return [30, 78, 140];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function mountAmpField(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const staticMode =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    new URLSearchParams(window.location.search).has('static');

  let W = 0;
  let H = 0;

  // Palette (re-read on theme change).
  let accent = [30, 78, 140];
  let ink = [34, 38, 46];

  // Cursor probe: eased position + strength. The perturbation it causes is a
  // few pixels at most, so the figure reads as complete without a cursor.
  const probe = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, s: 0, ts: 0, inside: false };

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
  }

  // Complex-plane geometry. Origin sits slightly left of center so the
  // composition breathes under the right-aligned hero motif area.
  function origin() {
    return { x: W * 0.42, y: H * 0.5 };
  }

  // Resonance poles (fractions of canvas size).
  const POLES = [
    { fx: 0.30, fy: 0.32 },
    { fx: 0.55, fy: 0.66 },
    { fx: 0.72, fy: 0.30 },
  ];
  const THRESHOLD = { fx: 0.62, fy: 0.5 }; // branch point on the real axis

  function polePos(p) {
    return { x: p.fx * W, y: p.fy * H };
  }

  // Cursor perturbation at a point: a gentle push away from the probe with
  // Gaussian falloff, clamped to a few pixels.
  function perturb(x, y, out) {
    const dx = x - probe.x;
    const dy = y - probe.y;
    const d2 = dx * dx + dy * dy;
    const g = probe.s * Math.exp(-d2 / (2 * 110 * 110));
    const inv = 1 / Math.max(40, Math.sqrt(d2));
    out.x = 4 * g * dx * inv;
    out.y = 4 * g * dy * inv;
    return out;
  }

  const tmp = { x: 0, y: 0 };

  function drawGrid(t) {
    const o = origin();
    const g = Math.max(64, Math.min(104, W / 14));
    ctx.strokeStyle = rgba(ink, 0.05);
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = o.x % g; x < W; x += g) {
      ctx.moveTo(Math.round(x) + 0.5, 0);
      ctx.lineTo(Math.round(x) + 0.5, H);
    }
    for (let y = o.y % g; y < H; y += g) {
      ctx.moveTo(0, Math.round(y) + 0.5);
      ctx.lineTo(W, Math.round(y) + 0.5);
    }
    ctx.stroke();

    // Real / imaginary axes through the origin.
    ctx.strokeStyle = rgba(ink, 0.09);
    ctx.beginPath();
    ctx.moveTo(0, o.y + 0.5);
    ctx.lineTo(W, o.y + 0.5);
    ctx.moveTo(o.x + 0.5, 0);
    ctx.lineTo(o.x + 0.5, H);
    ctx.stroke();
  }

  // Faint curved Regge trajectories: nearly straight, slowly breathing lines.
  function drawRegge(t) {
    const o = origin();
    ctx.strokeStyle = rgba(accent, 0.08);
    ctx.lineWidth = 1;
    const slopes = [0.32, 0.44, 0.56];
    for (let i = 0; i < slopes.length; i++) {
      const phase = t * TAU + i * 2.1;
      const b = o.y - slopes[i] * (W * 0.42) + 8 * Math.sin(phase) - i * 46;
      ctx.beginPath();
      for (let x = -20; x <= W + 20; x += 24) {
        const y = b - slopes[i] * x + (x * x) / (W * W) * 26 * Math.sin(phase * 0.7);
        const [px, py] = perturbed(x, y, t, 2);
        if (x === -20) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
  }

  // Apply a tiny cursor perturbation to a raw point.
  function perturbed(x, y, t, max) {
    perturb(x, y, tmp);
    return [x + tmp.x * (max / 4), y + tmp.y * (max / 4)];
  }

  // The analytic continuation contour: a smooth closed curve encircling two
  // poles. Radius r(theta, t) is a small Fourier sum in theta whose time terms
  // all have period T, so the loop closes exactly.
  function contourRadius(th) {
    return 1 + 0.12 * Math.cos(2 * th - 0.6) + 0.06 * Math.cos(3 * th + 1.2);
  }

  function drawContour(t) {
    const o = origin();
    // Center drifts once around a tiny ellipse per loop.
    const cx = o.x + W * 0.06 + 4 * Math.sin(t * TAU);
    const cy = o.y - H * 0.06 + 3 * Math.sin(t * TAU + 1.1);
    const R = Math.min(W, H) * 0.21;
    const steps = 140;

    ctx.strokeStyle = rgba(accent, 0.3);
    ctx.lineWidth = 1.25;
    drawOne(R);
    ctx.strokeStyle = rgba(accent, 0.13);
    ctx.lineWidth = 1;
    drawOne(R * 1.3);

    function drawOne(radius) {
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const th = (i / steps) * TAU;
        const r = radius * contourRadius(th) *
          (1 + 0.03 * Math.sin(3 * th + t * TAU) + 0.018 * Math.sin(5 * th - t * TAU - 1.3));
        const x = cx + r * Math.cos(th);
        const y = cy + r * 0.82 * Math.sin(th);
        const [px, py] = perturbed(x, y, t, 4);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }

  function drawPoles(t) {
    ctx.strokeStyle = rgba(ink, 0.38);
    ctx.lineWidth = 1;
    for (const p of POLES) {
      const { x, y } = polePos(p);
      const breathe = 1.5 * Math.sin(t * TAU + x);
      const r = 4.5;
      // halo
      ctx.strokeStyle = rgba(accent, 0.09);
      ctx.beginPath();
      ctx.arc(x, y, 14 + breathe, 0, TAU);
      ctx.stroke();
      // marker
      ctx.strokeStyle = rgba(ink, 0.38);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, TAU);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - r * 0.68, y - r * 0.68);
      ctx.lineTo(x + r * 0.68, y + r * 0.68);
      ctx.moveTo(x + r * 0.68, y - r * 0.68);
      ctx.lineTo(x - r * 0.68, y + r * 0.68);
      ctx.stroke();
    }
    // threshold branch point on the real axis + short cut segment
    const o = origin();
    const bxp = THRESHOLD.fx * W;
    ctx.strokeStyle = rgba(ink, 0.2);
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(bxp - 58, o.y + 0.5);
    ctx.lineTo(bxp + 58, o.y + 0.5);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = rgba(ink, 0.45);
    ctx.beginPath();
    ctx.arc(bxp, o.y, 2.2, 0, TAU);
    ctx.fill();
  }

  function rgba(rgb, a) {
    return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
  }

  function readTheme() {
    accent = hexToRgb(cssVar('--accent', '#1e4e8c'));
    ink = hexToRgb(cssVar('--ink', '#22262e'));
  }

  function render(t) {
    // t is in loops (one full loop = 1.0); all motion uses t * TAU.
    ctx.clearRect(0, 0, W, H);
    drawGrid(t);
    drawRegge(t);
    drawContour(t);
    drawPoles(t);
  }

  // --- pointer coupling (tiny, eased) --------------------------------------

  function onMove(e) {
    const rect = canvas.getBoundingClientRect();
    probe.tx = e.clientX - rect.left;
    probe.ty = e.clientY - rect.top;
    probe.inside = true;
    probe.ts = 1;
  }
  function onLeave() {
    probe.inside = false;
    probe.ts = 0;
  }

  // --- lifecycle ------------------------------------------------------------

  let raf = 0;
  let running = false;
  let inView = true;
  let t0 = 0;

  function frame(now) {
    if (!running) return;
    if (!t0) t0 = now;
    const t = ((now - t0) % LOOP_MS) / LOOP_MS; // loops; seamless by construction
    probe.x += (probe.tx - probe.x) * 0.06;
    probe.y += (probe.ty - probe.y) * 0.06;
    probe.s += (probe.ts - probe.s) * 0.05;
    render(t);
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || staticMode) return;
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

  window.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerleave', onLeave);

  const themeObserver = new MutationObserver(() => {
    readTheme();
    if (staticMode) render(0.25);
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  const ro = new ResizeObserver(() => {
    resize();
    if (staticMode) render(0.25);
  });
  ro.observe(canvas.parentElement);

  resize();
  readTheme();
  if (staticMode) {
    render(0.25);
  } else {
    start();
  }
}
