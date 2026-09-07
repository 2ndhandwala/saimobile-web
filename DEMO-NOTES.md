# DEMO-NOTES

Everything on the site is real **except** what is listed below. Nothing here will trip
the owner up during the walk-through, but each item needs to be resolved before the site
goes live.

All placeholders in the codebase are grep-able with `placeholder`.

---

## 1. What I need from the shop owner

These are the only things blocking a real launch. Ask for them in one message.

### 🚨 Social-share preview + production domain — BLOCKING for shares to work

- [x] **OG image is live** at `app/opengraph-image.tsx`. Built at build time from
      JSX + brand fonts (Bricolage-Grotesque 800, Space-Grotesk 500/700,
      JetBrains-Mono 500 — all fetched from Fontsource CDN at build). Renders
      1200×630 PNG, ~70 KB. Uses the same paper/ink/yellow palette and the
      same "yellow highlight bar under the tail word" motif as the site.
      Copy is generated from `shop.*` in `content.ts` — rating, review count,
      followers, years running — so any update there flows through.
      To customise: edit `app/opengraph-image.tsx` directly. Alternatively,
      drop a static PNG at `app/opengraph-image.jpg` (or `.png`) — the file
      convention takes precedence.
- [x] **`metadataBase` now points at the canonical production origin.**
      `https://2ndhandwala.com` (bare host, no www) is the single source of
      truth in `lib/seo.ts → SITE_URL`, consumed by `metadataBase`, the
      sitemap, robots.txt, `llms.txt`, and every JSON-LD `@id`. The hosting
      layer should 301 the `www.` variant to this origin so canonicals stay
      unambiguous — verify after DNS is pointed. **The current OG image
      inside `app/opengraph-image.tsx` is a build-time PNG assembled from
      the brand palette and shop stats; it works as a placeholder but a
      real storefront photo would land harder in feeds — commissioning one
      is worth it before any paid social push.**
- [ ] **Per-route OG images (optional, post-launch).** Any route can override
      the sitewide image by placing its own `app/<route>/opengraph-image.tsx`.
      Worth doing on `/warranty` and `/emi` if those pages get shared often —
      warranty-specific and EMI-specific previews land harder in feeds.

### 🚨 /terms page — BLOCKING, do not launch until filled

The `/terms` page ships with all structural boilerplate written plainly and
correctly for what this website actually is — a lead-gen front-door for a
physical counter, with two enquiry forms and WhatsApp / phone / email routes,
**not** an e-commerce checkout. Sections 1-7 and 10-11 are load-bearing and
should not be changed without legal input, but they contain no placeholder
tokens because the facts (operator, address, hours, contact routes, off-site
platforms, IP claims) all come from `content.ts → shop` and reflect real site
behaviour.

The commercial-risk clauses in Sections 8 and 9 are tokened — those are legal
decisions and must not be invented.

**Tokens to fill (all live in `content.ts → terms`):**

- [x] `[EFFECTIVE DATE]` — set to **10 September 2026** in `terms.effectiveDate`,
      matching `/privacy` and `/returns`. Renders in the document header and
      the end-of-document footer strip on `/terms`.
- [ ] `[LIABILITY CAP]` — `terms.liability.items[2]`. The monetary or
      formulaic cap on the shop's direct liability arising from website use.
      Common patterns: (a) capped at the amount paid by the user in the last
      12 months (₹0 for anyone who hasn't bought), (b) a fixed rupee amount
      (e.g. ₹5,000), (c) capped at the price of the specific phone if the
      dispute traces back to a sale. Legal to draft.
- [ ] `[COURT JURISDICTION]` — `terms.law.items[0]`. The court(s) with
      exclusive jurisdiction. Given the shop's location, the standard
      wording is "the courts at Jabalpur, Madhya Pradesh, India shall have
      exclusive jurisdiction" — but the exact phrasing (exclusive vs
      non-exclusive; whether High Court or district courts; carve-out for
      injunctive relief) is a legal decision.
- [ ] `[ARBITRATION]` — `terms.law.items[1]`. Whether a pre-litigation
      arbitration or mediation step is required (and if so, the seat, the
      rules, the appointing authority). If no arbitration clause is
      intended, replace this token with a sentence stating that.
- [ ] `[MINIMUM AGE]` — `terms.law.items[2]`. The minimum age at which
      someone may lawfully use the website and submit an enquiry. Common
      choice: 18 (aligns with EMI eligibility handled by the finance
      partner at the counter). Legal to confirm.

