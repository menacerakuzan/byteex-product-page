import { defineField, defineType } from "sanity";
import { iconField } from "./iconPicker";

/** Icon + short text (hero bullets, final CTA perks). */
export const iconText = defineType({
  name: "iconText",
  title: "Icon with text",
  type: "object",
  fields: [iconField, defineField({ name: "text", type: "string", validation: (r) => r.required() })],
  preview: { select: { title: "text", subtitle: "icon" } },
});

/** Icon + title + description (benefits, "how it works" steps). */
export const feature = defineType({
  name: "feature",
  title: "Feature",
  type: "object",
  fields: [
    iconField,
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", type: "text", rows: 3 }),
    defineField({
      name: "highlighted",
      title: "Highlighted card",
      type: "boolean",
      description: "Uses the cream background (\"We ship.\" card).",
      initialValue: false,
    }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

/** Big number with a label (green impact strip). */
export const stat = defineType({
  name: "stat",
  title: "Statistic",
  type: "object",
  fields: [
    iconField,
    defineField({ name: "value", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});
