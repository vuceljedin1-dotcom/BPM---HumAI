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

    const payload = {
      fullName: String(fd.get("fullName")||"").trim(),
      email: String(fd.get("email")||"").trim(),
      phone: String(fd.get("phone")||"") || null,
      dateOfBirth: String(fd.get("dateOfBirth")||"") || null,
      gender: String(fd.get("gender")||"") || null,
      smartGoal: String(fd.get("smartGoal")||"") || null,
      goals: Array.from(fd.getAll("goals")).map(String),
      baseline: {
        height_cm: Number(fd.get("height_cm")||0)||null,
        weight_kg: Number(fd.get("weight_kg")||0)||null,
        bmi: Number(fd.get("bmi")||0)||null,
      },
      consents: [{ kind:"gdpr", version:"v1", accepted: !!fd.get("consent_gdpr") }]
    };

    try {
      const r1 = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type":"application/json", "Idempotency-Key": "intake-"+crypto.randomUUID() },
        body: JSON.stringify(payload)
      });
      if (!r1.ok) throw new Error(await r1.text());
      const { userId } = await r1.json();
      if (!userId) throw new Error("Missing userId");

      const r2 = await fetch("/api/ai/plan", {
        method: "POST",
        headers: { "Content-Type":"application/json", "Idempotency-Key": "plan-"+crypto.randomUUID() },
        body: JSON.stringify({ userId })
      });
      if (!r2.ok) throw new Error(await r2.text());
      const { planId } = await r2.json();
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
        <label>Telefon<br/><input name="phone" /></label><br/><br/>
        <label>Datum rođenja<br/><input name="dateOfBirth" type="date" /></label><br/><br/>
        <label>Spol<br/><select name="gender"><option value="">(odaberi)</option><option>female</option><option>male</option><option>other</option></select></label><br/><br/>

        <h3>Ciljevi</h3>
        <label>SMART cilj<br/><input name="smartGoal" /></label><br/><br/>
        <label><input type="checkbox" name="goals" value="fat_loss" /> Redukcija masnoće</label><br/>
        <label><input type="checkbox" name="goals" value="muscle_gain" /> Mišićna masa</label><br/>
        <label><input type="checkbox" name="goals" value="endurance" /> Izdržljivost</label><br/>

        <h3>Mjere</h3>
        <label>Visina (cm)<br/><input name="height_cm" type="number" step="0.1" /></label>&nbsp;&nbsp;
        <label>Težina (kg)<br/><input name="weight_kg" type="number" step="0.1" /></label>&nbsp;&nbsp;
        <label>BMI<br/><input name="bmi" type="number" step="0.1" /></label><br/><br/>

        <h3>Privole</h3>
        <label><input type="checkbox" name="consent_gdpr" required /> Prihvatam GDPR (obavezno)</label><br/><br/>

        <button type="submit" disabled={loading} style={{padding:"10px 18px"}}>{loading?"Obrada...":"Pošalji i generiši plan"}</button>
      </form>
    </div>
  );
}
