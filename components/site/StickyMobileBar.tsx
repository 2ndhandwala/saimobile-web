import { Phone, WhatsappLogo, MapPinLine } from "@phosphor-icons/react/dist/ssr";
import { links } from "@/content";

/** Always-visible action bar for mobile: 3 primary CTAs, thumb-height. */
export function StickyMobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden">
      <div className="bg-ink border-t-2 border-ink px-3 py-2 grid grid-cols-3 gap-2">
        <a
          href={links.call}
          className="flex flex-col items-center justify-center gap-1 py-2 rounded-full bg-paper text-ink"
        >
          <Phone weight="fill" size={18} />
          <span className="font-mono text-[10px] uppercase tracking-widest">Call</span>
        </a>
        <a
          href={links.whatsapp()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-2 rounded-full bg-yellow text-ink"
        >
          <WhatsappLogo weight="fill" size={18} />
          <span className="font-mono text-[10px] uppercase tracking-widest">
            WhatsApp
          </span>
        </a>
        <a
          href={links.directions}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-2 rounded-full bg-paper text-ink"
        >
          <MapPinLine weight="fill" size={18} />
          <span className="font-mono text-[10px] uppercase tracking-widest">
            Directions
          </span>
        </a>
      </div>
    </div>
  );
}
