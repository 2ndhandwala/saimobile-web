import { createHash } from "node:crypto";
import { ALL_INLINE_JSONLD } from "./jsonld-payloads";

function sha256csp(input: string): string {
  const digest = createHash("sha256").update(input, "utf8").digest("base64");
  return `'sha256-${digest}'`;
}

const INLINE_SCRIPT_HASHES = ALL_INLINE_JSONLD.map((payload) =>
  sha256csp(JSON.stringify(payload)),
);

const directives: Record<string, string[]> = {
  "default-src": ["'self'"],
  "script-src": ["'self'", ...INLINE_SCRIPT_HASHES],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:", "blob:"],
  "font-src": ["'self'"],
  "connect-src": ["'self'"],
  "frame-src": ["https://www.instagram.com", "https://www.google.com"],
  "frame-ancestors": ["'self'"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "upgrade-insecure-requests": [],
};

export const CSP_HEADER_VALUE = Object.entries(directives)
  .map(([key, sources]) =>
    sources.length === 0 ? key : `${key} ${sources.join(" ")}`,
  )
  .join("; ");
