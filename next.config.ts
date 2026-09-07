import type { NextConfig } from "next";
import { CSP_HEADER_VALUE } from "./lib/csp";

const isProd = process.env.NODE_ENV === "production";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Enforce CSP in production; skip it in dev where Next.js injects HMR
  // inline scripts that don't match our JSON-LD hash allowlist.
  ...(isProd
    ? [{ key: "Content-Security-Policy", value: CSP_HEADER_VALUE }]
    : []),
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  experimental: {
    serverActions: { bodySizeLimit: "5mb" },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
