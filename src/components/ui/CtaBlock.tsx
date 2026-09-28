import { cn } from "@/lib/cn";
import { CtaButton, type CtaLink } from "./CtaButton";
import { Rating } from "./Rating";

type CtaBlockProps = {
  cta: CtaLink;
  ratingText?: string;
  className?: string;
};

/** Centered CTA with the review rating line underneath. */
export function CtaBlock({ cta, ratingText, className }: CtaBlockProps) {
  return (
    <div className={cn("flex flex-col items-center gap-[11px]", className)}>
      <CtaButton {...cta} />
      {ratingText && <Rating text={ratingText} />}
    </div>
  );
}
