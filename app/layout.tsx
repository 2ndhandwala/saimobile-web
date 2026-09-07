import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LocalBusinessJsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/seo";
import { shop } from "@/content";
import { CookieConsent } from "@/components/site/CookieConsent";
import { GoogleAnalytics } from "@/components/site/GoogleAnalytics";
import { AnnouncementMarquee } from "@/components/site/AnnouncementMarquee";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyMobileBar } from "@/components/site/StickyMobileBar";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: shop.brandName,
    template: `%s · ${shop.brandName}`,
  },
  description:
    "New & second-hand phones at Ekta Chowk, Jabalpur. Every used phone: 20-point checked, with warranty, bill & box. EMI available.",
  applicationName: shop.brandName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: shop.brandName,
    locale: "en_IN",
    url: SITE_URL,
    title: shop.brandName,
    description:
      "New & second-hand phones at Ekta Chowk, Jabalpur. 20-point checked used phones with warranty, bill & box. EMI available.",
  },
  twitter: {
    card: "summary_large_image",
    title: shop.brandName,
    description:
      "New & second-hand phones at Ekta Chowk, Jabalpur. 20-point checked used phones with warranty, bill & box. EMI available.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/images/icon-any.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/images/icon-any.png",
    apple: [{ url: "/images/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f4efe6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${bricolage.variable} ${space.variable} ${mono.variable} antialiased`}
    >
      <body className="grain min-h-dvh flex flex-col bg-paper text-ink">
        <LocalBusinessJsonLd />
        <AnnouncementMarquee />
        <Header />
        {children}
        <Footer />
        <StickyMobileBar />
        <CookieConsent />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
