import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import { strings } from "@/lib/strings";
import { projectMeta } from "@/lib/format";
import RoleBadge from "@/components/RoleBadge";

// DESIGN.md §5.4 — the role-hued keyline that differentiates the text-only
// "index plate" card at a glance. Set via inline style (not a border-{color}
// class) so it can't be clobbered by the all-sides hairline/hover classes.
const ROLE_VAR: Record<Project["role"], string> = {
  Curated: "var(--role-curated)",
  Booth: "var(--role-booth)",
  "Tech Lead": "var(--role-tech)",
  Platform: "var(--role-platform)",
};

export default function ProjectCard({ project }: { project: Project }) {
  const image = project.images?.[0];
  const meta = projectMeta(project);
  const linkCount = project.links?.length ?? 0;

  if (!image) {
    // Text-only "index plate" variant (DESIGN.md §5.4) — the default state
    // for image-less projects. Composed, not a gap.
    return (
      <Link
        href={`/projects/${project.slug}`}
        style={{ borderLeftColor: ROLE_VAR[project.role] }}
        className="group flex min-h-[320px] flex-col justify-between border border-line border-l-[3px] bg-paper-sunk p-7 transition-colors duration-150 ease-out hover:border-ink-muted sm:p-8"
      >
        <RoleBadge role={project.role} />

        <div className="my-6 border-b border-line pb-4">
          <h3 className="font-serif text-title-l font-medium text-ink transition-colors duration-150 ease-out group-hover:text-accent">
            {project.title}
          </h3>
        </div>

        <div className="flex items-end justify-between gap-4">
          <p className="text-meta uppercase text-ink-muted">{meta}</p>
          {linkCount > 0 && (
            <p className="whitespace-nowrap text-meta uppercase text-ink-muted">
              {linkCount} {strings.project.indexPlateLinks} →
            </p>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block border border-line bg-card transition-colors duration-150 ease-out hover:border-ink-muted"
    >
      <div className="relative aspect-[4/3] w-full bg-card">
        <Image
          src={image}
          alt={project.title}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="space-y-2 p-6">
        <RoleBadge role={project.role} />
        <h3 className="font-serif text-title-m font-medium text-ink transition-colors duration-150 ease-out group-hover:text-accent">
          {project.title}
        </h3>
        <p className="text-meta uppercase text-ink-muted">{meta}</p>
      </div>
    </Link>
  );
}