**Not tokened but worth a legal read:**

- Section 3 (Acceptable use) — standard don't-scrape, don't-attack,
  don't-abuse clauses; note that the "no scraping for ML training" line is
  intentional and modern-form. Kept or dropped at legal's discretion.
- Section 4 (Enquiries and quotes) — the "quote is indicative, sale
  concludes at counter" framing is critical to preserve, because it is what
  keeps a WhatsApp price message from becoming a binding offer.
- Section 6 (Intellectual property) — the trade-mark and manufacturer-marks
  wording tracks the site's actual content and should be reviewed against
  whatever formal trade-mark registrations the shop holds (if any).

### 🚨 /faq page — BLOCKING for search-schema completeness, non-blocking for launch

The `/faq` page ships with real, fully-written answers to the questions the shop
gets every day. Where the honest answer is a policy the owner hasn't confirmed
yet, the answer is tokened with the same dashed yellow badge used on `/warranty`
and `/emi`. **Do not invent these** — they are commitments the shop has to honour.

**Schema behaviour:** `FAQPage` JSON-LD is emitted **only for token-free answers**
so search engines don't index unfinished policy. When a token is filled below,
that Q&A automatically flows into the schema on next build.

**Tokens to fill, grouped by owner conversation:**

*Warranty terms (same conversation as `/warranty` page):*
- [ ] `[WARRANTY TRANSFER RULES]` — `faqPage.categories[0].items[5].a`
      ("Does the shop warranty transfer if I resell the phone?"). Duplicated
      in `warranty.faq[2].a` — resolve once and both pages read straight.

*EMI terms (same conversation as `/emi` page):*
- [ ] `[EMI TENURES]` — `faqPage.categories[3].items[2].a`. Duplicated in
      `emi.faq[0].a` and `emi.compare.cards[0].points[2]` — one owner answer
      unblocks all three.
- [ ] `[EMI DOCUMENTS]` — `faqPage.categories[3].items[3].a`, the "additional
      docs" note. Same underlying question as `[ADDITIONAL DOCS PER PARTNER]`
      on `/emi` (`emi.documents.items[5].body`, `emi.faq[4].a`).
- [ ] `[EMI APPROVAL TIME]` — `faqPage.categories[3].items[4].a`. Same
      underlying question as `[APPROVAL TIME]` on `/emi`
      (`emi.howItWorks.steps[2].body`, `emi.eligibility.points[2]`,
      `emi.faq[5].a`).

*Exchange & buy-back process (new owner conversation):*
- [ ] `[EXCHANGE PROCESS]` — `faqPage.categories[4].items[1].a`. How is the
      exchange value calculated at the counter? (Check list + market rate
      formula, whether the phone has to be a working unit, whether we accept
      cracked screens on trade-in, etc.)
- [ ] `[BUY-BACK TERMS]` — `faqPage.categories[4].items[3].a`. Any published
      terms on outright buy-back — payout mode, ID required, whether we take
      phones without box/bill, whether IMEI blacklist check is a hard gate.

*Repair policy (new owner conversation):*
- [ ] `[REPAIR WARRANTY]` — `faqPage.categories[5].items[1].a`. Do
      in-house repairs (screen, battery, board) carry their own warranty,
      and if so for how long? Duplicated in `warranty.faq[4].a` — one
      owner answer unblocks both.

*Delivery / shipping (new owner conversation):*
- [ ] `[DELIVERY/SHIPPING]` — `faqPage.categories[6].items[3].a`. Do we
      deliver locally in Jabalpur? Do we ship out of state? If yes, on
      which categories (new / used / accessories) and via which courier?
      If it's WhatsApp-arranged only, that's a fine answer too — just
      needs a one-line "yes, message us" or "no, counter-only".

### 🚨 /returns page — BLOCKING, do not launch until filled

The `/returns` page states a firm no-returns-after-handover rule, per owner
confirmation on 2026-09-04 ("no returns allowed after purchase"). The rule is
copied cleanly and is not tokened. The following items still need owner sign-off.

**Token to fill:**

- [x] `[EFFECTIVE DATE]` — set to **10 September 2026** per owner (2026-09-04)
      in `returns.effectiveDate`. Renders in the document header block and
      the end-of-document footer strip on `/returns`.

**Owner confirmations that might change the copy (all currently written as
"no exception exists" — flip any of these that are wrong):**

