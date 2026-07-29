// Single source of truth for all UI copy, per language.
// Server components resolve the active dictionary via lib/lang.ts
// (cookie-based); client components via the LangProvider context.

export type Lang = "en" | "de";
export const DEFAULT_LANG: Lang = "de";
export const LANG_COOKIE = "lang";

const en = {
  site: {
    name: "ratata gallery",
    // PROVISIONAL COPY - used in the footer and as the site meta description.
    tagline:
      "Gallery and artist collective for digital art – Frankfurt am Main.",
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
    missionHeading: "Digital art, in real spaces.",
    missionBody:
      "ratata is a gallery and artist collective from Frankfurt am Main. We curate digital art, present it in exhibitions and at international art fairs, and develop the technology that makes these presentations possible.",
    leadEyebrow: "From the archive",
    leadLink: "View project",
    viewAll: "View all",
    roleLabel: "Role",
    evidenceEyebrow: "Selected evidence",
    evidenceHeading: "Work in institutions and public settings",
    evidenceBody:
      "Selected projects show how ratata brings together curatorial practice, production, and technical development.",
    compactIndex: "Complete compact index",
    openArchive: "Open archive with filters",
    worksEyebrow: "Works exhibited",
    worksCountSuffix: "Works",
    worksLink: "View all works",
    tezconEyebrow: "Upcoming",
    tezconHeading: "Tezcon Europe",
    tezconTeaser:
      "Tezcon Europe: the community-run Tezos convention comes to Frankfurt.",
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
    linksCrypto: "Crypto links",
    indexPlateLinks: "LINKS & PRESS",
    playLabel: "Play",
    openFullscreen: "Open image full screen",
    fullscreenLabel: "Full-screen image viewer",
    closeFullscreen: "Close full-screen image",
    previousImage: "Previous image",
    nextImage: "Next image",
  },
  tezcon: {
    eyebrow: "Upcoming",
    heading: "Tezcon Europe",
    // PROVISIONAL COPY - venue and program are placeholders until the
    // edition is confirmed; the Seattle background is factual.
    body: "Tezcon, the community-run Tezos convention, comes to Europe: talks, exhibitions, live music, and minting in Frankfurt am Main.",
    heroImage: "/images/tezcon-europe/frankfurt-skyline-2022.jpg",
    heroImageAlt: "The Frankfurt am Main skyline seen across the river Main",
    heroImageCredit: "Photo: Jörg Braukmann",
    heroImageLicense: "CC BY-SA 4.0",
    heroImageLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    heroImageSourceLabel: "via Wikimedia Commons",
    heroImageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Frankfurt_Skyline_2022.jpg",
    facts: [
      { label: "Dates", value: "24/25 October 2026" },
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
        description:
          "Artists, builders, and collectors on the state of the Tezos ecosystem.",
      },
      {
        title: "Exhibition",
        description:
          "A curated show of digital art from the community, on-site in Frankfurt.",
      },
      {
        title: "Interactive installations",
        description: "Interactive works to experience on-site.",
      },
      {
        title: "Music & socials",
        description: "Live sets and open sessions throughout the evenings.",
      },
    ],
    seattleLinks: [
      {
        label: "TezCon Seattle – thetezos.com",
        url: "https://thetezos.com/events/tezcon-seattle/",
      },
      {
        label: "TezCon Seattle: A Vision Realized – Tezos Commons",
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
    body: "ratata is led by Johannes and Phil. Their collaboration began with Molequlab in 2015; since 2019, they have brought their combined experience in technology, production, and communication to ratata gallery.",
    peopleHeading: "The people behind ratata",
    people: [
      {
        name: "Phil (AdiOohgaga)",
        role: "Concept & Communication",
        body: "Phil studied engineering in London before moving into media and communication. His path includes presenting for MTV Philippines and working as a copywriter at Saatchi & Saatchi and MRM. At ratata, he brings together concept development, editorial work, and communication.",
      },
      {
        name: "Johannes",
        role: "Technology & Production",
        body: "Johannes studied information technology at Frankfurt University of Applied Sciences. After working in data analysis and front-end development at MRM, he became technical director at Escape Events Frankfurt, where he helped develop permanent locations and mobile escape-room formats. At ratata, he focuses on technology, production, and interactive systems.",
      },
    ],
    rootsHeading: "From Molequlab to ratata",
    rootsBody: "From 2015 to 2019, Phil and Johannes worked together as Molequlab, an interdisciplinary studio spanning digital products, fabrication, and connected technology. Projects included the Xoodo home-farming assistant, technical consulting, 3D-printing services and material recycling, robotics and IoT, and front-end development. This combination of creative practice and technical implementation became the foundation for ratata gallery.",
    archiveHeading: "Molequlab archive",
    archiveLinks: [
      {
        label: "Molequlab on YouTube",
        url: "https://www.youtube.com/channel/UCATT5xD8syWRcaQk02xTBeg",
      },
      {
        label: "Molequlab designs on Thingiverse",
        url: "https://www.thingiverse.com/molequlab/designs",
      },
    ],
    contactHeading: "Contact",
    contactBody: "For inquiries, write to us at",
    contactEmail: "info@ratata.gallery",
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
      description: "ratata gallery – curated exhibitions.",
    },
    production: {
      eyebrow: "Production Archive",
      heading: "Production",
      description:
        "ratata gallery – fairs, events, tech productions, and platforms.",
    },
  },
  legal: {
    impressum: {
      heading: "Impressum",
      description: "ratata gallery – Impressum.",
    },
    datenschutz: {
      heading: "Datenschutzerklärung",
      description: "ratata gallery – Datenschutzerklärung.",
    },
  },
};

