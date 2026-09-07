"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react";
import { submitWholesaleInquiry } from "./actions";
import {
  CATEGORIES,
  FREQUENCIES,
  PREFERRED_BRANDS,
  QUANTITIES,
  wholesaleSchema,
  type WholesaleInput,
} from "./schema";
import { links } from "@/content";
import {
  ConsentCheckbox,
  Field,
  FormErrorBlock,
  PhoneInput,
  SuccessCard,
  inputBase,
  labelBase,
  selectBase,
} from "@/components/form/primitives";

type Status = "idle" | "submitting" | "success" | "error";

export function WholesaleForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [sendError, setSendError] = useState<string | null>(null);
  const [lastSubmission, setLastSubmission] = useState<WholesaleInput | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<WholesaleInput>({
    resolver: zodResolver(wholesaleSchema),
    mode: "onTouched",
    defaultValues: {
      contactName: "",
      businessName: "",
      phone: "",
      city: "",
      additionalDetails: "",
      preferredBrands: [],
    },
  });

  async function onSubmit(values: WholesaleInput) {
    setStatus("submitting");
    setSendError(null);
    const result = await submitWholesaleInquiry(values);
    if (result.ok) {
      setLastSubmission(values);
      setStatus("success");
      reset();
      return;
    }
    if (result.fieldErrors) {
      for (const [key, msg] of Object.entries(result.fieldErrors)) {
        if (msg)
          setError(key as keyof WholesaleInput, {
            type: "server",
            message: msg,
          });
      }
    }
    setSendError(result.error);
    setStatus("error");
  }

  if (status === "success") {
    return (
      <SuccessCard
        titleTop="Enquiry received."
        titleTail="We'll reach out to discuss stock and pricing."
        onReset={() => setStatus("idle")}
        resetLabel="Send another enquiry"
        waMessage={links.whatsapp(
          "Hi, I just submitted the wholesale form. Can we chat?",
        )}
        waLabel="Message the wholesale desk"
      >
        {lastSubmission ? (
          <>
            Someone from the wholesale desk will contact{" "}
            <strong className="text-yellow">{lastSubmission.businessName}</strong>{" "}
            at{" "}
            <strong className="text-yellow">+91 {lastSubmission.phone}</strong>{" "}
            during shop hours (11 AM – 10 PM).
          </>
        ) : (
          <>Someone from the wholesale desk will reach out during shop hours (11 AM – 10 PM).</>
        )}
      </SuccessCard>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="brick shadow-brick p-5 md:p-7 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
    >
      <Field
        label="Contact name"
        htmlFor="contactName"
        error={errors.contactName?.message}
      >
        <input
          id="contactName"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          className={inputBase}
          aria-invalid={!!errors.contactName}
          {...register("contactName")}
        />
      </Field>

      <Field
        label="Business / shop name"
        htmlFor="businessName"
        error={errors.businessName?.message}
      >
        <input
          id="businessName"
          type="text"
          autoComplete="organization"
          placeholder="e.g. Mahakal Mobiles"
          className={inputBase}
          aria-invalid={!!errors.businessName}
          {...register("businessName")}
        />
      </Field>

      <Field
        label="Mobile number"
        htmlFor="phone"
        hint="10 digits, no +91"
        error={errors.phone?.message}
      >
        <PhoneInput id="phone" invalid={!!errors.phone} register={register("phone")} />
      </Field>

      <Field label="City" htmlFor="city" error={errors.city?.message}>
        <input
          id="city"
          type="text"
          autoComplete="address-level2"
          placeholder="e.g. Jabalpur, Bhopal, Indore"
          className={inputBase}
          aria-invalid={!!errors.city}
          {...register("city")}
        />
      </Field>

      <Field
        label="What are you looking to buy?"
        htmlFor="category"
        error={errors.category?.message}
        className="md:col-span-2"
      >
        <select
          id="category"
          className={selectBase}
          aria-invalid={!!errors.category}
          defaultValue=""
          {...register("category")}
        >
          <option value="" disabled>
            Pick a category
          </option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>

      <fieldset className="md:col-span-2">
        <legend className={labelBase}>
          Preferred brands
          <span className="font-sans text-[11px] normal-case tracking-normal text-muted">
            · optional, pick any
          </span>
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {PREFERRED_BRANDS.map((b) => (
            <label
              key={b}
              className="group brick px-3 py-2.5 flex items-center gap-2 cursor-pointer transition-colors has-[input:checked]:bg-yellow has-[input:checked]:shadow-brick"
            >
              <input
                type="checkbox"
                value={b}
                className="h-4 w-4 accent-ink shrink-0"
                {...register("preferredBrands")}
              />
              <span className="font-display font-bold text-[13px] leading-tight text-ink">
                {b}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field
        label="Quantity per order"
        htmlFor="quantity"
        error={errors.quantity?.message}
      >
        <select
          id="quantity"
          className={selectBase}
          aria-invalid={!!errors.quantity}
          defaultValue=""
          {...register("quantity")}
        >
          <option value="" disabled>
            Pick a range
          </option>
          {QUANTITIES.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="How often will you order?"
        htmlFor="frequency"
        error={errors.frequency?.message}
      >
        <select
          id="frequency"
          className={selectBase}
          aria-invalid={!!errors.frequency}
          defaultValue=""
          {...register("frequency")}
        >
          <option value="" disabled>
            Pick a cadence
          </option>
          {FREQUENCIES.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Additional details"
        htmlFor="additionalDetails"
        hint="optional"
        error={errors.additionalDetails?.message}
        className="md:col-span-2"
      >
        <textarea
          id="additionalDetails"
          rows={4}
          placeholder="Specific models, condition grade, timelines, or anything else we should know."
          className={`${inputBase} resize-y min-h-[112px]`}
          aria-invalid={!!errors.additionalDetails}
          {...register("additionalDetails")}
        />
      </Field>

      <ConsentCheckbox
        label="I agree 2nd Hand Wala will contact me about this enquiry."
        error={errors.consent?.message}
        register={register("consent")}
        invalid={!!errors.consent}
      />

      <div className="md:col-span-2 flex flex-col gap-4">
        {status === "error" && sendError && <FormErrorBlock message={sendError} />}

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <button
            type="submit"
            disabled={isSubmitting || status === "submitting"}
            className="btn btn-yellow w-full sm:w-auto text-base px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
          >
            {isSubmitting || status === "submitting" ? "Sending…" : "Send enquiry"}
            {!(isSubmitting || status === "submitting") && (
              <ArrowRight weight="bold" size={18} />
            )}
          </button>
          <p className="text-xs md:text-sm text-muted font-mono uppercase tracking-widest">
            We reply on WhatsApp or a call, whichever you prefer.
          </p>
        </div>

        <div className="pt-4 border-t border-line">
          <p className="text-sm text-ink-2 mb-3">Prefer to talk right now?</p>
          <Link
            href={links.whatsapp(
              "Hi, I'm interested in bulk sourcing from 2nd Hand Wala.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost w-full sm:w-auto text-sm px-4 py-2.5"
          >
            <WhatsappLogo weight="fill" size={18} />
            WhatsApp the wholesale desk
            <ArrowUpRight weight="bold" size={14} />
          </Link>
        </div>
      </div>
    </form>
  );
}
