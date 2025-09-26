import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/auth";
import { callHyperstack } from "@/lib/hyperstack";

export async function POST() {
  const supa = getSupabaseServer();
  const { data: { user } } = await supa.auth.getUser();
  if(!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const model = process.env.HYPERSTACK_MODEL!;
  const input = { task: "bpm_first_run", user_id: user.id };

  const { data, error: hyperErr } = await (async () => {
    try { return { data: await callHyperstack(model, input), error: null }; }
    catch(e:any){ return { data: null, error: e.message }; }
  })();

  const payload = {
    user_id: user.id,
    model_alias: model,
    status: hyperErr ? "error" : "done",
    input_json: input,
    output_json: data ?? { error: hyperErr }
  };

  await supa.from("process_runs").insert(payload);
  if (hyperErr) return NextResponse.json({ error: hyperErr }, { status: 500 });
  return NextResponse.json(data);
}

