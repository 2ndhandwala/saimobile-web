import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { faq } from "@/content";

/** Native <details> accordion: no JS, keyboard-accessible, no motion library needed. */
export function FAQ() {
  return (
    <section className="bg-paper border-b-2 border-ink">
      <div className="mx-auto max-w-[1000px] px-4 md:px-8 py-16 md:py-24">
        <div className="mb-10 md:mb-14">
          <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-4xl md:text-6xl text-ink">
            Questions people <br />
            actually ask.
          </h2>
        </div>

        <ul className="flex flex-col gap-3">
          {faq.map((f, i) => (
            <li key={i}>
              <details className="group brick p-5 md:p-6 open:shadow-brick transition-shadow">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="font-display font-bold text-lg md:text-xl leading-snug text-ink">
                    {f.q}
                  </span>
                  <CaretDown
                    weight="bold"
                    size={22}
                    className="shrink-0 mt-1 text-ink transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-4 text-ink-2 leading-relaxed">{f.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
