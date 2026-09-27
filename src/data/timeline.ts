/**
 * Research chronology, oldest first. Dates come from the CV and verified
 * sources (arXiv submission date, repository release). To add a milestone,
 * append an entry; `happened: false` marks a future/ongoing marker.
 */
export interface TimelineItem {
  date: string;
  title: string;
  note?: string;
  href?: string;
  happened?: boolean;
}

export const timeline: TimelineItem[] = [
  {
    date: 'Jan 2024',
    title: 'Tests of General Relativity in Pseudo-Newtonian Framework',
    note: 'Research begins at IISc with Prof. Banibrata Mukhopadhyay.',
    href: '/research/#pseudo-newtonian',
    happened: true,
  },
  {
    date: 'May 2024',
    title: 'Higgs Vacuum Stability and the Cosmological Hierarchy Problem',
    note: 'Research begins at TIFR with Prof. Rick Sandepan Gupta; the SMVac framework grows out of this project.',
    href: '/research/#smvac',
    happened: true,
  },
  {
    date: 'Jun 2024',
    title: 'NIUS Physics Camp',
    note: 'National Initiative on Undergraduate Science, HBCSE–TIFR, Mumbai.',
    happened: true,
  },
  {
    date: 'May – Jun 2025',
    title: 'Lorentz Representations and the Little Group',
    note: 'Independent reading project on Poincaré representations and continuous spin formalism, TIFR.',
    href: '/research/#little-group',
    happened: true,
  },
  {
    date: 'Feb 2026',
    title: 'Preprint: arXiv:2602.20261 [gr-qc]',
    note: '"Tests of general relativity in pseudo-Newtonian approach" submitted with B. Mukhopadhyay and A. K. Meena.',
    href: '/publications/',
    happened: true,
  },
  {
    date: 'May 2026',
    title: 'Pseudo-Newtonian and SMVac projects completed',
    note: 'Both long-running research projects reach completion.',
    happened: true,
  },
  {
    date: 'Jun 2026',
    title: 'Perimeter Institute Undergraduate Summer School',
    note: 'Perimeter Institute for Theoretical Physics, Waterloo, Canada.',
    happened: true,
  },
  {
    date: 'May 2026 – Present',
    title: 'Scattering Amplitudes and S-Matrix Bootstrap',
    note: 'Current research at TIFR with Prof. Rick Sandepan Gupta.',
    href: '/research/#s-matrix-bootstrap',
    happened: false,
  },
];
