import type { ProductPage } from "@/sanity/types";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { IconBadge } from "@/components/ui/IconBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGallery } from "./ProductGallery";

type BenefitsProps = {
  benefits: ProductPage["benefits"];
  cta: ProductPage["cta"];
  ratingText: string;
};

export function Benefits({ benefits, cta, ratingText }: BenefitsProps) {
  return (
    <section aria-labelledby="benefits-heading" className="pt-[42px] lg:pt-[109px]">
      <div className="container-page grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_433px] lg:grid-rows-[auto_1fr] lg:gap-x-12 xl:pr-[45px] xl:pl-[41px]">
        <SectionHeading
          id="benefits-heading"
          className="mx-auto max-w-[20rem] text-center lg:col-start-1 lg:mx-0 lg:max-w-none lg:text-left"
        >
          {benefits.heading}
        </SectionHeading>

        <div className="mt-[29px] px-[36px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-[-3px] lg:px-0">
          <ProductGallery images={benefits.gallery} caption={benefits.galleryCaption} />
        </div>

        <ul className="mt-[60px] flex flex-col lg:col-start-1 lg:row-start-2 lg:mt-[74px] lg:gap-3 lg:-ml-[7px]">
          {benefits.items.map((item) => (
            <li
              key={item._key}
              className="flex flex-col items-center border-b border-line px-5 pb-[46px] text-center not-first:pt-[32px] last:border-0 lg:flex-row lg:items-start lg:gap-8 lg:border-0 lg:p-0 lg:text-left lg:not-first:pt-0"
            >
              <IconBadge
                icon={item.icon}
                className="size-[42px]"
                iconClassName="size-[23px]"
              />
              <div className="max-w-[15.25rem] lg:max-w-[29.5rem]">
                <h3 className="mt-[21px] text-xl leading-6 tracking-display text-navy lg:mt-[10px] lg:text-[22px]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-[18px] tracking-body lg:mt-[10px] lg:text-[15px] lg:leading-[23px] lg:text-body-strong">
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <CtaBlock cta={cta} ratingText={ratingText} className="mt-[13px] lg:hidden" />
      </div>
    </section>
  );
}
