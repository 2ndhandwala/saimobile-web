"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react";
import { submitSellPhoneLead } from "./actions";
import {
  BRANDS,
  CONDITIONS,
  STORAGE,
  YEARS,
  sellPhoneSchema,
  type SellPhoneInput,
} from "./schema";
import { links } from "@/content";
import {
  ConsentCheckbox,
  Field,
  FormErrorBlock,
  PhoneInput,
  SuccessCard,
  errorText,
  inputBase,
  labelBase,
  selectBase,
} from "@/components/form/primitives";

type Status = "idle" | "submitting" | "success" | "error";

export function SellForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [sendError, setSendError] = useState<string | null>(null);
  const [lastSubmission, setLastSubmission] = useState<SellPhoneInput | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    setError,
  } = useForm<SellPhoneInput>({
    resolver: zodResolver(sellPhoneSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      model: "",
      colour: "",
    },
  });

  async function onSubmit(values: SellPhoneInput) {
    setStatus("submitting");
    setSendError(null);
    const result = await submitSellPhoneLead(values);
    if (result.ok) {
      setLastSubmission(values);
      setStatus("success");
      reset();
      return;
    }
    if (result.fieldErrors) {
      for (const [key, msg] of Object.entries(result.fieldErrors)) {
        if (msg)
          setError(key as keyof SellPhoneInput, {
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
        titleTop="Got it."
        titleTail="We'll call you shortly."
        onReset={() => setStatus("idle")}
        resetLabel="Submit another phone"
        waMessage={links.whatsapp(
          "Hi, I just submitted the sell form. Can we chat?",
        )}
        waLabel="Message us on WhatsApp"
      >
        {lastSubmission ? (
          <>
            Your{" "}
            <strong className="text-yellow">
              {lastSubmission.brand} {lastSubmission.model}
            </strong>{" "}
            is with us. Someone from the shop will ring{" "}
            <strong className="text-yellow">+91 {lastSubmission.phone}</strong>{" "}
            with a price during shop hours (11 AM – 10 PM).
          </>
        ) : (
          <>Someone from the shop will call you during shop hours (11 AM – 10 PM).</>
        )}
      </SuccessCard>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="brick shadow-brick p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
    >
      <Field
        label="Your name"
        htmlFor="name"
        error={errors.name?.message}
        className="md:col-span-2"
      >
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="e.g. Rohit Sharma"
          className={inputBase}
          aria-invalid={!!errors.name}
          {...register("name")}
        />
      </Field>

      <Field
        label="Mobile number"
        htmlFor="phone"
        error={errors.phone?.message}
        hint="10 digits, no +91"
        className="md:col-span-2"
      >
        <PhoneInput id="phone" invalid={!!errors.phone} register={register("phone")} />
      </Field>

      <Field label="Brand" htmlFor="brand" error={errors.brand?.message}>
        <select
          id="brand"
          className={selectBase}
          aria-invalid={!!errors.brand}
          defaultValue=""
          {...register("brand")}
        >
          <option value="" disabled>
            Pick brand
          </option>
          {BRANDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Model" htmlFor="model" error={errors.model?.message}>
        <input
          id="model"
          type="text"
          placeholder="e.g. iPhone 13, Galaxy S23"
          className={inputBase}
          aria-invalid={!!errors.model}
          {...register("model")}
        />
      </Field>

      <Field label="Storage" htmlFor="storage" error={errors.storage?.message}>
        <select
          id="storage"
          className={selectBase}
          aria-invalid={!!errors.storage}
          defaultValue=""
          {...register("storage")}
        >
          <option value="" disabled>
            Pick storage
          </option>
          {STORAGE.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Colour" htmlFor="colour" error={errors.colour?.message}>
        <input
          id="colour"
          type="text"
          placeholder="e.g. Midnight Black"
          className={inputBase}
          aria-invalid={!!errors.colour}
          {...register("colour")}
        />
      </Field>

      <Field
        label="Year bought"
        htmlFor="yearBought"
        error={errors.yearBought?.message}
        className="md:col-span-2"
      >
        <select
          id="yearBought"
          className={selectBase}
          aria-invalid={!!errors.yearBought}
          defaultValue=""
          {...register("yearBought")}
        >
          <option value="" disabled>
            Pick a year
          </option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </Field>

      <fieldset className="md:col-span-2">
        <legend className={labelBase}>Condition</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CONDITIONS.map((c) => (
            <label
              key={c.value}
              className="group brick p-4 flex items-start gap-3 cursor-pointer transition-colors has-[input:checked]:bg-yellow has-[input:checked]:shadow-brick"
            >
              <input
                type="radio"
                value={c.value}
                className="mt-1 h-4 w-4 accent-ink"
                aria-invalid={!!errors.condition}
                {...register("condition")}
              />
              <span className="flex-1">
                <span className="block font-display font-bold text-base text-ink">
                  {c.value}
                </span>
                <span className="block text-sm text-ink-2 mt-0.5">
                  {c.helper}
                </span>
              </span>
            </label>
          ))}
        </div>
        {errors.condition?.message && (
          <p className={errorText} role="alert">
            {errors.condition.message}
          </p>
        )}
      </fieldset>

      <ConsentCheckbox
        label="I agree 2nd Hand Wala will contact me about this phone."
        error={errors.consent?.message}
        register={register("consent")}
        invalid={!!errors.consent}
      />

      <div className="md:col-span-2 flex flex-col gap-4">
        {status === "error" && sendError && <FormErrorBlock message={sendError} />}

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <button
            type="submit"
            disabled={!isValid || isSubmitting || status === "submitting"}
            className="btn btn-yellow w-full sm:w-auto text-base px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
          >
            {isSubmitting || status === "submitting" ? "Sending…" : "Get my quote"}
            {!(isSubmitting || status === "submitting") && (
              <ArrowRight weight="bold" size={18} />
            )}
          </button>
          <p className="text-xs md:text-sm text-muted font-mono uppercase tracking-widest">
            We&apos;ll call you back on the number above.
          </p>
        </div>

        <div className="pt-4 border-t border-line">
          <p className="text-sm text-ink-2 mb-3">
            Don&apos;t want to wait for a callback?
          </p>
          <Link
            href={links.whatsapp("Hi, I want to sell my phone.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost w-full sm:w-auto text-sm px-4 py-2.5"
          >
            <WhatsappLogo weight="fill" size={18} />
            WhatsApp us instead
            <ArrowUpRight weight="bold" size={14} />
          </Link>
        </div>
      </div>
    </form>
  );
}
