// Single source of truth for all UI copy.
// Keeping every string here (instead of inline in components/pages) means a
// German translation can later be added by swapping this dictionary out —
// no i18n library required.

export const strings = {
  site: {
    name: "ratata gallery",
    // PROVISIONAL COPY — used in the footer and as the site meta description.
    tagline:
      "Gallery and artist collective for digital art — Frankfurt am Main.",
    wordmark: "ratata",
    wordmarkSuffix: ".gallery",
  },
  nav: {
    home: "Home",
    exhibitions: "Exhibitions",
    production: "Production",
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
    // PROVISIONAL COPY — drafted from the archive, pending the client's own
    // wording. Every claim below is backed by a project in content/projects.
    eyebrow: "Gallery & Collective · Frankfurt am Main",
    missionHeading: "Digital art, shown in real rooms.",
    missionBody:
      "ratata is a gallery and artist collective based in Frankfurt am Main. Since 2021 we have curated exhibitions, operated official NFT booths at international art fairs, and built the minting and display technology behind them.",
    leadEyebrow: "From the archive",
    leadLink: "View project",
    viewAll: "View all",
    worksEyebrow: "Works exhibited",
    worksCountSuffix: "Works",
    worksLink: "View all works",
    tezconEyebrow: "Upcoming",
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
    resultsSuffixOne: "PROJECT",
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
    linksPress: "Press & Links",
    linksSocial: "Social",
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
    production: "Production",
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
    production: {
      eyebrow: "Production Archive",
      heading: "Production",
      description:
        "ratata gallery — fairs, events, tech productions, and platforms.",
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
