import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const fullName = (body.fullName || "").trim();
    const email = (body.email || "").trim();

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "fullName and email required" },
        { status: 400 }
      );
    }

    const user = await sql`
      insert into users (name, contact)
      values (${fullName}, ${email})
      returning id
    `;

    const userId = user.rows[0].id as string;
    return NextResponse.json({ userId });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
