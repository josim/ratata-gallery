"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useStrings } from "@/components/LangProvider";

const VIDEO_EXTENSIONS = [".mp4", ".webm"];

function isVideo(src: string) {
  return VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().endsWith(ext));
}

// DESIGN.md §5.7 — loops autoplay muted/looped, but respect
// prefers-reduced-motion by holding playback and offering a play control.
function GalleryVideo({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
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
        poster={poster}
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
  alt?: string;
  poster?: string;
  caption?: string;
  credit?: string;
};

function ImageCaption({ image }: { image: GalleryImage }) {
  if (!image.caption && !image.credit) return null;

  return (
    <figcaption className="text-body-s leading-relaxed text-ink-secondary">
      {image.caption}
      {image.caption && image.credit ? " · " : null}
      {image.credit}
    </figcaption>
  );
}

// A single image renders as a catalogue plate: natural aspect ratio,
// height-capped, uncropped, the hairline frame hugging the image.
function Plate({
  image,
  title,
  onOpen,
}: {
  image: GalleryImage;
  title: string;
  onOpen: () => void;
}) {
  const strings = useStrings();

  if (isVideo(image.src)) {
    return (
      <div className="border border-line bg-card">
        <GalleryVideo src={image.src} poster={image.poster} />
      </div>
    );
  }

  if (image.width && image.height) {
    return (
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${title} — ${strings.project.openFullscreen}`}
        className="group block w-fit max-w-full cursor-zoom-in border border-line bg-card transition-colors duration-150 hover:border-ink-muted"
      >
        <Image
          src={image.src}
          alt={image.alt ?? title}
          width={image.width}
          height={image.height}
          priority
          sizes="(min-width: 1200px) 760px, 100vw"
          className="h-auto max-h-[70vh] w-auto max-w-full"
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${title} — ${strings.project.openFullscreen}`}
      className="group block w-full cursor-zoom-in border border-line bg-card transition-colors duration-150 hover:border-ink-muted"
    >
      <div className="relative aspect-[3/2] w-full">
        <Image
          src={image.src}
          alt={image.alt ?? title}
          fill
          priority
          sizes="(min-width: 1200px) 760px, 100vw"
          className="object-contain"
        />
      </div>
    </button>
  );
}

export function GalleryLightbox({
  images,
  title,
  current,
  onChange,
  onClose,
}: {
  images: GalleryImage[];
  title: string;
  current: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const strings = useStrings();
  const closeRef = useRef<HTMLButtonElement>(null);
  const active = images[current];
  const hasMany = images.length > 1;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && hasMany) {
        onChange((current - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight" && hasMany) {
        onChange((current + 1) % images.length);
      }
      if (event.key === "Tab") {
        const controls = Array.from(
          document.querySelectorAll<HTMLElement>("[data-lightbox-control]")
        );
        if (!controls.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [current, hasMany, images.length, onChange, onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — ${strings.project.fullscreenLabel}`}
      className="fixed inset-0 z-50 bg-ink/[0.94]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 text-paper sm:p-6">
        <p className="text-meta uppercase tabular-nums text-paper/75">
          {current + 1} / {images.length}
        </p>
        <button
          ref={closeRef}
          data-lightbox-control
          type="button"
          onClick={onClose}
          aria-label={strings.project.closeFullscreen}
          className="pointer-events-auto grid h-11 w-11 place-items-center border border-paper/30 bg-transparent text-2xl leading-none text-paper transition-colors duration-150 hover:border-paper"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className="flex h-full w-full items-center justify-center px-4 py-20 sm:px-20">
        <div className="relative h-full w-full">
          {isVideo(active.src) ? (
            <video
              key={active.src}
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={active.poster}
              aria-label={
                active.alt ??
                `${title}, video ${current + 1} of ${images.length}`
              }
              className="h-full w-full object-contain"
            >
              <source src={active.src} type="video/mp4" />
            </video>
          ) : (
            <Image
              key={active.src}
              src={active.src}
              alt={
                active.alt ??
                `${title}, image ${current + 1} of ${images.length}`
              }
              fill
              unoptimized={active.src.toLowerCase().endsWith(".gif")}
              priority
              sizes="100vw"
              className="object-contain"
            />
          )}
        </div>
      </div>

      {hasMany && (
        <>
          <button
            data-lightbox-control
            type="button"
            onClick={() =>
              onChange((current - 1 + images.length) % images.length)
            }
            aria-label={strings.project.previousImage}
            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-paper/30 bg-ink/20 text-3xl text-paper transition-colors duration-150 hover:border-paper hover:bg-ink/50 sm:left-6"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            data-lightbox-control
            type="button"
            onClick={() => onChange((current + 1) % images.length)}
            aria-label={strings.project.nextImage}
            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-paper/30 bg-ink/20 text-3xl text-paper transition-colors duration-150 hover:border-paper hover:bg-ink/50 sm:right-6"
          >
            <span aria-hidden="true">→</span>
          </button>
        </>
      )}
    </div>,
    document.body
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const openerRef = useRef<HTMLButtonElement>(null);
  const mediaKey = images.map((image) => image.src).join("|");

  useEffect(() => {
    setCurrent(0);
    setLightboxOpen(false);
  }, [mediaKey]);

  function closeLightbox() {
    setLightboxOpen(false);
    requestAnimationFrame(() => openerRef.current?.focus());
  }

  if (!images.length) return null;
  if (images.length === 1) {
    return (
      <>
        <figure className="space-y-3">
          <Plate
            image={images[0]}
            title={title}
            onOpen={() => setLightboxOpen(true)}
          />
          <ImageCaption image={images[0]} />
        </figure>
        {lightboxOpen && !isVideo(images[0].src) && (
          <GalleryLightbox
            images={images}
            title={title}
            current={0}
            onChange={() => undefined}
            onClose={closeLightbox}
          />
        )}
      </>
    );
  }

  const active = images[Math.min(current, images.length - 1)];

  return (
    <figure className="min-w-0 space-y-3">
      <div className="border border-line bg-card">
        {isVideo(active.src) ? (
          <GalleryVideo src={active.src} poster={active.poster} />
        ) : (
          <button
            ref={openerRef}
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label={strings.project.openFullscreen}
            className="relative block aspect-[3/2] max-h-[70vh] w-full cursor-zoom-in bg-transparent"
          >
            <Image
              key={active.src}
              src={active.src}
              alt={
                active.alt ??
                `${title}, image ${current + 1} of ${images.length}`
              }
              fill
              priority={current === 0}
              sizes="(min-width: 1200px) 760px, 100vw"
              className="object-contain"
            />
          </button>
        )}
      </div>

      <div className="flex min-w-0 items-start justify-between gap-4">
        <div
          className="-mx-1 flex min-w-0 flex-1 gap-2 overflow-x-auto px-1 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
          role="group"
          aria-label={title}
        >
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

        <p className="whitespace-nowrap pt-1 text-meta uppercase tabular-nums text-ink-muted">
          {current + 1} / {images.length}
        </p>
      </div>

      <ImageCaption image={active} />

      {lightboxOpen && !isVideo(active.src) && (
        <GalleryLightbox
          images={images.filter((image) => !isVideo(image.src))}
          title={title}
          current={images
            .filter((image) => !isVideo(image.src))
            .findIndex((image) => image.src === active.src)}
          onChange={(index) => {
            const selected = images.filter((image) => !isVideo(image.src))[index];
            setCurrent(images.findIndex((image) => image.src === selected.src));
          }}
          onClose={closeLightbox}
        />
      )}
    </figure>
  );
}
