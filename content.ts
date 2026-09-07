/**
 * Single source of truth for the demo.
 * Change anything here → it flows into every section on the page.
 * All placeholder items are marked with `/* placeholder *​/` for grep-ability.
 */

export const shop = {
  legalName: "श्री Sai Mobile",
  legalNameLatin: "Shri Sai Mobile",
  brandName: "2nd Hand Wala",
  handle: "@2nd_hand_wala_jbp_",
  tagline: "Ekta Chowk ka phone shop.",
  yearsRunning: 14,
  yearFounded: 2012,
  phonesSold: "50,000+",
  followers: "229,000+",
  followersShort: "229K+",
  rating: 4.8,
  reviewCount: 679,
  hours: "11:00 AM – 10:00 PM",
  hoursShort: "11am – 10pm",
  daysOpen: "7 days a week",
  phoneDisplay: "+91 97556 66024",
  phoneTel: "+919755666024",
  whatsappNumber: "919755666024",
  email: "contact@2ndhandwala.com",
  privacyEmail: "privacy@2ndhandwala.com",
  address: {
    line1: "Ekta Chowk, Vijay Nagar, MR4",
    line2: "Jabalpur, MP - 482002",
    locality: "Jabalpur",
    region: "Madhya Pradesh",
    postal: "482002",
    country: "IN",
    // Approximate lat/lng for Jabalpur Ekta Chowk area (placeholder, pin via share.google link):
    lat: 23.181,
    lng: 79.9864,
  },
  urls: {
    instagram: "https://www.instagram.com/2nd_hand_wala_jbp_/",
    googleMaps: "https://maps.app.goo.gl/zmAg3AZRDBouUvPC8",
    googleReviews: "https://maps.app.goo.gl/zmAg3AZRDBouUvPC8",
  },
} as const;

