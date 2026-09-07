import { services } from "@/content";

/** Sticker-strip layout: each service on a rotated brick. */
export function ServicesStrip() {
  const tilts = [-2, 1.5, -1, 2, -1.5];
  return (
    <section className="bg-yellow border-b-2 border-ink">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-20">
        <div className="mb-10">
          <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-4xl md:text-5xl text-ink">
            More than a phone shop.
          </h2>
          <p className="mt-3 max-w-xl text-ink-2">
            Everything else you need under the same roof.
          </p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {services.map((s, i) => (
            <li
              key={s.name}
              style={{ transform: `rotate(${tilts[i]}deg)` }}
              className="brick p-5 shadow-[6px_6px_0_0_#0f0f0f] transition hover:-translate-y-1"
            >
              <div className="font-display font-extrabold text-2xl text-ink">
                {s.name}
              </div>
              <p className="mt-2 text-sm text-ink-2">{s.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
