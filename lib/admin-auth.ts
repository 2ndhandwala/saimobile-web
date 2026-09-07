import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "admin-session";

export async function assertAdmin(): Promise<void> {
  const jar = await cookies();
  if (!tokenMatches(jar.get(ADMIN_COOKIE)?.value)) {
    throw new Error("Unauthorized");
  }
}

/** Cookie value = HMAC(password, "sai-admin-v1"). Rotating the password invalidates all sessions. */
export function sessionTokenFor(password: string): string {
  return createHmac("sha256", password).update("sai-admin-v1").digest("hex");
}

export function expectedToken(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return sessionTokenFor(pw);
}

export function passwordMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function tokenMatches(cookie: string | undefined): boolean {
  const expected = expectedToken();
  if (!expected || !cookie) return false;
  const a = Buffer.from(cookie);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
