import type { Metadata, Viewport } from "next";
import { preconnect } from "react-dom";
import { Inter, Outfit } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Byteex — Loungewear you can be proud of",
  description:
    "Beautiful, comfortable loungewear for day or night. Consciously made, butter-soft staples with free shipping on orders over $200.",
};

export const viewport: Viewport = {
  themeColor: "#01005b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // All photos are served from Sanity's image CDN.
  preconnect("https://cdn.sanity.io");
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
