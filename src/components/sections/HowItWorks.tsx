"use client";

import type { ProductPage } from "@/sanity/types";
import { useCarousel } from "@/hooks/useCarousel";
import { CarouselArrow } from "@/components/ui/CarouselControls";
import { ContentIcon } from "@/components/ui/ContentIcon";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

/** Glyph sizes per icon, matching the Figma artboard. */
const STEP_ICON_SIZE: Record<string, string> = {
  store: "size-[51px]",
  truck: "h-[49px] w-[69px]",
  sunMoon: "size-[60px] [stroke-width:2]",
};

type HowItWorksProps = {
  section: ProductPage["howItWorks"];
  cta: ProductPage["cta"];
  ratingText: string;
};

export function HowItWorks({ section, cta, ratingText }: HowItWorksProps) {
  const { trackRef, canPrev, canNext, prev, next } = useCarousel<HTMLUListElement>();

  return (
    <section aria-labelledby="how-heading" className="pt-[49px] lg:pt-[75px]">
      <div className="container-page">
        <SectionHeading id="how-heading" className="text-center">
          {section.heading}
        </SectionHeading>

        <div className="relative mx-auto mt-[31px] max-w-[288px] lg:mt-[46px] lg:max-w-[1120px]">
          <ul
            ref={trackRef}
            aria-label="How it works"
            className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto lg:grid lg:grid-cols-3 lg:gap-[41px] lg:overflow-visible"
          >
            {section.steps.map((step, i) => (
              <li
                key={step._key}
                aria-label={`Step ${i + 1} of ${section.steps.length}`}
                className={cn(
                  "flex aspect-square w-full shrink-0 snap-center flex-col items-center rounded-lg border border-border px-6 pt-[70px] text-center lg:aspect-[346/321] lg:pt-[73px]",
                  "bg-fog",
                  step.highlighted && "lg:bg-cream",
                )}
              >
                <span className="flex h-[60px] items-center justify-center text-navy">
                  <ContentIcon
                    name={step.icon}
                    className={STEP_ICON_SIZE[step.icon] ?? "size-[51px]"}
                  />
                </span>
                <h3 className="mt-[5px] text-[22px] leading-10 tracking-display text-navy lg:mt-[11px]">
                  {step.title}
                </h3>
                <p className="mt-1.5 max-w-[14rem] text-[15px] leading-[23px] tracking-body lg:mt-[5px] lg:max-w-[18.5rem]">
                  {step.text}
                </p>
              </li>
            ))}
          </ul>

          <CarouselArrow
            direction="prev"
            label="Previous step"
            onClick={prev}
            disabled={!canPrev}
            className="absolute top-1/2 -left-[53px] -translate-y-1/2 lg:hidden"
          />
          <CarouselArrow
            direction="next"
            label="Next step"
            onClick={next}
            disabled={!canNext}
            className="absolute top-1/2 -right-[53px] -translate-y-1/2 lg:hidden"
          />
        </div>

        <CtaBlock cta={cta} ratingText={ratingText} className="mt-[41px] lg:mt-14" />
      </div>
    </section>
  );
}
