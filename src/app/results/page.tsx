"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ConfidenceBar } from "@/components/analysis/ConfidenceBar";
import { MOCK_AI_ANALYSIS } from "@/data/mockData";
import {
  ScanFace,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Check,
  Shield,
  Layers,
  Sun,
  Eye,
} from "lucide-react";

export default function ResultsPage() {
  const [confirmed, setConfirmed] = useState<boolean | null>(null);

  return (
    <AppShell pageTitle="Skin Analysis Results">
      {/* 1. Page Header */}
      <PageHeader
        title="Your Skin Analysis"
        description="Based on your latest uploaded photo."
        action={
          <Link href="/analysis">
            <SecondaryButton icon={<RotateCcw className="w-4 h-4" />}>
              Start New Analysis
            </SecondaryButton>
          </Link>
        }
      />

      {/* 2. Top Grid: Photo Preview & Primary AI Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Uploaded Photo Analysis Frame (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-4">
          <SectionCard
            title="Analyzed Photo"
            subtitle="Frontal portrait assessment"
          >
            <div className="space-y-4">
              {/* Scan Frame */}
              <div className="relative aspect-4/3 w-full rounded-2xl bg-very-light-sage/60 border border-light-sage overflow-hidden flex items-center justify-center p-4">
                {/* Facial Target Wireframe */}
                <div className="relative w-36 h-44 sm:w-44 sm:h-52 rounded-full border-2 border-dashed border-primary-sage/60 flex items-center justify-center bg-surface/50 backdrop-blur-xs">
                  {/* Optical Reticles */}
                  <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-primary-sage" />
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-primary-sage" />
                  <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-primary-sage" />
                  <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-primary-sage" />

                  <svg
                    className="w-24 h-32 text-primary-sage/50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  >
                    <path d="M12 2a7 7 0 0 0-7 7c0 5 3 9 7 12 4-3 7-7 7-12a7 7 0 0 0-7-7z" />
                    <circle cx="9" cy="9" r="1" fill="currentColor" />
                    <circle cx="15" cy="9" r="1" fill="currentColor" />
                    <path d="M12 12v2" />
                    <path d="M10 16c1 .5 3 .5 4 0" />
                  </svg>

                  {/* Surface Concern Highlights */}
                  <div className="absolute top-8 left-6 w-2.5 h-2.5 rounded-full bg-[#D69A5F] ring-4 ring-[#D69A5F]/20" />
                  <div className="absolute top-12 right-7 w-2.5 h-2.5 rounded-full bg-[#D69A5F] ring-4 ring-[#D69A5F]/20" />
                  <div className="absolute bottom-12 left-10 w-2 h-2 rounded-full bg-primary-sage ring-4 ring-primary-sage/20" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-surface/95 backdrop-blur-xs border border-sage-border px-3 py-2 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-secondary-text">Alignment: Frontal</span>
                  <span className="font-semibold text-primary-sage">Analysis Complete</span>
                </div>
              </div>

              <p className="text-xs text-secondary-text leading-relaxed">
                Computer vision models extracted visible epidermal surface patterns across the T-zone, cheek, and forehead regions.
              </p>
            </div>
          </SectionCard>
        </div>

        {/* Right Column: Primary AI Results (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          <SectionCard
            title="Primary AI Results"
            subtitle="Automated visual classifications"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Metric 1: Skin Type */}
              <div className="p-4 rounded-xl bg-very-light-sage/40 border border-light-sage/70 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-secondary-text uppercase tracking-wider">
                    Skin Type
                  </span>
                  <Layers className="w-3.5 h-3.5 text-primary-sage" />
                </div>
                <div>
                  <span className="text-xl font-bold text-primary-text font-heading block">
                    {MOCK_AI_ANALYSIS.skinType}
                  </span>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-secondary-text">
                    <span>AI Confidence</span>
                    <span className="font-bold text-primary-sage">
                      {MOCK_AI_ANALYSIS.skinTypeConfidence || 87}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Metric 2: Skin Tone */}
              <div className="p-4 rounded-xl bg-very-light-sage/40 border border-light-sage/70 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-secondary-text uppercase tracking-wider">
                    Skin Tone
                  </span>
                  <Sun className="w-3.5 h-3.5 text-[#8E7963]" />
                </div>
                <div>
                  <span className="text-xl font-bold text-primary-text font-heading block">
                    {MOCK_AI_ANALYSIS.skinTone}
                  </span>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-secondary-text">
                    <span>AI Confidence</span>
                    <span className="font-bold text-primary-sage">
                      {MOCK_AI_ANALYSIS.skinToneConfidence || 90}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Metric 3: Primary Visible Concern */}
              <div className="p-4 rounded-xl bg-very-light-sage/40 border border-light-sage/70 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-secondary-text uppercase tracking-wider">
                    Primary Concern
                  </span>
                  <Eye className="w-3.5 h-3.5 text-primary-sage" />
                </div>
                <div>
                  <span className="text-xl font-bold text-primary-sage font-heading block">
                    {MOCK_AI_ANALYSIS.primaryConcern}
                  </span>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-secondary-text">
                    <span>AI Confidence</span>
                    <span className="font-bold text-primary-sage">
                      {MOCK_AI_ANALYSIS.primaryConcernConfidence || 94}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-surface rounded-xl border border-sage-border text-xs text-secondary-text flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary-sage shrink-0" />
              <span>
                <strong>Acne</strong> detected as the primary concern. Redness and Pigmentation are additional AI-detected signals.
              </span>
            </div>
          </SectionCard>

          {/* 3. Detected Visible Concerns Section */}
          <SectionCard
            title="Detected Visible Concerns"
            subtitle="Confidence breakdown for visible characteristics"
          >
            <div className="space-y-3">
              {MOCK_AI_ANALYSIS.detectedConcerns.map((item) => (
                <ConfidenceBar
                  key={item.concern}
                  label={item.concern}
                  confidence={item.confidence}
                  region={item.region}
                  isPrimary={item.concern === MOCK_AI_ANALYSIS.primaryConcern}
                />
              ))}

              <div className="pt-2 text-[11px] text-secondary-text leading-relaxed">
                * Percentages represent model confidence outputs for visible surface characteristics and do not represent disease diagnosis or severity.
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* 4. User Confirmation & Next Step CTA Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* User Confirmation Card (5 cols on desktop) */}
        <div className="lg:col-span-5 h-full">
          <SectionCard
            title="User Confirmation"
            subtitle="Provide quick feedback on AI assessment"
            className="h-full flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary-text">
                Does this analysis look correct?
              </p>
              <p className="text-xs text-secondary-text leading-relaxed">
                Confirming helps refine ingredient filtering for your personalized product routine.
              </p>
            </div>

            <div className="pt-2">
              {confirmed === true ? (
                <div className="p-3 bg-very-light-sage text-dark-sage rounded-xl border border-light-sage flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    Confirmed by user
                  </span>
                  <button
                    type="button"
                    onClick={() => setConfirmed(null)}
                    className="text-primary-sage underline hover:text-dark-sage"
                  >
                    Change
                  </button>
                </div>
              ) : confirmed === false ? (
                <div className="p-3 bg-[#FEF2F2] text-[#B91C1C] rounded-xl border border-[#FCA5A5] flex items-center justify-between text-xs font-semibold">
                  <span>Marked for review</span>
                  <button
                    type="button"
                    onClick={() => setConfirmed(null)}
                    className="underline"
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <SecondaryButton
                    fullWidth
                    onClick={() => setConfirmed(true)}
                    icon={<Check className="w-4 h-4 text-success" />}
                    className="text-xs py-2"
                  >
                    Yes, Looks Correct
                  </SecondaryButton>

                  <SecondaryButton
                    fullWidth
                    onClick={() => setConfirmed(false)}
                    className="text-xs py-2 text-secondary-text"
                  >
                    Review Results
                  </SecondaryButton>
                </div>
              )}
            </div>
          </SectionCard>
        </div>

        {/* Next Step CTA Card (7 cols on desktop) */}
        <div className="lg:col-span-7 h-full">
          <div className="h-full bg-very-light-sage/60 rounded-[18px] border border-light-sage/80 p-6 flex flex-col justify-between space-y-5 shadow-xs">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-sage">
                <Sparkles className="w-3.5 h-3.5" />
                Next Step
              </div>
              <h3 className="text-xl font-bold text-primary-text font-heading">
                Complete Your Skin Profile
              </h3>
              <p className="text-xs sm:text-sm text-secondary-text max-w-xl leading-relaxed">
                Answer a few questions about sensitivity, allergies, budget, and product preferences to improve your personalized recommendations.
              </p>
            </div>

            <div>
              <Link href="/questionnaire" className="inline-block w-full sm:w-auto">
                <PrimaryButton
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="py-2.5 px-6"
                >
                  Continue to Questionnaire
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
