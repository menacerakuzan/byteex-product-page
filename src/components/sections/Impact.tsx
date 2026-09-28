import type { ProductPage } from "@/sanity/types";
import { IconBadge } from "@/components/ui/IconBadge";

const STAT_ICON_SIZE: Record<string, string> = {
  co2: "h-[20px] w-[30px]",
  water: "h-[31px] w-[22px]",
  energy: "h-[28px] w-[19px]",
};

export function Impact({ impact }: { impact: ProductPage["impact"] }) {
  return (
    <section
      aria-labelledby="impact-heading"
      className="mt-[64px] bg-fog pt-[54px] pb-[57px] text-indigo lg:mt-[42px] lg:pt-[39px] lg:pb-8 lg:text-ink"
    >
      <div className="container-page">
        <h2
          id="impact-heading"
          className="text-center text-[25px] leading-10 tracking-[0.04em] max-lg:capitalize"
        >
          {impact.heading}
        </h2>
        <ul className="mx-auto mt-[21px] flex max-w-[282px] flex-col divide-y divide-[#c4c4c4]/50 lg:mt-[13px] lg:grid lg:max-w-[680px] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {impact.stats.map((stat) => (
            <li
              key={stat._key}
              className="flex flex-col items-center py-[22px] text-center lg:py-2"
            >
              <IconBadge
                icon={stat.icon}
                className="size-[42px] bg-[#e4e4e4] text-indigo"
                iconClassName={STAT_ICON_SIZE[stat.icon] ?? "size-6"}
              />
              <p className="mt-[13px] text-[22px] leading-5 font-semibold tracking-[0.02em]">
                {stat.value}
              </p>
              <p className="mt-1 text-sm leading-5 tracking-[0.03em]">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
