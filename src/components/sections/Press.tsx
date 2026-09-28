"use client";

import { Image } from "next-sanity/image";
import type { ProductPage } from "@/sanity/types";
import { useCarousel } from "@/hooks/useCarousel";
import { CarouselDots } from "@/components/ui/CarouselControls";

type PressProps = {
  heading: string;
  logos: ProductPage["hero"]["press"];
};

/** "As seen in" logo strip — a swipeable row with dots on mobile. */
export function Press({ heading, logos }: PressProps) {
  const { trackRef, index, count, scrollTo } = useCarousel<HTMLUListElement>();

  return (
    <section aria-labelledby="press-heading" className="pt-[16px] lg:-mt-0.5 lg:pt-0">
      <h2
        id="press-heading"
        className="text-center text-[15px] leading-[18px] tracking-body text-label lg:text-xl lg:leading-[23px] lg:tracking-[0.03em]"
      >
        {heading}
      </h2>
      <ul
        ref={trackRef}
        className="scrollbar-none mt-[16px] flex snap-x snap-mandatory scroll-px-[19px] items-center overflow-x-auto px-[19px] lg:container-page lg:mt-6 lg:justify-between lg:gap-8 lg:overflow-visible"
      >
        {logos.map(({ _key, name, logo }) => (
          <li
            key={_key}
            className="flex w-1/3 shrink-0 snap-start items-center justify-center px-2 lg:w-auto lg:min-w-0 lg:shrink lg:px-0"
          >
            <Image
              src={logo.url}
              alt={name}
              width={logo.width}
              height={logo.height}
              sizes="(min-width: 1024px) 272px, 33vw"
              className="h-auto max-h-[29px] w-auto max-w-full object-contain lg:max-h-[58px]"
              style={{ width: `${Math.round(logo.width / 2)}px` }}
            />
          </li>
        ))}
      </ul>
      <CarouselDots
        count={Math.max(0, count - 2)}
        index={index}
        onSelect={scrollTo}
        label="Show logos"
        className="mt-2 lg:hidden"
      />
    </section>
  );
}
