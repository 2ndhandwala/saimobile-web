"use server";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { del, put } from "@vercel/blob";
import { z } from "zod";
import { assertAdmin } from "@/lib/admin-auth";
import { loadPhones, savePhones, MAX_PHONES, type Phone } from "@/lib/phones";

export type ActionState = { error?: string; ok?: boolean };

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

async function uploadImage(file: File | null): Promise<string | undefined> {
  if (!file || file.size === 0) return undefined;
  if (!file.type.startsWith("image/")) throw new Error("Not an image");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Image over 5MB");
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const blob = await put(`phone-images/${randomUUID()}.${ext}`, file, {
    access: "public",
    contentType: file.type,
    addRandomSuffix: false,
  });
  return blob.url;
}

async function deleteBlob(url: string | undefined) {
  if (!url) return;
  try {
    await del(url);
  } catch {
    // best effort: an orphan blob is harmless
  }
}

function toState(e: unknown): ActionState {
  return { error: e instanceof Error ? e.message : "Something went wrong" };
}

const phoneSchema = z.object({
  brand: z.string().min(1).max(40),
  model: z.string().min(1).max(60),
  storage: z.string().min(1).max(20),
  ram: z.string().max(20).optional(),
  color: z.string().max(40).optional(),
  price: z.string().max(10).optional(),
  contactForPrice: z.string().optional(),
  condition: z.enum(["Like New", "Excellent", "Good", "New"]),
  kind: z.enum(["Used", "New"]),
});

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function autoAlt(p: {
  kind: string;
  brand: string;
  model: string;
  storage: string;
  color?: string;
  condition: string;
}): string {
  const parts = [
    p.kind === "New" ? "Brand-new" : "Used",
    p.brand,
    p.model,
    p.storage,
    p.color,
    `${p.condition.toLowerCase()} condition`,
    "at 2nd Hand Wala",
  ].filter(Boolean);
  return parts.join(", ");
}

function parsePhone(fd: FormData): Omit<Phone, "id" | "image"> {
  const raw = phoneSchema.parse({
    brand: fd.get("brand"),
    model: fd.get("model"),
    storage: fd.get("storage"),
    ram: fd.get("ram") || undefined,
    color: fd.get("color") || undefined,
    price: fd.get("price") || undefined,
    contactForPrice: fd.get("contactForPrice") || undefined,
    condition: fd.get("condition"),
    kind: fd.get("kind"),
  });
  const priceNum =
    raw.contactForPrice || !raw.price ? null : Number(raw.price);
  const price = priceNum != null && Number.isFinite(priceNum) ? priceNum : null;
  const brand = raw.brand.trim();
  const model = raw.model.trim();
  const storage = raw.storage.trim();
  const color = raw.color?.trim() || undefined;
  return {
    brand,
    model,
    storage,
    ram: raw.ram?.trim() || undefined,
    color,
    price,
    condition: raw.condition,
    kind: raw.kind,
    seed: slugify(`${brand}-${model}`),
    alt: autoAlt({ ...raw, brand, model, storage, color }),
  };
}

export async function savePhoneAction(
  _prev: ActionState,
  fd: FormData,
): Promise<ActionState> {
  try {
    await assertAdmin();
    const id = String(fd.get("id") ?? "");
    if (!id) return { error: "Missing id" };
    const patch = parsePhone(fd);
    const phones = await loadPhones();
    const idx = phones.findIndex((p) => p.id === id);
    if (idx === -1) return { error: "Not found" };
    const uploaded = await uploadImage(fd.get("image") as File | null);
    const oldImage = phones[idx].image;
    const next = phones.slice();
    next[idx] = { ...patch, id, image: uploaded ?? oldImage };
    await savePhones(next);
    if (uploaded && oldImage && oldImage !== uploaded) {
      await deleteBlob(oldImage);
    }
    revalidatePath("/");
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return toState(e);
  }
}

export async function addPhoneAction(
  _prev: ActionState,
  fd: FormData,
): Promise<ActionState> {
  try {
    await assertAdmin();
    const phones = await loadPhones();
    if (phones.length >= MAX_PHONES) {
      return { error: `Max ${MAX_PHONES} phones — delete one first.` };
    }
    const patch = parsePhone(fd);
    const uploaded = await uploadImage(fd.get("image") as File | null);
    if (!uploaded) return { error: "Photo is required." };
    await savePhones([
      ...phones,
      { ...patch, id: randomUUID(), image: uploaded },
    ]);
    revalidatePath("/");
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return toState(e);
  }
}

export async function deletePhoneAction(
  _prev: ActionState,
  fd: FormData,
): Promise<ActionState> {
  try {
    await assertAdmin();
    const id = String(fd.get("id") ?? "");
    if (!id) return { error: "Missing id" };
    const phones = await loadPhones();
    const target = phones.find((p) => p.id === id);
    await savePhones(phones.filter((p) => p.id !== id));
    await deleteBlob(target?.image);
    revalidatePath("/");
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return toState(e);
  }
}
