// Single source of truth for all UI copy, per language.
// Server components resolve the active dictionary via lib/lang.ts
// (cookie-based); client components via the LangProvider context.

export type Lang = "en" | "de";
export const DEFAULT_LANG: Lang = "de";
export const LANG_COOKIE = "lang";

const en = {
  site: {
    name: "ratata gallery",
    // Used in the footer and as the site meta description.
    tagline:
      "Gallery for digital art in Frankfurt am Main. We curate, produce, and build the technology behind it.",
    wordmark: "ratata",
    wordmarkSuffix: ".gallery",
  },
  nav: {
    home: "Home",
    exhibitions: "Exhibitions",
    production: "Production",
    tezconEurope: "TezCon Europe",
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
    // "Zwei Spuren / Invers" homepage (docs/Redesign_2a handoff). The handoff
    // flags services, press, platforms, the stats, and the hero line as NEW
    // copy that still needs sign-off from ratata before launch.
    navServices: "Services",
    kickerArt: "01 — Art",
    kickerCode: "02 — Code",
    heroLine1: "Digital art",
    heroLine2: "needs real walls.",
    lead: "ratata curates digital art, produces exhibitions at international fairs, and builds the technology that makes them run. Frankfurt am Main, since 2019.",
    trackArt: "Art",
    trackCode: "Code",
    artBody: "Curation, artists, exhibitions, rooms.",
    codeBody:
      "Displays, LED, projection, interactive systems, smart contracts, minting.",
    cta: "Start a project",
    statLabels: ["Projects", "Exhibitions", "Productions", "Cities", "Artists"],
    signalTitle: "Signal",
    signalKicker: "Live from Instagram & X",
    signalNote: "Sample data — feed loads at runtime",
    signalOwn: "From ratata",
    signalMentions: "Mentions",
    projectsWord: "projects",
    worksShown: "Works shown",
    archiveLink: "Open the filtered archive",
    servicesTitle: "What we deliver",
    services: [
      {
        title: "Curation & programme",
        body: "Concept, artist selection, texts and work descriptions — from a single evening to a fair booth.",
      },
      {
        title: "Exhibition production",
        body: "Build-up, displays, LED walls, projection, sound, logistics and on-site support.",
      },
      {
        title: "Tech & platforms",
        body: "Interactive installations, smart contracts, minting flows and custom web platforms.",
      },
    ],
    platformsTitle: "Platforms we built",
    platforms: [
      {
        name: "8scribo",
        year: "2022",
        body: "Write and publish haikus directly on Tezos.",
      },
      {
        name: "Tesserart",
        year: "2024",
        body: "Digital art publishing tied to live events and physical shows.",
      },
      {
        name: "InfiniteInk",
        year: "2025",
        body: "Artist-controlled editions on their own smart contracts.",
      },
      {
        name: "Tezos AI Helper",
        year: "2026",
        body: "Browser-based assistant for the Tezos ecosystem, bring your own AI provider.",
      },
      {
        name: "Collective Voice ID",
        year: "2022–24",
        body: "Installation turning visitors’ voices into animated portraits.",
      },
    ],
    tezKicker: "Coming up · 2027",
    tezBody:
      "The Tezos community convention moves from Seattle to Frankfurt: talks, exhibition, live music, minting. By the community, for the community.",
    pressKicker: "For editors",
    pressTitle: "Press",
    // Asset rows (press kit, print images, logo) return here once the files
    // actually exist (handoff §7); until then only the working contact row
    // renders — no unlinked rows, no invented file sizes.
    press: [{ label: "Press enquiries", note: "info@ratata.gallery" }],
    partnersTitle: "Partners & friends",
    tagline: "Gallery for digital art in Frankfurt am Main.",
  },
  archive: {
    filterLabel: "Filter by role",
    empty: "No projects yet.",
    noMatch: "No projects match this filter.",
    resultsSuffix: "PROJECTS",
    resultsSuffixOne: "PROJECT",
  },
  project: {
    backToArchive: "Back to archive",
    overview: "Overview",
    roleLabel: "Role",
    factDates: "Period",
    factVenue: "Venue",
    factPresentations: "Presentations",
    factArtists: "Artists",
    previousProject: "Previous project",
    nextProject: "Next project",
    linksHeading: "Links & Press",
    linksPress: "Press & Links",
    linksSocial: "Social",
    linksCrypto: "Crypto links",
    indexPlateLinks: "LINKS & PRESS",
    playLabel: "Play",
    artworksHeading: "Works exhibited",
    artworksCountSuffix: "works",
    artworksFilterLabel: "Filter works by collection",
    artworksAll: "All",
    artworksShown: "works shown",
    openFullscreen: "Open image full screen",
    fullscreenLabel: "Full-screen image viewer",
    closeFullscreen: "Close full-screen image",
    previousImage: "Previous image",
    nextImage: "Next image",
  },
  tezcon: {
    eyebrow: "Upcoming",
    heading: "TezCon Europe",
    // PROVISIONAL COPY - venue and program are placeholders until the
    // edition is confirmed; the Seattle background is factual.
    body: "TezCon, the community-run Tezos convention, comes to Europe: talks, exhibitions, live music, and minting in Frankfurt am Main.",
    heroImage: "/images/tezcon-europe/frankfurt-skyline-2022.jpg",
    heroImageAlt: "The Frankfurt am Main skyline seen across the river Main",
    heroImageCredit: "Photo: Jörg Braukmann",
    heroImageLicense: "CC BY-SA 4.0",
    heroImageLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    heroImageSourceLabel: "via Wikimedia Commons",
    heroImageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Frankfurt_Skyline_2022.jpg",
    facts: [
      { label: "Dates", value: "2027" },
      { label: "Venue", value: "Frankfurt am Main, to be announced" },
      { label: "Format", value: "Talks · Exhibition · Live music · Minting" },
      { label: "Hosted by", value: "ratata gallery" },
    ],
    seattleHeading: "From Seattle to Frankfurt",
    seattleBody: [
      "TezCon started in Seattle as a grassroots convention for the Tezos ecosystem: a community-run gathering of artists, collectors, builders, and thinkers, grown out of the TezTones collective and supported by Tezos Commons. Its editions at Kenyon Hall have mixed panel talks, curated exhibitions, live music, and on-site collaboration, keeping a deliberately non-corporate, community-first spirit.",
      "TezCon Europe brings that format across the Atlantic. Hosted by ratata gallery in Frankfurt am Main, the European edition follows the same idea: made by the community, for the community.",
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
    partnersHeading: "Partners & Friends",
    partnersBody:
      "ratata works with galleries and digital-art platforms on exhibitions, publishing, and technical production.",
    partners: [
      {
        name: "Galerie Greulich",
        relationship: "Gallery & curatorial partner",
        url: "https://www.galerie-greulich.de/",
        image: "/images/partners-and-friends/galerie-greulich-logo.png",
        imageAlt: "Galerie Greulich logo",
        imageFit: "contain",
        imageInset: "compact",
        imageSurface: "light",
        mark: "",
      },
      {
        name: "Tesserart",
        relationship: "Publishing & technology partner",
        url: "https://tesserart.xyz/",
        image: "/images/partners-and-friends/tesserart-logo.png",
        imageAlt: "Tesserart wordmark on a black background",
        imageFit: "contain",
        imageInset: "compact",
        imageSurface: "light",
        mark: "",
      },
      {
        name: "AI Hub Frankfurt",
        relationship: "Events & AI network",
        url: "https://ai-hub-frankfurt.de/",
        image: "/images/partners-and-friends/ai-hub-frankfurt-logo.png",
        imageAlt: "AI Hub Frankfurt Rhein-Main logo",
        imageFit: "contain",
        imageInset: "wide",
        imageSurface: "dark",
        mark: "",
      },
      {
        name: "HOXID",
        relationship: "Artist",
        url: "https://x.com/HOXID_",
        image: "/images/partners-and-friends/hoxid-logo.png",
        imageAlt: "HOXID monogram",
        imageFit: "contain",
        imageInset: "compact",
        imageSurface: "dark",
        mark: "",
      },
      {
        name: "theVERSEverse",
        relationship: "Digital poetry & publishing",
        url: "https://theverseverse.com/",
        image: "/images/partners-and-friends/theverseverse-logo.png",
        imageAlt: "theVERSEverse logo",
        imageFit: "contain",
        imageInset: "wide",
        imageSurface: "light",
        mark: "",
      },
      {
        name: "TZ APAC",
        relationship: "Events & ecosystem",
        url: "https://www.tzapac.com/",
        image: "/images/partners-and-friends/tz-apac-logo.svg",
        imageAlt: "TZ APAC logo",
        imageFit: "contain",
        imageInset: "wide",
        imageSurface: "light",
        mark: "",
      },
      {
        name: "Tezos Commons",
        relationship: "Community & education",
        url: "https://tezoscommons.org/",
        image: "/images/partners-and-friends/tezos-commons-logo.png",
        imageAlt: "Tezos Commons logo",
        imageFit: "contain",
        imageInset: "wide",
        imageSurface: "light",
        mark: "",
      },
      {
        name: "teia.cafe",
        relationship: "Art platform & community",
        url: "https://www.teia.cafe/?feed=latest",
        image: "/images/partners-and-friends/teia-cafe-logo.png",
        imageAlt: "teia.cafe wordmark",
        imageFit: "contain",
        imageInset: "compact",
        imageSurface: "dark",
        mark: "",
      },
      {
        name: "Merzmensch",
        relationship: "Artist",
        url: "https://merzmensch.com/",
        image: "/images/partners-and-friends/merzmensch.png",
        imageAlt:
          "Merzmensch photographing his reflection in a mirrored sphere",
        imageFit: "contain",
        imageInset: "compact",
        imageSurface: "light",
        mark: "",
      },
      {
        name: "Der MIXER",
        relationship: "Exhibition venue & collaborator",
        url: "https://www.dermixerffm.eu/ueber-uns-verein/",
        image: "/images/partners-and-friends/der-mixer-logo.png",
        imageAlt: "Der MIXER logo",
        imageFit: "contain",
        imageInset: "compact",
        imageSurface: "light",
        mark: "Der MIXER",
      },
      {
        name: "Luca Martinelli — Vandalo Ruins",
        relationship: "Artist & collaborator",
        url: "https://vandalo.art/",
        image:
          "/images/partners-and-friends/luca-martinelli-vandalo-ruins.png",
        imageAlt: "RNMW monogram for Luca Martinelli and Vandalo Ruins",
        imageFit: "contain",
        imageInset: "compact",
        imageSurface: "light",
        mark: "",
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
    // Used in the footer and as the site meta description.
    tagline:
      "Galerie für digitale Kunst in Frankfurt am Main. Wir kuratieren, produzieren und bauen die Technik dahinter.",
    wordmark: "ratata",
    wordmarkSuffix: ".gallery",
  },
  nav: {
    home: "Start",
    exhibitions: "Ausstellungen",
    production: "Produktion",
    tezconEurope: "TezCon Europe",
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
    // "Zwei Spuren / Invers" homepage (docs/Redesign_2a handoff). The handoff
    // flags services, press, platforms, the stats, and the hero line as NEW
    // copy that still needs sign-off from ratata before launch.
    navServices: "Leistungen",
    kickerArt: "01 — Kunst",
    kickerCode: "02 — Technik",
    heroLine1: "Digitale Kunst",
    heroLine2: "braucht echte Wände.",
    lead: "ratata kuratiert digitale Kunst, produziert Ausstellungen auf internationalen Messen und baut die Technik, die sie zum Laufen bringt. Frankfurt am Main, seit 2019.",
    trackArt: "Kunst",
    trackCode: "Technik",
    artBody: "Kuration, Künstler:innen, Ausstellungen, Räume.",
    codeBody:
      "Displays, LED, Projektion, interaktive Systeme, Smart Contracts, Minting.",
    cta: "Projekt anfragen",
    statLabels: [
      "Projekte",
      "Ausstellungen",
      "Produktionen",
      "Städte",
      "Künstler:innen",
    ],
    signalTitle: "Signal",
    signalKicker: "Live aus Instagram & X",
    signalNote: "Beispieldaten — Feed wird zur Laufzeit geladen",
    signalOwn: "Von ratata",
    signalMentions: "Erwähnungen",
    projectsWord: "Projekte",
    worksShown: "Gezeigte Arbeiten",
    archiveLink: "Archiv mit Filtern öffnen",
    servicesTitle: "Was wir liefern",
    services: [
      {
        title: "Kuration & Programm",
        body: "Konzept, Künstlerauswahl, Texte und Werkbeschreibungen — vom Einzelabend bis zum Messestand.",
      },
      {
        title: "Ausstellungsproduktion",
        body: "Aufbau, Displays, LED-Wände, Projektion, Ton, Logistik und Betreuung vor Ort.",
      },
      {
        title: "Technik & Plattformen",
        body: "Interaktive Installationen, Smart Contracts, Minting-Flows und eigene Web-Plattformen.",
      },
    ],
    platformsTitle: "Eigene Plattformen",
    platforms: [
      {
        name: "8scribo",
        year: "2022",
        body: "Haikus schreiben und direkt auf Tezos veröffentlichen.",
      },
      {
        name: "Tesserart",
        year: "2024",
        body: "Digitale Kunstpublikation, verbunden mit Live-Events und Ausstellungen.",
      },
      {
        name: "InfiniteInk",
        year: "2025",
        body: "Von Künstler:innen kontrollierte Editionen mit eigenen Smart Contracts.",
      },
      {
        name: "Tezos AI Helper",
        year: "2026",
        body: "Browserbasierter Assistent für das Tezos-Ökosystem, KI-Anbieter frei wählbar.",
      },
      {
        name: "Collective Voice ID",
        year: "2022–24",
        body: "Installation, die Stimmen der Besucher in animierte Porträts verwandelt.",
      },
    ],
    tezKicker: "Demnächst · 2027",
    tezBody:
      "Die Community-Convention des Tezos-Ökosystems kommt von Seattle nach Frankfurt: Talks, Ausstellung, Livemusik, Minting. Von der Community, für die Community.",
    pressKicker: "Für Redaktionen",
    pressTitle: "Presse",
    // Asset rows (Pressemappe, Bildmaterial, Logo) return here once the files
    // actually exist (handoff §7); until then only the working contact row
    // renders — no unlinked rows, no invented file sizes.
    press: [{ label: "Presseanfragen", note: "info@ratata.gallery" }],
    partnersTitle: "Partner & Freunde",
    tagline: "Galerie für digitale Kunst in Frankfurt am Main.",
  },
  archive: {
    filterLabel: "Nach Rolle filtern",
    empty: "Noch keine Projekte.",
    noMatch: "Keine Projekte passen zu diesem Filter.",
    resultsSuffix: "PROJEKTE",
    resultsSuffixOne: "PROJEKT",
  },
  project: {
    backToArchive: "Zurück zum Archiv",
    overview: "Überblick",
    roleLabel: "Rolle",
    factDates: "Zeitraum",
    factVenue: "Ort",
    factPresentations: "Präsentationen",
    factArtists: "Künstler:innen",
    previousProject: "Vorheriges Projekt",
    nextProject: "Nächstes Projekt",
    linksHeading: "Links & Presse",
    linksPress: "Presse & Links",
    linksSocial: "Social Media",
    linksCrypto: "Crypto-Links",
    indexPlateLinks: "LINKS & PRESSE",
    playLabel: "Abspielen",
    artworksHeading: "Ausgestellte Werke",
    artworksCountSuffix: "Arbeiten",
    artworksFilterLabel: "Arbeiten nach Collection filtern",
    artworksAll: "Alle",
    artworksShown: "Arbeiten angezeigt",
    openFullscreen: "Bild im Vollbild öffnen",
    fullscreenLabel: "Vollbild-Bildansicht",
    closeFullscreen: "Vollbildansicht schließen",
    previousImage: "Vorheriges Bild",
    nextImage: "Nächstes Bild",
  },
  tezcon: {
    eyebrow: "Demnächst",
    heading: "TezCon Europe",
    // PROVISIONAL COPY - venue and program are placeholders until the
    // edition is confirmed; the Seattle background is factual.
    body: "TezCon, die Community-Convention des Tezos-Ökosystems, kommt nach Europa: Talks, Ausstellungen, Livemusik und Minting in Frankfurt am Main.",
    heroImage: "/images/tezcon-europe/frankfurt-skyline-2022.jpg",
    heroImageAlt: "Die Frankfurter Skyline, gesehen über den Main",
    heroImageCredit: "Foto: Jörg Braukmann",
    heroImageLicense: "CC BY-SA 4.0",
    heroImageLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    heroImageSourceLabel: "via Wikimedia Commons",
    heroImageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Frankfurt_Skyline_2022.jpg",
    facts: [
      { label: "Termin", value: "2027" },
      { label: "Ort", value: "Frankfurt am Main, wird noch bekannt gegeben" },
      { label: "Format", value: "Talks · Ausstellung · Livemusik · Minting" },
      { label: "Veranstaltet von", value: "ratata gallery" },
    ],
    seattleHeading: "Von Seattle nach Frankfurt",
    seattleBody: [
      "TezCon begann in Seattle als Grassroots-Convention für das Tezos-Ökosystem: ein von der Community getragenes Treffen von Künstler:innen, Sammler:innen, Entwickler:innen und Denker:innen, entstanden aus dem TezTones-Kollektiv und unterstützt von Tezos Commons. Die Ausgaben in der Kenyon Hall verbanden Paneltalks, kuratierte Ausstellungen, Livemusik und gemeinsames Arbeiten vor Ort – getragen von einem bewusst unkommerziellen Selbstverständnis: Community zuerst.",
      "TezCon Europe bringt dieses Format über den Atlantik. Ausgerichtet von ratata gallery in Frankfurt am Main folgt die europäische Ausgabe derselben Idee: von der Community, für die Community.",
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
    partnersHeading: "Partner & Freunde",
    partnersBody:
      "ratata arbeitet mit Galerien und Plattformen für digitale Kunst an Ausstellungen, Veröffentlichungen und technischer Produktion.",
    partners: [
      {
        name: "Galerie Greulich",
        relationship: "Galerie- & Kurationspartner",
        url: "https://www.galerie-greulich.de/",
        image: "/images/partners-and-friends/galerie-greulich-logo.png",
        imageAlt: "Logo der Galerie Greulich",
        imageFit: "contain",
        imageInset: "compact",
        imageSurface: "light",
        mark: "",
      },
      {
        name: "Tesserart",
        relationship: "Publishing- & Technologiepartner",
        url: "https://tesserart.xyz/",
        image: "/images/partners-and-friends/tesserart-logo.png",
        imageAlt: "Tesserart-Wortmarke auf schwarzem Hintergrund",
        imageFit: "contain",
        imageInset: "compact",
        imageSurface: "light",
        mark: "",
      },
      {
        name: "AI Hub Frankfurt",
        relationship: "Veranstaltungen & KI-Netzwerk",
        url: "https://ai-hub-frankfurt.de/",
        image: "/images/partners-and-friends/ai-hub-frankfurt-logo.png",
        imageAlt: "Logo des AI Hub Frankfurt Rhein-Main",
        imageFit: "contain",
        imageInset: "wide",
        imageSurface: "dark",
        mark: "",
      },
      {
        name: "HOXID",
        relationship: "Künstler",
        url: "https://x.com/HOXID_",
        image: "/images/partners-and-friends/hoxid-logo.png",
        imageAlt: "HOXID-Monogramm",
        imageFit: "contain",
        imageInset: "compact",
        imageSurface: "dark",
        mark: "",
      },
      {
        name: "theVERSEverse",
        relationship: "Digitale Poesie & Publishing",
        url: "https://theverseverse.com/",
        image: "/images/partners-and-friends/theverseverse-logo.png",
        imageAlt: "Logo von theVERSEverse",
        imageFit: "contain",
        imageInset: "wide",
        imageSurface: "light",
        mark: "",
      },
      {
        name: "TZ APAC",
        relationship: "Veranstaltungen & Ökosystem",
        url: "https://www.tzapac.com/",
        image: "/images/partners-and-friends/tz-apac-logo.svg",
        imageAlt: "Logo von TZ APAC",
        imageFit: "contain",
        imageInset: "wide",
        imageSurface: "light",
        mark: "",
      },
      {
        name: "Tezos Commons",
        relationship: "Community & Bildung",
        url: "https://tezoscommons.org/",
        image: "/images/partners-and-friends/tezos-commons-logo.png",
        imageAlt: "Logo von Tezos Commons",
        imageFit: "contain",
        imageInset: "wide",
        imageSurface: "light",
        mark: "",
      },
      {
        name: "teia.cafe",
        relationship: "Kunstplattform & Community",
        url: "https://www.teia.cafe/?feed=latest",
        image: "/images/partners-and-friends/teia-cafe-logo.png",
        imageAlt: "teia.cafe-Wortmarke",
        imageFit: "contain",
        imageInset: "compact",
        imageSurface: "dark",
        mark: "",
      },
      {
        name: "Merzmensch",
        relationship: "Künstler",
        url: "https://merzmensch.com/",
        image: "/images/partners-and-friends/merzmensch.png",
        imageAlt:
          "Merzmensch fotografiert seine Spiegelung in einer verspiegelten Kugel",
        imageFit: "contain",
        imageInset: "compact",
        imageSurface: "light",
        mark: "",
      },
      {
        name: "Der MIXER",
        relationship: "Ausstellungsort & Zusammenarbeit",
        url: "https://www.dermixerffm.eu/ueber-uns-verein/",
        image: "/images/partners-and-friends/der-mixer-logo.png",
        imageAlt: "Logo von Der MIXER",
        imageFit: "contain",
        imageInset: "compact",
        imageSurface: "light",
        mark: "Der MIXER",
      },
      {
        name: "Luca Martinelli — Vandalo Ruins",
        relationship: "Künstler & Zusammenarbeit",
        url: "https://vandalo.art/",
        image:
          "/images/partners-and-friends/luca-martinelli-vandalo-ruins.png",
        imageAlt: "RNMW-Monogramm von Luca Martinelli und Vandalo Ruins",
        imageFit: "contain",
        imageInset: "compact",
        imageSurface: "light",
        mark: "",
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
