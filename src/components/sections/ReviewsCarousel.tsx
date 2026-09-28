"use client";

import type { Review } from "@/sanity/types";
import { useCarousel } from "@/hooks/useCarousel";
import { CarouselArrow, CarouselDots } from "@/components/ui/CarouselControls";
import { ReviewCard } from "@/components/ui/ReviewCard";

export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const { trackRef, index, count, canPrev, canNext, scrollTo, prev, next } =
    useCarousel<HTMLUListElement>();

  return (
    <div className="mx-auto max-w-[298px] lg:max-w-[1098px]">
      <div className="relative">
        <ul
          ref={trackRef}
          aria-label="Customer reviews"
          className="scrollbar-none -my-4 flex snap-x snap-mandatory items-stretch gap-[42px] lg:items-start overflow-x-auto py-4"
        >
          {reviews.map((review, i) => (
            <li
              key={review._key ?? i}
              className="w-full shrink-0 snap-start lg:w-[338px] lg:odd:mt-0 lg:even:mt-0.5"
            >
              <ReviewCard review={review} className="h-full lg:h-auto" />
            </li>
          ))}
        </ul>
        <CarouselArrow
          direction="prev"
          label="Previous reviews"
          onClick={prev}
          disabled={!canPrev}
          className="absolute top-[130px] -left-[43px] -translate-y-1/2 lg:top-[96px] lg:-left-[93px]"
        />
        <CarouselArrow
          direction="next"
          label="Next reviews"
          onClick={next}
          disabled={!canNext}
          className="absolute top-[130px] -right-[43px] -translate-y-1/2 lg:top-[96px] lg:-right-[79px]"
        />
      </div>
      <CarouselDots
        count={count}
        index={index}
        onSelect={scrollTo}
        label="Show review"
        className="mt-3 lg:hidden"
      />
    </div>
  );
}
