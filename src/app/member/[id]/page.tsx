import Link from "next/link";

async function getLatestPlan(userId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/plan/latest?userId=${userId}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function MemberPage({ params, searchParams }: any) {
  const userId = params.id as string;
  const initPlanId = searchParams?.plan as string | undefined;
  const data = await getLatestPlan(userId);
  return (
    <div style={{ maxWidth: 860, margin: "40px auto" }}>
      <h1>Dobrodošao 👋</h1>
      <p>User: <code>{userId}</code></p>
      {initPlanId && <p>Plan kreiran: <code>{initPlanId}</code></p>}
      {!data && <p>Nismo mogli učitati plan. Pokušaj kasnije.</p>}
      {data && (
        <>
          <h3>Tvoj plan</h3>
          <p>Status: <b>{data.status}</b></p>
          <pre style={{ whiteSpace: "pre-wrap", background: "#f6f6f6", padding: 12, border: "1px solid #eee" }}>
            {JSON.stringify(data.content, null, 2)}
          </pre>
          <p><Link href={`/`}>Početna</Link></p>
        </>
      )}
    </div>
  );
}
