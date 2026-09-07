"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  WarningCircle,
  WhatsappLogo,
} from "@phosphor-icons/react";

export const inputBase =
  "w-full font-sans text-base text-ink bg-paper border-2 border-ink rounded-brick px-4 py-3 placeholder:text-muted focus:outline-none focus:bg-paper-2 transition-colors";
export const selectBase = `${inputBase} form-select`;
export const labelBase =
  "font-mono text-[11px] uppercase tracking-[0.22em] text-ink flex items-center gap-2 mb-2";
export const errorText = "mt-2 text-sm text-danger font-sans font-medium";

export function Field({
  label,
  htmlFor,
  hint,
  error,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={labelBase}>
        {label}
        {hint && (
          <span className="font-sans text-[11px] normal-case tracking-normal text-muted">
            · {hint}
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className={errorText} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** +91 phone-number input. The child input is passed via `register` to keep
 * react-hook-form wiring at the form level. */
export function PhoneInput({
  id,
  invalid,
  register,
}: {
  id: string;
  invalid: boolean;
  register: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <div className="flex items-stretch">
      <span className="inline-flex items-center px-3 border-2 border-ink border-r-0 rounded-l-brick bg-ink text-yellow font-mono text-sm">
        +91
      </span>
      <input
        id={id}
        type="tel"
        inputMode="numeric"
        maxLength={10}
        autoComplete="tel-national"
        placeholder="97556 66024"
        className={`${inputBase} rounded-l-none`}
        aria-invalid={invalid}
        {...register}
      />
    </div>
  );
}

export function FormErrorBlock({
  message,
}: {
  message: string;
}) {
  return (
    <div
      role="alert"
      className="brick p-4 flex items-start gap-3 bg-[color-mix(in_srgb,var(--color-danger)_10%,transparent)] border-danger"
    >
      <WarningCircle
        weight="fill"
        size={22}
        className="text-danger shrink-0 mt-0.5"
      />
      <div className="flex-1">
        <p className="font-display font-bold text-ink">
          Something didn&apos;t go through.
        </p>
        <p className="text-sm text-ink-2 mt-1">{message}</p>
        <button
          type="submit"
          className="mt-3 btn btn-yellow text-sm py-2 px-4"
        >
          Try again
          <ArrowRight weight="bold" size={16} />
        </button>
      </div>
    </div>
  );
}

/** Consent-to-contact checkbox: identical between the two lead forms. */
export function ConsentCheckbox({
  label,
  error,
  register,
  invalid,
}: {
  label: string;
  error?: string;
  register: React.InputHTMLAttributes<HTMLInputElement>;
  invalid: boolean;
}) {
  return (
    <div className="md:col-span-2">
      <label className="brick-ink p-4 flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-yellow"
          aria-invalid={invalid}
          {...register}
        />
        <span className="text-sm md:text-base leading-snug text-paper">
          {label}
        </span>
      </label>
      {error && (
        <p className={errorText} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** Full-width success card shown when a lead form submits successfully.
 * Children carry the domain-specific body (which fields to echo back). */
export function SuccessCard({
  titleTop,
  titleTail,
  onReset,
  resetLabel,
  waMessage,
  waLabel,
  children,
}: {
  titleTop: string;
  titleTail: string;
  onReset: () => void;
  resetLabel: string;
  waMessage: string;
  waLabel: string;
  children: ReactNode;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="brick-ink shadow-brick-yellow p-6 md:p-10 flex flex-col items-start gap-5"
    >
      <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-yellow text-ink">
        <CheckCircle weight="fill" size={30} />
      </span>
      <div>
        <h3 className="font-display font-extrabold tracking-[-0.02em] leading-[0.95] text-3xl md:text-5xl">
          {titleTop} <br />
          <span className="text-yellow">{titleTail}</span>
        </h3>
        <p className="mt-4 max-w-md text-paper/85 text-base md:text-lg">
          {children}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Link
          href={waMessage}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-yellow"
        >
          <WhatsappLogo weight="fill" size={18} />
          {waLabel}
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="btn btn-ghost text-paper border-paper hover:text-yellow"
        >
          {resetLabel}
        </button>
      </div>
    </div>
  );
}
