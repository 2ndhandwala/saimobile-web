import type { Metadata } from "next";
import { loginAction } from "./actions";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string }>;
}) {
  const { e } = await searchParams;
  return (
    <main className="mx-auto max-w-sm px-4 py-16">
      <h1 className="font-display font-extrabold text-3xl mb-6">Admin</h1>
      <form action={loginAction} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm">
          Password
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            autoFocus
            className="border-2 border-ink rounded-md px-3 py-3 text-base bg-paper"
          />
        </label>
        {e ? (
          <p className="text-sm text-red-700">Wrong password.</p>
        ) : null}
        <button
          type="submit"
          className="btn btn-yellow py-3 text-base font-bold"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
