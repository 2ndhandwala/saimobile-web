import type { MetadataRoute } from "next";
import { shop } from "@/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: shop.brandName,
    short_name: shop.brandName,
    description:
      "New and second-hand phones at Ekta Chowk, Jabalpur. Every used phone: 20-point check, warranty, bill, box, original accessories.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    lang: "en-IN",
    dir: "ltr",
    background_color: "#f4efe6",
    theme_color: "#f4efe6",
    categories: ["shopping", "business"],
    icons: [
      {
        src: "/images/icon-any.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
