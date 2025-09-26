import AuthGate from "@/components/AuthGate";
import OnboardingForm from "@/components/OnboardingForm";

export default function OnboardingPage() {
  return (
    <AuthGate>
      <main className="max-w-2xl mx-auto p-6" style={{fontFamily:"system-ui"}}>
        <h1 className="text-2xl font-bold mb-2">Onboarding</h1>
        <p className="mb-6">Tell us your goal and start your first run.</p>
        <OnboardingForm />
      </main>
    </AuthGate>
  );
}
