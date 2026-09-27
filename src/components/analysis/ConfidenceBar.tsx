import React from "react";
import { cn } from "@/lib/utils";

interface ConfidenceBarProps {
  label: string;
  confidence: number; // 0 to 100
  region?: string;
  isPrimary?: boolean;
}

export function ConfidenceBar({
  label,
  confidence,
  region,
  isPrimary = false,
}: ConfidenceBarProps) {
  return (
    <div className="space-y-1.5 p-3 rounded-xl bg-surface border border-sage-border">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-primary-text">{label}</span>
          {region && (
            <span className="text-[11px] text-secondary-text hidden sm:inline">
              ({region})
            </span>
          )}
          {isPrimary && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-sage bg-very-light-sage px-2 py-0.5 rounded border border-light-sage/60">
              Primary
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-secondary-text text-[11px]">AI Confidence:</span>
          <span className="font-bold text-primary-text">{confidence}%</span>
        </div>
      </div>

      {/* Track and Fill */}
      <div className="w-full h-2 rounded-full bg-very-light-sage overflow-hidden border border-light-sage/50">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            isPrimary ? "bg-primary-sage" : "bg-primary-sage/75"
          )}
          style={{ width: `${Math.min(100, Math.max(0, confidence))}%` }}
        />
      </div>
    </div>
  );
}
