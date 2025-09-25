import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/src/lib/auth";

export async function POST() {
  const supa = getSupabaseServer();
  const { data: { user } } = await supa.auth.getUser();
  if(!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  await supa.from("profiles").upsert({ id: user.id, email: user.email });
  return NextResponse.json({ ok: true });
}

