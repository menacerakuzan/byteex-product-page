import type { ProductPage } from "@/sanity/types";
import { Collage, type CollageLayout } from "@/components/ui/Collage";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "./FaqAccordion";

/** "Component 5" in Figma. */
const FAQ_COLLAGE: CollageLayout = {
  width: 430,
  height: 645,
  panels: [
    { x: 30, y: 67, w: 149, h: 187 },
    { x: 238, y: 330, w: 134, h: 189 },
  ],
  photos: [
    { x: 221, y: 1, w: 167, h: 253 },
    { x: 0, y: 440, w: 216, h: 159 },
    { x: 80, y: 129, w: 227, h: 355 },
  ],
};

type FaqProps = {
  faq: ProductPage["faq"];
  cta: ProductPage["cta"];
  ratingText: string;
};

export function Faq({ faq, cta, ratingText }: FaqProps) {
  return (
    <section aria-labelledby="faq-heading" className="pt-[61px] lg:pt-[109px]">
      <div className="container-page grid grid-cols-1 lg:grid-cols-[minmax(0,630px)_430px] lg:justify-between xl:pl-[109px]">
        <div className="px-5 lg:px-0">
          <SectionHeading id="faq-heading" className="mx-auto max-w-[20rem] text-center lg:mx-0 lg:max-w-none lg:text-left">
            {faq.heading}
          </SectionHeading>
          <div className="mt-[38px] lg:mt-12">
            <FaqAccordion items={faq.items} />
          </div>
          <CtaBlock cta={cta} ratingText={ratingText} className="mt-[39px] lg:hidden" />
        </div>

        <div className="hidden lg:block">
          <Collage
            layout={FAQ_COLLAGE}
            images={faq.images}
            // Images come as top, center, bottom; paint the center one last.
            order={[0, 2, 1]}
            sizes={{ mobile: "0px", desktop: 430 }}
          />
        </div>
      </div>
    </section>
  );
}
