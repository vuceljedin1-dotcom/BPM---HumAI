# 1) ukloni pogrešan fajl
git rm -f src/route.ts 2>/dev/null || true

# 2) napravi prave putanje
mkdir -p src/app src/app/api/health src/app/intake src/app/member/[id]

# 3) home stranica "/"
cat > src/app/page.tsx << 'EOF'
export default function Page() {
  return (
    <div style={{fontFamily:'system-ui',padding:24}}>
      ✅ BPM online — <a href="/intake">Intake</a>
    </div>
  );
}
EOF

# 4) health endpoint "/api/health"
cat > src/app/api/health/route.ts << 'EOF'
export async function GET() {
  return new Response(JSON.stringify({ ok: true, time: new Date().toISOString() }), {
    headers: { "Content-Type": "application/json" },
  });
}
EOF

# 5) minimalna intake stranica (možeš je kasnije proširiti)
cat > src/app/intake/page.tsx << 'EOF'
"use client";
import { useState } from "react";

export default function IntakePage() {
  const [msg,setMsg] = useState<string|null>(null);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("Hvala! Obrada u toku — uskoro će plan biti spreman.");
  }
  return (
    <div style={{maxWidth:820,margin:"40px auto",fontFamily:"system-ui"}}>
      <h1>Intake</h1>
      {msg && <div style={{background:"#f6f6f6",padding:12,border:"1px solid #eee"}}>{msg}</div>}
      <form onSubmit={onSubmit}>
        <label>Ime i prezime*<br/><input name="fullName" required /></label><br/><br/>
        <label>Email*<br/><input name="email" type="email" required /></label><br/><br/>
        <button type="submit">Pošalji</button>
      </form>
    </div>
  );
}
EOF

# 6) placeholder member dashboard (prikaz da ruta postoji)
cat > src/app/member/[id]/page.tsx << 'EOF'
export default function Member({ params }: { params: { id: string }}) {
  return (
    <div style={{maxWidth:820,margin:"40px auto",fontFamily:"system-ui"}}>
      <h1>Member Dashboard</h1>
      <p>User: <code>{params.id}</code></p>
    </div>
  );
}
EOF

git add -A
git commit -m "feat: add app router (home, intake, member) + /api/health; remove stray src/route.ts"
git push
