/**
 * Research projects, ordered by prominence (current first).
 *
 * To add a project: append an entry here and rebuild. `experimental: true`
 * keeps it in the clearly-separated experimental section rather than the
 * main theoretical narrative.
 */
export interface Project {
  id: string;
  title: string;
  shortTitle?: string;
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
  experimental?: boolean;
}

export const projects: Project[] = [
  {
    id: 's-matrix-bootstrap',
    title: 'Scattering Amplitudes and S-Matrix Bootstrap',
    shortTitle: 'S-Matrix Bootstrap',
    period: 'May 2026 – Present',
    status: 'current',
    mentors: 'Prof. Rick Sandepan Gupta (TIFR)',
    place: 'TIFR, Mumbai',
    tags: ['Scattering amplitudes', 'Analyticity', 'Crossing symmetry', 'Unitarity', 'Regge behavior'],
    summary:
      'Investigating whether the uniqueness of dual-resonance scattering amplitudes can be established directly from analyticity, crossing symmetry, unitarity, and Regge behavior, without auxiliary assumptions on their zero distribution. In parallel, I study the analytic properties of amplitudes through positivity constraints, drawing on modern developments in the S-matrix bootstrap.',
    body: [
      'My current work, at TIFR with Prof. Rick Sandepan Gupta, concerns an old question: what fixes scattering amplitudes? The dual-resonance (Veneziano-type) amplitudes are uniquely simple objects, but is that uniqueness derivable or assumed? Concretely, can it be established directly from the physical principles of analyticity, crossing symmetry, unitarity, and Regge behavior, without auxiliary assumptions about the distribution of zeros of the amplitude?',
      'In parallel, I am studying the analytic properties of scattering amplitudes through analyticity, crossing, unitarity, Regge behavior, and positivity constraints, drawing on modern developments in the S-matrix bootstrap program. The project is ongoing; this description will grow as results do.',
    ],
    links: [],
  },
  {
    id: 'smvac',
    title: 'Higgs Vacuum Stability and the Cosmological Hierarchy Problem',
    shortTitle: 'Higgs Vacuum Stability · SMVac',
    period: 'May 2024 – May 2026',
    status: 'completed',
    mentors: 'Prof. Rick Sandepan Gupta (TIFR)',
    place: 'TIFR, Mumbai',
    tags: ['C++', 'Python', '3-loop RG evolution', 'Semiclassical vacuum decay', 'Effective potential'],
    summary:
      'Developed SMVac, a modular C++ framework for precision studies of electroweak vacuum stability. It combines NNLO matching, 3-loop SM renormalization group evolution, the one-loop Coleman–Weinberg effective potential, and semiclassical vacuum decay via an RG-improved Fubini–Lipatov calculation. I used it to construct stability phase diagrams in the $(M_h, M_t)$ plane and to quantify where analytical approximations break down near the metastability boundary.',
    body: [
      'The measured Higgs and top masses place the Standard Model close to the boundary between absolute stability and metastability of the electroweak vacuum. Running the quartic coupling $\\lambda(\\mu)$ up in energy drives it negative at scales around $10^{10}\\,\\mathrm{GeV}$, yet the physical point sits close enough to the stability line that small changes in $M_h$ or $M_t$ flip the verdict. Quantifying this requires precision control of the RG flow and of the semiclassical decay rate, and a clear account of what the available analytical approximations actually miss.',
      'I developed SMVac, a modular C++ framework for this problem, described on its [project page](/smvac/). It combines NNLO matching at the top scale, 3-loop Standard Model RG evolution, the one-loop Coleman–Weinberg effective potential, and a semiclassical decay calculation that keeps the analytical Fubini–Lipatov (conformal) field profile but numerically integrates the full running potential over it. The resulting RG-improved action goes beyond the constant-coupling approximation. Golden Section Search optimizes the profile scale; OpenMP-parallel sweeps over roughly $10^6$ points of the $(M_h, M_t)$ plane produce stability phase diagrams with constant-action contours.',
      'The computations confirm the metastability of the physical point and its consistency with the literature, and they quantify the breakdown of the strict analytical approximation. Deep in the metastable region the RG-improved and constant-coupling actions agree to about $0.01\\%$. Near the metastability boundary they disagree at the tens-of-percent level, exactly where the approximation is most tempting and least reliable.',
      'Alongside the stability computation, I investigated the Cosmological Hierarchy Problem by modeling the Higgs field as a stochastic spectator during slow-roll inflation. The question is whether volume-weighted anthropic selection during inflation can bias Higgs initial conditions toward the metastable electroweak vacuum without introducing new low-energy degrees of freedom.',
    ],
    links: [
      { label: 'Project page', href: '/smvac/' },
      { label: 'GitHub · SMVac', href: 'https://github.com/namangoyal31/SMVac' },
    ],
  },
  {
    id: 'pseudo-newtonian',
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
      'This work is published as a preprint with Prof. Mukhopadhyay and Ashish Kumar Meena: [arXiv:2602.20261](https://arxiv.org/abs/2602.20261) [gr-qc].',
    ],
    links: [
      { label: 'Publication', href: '/publications/' },
      { label: 'arXiv:2602.20261', href: 'https://arxiv.org/abs/2602.20261' },
    ],
  },
  {
    id: 'little-group',
    title: 'Independent Reading: Lorentz Representations and Little Group Formalism',
    shortTitle: 'Lorentz & Little Group Representations',
    period: 'May 2025 – June 2025',
    status: 'completed',
    mentors: 'Prof. Rick Sandepan Gupta (TIFR)',
    place: 'TIFR, Mumbai',
    tags: ['QFT foundations', 'Group theory', 'Continuous spin representations'],
    summary:
      'A self-directed reading project on foundational quantum field theory: Lorentz and Poincaré group representations and the little group formalism for massive and massless particles, extended to continuous spin representations (Schuster–Toro) and their implications for exotic particle states beyond standard discrete spins.',
    body: [
      'A self-directed reading project under Prof. Rick Sandepan Gupta on the representation-theoretic foundations of quantum field theory: the Lorentz and Poincaré groups, and the little group formalism that classifies one-particle states for massive and massless particles.',
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
