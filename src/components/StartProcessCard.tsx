"use client";
import { useState } from "react";

export default function StartProcessCard(){
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState<any>(null);

  async function start(){
    setLoading(true);
    const res = await fetch("/api/humai/infer", { method: "POST" });
    const data = await res.json();
    setOut(data);
    setLoading(false);
  }

  return (
    <div className="border rounded p-4">
      <h3 className="font-semibold mb-2">Start your first run</h3>
      <button disabled={loading} onClick={start} className="p-2 rounded bg-black text-white">
        {loading ? "Running…" : "Start Process"}
      </button>
      {out && <pre className="mt-4 text-sm overflow-auto">{JSON.stringify(out, null, 2)}</pre>}
    </div>
  );
}

