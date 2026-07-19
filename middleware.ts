import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "vgg_admin";
const AUTH_SALT = "viagogo-admin-salt-v1";

async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const expected = await sha256Hex((process.env.ADMIN_PASSWORD || "admin123") + AUTH_SALT);
  const cookie = req.cookies.get(SESSION_COOKIE)?.value;
  if (cookie === expected) return NextResponse.next();

  const login = req.nextUrl.clone();
  login.pathname = "/admin/login";
  login.searchParams.set("from", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin/:path*"],
};
