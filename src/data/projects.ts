import { site } from './site';

/**
 * Research areas, in the order the Research page presents them.
 */
export const areas = [
  { id: 'qft', title: 'Quantum Field Theory and Scattering Amplitudes' },
  { id: 'gravitation', title: 'Gravitation and General Relativity' },
  { id: 'particle', title: 'Particle Physics and Vacuum Stability' },
] as const;

export type AreaId = (typeof areas)[number]['id'];

/**
 * Research projects, ordered by prominence (current first) within each area.
 *
 * To add a project: append an entry here and rebuild. `experimental: true`
 * keeps it in the clearly-separated experimental section rather than the
 * main theoretical narrative.
 */
export interface Project {
  id: string;
  title: string;
  shortTitle?: string;
  area?: AreaId;
  period: string;
  status: 'current' | 'completed';
  mentors?: string;
  place?: string;
  tags: string[];
  /** One-to-two-sentence card text. */
  summary: string;
  /** Longer paragraphs for the research page. */
  body: string[];
  links?: { label: string; href: string }[];
  /** `id` of the resulting entry in publications.ts. */
  publication?: string;
  experimental?: boolean;
}

export const projects: Project[] = [
  {
    id: 's-matrix-bootstrap',
    area: 'qft',
    title: 'Scattering Amplitudes and S-Matrix Bootstrap',
    shortTitle: 'S-Matrix Bootstrap',
    period: 'May 2026 – Present',
    status: 'current',
    mentors: 'Prof. Rick Sandeepan Gupta (TIFR)',
    place: 'TIFR, Mumbai',
    tags: ['Scattering amplitudes', 'Analyticity', 'Crossing symmetry', 'Unitarity', 'Regge behavior', 'Polynomial boundedness'],
    summary:
      'Investigating whether the uniqueness of dual-resonance scattering amplitudes can be established directly from analyticity, crossing symmetry, unitarity, and Regge behavior, without auxiliary assumptions on their zero distribution. In parallel, I study polynomial boundedness, positivity constraints, and the analytic structure of amplitudes in the complexified Mandelstam plane, drawing on modern developments in the S-matrix bootstrap.',
    body: [
      'My current work, at TIFR with Prof. Rick Sandeepan Gupta, concerns an old question: what fixes scattering amplitudes? The dual-resonance (Veneziano-type) amplitudes are uniquely simple objects, but is that uniqueness derivable or assumed? Concretely, can it be established directly from the physical principles of analyticity, crossing symmetry, unitarity, and Regge behavior, without auxiliary assumptions about the distribution of zeros of the amplitude?',
      'In parallel, I am studying polynomial boundedness, positivity constraints, and the analytic structure of scattering amplitudes in the complexified Mandelstam plane, drawing on modern developments in the S-matrix bootstrap program. The project is ongoing; this description will grow as results do.',
    ],
    links: [],
  },
  {
    id: 'pseudo-newtonian',
    area: 'gravitation',
    title: 'Tests of General Relativity in Pseudo-Newtonian Framework',
    shortTitle: 'Pseudo-Newtonian Tests of GR',
    period: 'Jan 2024 – May 2026',
    status: 'completed',
    mentors: 'Prof. Banibrata Mukhopadhyay (IISc)',
    place: 'IISc, Bengaluru',
    tags: ['Classical tests of GR', 'Pseudo-Newtonian potentials', 'Analytical derivations', 'Python'],
    summary:
      'Derived analytical expressions for perihelion precession, gravitational redshift, and gravitational lensing in several pseudo-Newtonian potentials, benchmarked them against Schwarzschild general relativity with a Python numerical framework, and identified the regimes in which each potential succeeds. No single potential reproduces all three relativistic effects simultaneously.',
    body: [
      'Pseudo-Newtonian potentials replace the Newtonian $-GM/r$ with an effective potential that mimics selected relativistic effects while keeping Newtonian equations of motion. They are workhorses of accretion-disk astrophysics, but their fidelity had not been systematically benchmarked against the classic tests of GR. With Prof. Banibrata Mukhopadhyay at IISc, I derived analytical expressions for perihelion precession, gravitational redshift, and gravitational lensing in several such potentials: Paczyński–Wiita, an amended Artemova–Björnsson–Novikov form, and the Mukhopadhyay potential for rotating sources. The parameter $\\beta$ of the ABN form is fixed to the spin in the original proposal; here it is treated as free, with $\\beta = 2$ recovering Paczyński–Wiita and $\\beta = 0$ Newtonian gravity. Each potential was compared against exact Schwarzschild and Kerr predictions.',
      'A Python framework handled the numerical analysis and visualization: orbits, redshift curves, and photon deflection angles integrated with high-precision adaptive methods (RK45 via SciPy) across parameter regimes. The findings are sharp. With suitable parameters the pseudo-Newtonian approach reproduces the perihelion advance of Mercury ($\\beta = 3.125$ gives the exact GR value) and gravitational redshift ($\\beta = 0.5$ matches GR), but different parameters are needed for each, and no potential consistently captures precession, redshift, and lensing simultaneously. Light bending cannot be fit by any physically acceptable parameter choice over a broad range of impact parameters.',
      'This work is published in [The European Physical Journal C 86, 1280 (2026)](https://doi.org/10.1140/epjc/s10052-026-16547-6), with Prof. Mukhopadhyay and Ashish Kumar Meena; the preprint is [arXiv:2602.20261](https://arxiv.org/abs/2602.20261) [gr-qc].',
    ],
    links: [
      { label: 'Publication', href: '/publications/#pseudo-newtonian-gr' },
      { label: 'Eur. Phys. J. C · DOI', href: 'https://doi.org/10.1140/epjc/s10052-026-16547-6' },
      { label: 'arXiv:2602.20261', href: 'https://arxiv.org/abs/2602.20261' },
    ],
    publication: 'pseudo-newtonian-gr',
  },
  {
    id: 'smvac',
    area: 'particle',
    title: 'Higgs Vacuum Stability and the Cosmological Hierarchy Problem',
    shortTitle: 'Higgs Vacuum Stability · SMVac',
    period: 'May 2024 – May 2026',
    status: 'completed',
    mentors: 'Prof. Rick Sandeepan Gupta (TIFR)',
    place: 'TIFR, Mumbai',
    tags: ['C++', 'Python', '3-loop RG evolution', 'Semiclassical vacuum decay', 'Effective potential', 'Spectral collocation'],
    summary:
      'Developed SMVac, which solves the tree-level bounce of the RG-improved Standard Model potential numerically, with a validated uncertainty, and uses it to test the analytical approximations to the vacuum decay action across the $(M_h, M_t)$ plane. Its phase diagrams place the measured Higgs and top masses entirely in the metastable region of this scheme.',
    body: [
      'The measured Higgs and top masses place the Standard Model close to the boundary between absolute stability and metastability of the electroweak vacuum. Running the quartic coupling $\\lambda(\\mu)$ up in energy drives it negative at scales around $10^{10}\\text{–}10^{11}\\,\\mathrm{GeV}$, yet the physical point sits close enough to the stability line that small changes in $M_h$ or $M_t$ flip the verdict. Quantifying this requires precision control of the RG flow and of the semiclassical decay rate, and a clear account of what the available analytical approximations actually miss.',
      'SMVac, a C++14 library with an independent Python reference implementation, solves the tree-level O(4) bounce of $V = \\lambda_P(\\phi)\\phi^4/4$ numerically, where $\\lambda_P$ is the RG-improved quartic at $\\mu = \\phi$ (one-loop Coleman–Weinberg or $\\overline{\\mathrm{MS}}$), built from NNLO matching (Buttazzo et al. 2013) and three-loop Standard Model running to the Planck scale. The reference solver, Chebyshev spectral collocation chosen from five candidate methods, has an uncertainty of $10^{-12}$ or better, checked independently of solver agreement. This solution is the benchmark against which the closed-form approximations of the literature are tested; their derivations are prior work (Wipf 1985; Espinosa 2020).',
      'The leading formula $S_{\\mathrm{FL}} = 8\\pi^2/(3|\\lambda_{\\min}|)$ is a rigorous lower bound: it is low by $3 \\times 10^{-4}$ to $1.7 \\times 10^{-3}$ where $S < 5000$, and by up to $34\\text{–}50\\%$ near the absolute-stability boundary. Espinosa\'s first-order formula stays within $1.54\\%$ over all standard-tier points of the controlled scans, while the resummed and variational estimates diverge near criticality, because their trial shapes have a fixed spread. For the decay criterion these errors are negligible next to the scale and prescription ambiguities of RG improvement. The PDG 2026 masses lie entirely in the metastable region of this tree-level scheme, with $S = 2778$ at the central values.',
      'Version 2 (November 2026) replaces the original implementation. An audit showed that its “RG-improved Fubini–Lipatov action” is a first-order estimate about the Fubini–Lipatov instanton that is unbounded below, and that the deviations it reported came from an undocumented $\\phi^6/M_{\\mathrm{Pl}}^2$ term and Planck-scale artefacts. The original code is preserved unchanged in the repository. Details, figures and limitations are on the [project page](/smvac/).',
      'Alongside the stability computation, I investigated the Cosmological Hierarchy Problem by modeling the Higgs field as a stochastic spectator during slow-roll inflation. The question is whether volume-weighted anthropic selection during inflation can bias Higgs initial conditions toward the metastable electroweak vacuum without introducing new low-energy degrees of freedom.',
    ],
    links: [
      { label: 'Project page', href: '/smvac/' },
      { label: 'GitHub · SMVac', href: site.smvac },
    ],
  },
  {
    id: 'little-group',
    area: 'qft',
    title: 'Independent Reading: Lorentz Representations and Little Group Formalism',
    shortTitle: 'Lorentz & Little Group Representations',
    period: 'May 2025 – June 2025',
    status: 'completed',
    mentors: 'Prof. Rick Sandeepan Gupta (TIFR)',
    place: 'TIFR, Mumbai',
    tags: ['QFT foundations', 'Group theory', 'Continuous spin representations'],
    summary:
      'A self-directed reading project on foundational quantum field theory: Lorentz and Poincaré group representations and the little group formalism for massive and massless particles, extended to continuous spin representations (Schuster–Toro) and their implications for exotic particle states beyond standard discrete spins.',
    body: [
      'A self-directed reading project under Prof. Rick Sandeepan Gupta on the representation-theoretic foundations of quantum field theory: the Lorentz and Poincaré groups, and the little group formalism that classifies one-particle states for massive and massless particles.',
      'The reading extended to continuous spin representations, the formalism developed by Schuster and Toro, and their implications for exotic particle states beyond the standard discrete-spin classification. This project anchors the more structural side of my interests: what symmetry principles force on any theory of particles and fields.',
    ],
    links: [],
  },
  {
    id: 'ipt',
    title: "International Physicists' Tournament (IISc Team)",
    shortTitle: 'IPT Experimental Problems',
    period: '2023 – 2024',
    status: 'completed',
    place: 'IISc, Bengaluru',
    tags: ['Experiment', 'High-speed imaging', 'Data analysis', 'C++ simulation'],
    summary:
      'Two experimental problems for the IISc IPT team, flame propagation in narrow tubes and the jumping hoop phenomenon, combining theory, instrumented experiments, and numerical simulation. The team was National Runner-up in both 2023 and 2024.',
    body: [
      '**Traveling Flame in Narrow Tubes (2024).** Designed and 3D-printed narrow tubes with controlled obstacles to study flame propagation; characterized ignition thresholds, flame-speed regimes, and the transition from laminar deflagration to turbulent combustion; analyzed high-speed footage and pressure data to quantify turbulence onset in premixed flames in confined geometries.',
      '**Jumping Hoop Phenomenon (2023).** Developed a theoretical model for the vertical jumping of a rigid hoop driven by an off-center sliding puck, covering rotational inertia, impulsive normal forces, and the shifting center of mass. Performed controlled experiments across mass ratios and initial conditions, and implemented C++ simulations of the coupled equations of motion, achieving good agreement with observation.',
      'The IISc team placed **National Runner-up** in both the 2023 and 2024 editions of the tournament.',
    ],
    links: [],
    experimental: true,
  },
];
