import { defineField } from "sanity";
import { contentIconOptions } from "@/components/icons/registry";

export const iconField = defineField({
  name: "icon",
  title: "Icon",
  type: "string",
  options: { list: contentIconOptions, layout: "dropdown" },
  validation: (rule) => rule.required(),
});
