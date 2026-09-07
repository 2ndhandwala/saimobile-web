"use server";

import { sellPhoneSchema, type SellPhoneInput } from "./schema";
import { istTimestamp, sendLeadEmail } from "@/lib/send-lead-email";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof SellPhoneInput, string>> };

export async function submitSellPhoneLead(
  input: unknown,
): Promise<SubmitResult> {
  const parsed = sellPhoneSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof SellPhoneInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof SellPhoneInput | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const data = parsed.data;
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Phone", `+91 ${data.phone}`],
    ["Brand", data.brand],
    ["Model", data.model],
    ["Storage", data.storage],
    ["Colour", data.colour],
    ["Year bought", data.yearBought],
    ["Condition", data.condition],
    ["Consent to contact", "Yes"],
    ["Submitted (IST)", istTimestamp()],
  ];

  return sendLeadEmail({
    tag: "sell-your-phone",
    from: "Sell Lead <leads@2ndhandwala.com>",
    subject: `New Sell-Your-Phone Lead: ${data.brand} ${data.model}`,
    subtitle: `${data.brand} ${data.model} · ${data.storage} · ${data.colour}`,
    rows,
    footerLine: `Reply to the visitor at +91 ${data.phone}. Sent from the sell-your-phone form on shreesaimobiles.`,
  });
}
