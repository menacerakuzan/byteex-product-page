import type { ProductPage } from "@/sanity/types";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { ReviewsCarousel } from "./ReviewsCarousel";

/** Customer photos shown on small screens (2 rows × 4). */
const MOBILE_PHOTO_COUNT = 8;

type ReviewsProps = {
  reviews: ProductPage["reviews"];
  cta: ProductPage["cta"];
  ratingText: string;
};

export function Reviews({ reviews, cta, ratingText }: ReviewsProps) {
  return (
    <section aria-labelledby="reviews-heading" className="pt-[76px] lg:pt-[75px]">
      <div className="container-page text-center">
        <SectionHeading id="reviews-heading">{reviews.heading}</SectionHeading>
        <p className="mx-auto mt-[19px] max-w-[24rem] text-[15px] leading-[23px] tracking-body lg:mt-[25px] lg:max-w-[36rem]">
          {reviews.text}
        </p>
      </div>

      <ul
        aria-label="Photos from our customers"
        className="mt-[31px] grid grid-flow-col grid-cols-4 grid-rows-2 gap-[5px] lg:mt-[55px] lg:grid-cols-11 lg:gap-x-[5px] lg:gap-y-1.5"
      >
        {reviews.gallery.map((image, i) => (
          <li
            key={image.url + i}
            className={cn(
              "relative aspect-square overflow-hidden bg-fog",
              i >= MOBILE_PHOTO_COUNT && "hidden lg:block",
            )}
          >
            <Photo image={image} sizes="(min-width: 1024px) 9vw, 25vw" />
          </li>
        ))}
      </ul>

      <div className="container-page mt-[38px] lg:mt-[75px]">
        <ReviewsCarousel reviews={reviews.items} />
        <CtaBlock cta={cta} ratingText={ratingText} className="mt-[33px] lg:mt-[63px]" />
      </div>
    </section>
  );
}
