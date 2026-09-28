import { Image } from "next-sanity/image";
import type { SanityImage } from "@/sanity/types";
import { cn } from "@/lib/cn";

type PhotoProps = {
  image?: SanityImage | null;
  /** Responsive `sizes` hint — keep it accurate, it drives the srcset choice. */
  sizes: string;
  className?: string;
  /** Marks the LCP image: loads eagerly with high fetch priority. */
  priority?: boolean;
};

/**
 * Fills its (relatively positioned) parent with a Sanity CDN image.
 * Sanity serves WebP/AVIF at the requested width; the LQIP gives an
 * instant blurred placeholder.
 */
export function Photo({ image, sizes, className, priority }: PhotoProps) {
  if (!image?.url) return null;
  return (
    <Image
      src={image.url}
      alt={image.alt}
      fill
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      placeholder={image.lqip ? "blur" : "empty"}
      blurDataURL={image.lqip}
      className={cn("object-cover", className)}
    />
  );
}
