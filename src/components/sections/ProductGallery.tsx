"use client";

import { useState } from "react";
import type { SanityImage } from "@/sanity/types";
import { Photo } from "@/components/ui/Photo";
import { CarouselArrow } from "@/components/ui/CarouselControls";
import { cn } from "@/lib/cn";

type ProductGalleryProps = {
  images: SanityImage[];
  caption: string;
};

export function ProductGallery({ images, caption }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const count = images.length;
  const go = (delta: number) => setActive((i) => (i + delta + count) % count);

  if (!count) return null;

  return (
    <figure
      aria-roledescription="carousel"
      aria-label={caption}
      className="mx-auto w-full max-w-[433px]"
    >
      <div className="relative">
        <div className="relative aspect-[433/648] overflow-hidden bg-fog">
          {images.map((image, i) => (
            <div
              key={image.url + i}
              aria-hidden={i !== active}
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                i === active ? "opacity-100" : "opacity-0",
              )}
            >
              {/* Only the active slide and its neighbours are requested. */}
              {Math.abs(i - active) <= 1 || (active === 0 && i === count - 1) ? (
                <Photo image={image} sizes="(min-width: 1024px) 433px, calc(100vw - 110px)" />
              ) : null}
            </div>
          ))}

          <div className="absolute inset-x-0 bottom-[9px] flex justify-center gap-[5px] lg:bottom-2.5 lg:gap-[6px]">
            {images.map((image, i) => (
              <button
                key={image.url + i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}: ${image.alt || caption}`}
                aria-current={i === active}
                className={cn(
                  "relative h-[23px] w-[22px] overflow-hidden border-2 transition-colors lg:h-8 lg:w-[31px]",
                  i === active ? "border-white" : "border-transparent hover:border-white/60",
                )}
              >
                <Photo image={image} sizes="64px" />
              </button>
            ))}
          </div>
        </div>

        <CarouselArrow
          direction="prev"
          label="Previous image"
          onClick={() => go(-1)}
          className="absolute top-1/2 -left-[46px] -translate-y-1/2"
        />
        <CarouselArrow
          direction="next"
          label="Next image"
          onClick={() => go(1)}
          className="absolute top-1/2 -right-[46px] -translate-y-1/2"
        />
      </div>
      <figcaption className="mt-[7px] text-center font-ui text-[13px] leading-[22px] tracking-body lg:mt-[13px]">
        {caption}
      </figcaption>
    </figure>
  );
}
