import type { SchemaTypeDefinition } from "sanity";
import { figure } from "./objects/figure";
import { feature, iconText, stat } from "./objects/iconText";
import { link } from "./objects/link";
import { faqItem, pressLogo, review } from "./objects/review";
import { productPage } from "./productPage";

export const schemaTypes: SchemaTypeDefinition[] = [
  productPage,
  figure,
  link,
  iconText,
  feature,
  stat,
  review,
  faqItem,
  pressLogo,
];
