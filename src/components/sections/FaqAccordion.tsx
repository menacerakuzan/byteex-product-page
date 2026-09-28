"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/sanity/types";
import { cn } from "@/lib/cn";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?._key ?? null);
  const baseId = useId();

  return (
    <ul className="border-t border-line">
      {items.map((item) => {
        const isOpen = open === item._key;
        const buttonId = `${baseId}-${item._key}-q`;
        const panelId = `${baseId}-${item._key}-a`;
        return (
          <li key={item._key} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item._key)}
                className={cn(
                  "flex w-full items-center justify-between gap-6 pt-[23px] text-left text-lg leading-6 tracking-[0.04em] text-navy transition-[padding] duration-300",
                  isOpen ? "pb-1.5" : "pb-[25px]",
                )}
              >
                <span>{item.question}</span>
                <span aria-hidden="true" className="relative mr-[3px] size-5 shrink-0 lg:mr-[33px]">
                  <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 bg-current" />
                  <span
                    className={cn(
                      "absolute top-0 left-1/2 h-full w-[1.5px] -translate-x-1/2 bg-current transition-transform duration-300",
                      isOpen && "scale-y-0",
                    )}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="pb-6 text-sm leading-5 tracking-body lg:max-w-[35.5rem] lg:text-[15px] lg:leading-[22px]">
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
