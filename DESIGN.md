# DESIGN.md — ratata.gallery

Visual identity and implementation spec for **ratata.gallery**, the reference/portfolio
site for the ratata gallery + collective (Frankfurt, Tezos).

This document is the single source of truth for the site's look and feel. Read it before
building or restyling any surface. It supersedes any earlier "Community Terminal" identity —
that concept is **not** used here.

> **Audience reality check:** the first visitor is a grant reviewer at the Kulturamt Frankfurt
> or the Tezos Foundation. Within 60 seconds they must read _credibility, curation, and
> professionalism_. Every decision below is subordinate to that goal. When in doubt, choose
> the quieter option.

---

## 1. Design concept

**"The catalogue, not the crypto site."** ratata.gallery is styled as a printed exhibition
catalogue rendered for the web: warm paper, black ink, one restrained editorial accent, and a
disciplined serif/grotesque pairing. The chrome is deliberately near-invisible so that
artwork imagery — when present — carries all the visual weight; where images are missing, the
same typographic system turns a project into a composed **index plate** that looks finished,
not empty. The result reads as a cultural institution's archive: authoritative, calm,
image-forward, and completely free of web3 signaling.

Three principles, in priority order:

1. **Restraint over expression.** No effect earns its place unless it improves legibility or
   hierarchy. Whitespace and type do the work.
2. **The archive is the product.** Stable, cite-able project pages and a scannable index are
   the core UX. Design serves findability and credibility.
3. **Complete at every state.** Text-only, one image, or a full gallery — every card and page
   must look intentional. "Coming soon" / broken-image affordances are forbidden.

---

## 2. Typography

Two self-hosted families, both on Google Fonts and therefore installable via `next/font/google`
(fonts are bundled and served from our own origin — **no external CDN, no Google request at
runtime**; this satisfies both Lighthouse and DSGVO). No third display face, no icon font.

| Role | Family | Rationale |
|---|---|---|
| Display / headings / project titles / wordmark | **Newsreader** (serif) | Editorial optical-size serif; reads "Kunsthalle / journal," gives cultural gravitas without decoration. |
| Body / UI / navigation / labels / badges / legal | **Archivo** (grotesque sans) | Neutral functional grotesque with just enough character to avoid the default-Inter "template" look; excellent at small sizes for dense German legal text. |

### 2.1 next/font setup (reference)

```ts
// app/fonts.ts
import { Newsreader, Archivo } from "next/font/google";

export const serif = Newsreader({
  subsets: ["latin", "latin-ext"],   // latin-ext = German umlauts, ß
  weight: ["400", "500"],            // display sizes only; keep the axis lean
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

export const sans = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
});
```

Apply `${serif.variable} ${sans.variable}` on `<html>`. Ship **only** the weights listed.
Do not add Archivo 700+ or extra Newsreader weights without removing others — font payload is
the main Lighthouse risk here.

### 2.2 Type scale

Base font size `16px` (`1rem`). Fluid where marked, using `clamp()`. Line-heights are unitless.

| Token | Font | Size (rem / fluid) | Weight | Line-height | Tracking | Use |
|---|---|---|---|---|---|---|
| `display-xl` | Newsreader | `clamp(2.5, 5vw, 4)` | 400 | 1.05 | -0.02em | Home hero headline (one per page max) |
| `display-l` | Newsreader | `clamp(2, 3.5vw, 3)` | 400 | 1.08 | -0.015em | Page hero titles (Exhibitions, etc.) |
| `title-l` | Newsreader | `1.75` | 500 | 1.15 | -0.01em | Project page title |
| `title-m` | Newsreader | `1.375` | 500 | 1.2 | -0.01em | Card title, section headers |
| `title-s` | Newsreader | `1.125` | 500 | 1.25 | 0 | Small headings, related items |
| `body-l` | Archivo | `1.125` | 400 | 1.6 | 0 | Lead paragraph / mission statement |
| `body` | Archivo | `1` | 400 | 1.6 | 0 | Default paragraph, descriptions |
| `body-s` | Archivo | `0.875` | 400 | 1.55 | 0 | Captions, secondary text |
| `meta` | Archivo | `0.75` | 500 | 1.4 | 0.08em, UPPERCASE | Metadata line (year · venue · city), badge text, eyebrows |
| `nav` | Archivo | `0.9375` | 500 | 1 | 0.01em | Header nav links |

