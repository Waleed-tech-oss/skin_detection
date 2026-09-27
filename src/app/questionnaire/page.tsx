"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Check,
  User,
  Sliders,
  DollarSign,
  HeartHandshake,
  Layers,
} from "lucide-react";

interface QuestionnaireState {
  sensitivity: string;
  allergies: string[];
  currentRoutine: string[];
  budget: string;
  fragrancePref: string;
  texturePref: string;
}

const INITIAL_STATE: QuestionnaireState = {
  sensitivity: "Sometimes",
  allergies: ["Fragrance", "Essential Oils"],
  currentRoutine: ["Cleanser", "Moisturizer", "Sunscreen"],
  budget: "PKR 2,000–5,000",
  fragrancePref: "Fragrance-Free",
  texturePref: "Gel",
};

export default function QuestionnairePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<QuestionnaireState>(INITIAL_STATE);

  const totalSteps = 5;

  const handleAllergyToggle = (item: string) => {
    if (item === "No known allergies") {
      setFormData((prev) => ({
        ...prev,
        allergies: prev.allergies.includes(item) ? [] : [item],
      }));
      return;
    }

    setFormData((prev) => {
      const filtered = prev.allergies.filter((a) => a !== "No known allergies");
      if (filtered.includes(item)) {
        return { ...prev, allergies: filtered.filter((a) => a !== item) };
      } else {
        return { ...prev, allergies: [...filtered, item] };
      }
    });
  };

  const handleRoutineToggle = (item: string) => {
    if (item === "None") {
      setFormData((prev) => ({
        ...prev,
        currentRoutine: prev.currentRoutine.includes(item) ? [] : [item],
      }));
      return;
    }

    setFormData((prev) => {
      const filtered = prev.currentRoutine.filter((r) => r !== "None");
      if (filtered.includes(item)) {
        return { ...prev, currentRoutine: filtered.filter((r) => r !== item) };
      } else {
        return { ...prev, currentRoutine: [...filtered, item] };
      }
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      router.push("/skin-profile");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <AppShell pageTitle="Personal Questionnaire">
      <PageHeader
        title="Personal Skin Questionnaire"
        description="Provide custom criteria, sensitivities, and preferences to refine your product matches."
      />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Wizard Progress Header */}
        <div className="bg-surface rounded-2xl border border-sage-border p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-primary-sage uppercase tracking-wider">
              Step 0{currentStep} of 0{totalSteps}
            </span>
            <span className="text-secondary-text font-medium">
              {currentStep === 1 && "Skin Sensitivity"}
              {currentStep === 2 && "Allergies & Exclusions"}
              {currentStep === 3 && "Current Regimen"}
              {currentStep === 4 && "Target Budget"}
              {currentStep === 5 && "Product Preferences"}
            </span>
          </div>

          {/* Step Progress Bar */}
          <div className="w-full h-2 rounded-full bg-very-light-sage overflow-hidden border border-light-sage/60">
            <div
              className="h-full bg-primary-sage rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Wizard Card Body */}
        <SectionCard className="p-6 sm:p-8 space-y-6">
          {/* ============================================================ */}
          {/* STEP 1: SENSITIVITY                                          */}
          {/* ============================================================ */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-primary-sage uppercase tracking-wider block">
                  1. Sensitivity Assessment
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-text font-heading">
                  Does your skin react easily to skincare products?
                </h2>
                <p className="text-xs sm:text-sm text-secondary-text">
                  Helps filter out harsh active concentrations and potential irritants.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {["Often", "Sometimes", "Rarely", "Not Sure"].map((option) => {
                  const isSelected = formData.sensitivity === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, sensitivity: option })}
                      className={cn(
                        "p-4 rounded-xl border text-left font-medium text-sm transition-all duration-150 flex items-center justify-between cursor-pointer",
                        isSelected
                          ? "bg-very-light-sage border-primary-sage text-dark-sage ring-1 ring-primary-sage shadow-xs"
                          : "bg-surface border-sage-border text-primary-text hover:bg-very-light-sage/40"
                      )}
                    >
                      <span>{option}</span>
                      {isSelected && <Check className="w-4 h-4 text-primary-sage" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* STEP 2: ALLERGIES & INGREDIENTS TO AVOID                     */}
          {/* ============================================================ */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-primary-sage uppercase tracking-wider block">
                  2. Allergies & Exclusions
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-text font-heading">
                  Select ingredients you want to avoid
                </h2>
                <p className="text-xs sm:text-sm text-secondary-text">
                  Select all that apply. Products containing these ingredients will be excluded from recommendations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Fragrance",
                  "Essential Oils",
                  "Alcohol",
                  "Retinoids",
                  "Strong Acids",
                  "Other",
                  "No known allergies",
                ].map((option) => {
                  const isSelected = formData.allergies.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleAllergyToggle(option)}
                      className={cn(
                        "p-4 rounded-xl border text-left font-medium text-sm transition-all duration-150 flex items-center justify-between cursor-pointer",
                        isSelected
                          ? "bg-very-light-sage border-primary-sage text-dark-sage ring-1 ring-primary-sage shadow-xs"
                          : "bg-surface border-sage-border text-primary-text hover:bg-very-light-sage/40"
                      )}
                    >
                      <span>{option}</span>
                      {isSelected && <Check className="w-4 h-4 text-primary-sage" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* STEP 3: CURRENT ROUTINE                                      */}
          {/* ============================================================ */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-primary-sage uppercase tracking-wider block">
                  3. Current Skincare Habit
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-text font-heading">
                  What products do you currently use?
                </h2>
                <p className="text-xs sm:text-sm text-secondary-text">
                  Helps structure a comfortable transition without overwhelming your skin.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Cleanser",
                  "Toner",
                  "Serum",
                  "Moisturizer",
                  "Sunscreen",
                  "Acne Treatment",
                  "Exfoliant",
                  "None",
                ].map((option) => {
                  const isSelected = formData.currentRoutine.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleRoutineToggle(option)}
                      className={cn(
                        "p-4 rounded-xl border text-left font-medium text-sm transition-all duration-150 flex items-center justify-between cursor-pointer",
                        isSelected
                          ? "bg-very-light-sage border-primary-sage text-dark-sage ring-1 ring-primary-sage shadow-xs"
                          : "bg-surface border-sage-border text-primary-text hover:bg-very-light-sage/40"
                      )}
                    >
                      <span>{option}</span>
                      {isSelected && <Check className="w-4 h-4 text-primary-sage" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* STEP 4: BUDGET                                               */}
          {/* ============================================================ */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-primary-sage uppercase tracking-wider block">
                  4. Budget Preference
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-text font-heading">
                  What is your preferred budget range per product?
                </h2>
                <p className="text-xs sm:text-sm text-secondary-text">
                  Recommendations will prioritize options aligned with your budget.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Under PKR 2,000",
                  "PKR 2,000–5,000",
                  "PKR 5,000–10,000",
                  "PKR 10,000+",
                  "No specific budget",
                ].map((option) => {
                  const isSelected = formData.budget === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: option })}
                      className={cn(
                        "p-4 rounded-xl border text-left font-medium text-sm transition-all duration-150 flex items-center justify-between cursor-pointer",
                        isSelected
                          ? "bg-very-light-sage border-primary-sage text-dark-sage ring-1 ring-primary-sage shadow-xs"
                          : "bg-surface border-sage-border text-primary-text hover:bg-very-light-sage/40"
                      )}
                    >
                      <span>{option}</span>
                      {isSelected && <Check className="w-4 h-4 text-primary-sage" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* STEP 5: PRODUCT PREFERENCES                                  */}
          {/* ============================================================ */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-primary-sage uppercase tracking-wider block">
                  5. Formulation & Texture
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-text font-heading">
                  Specific formulation preferences
                </h2>
                <p className="text-xs sm:text-sm text-secondary-text">
                  Tailor the tactile feel and fragrance format of your regimen.
                </p>
              </div>

              {/* Fragrance Preference */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-secondary-text uppercase tracking-wider block">
                  Fragrance Option
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["Fragrance-Free", "Fragrance Is Fine", "No Preference"].map((option) => {
                    const isSelected = formData.fragrancePref === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData({ ...formData, fragrancePref: option })}
                        className={cn(
                          "p-3.5 rounded-xl border text-left font-medium text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer",
                          isSelected
                            ? "bg-very-light-sage border-primary-sage text-dark-sage ring-1 ring-primary-sage"
                            : "bg-surface border-sage-border text-primary-text hover:bg-very-light-sage/40"
                        )}
                      >
                        <span>{option}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-primary-sage" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Texture Preference */}
              <div className="space-y-3 pt-4 border-t border-sage-border/60">
                <label className="text-xs font-semibold text-secondary-text uppercase tracking-wider block">
                  Preferred Moisturizer / Serum Texture
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {["Gel", "Cream", "Lotion", "Serum", "No Preference"].map((option) => {
                    const isSelected = formData.texturePref === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData({ ...formData, texturePref: option })}
                        className={cn(
                          "p-3.5 rounded-xl border text-left font-medium text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer",
                          isSelected
                            ? "bg-very-light-sage border-primary-sage text-dark-sage ring-1 ring-primary-sage"
                            : "bg-surface border-sage-border text-primary-text hover:bg-very-light-sage/40"
                        )}
                      >
                        <span>{option}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-primary-sage" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Actions Footer */}
          <div className="pt-6 border-t border-sage-border/60 flex items-center justify-between gap-3">
            <div>
              {currentStep > 1 ? (
                <SecondaryButton
                  onClick={handleBack}
                  icon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back
                </SecondaryButton>
              ) : (
                <span className="text-xs text-secondary-text pl-1">
                  Step 1 of 5
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {currentStep < totalSteps && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="text-xs font-medium text-secondary-text hover:text-primary-text px-3 py-2 transition-colors"
                >
                  Skip
                </button>
              )}

              <PrimaryButton
                onClick={handleNext}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                {currentStep === totalSteps ? "Save & View Profile" : "Continue"}
              </PrimaryButton>
            </div>
          </div>
        </SectionCard>

        {/* Subtle Separation Notice */}
        <div className="p-3.5 bg-surface rounded-xl border border-sage-border text-xs text-secondary-text flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary-sage" />
            Preferences are user-provided criteria, distinct from AI visual classifications.
          </span>
        </div>
      </div>
    </AppShell>
  );
}
