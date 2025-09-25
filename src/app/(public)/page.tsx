"use client";
import { useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [demo, setDemo] = useState("");
  const router = useRouter();

  async function signIn(e:any){
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email, options:{ emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` }});
    if (error) alert(error.message); else alert("Check your email for the magic link.");
  }

  function enterDemo(e:any){
    e.preventDefault();
    if (demo === (process.env.NEXT_PUBLIC_DEMO_PASS ?? "demo123")) router.push("/dashboard");
    else alert("Wrong demo pass");
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">BPM RED Academy – HumAI</h1>
      <p className="mb-6">Real-time learning • Orchestration • Credentialing</p>

      <form onSubmit={signIn} className="space-y-3">
        <input className="w-full border p-3 rounded" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="w-full p-3 rounded bg-black text-white">Sign in via Magic Link</button>
      </form>

      <div className="my-6 text-center">— or —</div>

      <form onSubmit={enterDemo} className="space-y-3">
        <input className="w-full border p-3 rounded" placeholder="Demo pass" value={demo} onChange={e=>setDemo(e.target.value)} />
        <button className="w-full p-3 rounded border">Enter Demo</button>
      </form>
    </main>
  );
}

