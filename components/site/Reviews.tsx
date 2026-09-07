import { Star, ArrowUpRight, GoogleLogo } from "@phosphor-icons/react/dist/ssr";
import { reviews, shop } from "@/content";

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <div
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          weight="fill"
          size={18}
          className={i < rounded ? "text-yellow" : "text-paper-2"}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="bg-paper border-b-2 border-ink">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10 md:mb-14">
          <div className="md:col-span-6">
            <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[0.9] text-4xl md:text-6xl text-ink">
              4.8 stars. <br />
              679 reviews. <br />
              <span className="text-muted">And counting.</span>
            </h2>
          </div>
          <div className="md:col-span-6 md:pl-6 md:border-l md:border-line">
            <div className="flex items-center gap-3">
              <span className="font-display font-extrabold text-5xl md:text-6xl text-ink leading-none">
                {shop.rating}
              </span>
              <div className="flex flex-col">
                <Stars rating={shop.rating} />
                <span className="font-mono text-xs text-muted mt-1">
                  {shop.reviewCount} verified Google reviews
                </span>
              </div>
            </div>
            <a
              href={shop.urls.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost mt-5"
            >
              <GoogleLogo weight="bold" size={16} />
              Read on Google
              <ArrowUpRight weight="bold" size={14} />
            </a>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((r, i) => (
            <li key={i} className="brick p-6 flex flex-col gap-4 shadow-brick">
              <Stars rating={5} />
              <p className="text-ink text-base leading-snug">
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="mt-auto">
                <div className="font-display font-bold text-ink text-sm">
                  {r.name}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted mt-1">
                  {r.context}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
