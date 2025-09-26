"use client";

import { useState } from "react";

export default function OnboardingForm() {
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("Hvala! Obrada u toku — plan će biti generisan.");
    // TODO: pozovi /api/register-public pa /api/ai/plan
  }

  return (
    <div style={{ border: "1px solid #eee", padding: 16, borderRadius: 8 }}>
      <h3>Onboarding</h3>
      {msg && (
        <div style={{ background: "#f6f6f6", padding: 10, marginBottom: 10 }}>
          {msg}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <label>
          Ime i prezime*<br />
          <input name="fullName" required />
        </label>
        <br />
        <br />
        <label>
          Email*<br />
          <input type="email" name="email" required />
        </label>
        <br />
        <br />
        <button type="submit">Pošalji</button>
      </form>
    </div>
  );
}
