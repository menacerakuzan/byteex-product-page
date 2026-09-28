import { defineQuery } from "next-sanity";

const figure = /* groq */ `{
  "url": asset->url,
  "alt": coalesce(alt, ""),
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip
}`;

const review = /* groq */ `{ _key, author, rating, text, avatar${figure} }`;

export const PRODUCT_PAGE_QUERY = defineQuery(`
*[_type == "productPage" && _id == "productPage"][0]{
  seo,
  announcements,
  cta,
  ratingText,
  hero{
    heading,
    bullets[]{ _key, icon, text },
    images[]${figure},
    review${review},
    reviewBadge,
    pressHeading,
    press[]{ _key, name, logo${figure} }
  },
  benefits{
    heading,
    items[]{ _key, icon, title, text },
    galleryCaption,
    gallery[]${figure}
  },
  founder{ heading, body, ctaLabel, images[]${figure} },
  howItWorks{ heading, steps[]{ _key, icon, title, text, highlighted } },
  reviews{ heading, text, gallery[]${figure}, items[]${review} },
  faq{ heading, items[]{ _key, question, answer }, images[]${figure} },
  impact{ heading, stats[]{ _key, icon, value, label } },
  finalCta{
    heading,
    text,
    images[]${figure},
    shippingNote,
    payments${figure},
    perks[]{ _key, icon, text }
  }
}`);
