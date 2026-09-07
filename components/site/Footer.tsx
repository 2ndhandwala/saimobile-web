import Link from "next/link";
import Image from "next/image";
import { InstagramLogo, WhatsappLogo, Phone, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { shop, links } from "@/content";
import { CookiePreferencesLink } from "@/components/site/CookieConsent";

const footerNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/emi", label: "EMI" },
  { href: "/warranty", label: "Warranty" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/sell-your-phone", label: "Sell Your Phone" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper pb-28 md:pb-10">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 pt-14 md:pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-5">
            <Link href="/" className="inline-block">
              <span className="relative block h-24 w-24 md:h-32 md:w-32 overflow-hidden rounded-2xl md:rounded-3xl">
                <Image
                  src="/images/icon-maskable.png"
                  alt={`${shop.legalName} logo`}
                  fill
                  sizes="(min-width: 768px) 128px, 96px"
                  className="object-cover"
                />
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-paper/75 text-sm">
              A phone shop that lives on Instagram and stands at Ekta Chowk. New and
              used phones. Warranty on every used one.
            </p>
            <nav aria-label="Footer">
              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-paper/85">
                {footerNav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="link-underline">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/50 mb-4">
              Visit
            </div>
            <address className="not-italic text-sm text-paper/90 leading-relaxed">
              {shop.address.line1}
              <br />
              {shop.address.line2}
            </address>
            <div className="mt-3 font-mono text-sm text-paper/90">
              {shop.hours}
              <br />
              {shop.daysOpen}
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/50 mb-4">
              Reach us
            </div>
            <div className="flex flex-col items-start gap-3">
              <a
                href={links.whatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 link-underline text-sm"
              >
                <WhatsappLogo weight="fill" size={16} className="text-yellow" />
                WhatsApp · {shop.phoneDisplay}
              </a>
              <a
                href={links.call}
                className="inline-flex items-center gap-2 link-underline text-sm"
              >
                <Phone weight="fill" size={16} className="text-yellow" />
                Call · {shop.phoneDisplay}
              </a>
              <a
                href={links.email}
                className="inline-flex items-center gap-2 link-underline text-sm"
              >
                <EnvelopeSimple weight="fill" size={16} className="text-yellow" />
                {shop.email}
              </a>
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 link-underline text-sm"
              >
                <InstagramLogo weight="fill" size={16} className="text-yellow" />
                {shop.handle}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-paper/15 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-paper/50 font-mono uppercase tracking-widest">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>© {new Date().getFullYear()} {shop.legalName}. All rights reserved.</span>
            <span aria-hidden className="text-paper/40">·</span>
            <Link href="/privacy" className="link-underline hover:text-yellow">
              Privacy Policy
            </Link>
            <span aria-hidden className="text-paper/40">·</span>
            <Link href="/returns" className="link-underline hover:text-yellow">
              Returns Policy
            </Link>
            <span aria-hidden className="text-paper/40">·</span>
            <Link href="/terms" className="link-underline hover:text-yellow">
              Terms &amp; Conditions
            </Link>
            <span aria-hidden className="text-paper/40">·</span>
            <CookiePreferencesLink className="link-underline hover:text-yellow font-mono uppercase tracking-widest">
              Cookie preferences
            </CookiePreferencesLink>
          </div>
          <div>
            Built by{" "}
            <a
              href="https://grotechdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hover:text-yellow"
            >
              Grotech Digital
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  );
}
