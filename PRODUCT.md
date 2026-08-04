# Product

## Register

brand

## Users

- **Primary: funders and institutional reviewers.** A grant reviewer at the Kulturamt Frankfurt or the Tezos Foundation, skimming with a stack of other applications open. Within 60 seconds they must read credibility, curation, and professionalism. They cite: project pages need stable URLs and complete metadata (year, venue, city, role).
- **Secondary: the scene.** Artists considering working with ratata, collectors, the Tezos/digital-art community, fair and venue partners, press. They arrive via X or event links and want proof of energy and technical competence.

The job in both cases: verify that ratata is a real, working cultural institution, not a crypto side project.

## Product Purpose

ratata.gallery is the reference and portfolio site for the ratata gallery + collective (Frankfurt am Main): an archive of exhibitions, fairs & events, tech productions (live-minting, installations), and its own platforms (8scribo), all rooted in the Tezos ecosystem. Statically generated Next.js; every project is an MDX file with frontmatter.

Success: a funder leaves convinced this collective bridges digital art and physical spaces with institutional seriousness, and a peer in the scene leaves convinced they also build the infrastructure they exhibit on.

## Brand Personality

**Art meets code** — two voices held in deliberate tension. One track is gallery-calm: warm paper, serif titles, catalogue restraint. The other is technical: near-black surfaces, mono details, heavy grotesque confidence. Precise, dual, confident. Never crypto-flashy, never loud for its own sake.

Three words: **curated, technical, credible**.

## Current design state (transition)

Two coexisting systems, both intentional:

- **Catalogue system** (DESIGN.md, canonical for archive/project/about pages): warm paper `#FBFAF8`, Newsreader + Archivo 400-600, oxblood accent, light-only, hairlines, zero radius.
- **Zwei Spuren / Invers** (branch `redesign-2a`, homepage): two-track art-white/code-black layout, Archivo 700-900, JetBrains Mono, `spur-*` tokens in `tailwind.config.ts`.

Zwei Spuren will eventually take over, but it stays on its branch until merged. Until then: new archive/project work follows DESIGN.md; homepage work follows the `spur-*` system. Do not blend tokens across the two (`spur-*` never leaks into catalogue pages and vice versa). When the merge happens, DESIGN.md gets rewritten (`/impeccable document`).

## Anti-references

- **web3/crypto marketing sites**: neon, gradients, glassmorphism, glow, animated meshes, wallet-connect chrome, "cyber" fonts. ratata's Tezos roots show through work, never through styling.
- **Dark-default crypto portfolio templates.** The code-black track of Zwei Spuren is an authored counterweight to the paper track, not a dark theme.
- **Generic agency/portfolio scaffolding**: hero claim, endless equal-weight card grids, testimonial strips.
- **Placeholder affordances**: "coming soon", broken-image icons, dashed boxes. Image-less projects render as finished text plates (DESIGN.md §5.4).

## Design Principles

1. **The 60-second funder test.** Every surface must read credibility, curation, and professionalism to an institutional skimmer before anything else. When in doubt, choose the quieter option.
2. **The archive is the product.** Stable, cite-able project pages and a scannable index are the core UX. Design serves findability and evidence.
3. **Complete at every state.** Text-only, one image, or a full gallery: every card and page looks intentional. Content gaps are design inputs, never visible gaps.
4. **Two tracks, one house.** Art and code are shown as equal, separate registers (paper/serif vs. black/mono), each disciplined on its own surface. The tension is the identity; blending them dilutes both.
5. **Evidence over claims.** Show curated proof (selected projects, real counts, press links), not marketing language. Curation beats inventory: a few chosen items outrank a complete dump.

## Accessibility & Inclusion

- WCAG 2.1 AA minimum; the catalogue palette is contrast-verified per pair in DESIGN.md §3.3 (re-verify any new pairing, including all `spur-*` combinations).
- Colorblind-safe by construction: role distinction always carries the word, never color alone; links are underlined.
- `prefers-reduced-motion` respected everywhere (no autoplaying loops, transitions degrade to instant).
- Fully keyboard operable: real buttons, visible focus rings, focus-trapped overlays.
- Bilingual DE/EN (latin-ext subsets for umlauts/ß); dense German legal text (Impressum, Datenschutz) must stay legible at small sizes.
