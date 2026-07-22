import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { strings } from "@/lib/strings";
import ProjectCard from "@/components/ProjectCard";

export default function HomePage() {
  const featured = getFeaturedProjects().slice(0, 4);

  return (
    <div className="space-y-16 md:space-y-24">
      <section>
        <h1 className="font-serif text-display-xl font-normal text-ink">
          {strings.home.missionHeading}
        </h1>
        <p className="mt-6 max-w-measure text-body-l text-ink-secondary">
          {strings.home.missionBody}
        </p>
      </section>

      <section>
        <h2 className="mb-8 font-serif text-title-m font-medium text-ink">
          {strings.home.featuredHeading}
        </h2>
        {featured.length === 0 ? (
          <p className="text-body text-ink-secondary">{strings.archive.empty}</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-line pt-16 md:pt-24">
        <h2 className="mb-3 font-serif text-title-m font-medium text-ink">
          {strings.home.tezconHeading}
        </h2>
        <p className="max-w-measure text-body text-ink-secondary">
          {strings.home.tezconTeaser}
        </p>
        <Link
          href="/tezcon-europe"
          className="mt-4 inline-block text-body text-accent underline decoration-1 underline-offset-[0.15em] hover:text-accent-hover hover:decoration-2"
        >
          {strings.home.tezconLink}
        </Link>
      </section>
    </div>
  );
}
