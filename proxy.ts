import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, tokenMatches } from "@/lib/admin-auth";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") return;
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  if (tokenMatches(cookie)) return;
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
