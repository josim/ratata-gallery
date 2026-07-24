"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { strings } from "@/lib/strings";

const VIDEO_EXTENSIONS = [".mp4", ".webm"];

function isVideo(src: string) {
  return VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().endsWith(ext));
}

// DESIGN.md §5.7 — loops autoplay muted/looped, but respect
// prefers-reduced-motion by holding playback and offering a play control.
function GalleryVideo({ src }: { src: string }) {
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
        className="w-full"
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

export default function Gallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  if (!images.length) return null;

  const [lead, ...rest] = images;

  return (
    <div className="space-y-4">
      <div className="border border-line bg-card">
        {isVideo(lead) ? (
          <GalleryVideo src={lead} />
        ) : (
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={lead}
              alt={title}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain"
            />
          </div>
        )}
      </div>

      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {rest.map((src) =>
            isVideo(src) ? (
              <div key={src} className="border border-line">
                <GalleryVideo src={src} />
              </div>
            ) : (
              <div key={src} className="relative aspect-[4/3] w-full border border-line bg-card">
                <Image
                  src={src}
                  alt={title}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  className="object-cover"
                />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