- [ ] **Dead-on-arrival exception?** Some shops honour a replacement if the
      customer unboxes a brand-new phone at the counter and it will not
      power on. The current page does not carve this out. If the owner
      wants a DOA carve-out, add a subsection under `returns.after` or a
      short "Exceptions" section before the statutory-rights section.
- [ ] **Exchange window?** Some shops allow a 24-hour unopened swap on a
      new phone (customer changes their mind about model). The current
      page does not offer this. Note that the shop's separate Exchange
      service (trading in your old phone for a new/used one) is already
      distinguished from this Policy in Section 1 — that stays regardless.
- [ ] **Store credit / gift vouchers?** The page is silent on vouchers. If
      the shop issues store credit as a goodwill gesture in any circumstance,
      that should be added to Section 4 so the copy is honest.
- [ ] **Accessories rule.** Section 5 currently applies the same no-return
      rule to accessories (cases, chargers, tempered glass) sold alongside
      a phone. Confirm this is right — some shops treat inexpensive
      accessories more leniently.
- [ ] **EMI cancellation window.** Some finance partners let the customer
      cancel an EMI plan within a short window after signing (typically 24
      or 48 hours), which effectively unwinds the sale. If the finance
      partner allows this, it should be mentioned in Section 4.3 for
      completeness. Currently the page says the EMI plan continues per the
      contract signed at the counter.

### 🚨 /privacy page — BLOCKING, do not launch until filled

Every specific privacy commitment on `/privacy` is a placeholder token, styled
with the same dashed yellow badge as the warranty and EMI pages. **Do not
invent these** — they are legal commitments the shop is bound to under India's
Digital Personal Data Protection Act, 2023 (DPDPA). Get a lawyer to sign off
on the token values before the page goes live.

Hard facts already stated on the page (do not touch):
- No sale of personal data.
- No use of phone numbers beyond answering the enquiry sent.
- No Aadhaar/PAN/bank details collected via the website (only in-store at the
  counter, by the finance partner directly, for EMI).
- Site is HTTPS end-to-end; form submissions are server-to-server.
- Grievance rights under DPDPA 2023 listed in full.

**Mailbox blockers — both must exist before launch:**

- [ ] `privacy@2ndhandwala.com` is the CTA everywhere on `/privacy` (via
      `shop.privacyEmail` in `content.ts`). This mailbox **must be created and
      monitored** — a dead legal contact is a compliance problem, not just a
      UX one. If the owner wants to route to an existing address, swap
      `shop.privacyEmail` and every button + JSON-LD updates.
- [ ] `contact@2ndhandwala.com` is still the general inbox (unchanged
      blocker from the /contact page section below).
- [ ] **CRITICAL — must fix before deploy.** Sell-lead and wholesale-lead
      inbox is currently `grotechdigital@gmail.com` (the site-builder's
      inbox, used only for the pre-deploy checking phase), hard-coded in
      `app/sell-your-phone/actions.ts` and `app/wholesale/actions.ts`. The
      /privacy page **no longer discloses any agency processing** —
      Grotech Digital was removed from the processors list on
      2026-09-04 per owner instruction. Consequence: if you deploy without
      changing `LEAD_INBOX` in both actions files to a shop-owned address,
      the code will send lead emails to the agency inbox but the Privacy
      Policy claims no such processor exists. That is a factual conflict.
      Change `LEAD_INBOX` in both files to a shop-owned mailbox before
      deploy — no exceptions.

**Tokens to fill (all live in `content.ts → privacy`):**

- [x] `[EFFECTIVE DATE]` — set to **10 September 2026** per owner (2026-09-04)
      in `privacy.effectiveDate`. Renders in the document header block and
      the end-of-document footer strip on `/privacy`.
- [ ] `[HOSTING PROVIDER]` — `privacy.processors.items[0].body`. The actual
      hosting provider (Vercel is the likely default). Once picked, name it
      inline; keeps Section 3 accurate.
- [ ] `[RETENTION: SELL FORM]` / `[RETENTION: WHOLESALE FORM]` /
      `[RETENTION: ANALYTICS]` / `[RETENTION: LOGS]` —
      `privacy.retention.retentionItems[0..4]`. Retention windows per data
      category. Legal to confirm.
- [x] `[CONSENT MECHANISM]` — resolved. Replaced by real copy in
      `privacy.cookies.consentNote` describing the self-built DPDPA banner
      wired via `components/site/CookieConsent.tsx` + `lib/consent.ts`.
      Storage: `localStorage["sm.consent"]`, versioned (bump `CONSENT_VERSION`
      to re-prompt every returning visitor when the category set changes).
