"use server";

import { wholesaleSchema, type WholesaleInput } from "./schema";
import { istTimestamp, sendLeadEmail } from "@/lib/send-lead-email";

export type SubmitResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      fieldErrors?: Partial<Record<keyof WholesaleInput, string>>;
    };

export async function submitWholesaleInquiry(
  input: unknown,
): Promise<SubmitResult> {
  const parsed = wholesaleSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof WholesaleInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof WholesaleInput | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const data = parsed.data;
  const brands =
    data.preferredBrands && data.preferredBrands.length > 0
      ? data.preferredBrands.join(", ")
      : "Not specified";

  const rows: [string, string][] = [
    ["Contact name", data.contactName],
    ["Business / shop name", data.businessName],
    ["Phone", `+91 ${data.phone}`],
    ["City", data.city],
    ["Looking to buy", data.category],
    ["Preferred brands", brands],
    ["Quantity per order", data.quantity],
    ["Order frequency", data.frequency],
    ["Additional details", data.additionalDetails?.trim() || "-"],
    ["Consent to contact", "Yes"],
    ["Submitted (IST)", istTimestamp()],
  ];

  return sendLeadEmail({
    tag: "wholesale",
    from: "Wholesale Lead <leads@2ndhandwala.com>",
    subject: `New Wholesale Enquiry: ${data.businessName} · ${data.city}`,
    subtitle: `${data.businessName} · ${data.city} · ${data.category} · ${data.quantity}`,
    rows,
    footerLine: `Reply to the buyer at +91 ${data.phone}. Sent from the wholesale form on shreesaimobiles.`,
  });
}
