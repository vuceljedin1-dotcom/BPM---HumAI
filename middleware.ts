// middleware.ts (root)
import type { NextRequest } from "next/server";
export function middleware(_req: NextRequest) {
  // no-op: dozvoli sve
  return;
}
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // sve osim asseta
};
