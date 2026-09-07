import { brandsSold } from "@/content";

/** Static brand strip: chunky wordmarks in the display font, no per-brand SVGs. */
export function BrandStrip() {
  return (
    <section className="bg-paper border-b-2 border-ink">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-10 md:py-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-6 md:mb-8">
          Every major brand under one roof
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 md:gap-x-8 gap-y-3 md:gap-y-6">
          {brandsSold.map((brand) => (
            <li
              key={brand}
              className="font-display font-extrabold tracking-[-0.03em] text-2xl md:text-3xl lg:text-4xl text-ink"
            >
              {brand}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
