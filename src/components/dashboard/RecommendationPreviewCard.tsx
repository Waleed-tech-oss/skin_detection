import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { SkincareProduct } from "@/types";

interface RecommendationPreviewCardProps {
  product: SkincareProduct;
}

export function RecommendationPreviewCard({
  product,
}: RecommendationPreviewCardProps) {
  // Format PKR price
  const formattedPrice = `PKR ${product.price?.toLocaleString() || "2,500"}`;

  return (
    <div className="p-4 sm:p-4.5 rounded-xl border border-sage-border bg-surface flex flex-col justify-between space-y-3.5 hover:border-light-sage transition-all duration-150 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-semibold text-secondary-text uppercase tracking-wider">
            {product.category}
          </span>
          <StatusBadge variant="success" size="sm">
            <Sparkles className="w-3 h-3 mr-1 inline text-success" />
            {product.compatibilityScore}% Compatibility
          </StatusBadge>
        </div>

        <h3 className="text-sm font-bold text-primary-text font-heading leading-snug">
          {product.name}
        </h3>
        <span className="text-xs text-secondary-text block mt-0.5">
          {product.brand}
        </span>

        <p className="text-xs text-secondary-text mt-2 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      <div className="pt-3 border-t border-sage-border/60 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-semibold text-secondary-text block">
            Placeholder Price
          </span>
          <span className="text-xs sm:text-sm font-bold text-primary-text">
            {formattedPrice}
          </span>
        </div>

        <Link href={`/recommendations/${product.id}`}>
          <SecondaryButton
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
            className="text-xs py-1.5 px-3"
          >
            Details
          </SecondaryButton>
        </Link>
      </div>
    </div>
  );
}
