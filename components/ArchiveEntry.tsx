"use client";

import Image from "next/image";
import Link from "next/link";
import { projectMeta } from "@/lib/format";
import type { Project } from "@/lib/projects";
import { useInView } from "@/components/Reveal";

export default function ArchiveEntry({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const image = project.images?.[0];
  const number = String(index + 1).padStart(2, "0");
  const reverse = index % 2 === 1;
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <article
      ref={ref}
      data-reveal={inView ? "in" : "out"}
      data-year={project.year}
      className="last:border-b last:border-line"
    >
      <span aria-hidden="true" className="reveal-rule block h-px bg-line" />
      <Link
        href={`/projects/${project.slug}`}
        className="group grid gap-6 py-8 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper md:grid-cols-12 md:gap-8 md:py-12"
      >
        <div
          className={`flex min-w-0 flex-col ${
            image
              ? `md:col-span-5 ${reverse ? "md:col-start-8 md:row-start-1" : ""}`
              : "md:col-span-10"
          }`}
        >
          {/* The plate number sits as a watermark the title hangs off, the way
              a catalogue numbers its entries. Decorative: the reading order is
              carried by the title below it. */}
          <span
            aria-hidden="true"
            className="reveal-rise block font-serif leading-[0.75] tracking-[-0.03em] text-line text-[clamp(3.5rem,7vw,7rem)] [font-variant-numeric:tabular-nums]"
          >
            {number}
          </span>

          <h2
            className={`reveal-rise -mt-2 max-w-[18ch] text-balance font-serif font-normal leading-[1.02] tracking-[-0.025em] text-ink transition-colors duration-150 group-hover:text-accent md:-mt-4 ${
              image
                ? "text-[clamp(2rem,4vw,3.75rem)]"
                : "text-[clamp(2.5rem,6vw,5rem)]"
            }`}
            style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
          >
            {project.title}
          </h2>

          {image && project.overviewText && (
            <p
              className="reveal-rise mt-6 line-clamp-3 max-w-[42ch] text-body-s text-ink-secondary"
              style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
            >
              {project.overviewText}
            </p>
          )}

          <div className="mt-10 flex items-end justify-between gap-6 md:mt-auto md:pt-16">
            <p className="max-w-[44ch] text-meta uppercase text-ink-muted">
              {projectMeta(project)}
            </p>
            <span
              aria-hidden="true"
              className="shrink-0 text-xl text-ink-muted opacity-60 transition-[color,opacity] duration-150 group-hover:text-accent group-hover:opacity-100"
            >
              →
            </span>
          </div>
        </div>

        {image && (
          <div
            className={`reveal-wipe relative min-h-[280px] overflow-hidden border border-line bg-card md:col-span-7 md:min-h-[460px] ${
              reverse ? "md:col-start-1 md:row-start-1" : ""
            }`}
          >
            {/* Push, not lift: the frame stays put and the picture moves
                inside it, so the grid never shifts (DESIGN.md §5.3). */}
            <Image
              src={image}
              alt=""
              fill
              priority={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-contain transition-transform duration-[600ms] ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
            />
          </div>
        )}
      </Link>
    </article>
  );
}
