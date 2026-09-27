"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MOCK_FULL_ROUTINE, DetailedRoutineStep } from "@/data/mockData";
import { cn } from "@/lib/utils";
import {
  Sun,
  Moon,
  Sparkles,
  ArrowRight,
  Check,
  RefreshCw,
  Clock,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  DollarSign,
} from "lucide-react";

export default function RoutinePage() {
  const [activeTab, setActiveTab] = useState<"morning" | "evening">("morning");
  const [ownedProducts, setOwnedProducts] = useState<Record<string, boolean>>({});

  const toggleOwned = (id: string) => {
    setOwnedProducts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentSteps =
    activeTab === "morning"
      ? MOCK_FULL_ROUTINE.morning
      : MOCK_FULL_ROUTINE.evening;

  // Calculate unique products across both routines for realistic cost
  const uniqueProducts = Array.from(
    new Map(
      [...MOCK_FULL_ROUTINE.morning, ...MOCK_FULL_ROUTINE.evening].map((item) => [
        item.product.id,
        item.product,
      ])
    ).values()
  );

  const totalCost = uniqueProducts.reduce(
    (sum, p) => sum + (p.price || 0),
    0
  );

  return (
    <AppShell pageTitle="Personalized Skincare Routine">
      {/* 1. Page Header */}
      <PageHeader
        title="Your Personalized Routine"
        description="Structured morning and evening product application sequences designed for your AI skin profile."
        action={
          <Link href="/recommendations">
            <SecondaryButton icon={<Sparkles className="w-4 h-4" />}>
              View All Recommendations
            </SecondaryButton>
          </Link>
        }
      />

      {/* 2. Top Tabs & Routine Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Routine Steps (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tab Selector */}
          <div className="bg-surface rounded-2xl border border-sage-border p-2 shadow-xs flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("morning")}
              className={cn(
                "flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer",
                activeTab === "morning"
                  ? "bg-very-light-sage text-dark-sage border border-light-sage shadow-xs"
                  : "text-secondary-text hover:text-primary-text hover:bg-very-light-sage/40"
              )}
            >
              <Sun className="w-4 h-4 text-[#D69A5F]" />
              <span>Morning Routine (AM)</span>
              <span className="text-xs bg-surface px-2 py-0.5 rounded-md border border-light-sage/60 font-bold">
                4 Steps
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("evening")}
              className={cn(
                "flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer",
                activeTab === "evening"
                  ? "bg-very-light-sage text-dark-sage border border-light-sage shadow-xs"
                  : "text-secondary-text hover:text-primary-text hover:bg-very-light-sage/40"
              )}
            >
              <Moon className="w-4 h-4 text-primary-sage" />
              <span>Evening Routine (PM)</span>
              <span className="text-xs bg-surface px-2 py-0.5 rounded-md border border-light-sage/60 font-bold">
                3 Steps
              </span>
            </button>
          </div>

          {/* Routine Steps List */}
          <div className="space-y-4">
            {currentSteps.map((step) => {
              const isOwned = !!ownedProducts[step.product.id];

              return (
                <div
                  key={`${activeTab}-${step.stepNumber}`}
                  className="bg-surface rounded-[18px] border border-sage-border p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-4 hover:border-light-sage transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-sage-border/60">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-very-light-sage text-dark-sage font-heading font-bold text-sm flex items-center justify-center border border-light-sage shrink-0">
                        0{step.stepNumber}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-primary-sage">
                            Step 0{step.stepNumber} • {step.stepName}
                          </span>
                          <StatusBadge variant="neutral" size="sm">
                            {step.category}
                          </StatusBadge>
                        </div>
                        <h3 className="text-base font-bold text-primary-text font-heading mt-0.5">
                          {step.product.name}
                        </h3>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs font-bold text-primary-text">
                        PKR {step.product.price?.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-success block font-semibold">
                        {step.product.compatibilityScore}% Match
                      </span>
                    </div>
                  </div>

                  {/* Recommendation Reason */}
                  <div className="text-xs text-secondary-text bg-very-light-sage/30 p-3 rounded-xl border border-light-sage/50">
                    <strong className="text-primary-text font-semibold mr-1">
                      Why this step:
                    </strong>
                    {step.recommendationReason}
                  </div>

                  {/* Step Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleOwned(step.product.id)}
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5",
                          isOwned
                            ? "bg-very-light-sage border-primary-sage text-dark-sage"
                            : "bg-surface border-sage-border text-secondary-text hover:text-primary-text"
                        )}
                      >
                        {isOwned ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-success" />
                            Already Own This
                          </>
                        ) : (
                          "I Own This Product"
                        )}
                      </button>

                      <Link href="/recommendations">
                        <span className="text-xs font-medium text-secondary-text hover:text-primary-sage px-2 py-1 transition-colors">
                          Replace Product
                        </span>
                      </Link>
                    </div>

                    <Link href={`/recommendations/${step.product.id}`}>
                      <SecondaryButton
                        icon={<ArrowRight className="w-3.5 h-3.5" />}
                        iconPosition="right"
                        className="text-xs py-1.5 px-3"
                      >
                        View Product
                      </SecondaryButton>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Routine Summary & Totals (4 cols on desktop) */}
        <div className="lg:col-span-4 space-y-6">
          <SectionCard
            title="Routine Summary"
            subtitle="Regimen breakdown & estimated cost"
          >
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-very-light-sage/40 border border-light-sage/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-secondary-text">Morning Regimen</span>
                  <span className="font-bold text-primary-text">4 Daily Steps</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-text">Evening Regimen</span>
                  <span className="font-bold text-primary-text">3 Daily Steps</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-light-sage/60">
                  <span className="text-secondary-text">Unique Formulations</span>
                  <span className="font-bold text-primary-sage">
                    {uniqueProducts.length} Products Total
                  </span>
                </div>
              </div>

              {/* Total Estimated Cost */}
              <div className="p-4 rounded-xl bg-surface border border-sage-border space-y-1">
                <span className="text-xs font-semibold text-secondary-text uppercase tracking-wider block">
                  Estimated Routine Cost
                </span>
                <span className="text-2xl font-bold text-primary-text font-heading block">
                  PKR {totalCost.toLocaleString()}
                </span>
                <span className="text-[11px] text-secondary-text block">
                  Includes full AM + PM core kit (Cleanser, Serum, Moisturizers, SPF)
                </span>
              </div>

              {/* Regimen Guidance Note */}
              <div className="p-3.5 bg-surface rounded-xl border border-sage-border text-xs text-secondary-text space-y-2">
                <div className="flex items-center gap-1.5 font-semibold text-primary-text">
                  <CalendarCheck className="w-4 h-4 text-primary-sage" />
                  Application Frequency
                </div>
                <p className="leading-relaxed">
                  Apply morning steps in sequence before sun exposure. Perform evening steps before sleep after gentle cleansing.
                </p>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}
