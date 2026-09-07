import { z } from "zod";

export const CATEGORIES = [
  "Second-hand phones",
  "New phones",
  "Both",
] as const;

export const PREFERRED_BRANDS = [
  "Apple",
  "Samsung",
  "OnePlus",
  "Xiaomi / Redmi",
  "Vivo",
  "Oppo",
  "Realme",
  "Google Pixel",
  "Motorola",
  "Any / Open to all",
] as const;

export const QUANTITIES = [
  "5–10 units",
  "11–25 units",
  "26–50 units",
  "50+ units",
] as const;

export const FREQUENCIES = [
  "One-time",
  "Monthly",
  "Weekly",
  "Not sure yet",
] as const;

export const wholesaleSchema = z.object({
  contactName: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "That's a long name, trim it down"),
  businessName: z
    .string()
    .trim()
    .min(2, "Please add your business or shop name")
    .max(100, "Keep the business name shorter"),
  phone: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      "Enter a 10-digit Indian mobile number (starts with 6-9)",
    ),
  city: z
    .string()
    .trim()
    .min(2, "Add your city")
    .max(60, "Keep the city name shorter"),
  category: z.enum(CATEGORIES, {
    message: "Pick what you're sourcing",
  }),
  preferredBrands: z.array(z.enum(PREFERRED_BRANDS)),
  quantity: z.enum(QUANTITIES, {
    message: "Pick an order size",
  }),
  frequency: z.enum(FREQUENCIES, {
    message: "Pick an order cadence",
  }),
  additionalDetails: z
    .string()
    .trim()
    .max(2000, "Keep details under 2000 characters")
    .optional()
    .or(z.literal("")),
  consent: z.literal(true, {
    message: "We need your OK to contact you about this enquiry",
  }),
});

export type WholesaleInput = z.infer<typeof wholesaleSchema>;
