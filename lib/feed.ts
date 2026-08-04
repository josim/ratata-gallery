// SIGNAL section data (docs/Redesign_2a handoff §4). Everything here is
// SAMPLE data — the homepage shows a disclosure chip as long as it renders
// this. The mention handles are deliberately fictional and their texts say
// so; never replace them with invented quotes attributed to real accounts.
//
// Wiring plan from the handoff:
// - Own posts: Instagram Graph API for @ratata.gallery, X API v2 user
//   timeline for @ratata_nft (current handle as of Aug 2026 — may change).
//   Fetch server-side, cache/revalidate 15–60 min; never expose a live
//   token to the client.
// - Mentions need a paid X tier or a moderated link table; if neither lands,
//   drop the mentions column and run the section single-column.
// - On failure or an empty feed the section hides entirely (app/page.tsx).

export type FeedPost = {
  platform: "IG" | "X";
  handle: string;
  time: string;
  text: string;
  imageUrl: string;
  permalink?: string;
};

export type FeedMention = {
  platform: "IG" | "X";
  handle: string;
  time: string;
  text: string;
  permalink?: string;
};

export type Feed = {
  posts: FeedPost[];
  mentions: FeedMention[];
  // True until the section is wired to the real APIs — renders the
  // "sample data" disclosure chip. Remove once the feed is live.
  sample: boolean;
};

const ART = "/images/what-hot-shit/artworks";

const SAMPLE_FEED: Feed = {
  sample: true,
  posts: [
    {
      platform: "IG",
      handle: "@ratata.gallery",
      time: "2 h",
      text: "Aufbau Hangar 6: sechs Displays, ein Netzwerk, null Kabel im Bild.",
      imageUrl: `${ART}/atlantis-poster.jpg`,
    },
    {
      platform: "X",
      handle: "@ratata_nft",
      time: "1 d",
      text: "InfiniteInk 1.2 ist live — Editionen auf eigenen Contracts der Künstler:innen.",
      imageUrl: `${ART}/electric-sheep-5-poster.jpg`,
    },
    {
      platform: "IG",
      handle: "@ratata.gallery",
      time: "3 d",
      text: "Deposed 004 von Mario Klingemann, heute im Vorführraum.",
      imageUrl: `${ART}/deposed-004-poster.jpg`,
    },
    {
      platform: "X",
      handle: "@ratata_nft",
      time: "5 d",
      text: "TezCon Europe 2027, Frankfurt am Main. Save the date, Ort folgt.",
      imageUrl: `${ART}/community.webp`,
    },
  ],
  mentions: [
    {
      platform: "X",
      handle: "@collector_0x",
      time: "4 h",
      text: "Beispieltext — Erwähnung wird zur Laufzeit aus der API geladen.",
    },
    {
      platform: "IG",
      handle: "@kurator.ffm",
      time: "1 d",
      text: "Beispieltext — Erwähnung wird zur Laufzeit aus der API geladen.",
    },
    {
      platform: "X",
      handle: "@artist_berlin",
      time: "2 d",
      text: "Sample text — mention is loaded from the API at runtime.",
    },
    {
      platform: "X",
      handle: "@tezos_dev",
      time: "3 d",
      text: "Sample text — mention is loaded from the API at runtime.",
    },
    {
      platform: "IG",
      handle: "@venue.frankfurt",
      time: "6 d",
      text: "Beispieltext — Erwähnung wird zur Laufzeit aus der API geladen.",
    },
    {
      platform: "X",
      handle: "@press_desk",
      time: "1 w",
      text: "Sample text — mention is loaded from the API at runtime.",
    },
  ],
};

export async function getFeed(): Promise<Feed> {
  // The real wiring hasn't landed yet, so the feed comes back empty and the
  // homepage's hide-when-empty path drops the whole SIGNAL section — the page
  // ships complete without it. Set FEED_PREVIEW_SAMPLE=1 to preview the
  // section layout with the sample data (the disclosure chip still renders).
  if (process.env.FEED_PREVIEW_SAMPLE === "1") {
    return SAMPLE_FEED;
  }
  return { posts: [], mentions: [], sample: true };
}
