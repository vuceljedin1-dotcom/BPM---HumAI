import AuthGate from "@/components/AuthGate";
import OnboardingForm from "@/components/OnboardingForm";

export default function OnboardingPage() {
  return (
    <AuthGate>
      <div style={{ maxWidth: 920, margin: "40px auto", fontFamily: "system-ui" }}>
        <h1>Onboarding</h1>
        <OnboardingForm />
      </div>
    </AuthGate>
  );
}
