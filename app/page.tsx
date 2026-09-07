import type { Metadata } from "next";
import { Hero } from "@/components/site/Hero";
import { StatBar } from "@/components/site/StatBar";
import { CategoryBlocks } from "@/components/site/CategoryBlocks";
import { QualityChecks } from "@/components/site/QualityChecks";
import { InStockNow } from "@/components/site/InStockNow";
import { BrandStrip } from "@/components/site/BrandStrip";
import { ReelsSection } from "@/components/site/ReelsSection";
import { ServicesStrip } from "@/components/site/ServicesStrip";
import { Reviews } from "@/components/site/Reviews";
import { VisitShop } from "@/components/site/VisitShop";
import { FAQ } from "@/components/site/FAQ";
import { pageMetadata } from "@/lib/seo";
import { shop } from "@/content";

const home = pageMetadata({
  title: shop.brandName,
  description:
    "New & second-hand phones at Ekta Chowk, Jabalpur. 20-point checked used phones with warranty, bill & box. EMI available.",
  path: "/",
});

// The layout's `%s · 2nd Hand Wala` template would double-append the brand on the home tab.
// Use `title.absolute` so the home title renders exactly once, verbatim.
export const metadata: Metadata = {
  ...home,
  title: { absolute: shop.brandName },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatBar />
      <CategoryBlocks />
      <QualityChecks />
      <InStockNow />
      <BrandStrip />
      <ReelsSection />
      <ServicesStrip />
      <Reviews />
      <VisitShop />
      <FAQ />
    </main>
  );
}
