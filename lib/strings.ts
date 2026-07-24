// Single source of truth for all UI copy.
// Keeping every string here (instead of inline in components/pages) means a
// German translation can later be added by swapping this dictionary out —
// no i18n library required.

export const strings = {
  site: {
    name: "ratata gallery",
    tagline: "ratata gallery — TODO: one-line mission statement",
    wordmark: "ratata",
    wordmarkSuffix: ".gallery",
  },
  nav: {
    home: "Home",
    exhibitions: "Exhibitions",
    fairsEvents: "Fairs & Events",
    techProductions: "Tech Productions",
    platforms: "Platforms",
    tezconEurope: "Tezcon Europe",
    about: "About",
    langEn: "EN",
    langDe: "DE",
  },
  footer: {
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    youtube: "YouTube",
    youtubeUrl: "https://www.youtube.com/@ratata_artcode",
    copyright: `© ${new Date().getFullYear()} ratata · Frankfurt am Main`,
  },
  home: {
    missionHeading: "TODO: Mission statement",
    missionBody:
      "TODO: Replace with the ratata gallery mission statement — who we are, what we do, and why.",
    featuredHeading: "Featured Projects",
    exhibitionsHeading: "Exhibitions",
    exhibitionsLink: "All exhibitions",
    tezconHeading: "Tezcon Europe",
    tezconTeaser: "Tezcon Europe — coming to Frankfurt.",
    tezconLink: "Learn more",
  },
  archive: {
    filterLabel: "Filter by role",
    empty: "No projects yet.",
    noMatch: "No projects match this filter.",
    viewGrid: "Grid",
    viewIndex: "Index",
    resultsSuffix: "PROJECTS",
    columnYear: "Year",
    columnTitle: "Title",
    columnVenue: "Venue / City",
    columnRole: "Role",
  },
  project: {
    factDates: "Dates",
    factVenue: "Venue",
    factArtists: "Artists",
    linksHeading: "Links & Press",
    indexPlateLinks: "LINKS & PRESS",
    playLabel: "Play",
  },
  tezcon: {
    heading: "Tezcon Europe",
    body: "Tezcon Europe — coming to Frankfurt.",
    contactHeading: "Get in touch",
    contactEmail: "info@ratata.gallery",
  },
  about: {
    heading: "About",
    body: "TODO: About ratata gallery — Johannes / jorion and team.",
    contactHeading: "Contact",
    contactBody: "TODO: Contact details.",
  },
  categories: {
    exhibition: "Exhibition",
    fair: "Fair",
    tech: "Tech",
    platform: "Platform",
  },
  roles: {
    Curated: "Curated",
    Booth: "Booth",
    "Tech Lead": "Tech Lead",
    Platform: "Platform",
  },
  pages: {
    exhibitions: {
      eyebrow: "Exhibition Archive",
      heading: "Exhibitions",
      description: "ratata gallery — curated exhibitions.",
    },
    fairsEvents: {
      eyebrow: "Fairs & Events Archive",
      heading: "Fairs & Events",
      description: "ratata gallery — fairs and events.",
    },
    techProductions: {
      eyebrow: "Tech Productions Archive",
      heading: "Tech Productions",
      description: "ratata gallery — tech productions.",
    },
    platforms: {
      eyebrow: "Platform Archive",
      heading: "Platforms",
      description: "ratata gallery — platforms.",
    },
  },
  legal: {
    impressum: {
      heading: "Impressum",
      description: "ratata gallery — Impressum.",
    },
    datenschutz: {
      heading: "Datenschutzerklärung",
      description: "ratata gallery — Datenschutzerklärung.",
    },
  },
} as const;
