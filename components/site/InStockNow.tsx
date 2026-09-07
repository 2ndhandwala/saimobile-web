import Image from "next/image";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { links } from "@/content";
import { loadPhones, type Phone } from "@/lib/phones";

function formatPrice(price: number | null): string {
  if (price == null) return "Contact for price";
  return `₹${price.toLocaleString("en-IN")}`;
}

function ConditionBadge({ c, kind }: { c: Phone["condition"]; kind: Phone["kind"] }) {
  const isNew = kind === "New";
  return (
    <span
      className={`inline-flex items-center font-mono uppercase text-[10px] tracking-widest px-2 py-1 border-2 border-ink rounded-full ${
        isNew
          ? "bg-yellow text-ink"
          : c === "Like New"
            ? "bg-paper text-ink"
            : c === "Excellent"
              ? "bg-paper text-ink"
              : "bg-paper text-ink"
      }`}
    >
      {c}
    </span>
  );
}

function StockCard({ item, tilt }: { item: Phone; tilt: number }) {
  return (
    <li
      style={{ transform: `rotate(${tilt}deg)` }}
      className="brick p-4 md:p-5 flex flex-col gap-4 shadow-brick transition hover:-translate-y-1"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-paper-2 border border-ink/20">
        <Image
          src={item.image ?? `/images/products/phone-${item.seed}.webp`}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {item.brand}
          </div>
          <div className="font-display font-bold text-lg leading-tight text-ink">
            {item.model}
          </div>
          <div className="mt-1 font-mono text-xs text-ink-2">
            {item.storage}
            {item.ram ? ` · ${item.ram} RAM` : ""}
            {item.color ? ` · ${item.color}` : ""}
          </div>
          <div className="mt-2 font-display font-bold text-base text-ink">
            {formatPrice(item.price)}
          </div>
        </div>
        <ConditionBadge c={item.condition} kind={item.kind} />
      </div>

      <a
        href={links.whatsappModel(`${item.model} ${item.storage}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-yellow w-full text-sm py-2.5"
      >
        <WhatsappLogo weight="fill" size={16} />
        Get today's price
      </a>
    </li>
  );
}

export async function InStockNow() {
  const phones = await loadPhones();
  const all = [...phones].sort((a, b) => {
    if (a.kind === b.kind) return 0;
    return a.kind === "Used" ? -1 : 1;
  });
  return (
    <section className="bg-paper-2 border-b-2 border-ink">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              In stock now
            </span>
            <h2 className="mt-3 font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-4xl md:text-5xl">
              A slice of today's shelf.
            </h2>
          </div>
          <p className="max-w-sm text-ink-2 md:text-right">
            Stock changes every day. Tap any card to get today's price on WhatsApp.
          </p>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {all.map((item, i) => (
            <StockCard
              key={item.id}
              item={item}
              tilt={i % 2 === 0 ? -0.6 : 0.6}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
