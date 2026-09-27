import React from "react";
import { cn } from "@/lib/utils";

interface SkinMetricCardProps {
  label: string;
  value: string;
  sublabel?: string;
  confidence?: number;
  highlight?: boolean;
  className?: string;
}

export function SkinMetricCard({
  label,
  value,
  sublabel,
  confidence,
  highlight = false,
  className,
}: SkinMetricCardProps) {
  return (
    <div
      className={cn(
        "bg-surface rounded-[18px] border border-sage-border p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] flex flex-col justify-between transition-all duration-150 hover:border-light-sage",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-secondary-text uppercase tracking-wider">
          {label}
        </span>
        {confidence !== undefined && (
          <span className="text-[11px] font-medium text-secondary-text bg-very-light-sage px-2 py-0.5 rounded-full border border-light-sage/60">
            {confidence}% AI Confidence
          </span>
        )}
      </div>

      <div className="mt-3">
        <div
          className={cn(
            "text-xl sm:text-2xl font-bold tracking-tight font-heading",
            highlight ? "text-primary-sage" : "text-primary-text"
          )}
        >
          {value}
        </div>
        {sublabel && (
          <p className="text-xs text-secondary-text mt-0.5">{sublabel}</p>
        )}
      </div>
    </div>
  );
}
