import { cn } from "@/lib/cn";
import { ContentIcon } from "./ContentIcon";

type IconBadgeProps = {
  icon?: string | null;
  className?: string;
  iconClassName?: string;
};

/** Cream (or custom) circle holding a content icon, as used across the design. */
export function IconBadge({ icon, className, iconClassName }: IconBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-cream text-navy",
        className,
      )}
    >
      <ContentIcon name={icon} className={iconClassName} />
    </span>
  );
}
