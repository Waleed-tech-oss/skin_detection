"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Loader2,
  Circle,
  ScanFace,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

const ANALYSIS_STAGES = [
  { id: 1, label: "Preparing image" },
  { id: 2, label: "Detecting facial regions" },
  { id: 3, label: "Analyzing skin type" },
  { id: 4, label: "Analyzing skin tone" },
  { id: 5, label: "Checking visible concerns" },
  { id: 6, label: "Preparing results" },
];

interface AnalysisProcessingViewProps {
  onComplete?: () => void;
  autoRedirect?: boolean;
}

export function AnalysisProcessingView({
  onComplete,
  autoRedirect = true,
}: AnalysisProcessingViewProps) {
  const router = useRouter();
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Stage interval sequencer
    if (currentStageIndex < ANALYSIS_STAGES.length) {
      const timer = setTimeout(() => {
        setCurrentStageIndex((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setIsFinished(true);
      if (onComplete) {
        onComplete();
      }
      if (autoRedirect) {
        const redirectTimer = setTimeout(() => {
          router.push("/results");
        }, 800);
        return () => clearTimeout(redirectTimer);
      }
    }
  }, [currentStageIndex, autoRedirect, onComplete, router]);

  return (
    <div className="max-w-xl mx-auto py-8 sm:py-12 px-4">
      <div className="bg-surface rounded-[22px] border border-sage-border p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(54,83,68,0.06)] space-y-8">
        {/* Header Indicator */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-very-light-sage text-primary-sage mx-auto flex items-center justify-center border border-light-sage relative">
            <ScanFace className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-sage opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary-sage" />
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary-text font-heading">
            Analyzing Facial Image
          </h2>
          <p className="text-xs sm:text-sm text-secondary-text max-w-sm mx-auto">
            Our computer vision models are processing visible surface characteristics.
          </p>
        </div>

        {/* Stage List */}
        <div className="space-y-3 bg-very-light-sage/30 p-4 sm:p-5 rounded-2xl border border-light-sage/50">
          {ANALYSIS_STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex && !isFinished;
            const isUpcoming = idx > currentStageIndex;

            return (
              <div
                key={stage.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl transition-all duration-200",
                  isCurrent && "bg-surface border border-primary-sage/40 shadow-xs",
                  isCompleted && "text-primary-text bg-surface/50",
                  isUpcoming && "text-secondary-text/50 opacity-60"
                )}
              >
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-primary-sage shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-primary-sage animate-spin shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-secondary-text/40 shrink-0" />
                  )}
                  <span
                    className={cn(
                      "text-xs sm:text-sm font-medium",
                      isCurrent && "font-bold text-primary-text",
                      isCompleted && "text-primary-text font-semibold"
                    )}
                  >
                    {stage.label}
                  </span>
                </div>

                <div>
                  {isCompleted && (
                    <span className="text-[11px] font-semibold text-primary-sage">
                      Complete
                    </span>
                  )}
                  {isCurrent && (
                    <StatusBadge variant="sage" size="sm">
                      Processing
                    </StatusBadge>
                  )}
                  {isUpcoming && (
                    <span className="text-[11px] text-secondary-text/60">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action / Fallback */}
        <div className="pt-2 text-center">
          {isFinished ? (
            <PrimaryButton
              fullWidth
              onClick={() => router.push("/results")}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="py-3"
            >
              View Analysis Results
            </PrimaryButton>
          ) : (
            <span className="text-xs text-secondary-text">
              Please wait while the stage-based analysis completes...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
