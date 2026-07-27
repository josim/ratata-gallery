import Link from "next/link";
import Image from "next/image";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { strings } from "@/lib/strings";
import { projectMeta } from "@/lib/format";
import ProjectCard from "@/components/ProjectCard";
import RoleBadge from "@/components/RoleBadge";

// Editorial pick for the lead plate (DESIGN.md §5.9 - the home hero is the one
// surface allowed a highlight beneath the display-xl headline). Swap the slug
// to re-cast the plate; the caption, badge and link all follow the project.
const LEAD_SLUG = "what-hot-shit";

// How many artworks the closing contact sheet shows before linking out.
const SHEET_LIMIT = 24;

// First sentence of a project body - used as the caption in the lead plate and
// the contact sheet. Bodies are plain prose (no markdown syntax).
function firstSentence(content: string): string {
  const text = content.trim().replace(/\s+/g, " ");
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
}

function projectCount(count: number): string {
  const suffix =
    count === 1 ? strings.archive.resultsSuffixOne : strings.archive.resultsSuffix;
  return `${count} ${suffix}`;
}

const LINK_CLASS =
  "text-body text-accent underline decoration-1 underline-offset-[0.15em] hover:text-accent-hover hover:decoration-2";

// The home listing groups by category (mirroring the site nav) rather than by
// year - each section links through to its full archive page.
const CATEGORY_SECTIONS = [
  { category: "exhibition", heading: strings.pages.exhibitions.heading, href: "/exhibitions" },
  { category: "production", heading: strings.pages.production.heading, href: "/production" },
] as const;

export default function HomePage() {
  const projects = getAllProjects();

  const lead = getProjectBySlug(LEAD_SLUG);
  const leadImage = lead?.images?.[0];

  const showcase = projects.find((p) => p.artworkSections?.length);
  const showcaseWorks = (showcase?.artworkSections ?? []).flatMap(
    (section) => section.items
  );

  return (
    <div className="space-y-16 md:space-y-24">
      <section>
        <p className="text-meta uppercase text-ink-muted">
          {strings.home.eyebrow}
        </p>
        <h1 className="mt-5 max-w-[18ch] text-balance font-serif text-display-xl font-normal text-ink">
          {strings.home.missionHeading}
        </h1>
        <p className="mt-6 max-w-measure text-body-l text-ink-secondary">
          {strings.home.missionBody}
        </p>
      </section>

      {lead && leadImage && (
        <section
          aria-labelledby="lead-title"
          className="grid gap-8 border-t border-line pt-12 md:pt-16 lg:grid-cols-12 lg:items-center lg:gap-12"
        >
          <Link
            href={`/projects/${lead.slug}`}
            className="block border border-line bg-paper-card transition-colors duration-150 ease-out hover:border-ink-muted lg:col-span-7"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={leadImage}
                alt={lead.title}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </Link>

          <div className="lg:col-span-5">
            <p className="text-meta uppercase text-ink-muted">
              {strings.home.leadEyebrow}
            </p>
            <div className="mt-4">
              <RoleBadge role={lead.role} />
            </div>
            <h2
              id="lead-title"
              className="mt-4 font-serif text-title-l font-medium text-ink"
            >
              <Link
                href={`/projects/${lead.slug}`}
                className="transition-colors duration-150 ease-out hover:text-accent"
              >
                {lead.title}
              </Link>
            </h2>
            <p className="mt-3 text-meta uppercase text-ink-muted">
              {projectMeta(lead)}
            </p>
            <p className="mt-5 max-w-measure text-body text-ink-secondary">
              {firstSentence(lead.content)}
            </p>
            <Link
              href={`/projects/${lead.slug}`}
              className={`mt-6 inline-block ${LINK_CLASS}`}
            >
              {strings.home.leadLink} →
            </Link>
          </div>
        </section>
      )}

      {CATEGORY_SECTIONS.map(({ category, heading, href }) => {
        const items = projects.filter(
          (project) => project.category === category
        );
        if (items.length === 0) return null;
        return (
          <section
            key={category}
            aria-labelledby={`section-${category}`}
            className="border-t border-line pt-12 md:pt-16"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h2
                id={`section-${category}`}
                className="font-serif text-title-m font-medium text-ink"
              >
                {heading}
              </h2>
              <p className="text-meta uppercase text-ink-muted [font-variant-numeric:tabular-nums]">
                {projectCount(items.length)}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
              {items.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>

            <Link href={href} className={`mt-6 inline-block ${LINK_CLASS}`}>
              {strings.home.viewAll} →
            </Link>
          </section>
        );
      })}

      {showcase && showcaseWorks.length > 0 && (
        <section
          aria-labelledby="works-heading"
          className="border-t border-line pt-12 md:pt-16"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <div>
              <p className="text-meta uppercase text-ink-muted">
                {strings.home.worksEyebrow}
              </p>
              <h2
                id="works-heading"
                className="mt-2 font-serif text-title-m font-medium text-ink"
              >
                {showcase.title}
              </h2>
            </div>
            <p className="text-meta uppercase text-ink-muted [font-variant-numeric:tabular-nums]">
              {showcaseWorks.length} {strings.home.worksCountSuffix}
            </p>
          </div>
          <p className="mt-3 max-w-measure text-body text-ink-secondary">
            {firstSentence(showcase.content)}
          </p>

          <ul className="mt-8 grid grid-cols-4 gap-px border border-line bg-line sm:grid-cols-6 lg:grid-cols-8">
            {showcaseWorks.slice(0, SHEET_LIMIT).map((artwork) => (
              <li
                key={artwork.image}
                className="relative aspect-video bg-paper-card"
              >
                <Image
                  src={artwork.image}
                  alt={`${artwork.title} - ${artwork.artist}`}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 12vw, (min-width: 640px) 16vw, 25vw"
                  className="object-contain"
                />
              </li>
            ))}
          </ul>

          <Link
            href={`/projects/${showcase.slug}`}
            className={`mt-6 inline-block ${LINK_CLASS}`}
          >
            {strings.home.worksLink} →
          </Link>
        </section>
      )}

      <section
        aria-labelledby="tezcon-heading"
        className="border border-line bg-paper-sunk p-8 sm:p-12"
      >
        <p className="text-meta uppercase text-ink-muted">
          {strings.home.tezconEyebrow}
        </p>
        <h2
          id="tezcon-heading"
          className="mt-2 font-serif text-title-m font-medium text-ink"
        >
          {strings.home.tezconHeading}
        </h2>
        <p className="mt-3 max-w-measure text-body text-ink-secondary">
          {strings.home.tezconTeaser}
        </p>
        <Link href="/tezcon-europe" className={`mt-4 inline-block ${LINK_CLASS}`}>
          {strings.home.tezconLink} →
        </Link>
      </section>
    </div>
  );
}
