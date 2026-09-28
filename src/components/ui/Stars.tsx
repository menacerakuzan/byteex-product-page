import { StarIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

type StarsProps = {
  rating?: number;
  className?: string;
  starClassName?: string;
};

export function Stars({ rating = 5, className, starClassName }: StarsProps) {
  const value = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span
      role="img"
      aria-label={`Rated ${value} out of 5`}
      className={cn("inline-flex items-center gap-[3px] text-star", className)}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon
          key={i}
          className={cn("size-3", i >= value && "opacity-25", starClassName)}
        />
      ))}
    </span>
  );
}
