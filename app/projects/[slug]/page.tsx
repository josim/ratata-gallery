import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { strings } from "@/lib/strings";
import RoleBadge from "@/components/RoleBadge";
import Gallery from "@/components/Gallery";
import LinksList from "@/components/LinksList";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: `${strings.site.name} — ${project.title}`,
    description: project.content.slice(0, 160),
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

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
  ];

  return (
    <article>
      <header className="mb-10 space-y-3">
        <RoleBadge role={project.role} />
        <h1 className="font-serif text-title-l font-medium text-ink">
          {project.title}
        </h1>
        <p className="text-meta uppercase text-ink-muted">
          {[project.year, project.city].filter(Boolean).join(" · ")}
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:order-2 lg:col-span-5">
          <Gallery images={project.images ?? []} title={project.title} />
        </aside>

        <div className="space-y-12 lg:order-1 lg:col-span-7">
          <dl className="border-t border-line">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-3"
              >
                <dt className="pt-px text-meta uppercase text-ink-muted">
                  {fact.label}
                </dt>
                <dd className="text-body text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="max-w-measure space-y-4 text-body text-ink [&_a]:text-accent [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-[0.15em] [&_a:hover]:text-accent-hover [&_a:hover]:decoration-2">
            <MDXRemote source={project.content} />
          </div>

          <LinksList links={project.links ?? []} />
        </div>
      </div>
    </article>
  );
}
