import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ConfidenceBar } from "@/components/analysis/ConfidenceBar";
import {
  MOCK_AI_ANALYSIS,
  MOCK_USER_PREFERENCES,
} from "@/data/mockData";
import {
  Sparkles,
  ArrowRight,
  Sliders,
  Layers,
  Sun,
  Eye,
  RotateCcw,
} from "lucide-react";

export default function SkinProfilePage() {
  return (
    <AppShell pageTitle="My Skin Profile">
      <PageHeader
        title="My Skin Profile"
        description="Comprehensive profile combining objective AI facial scan data with your custom preferences."
        action={
          <div className="flex items-center gap-3">
            <Link href="/questionnaire">
              <SecondaryButton icon={<Sliders className="w-4 h-4" />}>
                Edit Preferences
              </SecondaryButton>
            </Link>
            <Link href="/recommendations">
              <PrimaryButton
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                View Recommendations
              </PrimaryButton>
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ============================================================ */}
        {/* 1. AI ANALYSIS SECTION (7 cols on desktop)                   */}
        {/* ============================================================ */}
        <div className="lg:col-span-7 space-y-6">
          <SectionCard
            title="AI Analysis"
            subtitle="Automated visual classifications from facial image scan"
            headerAction={
              <Link href="/analysis">
                <SecondaryButton
                  icon={<RotateCcw className="w-3.5 h-3.5" />}
                  className="text-xs py-1 px-2.5"
                >
                  New Scan
                </SecondaryButton>
              </Link>
            }
          >
            <div className="space-y-6">
              {/* Primary AI Classifications */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-very-light-sage/40 border border-light-sage/70 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-secondary-text uppercase tracking-wider">
                      Skin Type
                    </span>
                    <Layers className="w-3.5 h-3.5 text-primary-sage" />
                  </div>
                  <span className="text-base font-bold text-primary-text block">
                    {MOCK_AI_ANALYSIS.skinType}
                  </span>
                  <span className="text-[11px] text-secondary-text block">
                    AI Confidence: {MOCK_AI_ANALYSIS.skinTypeConfidence || 87}%
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-very-light-sage/40 border border-light-sage/70 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-secondary-text uppercase tracking-wider">
                      Skin Tone
                    </span>
                    <Sun className="w-3.5 h-3.5 text-[#8E7963]" />
                  </div>
                  <span className="text-base font-bold text-primary-text block">
                    {MOCK_AI_ANALYSIS.skinTone}
                  </span>
                  <span className="text-[11px] text-secondary-text block">
                    AI Confidence: {MOCK_AI_ANALYSIS.skinToneConfidence || 90}%
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-very-light-sage/40 border border-light-sage/70 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-secondary-text uppercase tracking-wider">
                      Primary Visible Concern
                    </span>
                    <Eye className="w-3.5 h-3.5 text-primary-sage" />
                  </div>
                  <span className="text-base font-bold text-primary-sage block">
                    {MOCK_AI_ANALYSIS.primaryConcern}
                  </span>
                  <span className="text-[11px] text-secondary-text block">
                    AI Confidence: {MOCK_AI_ANALYSIS.primaryConcernConfidence || 94}%
                  </span>
                </div>
              </div>

              {/* Additional AI Signals */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold text-secondary-text uppercase tracking-wider block">
                  Detected Surface Concerns & Multi-Label Signals
                </span>

                <div className="space-y-2.5">
                  <ConfidenceBar
                    label="Acne (Primary Visible Concern)"
                    confidence={94}
                    region="Cheeks & Forehead"
                    isPrimary
                  />
                  <ConfidenceBar
                    label="Redness"
                    confidence={64}
                    region="Cheeks"
                  />
                  <ConfidenceBar
                    label="Pigmentation"
                    confidence={42}
                    region="Temple & Forehead"
                  />
                </div>

                <p className="text-[11px] text-secondary-text pt-1">
                  * Acne is the primary AI-detected concern. Redness and Pigmentation are additional detected signals at lower confidence.
                </p>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* ============================================================ */}
        {/* 2. USER-PROVIDED PREFERENCES (5 cols on desktop)             */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 space-y-6">
          <SectionCard
            title="User-Provided Preferences"
            subtitle="Custom requirements configured by you"
            headerAction={
              <Link href="/questionnaire">
                <SecondaryButton
                  icon={<Sliders className="w-3.5 h-3.5" />}
                  className="text-xs py-1 px-2.5"
                >
                  Edit
                </SecondaryButton>
              </Link>
            }
          >
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-surface border border-sage-border flex items-center justify-between">
                <div>
                  <span className="text-xs text-secondary-text block">
                    Skin Sensitivity
                  </span>
                  <span className="font-semibold text-primary-text">
                    Yes ({MOCK_USER_PREFERENCES.sensitivityLevel} Reactivity)
                  </span>
                </div>
                <StatusBadge variant="sage" size="sm">
                  Active
                </StatusBadge>
              </div>

              <div className="p-3 rounded-xl bg-surface border border-sage-border flex items-center justify-between">
                <div>
                  <span className="text-xs text-secondary-text block">
                    Target Budget Range
                  </span>
                  <span className="font-semibold text-primary-text">
                    PKR 2,000–5,000 per product
                  </span>
                </div>
                <StatusBadge variant="beige" size="sm">
                  Mid-Range
                </StatusBadge>
              </div>

              <div className="p-3 rounded-xl bg-surface border border-sage-border flex items-center justify-between">
                <div>
                  <span className="text-xs text-secondary-text block">
                    Fragrance Preference
                  </span>
                  <span className="font-semibold text-primary-text">
                    Fragrance-Free
                  </span>
                </div>
                <StatusBadge variant="sage" size="sm">
                  Filtered
                </StatusBadge>
              </div>

              <div className="p-3 rounded-xl bg-surface border border-sage-border space-y-2">
                <span className="text-xs text-secondary-text block">
                  Ingredients to Avoid
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <StatusBadge variant="warning" size="sm">
                    Fragrance
                  </StatusBadge>
                  <StatusBadge variant="warning" size="sm">
                    Essential Oils
                  </StatusBadge>
                  <StatusBadge variant="neutral" size="sm">
                    Sulfates
                  </StatusBadge>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Quick CTA Banner */}
          <div className="bg-very-light-sage/60 rounded-2xl border border-light-sage/80 p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary-sage" />
              <h3 className="text-sm font-bold text-primary-text font-heading">
                Ready for Matches?
              </h3>
            </div>
            <p className="text-xs text-secondary-text">
              View cosmetic product formulas ranked by ingredient compatibility score for your combined profile.
            </p>
            <Link href="/recommendations" className="block pt-1">
              <PrimaryButton fullWidth icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                View Recommendations
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
