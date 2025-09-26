import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/auth";

export async function GET() {
  const supa = getSupabaseServer();
  const { data: { user } } = await supa.auth.getUser();
  return NextResponse.json({ user });
}

