import type { ProductPage } from "@/sanity/types";
import { Collage, type CollageLayout } from "@/components/ui/Collage";
import { CtaButton } from "@/components/ui/CtaButton";
import { IconBadge } from "@/components/ui/IconBadge";
import { ReviewCard } from "@/components/ui/ReviewCard";

/** Photo triptych — coordinates from the "Group 6034" frame in Figma. */
const HERO_COLLAGE: CollageLayout = {
  width: 725,
  height: 422,
  panels: [
    { x: 0, y: 119, w: 134, h: 189 },
    { x: 591, y: 119, w: 134, h: 189 },
  ],
  photos: [
    { x: 67, y: 54, w: 166, h: 316 },
    { x: 493, y: 54, w: 166, h: 316 },
    { x: 235, y: 2, w: 255, h: 418 },
  ],
};

type HeroProps = {
  hero: ProductPage["hero"];
  cta: ProductPage["cta"];
};

export function Hero({ hero, cta }: HeroProps) {
  return (
    <section aria-labelledby="hero-heading" className="relative">
      {/* Cream band starting behind the review card and fading into the next sections. */}
      <div
        aria-hidden="true"
        className="bg-cream-fade absolute inset-x-0 top-[calc(100%-135px)] -z-10 h-[595px] lg:top-[calc(100%-76px)] lg:h-[530px]"
      />
      <div className="container-page grid grid-cols-1 justify-items-center lg:grid-cols-[460px_minmax(0,1fr)] xl:grid-cols-[520px_minmax(0,1fr)] lg:grid-rows-[auto_auto_auto_1fr] lg:justify-items-start lg:gap-x-14">
        <h1
          id="hero-heading"
          className="mt-[13px] max-w-[22rem] text-center text-[1.625rem] leading-[2.125rem] tracking-display text-navy sm:max-w-none lg:col-start-1 lg:mt-[62px] lg:max-w-[33rem] lg:text-left lg:text-[2rem] lg:leading-10 xl:text-[2.375rem] xl:leading-[2.8125rem]"
        >
          {hero.heading}
        </h1>

        <div className="mt-[18px] w-full max-w-[26rem] sm:max-w-[32rem] lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:mt-[71px] lg:max-w-none lg:self-start xl:w-[calc(100%+41px)]">
          <Collage
            layout={HERO_COLLAGE}
            images={hero.images}
            // Paint order puts the centre photo on top; images come in L, C, R.
            order={[0, 2, 1]}
            priorityIndex={2}
            sizes={{ mobile: "min(100vw - 42px, 32rem)", desktop: 725 }}
          />
        </div>

        <ul className="mt-[27px] flex w-full max-w-[21rem] flex-col gap-[26px] sm:max-w-[32rem] lg:col-start-1 lg:row-start-2 lg:mt-[22px] lg:max-w-[30rem] lg:gap-[21px]">
          {hero.bullets.map((bullet) => (
            <li key={bullet._key} className="flex items-center gap-[13px] lg:gap-3.5">
              <IconBadge
                icon={bullet.icon}
                className="size-[31px]"
                iconClassName="size-[19px]"
              />
              <span className="text-[13px] leading-[18px] tracking-body lg:text-[15px] lg:leading-[23px]">
                {bullet.text}
              </span>
            </li>
          ))}
        </ul>

        <CtaButton
          {...cta}
          className="mt-[37px] lg:col-start-1 lg:row-start-3 lg:mt-[27px] lg:ml-1 lg:max-w-[22.25rem]"
        />

        <ReviewCard
          review={hero.review}
          badge={hero.reviewBadge}
          className="mt-[31px] w-full max-w-[24.25rem] lg:col-start-1 lg:row-start-4 lg:mt-[52px] lg:ml-1 lg:max-w-[26rem]"
        />
      </div>
    </section>
  );
}
