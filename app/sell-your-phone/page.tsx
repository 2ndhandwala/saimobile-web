import type { Metadata } from "next";
import Link from "next/link";
import {
  CurrencyInr,
  HandCoins,
  Storefront,
  Phone,
  Lightning,
  WhatsappLogo,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import { Sticker } from "@/components/ui/Sticker";
import { SellForm } from "./SellForm";
import { links, shop } from "@/content";
import { BREADCRUMBS, BreadcrumbListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sell your phone in Jabalpur",
  description:
    "Sell your old phone at Ekta Chowk: fair price, cash on the spot, no haggling. WhatsApp us or fill the form.",
  path: "/sell-your-phone",
});

const perks = [
  { icon: CurrencyInr, label: "Cash on the spot" },
  { icon: HandCoins, label: "Fair price, no haggling" },
  { icon: Storefront, label: "Walk in at Ekta Chowk" },
  { icon: Phone, label: "Or get a callback" },
];

export default function SellYourPhonePage() {
  return (
    <main>
      <BreadcrumbListJsonLd items={BREADCRUMBS.sellYourPhone} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 pt-10 md:pt-16 pb-10 md:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.22em] text-muted">
                  Sell your phone · Ekta Chowk · Jabalpur
                </span>
              </div>

              <h1 className="font-display font-extrabold tracking-[-0.03em] leading-[0.92] text-ink text-[44px] xs:text-[52px] sm:text-6xl md:text-7xl lg:text-[88px]">
                Old phone?{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Instant cash.</span>
                  <span
                    aria-hidden
                    className="absolute left-0 right-0 bottom-1 md:bottom-2 h-3 md:h-5 bg-yellow -z-0 -rotate-1"
                  />
                </span>
                <br />
                Fair price. No drama.
              </h1>

              <p className="mt-6 md:mt-8 max-w-[54ch] font-sans text-base md:text-lg text-ink-2">
                Fill the form, get a callback in minutes. Or walk in at
                the counter. We&apos;ve been buying and selling phones in
                Jabalpur for{" "}
                <strong className="text-ink">{shop.yearsRunning} years</strong>
                , {shop.phonesSold} phones and counting. No haggling
                matches, no lowball games.
              </p>

              <ul className="mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
                {perks.map((p) => (
                  <li key={p.label} className="brick p-4 flex flex-col gap-3">
                    <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-ink text-yellow">
                      <p.icon weight="fill" size={18} />
                    </span>
                    <span className="font-display font-bold text-sm md:text-base leading-tight">
                      {p.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4 relative pt-2">
              <div className="flex flex-wrap gap-5 lg:flex-col lg:items-start">
                <Sticker tilt={-6} tone="yellow" className="text-lg px-5 py-2.5">
                  <Lightning weight="fill" size={18} />
                  Quote in minutes
                </Sticker>
                <Sticker tilt={4} tone="ink" className="text-lg px-5 py-2.5">
                  Cash · UPI · Transfer
                </Sticker>
                <Sticker tilt={-3} tone="paper" className="text-base px-5 py-2.5">
                  {shop.yearsRunning} years in Jabalpur
                </Sticker>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-paper-2 border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                Tell us about the phone
              </span>
              <h2 className="mt-3 font-display font-extrabold tracking-[-0.03em] leading-[0.9] text-3xl md:text-5xl">
                Quick form.
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10">Fast callback.</span>
                  <span
                    aria-hidden
                    className="absolute left-0 right-0 bottom-1 h-3 bg-yellow -z-0 -rotate-1"
                  />
                </span>
              </h2>
              <p className="mt-5 text-ink-2 max-w-sm">
                Nine fields, under a minute. The more you tell us up front,
                the sharper the quote when we call.
              </p>
              <div className="mt-6 hidden lg:flex flex-col gap-3">
                <Link
                  href={links.whatsapp("Hi, I want to sell my phone.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost self-start text-sm"
                >
                  <WhatsappLogo weight="fill" size={16} />
                  Prefer WhatsApp?
                  <ArrowUpRight weight="bold" size={14} />
                </Link>
                <a
                  href={links.call}
                  className="inline-flex items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.22em] text-ink link-underline"
                >
                  <Phone weight="bold" size={14} />
                  Call {shop.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="lg:col-span-8">
              <SellForm />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-paper border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-12 md:py-20">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            What happens next
          </span>
          <h2 className="mt-3 font-display font-extrabold tracking-[-0.03em] leading-[0.9] text-3xl md:text-5xl max-w-3xl">
            Four steps. That&apos;s the whole thing.
          </h2>

          <ol className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
            {[
              {
                n: "01",
                title: "You submit the form",
                body: "Nine fields, on your phone, in under a minute.",
              },
              {
                n: "02",
                title: "We call you back",
                body: "Usually inside the hour, during shop hours (11 AM – 10 PM).",
              },
              {
                n: "03",
                title: "Walk in or send it",
                body: "Bring the phone to Ekta Chowk. We run the same 20 checks we run on stock.",
              },
              {
                n: "04",
                title: "Cash at the counter",
                body: "Final price on the spot. Cash, UPI or bank transfer, your call.",
              },
            ].map((s) => (
              <li key={s.n} className="brick p-5 flex flex-col gap-3">
                <span className="font-mono text-xs text-muted">{s.n}</span>
                <span className="font-display font-bold text-lg leading-tight text-ink">
                  {s.title}
                </span>
                <span className="text-sm text-ink-2 leading-snug">
                  {s.body}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
