import Image from "next/image";
import Link from "next/link";
import {
  WhatsappLogo,
  MapPinLine,
  ArrowUpRight,
  InstagramLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Sticker } from "@/components/ui/Sticker";
import { links, shop } from "@/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 pt-10 md:pt-16 pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left / top: message */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.22em] text-muted">
                Ekta Chowk · Jabalpur · Since {shop.yearFounded}
              </span>
            </div>

            <h1 className="font-display font-extrabold tracking-[-0.03em] leading-[0.92] text-ink text-[44px] xs:text-[52px] sm:text-6xl md:text-7xl lg:text-[88px]">
              New phones.
              <br />
              Real used phones.
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">Both under one roof.</span>
                <span
                  aria-hidden
                  className="absolute left-0 right-0 bottom-1 md:bottom-2 h-3 md:h-5 bg-yellow -z-0 -rotate-1"
                />
              </span>
            </h1>

            <p className="mt-6 md:mt-8 max-w-[52ch] font-sans text-base md:text-lg text-ink-2">
              The shop <strong className="text-ink">229,000+ of you</strong> already
              follow. {shop.yearsRunning} years in Jabalpur. Warranty and bill on every used phone.
            </p>

            <div className="mt-7 md:mt-9 flex flex-wrap items-center gap-3">
              <a
                href={links.whatsapp("Hi, I saw your Instagram. Looking for a phone.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-yellow"
              >
                <WhatsappLogo weight="fill" size={20} />
                Chat on WhatsApp
              </a>
              <a
                href={links.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <MapPinLine weight="bold" size={20} />
                Get directions
                <ArrowUpRight weight="bold" size={16} />
              </a>
            </div>

            {/* Handle line, subtle, direct */}
            <div className="mt-6 flex items-center gap-2 text-muted">
              <InstagramLogo weight="bold" size={16} />
              <Link
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs md:text-sm link-underline"
              >
                {shop.handle}
              </Link>
            </div>
          </div>

          {/* Right / bottom: photo composition with stickers */}
          <div className="lg:col-span-5 relative lg:self-center">
            <div className="relative max-w-[520px] mx-auto">
              <div className="relative aspect-[4/3] w-full brick shadow-brick overflow-hidden">
                <Image
                  src="/images/hero-storefront.webp"
                  alt="Shri Sai Mobile storefront at Ekta Chowk, Jabalpur"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  priority
                  fetchPriority="high"
                />
              </div>

              {/* Centered on the picture's left boundary */}
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                <Sticker tilt={-90} tone="paper" className="text-xs">
                  {shop.yearsRunning} years in Jabalpur
                </Sticker>
              </div>
            </div>

            {/* Floating stickers */}
            <div className="absolute -top-3 -right-2 md:-top-4 md:-right-4 hidden sm:block">
              <Sticker tilt={8} tone="yellow" className="text-sm">
                20-point check
              </Sticker>
            </div>
            <div className="absolute -bottom-4 -left-3 md:-bottom-6 md:-left-6 hidden sm:block">
              <Sticker tilt={-6} tone="ink" className="text-sm">
                Warranty · Bill · Box
              </Sticker>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
