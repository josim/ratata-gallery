import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { strings } from "@/lib/strings";
import { projectMeta } from "@/lib/format";
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

  return (
    <article>
      <header className="mb-12 space-y-3">
        <RoleBadge role={project.role} />
        <h1 className="font-serif text-title-l font-medium text-ink">
          {project.title}
        </h1>
        <p className="text-meta uppercase text-ink-muted">
          {projectMeta(project)}
        </p>
      </header>

      <div className="max-w-measure space-y-4 text-body text-ink [&_a]:text-accent [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-[0.15em] [&_a:hover]:text-accent-hover [&_a:hover]:decoration-2">
        <MDXRemote source={project.content} />
      </div>

      <div className="mt-16 space-y-16">
        <Gallery images={project.images ?? []} title={project.title} />
        <LinksList links={project.links ?? []} />
      </div>
    </article>
  );
}
