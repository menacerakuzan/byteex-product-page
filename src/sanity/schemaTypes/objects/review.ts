import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Review",
  type: "object",
  fields: [
    defineField({ name: "author", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "rating",
      type: "number",
      initialValue: 5,
      validation: (r) => r.required().min(1).max(5).integer(),
    }),
    defineField({ name: "text", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "avatar", type: "figure" }),
  ],
  preview: { select: { title: "author", subtitle: "text", media: "avatar" } },
});

export const faqItem = defineType({
  name: "faqItem",
  title: "Question",
  type: "object",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "question", subtitle: "answer" } },
});

export const pressLogo = defineType({
  name: "pressLogo",
  title: "Press logo",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", type: "figure", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "name", media: "logo" } },
});
