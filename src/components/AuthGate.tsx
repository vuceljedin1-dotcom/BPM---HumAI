"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(() => setReady(true));
  }, []);
  if (!ready) return <div className="p-6">Loading…</div>;
  return <>{children}</>;
}