**Rules**

- **Serif for names, sans for information.** Titles, headlines, and the wordmark are
  Newsreader. Everything a user _reads to get facts_ (nav, metadata, descriptions, filters,
  legal) is Archivo. Never mix within one line except the wordmark.
- **Prose measure:** cap running text at **68ch** (`--measure`, ≈ 720px). Never full-bleed body text.
- **One `display-xl` per page.** Hierarchy comes from size + whitespace, not from adding weights or colors.
- **Metadata is UPPERCASE + `0.08em` tracking**, always in the `meta` token. This is the
  "catalogue" tell and unifies every card, badge, and eyebrow.
- **Numbers/dates**: use `font-variant-numeric: tabular-nums` on the index table and any
  aligned figures (mint counts, years).
- **Italics carry one meaning: this is a work.** Newsreader italic marks artwork and exhibition
  titles — in prose, and in the artwork tombstone (§5.10). Never italicize sans, and never
  italicize a *project* title: ratata's own exhibitions, fairs, and productions stay roman
  (§5.3), so roman-vs-italic alone tells a reader whether they are looking at something ratata
  did or something an artist made.

---

## 3. Color

A warm paper-and-ink system. **Light theme only — this is deliberate** (see §7). The palette
is intentionally small: two "surfaces," four ink tints, one accent, four muted role hues,
plus derived borders/tints.

