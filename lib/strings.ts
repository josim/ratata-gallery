// Single source of truth for all UI copy.
// Keeping every string here (instead of inline in components/pages) means a
// German translation can later be added by swapping this dictionary out —
// no i18n library required.

export const strings = {
  site: {
    name: "ratata gallery",
    // PROVISIONAL COPY - used in the footer and as the site meta description.
    tagline:
      "Gallery and artist collective for digital art - Frankfurt am Main.",
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
    // PROVISIONAL COPY - drafted from the archive, pending the client's own
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
    tezconTeaser: "Tezcon Europe: the community-run Tezos convention comes to Frankfurt.",
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
    eyebrow: "Upcoming",
    heading: "Tezcon Europe",
    // PROVISIONAL COPY - dates, venue, and program are placeholders until the
    // edition is confirmed; the Seattle background is factual.
    body: "The legendary Tezcon comes to Europe: talks, exhibitions, live music, and minting in Frankfurt am Main.",
    facts: [
      { label: "Dates", value: "2026, to be announced" },
      { label: "Venue", value: "Frankfurt am Main, to be announced" },
      { label: "Format", value: "Talks · Exhibition · Live music · Minting" },
      { label: "Hosted by", value: "ratata gallery" },
    ],
    seattleHeading: "From Seattle to Frankfurt",
    seattleBody: [
      "TezCon started in Seattle as a grassroots convention for the Tezos ecosystem: a community-run gathering of artists, collectors, builders, and thinkers, grown out of the TezTones collective and supported by Tezos Commons. Its editions at Kenyon Hall have mixed panel talks, curated exhibitions, live music, and on-site collaboration, keeping a deliberately non-corporate, community-first spirit.",
      "Tezcon Europe brings that format across the Atlantic. Hosted by ratata gallery in Frankfurt am Main, the European edition follows the same idea: made by the community, for the community.",
    ],
    programHeading: "Program (provisional)",
    program: [
      {
        title: "Talks & panels",
        description: "Artists, builders, and collectors on the state of the Tezos ecosystem.",
      },
      {
        title: "Exhibition",
        description: "A curated show of digital art from the community, on-site in Frankfurt.",
      },
      {
        title: "Live minting",
        description: "On-site minting installations in the tradition of ratata productions.",
      },
      {
        title: "Music & socials",
        description: "Live sets and open sessions, evenings included.",
      },
    ],
    seattleLinks: [
      {
        label: "TezCon Seattle - thetezos.com",
        url: "https://thetezos.com/events/tezcon-seattle/",
      },
      {
        label: "TezCon Seattle: A Vision Realized - Tezos Commons",
        url: "https://news.tezoscommons.org/tezcon-seattle-a-vision-realized-21cb2548ef4b",
      },
      {
        label: "TezCon 2026 gallery on Teia",
        url: "https://tezcon2026-gallery.teia.art/",
      },
    ],
    contactHeading: "Get in touch",
    contactEmail: "info@ratata.gallery",
  },
  about: {
    heading: "About",
    body: "TODO: About ratata gallery - Johannes / jorion and team.",
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
      description: "ratata gallery - curated exhibitions.",
    },
    production: {
      eyebrow: "Production Archive",
      heading: "Production",
      description:
        "ratata gallery - fairs, events, tech productions, and platforms.",
    },
  },
  legal: {
    impressum: {
      heading: "Impressum",
      description: "ratata gallery - Impressum.",
    },
    datenschutz: {
      heading: "Datenschutzerklärung",
      description: "ratata gallery - Datenschutzerklärung.",
    },
  },
} as const;
