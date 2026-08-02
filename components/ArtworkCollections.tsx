"use client";

import { useMemo, useState } from "react";
import ArtworkGrid from "@/components/ArtworkGrid";
import { useStrings } from "@/components/LangProvider";
import type { ArtworkSection } from "@/lib/projects";

type CollectionFilter = "all" | number;

export default function ArtworkCollections({
  sections,
}: {
  sections: ArtworkSection[];
}) {
  const strings = useStrings();
  const [activeFilter, setActiveFilter] =
    useState<CollectionFilter>("all");
  const total = useMemo(
    () => sections.reduce((sum, section) => sum + section.items.length, 0),
    [sections]
  );
  const visibleSections =
    activeFilter === "all" ? sections : [sections[activeFilter]];
  const visibleCount =
    activeFilter === "all" ? total : sections[activeFilter].items.length;

  // The banner exists to carry the collection filter. A project with a single
  // collection has nothing to filter, and its own heading below already names
  // the works and counts them.
  const hasFilter = sections.length > 1;

  return (
    <section
      className="mt-24"
      aria-labelledby={
        hasFilter ? "artwork-collections-heading" : sectionId(sections[0].heading)
      }
    >
      {hasFilter && (
        <>
          <div className="border-y border-line bg-paper-sunk px-4 py-6 sm:px-6 sm:py-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  id="artwork-collections-heading"
                  className="font-serif text-title-m font-medium text-ink"
                >
                  {strings.project.artworksHeading}
                </h2>
                <p className="mt-1 text-body-s text-ink-secondary">
                  {total} {strings.project.artworksCountSuffix}
                </p>
              </div>

              <div
                className="-mx-1 flex max-w-full gap-1 overflow-x-auto px-1 pb-1"
                aria-label={strings.project.artworksFilterLabel}
              >
                <FilterButton
                  active={activeFilter === "all"}
                  onClick={() => setActiveFilter("all")}
                  label={strings.project.artworksAll}
                  count={total}
                />
                {sections.map((section, index) => (
                  <FilterButton
                    key={section.heading}
                    active={activeFilter === index}
                    onClick={() => setActiveFilter(index)}
                    label={section.heading.replace(/\s+2024$/, "")}
                    count={section.items.length}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {visibleCount} {strings.project.artworksShown}
          </p>
        </>
      )}

      <div className={`space-y-24 ${hasFilter ? "pt-14 sm:pt-16" : ""}`}>
        {visibleSections.map((section) => (
          <section key={section.heading} aria-labelledby={sectionId(section.heading)}>
            <div className="mb-8 grid gap-2 border-t border-ink pt-5 sm:grid-cols-[1fr_auto] sm:items-baseline">
              <h3
                id={sectionId(section.heading)}
                className="font-serif text-title-m font-medium text-ink"
              >
                {section.heading}
              </h3>
              <p className="text-meta uppercase text-ink-muted">
                {section.items.length} {strings.project.artworksCountSuffix}
              </p>
            </div>
            <ArtworkGrid items={section.items} heading={section.heading} />
          </section>
        ))}
      </div>
    </section>
  );
}

function FilterButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 border px-3 py-2 text-meta uppercase transition-colors duration-150 ${
        active
          ? "border-ink bg-ink text-paper"
          : "border-line bg-paper text-ink-secondary hover:border-ink-muted hover:text-ink"
      }`}
    >
      {label} <span className={active ? "text-paper/70" : "text-ink-muted"}>{count}</span>
    </button>
  );
}

function sectionId(heading: string) {
  return `collection-${heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}
