"use client";

import AuthGate from "@/components/AuthGate";                // ← promjena
import StartProcessCard from "@/components/StartProcessCard"; // ← promjena

export default function DashboardPage() {
  return (
    <AuthGate>
      <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "system-ui" }}>
        <h1>Dashboard</h1>
        <StartProcessCard />
      </div>
    </AuthGate>
  );
}
