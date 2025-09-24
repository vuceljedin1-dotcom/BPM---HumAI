import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest) {
// TODO: verify session/JWT or API key; set request context
return NextResponse.next();
}
