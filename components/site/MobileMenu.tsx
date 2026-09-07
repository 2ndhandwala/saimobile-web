"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { List, X, DeviceMobile } from "@phosphor-icons/react/dist/ssr";

type NavItem = { label: string; href: string };

export function MobileMenu({ items }: { items: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => setOpen(false);

  const drawer = (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[70] lg:hidden"
    >
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={close}
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
      />
      <div className="absolute right-0 top-0 h-dvh w-[86%] max-w-sm bg-paper border-l-2 border-ink shadow-brick overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between px-5 h-20 border-b-2 border-ink sticky top-0 bg-paper z-10">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Menu
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-ink bg-paper text-ink"
          >
            <X weight="bold" size={20} />
          </button>
        </div>

        <nav className="px-5 py-4 flex flex-col">
          {items.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={close}
              className="font-display font-bold text-2xl text-ink py-3 border-b border-line"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/sell-your-phone"
            onClick={close}
            className="btn btn-yellow w-full text-base py-3 mt-6"
            aria-label="Sell Your Phone"
          >
            <DeviceMobile weight="fill" size={18} />
            Sell Your Phone
          </Link>
        </nav>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border-2 border-ink bg-paper text-ink"
      >
        <List weight="bold" size={22} />
      </button>
      {mounted && open ? createPortal(drawer, document.body) : null}
    </>
  );
}
