import {
  MapPinLine,
  Clock,
  Phone,
  WhatsappLogo,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import { shop, links } from "@/content";

export function VisitShop() {
  return (
    <section className="bg-paper-2 border-b-2 border-ink">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
        <div className="mb-10 md:mb-14">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            Come by
          </span>
          <h2 className="mt-3 font-display font-extrabold tracking-[-0.03em] leading-[0.9] text-4xl md:text-6xl">
            Visit the shop at Ekta Chowk.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-7 brick overflow-hidden shadow-brick">
            <div className="relative w-full aspect-[4/3] lg:aspect-[16/10]">
              <iframe
                title={`Map to ${shop.legalName}, Ekta Chowk, Jabalpur`}
                src={links.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="brick-ink p-6 md:p-7">
              <div className="flex items-start gap-3">
                <MapPinLine weight="fill" size={22} className="text-yellow mt-1" />
                <div>
                  <div className="font-display font-bold text-lg leading-tight">
                    {shop.legalName}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-yellow mt-1">
                    aka {shop.brandName}
                  </div>
                  <address className="not-italic mt-3 text-paper/85 leading-snug">
                    {shop.address.line1}
                    <br />
                    {shop.address.line2}
                  </address>
                </div>
              </div>
            </div>

            <div className="brick p-6 md:p-7 flex items-start gap-3">
              <Clock weight="fill" size={22} className="text-ink mt-1" />
              <div>
                <div className="font-display font-bold text-lg leading-tight text-ink">
                  Open all 7 days
                </div>
                <div className="mt-1 font-mono text-sm text-ink-2">
                  {shop.hours}
                </div>
                <p className="mt-2 text-sm text-muted">
                  Monday through Sunday. No off-days.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <a
                href={links.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-yellow"
              >
                <ArrowUpRight weight="bold" size={16} />
                Directions
              </a>
              <a href={links.call} className="btn btn-ghost">
                <Phone weight="fill" size={16} />
                Call
              </a>
              <a
                href={links.whatsapp("Hi, planning to visit the shop today. Are you open?")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                <WhatsappLogo weight="fill" size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
