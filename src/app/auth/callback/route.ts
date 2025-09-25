import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const url = new URL(req.url);
  const redirectTo = url.searchParams.get("redirectedFrom") || "/onboarding";
  return NextResponse.redirect(new URL(redirectTo, process.env.NEXT_PUBLIC_SITE_URL));
}

