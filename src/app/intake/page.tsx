"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function IntakePage() {
  const router = useRouter();
  const [loading,setLoading] = useState(false);
  const [err,setErr] = useState<string|null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr(null); setLoading(true);
    const fd = new FormData(e.currentTarget);

    // Minimalni payload (proširi po potrebi)
    const payload = {
      fullName: String(fd.get("fullName")||"").trim(),
      email: String(fd.get("email")||"").trim(),
    };

    try {
      // 1) Register (bez auth-a)
      const r1 = await fetch("/api/register-public", {
        method: "POST",
        headers: { "Content-Type":"application/json", "Idempotency-Key":"intake-"+crypto.randomUUID() },
        body: JSON.stringify(payload)
      });
      if (!r1.ok) throw new Error(await r1.text());
      const { userId } = await r1.json();
      if (!userId) throw new Error("Missing userId");

      // 2) Plan
      const r2 = await fetch("/api/ai/plan", {
        method: "POST",
        headers: { "Content-Type":"application/json", "Idempotency-Key":"plan-"+crypto.randomUUID() },
        body: JSON.stringify({ userId })
      });
      if (!r2.ok) throw new Error(await r2.text());
      const { planId } = await r2.json();

      // 3) Dashboard
      router.push(`/member/${userId}?plan=${encodeURIComponent(planId||"")}`);
    } catch (e:any) {
      setErr(e?.message||"Submission failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{maxWidth:860,margin:"40px auto"}}>
      <h1>Intake</h1>
      {err && <div style={{background:"#fee",border:"1px solid #f99",padding:12,marginBottom:12}}>{err}</div>}
      <form onSubmit={onSubmit}>
        <label>Ime i prezime*<br/><input name="fullName" required /></label><br/><br/>
        <label>Email*<br/><input name="email" type="email" required /></label><br/><br/>
        <button type="submit" disabled={loading} style={{padding:"10px 18px"}}>{loading?"Obrada...":"Pošalji i generiši plan"}</button>
      </form>
    </div>
  );
}
