import Link from "next/link";
import Image from "next/image";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import { getLang, getStrings } from "@/lib/lang";
import type { Strings } from "@/lib/strings";
import { projectMeta } from "@/lib/format";

// Editorial picks keep the homepage persuasive while the compact indexes below
// retain access to the complete archive.
const LEAD_SLUG = "positions-berlin-2024";
const HIGHLIGHT_SLUGS = {
  exhibition: [
    "positions-berlin-2022",
    "pixposure",
    "i-airtist",
  ],
  production: [
    "nfc-summit-lisbon",
    "deutsche-bank-ai-art-night",
    "uai-talent-night",
  ],
} as const;

const EVIDENCE_SLUGS = [
  "positions-berlin-2022",
  "deutsche-bank-ai-art-night",
  "nfc-summit-lisbon",
] as const;

// Nine works form a deliberate three-row salon hanging on the homepage.
const SHEET_LIMIT = 9;

const SALON_SPANS = [
  "lg:col-span-5",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
] as const;

// First sentence of a project body - used as the caption in the lead plate and
// the contact sheet. Bodies are plain prose (no markdown syntax).
function firstSentence(content: string): string {
  const text = content.trim().replace(/\s+/g, " ");
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
}

function projectCount(count: number, strings: Strings): string {
  const suffix =
    count === 1 ? strings.archive.resultsSuffixOne : strings.archive.resultsSuffix;
  return `${count} ${suffix}`;
}

const LINK_CLASS =
  "text-body text-accent underline decoration-1 underline-offset-[0.15em] hover:text-accent-hover hover:decoration-2";