- [ ] `[RESPONSE WINDOW]` — appears in `privacy.rights.intro` and
      `privacy.grievance.body`. Time within which the shop commits to
      acknowledging DPDPA requests (industry norm: 7-30 days).
- [ ] `[GRIEVANCE OFFICER NAME]` — `privacy.grievance.body`. DPDPA requires
      a named grievance officer for redressal. Name + optional designation.
- [ ] `[PRIVACY INBOX MONITOR]` — `privacy.contact.body`. Who at the shop
      actually reads `privacy@2ndhandwala.com` (e.g. "Ashish Soni",
      "the shop's designated privacy point-of-contact").

**Implementation gaps that make the /privacy copy accurate:**

- [ ] **Google Analytics 4 is not yet wired.** The privacy page states it
      is used. Either wire it into `app/layout.tsx` (typically via
      `@next/third-parties/google`) before launch, or delete the
      GA-related copy in `privacy.whatWeCollect.sources[3]`,
      `privacy.processors.items[2]`, and `privacy.cookies.items[1]`.
- [ ] **Meta (Facebook) Pixel is not yet wired.** Same story — either
      add the pixel script to `layout.tsx` or delete the Meta-related
      copy in `privacy.whatWeCollect.sources[3]`,
      `privacy.processors.items[3]`, and `privacy.cookies.items[2]`.
- [x] **Consent banner is wired.** Self-built DPDPA-compliant banner in
      `components/site/CookieConsent.tsx`, mounted from `app/layout.tsx`.
      Persistent withdrawal path: "Cookie preferences" link in the footer
      dispatches `sm:open-consent-preferences` to reopen the dialog. When
      GA4 / Meta Pixel land, gate them on `readConsent()` from
      `lib/consent.ts` **and** subscribe to `sm:consent-change` so a
      mid-session opt-out unmounts / stops firing the scripts without a
      page reload. Do **not** mount either script unconditionally.

### 🚨 /emi page — BLOCKING, do not launch until filled

Every specific EMI term on `/emi` is a placeholder token, styled with the same
dashed yellow badge as the warranty page. **Do not invent these** — they are
financial commitments the shop and the finance partner have to honour.

Two things are confirmed and hard-coded on the page:
- EMI is available on **both brand-new and second-hand phones**.
- Minimum **10% down payment** on every EMI purchase.
- EMI is set up through a **finance partner** (per owner confirmation on 2026-09-04).
  The specific partner name is still tokened — the page never claims a brand.

Everything else is tokened until owner confirms:

- [ ] `[FINANCE PARTNER NAME]` — currently unnamed on the page. Owner confirms
      whether it is Bajaj Finserv, ZestMoney, HDB, IDFC or another. If we can
      name the partner, the "how it works" step 3 and the eligibility copy read
      much stronger. Until then, the page says "our finance partner".
- [ ] `[TENURE OPTIONS]` — used in `emi.compare.cards[0].points[2]`,
      `emi.faq[0].a`, `emi.faq[3].a`. The set of tenures the partner supports
      (e.g. 3 / 6 / 9 / 12 / 18 / 24 months). Different partners offer
      different sets.
- [ ] `[INTEREST/CHARGES]` — used in `emi.compare.cards[0].points[2]`,
      `emi.faq[1].a`. Whether the plan is zero-cost, standard-interest,
      whether a processing fee is charged, and how it is presented to the
      customer at the counter.
- [ ] `[ELIGIBLE PHONES]` — used in `emi.compare.cards[1].points[2]`,
      `emi.eligibility.points[1]`, `emi.faq[3].a`. Any phone-model or
      price-band restrictions (e.g. "phones under ₹5,000 not eligible",
      "used iPhones only above a certain year").
- [ ] `[APPROVAL TIME]` — used in `emi.howItWorks.steps[2].body`,
      `emi.eligibility.points[2]`, `emi.faq[5].a`. The typical decision
      window at the counter (e.g. "under 5 minutes", "10-15 minutes").
- [ ] `[ELIGIBILITY CRITERIA]` — used in `emi.eligibility.points[0]`. The
      partner's age band, income indicator, credit-history requirements.
