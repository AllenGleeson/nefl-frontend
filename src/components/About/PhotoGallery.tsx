"use client";

import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";

export type GalleryImage = { src: string; caption: string };

interface PhotoGalleryProps {
  title?: string;
  images: GalleryImage[];
}

// Photo gallery with a large image, caption, arrows and a thumbnail strip.
export default function PhotoGallery({ title, images }: PhotoGalleryProps) {
  const [current, setCurrent] = useState(0);
  const go = (i: number) => setCurrent((i + images.length) % images.length);
  const image = images[current];

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(current - 1);
    if (e.key === "ArrowRight") go(current + 1);
  };

  return (
    <section aria-roledescription="carousel" aria-label={title ?? "Photo gallery"} onKeyDown={onKeyDown}>
      {title && <h3 className="text-lg font-bold text-[var(--md-on-surface)] mb-3">{title}</h3>}

      <div className="relative overflow-hidden rounded-2xl bg-[var(--md-surface-container)] shadow-lg">
        <div className="relative aspect-video">
          <Image
            key={image.src}
            src={image.src}
            alt={image.caption}
            fill
            className="object-cover animate-[fadeIn_400ms_ease-out]"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 sm:p-5 flex items-end justify-between gap-3">
            <p className="text-white text-sm sm:text-base font-medium" aria-live="polite">
              {image.caption}
            </p>
            <span className="shrink-0 text-xs text-white/80 bg-black/30 rounded-full px-2.5 py-1">
              {current + 1} / {images.length}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(current - 1)}
          aria-label="Previous photo"
          className={buttonStyles({ variant: "glass", size: "icon", className: "absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm" })}
        >
          <ChevronLeft className="w-5 h-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => go(current + 1)}
          aria-label="Next photo"
          className={buttonStyles({ variant: "glass", size: "icon", className: "absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm" })}
        >
          <ChevronRight className="w-5 h-5" aria-hidden />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show photo ${i + 1}: ${img.caption}`}
            aria-current={i === current ? "true" : undefined}
            className={`relative shrink-0 w-24 sm:w-28 aspect-video rounded-lg overflow-hidden transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] ${
              i === current ? "ring-2 ring-[var(--md-primary)] ring-offset-2" : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={img.src} alt="" fill className="object-cover" sizes="112px" />
          </button>
        ))}
      </div>
    </section>
  );
}
