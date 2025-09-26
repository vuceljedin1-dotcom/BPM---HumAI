"use client";

import { ReactNode } from "react";

export default function AuthGate({ children }: { children: ReactNode }) {
  // TODO: zamijeni stvarnom auth provjerom (Supabase ili sl.)
  return <>{children}</>;
}
