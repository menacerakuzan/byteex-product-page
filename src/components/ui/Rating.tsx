import { cn } from "@/lib/cn";
import { Stars } from "./Stars";

type RatingProps = {
  text: string;
  className?: string;
};

/** Stars + "Over 500+ 5 Star Reviews Online" line shown under CTAs. */
export function Rating({ text, className }: RatingProps) {
  return (
    <p
      className={cn(
        "flex items-center justify-center gap-[15px] font-ui text-xs leading-5 tracking-ui text-muted",
        className,
      )}
    >
      <Stars starClassName="size-[13px]" />
      <span>{text}</span>
    </p>
  );
}
