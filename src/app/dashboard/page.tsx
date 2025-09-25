import AuthGate from "@/src/components/AuthGate";
import StartProcessCard from "@/src/components/StartProcessCard";

export default function Dashboard(){
  return (
    <AuthGate>
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Your Dashboard</h1>
        <StartProcessCard/>
      </main>
    </AuthGate>
  );
}

