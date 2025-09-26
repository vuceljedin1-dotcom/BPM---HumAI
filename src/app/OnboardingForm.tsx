// src/components/OnboardingForm.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function OnboardingForm() {
  const [goal, setGoal] = useState("");
  const [exp, setExp] = useState<"beginner"|"intermediate"|"advanced">("beginner");
  const [consent, setConsent] = useState(false);
  const router = useRouter();

  async function save() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Not signed in");
    const { error } = await supabase.from("onboarding").upsert({
      user_id: user.id,
      goal,
      experience_level: exp,
      consent
    });
    if (error) alert(error.message);
    else router.push("/dashboard");
  }

  return (
    <div className="space-y-4">
      <input
        className="w-full border p-3 rounded"
        placeholder="Your main goal"
        value={goal}
        onChange={e => setGoal(e.target.value)}
      />
      <select
        className="w-full border p-3 rounded"
        value={exp}
        onChange={e => setExp(e.target.value as any)}
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
        I agree to data processing for coaching.
      </label>
      <button onClick={save} className="p-3 rounded bg-black text-white">
        Save & Continue
      </button>
    </div>
  );
}    </div>
  );
}
