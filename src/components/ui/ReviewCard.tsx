import type { Review } from "@/sanity/types";
import { cn } from "@/lib/cn";
import { Photo } from "./Photo";
import { Stars } from "./Stars";

type ReviewCardProps = {
  review: Review;
  /** Featured-review variant: badge next to the stars ("One of 500+ …"). */
  badge?: string;
  className?: string;
};

export function ReviewCard({ review, badge, className }: ReviewCardProps) {
  const featured = Boolean(badge);
  return (
    <figure
      className={cn(
        "rounded-lg border border-border bg-white shadow-card",
        featured ? "px-[13px] pt-4 pb-4 lg:px-[19px] lg:pb-3" : "px-[37px] pt-[29px] pb-7 lg:pb-10",
        className,
      )}
    >
      <figcaption className="flex items-center gap-3">
        <span className="relative size-[39px] shrink-0 overflow-hidden rounded-full bg-avatar">
          <Photo image={review.avatar} sizes="39px" />
        </span>
        <span
          className={cn(
            "flex min-w-0",
            featured
              ? "flex-col-reverse lg:flex-row lg:items-center lg:gap-[22px]"
              : "flex-col-reverse",
          )}
        >
          <span className="whitespace-nowrap text-[15px] leading-[23px] tracking-body">{review.author}</span>
          <span className="flex items-center gap-2">
            <Stars rating={review.rating} starClassName="size-[10px]" className="gap-0.5" />
            {badge && (
              <span className="whitespace-nowrap font-ui text-[11px] leading-5 tracking-ui text-muted">{badge}</span>
            )}
          </span>
        </span>
      </figcaption>
      <blockquote
        className={cn(
          "font-ui text-xs leading-[23px] tracking-[0.01em]",
          featured ? "mt-[13px] lg:mt-3 lg:pl-0.5" : "mt-[11px] pl-0.5",
        )}
      >
        <p>{review.text}</p>
      </blockquote>
    </figure>
  );
}
