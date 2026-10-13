"use client";

import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { RoutinePreview } from "@/components/dashboard/RoutinePreview";
import { RecommendationPreviewCard } from "@/components/dashboard/RecommendationPreviewCard";
import { RecentAnalysisCard } from "@/components/dashboard/RecentAnalysisCard";
import {
  MOCK_AI_ANALYSIS,
  MOCK_ANALYSIS_HISTORY,
  MOCK_RECOMMENDED_PRODUCTS,
  MOCK_MORNING_ROUTINE,
} from "@/data/mockData";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  ScanFace,
  ArrowRight,
  Sparkles,
  Calendar,
} from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const greetingName = loading ? "there" : user?.name || "there";

  return (
    <AppShell pageTitle="Dashboard">
      {/* 1. Dashboard Header */}
      <PageHeader
        title={`Good evening, ${greetingName}`}
        description="Here is your latest skin analysis overview."
        action={
          <Link href="/analysis">
            <PrimaryButton icon={<ScanFace className="w-4 h-4" />}>
              Start New Analysis
            </PrimaryButton>
          </Link>
        }
      />

      {/* 2. Primary Section: Latest Analysis Highlight & Quick Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Latest Analysis Highlight Banner (8 cols on desktop) */}
        <div className="lg:col-span-8 bg-surface rounded-[20px] border border-sage-border p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-sage-border/60">
            <div>
              <span className="text-xs font-semibold text-secondary-text uppercase tracking-wider block">
                Primary Overview
              </span>
              <h2 className="text-xl font-bold text-primary-text font-heading mt-0.5">
                Latest Skin Analysis
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary-text flex items-center gap-1.5 bg-very-light-sage px-3 py-1 rounded-full border border-light-sage/60">
                <Calendar className="w-3.5 h-3.5 text-primary-sage" />
                September 25, 2026
              </span>
            </div>
          </div>

          {/* Analysis Summary Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-very-light-sage/40 border border-light-sage/60">
              <span className="text-[10px] font-semibold text-secondary-text uppercase block">
                Skin Type
              </span>
              <span className="text-base font-bold text-primary-text block mt-0.5">
                {MOCK_AI_ANALYSIS.skinType}
              </span>
              <span className="text-[11px] text-secondary-text mt-0.5 block">
                Sebum balance
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-very-light-sage/40 border border-light-sage/60">
              <span className="text-[10px] font-semibold text-secondary-text uppercase block">
                Skin Tone
              </span>
              <span className="text-base font-bold text-primary-text block mt-0.5">
                {MOCK_AI_ANALYSIS.skinTone}
              </span>
              <span className="text-[11px] text-secondary-text mt-0.5 block">
                AI-estimated skin tone
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-very-light-sage/40 border border-light-sage/60">
              <span className="text-[10px] font-semibold text-secondary-text uppercase block">
                Primary Visible Concern
              </span>
              <span className="text-base font-bold text-primary-sage block mt-0.5">
                {MOCK_AI_ANALYSIS.primaryConcern}
              </span>
              <span className="text-[11px] text-secondary-text mt-0.5 block">
                Primary visible concern
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-very-light-sage/40 border border-light-sage/60">
              <span className="text-[10px] font-semibold text-secondary-text uppercase block">
                AI Confidence
              </span>
              <span className="text-base font-bold text-dark-sage block mt-0.5">
                {MOCK_AI_ANALYSIS.aiConfidence}%
              </span>
              <span className="text-[11px] text-secondary-text mt-0.5 block">
                High certainty
              </span>
            </div>
          </div>

          {/* Additional Concerns Chips & Action Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-sage-border/60">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-secondary-text mr-1">
                Detected Signals:
              </span>
              {MOCK_AI_ANALYSIS.detectedConcerns
                .filter((item) => item.concern !== MOCK_AI_ANALYSIS.primaryConcern)
                .map((item) => (
                  <StatusBadge key={item.concern} variant="beige" size="sm">
                    {item.concern} ({item.confidence}%)
                  </StatusBadge>
                ))}
            </div>

            <Link href="/results">
              <SecondaryButton
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
                className="text-xs py-1.5 px-3.5"
              >
                View Full Analysis
              </SecondaryButton>
            </Link>
          </div>
        </div>

        {/* Quick Action Card (4 cols on desktop) */}
        <div className="lg:col-span-4 bg-very-light-sage/60 rounded-[20px] border border-light-sage/80 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-primary-sage text-white flex items-center justify-center shadow-xs">
              <ScanFace className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-primary-text font-heading">
              Start New Analysis
            </h3>
            <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
              Upload a new photo to update your skin analysis.
            </p>
          </div>

          <div>
            <Link href="/analysis" className="block">
              <PrimaryButton
                fullWidth
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="py-2.5"
              >
                Start New Analysis
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Non-Duplicative Secondary Information Cards (Distinct AI vs User Information) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: AI Detected Concerns Breakdown */}
        <div className="bg-surface rounded-[18px] border border-sage-border p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-primary-sage uppercase tracking-wider">
                AI Visual Analysis
              </span>
              <span className="text-[11px] text-secondary-text">
                3 Areas Detected
              </span>
            </div>
            <h3 className="text-sm font-bold text-primary-text font-heading">
              Detected Concerns Detail
            </h3>
            <p className="text-xs text-secondary-text">
              Visible characteristics identified from facial scan.
            </p>
          </div>

          <div className="space-y-2 pt-1">
            {MOCK_AI_ANALYSIS.detectedConcerns.map((item) => (
              <div
                key={item.concern}
                className="flex items-center justify-between rounded-lg bg-very-light-sage/40 p-2 text-xs"
              >
                <span className="font-semibold text-primary-text">
                  {item.concern}
                </span>
                <span className="font-bold text-primary-sage">
                  {item.confidence}% AI Confidence
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: User-Provided Profile Preferences */}
        <div className="bg-surface rounded-[18px] border border-sage-border p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#8E7963] uppercase tracking-wider">
                User-Provided Criteria
              </span>
              <span className="text-[11px] text-secondary-text">
                Custom Constraints
              </span>
            </div>
            <h3 className="text-sm font-bold text-primary-text font-heading">
              Profile Preferences
            </h3>
            <p className="text-xs text-secondary-text">
              Exclusions and budget filters applied to matches.
            </p>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7F2EB]/70 border border-warm-beige/60">
              <span className="text-secondary-text">Sensitivity</span>
              <span className="font-semibold text-primary-text">Medium Level</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7F2EB]/70 border border-warm-beige/60">
              <span className="text-secondary-text">Target Budget</span>
              <span className="font-semibold text-primary-text">PKR 2,000–5,000</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7F2EB]/70 border border-warm-beige/60">
              <span className="text-secondary-text">Exclusions</span>
              <span className="font-semibold text-primary-text">Fragrance & Sulfates</span>
            </div>
          </div>
        </div>

        {/* Card 3: Matched Regimen Summary */}
        <div className="bg-surface rounded-[18px] border border-sage-border p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-primary-sage uppercase tracking-wider">
                Regimen Target
              </span>
              <span className="text-[11px] text-secondary-text">
                Daily Sequence
              </span>
            </div>
            <h3 className="text-sm font-bold text-primary-text font-heading">
              Care Plan Focus
            </h3>
            <p className="text-xs text-secondary-text">
              Primary objective for your current skin profile.
            </p>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            <div className="p-2.5 rounded-lg bg-very-light-sage/40 border border-light-sage/60">
              <span className="text-secondary-text block text-[10px] uppercase font-semibold">
                Core Objective
              </span>
              <span className="font-semibold text-primary-text mt-0.5 block">
                Sebum regulation & gentle barrier balance
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-very-light-sage/40">
              <span className="text-secondary-text">Routine Structure</span>
              <span className="font-semibold text-dark-sage">4 AM Steps • 2 PM Steps</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Today's Routine Preview */}
      <RoutinePreview steps={MOCK_MORNING_ROUTINE} />

      {/* 5. Bottom Section: Recommendations Preview & Recent History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Recommendations (7 cols on desktop) */}
        <div className="lg:col-span-7 bg-surface rounded-[18px] border border-sage-border p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-sage-border/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-very-light-sage text-primary-sage flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-primary-text font-heading">
                  Top Recommendations
                </h2>
                <p className="text-xs text-secondary-text">
                  Illustrative matches using placeholder catalog records
                </p>
              </div>
            </div>

            <Link href="/recommendations">
              <SecondaryButton
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
                className="text-xs py-1.5 px-3"
              >
                View All
              </SecondaryButton>
            </Link>
          </div>

          {/* Recommendation preview cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {MOCK_RECOMMENDED_PRODUCTS.slice(0, 3).map((product) => (
              <RecommendationPreviewCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>

        {/* Recent Analysis Timeline (5 cols on desktop) */}
        <div className="lg:col-span-5">
          <RecentAnalysisCard history={MOCK_ANALYSIS_HISTORY} />
        </div>
      </div>
    </AppShell>
  );
}