export type Strings = typeof en;

const de: Strings = {
  site: {
    name: "ratata gallery",
    // PROVISIONAL COPY - used in the footer and as the site meta description.
    tagline:
      "Galerie und Künstlerkollektiv für digitale Kunst – Frankfurt am Main.",
    wordmark: "ratata",
    wordmarkSuffix: ".gallery",
  },
  nav: {
    home: "Start",
    exhibitions: "Ausstellungen",
    production: "Produktion",
    tezconEurope: "Tezcon Europe",
    about: "Über uns",
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
    eyebrow: "Galerie & Kollektiv · Frankfurt am Main",
    missionHeading: "Digitale Kunst, in realen Räumen.",
    missionBody:
      "ratata ist eine Galerie und ein Künstlerkollektiv aus Frankfurt am Main. Wir kuratieren digitale Kunst, bringen sie in Ausstellungen und auf internationale Kunstmessen und entwickeln die Technik, die diese Präsentationen möglich macht.",
    leadEyebrow: "Aus dem Archiv",
    leadLink: "Projekt ansehen",
    viewAll: "Alle ansehen",
    roleLabel: "Rolle",
    evidenceEyebrow: "Ausgewählte Nachweise",
    evidenceHeading: "Arbeit in Institutionen und öffentlichen Räumen",
    evidenceBody:
      "Ausgewählte Projekte zeigen, wie ratata kuratorische Arbeit, Produktion und technische Entwicklung zusammenführt.",
    compactIndex: "Vollständiger kompakter Index",
    openArchive: "Archiv mit Filtern öffnen",
    worksEyebrow: "Gezeigte Arbeiten",
    worksCountSuffix: "Arbeiten",
    worksLink: "Alle Arbeiten ansehen",
    tezconEyebrow: "Demnächst",
    tezconHeading: "Tezcon Europe",
    tezconTeaser:
      "Tezcon Europe: die Community-Convention rund um Tezos kommt nach Frankfurt.",
    tezconLink: "Mehr erfahren",
  },
  archive: {
    filterLabel: "Nach Rolle filtern",
    empty: "Noch keine Projekte.",
    noMatch: "Keine Projekte passen zu diesem Filter.",
    viewGrid: "Raster",
    viewIndex: "Index",
    resultsSuffix: "PROJEKTE",
    resultsSuffixOne: "PROJEKT",
    columnYear: "Jahr",
    columnTitle: "Titel",
    columnVenue: "Ort / Stadt",
    columnRole: "Rolle",
  },
  project: {
    factDates: "Termine",
    factVenue: "Ort",
    factArtists: "Künstler:innen",
    linksHeading: "Links & Presse",
    linksPress: "Presse & Links",
    linksSocial: "Social Media",
    linksCrypto: "Crypto-Links",
    indexPlateLinks: "LINKS & PRESSE",
    playLabel: "Abspielen",
    openFullscreen: "Bild im Vollbild öffnen",
    fullscreenLabel: "Vollbild-Bildansicht",
    closeFullscreen: "Vollbildansicht schließen",
    previousImage: "Vorheriges Bild",
    nextImage: "Nächstes Bild",
  },
  tezcon: {
    eyebrow: "Demnächst",
    heading: "Tezcon Europe",
    // PROVISIONAL COPY - venue and program are placeholders until the
    // edition is confirmed; the Seattle background is factual.
    body: "Tezcon, die Community-Convention des Tezos-Ökosystems, kommt nach Europa: Talks, Ausstellungen, Livemusik und Minting in Frankfurt am Main.",
    heroImage: "/images/tezcon-europe/frankfurt-skyline-2022.jpg",
    heroImageAlt: "Die Frankfurter Skyline, gesehen über den Main",
    heroImageCredit: "Foto: Jörg Braukmann",
    heroImageLicense: "CC BY-SA 4.0",
    heroImageLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    heroImageSourceLabel: "via Wikimedia Commons",
    heroImageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Frankfurt_Skyline_2022.jpg",
    facts: [
      { label: "Termin", value: "24./25. Oktober 2026" },
      { label: "Ort", value: "Frankfurt am Main, wird noch bekannt gegeben" },
      { label: "Format", value: "Talks · Ausstellung · Livemusik · Minting" },
      { label: "Veranstaltet von", value: "ratata gallery" },
    ],
    seattleHeading: "Von Seattle nach Frankfurt",
    seattleBody: [
      "TezCon begann in Seattle als Grassroots-Convention für das Tezos-Ökosystem: ein von der Community getragenes Treffen von Künstler:innen, Sammler:innen, Entwickler:innen und Denker:innen, entstanden aus dem TezTones-Kollektiv und unterstützt von Tezos Commons. Die Ausgaben in der Kenyon Hall verbanden Paneltalks, kuratierte Ausstellungen, Livemusik und gemeinsames Arbeiten vor Ort – getragen von einem bewusst unkommerziellen Selbstverständnis: Community zuerst.",
      "Tezcon Europe bringt dieses Format über den Atlantik. Ausgerichtet von ratata gallery in Frankfurt am Main folgt die europäische Ausgabe derselben Idee: von der Community, für die Community.",
    ],
    programHeading: "Programm (vorläufig)",
    program: [
      {
        title: "Talks & Panels",
        description:
          "Künstler:innen, Entwickler:innen und Sammler:innen über den Stand des Tezos-Ökosystems.",
      },
      {
        title: "Ausstellung",
        description:
          "Eine kuratierte Schau digitaler Kunst aus der Community, vor Ort in Frankfurt.",
      },
      {
        title: "Interaktive Installationen",
        description: "Interaktive Arbeiten zum Erleben vor Ort.",
      },
      {
        title: "Musik & Socials",
        description: "Livesets und offene Sessions im Abendprogramm.",
      },
    ],
    seattleLinks: [
      {
        label: "TezCon Seattle – thetezos.com",
        url: "https://thetezos.com/events/tezcon-seattle/",
      },
      {
        label: "TezCon Seattle: A Vision Realized – Tezos Commons",
        url: "https://news.tezoscommons.org/tezcon-seattle-a-vision-realized-21cb2548ef4b",
      },
      {
        label: "TezCon-2026-Galerie auf Teia",
        url: "https://tezcon2026-gallery.teia.art/",
      },
    ],
    contactHeading: "Kontakt",
    contactEmail: "info@ratata.gallery",
  },
  about: {
    heading: "Über uns",
    body: "Hinter ratata stehen Johannes und Phil. Ihre Zusammenarbeit begann 2015 mit Molequlab; seit 2019 bringen sie ihre gemeinsame Erfahrung aus Technologie, Produktion und Kommunikation in die ratata gallery ein.",
    peopleHeading: "Die Menschen hinter ratata",
    people: [
      {
        name: "Phil (AdiOohgaga)",
        role: "Konzept & Produktion",
        body: "Phil studierte Ingenieurwissenschaften in London, bevor er in die Medien- und Kommunikationsbranche wechselte. Zu seinen Stationen zählen die Moderation für MTV Philippines sowie die Arbeit als Texter bei Saatchi & Saatchi und MRM. Bei ratata verbindet er Konzeption, Redaktion und Kommunikation.",
      },
      {
        name: "Johannes",
        role: "Technologie & Kommunikation",
        body: "Johannes studierte Informatik an der Fachhochschule Frankfurt. Nach Stationen in Datenanalyse und Front-End-Entwicklung bei MRM übernahm er die technische Leitung bei Escape Events Frankfurt und wirkte dort am Aufbau fester Standorte und mobiler Escape-Room-Formate mit. Bei ratata verantwortet er Technologie, Produktion und interaktive Systeme.",
      },
    ],
    rootsHeading: "Von Molequlab zu ratata",
    rootsBody: "Von 2015 bis 2019 arbeiteten Phil und Johannes gemeinsam als Molequlab, einem interdisziplinären Studio an der Schnittstelle von digitalen Produkten, Fertigung und vernetzter Technologie. Zu den Projekten gehörten der Home-Farming-Assistent Xoodo, technische Beratung, 3D-Druck und Materialrecycling, Robotik und IoT sowie Front-End-Entwicklung. Diese Verbindung aus kreativer Praxis und technischer Umsetzung bildet das Fundament der ratata gallery.",
    archiveHeading: "Molequlab-Archiv",
    archiveLinks: [
      {
        label: "Molequlab auf YouTube",
        url: "https://www.youtube.com/channel/UCATT5xD8syWRcaQk02xTBeg",
      },
      {
        label: "Molequlab-Entwürfe auf Thingiverse",
        url: "https://www.thingiverse.com/molequlab/designs",
      },
    ],
    contactHeading: "Kontakt",
    contactBody: "Anfragen gern an",
    contactEmail: "info@ratata.gallery",
  },
  categories: {
    exhibition: "Ausstellung",
    production: "Produktion",
  },
  roles: {
    Curated: "Kuratiert",
    Booth: "Stand",
    "Tech Lead": "Tech Lead",
    Platform: "Plattform",
  },
  pages: {
    exhibitions: {
      eyebrow: "Ausstellungsarchiv",
      heading: "Ausstellungen",
      description: "ratata gallery – kuratierte Ausstellungen.",
    },
    production: {
      eyebrow: "Produktionsarchiv",
      heading: "Produktion",
      description:
        "ratata gallery – Messen, Events, Tech-Produktionen und Plattformen.",
    },
  },
  legal: {
    impressum: {
      heading: "Impressum",
      description: "ratata gallery – Impressum.",
    },
    datenschutz: {
      heading: "Datenschutzerklärung",
      description: "ratata gallery – Datenschutzerklärung.",
    },
  },
};

export const STRINGS: Record<Lang, Strings> = { en, de };
