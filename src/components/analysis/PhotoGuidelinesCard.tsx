import React from "react";
import {
  User,
  Sun,
  Eye,
  Camera,
  Users,
  Maximize2,
  Sparkles,
  Shield,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { SectionCard } from "@/components/ui/SectionCard";

export function PhotoGuidelinesCard() {
  const guidelines = [
    { text: "Face the camera directly", positive: true },
    { text: "Use good natural lighting", positive: true },
    { text: "Keep your full face visible", positive: true },
    { text: "Only one person in the image", positive: true },
    { text: "Remove sunglasses", positive: false },
    { text: "Avoid beauty filters", positive: false },
    { text: "Avoid blurry images", positive: false },
    { text: "Avoid side-profile photos", positive: false },
  ];

  return (
    <SectionCard
      title="Photo Guidelines"
      subtitle="For optimal visual analysis"
      className="h-full flex flex-col justify-between"
    >
      <div className="space-y-4">
        <p className="text-xs text-secondary-text leading-relaxed">
          Ensure your photo meets these criteria for accurate visible skin characteristic analysis:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {guidelines.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-very-light-sage/40 border border-light-sage/60 text-xs font-medium text-primary-text"
            >
              {item.positive ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-primary-sage shrink-0" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-[#A86454] shrink-0" />
              )}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Privacy Notice */}
      <div className="mt-6 pt-4 border-t border-sage-border/60">
        <div className="flex items-center gap-2 p-3 rounded-xl bg-surface border border-sage-border text-xs text-secondary-text">
          <Shield className="w-4 h-4 text-primary-sage shrink-0" />
          <span>Your photo is used for skin analysis.</span>
        </div>
      </div>
    </SectionCard>
  );
}
