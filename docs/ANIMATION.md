# The homepage animation

## What it represents

A quiet figure of the analytic structure of a scattering amplitude in the
complexified Mandelstam plane. The canvas draws:

- a faint coordinate grid with real/imaginary axes through the origin,
- three **resonance poles** (crossed-circle markers) with breathing halos,
- a short dashed **branch cut** on the real axis with a threshold branch point,
- two nested **analytic continuation contours** encircling the poles, deforming
  smoothly and returning exactly to their starting shape,
- faint curved **Regge trajectories** drifting across the plane.

All motion is a sum of sine/cosine terms with a common period, so the animation is
exactly seamless: after one loop (3.6 s) every element returns to its initial
configuration with no jump. Motion amplitudes are small (a few pixels) and all strokes
are low-alpha, so the typography stays dominant.

## Technology

Plain Canvas 2D, no libraries, no WebGL, no assets. Source: `src/lib/amp-field.js`,
mounted by a small `<script>` at the bottom of `src/pages/index.astro`. Each frame is a
`clearRect` followed by low-alpha strokes; there is no accumulation buffering, so
memory use is constant.

## Interaction

The cursor acts as a soft probe: a Gaussian perturbation of at most ~4 px on the
contour and ~2 px on the Regge lines, eased in and out so the response is continuous.
With no cursor (touch devices, or a still hand) the figure looks complete on its own.

## Loop

`LOOP_MS = 3600`. Time enters only as `sin(t * TAU + phase)` terms, so the loop closes
by construction. To change the tempo, edit `LOOP_MS`; to change the intensity, edit the
`0.03`/`0.018` deformation amplitudes in `drawContour` and the `4`/`3` px drift of the
contour center.

## Parameters

All in `src/lib/amp-field.js`:

- `POLES` / `THRESHOLD`: positions as canvas fractions.
- `contourRadius()`: base shape of the contour (the `cos(2θ)`/`cos(3θ)` terms).
- `drawRegge()`: the `slopes` array and line offsets.
- alpha values in each `draw*` function control prominence (grid `0.05`, contour
  `0.3`, markers `0.38`).
- `110` (Gaussian sigma) and `4` (max displacement) in `perturb()` control the cursor.

## Reduced motion and static fallback

`prefers-reduced-motion: reduce`, or loading the page with `?static=1`, renders a
single static frame at a fixed loop phase and starts no animation loop. Theme changes
and resizes still redraw the static frame.

## Performance

- One canvas, one rAF loop, no per-frame allocations, DPR capped at 1.5.
- The loop pauses when the hero leaves the viewport (IntersectionObserver) and when
  the tab is hidden (visibilitychange).
- Added weight: ~5 KB of JavaScript, no network requests.
- To disable entirely, remove the `<canvas class="hero-field">` and the `<script>`
  block from `src/pages/index.astro`; nothing else references it.
