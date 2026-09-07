import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { stats } from "@/content";

export function StatBar() {
  return (
    <section className="bg-ink text-paper border-b-2 border-ink">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-10 md:py-12">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
          {stats.map((s, i) => {
            const inner = (
              <div className="flex flex-col leading-none">
                <span className="font-display font-extrabold tracking-[-0.03em] text-3xl md:text-5xl text-paper flex items-center gap-2">
                  {s.big}
                  {s.href && (
                    <ArrowUpRight
                      weight="bold"
                      size={22}
                      className="text-yellow shrink-0"
                    />
                  )}
                </span>
                <span className="mt-2 md:mt-3 font-mono text-[11px] md:text-xs uppercase tracking-widest text-paper/70">
                  {s.small}
                </span>
              </div>
            );
            /* First cell in each row (mobile: odd index resets, desktop: 4-col
             * so cells 0/4/8... start rows); the others carry a left divider. */
            const isRowStart =
              (i % 2 === 0 ? "" : "border-l border-paper/15 pl-6 ") +
              (i % 4 === 0 ? "" : "md:border-l md:border-paper/15 md:pl-6");
            return (
              <li key={i} className={isRowStart.trim()}>
                {s.href ? (
                  <Link
                    href={s.href}
                    target={s.ext ? "_blank" : undefined}
                    rel={s.ext ? "noopener noreferrer" : undefined}
                    className="block group"
                  >
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
