/** Shapes returned by PRODUCT_PAGE_QUERY (images are pre-projected). */

export type SanityImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
  lqip?: string;
};

export type Link = { label: string; href: string };

export type IconText = { _key: string; icon: string; text: string };

export type Feature = {
  _key: string;
  icon: string;
  title: string;
  text?: string;
  highlighted?: boolean;
};

export type Stat = { _key: string; icon: string; value: string; label: string };

export type Review = {
  _key?: string;
  author: string;
  rating: number;
  text: string;
  avatar?: SanityImage | null;
};

export type FaqItem = { _key: string; question: string; answer: string };

export type PressLogo = { _key: string; name: string; logo: SanityImage };

export type ProductPage = {
  seo?: { title?: string; description?: string };
  announcements: string[];
  cta: Link;
  ratingText: string;
  hero: {
    heading: string;
    bullets: IconText[];
    images: SanityImage[];
    review: Review;
    reviewBadge: string;
    pressHeading: string;
    press: PressLogo[];
  };
  benefits: {
    heading: string;
    items: Feature[];
    galleryCaption: string;
    gallery: SanityImage[];
  };
  founder: {
    heading: string;
    body: string;
    ctaLabel?: string;
    images: SanityImage[];
  };
  howItWorks: { heading: string; steps: Feature[] };
  reviews: {
    heading: string;
    text: string;
    gallery: SanityImage[];
    items: Review[];
  };
  faq: { heading: string; items: FaqItem[]; images: SanityImage[] };
  impact: { heading: string; stats: Stat[] };
  finalCta: {
    heading: string;
    text: string;
    images: SanityImage[];
    shippingNote: string;
    payments?: SanityImage | null;
    perks: IconText[];
  };
};