/** Convenience CTA links */
export const links = {
  call: `tel:${shop.phoneTel}`,
  email: `mailto:${shop.email}`,
  emailPrivacy: `mailto:${shop.privacyEmail}`,
  whatsapp: (msg = "Hi, I saw your Instagram. Can you help me with a phone?") =>
    `https://wa.me/${shop.whatsappNumber}?text=${encodeURIComponent(msg)}`,
  whatsappModel: (model: string) =>
    `https://wa.me/${shop.whatsappNumber}?text=${encodeURIComponent(
      `Hi, price for ${model}?`,
    )}`,
  directions: shop.urls.googleMaps,
  instagram: shop.urls.instagram,
  // Embed-safe map: address query, not the maps.app.goo.gl shortlink (shortlinks don't render in iframes)
  mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(
    "Shri Sai Mobile, Ekta Chowk, Vijay Nagar, MR4, Jabalpur, Madhya Pradesh 482002",
  )}&output=embed`,
} as const;

/**
 * The 20-point used-phone check. `icon` is a Phosphor icon name (SSR set);
 * component consumers map the string to a real Phosphor component locally.
 * placeholder: owner must confirm the real list, logged in DEMO-NOTES.md
 */
export const qualityChecks: {
  n: string;
  label: string;
  note?: string;
  icon: string;
}[] = [
  { n: "01", label: "Battery health", note: "Cycle count + capacity read", icon: "BatteryFull" },
  { n: "02", label: "Display for dead pixels", note: "Full-white / full-black test", icon: "Monitor" },
  { n: "03", label: "Touch response", note: "Multi-touch across full screen", icon: "HandTap" },
  { n: "04", label: "Charging port", note: "Fast-charge draw check", icon: "PlugCharging" },
  { n: "05", label: "Speaker output", note: "Both channels, full range", icon: "SpeakerHigh" },
  { n: "06", label: "Microphone", note: "Voice calls + recording mode", icon: "Microphone" },
  { n: "07", label: "Front camera", note: "Auto-focus, low-light", icon: "CameraRotate" },
  { n: "08", label: "Rear cameras", note: "Every lens, every mode", icon: "Aperture" },
  { n: "09", label: "IMEI verification", note: "Cross-checked with GSMA", icon: "Barcode" },
  { n: "10", label: "Network bands", note: "4G / 5G on Indian carriers", icon: "CellSignalHigh" },
  { n: "11", label: "Wi-Fi", note: "2.4 GHz + 5 GHz bands both connect", icon: "WifiHigh" },
  { n: "12", label: "Bluetooth pairing", note: "Tested with headset + speaker", icon: "Bluetooth" },
  { n: "13", label: "Sensors", note: "Proximity, gyro, ambient light", icon: "Compass" },
  { n: "14", label: "Physical buttons", note: "Power, volume, mute", icon: "CursorClick" },
  { n: "15", label: "Biometrics", note: "Face unlock and/or fingerprint", icon: "Fingerprint" },
  { n: "16", label: "Body condition", note: "Front, back, frame: every mark logged", icon: "DeviceMobile" },
  { n: "17", label: "Water damage indicator", note: "LDI check on ports and interior", icon: "Drop" },
  { n: "18", label: "Original parts check", note: "No third-party display or battery", icon: "PuzzlePiece" },
  { n: "19", label: "Factory reset + OS integrity", note: "Clean install, no bloat", icon: "ArrowsClockwise" },
  { n: "20", label: "30-minute stress test", note: "Heat, drain, restart", icon: "Timer" },
];

export const trustPillars = [
  { label: "Warranty on every used phone" },
  { label: "Bill provided" },
  { label: "Original box" },
  { label: "Original accessories" },
];

/** placeholder inventory. Prices intentionally omitted.
 * `alt` is required on every StockItem; a missing alt is a build error, not a warning.
 * When placeholder photos are replaced with real shots, the alt should describe the
 * real photo (e.g. "Refurbished iPhone 13 on the shop counter"), not the model name.
 */
export type Condition = "Like New" | "Excellent" | "Good";
export type StockItem = {
  brand: string;
  model: string;
  storage: string;
  ram?: string;
  condition: Condition | "New";
  kind: "Used" | "New";
  seed: string; // maps to /public/images/products/phone-{seed}.webp
  alt: string; // required: describes the intended real photo; see DEMO-NOTES
};
export const stockUsed: StockItem[] = [
  { brand: "Apple", model: "iPhone 13", storage: "128GB", condition: "Excellent", kind: "Used", seed: "iphone-13", alt: "Used Apple iPhone 13, 128GB, excellent condition, at 2nd Hand Wala" },
  { brand: "Apple", model: "iPhone 12", storage: "128GB", condition: "Like New", kind: "Used", seed: "iphone-12", alt: "Used Apple iPhone 12, 128GB, like-new condition, at 2nd Hand Wala" },
  { brand: "Samsung", model: "Galaxy S22", storage: "128GB", ram: "8GB", condition: "Excellent", kind: "Used", seed: "s22", alt: "Used Samsung Galaxy S22, 128GB, excellent condition, at 2nd Hand Wala" },
  { brand: "OnePlus", model: "OnePlus 11R", storage: "256GB", ram: "8GB", condition: "Like New", kind: "Used", seed: "op11r", alt: "Used OnePlus 11R, 256GB, like-new condition, at 2nd Hand Wala" },
  { brand: "Xiaomi", model: "Redmi Note 12 Pro", storage: "128GB", ram: "8GB", condition: "Good", kind: "Used", seed: "note12pro", alt: "Used Xiaomi Redmi Note 12 Pro, 128GB, good condition, at 2nd Hand Wala" },
  { brand: "Vivo", model: "Vivo V29", storage: "128GB", ram: "8GB", condition: "Excellent", kind: "Used", seed: "v29", alt: "Used Vivo V29, 128GB, excellent condition, at 2nd Hand Wala" },
];
export const stockNew: StockItem[] = [
  { brand: "Apple", model: "iPhone 15", storage: "128GB", condition: "New", kind: "New", seed: "iphone-15", alt: "Brand-new Apple iPhone 15, 128GB, sealed box, at 2nd Hand Wala" },
  { brand: "Samsung", model: "Galaxy S24", storage: "256GB", ram: "8GB", condition: "New", kind: "New", seed: "s24", alt: "Brand-new Samsung Galaxy S24, 256GB, sealed box, at 2nd Hand Wala" },
];

/** Brand strip: text wordmarks in display font, no per-brand SVGs. */
export const brandsSold = [
  "Apple",
  "Samsung",
  "Vivo",
  "Oppo",
  "Realme",
  "OnePlus",
  "Xiaomi",
  "Nothing",
  "iQOO",
  "Motorola",
] as const;

/** Services strip */
export const services = [
  { name: "EMI", body: "Buy on easy instalments." },
  { name: "Exchange", body: "Swap your old phone for a new or used one." },
  { name: "Buy-back", body: "Selling? We buy phones at the counter." },
  { name: "Repairs", body: "Screen, battery, board, in-house." },
  { name: "Accessories", body: "Cases, chargers, cables, tempered glass." },
];

/** Reels: array of Instagram permalinks.
 * placeholder: leave [] for the demo. ReelGrid falls back to styled cards.
 * When you have permalinks: paste like "https://www.instagram.com/reel/DCxxxxxxxxx/" */
export const reelPermalinks: string[] = [
  "https://www.instagram.com/reel/DPgSYL4iA5V/",
  "https://www.instagram.com/p/Dcs803GNP4e/",
  "https://www.instagram.com/p/DcYfdp8BSwS/",
  "https://www.instagram.com/p/DcGd72ahJHo/",
];

/** placeholder review quotes, logged in DEMO-NOTES.md for replacement */
export const reviews = [
  {
    quote:
      "Bought an iPhone 12 here. Battery health was exactly what he said. Warranty card, bill, everything.",
    name: "Rohit S.",
    context: "Bought a used iPhone",
  },
  {
    quote:
      "Went in for a new Samsung. Got a fair price and EMI setup done in ten minutes. Solid guys.",
    name: "Priya K.",
    context: "Bought a new phone",
  },
  {
    quote:
      "Been following the reels for two years. Finally visited. Shop is exactly like the account: no drama, no upsell.",
    name: "Aman T.",
    context: "First visit",
  },
];

export const faq = [
  {
    q: "Why aren't prices listed on the site?",
    a: "Used stock turns over daily and rates on new phones move week to week. To avoid quoting you a stale number, every enquiry goes to WhatsApp and you get today's price in a minute.",
  },
  {
    q: "What warranty do I get on a used phone?",
    a: "Every used phone comes with a shop warranty. Duration and coverage are printed on the bill at the counter. Bring the bill and the phone if you ever need service.",
  },
  {
    q: "What do I need for EMI?",
    a: "For most cards, just your PAN and a working debit or credit card. Some no-cost EMI options also work on UPI or select bank cards. Ask on WhatsApp with your bank and we'll confirm.",
  },
  {
    q: "How does exchange work?",
    a: "Bring your old phone. We test it, quote you a fair exchange value, and you pay only the difference on the new or used phone you're picking up.",
  },
  {
    q: "Do you buy phones from customers directly?",
    a: "Yes. Bring the phone, box and bill if you have them. We run the same 20-point check and quote on the spot: cash or transfer, your choice.",
  },
  {
    q: "Do you do repairs?",
    a: "Screen, battery, charging port, board-level: most repairs handled in-house at Ekta Chowk. Message on WhatsApp with the model and problem, we'll confirm timeline and price.",
  },
];

/** Big-number stats for the stat bar */
export const stats = [
  { big: "229K+", small: "followers on Instagram", href: shop.urls.instagram, ext: true },
  { big: "50,000+", small: `phones sold in ${shop.yearsRunning} years` },
  { big: "4.8 ★", small: `${shop.reviewCount} Google reviews`, href: shop.urls.googleReviews, ext: true },
  { big: "7 days", small: `${shop.hoursShort} at Ekta Chowk` },
];

/** ============================================================================
 * ABOUT PAGE
 * The story: local shop → internet fame → bigger local shop.
 * placeholder items are grep-able and logged in DEMO-NOTES.md
 * =========================================================================== */
export const about = {
  hero: {
    eyebrow: `The story · ${shop.brandName}`,
    headlineTop: "From Jabalpur",
    headlineTail: "to your Explore page.",
    sub: "Fourteen years, one owner, and an Instagram page that got a little out of hand.",
  },

  journey: {
    eyebrow: "Ahinsa Chowk to Ekta Chowk to your feed",
    headlineTop: "Six chapters.",
    headlineTail: "One long counter.",
    intro:
      "No round-number anniversaries, no funding rounds. Just the actual arc: a single counter at Ahinsa Chowk, a proper shopfront at Ekta Chowk, then an Instagram page that got a little out of hand.",
    milestones: [
      {
        n: "2012",
        label: "Ahinsa Chowk",
        note: "A single counter opens in Vijay Nagar, near Ahinsa Chowk. Every phone tested by hand: one rule from day one, and it hasn't moved.",
      },
      {
        n: "2019",
        label: "Shift to Ekta Chowk",
        note: "Move to a proper shopfront at Ekta Chowk. Still one counter, same rule.",
      },
      {
        n: "2023",
        label: "The Instagram page",
        note: `${shop.handle} launches. Early reels stitch a phone number into stock clips.`,
      },
      {
        n: "2024",
        label: "Collabs go national",
        note: "Creators start showing up, first around Jabalpur, then from cities across India. Every clip filmed at the same counter, no studio, no script.",
      },
      {
        n: "2025",
        label: "200,000 followers",
        note: 'The account crosses two lakh on Instagram. Walk-ins start with "I saw the reel."',
      },
      {
        n: "2026",
        label: "New front door",
        note: "The website launches. You're reading it now. A wholesale desk opens for other shops. And you can sell us your old phone without walking in. Same counter, wider door.",
      },
    ],
  },

  founder: {
    eyebrow: "The owner",
    name: "Ashish Soni",
    role: `Owner · ${shop.legalNameLatin}`,
    photo: "/images/team/ashish-soni.jpg",
    photoAlt: "Ashish Soni at the counter of Shri Sai Mobile, Ekta Chowk",
    body: [
      "Ashish runs the shop. Started it in 2012 at Ahinsa Chowk with a single counter, one phone number, and one rule: every used phone gets checked, every buyer walks out with a bill.",
      "That rule hasn't moved. The shop is bigger, the audience is a lot bigger, but the counter runs the same way it did on day one.",
    ],
  },

  instagram: {
    eyebrow: "The Instagram chapter",
    headlineTop: "The reels started as a phone number.",
    headlineTail: "Then they took off.",
    body: [
      "The page began as a way to stitch a phone number into a stock clip. It turned into honest reviews, before-and-after cleanups, the odd meme, and collabs with local creators and much bigger names, all filmed at the same counter, no studio, no script.",
      'Followers turned into footfall. People walk in and open with "I saw the reel." The account crossed two lakh in 2025. The shop had already been at Ekta Chowk for six years by then. The audience just caught up.',
    ],
  },

  closing: {
    headlineTop: "That's the shop.",
    headlineTail: "Come say hi.",
    sub: "Message the account you already follow, or walk in at Ekta Chowk. Both work.",
    waMessage: "Hi, just read your About page. Looking for a phone.",
  },
} as const;

/** ============================================================================
 * WARRANTY PAGE
 * Every specific duration / coverage / exclusion / claim-window word is a
 * placeholder token. Do NOT invent shop-warranty terms; they must come from
 * the owner. Tokens are flagged in DEMO-NOTES.md.
 * =========================================================================== */
export const warranty = {
  hero: {
    eyebrow: `Warranty · ${shop.legalNameLatin}`,
    headlineTop: "Bought here.",
    headlineTail: "Covered here.",
    sub: "Every used phone at the shop passes 20 checks before it hits the shelf, and leaves the counter with a shop warranty, the original bill, box and accessories.",
    stickerA: "Warranty on every used phone",
    stickerB: "20-point check · zero exceptions",
  },

  compare: {
    eyebrow: "New vs used · read this first",
    headlineTop: "Two phones.",
    headlineTail: "Two warranties.",
    intro:
      "This trips a lot of buyers up. Brand-new phones carry the manufacturer's own warranty, exactly like buying anywhere else. Used phones carry a warranty from the shop. Same care at the counter, different paperwork behind it.",
    cards: [
      {
        kind: "new" as const,
        icon: "SealCheck",
        eyebrow: "Brand-new phones",
        title: "Manufacturer's warranty",
        who: "Apple · Samsung · Vivo · Oppo · OnePlus · Xiaomi · Realme · Nothing · iQOO · Motorola",
        points: [
          "Standard maker's warranty, registered to your IMEI at purchase.",
          "Service is handled through the maker's authorised centre.",
          "You leave the counter with the sealed box, bill and original accessories.",
        ],
      },
      {
        kind: "used" as const,
        icon: "ShieldCheck",
        eyebrow: "Used phones",
        title: "Shop warranty",
        who: `Serviced in-store at ${shop.address.line1.split(",")[0]}`,
        points: [
          "Every used phone comes with a one-year shop warranty from the date of purchase.",
          "The warranty terms are printed on the bill you get at the counter.",
          "Service happens at the shop. Bring the phone and the bill.",
        ],
      },
    ],
  },

  coverage: {
    eyebrow: "The fine print, in plain words",
    headlineTop: "What's covered.",
    headlineTail: "What isn't.",
    intro:
      "Two lists, side by side. Nothing buried inside a paragraph you have to read twice.",
    covered: {
      title: "Covered",
      items: [
        "Battery: health, drain, and charging retention.",
        "Charging port: recognition, fast-charge behaviour, and stable draw.",
        "Speakers: earpiece and loudspeaker output.",
        "Microphone: call clarity and voice recording.",
        "Physical buttons: power, volume, and mute switch.",
        "Vibration and haptic motor.",
      ],
    },
    notCovered: {
      title: "Not covered",
      items: [
        "Jailbroken or rooted devices.",
        "Physical damage and liquid or water damage.",
        "Phones that no longer power on due to owner-caused damage.",
        "Cracked, broken or non-functional displays.",
      ],
    },
    note:
      "Terms as printed on the bill at purchase. Bring the bill on any warranty visit.",
  },

  /** Icons per check come from `qualityChecks[i].icon` so the two lists
   * never drift out of sync. */
  checks: {
    eyebrow: "The 20 checks, in full",
    headlineTop: "Twenty checks.",
    headlineTail: "One by one.",
    intro:
      "The homepage shows a summary. This is the whole list: every station a used phone passes through before it earns a warranty and a spot on the shelf.",
  },

  takeHome: {
    eyebrow: "What you take home",
    headlineTop: "Bill. Box.",
    headlineTail: "Original accessories.",
    intro:
      "Three things every buyer walks out with, on used phones and new phones alike.",
    cards: [
      {
        icon: "Receipt",
        title: "The bill",
        body: "Printed at the counter. The warranty terms are on the same page. Keep it; you'll need it for any service later.",
        image: "/images/warranty/handover-bill.webp",
        alt: "Bill being handed across the counter at Shri Sai Mobile",
      },
      {
        icon: "Package",
        title: "The original box",
        body: "Sealed box on new phones. On used phones, the original retail box wherever it came in, never a generic replacement.",
        image: "/images/warranty/handover-box.webp",
        alt: "Original phone box on the counter at Shri Sai Mobile",
      },
      {
        icon: "PlugCharging",
        title: "Original accessories",
        body: "Whatever came with the phone from the maker (charger, cable, SIM tool, pin), packed in, checked, handed over.",
        image: "/images/warranty/handover-accessories.webp",
        alt: "Original phone accessories laid out at Shri Sai Mobile",
      },
    ],
  },

  claim: {
    eyebrow: "How to claim",
    headlineTop: "Something wrong?",
    headlineTail: "Walk in. Bring the bill.",
    intro:
      "Warranty service happens at the shop, at the same counter that ran the 20 checks. Not by courier.",
    steps: [
      {
        n: "01",
        icon: "WhatsappLogo",
        title: "Ping us first",
        body: "Send a message on WhatsApp with the model and what's happening. Saves you a trip if it's something we can talk you through.",
      },
      {
        n: "02",
        icon: "Storefront",
        title: "Bring the phone and the bill",
        body: `Walk in at ${shop.address.line1.split(",")[0]}. Bring the phone, the original bill, and any accessories tied to the issue.`,
      },
      {
        n: "03",
        icon: "Scan",
        title: "In-store diagnosis",
        body: "Diagnosis at the counter, in front of you. The 20-check bench is the same bench that services warranty claims.",
      },
      {
        n: "04",
        icon: "Handshake",
        title: "Resolution at the counter",
        body: "Resolution per the terms on your bill: a 7-day turnaround applies. If it needs longer, we tell you upfront.",
      },
    ],
    hours: shop.hours,
    days: shop.daysOpen,
    waMessage: "Hi, I bought a phone at the shop and need warranty help.",
  },

  faq: [
    {
      q: "What is the warranty period on a used phone?",
      a: "One year from the date of purchase. The terms are printed on the bill you get at the counter.",
    },
    {
      q: "What voids the warranty?",
      a: "Jailbroken or rooted devices, physical or water damage, phones that no longer power on due to owner-caused damage, and cracked or non-functional displays. The full list is printed on your bill; ask us at the counter if anything's unclear before you buy.",
    },
    {
      q: "How does warranty work on an EMI purchase?",
      a: "Warranty is the same whether you pay upfront, on card, or on EMI. [EMI WARRANTY NOTE] applies for the EMI paperwork itself.",
    },
  ],

  closing: {
    headlineTop: "Still have questions?",
    headlineTail: "Ask before you buy.",
    sub: "Message the account you already follow, or walk in at Ekta Chowk. The answer is the same in both places.",
    waMessage: "Hi, I have a question about the warranty on a phone at the shop.",
  },
} as const;

/** ============================================================================
 * CONTACT PAGE
 * WhatsApp-first. Big tappable cards, one map, one visit block, no form.
 * Address / phone / hours / handle are pulled from `shop`; do not duplicate.
 * =========================================================================== */
export const contact = {
  hero: {
    eyebrow: `Contact · ${shop.legalNameLatin}`,
    headlineTop: "Come say hi.",
    headlineTail: "We're at Ekta Chowk.",
    sub: "The fastest way to reach us is WhatsApp; that's where we already talk to most of Jabalpur. Prefer the phone, email or a walk-in? All four work.",
  },

  methods: {
    eyebrow: "Reach us",
    headlineTop: "Five ways in.",
    headlineTail: "WhatsApp is fastest.",
    intro:
      "Every one of these is a real link. Tap any card. WhatsApp is the primary channel for stock, EMI, exchange and repair enquiries.",
    waMessage: "Hi, saw the contact page. Wanted to ask about a phone.",
  },

  map: {
    eyebrow: "The pin",
    headlineTop: "Ekta Chowk,",
    headlineTail: "MR4, Jabalpur.",
    intro:
      "Look for the yellow shopfront on the MR4 side of Ekta Chowk. If you're at the roundabout, you're thirty seconds away.",
  },

  closing: {
    headlineTop: "See you at the counter.",
    headlineTail: "Or on WhatsApp.",
    sub: "Open all seven days, 11 AM to 10 PM. No off-days, no appointment needed.",
    waMessage: "Hi, planning to drop by the shop. Any specific phone I should ask for?",
  },
} as const;

/** ============================================================================
 * EMI PAGE
 * The one page that covers instalments: new phones AND used phones.
 * Two facts are hard-confirmed: EMI runs through a finance partner, and every
 * plan needs a minimum 10% down payment. Everything else (tenure, interest,
 * eligible phones, approval time, exact eligibility rules, extra docs, the
 * partner's name) is a placeholder token; see DEMO-NOTES.md.
 * =========================================================================== */
export const emi = {
  hero: {
    eyebrow: `EMI · ${shop.legalNameLatin}`,
    headlineTop: "Take it home today.",
    headlineTail: "Pay it off in easy steps.",
    sub: "EMI on brand-new phones, and (this is the unusual bit) EMI on second-hand phones too. Same shop, same counter, same paperwork on the spot.",
    stickerA: "New phones · Used phones",
    stickerB: "Min. 10% down payment",
    downPct: "10%",
    downPctLabel: "Minimum down payment",
    waMessage: "Hi, wanted to ask about EMI on a phone at the shop.",
  },

  howItWorks: {
    eyebrow: "How EMI works at the counter",
    headlineTop: "Four steps.",
    headlineTail: "One visit to Ekta Chowk.",
    intro:
      "The flow is the same for a brand-new phone and for a used one. No back-and-forth over days, no paperwork sent home.",
    steps: [
      {
        n: "01",
        icon: "DeviceMobile",
        title: "Pick your phone",
        body: "Walk in or WhatsApp us the model you want, new or used. We confirm today's price and which EMI plans apply to it.",
      },
      {
        n: "02",
        icon: "Percent",
        title: "Pay 10% down",
        body: "A minimum 10% down payment locks the phone in. Pay by card, UPI or cash, whatever's easiest at the counter.",
      },
      {
        n: "03",
        icon: "ShieldCheck",
        title: "Complete EMI setup",
        body: "Quick digital verification with our finance partner, done at the counter. ~15 minutes typical.",
      },
      {
        n: "04",
        icon: "Handshake",
        title: "Walk out with the phone",
        body: "Warranty, bill, box and original accessories: same as any purchase at the shop. Nothing about EMI changes what you take home.",
      },
    ],
  },

  downPayment: {
    eyebrow: "The one number that matters upfront",
    headlineTop: "10% down.",
    headlineTail: "The rest, on EMI.",
    intro:
      "Ten percent of the price is all that's due at the counter. Everything else moves to instalments, set up the same day, at the same counter.",
    points: [
      "Minimum 10% down payment on every EMI purchase.",
      "Applies to both brand-new and second-hand phones.",
      "Pay the down payment by card, UPI or cash.",
      "The exact instalment plan is quoted at the counter; it depends on the phone you pick.",
    ],
    photo: "/images/emi-counter.jpg",
    photoAlt:
      "The EMI counter at Shri Sai Mobile, Ekta Chowk",
  },

  compare: {
    eyebrow: "Two kinds of phones · one EMI counter",
    headlineTop: "New or used.",
    headlineTail: "EMI works on both.",
    intro:
      "Most shops in Jabalpur will only put you on EMI for a brand-new phone. We do EMI on our second-hand stock too; every used phone already carries the shop's one-year warranty, so an instalment plan on top of that is a natural fit.",
    cards: [
      {
        kind: "new" as const,
        icon: "SealCheck",
        eyebrow: "Brand-new phones",
        title: "EMI on any brand we sell",
        who: "Apple · Samsung · Vivo · Oppo · OnePlus · Xiaomi · Realme · Nothing · iQOO · Motorola",
        points: [
          "10% down. Rest on EMI.",
          "Manufacturer's warranty, sealed box, original accessories.",
          "Tenures up to 24 months. Exact plan and charges quoted at the counter.",
        ],
      },
      {
        kind: "used" as const,
        icon: "ShieldCheck",
        eyebrow: "Second-hand phones",
        title: "EMI on our used stock",
        who: "Every used phone: 20-point check + 1-year shop warranty",
        points: [
          "10% down. Rest on EMI.",
          "Shop warranty, original bill, original box and accessories at handover.",
          "Tenures up to 24 months, subject to the phone and finance partner check.",
        ],
      },
    ],
  },

  documents: {
    eyebrow: "What to bring",
    headlineTop: "A few documents.",
    headlineTail: "That's the whole list.",
    intro:
      "EMI runs through a finance partner, so the paperwork is standard KYC. Bring the items below; anything extra a plan needs gets flagged at the counter before you sign.",
    items: [
      {
        icon: "IdentificationCard",
        title: "Aadhaar card",
        body: "For KYC verification with the finance partner.",
      },
      {
        icon: "CreditCard",
        title: "PAN card",
        body: "Required by the finance partner for every EMI account.",
      },
      {
        icon: "Bank",
        title: "Bank account number",
        body: "The account for the EMI auto-debit. Passbook, cancelled cheque or a bank-app screenshot works.",
      },
      {
        icon: "Phone",
        title: "Working phone number",
        body: "For OTP verification during setup, ideally the number linked to your Aadhaar or bank.",
      },
      {
        icon: "ShieldCheck",
        title: "Digital verification",
        body: "Done on the spot with our finance partner. ~15 minutes end to end.",
      },
    ],
  },

  eligibility: {
    eyebrow: "Who qualifies",
    headlineTop: "The short version.",
    headlineTail: "Bring your ID · we'll check.",
    intro:
      "Eligibility is set by the finance partner, not the shop. Below is what generally applies; the exact rule for your case is checked live at the counter.",
    points: [
      "Eligibility is checked live through our finance partner's system at the counter.",
      "Most phones we stock qualify; we'll confirm for your specific model on the spot.",
      "Approval decision in ~15 minutes. No paperwork to take home and return.",
      "If a plan doesn't go through: no obligation, no pressure. Pay upfront, exchange, or come back another day.",
    ],
  },

  faq: [
    {
      q: "What tenures are offered?",
      a: "Tenures up to 24 months. The exact set of instalment lengths depends on the phone and the finance partner. We'll show you every plan that applies to your phone at the counter before you decide.",
    },
    {
      q: "What happens if I miss a payment?",
      a: "The finance partner handles collections and late fees per their own terms; those are printed on the plan you sign. If something is going wrong on your end, message us on WhatsApp early; we can help you talk to the partner and, in most cases, sort out a workable path.",
    },
    {
      q: "Is EMI on a used phone the same as EMI on a new one?",
      a: "Same 10% down payment rule. Same finance-partner process at the counter. Tenures up to 24 months on both, though charges and the exact plan can differ because the phone value differs; confirmed for your specific phone at the counter.",
    },
    {
      q: "What documents do I need?",
      a: "Aadhaar, PAN, your bank account number and a working phone number. Digital verification runs at the counter with the finance partner.",
    },
    {
      q: "How long does approval take?",
      a: "~15 minutes. Decisions are live at the counter through the finance partner's system. If it doesn't go through, no obligation.",
    },
    {
      q: "Do I still get warranty on an EMI phone?",
      a: "Yes, exactly the same warranty as any other purchase. New phones: maker's warranty. Used phones: one-year shop warranty. EMI doesn't change any of that.",
    },
  ],

  closing: {
    eyebrow: "Check your EMI",
    headlineTop: "Message us the model.",
    headlineTail: "We'll quote the EMI.",
    sub: "Fastest way to know what you'll pay: WhatsApp the phone you're looking at. We reply with the down payment, the tenure options and any charges, all before you walk in.",
    waMessage:
      "Hi, wanted to check EMI options on a phone at the shop. Model: ",
    photo: "/images/warranty/handover-bill.webp",
    photoAlt: "A phone and bill being handed over at Shri Sai Mobile",
  },
} as const;

/** ============================================================================
 * FAQ PAGE (/faq)
 * Every category shares the site's design system (paper/ink/yellow, brick cards,
 * poster headline pattern). Answers are grouped so the page is scannable, not
 * one long list. Questions with bracketed [TOKENS] are unfilled; the FAQPage
 * JSON-LD emits only the token-free entries.
 * Tokens logged in DEMO-NOTES.md against the owner conversations that resolve them.
 * =========================================================================== */
export const faqPage = {
  hero: {
    eyebrow: `FAQ · ${shop.legalNameLatin}`,
    headlineTop: "The questions we get",
    headlineTail: "every day at the counter.",
    sub: "Warranty, EMI, exchange, repairs, timings, grouped so you can scroll to your question and skip the rest. Anything not here? Message us on WhatsApp and you'll have an answer in a minute.",
    stickerA: "7 categories · straight answers",
    stickerB: "WhatsApp is fastest",
  },

  categories: [
    {
      id: "used-phones",
      eyebrow: "Second-hand phones",
      title: "Buying a used phone",
      intro:
        "Every used phone leaves the counter with a shop warranty, the original bill, box and accessories, and only after passing the 20-point check.",
      icon: "ShieldCheck",
      items: [
        {
          q: "Are your used phones reliable?",
          a: "Every used phone we sell has passed the shop's 20-point check before it hits the shelf: battery health, display, touch, charging port, speakers, microphone, cameras, IMEI verification, network bands, Wi-Fi, Bluetooth, sensors, buttons, biometrics, body condition, water-damage indicator, original-parts check, factory reset, and a 30-minute stress test. And every used phone leaves the counter with a one-year shop warranty, the original bill, box and accessories.",
        },
        {
          q: "What are the 20 checks you run on each used phone?",
          a: "The list runs from battery health and display through touch, charging port, speakers, microphone, front and rear cameras, IMEI verification, network bands, Wi-Fi, Bluetooth, sensors, physical buttons, biometrics, body condition, water-damage indicator, original-parts check, factory reset with OS integrity, and a 30-minute stress test. All 20 are documented in full on the Warranty page.",
        },
        {
          q: "Do I get a bill and the original box?",
          a: "Yes. Every used phone is handed over with the original retail box wherever it came in (never a generic replacement), all original accessories that shipped with the phone, and a printed bill. The warranty terms are printed on the same bill.",
        },
        {
          q: "Is there a warranty on used phones?",
          a: "Yes. Every used phone carries a one-year shop warranty from the date of purchase. Warranty service happens at the shop; bring the phone and the original bill. Full terms are on the Warranty page.",
        },
        {
          q: "What voids the warranty on a used phone?",
          a: "Jailbroken or rooted devices, physical or water damage, phones that no longer power on due to owner-caused damage, and cracked or non-functional displays. The full list is printed on your bill; ask at the counter if anything's unclear before you buy.",
        },
      ],
    },

    {
      id: "new-phones",
      eyebrow: "Brand-new phones",
      title: "Buying new",
      intro:
        "Sealed boxes, the maker's warranty registered to your IMEI, and the current line-up from every major brand.",
      icon: "SealCheck",
      items: [
        {
          q: "Do you stock the latest models?",
          a: "Yes. We carry the current line-up from Apple, Samsung, Vivo, Oppo, OnePlus, Xiaomi, Realme, Nothing, iQOO and Motorola. Message us on WhatsApp with the model you want and we'll confirm availability and today's price.",
        },
        {
          q: "Are the new phones sealed and official?",
          a: "Yes. New phones are handed over in the manufacturer's sealed box with the original accessories and the maker's warranty registered to the phone's IMEI at purchase, exactly like buying anywhere else.",
        },
        {
          q: "Do new phones come with a manufacturer warranty?",
          a: "Yes. Every brand-new phone carries the manufacturer's own warranty, serviced through the maker's authorised centre. Bring the bill to the counter if you need help routing a claim.",
        },
      ],
    },

    {
      id: "prices",
      eyebrow: "Prices and quotes",
      title: "Prices",
      intro:
        "Stock and rates move too fast to list. Every price you see is today's price, quoted for your specific phone.",
      icon: "Tag",
      items: [
        {
          q: "Why aren't prices listed on the site?",
          a: "Used stock turns over daily and rates on new phones move week to week. Rather than quote you a stale number, every enquiry goes to WhatsApp and you get today's price for the specific phone in a minute or two.",
        },
        {
          q: "How do I get a quote for a specific phone?",
          a: `Message us on WhatsApp at ${shop.phoneDisplay} with the brand, model and storage. If it's a used phone you're after, add the condition and (if you want) the year. We reply with today's price and, if you ask, the EMI plan.`,
        },
      ],
    },

    {
      id: "emi",
      eyebrow: "EMI",
      title: "EMI and payments",
      intro:
        "EMI on brand-new phones and (the unusual bit) on second-hand phones too. 10% down. The rest, on instalments.",
      icon: "Percent",
      items: [
        {
          q: "Is EMI available on used phones too?",
          a: "Yes. Most shops in Jabalpur will only put you on EMI for a brand-new phone; we do EMI on our second-hand stock as well. Same 10% down-payment rule, same finance-partner setup at the counter. Full terms are on the EMI page.",
        },
        {
          q: "What's the minimum down payment?",
          a: "10% of the phone's price. That applies to both brand-new and second-hand phones. The rest goes on instalments, set up at the counter through our finance partner.",
        },
        {
          q: "What tenures are offered?",
          a: "Tenures up to 24 months. The exact set of instalment lengths depends on the phone and the finance partner. We'll show you every plan that applies at the counter before you decide.",
        },
        {
          q: "What documents do I need for EMI?",
          a: "Aadhaar, PAN, your bank account number for auto-debit, and a working phone number for OTP. Digital verification runs at the counter with the finance partner.",
        },
        {
          q: "How long does EMI approval take?",
          a: "~15 minutes. Decisions are live at the counter through the finance partner's system. If it doesn't go through, no obligation.",
        },
      ],
    },

    {
      id: "exchange-buyback",
      eyebrow: "Exchange & buy-back",
      title: "Exchange and buy-back",
      intro:
        "Trade your old phone against a new or used one, or sell it outright: both handled at the same counter.",
      icon: "Handshake",
      items: [
        {
          q: "Can I exchange my old phone for a new or used one?",
          a: "Yes. Bring your old phone to the counter, we test it, quote you a fair exchange value, and you pay only the difference on the phone you're picking up. Bring the box and bill if you have them.",
        },
        {
          q: "How is the exchange value decided?",
          a: "We run a quick check on your phone at the counter and factor in its condition and the current market rate. The quote is given on the spot before anything is decided.",
        },
        {
          q: "Do you buy phones outright, without me buying another?",
          a: "Yes. Bring the phone (and the box and bill if you have them) and we quote on the spot after running the 20-point check. Payment by cash or bank transfer, your choice.",
        },
        {
          q: "What are the buy-back terms?",
          a: "The payout depends on the model, storage, condition and the current market rate. Bring the phone in and we'll quote on the spot, or send us a WhatsApp for a rough range before you come in.",
        },
      ],
    },

    {
      id: "repairs-accessories",
      eyebrow: "Repairs & accessories",
      title: "Repairs and accessories",
      intro:
        "Screen, battery, board-level repairs done in-house, plus cases, chargers, cables and tempered glass at the counter.",
      icon: "Wrench",
      items: [
        {
          q: "Do you repair phones?",
          a: "Yes. Screen, battery, charging port and board-level repairs are handled in-house at Ekta Chowk. Message us on WhatsApp with the model and the problem; we'll confirm the timeline and price before you come in.",
        },
        {
          q: "Do you sell accessories?",
          a: "Yes. Cases, chargers, cables and tempered glass are stocked at the counter. Ask on WhatsApp if you're after something specific and we'll check.",
        },
      ],
    },

    {
      id: "visiting",
      eyebrow: "Visiting the shop",
      title: "Visiting the shop",
      intro:
        "One counter at Ekta Chowk, open every day of the week, from 11 in the morning to 10 at night.",
      icon: "Storefront",
      items: [
        {
          q: "Where are you?",
          a: `${shop.address.line1}, ${shop.address.line2}. Look for the shopfront on the MR4 side of Ekta Chowk. Directions link is on the Contact page.`,
        },
        {
          q: "What are your timings?",
          a: `${shop.hours}. Same hours every day of the week.`,
        },
        {
          q: "Are you open on Sundays?",
          a: "Yes. We're open all seven days. No weekly off. Same hours Monday through Sunday.",
        },
        {
          q: "Do you deliver, or is it counter-only?",
          a: "Counter-only. All purchases, exchanges and buy-backs happen at the shop at Ekta Chowk. Come in or WhatsApp us before you visit.",
        },
      ],
    },
  ],

  closing: {
    eyebrow: "Not on this list?",
    headlineTop: "Still have a question?",
    headlineTail: "Message us on WhatsApp.",
    sub: "Message the number Jabalpur already messages. Same counter answers, in a minute or two.",
    waMessage: "Hi, I had a question that wasn't on the FAQ page. Can you help?",
  },
} as const;

