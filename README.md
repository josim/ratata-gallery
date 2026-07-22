# ratata gallery — website

Static Next.js (App Router) site for ratata gallery: exhibitions, fairs &
events, tech productions, and platforms. All project content is authored as
MDX files with YAML frontmatter and statically generated at build time.

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
```

Produces a fully static build (no client-side data fetching); every route is
generated at build time via `generateStaticParams`.

## How to add a project

Add a new `.mdx` file under `content/projects/`. The filename (without
extension) becomes the URL slug, e.g. `content/projects/my-show.mdx` →
`/projects/my-show`.

Each file needs YAML frontmatter followed by a short (2–4 sentence) MDX
description body:

```mdx
---
title: "My Show"
year: 2024
dates: "Jan 27 – Feb 25, 2024"
venue: "Kunstverein Somewhere"
city: "Berlin"
category: "exhibition"
role: "Curated"
featured: true
images:
  - "/images/my-show/01.jpg"
  - "/images/my-show/02.mp4"
links:
  - label: "Press release"
    url: "https://example.com/press"
---

A short description of the project, two to four sentences long.
```

### Frontmatter fields

| Field      | Type                                                     | Required | Notes                                             |
| ---------- | --------------------------------------------------------- | -------- | -------------------------------------------------- |
| `title`    | `string`                                                   | yes      |                                                    |
| `year`     | `number`                                                   | yes      | primary sort key (newest first)                   |
| `dates`    | `string`                                                   | no       | human-readable date range                          |
| `venue`    | `string`                                                   | no       |                                                    |
| `city`     | `string`                                                   | no       |                                                    |
| `category` | `"exhibition" \| "fair" \| "tech" \| "platform"`           | yes      | determines which archive page lists the project    |
| `role`     | `"Curated" \| "Booth" \| "Tech Lead" \| "Platform"`        | yes      | shown as a badge; used for the archive role filter |
| `featured` | `boolean`                                                  | no       | shows the project on the homepage                  |
| `images`   | `string[]`                                                 | no       | paths under `/images/`; `.mp4`/`.webm` render as video |
| `links`    | `{ label: string; url: string }[]`                         | no       | shown under "Links & Press"                        |

The loader (`lib/projects.ts`) reads and sorts all projects by `year`
descending; missing or empty `content/projects/` resolves to an empty list
rather than throwing.
