import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectsByCategory,
  type ProjectRole,
} from "@/lib/projects";
import { withImageSizes } from "@/lib/images";
import { getLang, getStrings } from "@/lib/lang";
import GalleryCarousel from "@/components/Gallery";
import LinksList from "@/components/LinksList";
import ArtworkGrid from "@/components/ArtworkGrid";

// Body links point off-site (objkt, press) — open them in a new tab so the
// reader keeps their place in the archive.
const mdxComponents = {
  a: (props: React.ComponentProps<"a">) => (
    <a {...props} target="_blank" rel="noopener noreferrer" />
  ),
};

const ROLE_COLOR: Record<ProjectRole, string> = {
  Curated: "var(--role-curated)",
  Booth: "var(--role-booth)",
  "Tech Lead": "var(--role-tech)",
  Platform: "var(--role-platform)",
};

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const strings = getStrings();
  const project = getProjectBySlug(params.slug, getLang());
  if (!project) return {};

  return {
    title: `${strings.site.name} - ${project.title}`,
    description: project.content.slice(0, 160),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const strings = getStrings();
  const project = getProjectBySlug(params.slug, getLang());
  if (!project) notFound();

  const images = await withImageSizes(project.media ?? project.images ?? []);
  const archiveHref =
    project.category === "exhibition" ? "/exhibitions" : "/production";
  const archiveLabel =
    project.category === "exhibition"
      ? strings.nav.exhibitions
      : strings.nav.production;
  const categoryProjects = getProjectsByCategory(project.category, getLang());
  const projectIndex = categoryProjects.findIndex(
    (candidate) => candidate.slug === project.slug
  );
  const previousProject =
    projectIndex > 0 ? categoryProjects[projectIndex - 1] : null;
  const nextProject =
    projectIndex >= 0 && projectIndex < categoryProjects.length - 1
      ? categoryProjects[projectIndex + 1]
      : null;
  const secondaryLinks = (project.links ?? []).filter(
    (link) => link.url !== project.primaryAction?.url
  );

  const facts: { label: string; value: string }[] = [
    ...(project.dates
      ? [{ label: strings.project.factDates, value: project.dates }]
      : []),
    ...(project.venue
      ? [{ label: strings.project.factVenue, value: project.venue }]
      : []),
    ...(project.credits ?? []),
  ];

  return (
    <article>
      <nav aria-label="Breadcrumb" className="mb-10">
        <Link
          href={archiveHref}
          className="text-meta uppercase text-ink-muted underline decoration-1 underline-offset-[0.2em] transition-colors hover:text-accent"
        >
          ← {strings.project.backToArchive}
        </Link>
      </nav>

      <header className="mb-12 max-w-measure">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="text-meta uppercase text-ink-muted">
            {archiveLabel}
          </span>
          <span aria-hidden="true" className="text-ink-muted">
            ·
          </span>
          <span
            className="inline-flex items-center gap-2 border px-2 py-1 text-meta uppercase"
            style={{
              color: ROLE_COLOR[project.role],
              borderColor: `color-mix(in srgb, ${ROLE_COLOR[project.role]} 40%, transparent)`,
            }}
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5"
              style={{ backgroundColor: ROLE_COLOR[project.role] }}
            />
            {strings.roles[project.role]}
          </span>
        </div>
        <h1 className="font-serif text-[clamp(2.25rem,5vw,4rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink text-balance">
          {project.title}
        </h1>
        <p className="mt-4 text-meta uppercase text-ink-muted">
          {[project.year, project.city].filter(Boolean).join(" · ")}
        </p>
        {project.overviewText && (
          <p className="mt-6 max-w-[60ch] text-body-l leading-relaxed text-ink-secondary">
            {project.overviewText}
          </p>
        )}
        {project.primaryAction && (
          <a
            href={project.primaryAction.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-12 items-center border border-accent px-4 py-3 text-nav text-accent underline decoration-1 underline-offset-[0.18em] transition-colors duration-150 hover:bg-accent-tint hover:text-accent-hover hover:decoration-2"
          >
            {project.primaryAction.label}
            <span aria-hidden="true" className="ml-2">
              ↗
            </span>
          </a>
        )}
      </header>

      {/* The catalogue spread: lead plate on the page's left axis with the
          fact sheet hung beside it like a museum wall label. */}
      {images.length > 0 ? (
        <>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div
              className={
                facts.length > 0
                  ? "min-w-0 lg:col-span-8"
                  : "min-w-0 lg:col-span-12"
              }
            >
              <GalleryCarousel images={images} title={project.title} />
            </div>

            {facts.length > 0 && (
              <aside className="lg:col-span-4">
                <dl className="border-t border-line">
                  {facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="space-y-1 border-b border-line py-3"
                    >
                      <dt className="text-meta uppercase text-ink-muted">
                        {fact.label}
                      </dt>
                      <dd className="text-body text-ink">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            )}
          </div>

          <div className="mt-12 space-y-12">
            <div className="max-w-measure space-y-4 text-body text-ink [&_a]:text-accent [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-[0.15em] [&_a:hover]:text-accent-hover [&_a:hover]:decoration-2 [&_h3]:pt-4 [&_h3]:font-serif [&_h3]:text-title-s [&_h3]:font-medium [&_h3]:text-ink">
              <MDXRemote source={project.content} components={mdxComponents} />
            </div>

            {project.artists?.length ? (
              <section aria-labelledby="artist-roster" className="max-w-measure">
                <h2
                  id="artist-roster"
                  className="mb-4 border-b border-line pb-3 font-serif text-title-s font-medium text-ink"
                >
                  {strings.project.factArtists}
                </h2>
                <ul className="columns-1 gap-x-8 text-body text-ink sm:columns-2">
                  {project.artists.map((artist) => (
                    <li
                      key={artist}
                      className="break-inside-avoid border-b border-line py-2"
                    >
                      {artist}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <LinksList links={secondaryLinks} />
          </div>
        </>
      ) : (
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {facts.length > 0 && (
            <aside className="lg:order-2 lg:col-span-4">
              <dl className="border-t border-line">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="space-y-1 border-b border-line py-3"
                  >
                    <dt className="text-meta uppercase text-ink-muted">
                      {fact.label}
                    </dt>
                    <dd className="text-body text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          )}

          <div className="space-y-12 lg:order-1 lg:col-span-8">
            <div className="max-w-measure space-y-4 text-body text-ink [&_a]:text-accent [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-[0.15em] [&_a:hover]:text-accent-hover [&_a:hover]:decoration-2 [&_h3]:pt-4 [&_h3]:font-serif [&_h3]:text-title-s [&_h3]:font-medium [&_h3]:text-ink">
              <MDXRemote source={project.content} components={mdxComponents} />
            </div>

            <LinksList links={secondaryLinks} />
          </div>
        </div>
      )}

      {project.artworkSections
        ?.filter((section) => section.heading && section.items?.length)
        .map((section) => (
        <section key={section.heading} className="mt-16 space-y-6">
          <h2 className="border-b border-line pb-3 font-serif text-title-m font-medium text-ink">
            {section.heading}
          </h2>
          <ArtworkGrid items={section.items} heading={section.heading} />
        </section>
        ))}

      {(previousProject || nextProject) && (
        <nav
          aria-label="Project navigation"
          className="mt-24 grid border-y border-line sm:grid-cols-2"
        >
          {previousProject ? (
            <Link
              href={`/projects/${previousProject.slug}`}
              className="group py-6 sm:pr-8"
            >
              <span className="block text-meta uppercase text-ink-muted">
                ← {strings.project.previousProject}
              </span>
              <span className="mt-2 block font-serif text-title-s font-medium text-ink group-hover:text-accent">
                {previousProject.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {nextProject && (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group border-t border-line py-6 sm:border-l sm:border-t-0 sm:pl-8 sm:text-right"
            >
              <span className="block text-meta uppercase text-ink-muted">
                {strings.project.nextProject} →
              </span>
              <span className="mt-2 block font-serif text-title-s font-medium text-ink group-hover:text-accent">
                {nextProject.title}
              </span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
