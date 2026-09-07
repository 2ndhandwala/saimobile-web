import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { DeviceMobile } from "@phosphor-icons/react/dist/ssr";
import { MobileMenu } from "@/components/site/MobileMenu";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "EMI", href: "/emi" },
  { label: "Warranty", href: "/warranty" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md border-b-2 border-ink">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-20 md:h-28 flex items-center justify-between gap-4">
        <Wordmark />
        <nav className="hidden lg:flex items-center gap-6">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="link-underline font-sans font-medium text-sm text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link
            href="/sell-your-phone"
            className="btn btn-yellow text-base px-5 py-2.5"
            aria-label="Sell Your Phone"
          >
            <DeviceMobile weight="fill" size={18} />
            Sell Your Phone
          </Link>
        </div>
        <MobileMenu items={nav} />
      </div>
    </header>
  );
}
