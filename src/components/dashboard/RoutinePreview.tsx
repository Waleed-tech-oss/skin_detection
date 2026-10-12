import React from "react";
import Link from "next/link";
import { Sun, ArrowRight } from "lucide-react";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { RoutineStepPreview } from "@/data/mockData";

interface RoutinePreviewProps {
  steps: RoutineStepPreview[];
}

export function RoutinePreview({ steps }: RoutinePreviewProps) {
  return (
    <div className="bg-surface rounded-[18px] border border-sage-border p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-sage-border/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-warm-beige/50 text-[#8E7963] flex items-center justify-center">
            <Sun className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-primary-text font-heading">
              Today&apos;s Morning Routine
            </h2>
            <p className="text-xs text-secondary-text">AM Daily Sequence</p>
          </div>
        </div>

        <Link href="/routine">
          <SecondaryButton
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
            className="text-xs py-1.5 px-3"
          >
            View Full Routine
          </SecondaryButton>
        </Link>
      </div>

      {/* Routine Steps Sequence */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((step) => (
          <div
            key={step.stepNumber}
            className="p-3.5 rounded-xl bg-very-light-sage/40 border border-light-sage/60 flex flex-col justify-between space-y-2 hover:border-primary-sage/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-secondary-text">
                Step 0{step.stepNumber}
              </span>
              <span className="text-xs font-semibold text-primary-sage bg-surface px-2 py-0.5 rounded-md border border-light-sage">
                {step.stepName}
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-primary-text line-clamp-1">
                {step.productName}
              </p>
              <span className="text-xs text-secondary-text">{step.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
