"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, passwordMatches, sessionTokenFor } from "@/lib/admin-auth";

export async function loginAction(formData: FormData) {
  const password = formData.get("password");
  if (typeof password !== "string" || !passwordMatches(password)) {
    redirect("/admin/login?e=1");
  }
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, sessionTokenFor(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/admin");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
