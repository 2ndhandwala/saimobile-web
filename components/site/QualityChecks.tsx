import Link from "next/link";
import {
  ShieldCheck,
  Receipt,
  Package,
  PlugCharging,
  ArrowRight,
  BatteryFull,
  Monitor,
  HandTap,
  SpeakerHigh,
  Microphone,
  CameraRotate,
  Aperture,
  Barcode,
  CellSignalHigh,
  WifiHigh,
  Bluetooth,
  Compass,
  CursorClick,
  Fingerprint,
  DeviceMobile,
  Drop,
  PuzzlePiece,
  ArrowsClockwise,
  Timer,
} from "@phosphor-icons/react/dist/ssr";
import { qualityChecks, trustPillars } from "@/content";

const pillarIcons = [ShieldCheck, Receipt, Package, PlugCharging];

/** Maps icon-name strings on `qualityChecks` to real Phosphor components. */
const checkIcons: Record<string, typeof ShieldCheck> = {
  BatteryFull,
  Monitor,
  HandTap,
  PlugCharging,
  SpeakerHigh,
  Microphone,
  CameraRotate,
  Aperture,
  Barcode,
  CellSignalHigh,
  WifiHigh,
  Bluetooth,
  Compass,
  CursorClick,
  Fingerprint,
  DeviceMobile,
  Drop,
  PuzzlePiece,
  ArrowsClockwise,
  Timer,
};

export function QualityChecks() {
  return (
    <section className="bg-paper border-b-2 border-ink">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              The core promise
            </span>
            <h2 className="mt-3 font-display font-extrabold tracking-[-0.03em] leading-[0.9] text-4xl md:text-6xl lg:text-7xl">
              20 checks. <br />
              Every used phone. <br />
              <span className="relative inline-block">
                <span className="relative z-10">Zero exceptions.</span>
                <span
                  aria-hidden
                  className="absolute left-0 right-0 bottom-1 md:bottom-2 h-3 md:h-4 bg-yellow -z-0 -rotate-1"
                />
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 max-w-sm">
            <p className="text-ink-2 md:text-lg">
              If a used phone can't pass every one of these, it doesn't go on
              the shelf. Full stop.
            </p>
            <Link
              href="/warranty"
              className="inline-flex items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.22em] text-ink link-underline"
            >
              Warranty terms in full
              <ArrowRight weight="bold" size={14} />
            </Link>
          </div>
        </div>

        {/* Four pillars strip */}
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
          {trustPillars.map((p, i) => {
            const Icon = pillarIcons[i];
            return (
              <li
                key={p.label}
                className="brick-ink p-4 md:p-5 flex flex-col gap-3"
              >
                <Icon weight="fill" size={26} className="text-yellow" />
                <span className="font-display font-bold text-sm md:text-base leading-tight">
                  {p.label}
                </span>
              </li>
            );
          })}
        </ul>

        {/* The 20-item grid */}
        <ol className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {qualityChecks.map((c) => {
            const Icon = checkIcons[c.icon] ?? ShieldCheck;
            return (
              <li key={c.n} className="brick p-4 md:p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full bg-ink text-yellow">
                    <Icon weight="fill" size={18} />
                  </span>
                  <span className="font-mono text-xs md:text-sm text-muted">
                    {c.n}
                  </span>
                </div>
                <span className="font-display font-bold text-base md:text-lg leading-tight text-ink">
                  {c.label}
                </span>
                {c.note && (
                  <span className="text-xs md:text-sm text-ink-2 leading-snug">
                    {c.note}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