/** ============================================================================
 * PRIVACY POLICY
 * A legal document, not a marketing page. The `/privacy` page renders this
 * content as plain reading text with numbered sections, a table of contents,
 * and no poster styling; deliberately different from the rest of the site.
 *
 * All specific commitments that need legal input (retention windows, the
 * grievance officer's name, the effective date) are placeholder tokens. Do NOT
 * invent them; see DEMO-NOTES.md.
 *
 * IMPORTANT: The copy assumes Google Analytics 4 and the Meta (Facebook) Pixel
 * will be added. Neither is wired in `app/layout.tsx` today. When they are
 * added, a consent mechanism is required; see DEMO-NOTES.md.
 * =========================================================================== */
export const privacy = {
  title: "Privacy Policy",
  effectiveDate: "10 September 2026",
  applicableTo: `${shop.legalNameLatin} · ${shop.address.line1}, ${shop.address.line2}`,
  intro:
    "This Privacy Policy explains what personal data this website collects, why we collect it, who it is shared with, how long it is kept, and the rights you have over it under India's Digital Personal Data Protection Act, 2023 (DPDPA). It is written in plain language on purpose: the shop wants the terms to be readable, not obscured. If anything on this page is unclear, email us at the address in Section 8.",

  toc: [
    { n: "1", id: "collect", title: "What we collect" },
    { n: "2", id: "no", title: "What we do not do" },
    { n: "3", id: "processors", title: "Third parties and processors" },
    { n: "4", id: "retention", title: "Retention and security" },
    { n: "5", id: "cookies", title: "Cookies and tracking" },
    { n: "6", id: "rights", title: "Your rights under DPDPA 2023" },
    { n: "7", id: "grievance", title: "Grievance Officer" },
    { n: "8", id: "contact", title: "Contact and changes" },
  ],

  collect: {
    n: "1",
    id: "collect",
    title: "What we collect",
    intro:
      "There are five ways personal data reaches us. Each subsection below states exactly what is collected in that channel, and nothing that is not.",
    sources: [
      {
        title: "WhatsApp messages",
        body: "When you tap a WhatsApp button on this site, the chat takes place inside WhatsApp. We receive whatever you send us there: your mobile number, your messages, and any photos or files you choose to share. WhatsApp's own privacy terms cover the message platform itself; this policy covers only what we do with those messages once they reach the shop.",
      },
      {
        title: "Sell-your-phone form (/sell-your-phone)",
        body: "If you submit the sell-your-phone form we receive: your name, your 10-digit Indian mobile number, and the phone details you enter (brand, model, storage, colour, year of purchase, condition). We also record the timestamp of your submission.",
      },
      {
        title: "Wholesale enquiry form (/wholesale)",
        body: "If you submit the wholesale enquiry form we receive: contact name, business or shop name, mobile number, city, category (new / used / both), preferred brands, quantity per order, order frequency, any additional details you type in, and the timestamp of your submission.",
      },
      {
        title: "Website analytics",
        body: "The site loads Google Analytics 4 and the Meta (Facebook) Pixel. These tools set cookies on your device and log data such as the pages you visit, your approximate location derived from your IP address, your device and browser type, referrer information, and whether you arrived from an advertisement. See Section 5 (Cookies and tracking) for the specific cookies used and how to opt out.",
      },
      {
        title: "Server access logs",
        body: "Our hosting provider automatically records standard server access logs: IP address, browser user-agent, the URL requested, and the time of the request. These logs exist so that the site can be operated, secured, and debugged; they are the same technical logs any website keeps.",
      },
    ],
  },

  no: {
    n: "2",
    id: "no",
    title: "What we do not do",
    intro:
      "The following commitments are absolute. If any one of them changes, this page is updated on the same day.",
    items: [
      "We do not sell your personal data to any party, for any purpose.",
      "We do not run auto-dial telemarketing or bulk-SMS marketing lists using the data you submit through this website.",
      "We do not use the mobile number you provide for any purpose other than replying to the enquiry you sent.",
      "We do not share the contents of your form submissions with brands, distributors, or any third party other than the processors listed in Section 3.",
      "We do not ask for your Aadhaar, PAN, bank details, or any government-issued ID anywhere on this website. Those documents are collected only at the shop's physical counter for EMI purchases, and even then are shared directly with the finance partner, not stored by the shop.",
    ],
  },

  processors: {
    n: "3",
    id: "processors",
    title: "Third parties and processors",
    intro:
      "The following external service providers process data on our behalf. Each one is named below with a description of what it sees and why. Opt-out routes for the tracking-related processors are in Section 5.",
    items: [
      {
        title: "Website hosting",
        body: "Vercel (vercel.com) hosts this website and processes the server access logs described in Section 1. Data is stored in Vercel's regional infrastructure per their own terms.",
      },
      {
        title: "Resend: transactional email delivery",
        body: "When you submit a form, Resend (resend.com) delivers the notification email to our lead inbox. Resend sees the field contents in transit to route the email, and does not use that data for its own marketing purposes.",
      },
      {
        title: "Google: Google Analytics 4",
        body: "Google processes the analytics events described in Section 1 per Google's own privacy terms. See Section 5 for cookies and opt-out.",
      },
      {
        title: "Meta Platforms: Facebook Pixel",
        body: "Meta processes the advertising-measurement events described in Section 1 per Meta's own privacy terms. See Section 5 for cookies and opt-out.",
      },
    ],
  },

  retention: {
    n: "4",
    id: "retention",
    title: "Retention and security",
    intro:
      "Personal data is retained only for as long as it is needed for the purpose for which it was collected. If you wish to have your data deleted sooner, contact us using Section 8 and reference your right to erasure in Section 6.",
    retentionSubtitle: "How long we keep data",
    retentionItems: [
      "Sell-your-phone form submissions: deleted 30 days after the enquiry is closed.",
      "Wholesale enquiry submissions: deleted 90 days after our last correspondence with you.",
      "WhatsApp chat history: retained subject to WhatsApp's own retention behaviour and any copies kept on the shop's devices for reference.",
      "Website analytics data: 2 months as configured in Google Analytics 4, and per Meta's default event-data retention in the Meta Ads Manager.",
      "Server access logs: 30-day rolling window at the hosting provider.",
    ],
    securitySubtitle: "How data is kept secure",
    securityItems: [
      "The website is served over HTTPS end-to-end; traffic between your device and our servers is encrypted in transit.",
      "Form submissions are transmitted server-to-server via Resend; no third-party client-side script has access to their contents.",
      "Access to the lead-notification inbox is limited to named individuals at the shop.",
      "The shop does not store personal data on Instagram, does not archive WhatsApp chats beyond what the platform retains and what is saved on the shop's own device, and does not export data to any system outside those disclosed in Section 3.",
    ],
  },

  cookies: {
    n: "5",
    id: "cookies",
    title: "Cookies and tracking",
    intro:
      "The site uses two categories of cookies. You control both: through the consent banner shown on your first visit, and through your browser settings at any time thereafter.",
    items: [
      {
        title: "Strictly necessary cookies",
        body: "A small number of cookies keep the site running (for example, remembering your consent choice on the banner). These cannot be disabled without breaking core functionality.",
      },
      {
        title: "Analytics cookies: Google Analytics 4",
        body: "Cookies set by Google to count sessions, page visits, and referrers. You can decline these from the consent banner on your first visit, block them from your browser's cookie settings, or install Google's own opt-out browser add-on.",
      },
      {
        title: "Advertising cookies: Meta Pixel",
        body: "Cookies set by Meta for advertising measurement and audience building. You can decline these from the consent banner, block them from your browser, or manage them from your Facebook and Instagram ad-preference settings.",
      },
    ],
    consentNote:
      "A cookie-consent banner is shown on your first visit. It offers three equally prominent choices (Accept all, Reject all, or Customise per category), with Analytics and Advertising both off by default. Your choice is stored in this browser only, and can be changed or fully withdrawn at any time from the \"Cookie preferences\" link in the site footer. Until you affirmatively opt in, the analytics and advertising cookies described above are not set on your device.",
  },

  rights: {
    n: "6",
    id: "rights",
    title: "Your rights under DPDPA 2023",
    intro:
      "Under India's Digital Personal Data Protection Act, 2023 you have the following rights in relation to the personal data we hold about you. To exercise any of them, email the address in Section 8. We will acknowledge your request within 7 days.",
    items: [
      {
        title: "Right to access",
        body: "You may request a summary of the personal data we hold about you and the purposes for which it has been used.",
      },
      {
        title: "Right to correction",
        body: "You may request that we correct personal data about you that is inaccurate, incomplete, or misleading.",
      },
      {
        title: "Right to erasure",
        body: "You may request that we delete your personal data. We will comply, except where retention is required by law (for example, invoicing records associated with a completed sale).",
      },
      {
        title: "Right to withdraw consent",
        body: "Where processing is based on your consent, you may withdraw that consent at any time. Withdrawal does not affect the lawfulness of processing carried out before withdrawal.",
      },
      {
        title: "Right to nominate",
        body: "You may nominate another individual to exercise these rights on your behalf in the event that you become incapacitated or deceased.",
      },
      {
        title: "Right to grievance redressal",
        body: "If you are dissatisfied with our response to any of the above, you may contact our Grievance Officer (Section 7). If the matter remains unresolved, you may escalate to the Data Protection Board of India.",
      },
    ],
  },

  grievance: {
    n: "7",
    id: "grievance",
    title: "Grievance Officer",
    body: `The Grievance Officer designated by ${shop.legalNameLatin} for the purposes of the DPDPA 2023 is Ashish Soni. Grievances may be sent by email to ${shop.privacyEmail} with the subject line "Grievance: Privacy". We will acknowledge every grievance within 7 days and provide a substantive response as promptly as reasonably practicable.`,
  },

  contact: {
    n: "8",
    id: "contact",
    title: "Contact and changes",
    body: `Any question about this Privacy Policy, any request to exercise the rights described in Section 6, or any concern about how personal data has been handled should be sent by email to ${shop.privacyEmail}. This inbox is monitored by Mr. Ashish Soni at the shop.`,
    changesTitle: "Changes to this Policy",
    changesBody:
      "This Policy is updated whenever the way we collect or handle personal data changes in a material way. When we make such a change, we update the Effective Date shown at the top of this page and, for significant changes, mention it the next time we correspond with you.",
  },
} as const;

