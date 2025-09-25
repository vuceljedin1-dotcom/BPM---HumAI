// onboarding/page.tsx
"use client";
import OnboardingForm from "@/src/components/OnboardingForm";
import AuthGate from "@/src/components/AuthGate";

export default function OnboardingPage(){
  return (
    <AuthGate>
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">Onboarding</h1>
        <p className="mb-6">Tell us your goal and start your first run.</p>
        <OnboardingForm/>
      </main>
    </AuthGate>
  );
}
// components/OnboardingForm.tsx
"use client";
import { useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function OnboardingForm(){
  const [goal, setGoal] = useState("");
  const [exp, setExp] = useState("beginner");
  const [consent, setConsent] = useState(false);
  const router = useRouter();

  async function save(){
    const { data: { user } } = await supabase.auth.getUser();
    if(!user) return alert("Not signed in");
    const { error } = await supabase.from("onboarding").upsert({
      user_id: user.id, goal, experience_level: exp, consent
    });
    if (error) alert(error.message); else router.push("/dashboard");
  }

  return (
    <div className="space-y-4">
      <input className="w-full border p-3 rounded" placeholder="Your main goal" value={goal} onChange={e=>setGoal(e.target.value)} />
      <select className="w-full border p-3 rounded" value={exp} onChange={e=>setExp(e.target.value)}>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} />
        I agree to data processing for coaching.
      </label>
      <button onClick={save} className="p-3 rounded bg-black text-white">Save & Continue</button>
    </div>
  );
}

