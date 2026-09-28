import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductPage } from "@/sanity/lib/fetch";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Press } from "@/components/sections/Press";
import { Benefits } from "@/components/sections/Benefits";
import { Founder } from "@/components/sections/Founder";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { Impact } from "@/components/sections/Impact";
import { FinalCta } from "@/components/sections/FinalCta";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getProductPage();
  const title = page?.seo?.title;
  const description = page?.seo?.description;
  const image = page?.hero.images[1];
  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      title,
      description,
      images: image
        ? [{ url: `${image.url}?w=1200&h=630&fit=crop&auto=format`, width: 1200, height: 630, alt: image.alt }]
        : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Home() {
  const page = await getProductPage();
  if (!page) notFound();

  return (
    <>
      <AnnouncementBar messages={page.announcements} />
      <Header />
      <main className="overflow-x-clip">
        <Hero hero={page.hero} cta={page.cta} />
        <Press heading={page.hero.pressHeading} logos={page.hero.press} />
        <Benefits benefits={page.benefits} cta={page.cta} ratingText={page.ratingText} />
        <Founder founder={page.founder} cta={page.cta} />
        <HowItWorks section={page.howItWorks} cta={page.cta} ratingText={page.ratingText} />
        <Reviews reviews={page.reviews} cta={page.cta} ratingText={page.ratingText} />
        <Faq faq={page.faq} cta={page.cta} ratingText={page.ratingText} />
        <Impact impact={page.impact} />
        <FinalCta section={page.finalCta} cta={page.cta} ratingText={page.ratingText} />
      </main>
    </>
  );
}