/** ============================================================================
 * TERMS & CONDITIONS
 * A legal document, not a marketing page. Rendered at /terms with the same
 * plain reading layout as /privacy and /returns.
 *
 * Scope note: this website does NOT run an online checkout. It is a lead-gen
 * front-door for a physical counter: two enquiry forms (/sell-your-phone,
 * /wholesale) plus WhatsApp / phone / email routes. The Terms below govern
 * the *website* and those enquiry channels. The actual sale contract is the
 * printed bill handed over at the counter, with its own warranty and (if
 * applicable) its own EMI paperwork with the finance partner.
 *
 * Placeholder tokens (jurisdiction wording, liability cap, arbitration
 * clause, minimum age) are legal decisions; do NOT invent. See DEMO-NOTES.md.
 * =========================================================================== */
export const terms = {
  title: "Terms & Conditions",
  effectiveDate: "10 September 2026",
  applicableTo: `${shop.legalNameLatin} · ${shop.address.line1}, ${shop.address.line2}`,
  intro:
    "These Terms & Conditions govern your use of this website and the enquiry channels (WhatsApp, phone, email, and the two forms on /sell-your-phone and /wholesale) that the shop makes available through it. They are separate from the sale of a phone at the shop's counter; that sale is governed by the printed bill you receive at handover, together with the Warranty and Returns policies referenced below. Please read these Terms before using the website. If you do not agree with them, please do not use the website or send us an enquiry through it.",

  toc: [
    { n: "1", id: "scope", title: "Scope and what these Terms do not cover" },
    { n: "2", id: "operator", title: "Who runs this website" },
    { n: "3", id: "use", title: "Acceptable use" },
    { n: "4", id: "enquiries", title: "Enquiries, quotes, and forms" },
    { n: "5", id: "off-site", title: "Off-site links and third-party platforms" },
    { n: "6", id: "ip", title: "Intellectual property" },
    { n: "7", id: "availability", title: "Website availability and no warranty on the site" },
    { n: "8", id: "liability", title: "Limitation of liability" },
    { n: "9", id: "law", title: "Governing law and jurisdiction" },
    { n: "10", id: "changes", title: "Changes to these Terms" },
    { n: "11", id: "contact", title: "How to contact us about these Terms" },
  ],

  scope: {
    n: "1",
    id: "scope",
    title: "Scope and what these Terms do not cover",
    intro:
      "These Terms cover only your use of this website and the enquiry channels reached through it. They do not replace the paperwork that governs any actual purchase at the shop.",
    covers: {
      subtitle: "What these Terms cover",
      items: [
        "Your general use of the website, including browsing any of the informational pages.",
        "Any enquiry you send us through the /sell-your-phone or /wholesale forms.",
        "Any conversation you start with the shop over the WhatsApp, phone or email links published on this website.",
      ],
    },
    doesNotCover: {
      subtitle: "What these Terms do not cover",
      items: [
        "The sale of any phone or accessory at the shop's physical counter. That sale is governed by the printed bill handed over at the counter, which sets out the sale price, warranty terms, and any EMI paperwork.",
        "The shop warranty on used phones and the manufacturer's warranty on new phones. Both are set out on the Warranty page and, in the case of the shop warranty, on the bill.",
        "Returns after handover. The shop's rule is set out on the Returns page.",
        "The processing of your personal data. That is set out separately in the Privacy Policy.",
        "The terms of any EMI plan. Those are set by the finance partner and printed on the plan document you sign at the counter.",
      ],
    },
  },

  operator: {
    n: "2",
    id: "operator",
    title: "Who runs this website",
    body: `This website is operated by ${shop.legalNameLatin} (${shop.legalName}), a phone retailer trading under the name "${shop.brandName}", from a single-counter shop at ${shop.address.line1}, ${shop.address.line2}. References to "we", "us", "our", or "the shop" in these Terms mean ${shop.legalNameLatin}. References to "you" and "your" mean the person using the website.`,
    contactSubtitle: "How to reach us",
    contact: [
      `Address · ${shop.address.line1}, ${shop.address.line2}`,
      `Hours · ${shop.hours}, ${shop.daysOpen}`,
      `WhatsApp / Phone · ${shop.phoneDisplay}`,
      `General email · ${shop.email}`,
      `Privacy email · ${shop.privacyEmail}`,
    ],
  },

  use: {
    n: "3",
    id: "use",
    title: "Acceptable use",
    intro:
      "This is a low-traffic informational website for a physical shop. The rules below are the standard ones, nothing exotic. By using the website you agree that you will not:",
    items: [
      "Use the website, the enquiry forms, or the WhatsApp / phone / email routes for anything unlawful, fraudulent, or intended to harm any person.",
      "Attempt to disrupt or overload the website, its hosting infrastructure, or the shop's communication channels, for example by sending automated form submissions, running denial-of-service attempts, or brute-forcing endpoints.",
      "Attempt to gain unauthorised access to any part of the website, any account, any database, or any server on which the website depends.",
      "Reverse-engineer, decompile, or otherwise attempt to derive the source code of the website beyond what is intentionally served to your browser.",
      "Scrape, copy, or systematically extract the content of the website (including the shop's product photography, brand assets, or written copy) for the purpose of republishing it elsewhere, training a machine-learning model, or building a derivative product, without our prior written permission.",
      "Impersonate any person or entity when contacting the shop through the enquiry routes on the website.",
      "Submit enquiries containing another person's personal data (for example, a phone number that is not yours) without that person's consent.",
      "Upload or transmit any material through the enquiry routes that contains a virus, worm, or other malicious code.",
    ],
    outro:
      "We may, without notice, restrict access to any user who materially breaches the rules above, and reserve the right to notify law enforcement where the conduct warrants it.",
  },

  enquiries: {
    n: "4",
    id: "enquiries",
    title: "Enquiries, quotes, and forms",
    intro:
      "The website exists to let you start a conversation with the shop, nothing more. There is no online checkout on this website. The rules below make clear how enquiries and quotes work.",
    items: [
      "Nothing on this website constitutes a binding offer to sell a phone or any other product. Product photos, model names, and any indicative descriptions are informational only.",
      "Any price quoted to you over WhatsApp, phone, or email is an indicative quote for the specific phone we have described and is valid only for as long as we say. Prices at the shop change with market conditions and stock availability, and a quote given on one day may not hold on another.",
      "A sale is concluded only at the shop's counter, when the phone is handed over to you and the bill is signed. Everything before that point (including any WhatsApp exchange, phone call, email, or form submission) is a pre-sale conversation.",
      "You are responsible for the accuracy of any information you submit through the enquiry forms, including your name, mobile number, the phone brand, model, storage, colour, condition, and (in the case of wholesale enquiries) business details.",
      "By submitting the /sell-your-phone form you confirm that you are the lawful owner of the phone you are describing, that it is not stolen, subject to a lien, or otherwise legally encumbered, and that you are legally entitled to sell it.",
      "By submitting the /wholesale form you confirm that you are enquiring on behalf of a bona fide phone-retail or repair business, that the details of that business are accurate, and that you are authorised to send the enquiry on its behalf.",
      "We may decline to respond to any enquiry, quote any phone, or accept any prospective sale, in our sole discretion and without giving reasons.",
      "Where you send us an enquiry, we handle your personal data in accordance with the Privacy Policy.",
    ],
  },

  offSite: {
    n: "5",
    id: "off-site",
    title: "Off-site links and third-party platforms",
    intro:
      "The website links out to several third-party platforms that the shop uses to run its day-to-day business. Those platforms are outside the shop's control and have their own terms.",
    items: [
      "WhatsApp: every WhatsApp button on the website opens a chat inside WhatsApp. That chat is governed by WhatsApp's own terms of service and privacy policy.",
      "Instagram: the shop's Instagram account is embedded on the home page. Instagram content, comments, and any interaction on that platform is governed by Instagram's own terms.",
      "Google Maps: the shop's location is embedded and linked via Google Maps. Google's terms apply to your use of that map.",
      "Google reviews: the shop's aggregate rating and review count are published by Google and reflect what has been posted there by third parties.",
      "Third-party fonts and CDN assets: the website loads fonts and, where applicable, other assets from third-party CDNs. Those services have their own terms.",
    ],
    outro:
      "The shop is not responsible for the content, availability, privacy practices, or terms of any third-party platform linked from this website. Links are provided for your convenience.",
  },

  ip: {
    n: "6",
    id: "ip",
    title: "Intellectual property",
    intro:
      "The website's content is either owned by the shop or used with permission. The rules below set out what you can and cannot do with it.",
    items: [
      `The word marks "${shop.brandName}", "${shop.legalNameLatin}", the Devanagari wordmark ${shop.legalName}, the shop's Instagram handle ${shop.handle}, and the yellow-and-ink visual identity you see on this website are trade marks and brand assets of the shop. You may not use them to imply an association with the shop that does not exist, or in a way that could confuse the public.`,
      "The photographs, videos, illustrations, and written copy published on this website are either owned by the shop or licensed to us for use on this website. Except where a specific piece of content is expressly marked as reusable, none of it may be reproduced elsewhere (in print, online, or in any AI-training corpus) without our prior written permission.",
      "Manufacturer trade marks (Apple, Samsung, Vivo, Oppo, OnePlus, Xiaomi, Realme, Nothing, iQOO, Motorola, and others) shown on the website belong to their respective owners. They are used on this website only to describe the phones the shop stocks; their appearance here is not a claim of ownership or endorsement.",
      "You may link to any public page on this website from your own website or social account, provided the link does not misrepresent the shop or its offering, and provided your linking page does not itself breach these Terms.",
      "You may quote a short passage of the website's written copy in a review, article, or social-media post, provided the quotation is attributed to the shop and does not misrepresent the meaning of the original.",
    ],
  },

  availability: {
    n: "7",
    id: "availability",
    title: "Website availability and no warranty on the site",
    intro:
      "This section is about the website itself, not about any phone you buy. The warranty on a phone is set out on the Warranty page and on the bill.",
    items: [
      "The website is provided \"as is\" and \"as available\". The shop does not guarantee that the website will be available at any particular time, that it will be error-free, or that the information published on it (including images, model descriptions, and third-party embeds) will be accurate or up to date at the moment you view it.",
      "The shop may, without notice, update, correct, suspend, or withdraw any part of the website, including this Terms page itself. Changes to these Terms are handled per Section 10.",
      "Except to the extent expressly set out on the Warranty page or the bill (which apply to phones bought at the counter), the shop makes no express or implied representation or warranty of any kind about the website or its content. All implied warranties of merchantability, fitness for a particular purpose, and non-infringement in relation to the website are disclaimed to the maximum extent permitted by law.",
    ],
  },

  liability: {
    n: "8",
    id: "liability",
    title: "Limitation of liability",
    intro:
      "The paragraphs below apply to loss suffered because of your use of the website itself. They are separate from any warranty claim on a phone bought at the counter, which is handled under the Warranty page.",
    items: [
      "Nothing in these Terms limits or excludes any liability that cannot lawfully be limited or excluded under Indian law, including liability for fraud, for personal injury caused by negligence, or for any statutory consumer right you have under India's Consumer Protection Act, 2019.",
      "Subject to the paragraph above, the shop is not liable for any indirect, incidental, special, consequential, or punitive loss arising out of or in connection with your use of this website, or with any pre-sale conversation on WhatsApp, phone, or email initiated through it, including any loss of profit, loss of business, loss of anticipated saving, or loss of data.",
      "For any direct loss arising out of or in connection with your use of this website, the shop's total aggregate liability is capped at the amount you have actually paid to the shop in the transaction giving rise to the claim. Where you have not paid the shop anything in connection with the matter (for example, a website-only enquiry that did not lead to a purchase), the cap is nil.",
      "This section applies whether the claim is brought in contract, tort (including negligence), for breach of statutory duty, or otherwise.",
    ],
  },

  law: {
    n: "9",
    id: "law",
    title: "Governing law and jurisdiction",
    body:
      "These Terms and any non-contractual obligations arising out of or in connection with them are governed by, and construed in accordance with, the laws of India.",
    items: [
      "The courts at Jabalpur, Madhya Pradesh, India shall have exclusive jurisdiction over any dispute arising out of or in connection with these Terms.",
      "Before either party commences court proceedings, the parties shall attempt in good faith to resolve the dispute by arbitration for a period of 90 days. The arbitral panel shall consist of three arbitrators: one appointed by you, one appointed by the shop, and the third appointed jointly by the first two. The seat of arbitration is Jabalpur, Madhya Pradesh, India, and the arbitration is governed by the Arbitration and Conciliation Act, 1996. If the dispute is not resolved within 90 days of the panel being constituted, either party may proceed to court under the jurisdiction clause above.",
    ],
  },

  changes: {
    n: "10",
    id: "changes",
    title: "Changes to these Terms",
    body:
      "The shop may update these Terms from time to time — for example, to reflect changes to the website, to the shop's operations, or to applicable law. When we do, we update the Effective Date shown at the top of this page. For material changes we will, where practicable, flag the change the next time we correspond with you (for example, in a WhatsApp reply). Your continued use of the website after a change takes effect is your acceptance of the updated Terms.",
  },

  contact: {
    n: "11",
    id: "contact",
    title: "How to contact us about these Terms",
    body: `Any question about these Terms, and any notice you need to send us under them, should be sent by email to ${shop.email} with the subject line "Terms — Query", or in writing to the shop's address at ${shop.address.line1}, ${shop.address.line2}. For matters specifically about your personal data or the Privacy Policy, use ${shop.privacyEmail} instead.`,
  },
} as const;