All values below are verified against WCAG 2.1 AA. Ratios computed on `--paper` (#FBFAF8)
unless noted.

### 3.1 CSS custom properties

```css
:root {
  /* Surfaces */
  --paper:        #FBFAF8; /* page background — warm off-white, gallery wall */
  --paper-sunk:   #F4F2EC; /* tinted panels, text-plate cards, filter bar */
  --card:         #FFFFFF; /* image card / media background */

  /* Ink (text) */
  --ink:          #1A1918; /* primary text            16.8:1 ✓ AAA */
  --ink-secondary:#55524D; /* secondary text, captions 7.46:1 ✓ AAA */
  --ink-muted:    #767169; /* metadata, tertiary       4.64:1 ✓ AA  */

  /* Lines */
  --hairline:     #E4E0D9; /* decorative separators, card frames (non-text) */
  --control-line: #948C7E; /* input/control outlines   ~3.0:1 ✓ (UI 1.4.11) */

  /* Accent — restrained editorial oxblood. Links, focus, active state. */
  --accent:       #A5372A; /*                          6.33:1 ✓ AA text */
  --accent-hover: #8A2C21; /* darker, hover/pressed                       */
  --accent-tint:  #F5E7E4; /* active-filter fill, selection wash          */

  /* Role hues — muted museum tones. Used as badge text + 6px marker. */
  --role-curated: #A5372A; /* Curated  — ties to accent 6.33:1 ✓ */
  --role-booth:   #3E5C50; /* Booth    — muted forest   7.06:1 ✓ */
  --role-tech:    #2E4A6B; /* Tech Lead— muted slate     8.72:1 ✓ */
  --role-platform:#6B4A7A; /* Platform — muted plum      6.98:1 ✓ */

  /* Role tint fills (active filter / selected state) */
  --role-curated-tint:  #F5E7E4;
  --role-booth-tint:    #E6EDE9;
  --role-tech-tint:     #E5EAF1;
  --role-platform-tint: #ECE6F0;

  --focus-ring:  var(--accent);
  --measure:     68ch;
}
```

### 3.2 Tailwind config (reference)

```js
// tailwind.config.js — theme.extend.colors
colors: {
  paper:   { DEFAULT: "#FBFAF8", sunk: "#F4F2EC", card: "#FFFFFF" },
  ink:     { DEFAULT: "#1A1918", secondary: "#55524D", muted: "#767169" },
  line:    { DEFAULT: "#E4E0D9", control: "#948C7E" },
  accent:  { DEFAULT: "#A5372A", hover: "#8A2C21", tint: "#F5E7E4" },
  role: {
    curated:  "#A5372A", booth: "#3E5C50", tech: "#2E4A6B", platform: "#6B4A7A",
    "curated-tint":  "#F5E7E4", "booth-tint": "#E6EDE9",
    "tech-tint":     "#E5EAF1", "platform-tint": "#ECE6F0",
  },
},
fontFamily: {
  serif: ["var(--font-serif)", "Georgia", "serif"],
  sans:  ["var(--font-sans)", "system-ui", "sans-serif"],
},
```

### 3.3 Contrast verification (key pairs)

| Foreground | Background | Ratio | Passes |
|---|---|---|---|
| `--ink` | `--paper` | 16.8:1 | AAA |
| `--ink-secondary` | `--paper` | 7.46:1 | AAA |
| `--ink-muted` (metadata) | `--paper` | 4.64:1 | AA (normal text) |
| `--ink-muted` | `--paper-sunk` | 4.35:1 | AA (normal text)* |
| `--accent` link | `--paper` | 6.33:1 | AA |
| `--accent` link | `--card` #fff | 6.60:1 | AA |
| white | `--accent` fill | 6.60:1 | AA |
| `--role-tech` (darkest) | `--paper` | 8.72:1 | AAA |
| `--role-curated` (lightest role) | `--paper` | 6.33:1 | AA |
| `--role-curated` | `--role-curated-tint` | 5.5:1 | AA |
| `--control-line` outline | `--paper` | ~3.0:1 | AA (1.4.11 non-text) |

\* Metadata on `--paper-sunk` clears 4.5:1 by a hair; if a designer darkens the panel, re-verify
or promote metadata to `--ink-secondary`. **Rule: never place `--ink-muted` on `--card` or any
surface darker than `--paper-sunk` without re-checking.**

**Usage rules**

- Links are `--accent`, **underlined** (offset `0.15em`, `1px`), thickening to `2px` on hover +
  color → `--accent-hover`. Never rely on color alone.
- Accent is a seasoning: links, focus rings, the active filter, and at most one hero accent mark.
  If a page shows more than ~3 accent elements above the fold, remove some.
- Body text is `--ink`; captions/secondary `--ink-secondary`; metadata `--ink-muted`.

---

## 4. Layout

### 4.1 Container & grid

- **Content container:** `max-width: 1200px`, centered, side padding `clamp(20px, 5vw, 64px)`.
- **Wide container** (heroes, full-bleed galleries): `max-width: 1440px`.
- **Prose column:** `max-width: var(--measure)` (68ch).
- **Grid:** 12 columns, `column-gap: 24px` desktop / `16px` mobile. Cards snap to a
  simple auto-fill grid (below), not manual col spans, for CMS-friendliness.

### 4.2 Spacing scale (4px base)

`4, 8, 12, 16, 24, 32, 48, 64, 96, 128` px → Tailwind `1,2,3,4,6,8,12,16,24,32`.
Vertical section rhythm: **96px** desktop / **64px** mobile between major sections.
Card internal padding: **24px** (image cards), **28–32px** (text plates — they need more air).

### 4.3 Breakpoints (Tailwind defaults) & responsive behavior

| BP | Width | Card grid | Nav | Hero |
|---|---|---|---|---|
| base | <640 | 1 col | hamburger drawer | title 2.5rem, stacked |
| `sm` | 640 | 1 col | hamburger | — |
| `md` | 768 | 2 col | inline nav appears | 2-col possible |
| `lg` | 1024 | 3 col | inline nav | full |
| `xl` | 1280 | 3 col (wider) | inline nav | full |

Card grid = `grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px 24px;`
so it degrades gracefully regardless of item count (important — many sections have few items).

**No horizontal page scroll, ever.** Wide tables/galleries scroll inside their own
`overflow-x: auto` container.

### 4.4 One archive presentation

Every archive (Exhibitions, Fairs & Events, Tech Productions) renders as a single sequence of
full-width entries (§5.3) — one presentation, no view switcher.

An alternate "Index view" (a sortable `Year · Title · Venue/City · Role` table) was specified
and built, then removed: it shipped behind a disabled flag, was never reachable, and duplicated
in a weaker form what the entry sequence already does. **Do not reintroduce a view toggle.** The
site looks complete before photos arrive because of the text-only entry treatment (§5.4 / §6),
not because a second view exists.

The role filter chips (§5.6) remain in the code behind `SHOW_CONTROLS` in
`components/ArchiveList.tsx`, still disabled, pending a decision on whether filtering earns its
place at the current project count.

---

## 5. Component specs

### 5.1 Header / nav

- Sticky, `--paper` background, `1px` bottom `--hairline`. Height 64px (56px mobile). No shadow.
- Left: **wordmark** — `ratata` lowercase, Newsreader 500, `1.25rem`, `-0.01em`, `--ink`.
  Optional `.gallery` suffix in `meta` token, `--ink-muted`, baseline-aligned.
- Right: nav links (`nav` token) — Exhibitions · Fairs & Events · Tech Productions · Platforms ·
  Tezcon Europe · About. Active link: `--ink` + `2px` underline in `--accent`; inactive: `--ink-secondary`.
- Mobile: wordmark + hamburger → full-height drawer, links stacked at `title-s`, generous 16px vertical rhythm.
- Language switch (EN / DE) sits at nav's far right as a `meta`-token toggle; renders even in
  v1 (DE can point to a "coming soon" or be hidden until content exists — keep the slot).

### 5.2 Footer

- `--paper-sunk` background, `1px` top `--hairline`, padding 64px vertical.
- Three columns (stack on mobile): (1) wordmark + one-line mission; (2) site map links;
  (3) legal — **Impressum**, **Datenschutz**, contact email. All links `--ink-secondary`,
  underline on hover.
- Bottom row `meta` token, `--ink-muted`: `© {year} ratata · Frankfurt am Main`.
- No newsletter form, no social icon wall. One optional text link per external presence.

### 5.3 Project card — image variant

- Container: `--card` background, `1px --hairline` frame, **0 border-radius**, no shadow.
- Media on top (§6), then padding-24 body:
  - Role badge (§5.5), then `title-m` project title (`--ink`),
  - `meta` line: `YEAR · VENUE · CITY`,
  - optional 1-line `body-s` `--ink-secondary` teaser (first sentence, clamped).
- Whole card is one link. Hover: frame → `--ink-muted`, title → `--accent`; `150ms` ease.
  No lift/scale/zoom.

### 5.4 Project card — **text-only variant** (`--textual`)

The default state for image-less projects. **Must look like a design choice, never a gap.**

- Container: `--paper-sunk` background, `1px --hairline` frame, padding **28–32px**,
  min-height matched to sibling image cards (`aspect-ratio` or `min-height: 320px`) so grids stay even.
- Composition (a small "index plate"):
  - Top: role badge.
  - Center: `title-m`→`title-l` project title in Newsreader, generously sized — the title _is_ the visual.
  - A `1px` hairline rule under the title.
  - `meta` line: `YEAR · VENUE · CITY`.
  - Bottom: `meta` `--ink-muted` count, e.g. `4 LINKS & PRESS →` (pull from the links list —
    turns "no image" into "here's the evidence trail").
- A faint role-hued left keyline (`3px` solid `--role-*`) may run full height to differentiate
  role at a glance. Nothing else colored.
- **Never** render: gray photo icon, "image coming soon," dashed placeholder box, blurred stock.

Both card variants are visually equal citizens of the same grid. A section may freely mix them.

### 5.5 Role badge

Core, reusable, quiet-but-distinct. Filterable.

- Form: inline-flex, `meta` token (UPPERCASE, `0.08em`), padding `4px 8px`, `1px` border in the
  role hue at 40% (`color-mix(in srgb, var(--role-x) 40%, transparent)`), **transparent fill**,
  0 radius. A `6px` square marker in the solid role hue precedes the label.
- Text color = the role hue itself (all four ≥6.3:1 on paper ✓). Distinction comes from
  hue + the always-present word — colorblind-safe by construction.
- The four badges and their tokens:

  | Label | Hue token | Meaning |
  |---|---|---|
  | `CURATED` | `--role-curated` (oxblood) | Curation / organization of shows |
  | `BOOTH` | `--role-booth` (forest) | Fair / event booth presence |
  | `TECH LEAD` | `--role-tech` (slate) | Live-minting, installations, integration |
  | `PLATFORM` | `--role-platform` (plum) | Own tools (8scribo, etc.) |

- A project may carry more than one badge; wrap, don't truncate.
- **Selected/active in a filter:** fill switches to `--role-*-tint`, border to solid role hue.

### 5.6 Archive filter

- A horizontal bar above the grid/index, on `--paper-sunk`, `1px --hairline` below.
- Left: the four role badges rendered as **toggle chips** (multi-select; AND/OR = OR).
  Default = all active/none = show all. Selected chip uses the active tint fill from §5.5.
- Right: view toggle **Grid / Index** (`meta` token, active underlined in `--accent`) and a
  result count `12 PROJECTS` in `--ink-muted`.
- Fully keyboard operable: chips are real `<button aria-pressed>`; focus ring = `2px --accent`
  offset `2px`. Filtering updates a URL query param (`?role=tech-lead`) so filtered views are
  shareable/cite-able (matches the brief's "stable URL" goal).
- No animation beyond a `120ms` opacity/fill transition. No results → a calm `body`
  `--ink-secondary` line: "No projects match this filter."

### 5.7 Image gallery

- Layout: lead image full container width (respect natural aspect ratio, `max-height: 80vh`),
  remaining media in a `minmax(240px,1fr)` grid, `16px` gap, `--card` cells with `1px --hairline`.
- **Lazy loading:** `next/image` with `loading="lazy"`, `sizes` set per breakpoint,
  explicit `width`/`height` to reserve space (CLS = 0). LCP hero image gets `priority`.
- **Video loops (mp4/webm):** `<video muted loop playsinline autoplay preload="metadata"
  poster="…">` with `<source type="video/webm">` then `video/mp4`. Poster is a real frame so a
  still shows before load and where autoplay is blocked. Respect
  `@media (prefers-reduced-motion: reduce)` → do not autoplay; show poster + a play control.
- Lightbox optional (v1 can omit): if built, plain overlay `--ink` at 92%, arrow keys + ESC,
  focus-trapped. No captions overlaid on art.
- Captions sit **below** media in `body-s` `--ink-secondary`, composed as `caption · credit` from
  the two optional frontmatter fields of the same name. Both are free prose describing the
  photograph ("Installation view at Galerie Greulich"), **not** a tombstone — a gallery image is
  usually a view of a space, not a reproduction of one work. When an image *is* a single work,
  caption it with the tombstone of §5.10 and set the title in Newsreader italic.

### 5.8 Links & Press list

- Section heading `title-s` "Links & Press".
- Each item: a row with the source name (`body`, `--accent`, underlined) + a `meta`
  `--ink-muted` source tag (`OBJKT` · `X` · `PRESS` · `MALLOW`). External links get a small
  `↗` glyph and `rel="noopener"`, `target="_blank"`.
- Rows separated by `1px --hairline`, `12px` vertical padding. Long lists are fine —
  they are the credibility trail. **Do not hotlink X/press images** (brief §5); link out only.

### 5.9 Page hero

- Per-section hero: eyebrow (`meta`, `--ink-muted`, e.g. `EXHIBITION ARCHIVE`), then
  `display-l` title (Newsreader), then optional `body-l` intro capped at `--measure`.
- No background image, no gradient, no full-bleed color. Whitespace + type only. `96px` bottom margin.
- **Home** hero is the one exception permitted `display-xl` + a 3–4 project "highlight reel"
  directly beneath (reuses §5.3 cards). Mission statement in `body-l`, ≤2 sentences.

### 5.10 Artwork tombstone

Used wherever a work by a named artist is listed (`components/ArtworkGrid.tsx`). Field order
follows the convention every art publication shares — Artforum, Frieze, Artsy and e-flux all
credit the artist before the work:

```
ARTIST NAME          meta, UPPERCASE 0.08em, --ink-muted
Title of the Work    title-s, Newsreader ITALIC
Curator              body-s, --ink-secondary   (optional)
```

- **The artist comes first.** ratata shows other people's work; the credit leads.
- **The title is the link.** Where an `url` exists (objkt, etc.) the italic title carries it in
  `--accent` with the `↗` glyph; otherwise it renders as plain `--ink`.
- Never set the title in sans, and never uppercase it. Italic serif is the tell that this line
  names a work rather than a place, a person, or a project (§2.2).
- `year`, `medium` and `dimensions` are not yet modelled in `Artwork`. When they are, they append
  after the title as `, year` then a `body-s` `--ink-secondary` line, matching catalogue order.

---

## 6. Image treatment & placeholder strategy

**Treatment**

- Art is shown **honestly**: no filters, duotones, forced crops, drop shadows, or rounded
  corners. Neutral `--card` (#fff) behind, optional `1px --hairline` frame — a mat, not a bezel.
- Preserve native aspect ratios; never crop artwork to a fixed square unless the source is square.
  Constrain with `max-height`, not `object-fit: cover`, on primary artwork.
- Formats: prefer AVIF/WebP via `next/image`; supply `width`/`height` to prevent layout shift.
  Target ≤200KB per served image at grid size; full-res only in lightbox.
- Motion loops (mp4/webm) follow §5.7. Keep loops short, muted, poster-backed.

**Placeholder strategy (image-less projects)** — the load-bearing decision of this design:

- There are **no placeholders.** A project without images renders as the **text-only card
  variant** (§5.4) and, on its own page, as a **text-forward project layout**: large serif
  title, metadata, role badge, full description, and the Links & Press list carrying the weight.
- This is why the catalogue concept was chosen: the typographic system is designed to look
  finished with zero imagery. A funder skimming an all-text section sees a considered index,
  not an unfinished site.
- When the client later supplies photos, cards simply gain a media block — **no layout
  rework, no design debt.** Mixed image/text grids are an accepted, permanent state.

---

## 7. Anti-patterns — do not do these

Keep the identity coherent; future contributors must not introduce:

- **Dark mode / theme switching.** Light-only is intentional: institutional credibility,
  simpler Lighthouse/accessibility surface, and a deliberate distance from dark-default crypto
  sites. Do not add a dark theme or a multi-theme system.
- **web3 signaling:** neon, gradients, glassmorphism/blur, glow, animated mesh backgrounds,
  wallet-connect buttons, gradient text, "cyber" fonts. None of it.
- **Shadows for depth.** Hierarchy is hairlines + whitespace + the paper/sunk surface pair only.
- **A third typeface or an icon font.** Two families, a couple of inline SVG glyphs (`↗`, arrows) max.
- **Loud role badges.** No solid saturated fills, no white-on-color pills. Badges stay quiet
  (hue text + marker + hairline). If a badge shouts, it's wrong.
- **Placeholder / "coming soon" / broken-image affordances.** See §6 — text variant instead, always.
- **Accent overuse.** More than ~3 accent elements in a viewport = dilute; pull back to ink.
- **Motion:** no scroll-jacking, parallax, entrance animations, or card hover lift/zoom.
  Transitions are ≤150ms color/opacity only, and all respect `prefers-reduced-motion`.
- **Full-bleed body text** or hero background images. Text respects `--measure`; heroes are typographic.
- **External font/asset CDNs** (Google Fonts runtime, unpkg, etc.) — DSGVO + performance
  violation. Everything self-hosted through `next/font` and the app's own origin.
- **Cramped metadata.** Keep the UPPERCASE `0.08em` tracking; it's the catalogue signature.

---

## Quick token reference

```
Fonts     serif=Newsreader (400/500)   sans=Archivo (400/500/600)
Surfaces  paper #FBFAF8 · sunk #F4F2EC · card #FFFFFF
Ink       #1A1918 · #55524D · #767169
Lines     hairline #E4E0D9 · control #948C7E
Accent    #A5372A · hover #8A2C21 · tint #F5E7E4
Roles     Curated #A5372A · Booth #3E5C50 · Tech Lead #2E4A6B · Platform #6B4A7A
Spacing   4·8·12·16·24·32·48·64·96·128
Container 1200 (wide 1440) · measure 68ch
Radius    0 everywhere       Shadows  none       Theme  light only
```
