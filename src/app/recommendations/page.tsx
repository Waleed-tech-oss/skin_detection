"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MOCK_RECOMMENDED_PRODUCTS } from "@/data/mockData";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function RecommendationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedConcern, setSelectedConcern] = useState<string>("All");

  const bestMatchProduct = MOCK_RECOMMENDED_PRODUCTS.find((p) => p.isBestMatch) || MOCK_RECOMMENDED_PRODUCTS[0];

  const filteredProducts = MOCK_RECOMMENDED_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesConcern =
      selectedConcern === "All" ||
      product.targetConcerns.some((c) =>
        c.toLowerCase().includes(selectedConcern.toLowerCase())
      );
    return matchesCategory && matchesConcern;
  });

  return (
    <AppShell pageTitle="Recommendations">
      {/* 1. Page Header */}
      <PageHeader
        title="Recommended For You"
        description="Sample catalog records ranked by an illustrative Compatibility Score for your AI Analysis and questionnaire profile."
        action={
          <Link href="/routine">
            <PrimaryButton icon={<Sparkles className="w-4 h-4" />}>
              View Routine Plan
            </PrimaryButton>
          </Link>
        }
      />

      {/* 2. Active Profile Criteria Chips */}
      <div className="bg-surface rounded-2xl border border-sage-border p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-secondary-text uppercase tracking-wider mr-1">
            Active Filters:
          </span>
          <StatusBadge variant="sage" size="sm">
            Oily Skin
          </StatusBadge>
          <StatusBadge variant="sage" size="sm">
            Acne Concern
          </StatusBadge>
          <StatusBadge variant="beige" size="sm">
            Medium Sensitivity
          </StatusBadge>
          <StatusBadge variant="neutral" size="sm">
            PKR 2k–5k Budget
          </StatusBadge>
        </div>

        <Link
          href="/skin-profile"
          className="text-xs font-medium text-primary-sage hover:underline shrink-0"
        >
          View Profile Match Criteria
        </Link>
      </div>

      {/* 3. Best Match Feature Card */}
      {bestMatchProduct && (
        <div className="bg-surface rounded-[20px] border-2 border-primary-sage/40 p-6 sm:p-7 shadow-xs relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <StatusBadge variant="sage" size="sm">
                  <Sparkles className="w-3.5 h-3.5 mr-1 inline text-primary-sage" />
                  Top Overall Match
                </StatusBadge>
                <span className="text-xs text-secondary-text">
                  Highest illustrative catalog match
                </span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary-sage">
                  {bestMatchProduct.brand} • {bestMatchProduct.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-text font-heading mt-0.5">
                  {bestMatchProduct.name}
                </h2>
                <p className="text-xs sm:text-sm text-secondary-text mt-1.5 leading-relaxed">
                  {bestMatchProduct.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <StatusBadge variant="neutral" size="sm">
                  Ingredient data pending catalog integration
                </StatusBadge>
              </div>
            </div>

            {/* Score & CTA Column */}
            <div className="flex lg:flex-col items-center lg:items-end justify-between gap-4 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-sage-border/60">
              <div className="text-left lg:text-right">
                <span className="text-[10px] uppercase font-semibold text-secondary-text block">
                  Compatibility Score
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-success font-heading">
                  {bestMatchProduct.compatibilityScore}%
                </span>
                <span className="text-sm font-semibold text-primary-text block mt-0.5">
                  PKR {bestMatchProduct.price?.toLocaleString()}
                </span>
              </div>

              <Link href={`/recommendations/${bestMatchProduct.id}`}>
                <PrimaryButton
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="px-5 py-2.5 text-xs sm:text-sm"
                >
                  View Details & Match Reasons
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 4. Filter Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-secondary-text uppercase tracking-wider mr-1 shrink-0">
            Category:
          </span>
          {["All", "Cleanser", "Serum", "Moisturizer", "Sunscreen"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? "bg-primary-sage text-white shadow-xs"
                  : "bg-surface border border-sage-border text-secondary-text hover:text-primary-text hover:bg-very-light-sage/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-secondary-text uppercase tracking-wider shrink-0">
            Concern:
          </span>
          {["All", "Acne", "Redness", "Pigmentation"].map((con) => (
            <button
              key={con}
              type="button"
              onClick={() => setSelectedConcern(con)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                selectedConcern === con
                  ? "bg-dark-sage text-white shadow-xs"
                  : "bg-surface border border-sage-border text-secondary-text hover:text-primary-text"
              }`}
            >
              {con}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Responsive Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-surface rounded-[18px] border border-sage-border p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4 hover:border-light-sage transition-all duration-150"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-secondary-text uppercase tracking-wider">
                  {product.category}
                </span>
                <StatusBadge variant="success" size="sm">
                  {product.compatibilityScore}% Compatibility
                </StatusBadge>
              </div>

              <div>
                <span className="text-xs text-secondary-text block">
                  {product.brand}
                </span>
                <h3 className="text-base font-bold text-primary-text font-heading leading-snug">
                  {product.name}
                </h3>
              </div>

              <p className="text-xs text-secondary-text line-clamp-2 leading-relaxed">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <StatusBadge variant="sage" size="sm">
                  Placeholder catalog record
                </StatusBadge>
              </div>
            </div>

            <div className="pt-3 border-t border-sage-border/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-secondary-text block">
                  Placeholder Price
                </span>
                <span className="text-sm font-bold text-primary-text">
                  PKR {product.price?.toLocaleString()}
                </span>
              </div>

              <Link href={`/recommendations/${product.id}`}>
                <SecondaryButton
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  iconPosition="right"
                  className="text-xs py-1.5 px-3"
                >
                  View Details
                </SecondaryButton>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Subtle Explanation Footer */}
      <div className="p-4 bg-surface rounded-2xl border border-sage-border text-xs text-secondary-text flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary-sage shrink-0" />
          Compatibility Scores shown here are illustrative until verified product catalog data is connected.
        </span>
        <span className="text-secondary-text/70">Sample catalog data</span>
      </div>
    </AppShell>
  );
}
