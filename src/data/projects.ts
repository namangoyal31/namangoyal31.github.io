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
    tags: ['C++', 'Python', '3-loop RG evolution', 'Semiclassical vacuum decay', 'Effective potential'],
    summary:
      'Developed SMVac, a semi-analytical estimator for electroweak vacuum stability: NNLO electroweak matching, three-loop SM RG evolution, and the Euclidean action of a Fubini–Lipatov trial profile evaluated on the RG-improved one-loop effective potential. Used it to map the stability phase diagram across the $(M_h, M_t)$ plane and to test when the strict conformal approximation is adequate.',
    body: [
      'The measured Higgs and top masses place the Standard Model close to the boundary between absolute stability and metastability of the electroweak vacuum. Running the quartic coupling $\\lambda(\\mu)$ up in energy drives it negative at scales around $10^{10}\\,\\mathrm{GeV}$, yet the physical point sits close enough to the stability line that small changes in $M_h$ or $M_t$ flip the verdict. Quantifying this requires precision control of the RG flow and of the semiclassical decay rate, and a clear account of what the available analytical approximations actually miss.',
      'The theoretical method is semiclassical. The RG-improved one-loop effective potential $V = \\lambda_{\\mathrm{eff}}(\\phi)\\phi^4/4$ with $\\mu = \\phi$ is taken in the high-field approximation, and the Euclidean action is evaluated on the Fubini–Lipatov conformal profile with a running-coupling amplitude, minimized over the profile scale, alongside the strict conformal estimate $S_{\\mathrm{conformal}} = 8\\pi^2/(3|\\lambda_{\\mathrm{min}}|)$. The bounce equation itself is not solved, so the result is a trial-profile estimate of the action, not the bounce action. Points are classified with the Coleman criterion and an age-of-the-universe threshold.',
      'I implemented this as SMVac, a modular C++17 framework described on its [project page](/smvac/): NNLO matching at the top scale (Buttazzo et al. 2013, linearized around the central masses), three-loop Standard Model RG evolution integrated by RK4 to the Planck scale, the action integral and its optimization, parallel scans of the $(M_h, M_t)$ plane, and an eleven-test suite.',
      'The robust output is the absolute-stability boundary, which does not depend on the trial profile: $M_h^{\\mathrm{crit}} = 129.05\\,\\mathrm{GeV}$ for $M_t = 173.1\\,\\mathrm{GeV}$, consistent with the NNLO value $129.4 \\pm 1.0\\,\\mathrm{GeV}$ of Degrassi et al. (2012). At the benchmark point $(125.1, 173.1)\\,\\mathrm{GeV}$ the vacuum is metastable: $\\lambda_{\\mathrm{eff}}$ crosses zero at $\\mu_1 \\simeq 7.6 \\times 10^{10}\\,\\mathrm{GeV}$ and the trial-profile action $S_{\\mathrm{trial}} = 2168.7$ lies far above the threshold of $484$. Inside the trial family, RG improvement changes the action by about $1\\%$ or less; the larger differences near the boundary come from the assumed Planck-suppressed $\\phi^6$ operator, not from the running.',
      'Alongside the stability computation, I investigated the Cosmological Hierarchy Problem by modeling the Higgs field as a stochastic spectator during slow-roll inflation. The question is whether volume-weighted anthropic selection during inflation can bias Higgs initial conditions toward the metastable electroweak vacuum without introducing new low-energy degrees of freedom.',
    ],
    links: [
      { label: 'Project page', href: '/smvac/' },
      { label: 'GitHub · SMVac-Research', href: site.smvac },
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
