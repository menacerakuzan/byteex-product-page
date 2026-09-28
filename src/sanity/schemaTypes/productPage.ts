import { defineArrayMember, defineField, defineType } from "sanity";

const figures = (name: string, title: string, min: number, max?: number) =>
  defineField({
    name,
    title,
    type: "array",
    of: [defineArrayMember({ type: "figure" })],
    options: { layout: "grid" },
    validation: (r) => (max ? r.min(min).max(max) : r.min(min)),
  });

const heading = defineField({
  name: "heading",
  type: "string",
  validation: (r) => r.required(),
});

/**
 * Singleton document holding every section of the product landing page.
 * Each section lives in its own tab (group) to keep the editor tidy.
 */
export const productPage = defineType({
  name: "productPage",
  title: "Product page",
  type: "document",
  groups: [
    { name: "global", title: "Global", default: true },
    { name: "hero", title: "Hero" },
    { name: "benefits", title: "Benefits" },
    { name: "founder", title: "Founder" },
    { name: "howItWorks", title: "How it works" },
    { name: "reviews", title: "Reviews" },
    { name: "faq", title: "FAQ" },
    { name: "impact", title: "Impact" },
    { name: "finalCta", title: "Final CTA" },
  ],
  fields: [
    // ─── Global ────────────────────────────────────────────────────────────
    defineField({ name: "title", title: "Internal title", type: "string", group: "global" }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "global",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "announcements",
      title: "Announcement bar",
      description: "All messages are shown on desktop; mobile rotates through them.",
      type: "array",
      group: "global",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "cta", title: "Primary call to action", type: "link", group: "global" }),
    defineField({
      name: "ratingText",
      title: "Rating line under CTAs",
      type: "string",
      group: "global",
    }),

    // ─── Hero ──────────────────────────────────────────────────────────────
    defineField({
      name: "hero",
      type: "object",
      group: "hero",
      fields: [
        heading,
        defineField({
          name: "bullets",
          type: "array",
          of: [defineArrayMember({ type: "iconText" })],
          validation: (r) => r.max(4),
        }),
        figures("images", "Images (left, center, right)", 3, 3),
        defineField({
          name: "review",
          title: "Featured review",
          type: "review",
        }),
        defineField({ name: "reviewBadge", title: "Review badge text", type: "string" }),
        defineField({ name: "pressHeading", title: "Press heading", type: "string" }),
        defineField({
          name: "press",
          title: "Press logos",
          type: "array",
          of: [defineArrayMember({ type: "pressLogo" })],
        }),
      ],
    }),

    // ─── Benefits ──────────────────────────────────────────────────────────
    defineField({
      name: "benefits",
      type: "object",
      group: "benefits",
      fields: [
        heading,
        defineField({
          name: "items",
          type: "array",
          of: [defineArrayMember({ type: "feature" })],
        }),
        defineField({ name: "galleryCaption", title: "Gallery caption", type: "string" }),
        figures("gallery", "Product gallery", 1),
      ],
    }),

    // ─── Founder ───────────────────────────────────────────────────────────
    defineField({
      name: "founder",
      type: "object",
      group: "founder",
      fields: [
        heading,
        defineField({
          name: "body",
          type: "text",
          rows: 14,
          description: "Separate paragraphs with an empty line.",
        }),
        figures("images", "Images (main, top-left, bottom-right)", 3, 3),
        defineField({ name: "ctaLabel", title: "Button label", type: "string" }),
      ],
    }),

    // ─── How it works ──────────────────────────────────────────────────────
    defineField({
      name: "howItWorks",
      title: "How it works",
      type: "object",
      group: "howItWorks",
      fields: [
        heading,
        defineField({
          name: "steps",
          type: "array",
          of: [defineArrayMember({ type: "feature" })],
          validation: (r) => r.max(3),
        }),
      ],
    }),

    // ─── Reviews ───────────────────────────────────────────────────────────
    defineField({
      name: "reviews",
      type: "object",
      group: "reviews",
      fields: [
        heading,
        defineField({ name: "text", type: "text", rows: 3 }),
        figures("gallery", "Customer photos", 4),
        defineField({
          name: "items",
          title: "Reviews",
          type: "array",
          of: [defineArrayMember({ type: "review" })],
        }),
      ],
    }),

    // ─── FAQ ───────────────────────────────────────────────────────────────
    defineField({
      name: "faq",
      title: "FAQ",
      type: "object",
      group: "faq",
      fields: [
        heading,
        defineField({
          name: "items",
          title: "Questions",
          type: "array",
          of: [defineArrayMember({ type: "faqItem" })],
        }),
        figures("images", "Images (top, center, bottom)", 3, 3),
      ],
    }),

    // ─── Impact ────────────────────────────────────────────────────────────
    defineField({
      name: "impact",
      type: "object",
      group: "impact",
      fields: [
        heading,
        defineField({
          name: "stats",
          type: "array",
          of: [defineArrayMember({ type: "stat" })],
          validation: (r) => r.max(4),
        }),
      ],
    }),

    // ─── Final CTA ─────────────────────────────────────────────────────────
    defineField({
      name: "finalCta",
      title: "Final CTA",
      type: "object",
      group: "finalCta",
      fields: [
        heading,
        defineField({ name: "text", type: "text", rows: 2 }),
        figures("images", "Images (left, center, right)", 3, 3),
        defineField({ name: "shippingNote", type: "string" }),
        defineField({ name: "payments", title: "Payment methods image", type: "figure" }),
        defineField({
          name: "perks",
          type: "array",
          of: [defineArrayMember({ type: "iconText" })],
          validation: (r) => r.max(3),
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Product page" }),
  },
});
