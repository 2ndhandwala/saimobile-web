# Shri Sai Mobile — homepage

Homepage for **Shri Sai Mobile** (aka `@2nd_hand_wala_jbp_`) at Ekta Chowk,
Jabalpur. Built to be shown to the shop owner on a phone.

- Stack: **Next.js 16 (App Router)** · **Tailwind v4** · **Phosphor icons**
- All content lives in `content.ts` (single source of truth for the demo)
- All placeholders are visible chips on the page and are documented in
  [`DEMO-NOTES.md`](./DEMO-NOTES.md)

## Run it

```bash
npm install
npm run dev    # http://localhost:3000 — auto-converts any new .jpg to .webp first
npm run build  # production build — same predev hook runs before build
npm run images # manually re-run the image conversion pass
```

Any `.jpg`/`.jpeg` dropped into `public/images/**` is converted to `.webp`
(quality 82) and the source jpeg is removed on the next `dev`/`build`.
Icons stay as PNGs so PWA and OG surfaces get the exact bytes they expect.

## Design rationale (short version)

### Wordmark: `2nd HAND WALA JBP` leads, `Shri Sai Mobile · Ekta Chowk` sits underneath

The shop's brand equity is the Instagram handle, not the legal name. Two hundred
thousand people already know `@2nd_hand_wala_jbp_`; only a handful know "Shree Sai
Mobiles" as a name in their head. The wordmark reflects how customers actually think
about the shop. The legal name is never hidden — it appears in full in the map card,
footer, and JSON-LD.

### Palette: Paper `#F4EFE6` · Ink `#0F0F0F` · Signal Yellow `#FFCE00`

One accent, applied page-wide. The palette does three jobs:

- **Warm paper base** grounds the site in a non-clinical, non-SaaS register — this is
  a shop, not a startup.
- **Ink** carries all the poster-weight typography.
- **Signal yellow** is the one thumb-stopper. It picks up India's roadside visual
  grammar (autos, taxis, signage) without swerving into religious/political territory
  the way saffron would, or aggression the way red would.

The two supporting neutrals (`paper-2 #ebe4d6` and `line #d9d1c0`) exist only to
tint section backgrounds and hairlines. There is no second accent.

### Fonts: Bricolage Grotesque · Space Grotesk · JetBrains Mono

- **Bricolage Grotesque** (700/800) for display type.
- **Space Grotesk** (400/500/700) for body and UI.
- **JetBrains Mono** (500) for numbers, condition badges, and the announcement ticker.

All three load via `next/font` at build time — nothing calls Google Fonts at runtime.

### Motion: present but restrained

- **One marquee on the page** — the top announcement bar. Everything else uses CSS
  `:hover` micro-tilts and `open:` state on native `<details>`.
- Fully respects `prefers-reduced-motion`: marquee freezes.
- No scroll-hijack, no parallax — the audience is on the Instagram in-app browser
  on a mid-range Android; motion has to survive that.

### Layout

- Mobile-first (designed at 360px), scaled up to 1400px.
- Sticky top header with the wordmark, condensed nav, and one loud WhatsApp CTA.
- Sticky bottom action bar on mobile (**Call · WhatsApp · Directions**), always
  visible under 768px.
- Chrome (announcement marquee, header, footer, sticky mobile bar, cookie consent)
  is mounted once in `app/layout.tsx`; pages ship only their `<main>`.

## Structure

```
app/
  layout.tsx           # fonts, metadata, JSON-LD, chrome, cookie consent
  page.tsx             # homepage — section composition only
  globals.css          # Tailwind v4 @theme, marquee, grain, buttons

  privacy|terms|returns/page.tsx   # legal — plain-document layout via
                                   # components/legal/Document.tsx helpers

  sell-your-phone|wholesale/       # lead forms — SellForm & WholesaleForm
    schema.ts + actions.ts +       # share components/form/primitives.tsx
    <Form>.tsx                     # and lib/send-lead-email.ts

components/
  site/     # homepage + marketing sections (SectionHeader is the shared
            # eyebrow + yellow-highlighted-tail heading used by every page)
  legal/    # SectionHeading, Paragraph, TableOfContents, DocumentHeader...
  form/     # Field, PhoneInput, ConsentCheckbox, SuccessCard, FormErrorBlock
  ui/       # Sticker, Wordmark

lib/
  jsonld.tsx        # LocalBusiness / Breadcrumb / FAQ structured data
  send-lead-email.ts # Resend wrapper used by both lead-form actions
  csp.ts            # SHA-256 hashes for inline JSON-LD (enforced in prod)

content.ts           # single source of truth: shop info, checks, stock, faq, reviews
scripts/
  convert-images-to-webp.mjs  # predev/prebuild hook — see "Run it"
```

## What still needs the owner's sign-off

See [`DEMO-NOTES.md`](./DEMO-NOTES.md).
