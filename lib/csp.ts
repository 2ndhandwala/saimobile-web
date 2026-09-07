const directives: Record<string, string[]> = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    "https://www.googletagmanager.com",
  ],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": [
    "'self'",
    "data:",
    "blob:",
    "https://www.google-analytics.com",
    "https://www.googletagmanager.com",
  ],
  "font-src": ["'self'"],
  "connect-src": [
    "'self'",
    "https://www.google-analytics.com",
    "https://analytics.google.com",
    "https://www.googletagmanager.com",
  ],
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
