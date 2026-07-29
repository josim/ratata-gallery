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
  const images: GalleryImage[] = items.map((item) => ({ src: item.image }));

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((artwork, index) => (
          <li key={artwork.image}>
            <button
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`${artwork.title} — ${strings.project.openFullscreen}`}
              className="relative block aspect-[4/3] w-full cursor-zoom-in border border-line bg-card transition-colors duration-150 hover:border-ink-muted"
            >
              <Image
                src={artwork.image}
                alt={`${artwork.title} - ${artwork.artist}`}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-contain"
              />
            </button>
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

      {current !== null && (
        <GalleryLightbox
          images={images}
          title={heading}
          current={current}
          onChange={setCurrent}
          onClose={() => setCurrent(null)}
        />
      )}
    </>
  );
}
