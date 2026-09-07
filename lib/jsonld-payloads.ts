import { shop, faqPage } from "../content";
import { SITE_URL, BUSINESS_ID, absoluteUrl } from "./seo";

export type BreadcrumbItem = { name: string; path: string };

/**
 * Every unique breadcrumb payload emitted on the site. This is the single
 * source of truth used both by BreadcrumbListJsonLd (render side) and by
 * lib/csp.ts (CSP script-src hash side). Adding a new page? Add its
 * breadcrumb here and import from your page; inline items in a page will
 * hash to a value not in the CSP allowlist and get blocked.
 *
 * Policy pages (privacy / terms / returns) are deliberately NOT listed
 * here: they are noindex, they carry no BreadcrumbList JSON-LD, and no
 * search result should surface them.
 */
export const BREADCRUMBS = {
  about: [{ name: "About", path: "/about" }],
  contact: [{ name: "Contact", path: "/contact" }],
  emi: [{ name: "EMI", path: "/emi" }],
  faq: [{ name: "FAQ", path: "/faq" }],
  sellYourPhone: [{ name: "Sell your phone", path: "/sell-your-phone" }],
  warranty: [{ name: "Warranty", path: "/warranty" }],
  wholesale: [{ name: "Wholesale", path: "/wholesale" }],
} as const satisfies Record<string, readonly BreadcrumbItem[]>;

export function buildBreadcrumbData(items: readonly BreadcrumbItem[]) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * The single authoritative business entity. Emitted once from the root
 * layout. Every other node (breadcrumbs, FAQ) is referenced by @id rather
 * than duplicated, so Google sees one business, not competing ones.
 */
export function buildLocalBusinessData() {
  return {
    "@context": "https://schema.org",
    "@type": "MobilePhoneStore",
    "@id": BUSINESS_ID,
    name: shop.brandName,
    legalName: shop.legalNameLatin,
    alternateName: [
      shop.legalName,
      shop.legalNameLatin,
      shop.handle,
    ],
    url: `${SITE_URL}/`,
    telephone: shop.phoneDisplay,
    email: shop.email,
    image: [absoluteUrl("/images/storefront.webp")],
    logo: absoluteUrl("/images/icon-any.png"),
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: shop.address.line1,
      addressLocality: shop.address.locality,
      addressRegion: shop.address.region,
      postalCode: shop.address.postal,
      addressCountry: shop.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: shop.address.lat,
      longitude: shop.address.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "11:00",
        closes: "22:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: shop.phoneDisplay,
        email: shop.email,
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
    sameAs: [shop.urls.instagram],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: shop.rating.toString(),
      reviewCount: shop.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Phones and services",
      itemListElement: [
        { "@type": "OfferCatalog", name: "Brand-new phones" },
        { "@type": "OfferCatalog", name: "Second-hand phones" },
        { "@type": "OfferCatalog", name: "EMI, exchange, buy-back, repairs, accessories" },
      ],
    },
  };
}

const hasToken = (s: string) => /\[[^\]]+\]/.test(s);

/**
 * FAQ JSON-LD. Only questions with real confirmed answers are emitted;
 * tokened answers (like [WARRANTY TRANSFER RULES]) are excluded so search
 * engines never index unfinished policy.
 */
export function buildFaqData() {
  const mainEntity = faqPage.categories.flatMap((cat) =>
    cat.items
      .filter((it) => !hasToken(it.a))
      .map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
  );
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/faq#faqpage`,
    about: { "@id": BUSINESS_ID },
    mainEntity,
  };
}

/**
 * Every inline <script type="application/ld+json"> that can be rendered
 * anywhere on the site. Serialized with JSON.stringify (no spacing) to
 * match what dangerouslySetInnerHTML emits, then SHA-256'd by lib/csp.ts.
 */
export const ALL_INLINE_JSONLD: unknown[] = [
  buildLocalBusinessData(),
  buildFaqData(),
  ...Object.values(BREADCRUMBS).map((items) => buildBreadcrumbData(items)),
];
