"use client";
import { useState } from "react";

const inputCls =
  "border-2 border-ink rounded-md px-3 py-2 text-base bg-paper w-full";
const labelCls =
  "flex flex-col gap-1 text-xs uppercase tracking-widest font-mono";

export function PriceField({
  defaultPrice,
  defaultContact,
}: {
  defaultPrice: number | null | undefined;
  defaultContact: boolean;
}) {
  const [contact, setContact] = useState(defaultContact);
  return (
    <>
      <label className={labelCls}>
        Price (₹)
        <input
          type="number"
          inputMode="numeric"
          name="price"
          min={0}
          step={100}
          defaultValue={defaultPrice ?? ""}
          onChange={(e) => setContact(!e.target.value)}
          className={inputCls}
        />
      </label>
      <label className="flex items-center gap-2 text-sm self-end pb-2">
        <input
          type="checkbox"
          name="contactForPrice"
          checked={contact}
          onChange={(e) => setContact(e.target.checked)}
          className="h-5 w-5"
        />
        Contact for price
      </label>
    </>
  );
}
