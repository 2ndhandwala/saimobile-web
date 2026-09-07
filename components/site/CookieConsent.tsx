"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { X } from "@phosphor-icons/react/dist/ssr";
import {
  ACCEPT_ALL,
  REJECT_ALL,
  readConsent,
  writeConsent,
  type ConsentRecord,
} from "@/lib/consent";

/** Footer link dispatches this to reopen preferences after initial consent.
 * DPDPA requires withdrawal to be as easy as giving consent, so the entry
 * point has to be permanently reachable, not just first-visit. */
export const OPEN_PREFERENCES_EVENT = "sm:open-consent-preferences";

type Categories = { analytics: boolean; advertising: boolean };

export function CookieConsent() {
  // `mounted` gates the first client-only paint. Rendering the banner on the
  // server would flash it on visitors who have already made a choice.
  const [mounted, setMounted] = useState(false);
  const [existing, setExisting] = useState<ConsentRecord | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [draft, setDraft] = useState<Categories>({
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    setMounted(true);
    setExisting(readConsent());
  }, []);

  useEffect(() => {
    function onOpen() {
      const current = readConsent();
      setDraft({
        analytics: current?.analytics ?? false,
        advertising: current?.advertising ?? false,
      });
      setPreferencesOpen(true);
    }
    window.addEventListener(OPEN_PREFERENCES_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, onOpen);
  }, []);

  const persist = useCallback((choice: Categories) => {
    const record = writeConsent({ necessary: true, ...choice });
    setExisting(record);
    setPreferencesOpen(false);
  }, []);

  if (!mounted) return null;

  const bannerVisible = !existing && !preferencesOpen;

  return (
    <>
      {bannerVisible && (
        <ConsentBanner
          onAcceptAll={() => persist({ analytics: true, advertising: true })}
          onRejectAll={() => persist({ analytics: false, advertising: false })}
          onCustomize={() => {
            setDraft({ analytics: false, advertising: false });
            setPreferencesOpen(true);
          }}
        />
      )}
      {preferencesOpen && (
        <PreferencesDialog
          draft={draft}
          setDraft={setDraft}
          onClose={() => setPreferencesOpen(false)}
          onSave={() => persist(draft)}
          onAcceptAll={() => persist({ analytics: true, advertising: true })}
          onRejectAll={() => persist({ analytics: false, advertising: false })}
        />
      )}
    </>
  );
}

/* ---------- Banner ---------- */

