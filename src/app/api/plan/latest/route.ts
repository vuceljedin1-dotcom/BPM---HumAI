import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

    const plan = await sql`
      select p.id, p.status, pv.content
      from plans p
      join plan_versions pv on pv.plan_id = p.id
      where p.user_id = ${userId}
      order by pv.version desc
      limit 1
    `;
    if (!plan.rows.length) return NextResponse.json({ error: "no plan" }, { status: 404 });

    const row = plan.rows[0] as any;
    return NextResponse.json({ planId: row.id, status: row.status, content: row.content });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