function HighlightProject({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const image = project.images?.[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group block ${
        priority
          ? ""
          : "grid gap-5 py-6 sm:grid-cols-[minmax(10rem,0.8fr)_minmax(0,1fr)] sm:items-center lg:grid-cols-[minmax(8rem,0.9fr)_minmax(0,1.1fr)]"
      }`}
    >
      {image ? (
        <div className="relative aspect-[4/3] border border-line bg-card transition-colors duration-150 ease-out group-hover:border-ink-muted">
          <Image
            src={image}
            alt={project.title}
            fill
            loading="lazy"
            sizes={
              priority
                ? "(min-width: 1024px) 58vw, 100vw"
                : "(min-width: 1024px) 18vw, (min-width: 640px) 40vw, 100vw"
            }
            className="object-contain"
          />
        </div>
      ) : (
        <div
          className={`flex border border-line bg-paper-sunk p-6 ${
            priority ? "aspect-[4/3] items-end" : "aspect-[4/3] items-center"
          }`}
        >
          <p className="font-serif text-title-m font-medium text-ink">
            {project.title}
          </p>
        </div>
      )}

      <div
        className={
          priority
            ? "border-b border-line py-5"
            : "min-w-0"
        }
      >
        <h3
          className={`font-serif font-medium text-ink transition-colors duration-150 ease-out group-hover:text-accent ${
            priority ? "text-title-l" : "text-title-m"
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`text-meta uppercase text-ink-muted ${
            priority ? "mt-3 max-w-[60ch]" : "mt-3"
          }`}
        >
          {projectMeta(project)}
        </p>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const lang = getLang();
  const strings = getStrings();
  const projects = getAllProjects(lang);

  // The home listing groups by category (mirroring the site nav) rather than
  // by year - each section links through to its full archive page.
  const categorySections = [
    { category: "exhibition", heading: strings.pages.exhibitions.heading, href: "/exhibitions" },
    { category: "production", heading: strings.pages.production.heading, href: "/production" },
  ] as const;

  const lead = getProjectBySlug(LEAD_SLUG, lang);
  const leadImage =
    lead?.images?.find((image) =>
      image.endsWith("/2024-installation-view.jpg")
    ) ?? lead?.images?.[0];

  const showcase = projects.find((p) => p.artworkSections?.length);
  const showcaseWorks = (showcase?.artworkSections ?? []).flatMap(
    (section) => section.items
  );

  return (
    <div className="space-y-16 md:space-y-24">
      <section className="grid gap-10 md:grid-cols-12 md:gap-6">
        <p className="text-meta uppercase text-ink-muted md:col-span-12">
          {strings.home.eyebrow}
        </p>
        <h1 className="max-w-[18ch] text-balance font-serif text-display-xl font-normal text-ink md:col-span-8">
          {strings.home.missionHeading.includes(",") ? (
            <>
              <span className="block">
                {strings.home.missionHeading.split(",")[0]},
              </span>
              <span className="block md:ml-[1.35ch]">
                {strings.home.missionHeading
                  .split(",")
                  .slice(1)
                  .join(",")
                  .trim()}
              </span>
            </>
          ) : (
            strings.home.missionHeading
          )}
        </h1>
        <div className="border-t border-line pt-5 md:col-span-4 md:self-end">
          <p className="max-w-measure text-body-l text-ink-secondary">
            {strings.home.missionBody}
          </p>
        </div>
      </section>

      {lead && leadImage && (
        <section
          aria-labelledby="lead-title"
          className="grid gap-8 border-t border-line pt-12 md:pt-16 lg:grid-cols-12 lg:items-start lg:gap-12"
        >
          <Link
            href={`/projects/${lead.slug}`}
            className="block border border-line bg-paper-card transition-colors duration-150 ease-out hover:border-ink-muted lg:col-span-8"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={leadImage}
                alt={lead.title}
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
          </Link>

          <div className="lg:col-span-4">
            <p className="text-meta uppercase text-ink-muted">
              {strings.home.leadEyebrow}
            </p>
            <h2
              id="lead-title"
              className="mt-5 font-serif text-title-l font-medium text-ink"
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
            <p className="mt-3 text-meta uppercase text-ink-secondary">
              {strings.home.roleLabel}: {strings.roles[lead.role] ?? lead.role}
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

      <section
        aria-labelledby="evidence-heading"
        className="border-y border-line py-10 md:py-12"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="text-meta uppercase text-ink-muted">
              {strings.home.evidenceEyebrow}
            </p>
            <h2
              id="evidence-heading"
              className="mt-3 font-serif text-title-m font-medium text-ink"
            >
              {strings.home.evidenceHeading}
            </h2>
            <p className="mt-3 text-body text-ink-secondary">
              {strings.home.evidenceBody}
            </p>
          </div>
          <ol className="divide-y divide-line border-y border-line lg:col-span-8">
            {EVIDENCE_SLUGS.map((slug) => {
              const project = getProjectBySlug(slug, lang);
              if (!project) return null;
              return (
                <li
                  key={project.slug}
                  className="grid gap-2 py-4 md:grid-cols-[minmax(15rem,0.85fr)_minmax(0,1.15fr)] md:items-baseline md:gap-8"
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-serif text-title-s font-medium text-ink transition-colors duration-150 ease-out hover:text-accent"
                  >
                    {project.title}
                  </Link>
                  <p className="min-w-0 text-meta uppercase text-ink-muted md:text-right">
                    {projectMeta(project)}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {categorySections.map(({ category, heading, href }) => {
        const items = projects.filter(
          (project) => project.category === category
        );
        const highlightOrder = HIGHLIGHT_SLUGS[category];
        const highlights = highlightOrder
          .map((slug) => items.find((project) => project.slug === slug))
          .filter(
            (project): project is NonNullable<typeof project> =>
              Boolean(project)
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
                {projectCount(items.length, strings)}
              </p>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
              {highlights[0] && (
                <div className="lg:col-span-7">
                  <HighlightProject project={highlights[0]} priority />
                </div>
              )}
              {highlights.length > 1 && (
                <div className="divide-y divide-line border-y border-line lg:col-span-5 lg:self-start">
                  {highlights.slice(1).map((project) => (
                    <HighlightProject key={project.slug} project={project} />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 border-y border-line">
              <p className="border-b border-line py-3 text-meta uppercase text-ink-muted">
                {strings.home.compactIndex}
              </p>
              <ul className="divide-y divide-line sm:grid sm:grid-cols-2 sm:divide-y-0">
                {items.map((project) => (
                  <li
                    key={project.slug}
                    className="border-line sm:border-b sm:odd:border-r"
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group grid min-h-14 grid-cols-[minmax(0,1fr)_auto_auto] items-baseline gap-3 px-3 py-4 transition-colors duration-200 ease-out hover:bg-paper-sunk sm:px-4"
                    >
                      <span className="min-w-0 text-body text-ink transition-[color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-accent group-focus-visible:translate-x-1 group-focus-visible:text-accent motion-reduce:transform-none motion-reduce:transition-none">
                        {project.title}
                      </span>
                      <span className="text-meta uppercase text-ink-muted [font-variant-numeric:tabular-nums]">
                        {project.year}
                      </span>
                      <span
                        aria-hidden="true"
                        className="-translate-x-1 text-body text-accent opacity-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transform-none motion-reduce:transition-none"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link href={href} className={`mt-6 inline-block ${LINK_CLASS}`}>
              {strings.home.openArchive} →
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

          <ul className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-12">
            {showcaseWorks.slice(0, SHEET_LIMIT).map((artwork, index) => (
              <li
                key={artwork.image}
                className={`relative aspect-[4/3] bg-paper-card ${SALON_SPANS[index]}`}
              >
                <Image
                  src={artwork.image}
                  alt={`${artwork.title} - ${artwork.artist}`}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 33vw, 50vw"
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
