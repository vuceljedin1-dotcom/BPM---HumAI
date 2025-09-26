// src/app/api/register/route.ts
import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/src/lib/auth";
import { sql } from "@/lib/db";

export async function POST() {
  try {
    const supa = getSupabaseServer();
    const {
      data: { user },
    } = await supa.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    // Kreiraj usera ako ga nema u Postgres tabeli `users`
    await sql`
      insert into users (id, name, contact)
      values (${user.id}, ${user.user_metadata?.full_name || ""}, ${user.email})
      on conflict (id) do update
      set name = excluded.name,
          contact = excluded.contact
    `;

    // Upsert u profiles
    await sql`
      insert into profiles (id, user_id)
      values (${user.id}, ${user.id})
      on conflict (id) do nothing
    `;

    return NextResponse.json({ ok: true, userId: user.id });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