function ConsentBanner({
  onAcceptAll,
  onRejectAll,
  onCustomize,
}: {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onCustomize: () => void;
}) {
  const titleId = useId();
  return (
    <div
      role="region"
      aria-labelledby={titleId}
      className="
        fixed z-50
        left-3 right-3 md:left-auto md:right-6
        bottom-[calc(env(safe-area-inset-bottom,0px)+92px)] md:bottom-6
        md:w-[420px] md:max-w-[calc(100vw-3rem)]
      "
    >
      <div className="brick shadow-brick p-5 md:p-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          Cookies · DPDPA 2023
        </div>
        <h2
          id={titleId}
          className="mt-2 font-sans font-bold text-lg md:text-xl leading-snug text-ink"
        >
          We ask before we track.
        </h2>
        <p className="mt-2 font-sans text-sm leading-relaxed text-ink-2">
          This site uses cookies that are strictly necessary to run, and (only
          if you say yes) analytics and advertising cookies that help us
          understand how the site is used. Choose per category, or accept or
          reject all. You can change your choice any time from the footer.
        </p>
        <p className="mt-2 font-sans text-xs text-muted">
          Read the{" "}
          <Link
            href="/privacy#cookies"
            className="link-underline text-ink hover:text-ink"
          >
            Cookies section of our Privacy Policy
          </Link>
          .
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={onRejectAll}
            className="btn btn-ghost text-sm py-2 px-3"
          >
            Reject all
          </button>
          <button
            type="button"
            onClick={onCustomize}
            className="btn btn-ghost text-sm py-2 px-3"
          >
            Customise
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="btn btn-yellow text-sm py-2 px-3"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Preferences dialog ---------- */

function PreferencesDialog({
  draft,
  setDraft,
  onClose,
  onSave,
  onAcceptAll,
  onRejectAll,
}: {
  draft: Categories;
  setDraft: (c: Categories) => void;
  onClose: () => void;
  onSave: () => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
}) {
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocused.current =
      (document.activeElement as HTMLElement | null) ?? null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Move focus into the panel on open, a11y for keyboard users.
    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
      "button, [href], input, [tabindex]:not([tabindex='-1'])",
    );
    firstFocusable?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab") {
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          "button, [href], input, [tabindex]:not([tabindex='-1'])",
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-3 sm:p-6"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative brick shadow-brick w-full max-w-[560px]"
      >
        <div className="flex items-start justify-between gap-4 p-4 md:p-5 border-b border-line">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Cookie preferences · DPDPA 2023
            </div>
            <h2
              id={titleId}
              className="mt-1 font-sans font-bold text-lg leading-snug text-ink"
            >
              Choose what you allow.
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cookie preferences"
            className="shrink-0 -mr-1 -mt-1 p-2 rounded-full text-ink hover:bg-paper-2"
          >
            <X weight="bold" size={18} />
          </button>
        </div>

        <div className="p-4 md:p-5">
          <p id={descId} className="font-sans text-sm leading-relaxed text-ink-2">
            Necessary cookies always run. Everything else is off unless you enable it. Change your choice any time from the footer.
          </p>

          <div className="mt-3 flex flex-col gap-2">
            <CategoryRow
              title="Strictly necessary"
              subtitle="Required · always on"
              body="Keeps the site working and remembers your choice. Cannot be disabled."
              checked={true}
              disabled
              onChange={() => {}}
            />
            <CategoryRow
              title="Analytics"
              subtitle="Google Analytics 4"
              body="Counts page visits and referrers. No personal profile is built."
              checked={draft.analytics}
              onChange={(v) => setDraft({ ...draft, analytics: v })}
            />
            <CategoryRow
              title="Advertising"
              subtitle="Meta (Facebook) Pixel"
              body="Measures how ads on Instagram and Facebook lead to visits and enquiries."
              checked={draft.advertising}
              onChange={(v) => setDraft({ ...draft, advertising: v })}
            />
          </div>

          <p className="mt-3 font-sans text-xs text-muted">
            Full details in the{" "}
            <Link
              href="/privacy#cookies"
              className="link-underline text-ink hover:text-ink"
              onClick={onClose}
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <div className="p-4 md:p-5 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={onRejectAll}
            className="btn btn-ghost text-sm py-2 px-3"
          >
            Reject all
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="btn btn-ghost text-sm py-2 px-3"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={onSave}
            className="btn btn-yellow text-sm py-2 px-3"
          >
            Save preferences
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Category row + toggle ---------- */

function CategoryRow({
  title,
  subtitle,
  body,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  subtitle: string;
  body: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="border border-line rounded-md p-3 bg-paper-2/50">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="font-sans font-semibold text-ink text-base leading-snug">
            {title}
          </div>
          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {subtitle}
          </div>
        </div>
        <Toggle checked={checked} disabled={disabled} onChange={onChange} label={title} />
      </div>
      <p className="mt-2 font-sans text-sm leading-relaxed text-ink-2">{body}</p>
    </div>
  );
}

/* ---------- Footer trigger (permanent withdrawal path) ---------- */

/** Renders as a plain link in the Footer. Dispatches an event the mounted
 * <CookieConsent /> listens for. Kept as its own client component so the
 * Footer itself can stay a server component. */
export function CookiePreferencesLink({
  className,
  children = "Cookie preferences",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
      className={className}
    >
      {children}
    </button>
  );
}

function Toggle({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={`${label} cookies`}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border-2 border-ink
        transition-colors
        ${checked ? "bg-yellow" : "bg-paper"}
        ${disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <span
        aria-hidden
        className={`
          inline-block h-4 w-4 rounded-full bg-ink transition-transform
          ${checked ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
}
