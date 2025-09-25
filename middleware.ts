import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED = ["/dashboard", "/onboarding"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PROTECTED.some(p => pathname.startsWith(p))) {
    const supa = req.cookies.get("sb-access-token"); // Supabase set-cookie
    if (!supa) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      url.searchParams.set("redirectedFrom", pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

