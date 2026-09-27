/**
 * Publications, ordered newest first.
 *
 * To add a paper: append an entry here. It automatically appears on the
 * Publications page and in the homepage teaser. Keep `abstract` verbatim
 * from the arXiv page.
 */
export interface Publication {
  id: string;
  title: string;
  authors: { name: string; me?: boolean }[];
  status: 'preprint' | 'published';
  year: number;
  venue?: string;
  arxiv?: string;
  arxivCategory?: string;
  submitted?: string;
  area: string;
  abstract: string;
  /** Short researcher-level summary shown on cards. */
  summary: string;
  /** Longer project-page description. */
  description: string[];
}

export const publications: Publication[] = [
  {
    id: 'pseudo-newtonian-gr',
    title: 'Tests of general relativity in pseudo-Newtonian approach',
    authors: [
      { name: 'Naman Goyal', me: true },
      { name: 'Banibrata Mukhopadhyay' },
      { name: 'Ashish Kumar Meena' },
    ],
    status: 'preprint',
    year: 2026,
    arxiv: '2602.20261',
    arxivCategory: 'gr-qc',
    submitted: '23 February 2026',
    area: 'Classical tests of GR · effective descriptions of gravity',
    abstract:
      'We investigate the extent to which pseudo-Newtonian gravitational potentials can reproduce classic tests of general relativity without resorting to full general relativistic formalisms. This is useful for the researchers seeking intuitive insight into relativistic gravity. Focusing on the perihelion precession of Mercury, gravitational redshift, and gravitational light bending, we derive analytical expressions for orbital precession and demonstrate that, with suitable physically acceptable parameters, pseudo-Newtonian approaches can accurately reproduce the observed perihelion advance and gravitational redshift. However, we confirm that no single potential consistently captures all relativistic effects. In particular, while certain parameters yield agreement with general relativity for planetary motion and redshift, they fail to reproduce gravitational lensing over a broad range of impact parameters. Our results highlight both the usefulness and limitations of pseudo-Newtonian methods in modeling gravitational phenomena. Although the pseudo-Newtonian approach cannot serve as universal substitutes for general relativity, especially in strong-field regimes, it provides valuable semi-analytical insight and pedagogical simplicity. Our results indicate the usefulness of the pseudo-Newtonian approach to uncover more complicated phenomena involved with strong field gravity in possibly modification to general relativity.',
    summary:
      'How much of classical general relativity survives in Newtonian language? We test pseudo-Newtonian potentials against the three classic tests of GR: perihelion precession of Mercury, gravitational redshift, and light bending. Suitable potentials reproduce precession and redshift exactly, but no single potential captures all three at once.',
    description: [
      'General relativity is non-linear, and exact solutions become difficult as soon as the spacetime departs from spherical symmetry. Pseudo-Newtonian potentials offer a way out: keep Newtonian dynamics, but replace the gravitational potential so that selected relativistic effects reappear. This machinery is widely used for accretion flows around compact objects, where it is accurate enough that its errors are often smaller than observational uncertainties. The paper asks a systematic question: how far does this substitute go when pushed against the three classic tests of GR?',
      'Working in units of the gravitational radius $r_g = GM/c^2$, we derive the orbit equation for general potentials and solve it analytically for the Paczyński–Wiita potential and for an amended Artemova–Björnsson–Novikov (ABN) potential. The parameter $\\beta$ is fixed to the spin in the original proposal; here it is treated as free, with $\\beta = 2$ recovering Paczyński–Wiita and $\\beta = 0$ Newtonian gravity. The precession per orbit follows from the relativistic correction to the oscillator frequency of the orbit.',
      'For Mercury, the Paczyński–Wiita potential yields $\\Delta\\theta \\approx 27.54$ arcseconds per century, about a factor of $1.5$ below the exact GR value of $43.03$, while the amended ABN potential with $\\beta = 3.125$ reproduces the GR precession exactly. For gravitational redshift, evaluated by integrating the potential gradient, the situation inverts: $\\beta = 3.125$ deviates strongly from GR, while $\\beta = 0.5$ matches it. The same parameter cannot serve both effects.',
      'Light bending is where the approach fails outright. Integrating the null-geodesic equation $d^2\\alpha/d\\theta^2 + \\alpha = 3\\alpha^2$ for Schwarzschild and the pseudo-Newtonian orbit equation numerically (RK45 via SciPy), we find that $\\beta = 2$ under-predicts the deflection and $\\beta \\approx 3$ fails as well. Matching GR in the weak-field regime would require an unphysical $\\beta \\gg 1000$, with a different $\\beta$ at each impact parameter. Around rotating black holes, the Mukhopadhyay potential correctly reproduces the photon-sphere location and the qualitative prograde/retrograde splitting of Kerr deflections, but its weak-field limit falls to the Newtonian $2/R$ rather than the GR $4/R$.',
      'The conclusion is a precise boundary on the method. Pseudo-Newtonian potentials reproduce individual relativistic effects in suitable regimes, and the paper identifies those regimes, but no single potential consistently captures perihelion precession, redshift, and lensing simultaneously. The approach remains valuable for semi-analytical insight and pedagogy, not as a universal substitute for GR.',
    ],
  },
];
