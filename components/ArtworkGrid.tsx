"use client";

import { useState } from "react";
import Image from "next/image";
import type { Artwork } from "@/lib/projects";
import { GalleryLightbox, type GalleryImage } from "@/components/Gallery";
import { useStrings } from "@/components/LangProvider";

export default function ArtworkGrid({
  items,
  heading,
}: {
  items: Artwork[];
  heading: string;
}) {
  const strings = useStrings();
  const [current, setCurrent] = useState<number | null>(null);
  // Works whose asset is still missing are listed but cannot be opened, so the
  // lightbox indexes against the viewable subset only.
  const viewable = items.filter((item) => item.image);
  const media: GalleryImage[] = viewable.map((item) => ({
    src: item.video ?? item.image!,
    poster: item.video ? item.image : undefined,
    alt: `${item.title} — ${item.artist}`,
  }));

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((artwork) => (
          <li key={`${artwork.artist}-${artwork.title}`}>
            {artwork.image ? (
              <button
                type="button"
                onClick={() => setCurrent(viewable.indexOf(artwork))}
                aria-label={`${artwork.title} — ${strings.project.openFullscreen}`}
                className="group relative block aspect-[4/3] w-full cursor-zoom-in border border-line bg-card transition-colors duration-150 hover:border-ink-muted"
              >
                <Image
                  src={artwork.image}
                  alt={`${artwork.title} - ${artwork.artist}`}
                  fill
                  unoptimized={artwork.image.toLowerCase().endsWith(".gif")}
                  loading="lazy"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-contain"
                />
                {artwork.video && (
                  <span className="absolute bottom-3 left-3 border border-paper/60 bg-ink/80 px-3 py-2 text-meta uppercase text-paper transition-colors duration-150 group-hover:bg-ink">
                    ▶ {strings.project.playLabel}
                  </span>
                )}
              </button>
            ) : (
              <div
                aria-hidden="true"
                className="aspect-[4/3] w-full border border-dashed border-line bg-card"
              />
            )}
            {/* Tombstone order, as every art publication sets it: the artist
                is credited first, then the work title in serif italic
                (DESIGN.md §2.2). */}
            <p className="mt-2 text-meta uppercase text-ink-muted">
              {artwork.artist}
            </p>
            {artwork.url ? (
              <a
                href={artwork.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 inline-block font-serif italic text-title-s text-accent underline decoration-1 underline-offset-[0.15em] hover:text-accent-hover hover:decoration-2"
              >
                {artwork.title} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <p className="mt-0.5 font-serif italic text-title-s text-ink">
                {artwork.title}
              </p>
            )}
            {artwork.curator && (
              <p className="mt-1 text-body-s text-ink-secondary">
                {artwork.curator}
              </p>
            )}
          </li>
        ))}
      </ul>

      {current !== null && (
        <GalleryLightbox
          images={media}
          title={heading}
          current={current}
          onChange={setCurrent}
          onClose={() => setCurrent(null)}
        />
      )}
    </>
  );
}
