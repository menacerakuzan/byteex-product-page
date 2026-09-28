import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
};

export function SectionHeading({
  children,
  as: Tag = "h2",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "text-[1.625rem] leading-[2.125rem] font-normal tracking-display text-navy md:text-[2rem] md:leading-10",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
