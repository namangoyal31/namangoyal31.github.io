# The homepage animation

## What it represents

The Lehmann/Martin analyticity geometry of the current S-matrix research:
partial-wave analyticity in z = cos theta mapped into the complex Mandelstam
t-plane. It is a living version of the nested-ellipse figure used in papers on
the extended analyticity domain.

## The mathematics (verified)

Lehmann ellipse in the z-plane, foci at z = +-1:

    z(phi) = cosh(eta) cos(phi) + i sinh(eta) sin(phi),   0 <= phi < 2 pi

Foci check: semi-axes a = cosh(eta), b = sinh(eta), so
sqrt(a^2 - b^2) = sqrt(cosh^2 - sinh^2) = 1, i.e. foci at z = +-1.

High-energy map from t = 2 k^2 (z - 1) (equivalently z = 1 + t / (2 k^2)):

    t(phi) = 2 k^2 [ cosh(eta) cos(phi) - 1 + i sinh(eta) sin(phi) ]

The image is an ellipse centered at t = -2 k^2 with semi-axes
2 k^2 cosh(eta) (real direction) and 2 k^2 sinh(eta) (imaginary direction),
so its foci are exactly t = 0 and t = -4 k^2. The physical region
z in [-1, 1] maps to the real segment between the foci, which is why that
segment is the emphasized part of the figure.

The figure draws a family of three such ellipses (increasing eta: a domain of
analyticity, the innermost closest to the partial-wave/Lehmann domain, the
outermost suggesting the enlarged domain of Martin's argument). No formula is
invented for a "Martin ellipse": the outer ellipse is simply a larger member
of the same focal family, which is the standard way the enlarged domain is
pictured. Both foci are marked, and a small marker performs analytic
continuation once around the middle ellipse per loop.

## Motion

- Each ellipse breathes by +-3.5 percent in eta with its own phase: a quiet
  suggestion of the domain enlargement.
- The continuation marker traverses the middle ellipse once per loop with a
  short trail.
- All time dependence is sin/cos(t * TAU) with T = 3.6 s (LOOP_MS), so the
  loop is exactly seamless: after one loop every element returns to its
  initial state. There is no cursor interaction; the figure is complete
  without one.

## Technology

Plain Canvas 2D, no libraries, no assets. Source: `src/lib/amp-field.js`,
mounted by a small `<script>` at the bottom of `src/pages/index.astro`. Each
frame is a `clearRect` plus a few low-alpha strokes. Single ink color read
from the `--ink` design token; re-palettes automatically on theme change.

## Static preview and reduced motion

- `prefers-reduced-motion: reduce` renders one static frame (no loop).
- `?static=1` does the same in a normal browser.
- `?static=1&phase=x` renders the static frame at loop phase x in [0, 1)
  (the continuation marker sits at phi = x * 2 pi on the middle ellipse).

## Parameters

All in `src/lib/amp-field.js`:

- `LOOP_MS`: loop length (3.6 s).
- `layout()`: focus positions, scale S (the pixel length of 2 k^2), the
  eta values and alphas of the family, and the compact two-ellipse mobile
  variant below 700 px width.
- Alpha values in `render()`: real axis `0.07`, physical segment `0.2`,
  foci `0.32`, ellipses `0.1-0.16`, trail `0.16`, marker `0.4`.
- Breathing amplitude: the `0.035` factor in `render()`.

## Performance

- One canvas, one rAF loop, no per-frame allocations, DPR capped at 1.5.
- The loop pauses when the hero leaves the viewport (IntersectionObserver) and
  when the tab is hidden (visibilitychange).
- Added weight: ~5 KB of JavaScript, no network requests.
- To disable entirely, remove the `<canvas class="hero-field">` and the
  `<script>` block from `src/pages/index.astro`; nothing else references it.
