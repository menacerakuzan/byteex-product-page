import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export type CtaLink = {
  label: string;
  href: string;
};

type CtaButtonProps = CtaLink & {
  className?: string;
  withArrow?: boolean;
};

export function CtaButton({
  label,
  href,
  className,
  withArrow = true,
}: CtaButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex h-14 w-full max-w-[23.0625rem] items-center justify-center gap-4 rounded-[5px] bg-navy px-8",
        "font-ui text-lg leading-none tracking-body text-white",
        "transition-colors duration-200 hover:bg-indigo active:bg-ink",
        className,
      )}
    >
      <span>{label}</span>
      {withArrow && (
        <ArrowRightIcon className="h-2.5 w-[23px] transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </a>
  );
}
