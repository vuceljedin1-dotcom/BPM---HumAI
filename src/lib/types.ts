// src/lib/types.ts
export type IntakePayload = {
  fullName: string; email: string;
  phone?: string; dateOfBirth?: string; gender?: string; bloodType?: string;
  occupation?: string; address?: string; emergencyContact?: string;
  goals?: string[]; smartGoal?: string; motivationScore?: number; stressScore?: number;
  sleepHours?: number; sittingHours?: number; walkingKm?: number;
  baseline?: {
    height_cm?: number; weight_kg?: number; bmi?: number; waist_cm?: number; hips_cm?: number;
    chest_cm?: number; upper_arm_cm?: number; thigh_cm?: number; body_fat_pct?: number; mobility_score?: number;
  };
  consents?: { kind: string; version: string; accepted: boolean }[];
};
