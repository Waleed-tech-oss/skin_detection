import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { MOCK_RECOMMENDED_PRODUCTS, ExtendedProduct } from "@/data/mockData";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Layers,
  HeartHandshake,
  DollarSign,
  PackageCheck,
} from "lucide-react";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product: ExtendedProduct =
    MOCK_RECOMMENDED_PRODUCTS.find((p) => p.id === id) ||
    MOCK_RECOMMENDED_PRODUCTS[0];

  const whyRecommend = product.whyRecommend || {
    skinTypeMatch: "Formulated specifically for oily sebum control",
    concernMatch: "Targeted actives address visible surface concerns",
    sensitivityMatch: "Fragrance-free formula suitable for medium sensitivity",
    ingredientMatch: "Free of known excluded ingredients",
    budgetMatch: "Within target budget range (PKR 2,000–5,000)",
  };

  return (
    <AppShell pageTitle={`Product - ${product.name}`}>
      {/* 1. Page Header */}
      <PageHeader
        title={product.name}
        description={`${product.brand} • ${product.category}`}
        badge={
          <StatusBadge variant="success">
            <Sparkles className="w-3.5 h-3.5 mr-1 inline" />
            {product.compatibilityScore}% Compatibility Score
          </StatusBadge>
        }
        action={
          <Link href="/recommendations">
            <SecondaryButton icon={<ArrowLeft className="w-4 h-4" />}>
              Back to Recommendations
            </SecondaryButton>
          </Link>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ============================================================ */}
        {/* LEFT COLUMN: Overview & Why We Recommend It (7 cols)         */}
        {/* ============================================================ */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Overview & Formulation */}
          <SectionCard title="Product Catalog Record" subtitle="Placeholder integration data">
            <div className="space-y-4">
              <p className="text-sm text-secondary-text leading-relaxed">
                {product.description}
              </p>

              <div className="pt-2">
                <span className="text-xs font-semibold text-secondary-text uppercase tracking-wider block mb-2">
                  Ingredient Data
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 rounded-xl border border-light-sage/60 bg-very-light-sage/40 p-2.5 text-xs font-medium text-primary-text">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary-sage" />
                    <span>Pending verified product catalog integration</span>
                  </div>
                </div>
              </div>

              {product.suitableFor && (
                <div className="pt-2 border-t border-sage-border/60">
                  <span className="text-xs font-semibold text-secondary-text uppercase tracking-wider block mb-2">
                    Suitable For
                  </span>
                  <ul className="space-y-1.5 text-xs text-secondary-text">
                    {product.suitableFor.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-sage shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </SectionCard>

          {/* Section 2: Why We Recommend It */}
          <SectionCard
            title="Why We Recommend It"
            subtitle="Match factor breakdown for your skin profile"
          >
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-surface border border-sage-border flex items-start gap-3">
                <Layers className="w-4 h-4 text-primary-sage shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-primary-text block">
                    Skin Type Match
                  </span>
                  <span className="text-xs text-secondary-text mt-0.5 block">
                    {whyRecommend.skinTypeMatch}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface border border-sage-border flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-primary-sage shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-primary-text block">
                    Concern Match
                  </span>
                  <span className="text-xs text-secondary-text mt-0.5 block">
                    {whyRecommend.concernMatch}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface border border-sage-border flex items-start gap-3">
                <HeartHandshake className="w-4 h-4 text-primary-sage shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-primary-text block">
                    Sensitivity Compatibility
                  </span>
                  <span className="text-xs text-secondary-text mt-0.5 block">
                    {whyRecommend.sensitivityMatch}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface border border-sage-border flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-primary-sage shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-primary-text block">
                    Ingredient Preference Match
                  </span>
                  <span className="text-xs text-secondary-text mt-0.5 block">
                    {whyRecommend.ingredientMatch}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface border border-sage-border flex items-start gap-3">
                <DollarSign className="w-4 h-4 text-primary-sage shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-primary-text block">
                    Budget Match
                  </span>
                  <span className="text-xs text-secondary-text mt-0.5 block">
                    {whyRecommend.budgetMatch}
                  </span>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: Compatibility Card & Product Link (5 cols)     */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: Summary Specs */}
          <SectionCard title="Match Summary">
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-sage-border/60">
                <span className="text-xs text-secondary-text">Compatibility Score</span>
                <span className="text-base font-bold text-success font-heading">
                  {product.compatibilityScore}%
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-sage-border/60">
                <span className="text-xs text-secondary-text">Price</span>
                <span className="text-base font-bold text-primary-text">
                  PKR {product.price?.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-sage-border/60">
                <span className="text-xs text-secondary-text">Product Category</span>
                <span className="font-semibold text-primary-text">{product.category}</span>
              </div>

              {/* Preferences Filtered */}
              <div className="pt-2 space-y-2">
                <span className="text-xs font-semibold text-secondary-text uppercase tracking-wider block">
                  Preferences Considered
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(product.preferencesConsidered || ["Fragrance-Free", "Essential Oil Free", "PKR 2k–5k Budget"]).map((pref) => (
                    <StatusBadge key={pref} variant="sage" size="sm">
                      {pref}
                    </StatusBadge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-2.5">
                <Link href="/routine" className="block">
                  <PrimaryButton fullWidth icon={<PackageCheck className="w-4 h-4" />}>
                    View Daily Routine
                  </PrimaryButton>
                </Link>

                <div className="p-3 bg-very-light-sage/50 rounded-xl border border-light-sage/60 text-xs text-secondary-text flex items-center justify-between">
                  <span>Product source</span>
                  <span className="font-medium text-dark-sage">Not connected</span>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Clinical Guidance Disclaimer */}
          <div className="p-4 bg-surface rounded-2xl border border-sage-border text-xs text-secondary-text leading-relaxed">
            <p>
              <strong>Note:</strong> Recommendations provide cosmetic formulation guidance aligned with detected surface traits. They do not constitute a medical prescription or diagnostic remedy.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
