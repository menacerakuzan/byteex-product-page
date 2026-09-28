import { Image } from "next-sanity/image";
import type { ProductPage } from "@/sanity/types";
import { ClockIcon } from "@/components/icons";
import { Collage, type CollageLayout } from "@/components/ui/Collage";
import { CtaButton } from "@/components/ui/CtaButton";
import { IconBadge } from "@/components/ui/IconBadge";
import { Rating } from "@/components/ui/Rating";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** "Group 6037" in Figma. */
const FINAL_COLLAGE: CollageLayout = {
  width: 815,
  height: 372,
  panels: [
    { x: 0, y: 88, w: 139, h: 196 },
    { x: 676, y: 88, w: 139, h: 196 },
  ],
  photos: [
    { x: 69, y: 28, w: 209, h: 316 },
    { x: 536, y: 28, w: 209, h: 316 },
    { x: 284, y: 0, w: 246, h: 372 },
  ],
};

const PERK_ICON_SIZE: Record<string, string> = {
  truck: "h-[14px] w-5",
  shield: "h-[18px] w-[16px]",
  cartLeaf: "h-[17px] w-[21px]",
};

type FinalCtaProps = {
  section: ProductPage["finalCta"];
  cta: ProductPage["cta"];
  ratingText: string;
};

export function FinalCta({ section, cta, ratingText }: FinalCtaProps) {
  return (
    <section
      id="shop"
      aria-labelledby="final-heading"
      className="bg-cream-rise bg-[length:100%_508px] bg-bottom bg-no-repeat pt-[62px] pb-[62px] lg:pt-[84px] lg:pb-[83px]"
    >
      <div className="container-page flex flex-col items-center text-center">
        <SectionHeading id="final-heading" className="max-w-[20rem] sm:max-w-none">
          {section.heading}
        </SectionHeading>
        <p className="mt-[9px] max-w-[36.75rem] text-[15px] leading-[22px] tracking-body lg:mt-3">
          {section.text}
        </p>

        <div className="mt-[34px] w-full max-w-[815px] lg:mt-[44px]">
          <Collage
            layout={FINAL_COLLAGE}
            images={section.images}
            order={[0, 2, 1]}
            sizes={{ mobile: "100vw", desktop: 815 }}
          />
        </div>

        <CtaButton {...cta} className="mt-[52px] lg:mt-[59px]" />

        <Rating text={ratingText} className="mt-[11px] lg:hidden" />

        <div className="mt-1.5 hidden items-center justify-center gap-[11px] lg:flex">
          <p className="flex items-center gap-1 font-ui text-[10px] leading-[17px] tracking-[0.04em] text-success">
            <ClockIcon className="size-[11px]" />
            {section.shippingNote}
          </p>
          {section.payments && (
            <>
              <span aria-hidden="true" className="h-[17px] w-0.5 bg-[#c4c4c4]/60" />
              <Image
                src={section.payments.url}
                alt={section.payments.alt}
                width={243}
                height={22}
                sizes="243px"
                className="h-[22px] w-[243px]"
              />
            </>
          )}
        </div>

        <ul className="mt-[18px] hidden items-center divide-x divide-[#c4c4c4]/40 lg:flex">
          {section.perks.map((perk) => (
            <li key={perk._key} className="flex h-[51px] items-center gap-3 px-[21px] first:pl-0 last:pr-0">
              <IconBadge
                icon={perk.icon}
                className="size-[33px] bg-[#666]/10 text-body"
                iconClassName={PERK_ICON_SIZE[perk.icon] ?? "size-4"}
              />
              <span className="max-w-[9.5rem] text-left text-sm leading-5 tracking-[0.03em]">
                {perk.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
