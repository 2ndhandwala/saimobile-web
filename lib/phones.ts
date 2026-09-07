import "server-only";
import { head, put } from "@vercel/blob";
import { unstable_cache, updateTag } from "next/cache";
import { stockUsed, stockNew, type Condition } from "@/content";

export const MAX_PHONES = 8;

export type Phone = {
  id: string;
  brand: string;
  model: string;
  storage: string;
  ram?: string;
  color?: string;
  /** null = "Contact for price". Number = ₹ amount. */
  price: number | null;
  condition: Condition | "New";
  kind: "Used" | "New";
  /** Fallback image key (public/images/products/phone-<seed>.webp). */
  seed: string;
  /** Uploaded image URL. Wins over seed when present. */
  image?: string;
  alt: string;
};

const BLOB_PATH = "phones.json";
const CACHE_TAG = "phones";

function seedPhones(): Phone[] {
  return [...stockUsed, ...stockNew].map((p) => ({
    ...p,
    id: `${p.kind}-${p.seed}`,
    price: null,
  }));
}

async function fetchPhonesFromBlob(): Promise<Phone[]> {
  try {
    const meta = await head(BLOB_PATH);
    const res = await fetch(meta.url, { cache: "no-store" });
    if (!res.ok) return seedPhones();
    const data = (await res.json()) as Phone[];
    return Array.isArray(data) ? data : seedPhones();
  } catch {
    // No blob yet → serve the seed. First admin save will create it.
    return seedPhones();
  }
}

export const loadPhones = unstable_cache(fetchPhonesFromBlob, ["phones-v1"], {
  tags: [CACHE_TAG],
  revalidate: 3600,
});

export async function savePhones(phones: Phone[]): Promise<void> {
  await put(BLOB_PATH, JSON.stringify(phones), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false,
  });
  updateTag(CACHE_TAG);
}
