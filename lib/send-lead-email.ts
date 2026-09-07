import { Resend } from "resend";

const LEAD_INBOX = "grotechdigital@gmail.com";

export type SendLeadResult = { ok: true } | { ok: false; error: string };

const GENERIC_ERROR =
  "We couldn't send that just now. Please try again in a minute.";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** IST timestamp: every lead is answered from the counter in Jabalpur. */
export function istTimestamp() {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });
}

/**
 * Sends a lead email to the shop's inbox. The rows shape (label, value) is
 * rendered as both plain text and a lightly-styled HTML table. `subject`,
 * `from` and `subtitle` are caller-specific; everything else is boilerplate.
 */
export async function sendLeadEmail({
  from,
  subject,
  subtitle,
  rows,
  footerLine,
  tag,
}: {
  from: string;
  subject: string;
  subtitle: string;
  rows: readonly [string, string][];
  footerLine: string;
  /** Prefix for console errors so per-form failures are greppable. */
  tag: string;
}): Promise<SendLeadResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(`[${tag}] RESEND_API_KEY is not set`);
    return { ok: false, error: GENERIC_ERROR };
  }

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f0f0f; max-width: 620px;">
      <h2 style="margin: 0 0 4px; font-size: 20px;">${escapeHtml(subject)}</h2>
      <p style="margin: 0 0 20px; color: #6b6459; font-size: 13px;">${escapeHtml(subtitle)}</p>
      <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding: 8px 12px 8px 0; color: #6b6459; vertical-align: top; white-space: nowrap; border-bottom: 1px solid #ebe4d6;">${escapeHtml(k)}</td>
            <td style="padding: 8px 0; color: #0f0f0f; font-weight: 600; border-bottom: 1px solid #ebe4d6; white-space: pre-wrap;">${escapeHtml(v)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="margin: 20px 0 0; font-size: 12px; color: #6b6459;">${escapeHtml(footerLine)}</p>
    </div>
  `.trim();

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to: [LEAD_INBOX],
      subject,
      text,
      html,
    });
    if (result.error) {
      console.error(`[${tag}] Resend error`, result.error);
      return { ok: false, error: GENERIC_ERROR };
    }
    return { ok: true };
  } catch (err) {
    console.error(`[${tag}] Unexpected send failure`, err);
    return { ok: false, error: GENERIC_ERROR };
  }
}
