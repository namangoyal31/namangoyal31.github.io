# The homepage animation

## What it represents

A family of analyticity contours in the complex Mandelstam t-plane, drawn as a
living research-paper figure: nested ellipses sharing a pinned right focus and
a pinned right extremity, evoking domains of analyticity in t of the kind used
in Lehmann/Martin-type arguments.

## The mathematics (verified)

Every ellipse has its right focus fixed at the origin, F_R = 0, and its
rightmost extremity fixed at t = mu_0 > 0. With the left focus at t = -c_j
(c_j > 0), the required semi-axes are

    a_j = mu_0 + c_j/2
    b_j = sqrt(mu_0 (mu_0 + c_j))  =  sqrt(a_j^2 - (c_j/2)^2)

because the focal distance is sqrt(a_j^2 - b_j^2) = c_j/2. The center is at
-c_j/2, and the parametrization is

    t_j(phi) = -c_j/2
               + (mu_0 + c_j/2) cos(phi)
               + i sqrt(mu_0 (mu_0 + c_j)) sin(phi).

Two invariants follow immediately for every member of the family:

    t_j(0) = mu_0          (right extremity, pinned)
    foci at 0 and -c_j     (right focus, pinned)

Varying c_j slides the left focus and reshapes the contour while both pins
hold. The code draws four members (three on small screens) with increasing
c_j, so the family reads as related analyticity domains rather than arbitrary
ellipses. Both coordinate axes are drawn through the origin t = 0, with a
small origin marker and a tick at t = mu_0.

## Motion

The only time dependence is a slow breathing of each c_j:

    c_j(t) = c_j0 * (1 + 0.04 * sin(t * TAU + phase_j)),   T = 3.6 s

which slides the left focus and reshapes the contour while the pins hold
exactly (a_j, b_j, and the center are recomputed from c_j every frame, so
t_j(0) = mu_0 and F_R = 0 are preserved identically). One sinusoid per
ellipse with period T makes the loop seamless. There is no orbiting marker
and no cursor interaction.

## Technology

Plain Canvas 2D, no libraries, no assets. Source: `src/lib/amp-field.js`,
mounted by a small `<script>` at the bottom of `src/pages/index.astro`. Each
frame is a `clearRect` plus a few low-alpha strokes. Single ink color read
from the `--ink` design token; re-palettes automatically on theme change.

## Static preview and reduced motion

- `prefers-reduced-motion: reduce` renders one static frame (no loop).
- `?static=1` does the same in a normal browser.
- `?static=1&phase=x` renders the static frame at loop phase x in [0, 1)
  (the breathing offsets correspond to that phase).

## Parameters

All in `src/lib/amp-field.js`:

- `LOOP_MS`: loop length (3.6 s).
- `layout()`: origin position, mu_0 (pixel distance to the pinned right
  extremity), the list of c_j multipliers, per-ellipse phases and alphas, and
  the compact three-ellipse mobile variant below 700 px width.
- Alpha values in `render()`: axes `0.07`, origin marker `0.35`, mu_0 tick
  `0.2`, ellipses `0.1-0.16`.
- Breathing amplitude: the `0.04` factor in `render()`.

## Performance

- One canvas, one rAF loop, no per-frame allocations, DPR capped at 1.5.
- The loop pauses when the hero leaves the viewport (IntersectionObserver) and
  when the tab is hidden (visibilitychange).
- Added weight: ~5 KB of JavaScript, no network requests.
- To disable entirely, remove the `<canvas class="hero-field">` and the
  `<script>` block from `src/pages/index.astro`; nothing else references it.
