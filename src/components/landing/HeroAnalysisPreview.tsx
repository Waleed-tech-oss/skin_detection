import React from "react";
import { Scan, Sparkles } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function HeroAnalysisPreview() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Outer Card Container */}
      <div className="relative bg-surface rounded-[22px] border border-sage-border shadow-[0_8px_30px_-6px_rgba(54,83,68,0.06)] p-5 sm:p-6 overflow-hidden">
        {/* Card Header Bar */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-sage-border/60">
          <div>
            <h2 className="text-sm font-bold text-primary-text font-heading">
              Your Skin Analysis
            </h2>
            <p className="text-[11px] text-secondary-text">AI Analysis Preview</p>
          </div>
          <StatusBadge variant="success" size="sm">
            <Sparkles className="w-3 h-3 mr-1 inline text-success" />
            Analysis Complete
          </StatusBadge>
        </div>

        {/* Scan Frame & Visualization Area */}
        <div className="relative aspect-4/3 w-full rounded-2xl bg-very-light-sage/60 border border-light-sage/80 overflow-hidden flex items-center justify-center p-4">
          {/* Subtle Grid Pattern */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#607D67 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Facial Silhouette with Optical Target Brackets */}
          <div className="relative w-36 h-44 sm:w-40 sm:h-48 rounded-full border-2 border-dashed border-primary-sage/40 flex items-center justify-center bg-surface/40 backdrop-blur-xs">
            {/* Target Reticles */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary-sage" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary-sage" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary-sage" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary-sage" />

            {/* Stylized Face Silhouette SVG */}
            <svg
              className="w-20 h-28 text-primary-sage/50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a7 7 0 0 0-7 7c0 5 3 9 7 12 4-3 7-7 7-12a7 7 0 0 0-7-7z" />
              <circle cx="9" cy="9" r="1" fill="currentColor" />
              <circle cx="15" cy="9" r="1" fill="currentColor" />
              <path d="M12 12v2" />
              <path d="M10 16c1 .5 3 .5 4 0" />
            </svg>

            {/* Focus Region Highlight Tag */}
            <div className="absolute -top-3 px-2.5 py-0.5 bg-primary-sage text-white text-[10px] font-semibold rounded-full shadow-xs flex items-center gap-1">
              <Scan className="w-2.5 h-2.5" />
              Focus: T-Zone & Cheeks
            </div>
          </div>

          {/* Floating Confidence Pill */}
          <div className="absolute bottom-3 right-3 bg-surface/95 backdrop-blur-xs border border-sage-border px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success" />
            <div className="text-left">
              <span className="text-[10px] text-secondary-text uppercase block leading-none font-semibold">
                AI Confidence
              </span>
              <span className="text-xs font-bold text-primary-text leading-tight">
                87% (High Confidence)
              </span>
            </div>
          </div>
        </div>

        {/* Analysis Metrics Grid */}
        <div className="grid grid-cols-3 gap-2.5 mt-4">
          <div className="p-2.5 rounded-xl bg-very-light-sage/50 border border-light-sage/60 text-left">
            <span className="text-[10px] uppercase font-semibold text-secondary-text block">
              Skin Type
            </span>
            <span className="text-sm font-bold text-primary-text">Oily</span>
          </div>

          <div className="p-2.5 rounded-xl bg-very-light-sage/50 border border-light-sage/60 text-left">
            <span className="text-[10px] uppercase font-semibold text-secondary-text block">
              Skin Tone
            </span>
            <span className="text-sm font-bold text-primary-text">Mid-Light</span>
          </div>

          <div className="p-2.5 rounded-xl bg-very-light-sage/50 border border-light-sage/60 text-left">
            <span className="text-[10px] uppercase font-semibold text-secondary-text block">
              Visible Concern
            </span>
            <span className="text-sm font-bold text-primary-sage">Acne</span>
          </div>
        </div>

        {/* Detected Concerns Chips */}
        <div className="mt-3.5 pt-3 border-t border-sage-border/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            <StatusBadge variant="beige" size="sm">
              Acne (87%)
            </StatusBadge>
            <StatusBadge variant="beige" size="sm">
              Redness (64%)
            </StatusBadge>
            <StatusBadge variant="beige" size="sm">
              Pigmentation (42%)
            </StatusBadge>
          </div>
          <span className="text-[11px] text-secondary-text font-medium">
            3 Surface Characteristics
          </span>
        </div>
      </div>
    </div>
  );
}
