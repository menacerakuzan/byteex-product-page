import type { ProductPage } from "@/sanity/types";
import { Collage, type CollageLayout } from "@/components/ui/Collage";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** "Group 6036" in Figma: main photo with two framed accents. */
const FOUNDER_COLLAGE: CollageLayout = {
  width: 543,
  height: 664,
  panels: [],
  photos: [
    { x: 77, y: 47, w: 381, h: 570 },
    { x: 0, y: 0, w: 165, h: 175, framed: true },
    { x: 395, y: 489, w: 128, h: 175, framed: true },
  ],
};

type FounderProps = {
  founder: ProductPage["founder"];
  cta: ProductPage["cta"];
};

export function Founder({ founder, cta }: FounderProps) {
  const paragraphs = founder.body.split(/\n\s*\n/).filter(Boolean);

  return (
    <section
      aria-labelledby="founder-heading"
      className="mt-[60px] bg-fog pt-[39px] pb-[56px] lg:mt-[54px] lg:pt-[83px] lg:pb-[56px]"
    >
      <div className="container-page grid grid-cols-1 lg:grid-cols-[543px_minmax(0,1fr)] lg:grid-rows-[auto_auto_1fr] lg:items-start lg:gap-x-[84px] xl:pl-[61px]">
        <SectionHeading
          id="founder-heading"
          className="text-center text-indigo lg:col-start-2 lg:mt-[30px] lg:text-left"
        >
          {founder.heading}
        </SectionHeading>

        <div className="mx-auto mt-[26px] w-full max-w-[344px] lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:max-w-none">
          <Collage
            layout={FOUNDER_COLLAGE}
            images={founder.images}
            sizes={{ mobile: "min(100vw - 84px, 344px)", desktop: 543 }}
          />
        </div>

        <div className="mt-[48px] space-y-[23px] px-[23px] lg:px-0 text-[15px] leading-[23px] tracking-body text-body-strong lg:col-start-2 lg:row-start-2 lg:mt-[30px] lg:max-w-[38.75rem]">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <CtaButton
          label={founder.ctaLabel || cta.label}
          href={cta.href}
          withArrow={false}
          className="mt-[44px] hidden lg:col-start-2 lg:row-start-3 lg:flex lg:max-w-[22.25rem]"
        />
      </div>
    </section>
  );
}