/** ============================================================================
 * RETURNS POLICY
 * A legal document, not a marketing page. Rendered at /returns with the same
 * plain reading layout as /privacy.
 *
 * Core rule (owner-confirmed): no returns after the phone has been handed over
 * at the counter. This rule applies to new phones, used phones, EMI purchases,
 * and accessories alike. Any exception (DOA at unboxing, limited exchange
 * window, etc.) would need to be added by the owner — see DEMO-NOTES.md.
 * =========================================================================== */
export const returns = {
  title: "Returns Policy",
  effectiveDate: "10 September 2026",
  applicableTo: `${shop.legalNameLatin} · ${shop.address.line1}, ${shop.address.line2}`,
  intro:
    "This Returns Policy sets out the shop's rule on returns after a purchase — for new phones, second-hand phones, phones bought on EMI, and accessories sold at the counter. The rule is simple: once the phone has been handed to you at the counter, we do not accept returns. What the shop offers in place of a returns process is a full check of the device and paperwork in front of you before you leave the counter, and — after the sale — the separate warranty and finance channels described in Section 4.",

  toc: [
    { n: "1", id: "rule", title: "The rule" },
    { n: "2", id: "why", title: "Why we do not accept returns" },
    { n: "3", id: "check", title: "What we check with you before you leave the counter" },
    { n: "4", id: "after", title: "What remains available after every sale" },
    { n: "5", id: "accessories", title: "Accessories and bundled items" },
    { n: "6", id: "statutory", title: "Your statutory consumer rights" },
    { n: "7", id: "contact", title: "Contact and changes" },
  ],

  rule: {
    n: "1",
    id: "rule",
    title: "The rule",
    body: "Once the phone has been handed to you at the shop counter, the sale is final. We do not accept returns for a refund, an exchange against a different model, or a store credit — regardless of the reason.",
    items: [
      "This rule applies equally to brand-new phones, second-hand phones, and accessories purchased alongside a phone.",
      "This rule applies whether you paid the full amount upfront or bought the phone on an EMI plan.",
      "This rule takes effect from the moment you sign the bill and take physical possession of the device at the counter.",
      "Exchange in the sense of trading in your existing phone for another phone from the shop is a separate service (see the shop's Exchange offering on the home page) and is not affected by this Policy.",
    ],
  },

  why: {
    n: "2",
    id: "why",
    title: "Why we do not accept returns",
    intro:
      "The rule in Section 1 is not arbitrary. Three specific realities of the phone-retail business at Ekta Chowk make it necessary.",
    items: [
      "Phone prices move daily. The price we quote you at the counter is that day's price, calculated for that specific unit. Accepting a return would require us to re-quote and re-list at a later day's price — that arithmetic is not sustainable for a single-counter, independent shop.",
      "Every used phone we sell is a single unit with its own IMEI, condition history, and warranty. Once it leaves the counter it is no longer new stock, and we cannot resell it as a fresh, freshly-checked used piece.",
      "The 20-point check on every used phone is performed in front of you at the counter, precisely so that anything you would otherwise return the phone for is caught and resolved before the sale is closed.",
    ],
  },

  check: {
    n: "3",
    id: "check",
    title: "What we check with you before you leave the counter",
    intro:
      "The counter is where a return would otherwise be. The equivalent of a returns process is done in front of you before the sale is closed, not after. Specifically:",
    items: [
      "On used phones — the full 20-point check, physically in front of you. The check list is on the Warranty page.",
      "On any phone — IMEI confirmed on the device itself, on the box, and on the bill; all three must match.",
      "Original retail box, charger, cable, SIM-eject pin, and any other original accessories are all present and match what is being sold.",
      "On new phones — the manufacturer's seal on the box, the retail packaging, and manufacturer's warranty registration where applicable.",
      "On EMI purchases — the down-payment receipt, the finance-partner's plan document, and the tenure and instalment schedule are shown to you and signed off before handover.",
    ],
    outro:
      "Once you have confirmed each of the above and signed the bill, the sale is closed and Section 1 applies.",
  },

  after: {
    n: "4",
    id: "after",
    title: "What remains available after every sale",
    intro:
      "Not accepting returns is not the same as leaving you unsupported after the sale. Three separate mechanisms remain open for every purchase.",
    subsections: [
      {
        n: "4.1",
        subtitle: "Shop warranty on used phones",
        body: "Every used phone we sell carries a one-year shop warranty from the date of purchase. If a covered fault develops after you leave the counter, you do not need a return — you need a warranty visit. The full warranty terms, what is and is not covered, and how to claim are set out on the Warranty page.",
      },
      {
        n: "4.2",
        subtitle: "Manufacturer's warranty on new phones",
        body: "Every brand-new phone we sell carries the manufacturer's own warranty, registered to the phone's IMEI at the time of purchase. Manufacturer defects and covered service are handled through the maker's authorised service centre, not through the shop. Bring the bill to us if you need help routing a claim to the correct service centre.",
      },
      {
        n: "4.3",
        subtitle: "EMI plan and finance-partner matters",
        body: "If you bought the phone on EMI, the down-payment and instalment plan continue per the finance-partner contract you signed at the counter. Any dispute about the finance terms themselves — tenure, charges, late-payment fees — is handled by the finance partner directly. Message us on WhatsApp if you need help getting in touch with them.",
      },
    ],
  },

  accessories: {
    n: "5",
    id: "accessories",
    title: "Accessories and bundled items",
    items: [
      "Accessories purchased alongside a phone (cases, chargers, cables, tempered glass, and similar) are covered by the same no-return rule as the phone itself.",
      "Where the accessory carries its own manufacturer warranty, that route remains open — bring the accessory and the bill to the counter and we will help you route the claim.",
      "Free bundled items included as a gift with a purchase (for example, a case or tempered glass thrown in with a new phone) are not replaced separately if lost, damaged, or found unsuitable after handover.",
    ],
  },

  statutory: {
    n: "6",
    id: "statutory",
    title: "Your statutory consumer rights",
    body: "Nothing in this Returns Policy limits any right you have under India's Consumer Protection Act, 2019 in relation to goods that are defective, unsafe, or materially different from what was represented to you at the counter. Those statutory rights operate alongside the shop warranty in Section 4.1 and the manufacturer's warranty in Section 4.2. If you believe the goods you were sold are defective in a way that falls outside the warranty framework — and outside the shop's routine after-sale support — contact us using Section 7 so the matter can be looked at directly.",
  },

  contact: {
    n: "7",
    id: "contact",
    title: "Contact and changes",
    body: `Any question about this Returns Policy, or any warranty or service matter covered by Section 4, should be sent to us via WhatsApp at ${shop.phoneDisplay} (fastest), by phone on the same number, or by email at ${shop.email}. The shop address and opening hours are on the Contact page.`,
    changesTitle: "Changes to this Policy",
    changesBody:
      "This page is updated whenever the shop's returns rule changes. Given that the rule is a firm no-returns-after-handover, material changes are unlikely — but if the shop ever introduces a limited exchange window, a dead-on-arrival replacement mechanism, or any other exception, this page is where it will be announced first.",
  },
} as const;

/** ============================================================================
 * 404 · NOT FOUND
 * Rendered at every unknown URL. Uses the site's poster hero pattern so a lost
 * visitor still lands in something recognisable and can recover to the home,
 * WhatsApp, or contact channels.
 * =========================================================================== */
export const notFound = {
  eyebrow: "404 · Page not found",
  headlineTop: "Wrong number.",
  headlineTail: "This page doesn't exist.",
  sub: "The link you followed points to a page that isn't at the shop — either it moved, or it was never there. Try one of the routes below, or ping us on WhatsApp and we'll point you at the right thing in a minute.",
  stickerA: "404",
  stickerB: "Ekta Chowk · Jabalpur",
  waMessage:
    "Hi, I was looking for something on the website but landed on a 404 page. Can you help?",
  primaryCta: "Back to home",
  secondaryCta: "Ask on WhatsApp",
  linksHeading: "Or try one of these",
  quickLinks: [
    { label: "About the shop", href: "/about" },
    { label: "Warranty", href: "/warranty" },
    { label: "EMI", href: "/emi" },
    { label: "Wholesale", href: "/wholesale" },
    { label: "Sell Your Phone", href: "/sell-your-phone" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
