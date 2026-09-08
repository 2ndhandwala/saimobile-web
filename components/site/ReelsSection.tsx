import { InstagramLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ReelGrid } from "./ReelGrid";
import { reelPermalinks, links, shop } from "@/content";
import { Sticker } from "@/components/ui/Sticker";

export function ReelsSection() {
  return (
    <section className="bg-paper border-b-2 border-ink">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end mb-10 md:mb-14">
          <div className="lg:col-span-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              You already know us
            </span>
            <h2 className="mt-3 font-display font-extrabold tracking-[-0.03em] leading-[0.9] text-4xl md:text-6xl lg:text-7xl">
              You've already seen us <br />
              on your feed.
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4">
            <Sticker tone="ink" tilt={-3}>
              {shop.followers} on Instagram
            </Sticker>
            <a
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-yellow"
            >
              <InstagramLogo weight="fill" size={18} />
              Follow {shop.handle}
              <ArrowUpRight weight="bold" size={16} />
            </a>
          </div>
        </div>

        <ReelGrid permalinks={reelPermalinks} />

        <p className="mt-8 text-sm text-muted font-mono uppercase tracking-widest">
          Straight from our Instagram feed.
        </p>
      </div>
    </section>
  );
}
