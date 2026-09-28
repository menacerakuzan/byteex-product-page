"use client";

import { ChevronLeftIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

type ArrowProps = {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  label: string;
  className?: string;
};

export function CarouselArrow({ direction, onClick, disabled, label, className }: ArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center text-body transition-opacity",
        "hover:text-navy disabled:cursor-default disabled:opacity-30",
        className,
      )}
    >
      <ChevronLeftIcon className={cn("h-5 w-2.5", direction === "next" && "rotate-180")} />
    </button>
  );
}

type DotsProps = {
  count: number;
  index: number;
  onSelect: (index: number) => void;
  label: string;
  className?: string;
};

export function CarouselDots({ count, index, onSelect, label, className }: DotsProps) {
  if (count < 2) return null;
  return (
    <div className={cn("flex items-center justify-center gap-[7px]", className)}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`${label} ${i + 1} of ${count}`}
          aria-current={i === index}
          className={cn(
            "size-2 rounded-full transition-colors",
            i === index ? "bg-black" : "bg-[#c4c4c4]",
          )}
        />
      ))}
    </div>
  );
}
