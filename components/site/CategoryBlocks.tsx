import Image from "next/image";
import Link from "next/link";
import {
  WhatsappLogo,
  CheckCircle,
  Sparkle,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import { links } from "@/content";

export function CategoryBlocks() {
  return (
    <section className="border-b-2 border-ink">
      {/* NEW block, cream */}
      <div className="bg-paper-2 border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-6 order-2 md:order-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                Brand new
              </span>
              <h2 className="mt-3 font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-4xl md:text-6xl">
                The latest launches. <br />
                Straight from the brands.
              </h2>
              <p className="mt-5 max-w-[52ch] text-ink-2">
                Apple, Samsung, OnePlus, Xiaomi, Vivo, Oppo, Realme, Nothing, iQOO,
                Motorola. Full box, full warranty, EMI at the counter.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={links.whatsapp(
                    "Hi, I want a brand new phone. Can you help me pick one?",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-yellow"
                >
                  <WhatsappLogo weight="fill" size={18} />
                  New phones on WhatsApp
                </a>
              </div>

              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  "Sealed-box units, latest stock",
                  "Full manufacturer warranty",
                  "EMI on cards + no-cost options",
                  "Exchange your old phone",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-ink-2">
                    <CheckCircle
                      weight="fill"
                      size={18}
                      className="text-ink mt-0.5 shrink-0"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-6 order-1 md:order-2 relative">
              <div className="relative aspect-[5/4] w-full brick shadow-brick overflow-hidden">
                <Image
                  src="/images/new-phones.webp"
                  alt="Brand-new sealed phones at Shri Sai Mobile"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* USED block, ink inverted */}
      <div className="bg-ink text-paper">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-6 relative">
              <div className="relative aspect-[5/4] w-full border-2 border-yellow rounded-brick shadow-[6px_6px_0_0_#ffce00] overflow-hidden bg-ink">
                <Image
                  src="/images/used-phones-display.webp"
                  alt="Used phones being checked at Shri Sai Mobile"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-yellow">
                Second-hand
              </span>
              <h2 className="mt-3 font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-4xl md:text-6xl">
                50,000 sold. <br />
                20 checks on every one.
              </h2>
              <p className="mt-5 max-w-[52ch] text-paper/80">
                What made us famous. Every used phone is inspected top to bottom
                before it goes on sale. If it passes, it comes with warranty, the
                original box, the original accessories, and a bill.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={links.whatsapp(
                    "Hi, I want to see today's used phone stock.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-yellow"
                >
                  <WhatsappLogo weight="fill" size={18} />
                  Get today's used stock
                </a>
                <Link href="/warranty" className="btn btn-inverse">
                  <Sparkle weight="fill" size={16} />
                  See all 20 checks
                  <ArrowUpRight weight="bold" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
