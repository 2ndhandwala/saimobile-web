import { InstagramLogo, PlayCircle } from "@phosphor-icons/react/dist/ssr";

/**
 * Renders Instagram reels using IG's direct `/embed/` iframe endpoint.
 * No embed.js dependency, no per-embed height jitter; every card is a
 * clean 9:16 iframe so the grid rows always align.
 *
 * Falls back to styled placeholder cards when no permalinks are provided.
 */
export function ReelGrid({ permalinks }: { permalinks: string[] }) {
  if (!permalinks.length) {
    return (
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <li
            key={i}
            className="brick relative aspect-[9/16] overflow-hidden group cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-paper-2 to-paper" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-4">
              <PlayCircle weight="fill" size={44} className="text-ink" />
              <div className="font-display font-bold text-ink text-lg leading-tight">
                Reel #{i + 1}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Waiting for permalink
              </div>
            </div>
            <div className="absolute top-3 left-3 z-10 font-mono text-[10px] uppercase tracking-widest bg-paper text-ink px-2 py-1 rounded-full border border-ink flex items-center gap-1">
              <InstagramLogo weight="bold" size={12} />
              Reel
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
      {permalinks.map((url) => {
        const embed = url.replace(/\/?$/, "/") + "embed/";
        return (
          <li
            key={url}
            className="brick overflow-hidden bg-ink shadow-brick"
          >
            {/* aspect-[9/16] frame; iframe extended past the bottom so
                Instagram's audio strip + reactions + footer are clipped away.
                140px covers standard IG reel chrome across common widths. */}
            <div className="relative aspect-[9/16] w-full overflow-hidden">
              <iframe
                src={embed}
                title="Instagram reel from @2nd_hand_wala_jbp_"
                loading="lazy"
                allow="encrypted-media; autoplay; clipboard-write; picture-in-picture; web-share"
                allowFullScreen
                scrolling="no"
                className="absolute top-0 left-0 w-full border-0 bg-paper"
                style={{ height: "calc(100% + 140px)" }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
