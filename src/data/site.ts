/**
 * Site-wide identity and links.
 * Edit this file to change contact details, GitHub handle, or the canonical URL.
 */
export const site = {
  name: 'Naman Goyal',
  role: 'B.S. (Research) in Physics',
  institution: 'Indian Institute of Science, Bengaluru',
  email: 'namangoyal@iisc.ac.in',
  githubUser: 'namangoyal31',
  github: 'https://github.com/namangoyal31',
  /** Current research codebase. */
  smvac: 'https://github.com/namangoyal31/SMVac-Research',
  /** Original working repository, kept unchanged as the provenance record. */
  smvacOriginal: 'https://github.com/namangoyal31/SMVac',
  url: 'https://namangoyal31.github.io',
  cvPath: '/cv/Naman_Goyal_CV.pdf',
  lastUpdated: 'November 2026',
};

/**
 * Canonical Person entity, shared by every page that references me so the
 * structured data describes one consistent identity. The URL is the exact
 * homepage canonical (trailing slash included). `knowsAbout` mirrors topics
 * stated in the visible page content.
 */
export const personNode = {
  '@type': 'Person',
  name: site.name,
  url: `${site.url}/`,
  email: `mailto:${site.email}`,
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'Indian Institute of Science',
    url: 'https://iisc.ac.in',
  },
  jobTitle: 'Undergraduate researcher in theoretical physics',
  knowsAbout: [
    'Theoretical high-energy physics',
    'Quantum field theory',
    'Mathematical physics',
    'Scattering amplitudes',
    'S-matrix bootstrap',
    'Electroweak vacuum stability',
    'Pseudo-Newtonian tests of general relativity',
  ],
  sameAs: [site.github],
};

export const personSchema = { '@context': 'https://schema.org', ...personNode };

/** Optional academic profiles. Add a URL to have it appear in the footer/contact. */
export const profiles: { label: string; url: string }[] = [
  // { label: 'Google Scholar', url: 'https://scholar.google.com/...' },
  // { label: 'ORCID', url: 'https://orcid.org/...' },
  // { label: 'LinkedIn', url: 'https://www.linkedin.com/in/...' },
];
