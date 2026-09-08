"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, type ConsentChangeDetail } from "@/lib/consent";
import { classifyClick, trackEvent } from "@/lib/analytics";

const GA_ID = "G-D1WJ1EED2V";

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(readConsent()?.analytics === true);
    function onChange(e: Event) {
      const detail = (e as CustomEvent<ConsentChangeDetail>).detail;
      setEnabled(detail.analytics === true);
    }
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    function onClick(e: MouseEvent) {
      const anchor = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const hit = classifyClick(anchor.href);
      if (!hit) return;
      const source = anchor.dataset.gaSource;
      trackEvent(hit.name, {
        ...hit.params,
        link_url: anchor.href,
        ...(source ? { source } : {}),
      });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
