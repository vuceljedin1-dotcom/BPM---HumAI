// onboarding/page.tsx
"use client";
import OnboardingForm from "@/src/components/OnboardingForm";
import AuthGate from "@/src/components/AuthGate";

export default function OnboardingPage(){
  return (
    <AuthGate>
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">Onboarding</h1>
        <p className="mb-6">Tell us your goal and start your first run.</p>
        <OnboardingForm/>
      </main>
    </AuthGate>
  );
}

