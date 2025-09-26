import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/auth";            // ← promjena
import { callHyperstack } from "@/lib/hyperstack";         // ← promjena

export async function POST() {
  const supa = getSupabaseServer();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const model = process.env.HYPERSTACK_MODEL!;
  const input = { task: "bpm_first_run", user_id: user.id };

  try {
    const data = await callHyperstack(model, input);
    await supa.from("process_runs").insert({
      user_id: user.id,
      model_alias: model,
      status: "done",
      input_json: input,
      output_json: data
    });
    return NextResponse.json(data);
  } catch (e: any) {
    await supa.from("process_runs").insert({
      user_id: user.id,
      model_alias: model,
      status: "error",
      input_json: input,
      output_json: { error: e?.message ?? "HyperStack error" }
    });
    return NextResponse.json({ error: e?.message ?? "HyperStack error" }, { status: 500 });
  }
}
