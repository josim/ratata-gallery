"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useStrings } from "@/components/LangProvider";

const VIDEO_EXTENSIONS = [".mp4", ".webm"];

function isVideo(src: string) {
  return VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().endsWith(ext));
}

// DESIGN.md §5.7 — loops autoplay muted/looped, but respect
// prefers-reduced-motion by holding playback and offering a play control.
function GalleryVideo({ src }: { src: string }) {
  const strings = useStrings();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="relative bg-card">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        autoPlay={!reducedMotion}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="mx-auto h-auto max-h-[70vh] w-auto max-w-full"
      >
        <source src={src} type={src.toLowerCase().endsWith(".webm") ? "video/webm" : "video/mp4"} />
      </video>
      {reducedMotion && !playing && (
        <button
          type="button"
          onClick={() => videoRef.current?.play()}
          className="absolute inset-0 flex items-center justify-center bg-ink/60 text-meta uppercase text-paper"
        >
          {strings.project.playLabel}
        </button>
      )}
    </div>
  );
}

export type GalleryImage = {
  src: string;
  width?: number;
  height?: number;
};

// A single image renders as a catalogue plate: natural aspect ratio,
// height-capped, uncropped, the hairline frame hugging the image.
function Plate({ image, title }: { image: GalleryImage; title: string }) {
  if (isVideo(image.src)) {
    return (
      <div className="border border-line bg-card">
        <GalleryVideo src={image.src} />
      </div>
    );
  }

  if (image.width && image.height) {
    return (
      <div className="w-fit max-w-full border border-line bg-card">
        <Image
          src={image.src}
          alt={title}
          width={image.width}
          height={image.height}
          priority
          sizes="(min-width: 1200px) 760px, 100vw"
          className="h-auto max-h-[70vh] w-auto max-w-full"
        />
      </div>
    );
  }

  return (
    <div className="border border-line bg-card">
      <div className="relative aspect-[3/2] w-full">
        <Image
          src={image.src}
          alt={title}
          fill
          priority
          sizes="(min-width: 1200px) 760px, 100vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}

// DESIGN.md §5.7 — multiple images become a quiet slide viewer: a stable
// matted stage plus a row of thumbnail plates beneath it. No motion beyond
// a 150ms opacity step; keyboard operable via the thumbnail buttons.
export default function GalleryCarousel({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  const strings = useStrings();
  const [current, setCurrent] = useState(0);

  if (!images.length) return null;
  if (images.length === 1) return <Plate image={images[0]} title={title} />;

  const active = images[Math.min(current, images.length - 1)];

  return (
    <figure className="space-y-3">
      <div className="border border-line bg-card">
        {isVideo(active.src) ? (
          <GalleryVideo src={active.src} />
        ) : (
          <div className="relative aspect-[3/2] max-h-[70vh] w-full">
            <Image
              key={active.src}
              src={active.src}
              alt={`${title}, image ${current + 1} of ${images.length}`}
              fill
              priority={current === 0}
              sizes="(min-width: 1200px) 760px, 100vw"
              className="object-contain"
            />
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label={title}>
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`${title}, image ${i + 1} of ${images.length}`}
              aria-current={i === current}
              className={`relative h-14 w-[4.667rem] shrink-0 border bg-card transition-colors duration-150 ${
                i === current
                  ? "border-ink"
                  : "border-line hover:border-ink-muted"
              }`}
            >
              {isVideo(image.src) ? (
                <span className="flex h-full items-center justify-center text-meta uppercase text-ink-muted">
                  {strings.project.playLabel}
                </span>
              ) : (
                <Image
                  src={image.src}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="75px"
                  className={`object-cover transition-opacity duration-150 ${
                    i === current ? "opacity-100" : "opacity-70 hover:opacity-100"
                  }`}
                />
              )}
            </button>
          ))}
        </div>

        <figcaption className="whitespace-nowrap pt-1 text-meta uppercase tabular-nums text-ink-muted">
          {current + 1} / {images.length}
        </figcaption>
      </div>
    </figure>
  );
}
