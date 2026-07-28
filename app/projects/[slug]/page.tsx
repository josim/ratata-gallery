import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { withImageSizes } from "@/lib/images";
import { getLang, getStrings } from "@/lib/lang";
import RoleBadge from "@/components/RoleBadge";
import GalleryCarousel from "@/components/Gallery";
import LinksList from "@/components/LinksList";

// Body links point off-site (objkt, press) — open them in a new tab so the
// reader keeps their place in the archive.
const mdxComponents = {
  a: (props: React.ComponentProps<"a">) => (
    <a {...props} target="_blank" rel="noopener noreferrer" />
  ),
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

  const images = await withImageSizes(project.images ?? []);

  const facts: { label: string; value: string }[] = [
    ...(project.dates
      ? [{ label: strings.project.factDates, value: project.dates }]
      : []),
    ...(project.venue
      ? [{ label: strings.project.factVenue, value: project.venue }]
      : []),
    ...(project.artists?.length
      ? [
          {
            label: strings.project.factArtists,
            value: project.artists.join(" · "),
          },
        ]
      : []),
    ...(project.credits ?? []),
  ];

  return (
    <article>
      <header className="mb-12 space-y-3">
        <RoleBadge role={project.role} />
        <h1 className="max-w-measure font-serif text-title-l font-medium text-ink">
          {project.title}
        </h1>
        <p className="text-meta uppercase text-ink-muted">
          {[project.year, project.city].filter(Boolean).join(" · ")}
        </p>
      </header>

      {/* The catalogue spread: lead plate on the page's left axis with the
          fact sheet hung beside it like a museum wall label. */}
      {images.length > 0 ? (
        <>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className={facts.length > 0 ? "lg:col-span-8" : "lg:col-span-12"}>
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

            <LinksList links={project.links ?? []} />
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

            <LinksList links={project.links ?? []} />
          </div>
        </div>
      )}

      {project.artworkSections?.map((section) => (
        <section key={section.heading} className="mt-16 space-y-6">
          <h2 className="border-b border-line pb-3 font-serif text-title-m font-medium text-ink">
            {section.heading}
          </h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {section.items.map((artwork) => (
              <li key={artwork.image}>
                <div className="relative aspect-[4/3] w-full border border-line bg-card">
                  <Image
                    src={artwork.image}
                    alt={`${artwork.title} - ${artwork.artist}`}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-contain"
                  />
                </div>
                {artwork.url ? (
                  <a
                    href={artwork.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-body text-accent underline decoration-1 underline-offset-[0.15em] hover:text-accent-hover hover:decoration-2"
                  >
                    {artwork.title} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <p className="mt-2 text-body text-ink">{artwork.title}</p>
                )}
                <p className="text-meta uppercase text-ink-muted">
                  {artwork.artist}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}
