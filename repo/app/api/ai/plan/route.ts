import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
// HyperStack client using env URL + API key; respects idempotency
async function callHyperStackPlan(userId: string, payload: any, idem?: string) {
const url = process.env.HYPERSTACK_URL!;
const res = await fetch(url, {
method: "POST",
headers: {
"Authorization": `Bearer ${process.env.HYPERSTACK_API_KEY}`,
"Content-Type": "application/json",
...(idem ? { "Idempotency-Key": idem } : {})
},
body: JSON.stringify({
model: process.env.HYPERSTACK_MODEL,
input: payload,
meta: { userId }
})
});
if (!res.ok) {
const txt = await res.text();
throw new Error(`HyperStack error ${res.status}: ${txt}`);
}
return res.json(); // expect { jobId?, plan?, ... }
}
export async function POST(req: NextRequest) {
try {
const { userId } = await req.json();
if (!userId) return NextResponse.json({ error: "userId required" }, {
status: 400 });
const idem = req.headers.get("Idempotency-Key") ?? undefined;
// TODO: pull intake/profile for userId and build prompt from templates
const promptPayload = { kind: "intake_to_plan", userId };
10
const hs = await callHyperStackPlan(userId, promptPayload, idem);
const plan = await sql`insert into plans (user_id, plan_type, status,
provenance)
 values (${userId}, 'combined', 'proposed', ${JSON.stringify({
hyperstackJobId: hs?.jobId ?? null,
modelAlias: process.env.HYPERSTACK_MODEL,
promptHash: "sha256:..."
})}::jsonb)
 returning id`;
await sql`insert into plan_versions (plan_id, version, content)
 values (${plan.rows[0].id}, 1, ${JSON.stringify(hs?.plan ?? hs)}::jsonb)`;
return NextResponse.json({ planId: plan.rows[0].id, status: "proposed" });
} catch (e: any) {
console.error(e);
return NextResponse.json({ error: e?.message ?? "Unknown error" }, {
status: 500 });
}
}

