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

const SAMPLE_FEED: Feed = {
  sample: true,
  // Empty on purpose: the homepage hides the whole SIGNAL section while there
  // are no posts. Fill this from the real APIs when the feed gets wired.
  posts: [],
  // Empty until the mentions source exists: placeholder mention texts are bad
  // data on a public page. The homepage runs the section single-column while
  // this is empty and picks the two-column layout back up on its own.
  mentions: [],
};

export async function getFeed(): Promise<Feed> {
  return SAMPLE_FEED;
}
