import { extendTailwindMerge } from "tailwind-merge";

/** Keeps custom theme tokens mergeable (e.g. `tracking-display`). */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      tracking: [{ tracking: ["display", "body", "ui"] }],
    },
  },
});

/** Joins class names and resolves Tailwind conflicts — the last class wins. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes.filter(Boolean).join(" "));
}
