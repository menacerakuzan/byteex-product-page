import { defineField, defineType } from "sanity";

/** Image with required alt text — every photo on the page is content. */
export const figure = defineType({
  name: "figure",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describe the image for screen readers. Leave empty only for purely decorative images.",
    }),
  ],
});