- [ ] `[ADDITIONAL DOCS PER PARTNER]` — used in `emi.documents.items[5].body`
      and `emi.faq[4].a`. Any extra document the partner asks for on
      higher-value phones (e.g. salary slip, 3-month bank statement,
      employment proof, guarantor).

Placeholder images on `/emi` — **swap for EMI-specific shots when available:**
- Down-payment section reuses `public/images/hero-counter.jpg` (existing counter
  shot). Ideal replacement: a customer signing / getting their EMI plan quoted
  at the counter. Path referenced in `emi.downPayment.photo` (`content.ts`).
- Closing CTA reuses `public/images/warranty/handover-bill.jpg` (existing bill
  handover). Ideal replacement: a phone-plus-bill handover framed to feel like
  an EMI take-home moment. Path referenced in `emi.closing.photo`.

### 🚨 /warranty page — BLOCKING, do not launch until filled

Every specific warranty term on `/warranty` is a placeholder token, styled with a
dashed yellow badge so it's impossible to miss on the page. **Do not invent these** —
they are commitments the shop has to honour.

- [x] `[WARRANTY PERIOD]` — confirmed **1 year from date of purchase** on used phones.
      Applied to `warranty.compare.cards[1].points[0]` and `warranty.faq[0].a`.
- [x] `[WHAT'S COVERED]` — confirmed: Battery, Charging, Speakers, Microphone,
      Physical buttons, Vibration/haptics. Applied to `warranty.coverage.covered.items`.
- [x] `[WHAT'S NOT COVERED]` — confirmed: Jailbroken/rooted devices, physical or
      water damage, phones that no longer power on, cracked/non-functional displays.
      Applied to `warranty.coverage.notCovered.items` and `warranty.faq[1].a`.
- [x] `[CLAIM WINDOW]` — confirmed **7-day turnaround** on warranty claims.
      Applied to `warranty.claim.steps[3].body`.
- [ ] `[WARRANTY TRANSFER RULES]` — `warranty.faq[2].a`. Does the shop warranty follow
      the phone or the buyer on resale?
- [ ] `[EMI WARRANTY NOTE]` — `warranty.faq[3].a`. Any EMI-specific warranty note.
- [ ] `[REPAIR WARRANTY]` — `warranty.faq[4].a`. Whether warranty repairs carry their
      own service warranty and for how long.

- [ ] **Confirm the actual 20-check list.** The current list in `content.ts →
      qualityChecks` is my best-guess synthesis from the brief. Owner should confirm each
      item, tweak wording, drop / add checks so it matches what the shop actually does.
- [ ] **Reel permalinks.** Pick the 4-8 best reels from
      `@2nd_hand_wala_jbp_` and send me the public permalinks (like
      `https://www.instagram.com/reel/DCxxxxxxxxx/`). Paste them into
      `content.ts → reelPermalinks`. The demo currently ships styled placeholder cards
      so the section never looks broken.
- [ ] **Real review quotes.** I need 3-6 short quotes pulled from the actual Google
      reviews, each with the reviewer's first name + last initial and one-line context
      ("Bought a used iPhone", "First visit", etc.). Currently in `content.ts →
      reviews` as three dummy quotes.
