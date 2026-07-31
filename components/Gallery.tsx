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
  className = "mx-auto h-auto max-h-[70vh] w-auto max-w-full",
}: {
  src: string;
  poster?: string;
  className?: string;
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
        className={className}
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
  const stripRef = useRef<HTMLDivElement>(null);
  const mediaKey = images.map((image) => image.src).join("|");

  useEffect(() => {
    setCurrent(0);
    setLightboxOpen(false);
  }, [mediaKey]);

  // The strip is a real scroll container, so the counter follows the scroll
  // position rather than the other way round: whichever plate sits furthest
  // left while still mostly on screen is the one being read.
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || typeof IntersectionObserver === "undefined") return;

    const plates = Array.from(strip.querySelectorAll<HTMLElement>("[data-plate]"));
    if (!plates.length) return;

    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          if (record.isIntersecting) onScreen.add(record.target);
          else onScreen.delete(record.target);
        }
        const leftmost = Array.from(onScreen).sort(
          (a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left
        )[0];
        if (leftmost) {
          setCurrent(Number(leftmost.getAttribute("data-plate")));
        }
      },
      { root: strip, threshold: 0.6 }
    );

    plates.forEach((plate) => observer.observe(plate));
    return () => observer.disconnect();
  }, [mediaKey]);

  function scrollToPlate(index: number) {
    const target = Math.max(0, Math.min(index, images.length - 1));
    const strip = stripRef.current;
    const plate = strip?.querySelector<HTMLElement>(`[data-plate="${target}"]`);
    if (!strip || !plate) return;
    const offset =
      plate.getBoundingClientRect().left - strip.getBoundingClientRect().left;
    // Move the counter now rather than waiting for the observer to report the
    // settled scroll, so a quick second press steps on instead of repeating.
    setCurrent(target);
    strip.scrollBy({
      left: offset,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  function openLightboxAt(index: number) {
    setCurrent(index);
    setLightboxOpen(true);
  }

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
      <div
        ref={stripRef}
        role="group"
        aria-label={title}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-3"
      >
        {images.map((image, i) => (
          // Every plate shares the strip's height, but a work wider than the
          // column is capped to fit rather than running past its edge — the
          // whole picture is always visible, matted where it falls short.
          <div
            key={image.src}
            data-plate={i}
            className="flex h-[clamp(260px,44vh,520px)] max-w-full shrink-0 snap-start items-center justify-center border border-line bg-card"
          >
            {isVideo(image.src) ? (
              <GalleryVideo
                src={image.src}
                poster={image.poster}
                className="h-full w-auto max-w-full object-contain"
              />
            ) : (
              <button
                ref={i === 0 ? openerRef : undefined}
                type="button"
                onClick={() => openLightboxAt(i)}
                aria-label={`${title}, ${i + 1} / ${images.length} — ${
                  strings.project.openFullscreen
                }`}
                className="flex h-full max-w-full cursor-zoom-in items-center bg-transparent"
              >
                <Image
                  src={image.src}
                  alt={image.alt ?? `${title}, image ${i + 1} of ${images.length}`}
                  width={image.width ?? 1200}
                  height={image.height ?? 800}
                  priority={i === 0}
                  loading={i === 0 ? undefined : "lazy"}
                  sizes="(min-width: 1024px) 700px, 92vw"
                  // A definite height lets the width resolve from the aspect
                  // ratio before the file loads, so lazy plates reserve their
                  // real width instead of collapsing; object-contain keeps the
                  // picture honest where max-width clamps an ultra-wide shot.
                  className="h-full w-auto max-w-full object-contain"
                />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Text controls rather than overlaid chrome, and they double as the
          affordance that says the strip scrolls (DESIGN.md §5.6). */}
      <div className="flex items-baseline justify-between gap-4 text-meta uppercase text-ink-muted">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => scrollToPlate(current - 1)}
            disabled={current === 0}
            aria-label={strings.project.previousImage}
            className="border-0 bg-transparent p-0 text-body leading-none text-ink transition-colors duration-150 hover:text-accent disabled:text-line"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToPlate(current + 1)}
            disabled={current === images.length - 1}
            aria-label={strings.project.nextImage}
            className="border-0 bg-transparent p-0 text-body leading-none text-ink transition-colors duration-150 hover:text-accent disabled:text-line"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <p className="whitespace-nowrap [font-variant-numeric:tabular-nums]">
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
