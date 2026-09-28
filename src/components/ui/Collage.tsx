import type { CSSProperties } from "react";
import type { SanityImage } from "@/sanity/types";
import { cn } from "@/lib/cn";
import { Photo } from "./Photo";

/** A box expressed in the Figma frame's pixel coordinates. */
export type Box = { x: number; y: number; w: number; h: number };

export type CollageLayout = {
  width: number;
  height: number;
  /** Decorative cream panels, painted underneath the photos. */
  panels: Box[];
  /** Photo slots in paint order (last one is on top). */
  photos: Array<Box & { framed?: boolean }>;
};

const toPercent = (box: Box, layout: CollageLayout): CSSProperties => ({
  left: `${(box.x / layout.width) * 100}%`,
  top: `${(box.y / layout.height) * 100}%`,
  width: `${(box.w / layout.width) * 100}%`,
  height: `${(box.h / layout.height) * 100}%`,
});

type CollageProps = {
  layout: CollageLayout;
  images: SanityImage[];
  /** Rendered width of the whole collage, used to build per-photo `sizes`. */
  sizes: { mobile: string; desktop: number };
  /** Maps photo slot index → image index (defaults to identity). */
  order?: number[];
  priorityIndex?: number;
  className?: string;
};

/**
 * Overlapping photo composition positioned in percentages of the Figma
 * artboard, so it scales fluidly while keeping the exact proportions.
 */
export function Collage({
  layout,
  images,
  sizes,
  order,
  priorityIndex,
  className,
}: CollageProps) {
  return (
    <div
      className={cn("relative w-full", className)}
      style={{ aspectRatio: `${layout.width} / ${layout.height}` }}
    >
      {layout.panels.map((panel, i) => (
        <div
          key={`panel-${i}`}
          aria-hidden="true"
          className="absolute border-[5px] border-cream bg-cream-panel"
          style={toPercent(panel, layout)}
        />
      ))}
      {layout.photos.map((slot, i) => {
        const image = images[order?.[i] ?? i];
        if (!image) return null;
        const share = slot.w / layout.width;
        return (
          <div
            key={image.url + i}
            className={cn(
              "absolute overflow-hidden bg-fog",
              slot.framed && "border-4 border-white/80",
            )}
            style={toPercent(slot, layout)}
          >
            <Photo
              image={image}
              priority={priorityIndex === i}
              sizes={`(min-width: 1024px) ${Math.ceil(sizes.desktop * share)}px, calc(${sizes.mobile} * ${share.toFixed(3)})`}
            />
          </div>
        );
      })}
    </div>
  );
}