- [ ] **Shop photos.** All 12 image paths are pre-wired to `/public/images/`.
      Drop files with the exact names in `public/images/README.md` — everything
      renders automatically, no code edits needed. Until files are added, the
      layout is intact but you'll see broken-image icons overlaid with the
      "Photo placeholder" chips (that's your cue to upload). Delete the chips in
      `Hero.tsx`, `CategoryBlocks.tsx`, and `InStockNow.tsx` once real photos land.
      - Hero: `public/images/hero-counter.jpg` (1200 × 1500)
      - New-phones: `public/images/new-phones.jpg` (1600 × 1280)
      - Used-phones: `public/images/used-phones.jpg` (1600 × 1280)
      - Storefront (JSON-LD only): `public/images/storefront.jpg` (1600 × 1200)
      - 8 product shots: `public/images/products/phone-{seed}.jpg` (1000 × 1000 each)
- [ ] **Founding year.** The brief says "10 years". I've set `yearFounded = 2016` in
      `content.ts` (today's date minus 10). Owner confirms exact year.
- [ ] **Warranty terms.** The FAQ currently says "duration and coverage are printed on
      the bill." If the actual shop warranty is a fixed period (e.g. 6 months on used
      phones), owner should say so and I'll swap the answer.

### /warranty page (new)

- [ ] **Confirm the 20-check icon set.** Each check on `/warranty` now carries an
      icon (battery, display, touch, charging port, speaker, mic, cameras, IMEI,
      network, Wi-Fi, Bluetooth, sensors, buttons, biometrics, body, water indicator,
      original parts, factory reset + OS, stress test). Icon mapping lives in
      `content.ts → warranty.checks.icons`. If owner tweaks the check list, update
      the parallel icon list in the same order.
- [x] **Handover photos.** Real photos live at `public/images/warranty/handover-bill.jpg`,
      `handover-box.jpg`, `handover-accessories.jpg`. Placeholder sticker overlays
      removed from `app/warranty/page.tsx`; alt text updated in `content.ts`.
- [ ] **How-to-claim process.** The four steps in `content.ts → warranty.claim.steps`
      (WhatsApp → walk in → in-store diagnosis → resolution) are the sensible default
      based on how the shop already operates. Owner confirms — especially the order
      and whether there's a phone-first triage step we're missing.

### /contact page (new)

- [ ] **Email inbox.** `contact@2ndhandwala.com` is wired into the contact page,
      footer, and `ContactPoint` JSON-LD. **Do not launch until the owner confirms
      this mailbox actually exists and is monitored** — a dead email address is worse
      than none. If the owner wants a different address (Gmail, existing shop
      account), swap `shop.email` in `content.ts` and it flows everywhere.
- [ ] **Google Maps pin.** Now points to `https://maps.app.goo.gl/zmAg3AZRDBouUvPC8`
      (replaces the previous `share.google/…` shortlink). Owner opens on their phone
      and confirms it drops on the shop, not next door. This shortlink is now used
      site-wide via `shop.urls.googleMaps` — one change updates every "Directions"
      button. The embedded map itself uses an address query (see `links.mapEmbed`),
      unaffected either way.

### /about page (new)

- [ ] **Founder photo.** `public/images/team/ashish-soni.jpg` (1000 × 1250, portrait 4:5).
      Ashish at the counter, natural light. Until it lands, the founder block shows a
      broken-image glyph with a visible "Placeholder photo" yellow sticker overlay
      (deliberate — it's obviously a placeholder). Delete the sticker in
      `app/about/page.tsx` once the real photo is live.
- [ ] **Old shop photos (optional but great).** Any counter shots from the Ahinsa Chowk
      days would strengthen the journey section. Drop to `public/images/team/` and let
      me know — I'll thread them into the journey cards.
- [ ] **Collab names + clips.** The Journey milestone #04 and the Instagram section
      both say "local creators and bigger names" in the abstract. If we can name a
      few (and get 1-2 of the best collab reels into `reelPermalinks`), the section
      lands much harder. Nothing named yet — the copy is deliberately general.
- [ ] **Instagram start year.** Milestone #02 says the page "launches" without a year.
      When owner confirms the year, we can add it inline (e.g. "The Instagram page ·
      2019") in `content.ts → about.journey.milestones[1].label`.
- [ ] **Owner honorific.** Currently displayed as "Ashish Soni" (matches the site's
      terse voice). Swap to "Mr Ashish Soni" in `content.ts → about.founder.name` if
      owner prefers the honorific in the founder headline.

### 🚨 SEO — owner sign-off items

The full SEO pass (metadata, canonicals, sitemap, robots, JSON-LD,
llms.txt, alt text) has been wired against the canonical origin
`https://2ndhandwala.com`. Nothing below is a code blocker, but each item
needs an owner or legal decision before it can go live truthfully.

- [ ] **`aggregateRating` in JSON-LD (`lib/jsonld-payloads.ts`) must stay
      truthful.** Today it emits `ratingValue: 4.8, reviewCount: 679`,
      drawn from `content.ts → shop.rating` and `shop.reviewCount`. If the
      live Google rating or review count changes, update those two values —
      Google can and does penalise stale review markup that no longer
      matches the source. Set a reminder to re-check quarterly.
- [ ] **`public/llms.txt` needs owner sign-off before it stays public.**
      This file is a plain-markdown factsheet designed for LLM answer
      engines (ChatGPT, Perplexity, Claude, Google's AI overviews). It
      makes the same public claims already on the site — 20-point check,
      one-year shop warranty, EMI-on-used with 10% down, 11–10 hours, seven
      days — but as a single crawlable document. Because it is a public
      commitments artifact, the owner should read it top-to-bottom and
      approve. Edit in place if any wording overreaches; there is no
      structured schema to satisfy, so plain edits are fine.
- [ ] **Favicon / apple-touch-icon.** `public/images/icon-any.png`,
      `icon-maskable.png` and `apple-icon.png` are placeholder marks derived
      from the wordmark. A real designed favicon (ideally exported from the
      Devanagari wordmark) would strengthen the browser-tab and share-sheet
      presentation, but the current placeholders do not block launch.
- [ ] **www → apex redirect.** The canonical origin is bare
      `2ndhandwala.com` (chosen because the brand short-name and the
      handle both drop the www). The hosting layer must 301 `www.` to the
      apex so search engines never see two versions. Vercel handles this
      automatically once both domains are attached in the dashboard —
      verify after DNS is pointed.
- [ ] **Google Search Console verification.** Once DNS is pointed, verify
      the property in Search Console (the DNS-TXT method is the least
      fiddly) and submit `https://2ndhandwala.com/sitemap.xml`. Rich-result
      testing for the `LocalBusiness` and `FAQPage` markup should be run
      from Search Console → URL Inspection at the same time.

**What was NOT changed (deliberate):**

- Sell-your-phone and wholesale pages are indexable but are NOT in the
  sitemap. Reason: they're conversion-flow pages linked internally from
  the header CTA and the wholesale footer link; giving them equal sitemap
  weight to /warranty and /faq would dilute the local-intent signal.
  Sitemap is deliberately just the six pages an outside reader should be
  led into — home, about, warranty, emi, contact, faq.
- Privacy / Terms / Returns are `noindex, follow` via `<meta robots>` and
  excluded from the sitemap; they carry no JSON-LD (no BreadcrumbList).
  Reason: noindex keeps them out of search results while still crawlable
  (so Google actually reads the noindex tag), whereas a `robots.txt`
  disallow would leave the URL indexable as a bare listing. Footer link
  only, no primary-nav link — deliberate and matches the norm.
- Only one authoritative business entity across the site — `MobilePhoneStore`
  with stable `@id` `https://2ndhandwala.com/#store` in the root layout.
  Every other node (breadcrumbs, FAQ) references it by `@id` rather than
  redeclaring an Organization node, so Google sees one business.

## 2. What is real (verified from the brief)

Don't touch these — they're the load-bearing trust signals:

- Address: `Ekta Chowk, Vijay Nagar, MR4, Jabalpur, MP - 482002`
- Phone / WhatsApp: `+91 97556 66024`
- Hours: `11 AM – 10 PM, 7 days a week`
- Instagram handle + follower count: `@2nd_hand_wala_jbp_` · 229,000+
- Google rating + review count: 4.8 ★ · 679 reviews
- 50,000+ phones sold in 10 years
- 20-check + warranty + bill + box + accessories promise

## 3. What I invented and where I flagged it

| Placeholder | File | Why |
|---|---|---|
| 20-check list contents | `content.ts → qualityChecks` | Owner confirms real list |
| Dummy stock items (iPhone 13, S22, etc.) | `content.ts → stockUsed/stockNew` | Real inventory is dynamic; these are exemplars |
| 3 dummy review quotes with generic-ish names | `content.ts → reviews` | Owner sends real pulled quotes |
| Founding year 2016 | `content.ts → shop.yearFounded` | Owner confirms |
| Warranty phrasing in FAQ | `content.ts → faq[1]` | Owner confirms terms |
| Approx lat/lng for JSON-LD | `content.ts → shop.address.lat/lng` | Coarse pin for Ekta Chowk; map iframe uses an address query so this is only used by search engines |
| All photos | `Image src="https://picsum.photos/…"` | Visibly marked "Photo placeholder" on the page |

## 4. Design decisions that go against a default and are on purpose

- **Wordmark = "2nd HAND WALA JBP" leads, "श्री Sai Mobile · Ekta Chowk" as a small
  subline.** The handle carries the brand equity; the legal name still appears in every
  address block, the footer, and the JSON-LD.
- **Palette = paper `#F4EFE6` + ink `#0F0F0F` + one signal yellow `#FFCE00`.** One
  accent, page-wide.
- **Hero leads with product, uses virality as the proof line right beneath.** The
  IG-referred visitor already knows the reels; the hero's job is turning "the reels
  guy" into "a real shop with warranty."
- **No prices anywhere.** Every product card resolves to a model-specific WhatsApp
  prefill (`links.whatsappModel(...)`). The whole page is a lead generator, not a
  catalogue.
- **One marquee on the page.** The announcement ticker at the top does double-duty
  for shop-facts. The brand strip is a static grid.

## 5. Things worth revisiting after launch (not blocking)

- Convert the `<ReelGrid>` to load `embed.js` only when the reels section actually
  enters the viewport (IntersectionObserver + dynamic script insert), instead of the
  current `strategy="lazyOnload"`. Saves ~50KB on visitors who never scroll to the reels.
- Add a `/inventory` page when the owner is ready to run a live stock feed. Card
  component is already generic in `InStockNow.tsx`.
- ~~Add an `/about` page when the founder is happy to be photographed and named.~~
  Shipped at `/about` on 2026-09-03. Photo + collab names + IG start year still pending
  (see section 1 above).
- ~~Add a `/warranty` page separating manufacturer vs shop warranty and expanding
  the 20-check summary.~~ Shipped at `/warranty` on 2026-09-03. All specific terms
  (period, coverage, exclusions, claim window, transfer, EMI, repair-cover) are
  placeholder tokens pending owner confirmation — see section 1 above.
- ~~Add a `/contact` page.~~ Shipped at `/contact` on 2026-09-03. Five tappable
  channels (WhatsApp primary, Call, Email, Instagram, Directions), map embed,
  reused `<VisitShop>` block. No contact form — WhatsApp is the conversion path,
  per brief. Email inbox monitoring is the one blocker before launch (section 1).
- Add hreflang / Hindi variant if the audience needs it. Currently English only per
  brief.
- Split the CategoryBlocks into their own routes once the About and Contact pages
  exist; hash anchors will keep working.

## 6. Verified while building

- Build passes (`npm run build`): clean, all routes prerendered static.
- Dev server renders `HTTP 200` at `/`, 228KB HTML, all 11 sections present.
- All CTAs are wired: `tel:+919755666024`, `https://wa.me/919755666024?text=…`,
  Google Maps shortlink for directions.
- Structured data: `MobilePhoneStore` LocalBusiness JSON-LD with real address, hours,
  phone, `aggregateRating` (4.8/679), `sameAs` to Instagram, `openingHoursSpecification`
  Mon-Sun 11:00-22:00.
- Sticky mobile bottom bar with Call / WhatsApp / Directions is always visible
  under 768px.
- Instagram embed script is `strategy="lazyOnload"` in `layout.tsx` — it never blocks
  LCP; the ReelGrid falls back to placeholder cards when `reelPermalinks` is empty.

## 7. How to edit anything for the demo

- Copy, phone numbers, addresses, checks, stock, brands, reviews, FAQ, stats →
  `content.ts` (one file).
- Palette → `app/globals.css → @theme` (change `--color-yellow` / `--color-paper` /
  `--color-ink`).
- Fonts → `app/layout.tsx` (`next/font` imports).
- Section order → `app/page.tsx`.

## 8. Ponytail pass (over-engineering audit — 2026-09-04)

Result: **−134 LOC, −4 npm packages**, typecheck clean.

- **Deleted `components/ui/Reveal.tsx`** — exported but never imported.
  Removed `motion@^13.2.0` from `package.json` (Reveal was its only consumer).
  `npm i` dropped 4 packages total (motion + 3 transitives).
- **Extracted `TokenText`/`Placeholder` to `lib/tokens.tsx`** — the same
  two helpers were duplicated verbatim in 6 pages (warranty, emi, faq,
  privacy, terms, returns). Now one file, `~24 LOC × 6 → one 49-LOC lib +
  one import per page`. Marketing pages call `<TokenText text=… />`;
  legal pages (privacy/terms/returns) declare a 3-line `TokenText`
  wrapper at the top of the file that pins `tone="legal"` so the
  ~21 callsites don't need to repeat the prop.
- **Not touched (deliberate)**:
  - `react-hook-form` + `@hookform/resolvers` for `/sell-your-phone` +
    `/wholesale`. A native `<form action={serverAction}>` migration
    would save 2 deps but change form UX (no live client-side
    validation) — not a clear net win.
  - `jsonld.tsx` re-exports of `BREADCRUMBS` / `BreadcrumbItem`.
    Dropping them would force 8 pages to split their JSON-LD imports
    across two files. Facade earns its keep.
  - The 7 single-use section components on the home page
    (`CategoryBlocks`, `InStockNow`, `QualityChecks`, etc.). Splitting
    landing-page sections into named modules is readable structure, not
    over-engineering.
