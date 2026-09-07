/** The one marquee on the page: thin band at top with rotating shop facts. */
const items = [
  "OPEN ALL 7 DAYS",
  "11 AM – 10 PM",
  "20-POINT CHECK ON EVERY USED PHONE",
  "WARRANTY · BILL · BOX · ACCESSORIES",
  "NEW · USED · EMI · EXCHANGE · REPAIRS",
  "EKTA CHOWK, JABALPUR",
  "229,000+ ON INSTAGRAM",
];

export function AnnouncementMarquee() {
  const loop = [...items, ...items];
  return (
    <div className="w-full bg-ink text-yellow overflow-hidden border-b-2 border-ink">
      {/* Screen-reader-only single copy; the visual loop is aria-hidden so
       * the ticker doesn't announce every duplicated item on every pass. */}
      <p className="sr-only">
        {items.join(". ")}.
      </p>
      <div aria-hidden className="flex marquee-track fast whitespace-nowrap py-2">
        {loop.map((t, i) => (
          <span
            key={i}
            className="mx-6 font-mono text-[11px] md:text-xs font-bold uppercase tracking-[0.22em] flex items-center gap-6"
          >
            {t}
            <span className="inline-block w-1.5 h-1.5 bg-yellow rounded-full" />
          </span>
        ))}
      </div>
    </div>
  );
}
