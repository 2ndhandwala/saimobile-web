import { ImageResponse } from "next/og";
import { shop } from "@/content";

// Route segment config
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${shop.brandName}: ${shop.tagline}`;

// Palette lifted from app/globals.css @theme so this stays in sync visually.
const paper = "#F4EFE6";
const paper2 = "#EBE4D6";
const ink = "#0F0F0F";
const ink2 = "#2A2A2A";
const muted = "#6B6459";
const yellow = "#FFCE00";
const line = "#D9D1C0";

async function loadFont(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url, {
      // Cache at build time; this runs once when the OG image is prerendered.
      cache: "force-cache",
    });
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [display800, sans500, sans700, mono500] = await Promise.all([
    loadFont(
      "https://cdn.jsdelivr.net/npm/@fontsource/bricolage-grotesque@5/files/bricolage-grotesque-latin-800-normal.woff",
    ),
    loadFont(
      "https://cdn.jsdelivr.net/npm/@fontsource/space-grotesk@5/files/space-grotesk-latin-500-normal.woff",
    ),
    loadFont(
      "https://cdn.jsdelivr.net/npm/@fontsource/space-grotesk@5/files/space-grotesk-latin-700-normal.woff",
    ),
    loadFont(
      "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5/files/jetbrains-mono-latin-500-normal.woff",
    ),
  ]);

  const fonts = [
    display800 && {
      name: "Display",
      data: display800,
      weight: 800 as const,
      style: "normal" as const,
    },
    sans500 && {
      name: "Sans",
      data: sans500,
      weight: 500 as const,
      style: "normal" as const,
    },
    sans700 && {
      name: "Sans",
      data: sans700,
      weight: 700 as const,
      style: "normal" as const,
    },
    mono500 && {
      name: "Mono",
      data: mono500,
      weight: 500 as const,
      style: "normal" as const,
    },
  ].filter(Boolean) as {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 500 | 700 | 800;
    style: "normal";
  }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: paper,
          fontFamily: "Sans, sans-serif",
          color: ink,
          position: "relative",
        }}
      >
        {/* Top ink band, carries the marquee-style shop-hours signal */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: ink,
            color: yellow,
            paddingLeft: 64,
            paddingRight: 64,
            paddingTop: 14,
            paddingBottom: 14,
            fontFamily: "Mono, monospace",
            fontSize: 18,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          <span>Open 7 Days · 11 AM – 10 PM</span>
          <span>{shop.address.locality} · {shop.address.region}</span>
        </div>

        {/* Body */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            paddingLeft: 64,
            paddingRight: 64,
            paddingTop: 48,
            paddingBottom: 48,
          }}
        >
          {/* Wordmark: "2ND HAND WALA JBP" with yellow underline motif */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexWrap: "wrap",
              fontFamily: "Display, sans-serif",
              fontWeight: 800,
              fontSize: 104,
              lineHeight: 0.95,
              letterSpacing: -3,
              color: ink,
            }}
          >
            <span style={{ display: "flex" }}>2ND HAND&nbsp;</span>
            <span style={{ display: "flex", position: "relative" }}>
              {/* Yellow highlight bar drawn FIRST so the text composites on top
                * (Satori has no z-index; DOM order is the stacking rule). */}
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 12,
                  height: 20,
                  backgroundColor: yellow,
                  transform: "rotate(-1.5deg)",
                }}
              />
              <span style={{ display: "flex", position: "relative" }}>WALA</span>
            </span>
            <span style={{ display: "flex" }}>&nbsp;JBP</span>
          </div>

          {/* Subline: legal / location */}
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontFamily: "Sans, sans-serif",
              fontWeight: 700,
              fontSize: 34,
              letterSpacing: -0.5,
              color: ink2,
            }}
          >
            Shri Sai Mobile
            <span style={{ color: muted, marginLeft: 14, marginRight: 14 }}>·</span>
            <span style={{ color: ink2 }}>{shop.address.line1.split(",")[0]}</span>
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              marginTop: 40,
              marginBottom: 32,
              height: 2,
              backgroundColor: line,
            }}
          />

          {/* Pitch line */}
          <div
            style={{
              display: "flex",
              fontFamily: "Sans, sans-serif",
              fontWeight: 500,
              fontSize: 30,
              lineHeight: 1.3,
              color: ink2,
              maxWidth: 900,
            }}
          >
            New & second-hand phones. Every used phone: 20-point check, warranty,
            bill, box, original accessories.
          </div>

          {/* Social proof row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "auto",
              paddingTop: 40,
              fontFamily: "Mono, monospace",
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: muted,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: ink,
                color: yellow,
                paddingLeft: 14,
                paddingRight: 14,
                paddingTop: 8,
                paddingBottom: 8,
                borderRadius: 999,
                marginRight: 18,
              }}
            >
              {/* Star drawn as inline SVG: Latin font subsets omit U+2605,
                * and Satori's dynamic-font fallback returns 400. */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                style={{ display: "flex", marginRight: 10 }}
              >
                <path
                  d="M12 2.5l2.9 6.4 6.9.7-5.2 4.7 1.5 6.8L12 17.6l-6.1 3.5 1.5-6.8L2.2 9.6l6.9-.7L12 2.5z"
                  fill={yellow}
                />
              </svg>
              {shop.rating} · {shop.reviewCount} Google reviews
            </span>
            <span style={{ display: "flex", marginRight: 18, color: muted }}>·</span>
            <span style={{ display: "flex", color: ink2 }}>
              {shop.followersShort} on Instagram
            </span>
            <span style={{ display: "flex", marginLeft: 18, marginRight: 18, color: muted }}>·</span>
            <span style={{ display: "flex", color: ink2 }}>
              {shop.yearsRunning} years at Ekta Chowk
            </span>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            display: "flex",
            height: 12,
            backgroundColor: yellow,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}
