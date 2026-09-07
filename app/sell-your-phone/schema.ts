import { z } from "zod";

export const BRANDS = [
  "Apple",
  "Samsung",
  "OnePlus",
  "Xiaomi / Redmi",
  "Vivo",
  "Oppo",
  "Realme",
  "Google Pixel",
  "Motorola",
  "Other",
] as const;

export const STORAGE = ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB"] as const;

export const CONDITIONS = [
  { value: "Like New", helper: "no visible wear at all" },
  { value: "Excellent", helper: "no scratches" },
  { value: "Good", helper: "very minor scratches" },
  { value: "Okay", helper: "visible scratches" },
] as const;

const CURRENT_YEAR = new Date().getFullYear();
export const YEARS: readonly string[] = [
  ...Array.from({ length: 9 }, (_, i) => String(CURRENT_YEAR - i)),
  "Not sure",
];

const conditionValues = CONDITIONS.map((c) => c.value) as [
  (typeof CONDITIONS)[number]["value"],
  ...(typeof CONDITIONS)[number]["value"][],
];

export const sellPhoneSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "That's a long name, trim it down"),
  phone: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      "Enter a 10-digit Indian mobile number (starts with 6-9)",
    ),
  brand: z.enum(BRANDS, {
    message: "Pick a brand",
  }),
  model: z
    .string()
    .trim()
    .min(2, "Add the model")
    .max(60, "Keep the model short"),
  storage: z.enum(STORAGE, {
    message: "Pick a storage size",
  }),
  colour: z
    .string()
    .trim()
    .min(2, "Add the colour")
    .max(30, "Keep the colour short"),
  yearBought: z.enum(YEARS as unknown as [string, ...string[]], {
    message: "Pick a year",
  }),
  condition: z.enum(conditionValues, {
    message: "Pick a condition",
  }),
  consent: z.literal(true, {
    message: "We need your OK to contact you about the phone",
  }),
});

export type SellPhoneInput = z.infer<typeof sellPhoneSchema>;
