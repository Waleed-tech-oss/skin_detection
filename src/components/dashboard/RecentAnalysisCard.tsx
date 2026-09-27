import React from "react";
import Link from "next/link";
import { History, ArrowRight, Calendar } from "lucide-react";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AIAnalysisResult } from "@/types";

interface RecentAnalysisCardProps {
  history: AIAnalysisResult[];
}

export function RecentAnalysisCard({ history }: RecentAnalysisCardProps) {
  return (
    <div className="bg-surface rounded-[18px] border border-sage-border p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-sage-border/60">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-primary-sage" />
          <h2 className="text-base font-bold text-primary-text font-heading">
            Recent Analysis Timeline
          </h2>
        </div>

        <Link href="/history">
          <SecondaryButton
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
            className="text-xs py-1.5 px-3"
          >
            View History
          </SecondaryButton>
        </Link>
      </div>

      <div className="space-y-3">
        {history.slice(0, 2).map((item) => {
          const formattedDate = new Date(item.createdAt).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          );

          return (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-sage-border bg-very-light-sage/30 flex items-center justify-between gap-3 hover:bg-very-light-sage/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-light-sage text-dark-sage flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-primary-text">
                      {formattedDate}
                    </span>
                    <StatusBadge variant="sage" size="sm">
                      {item.skinType}
                    </StatusBadge>
                  </div>
                  <span className="text-xs text-secondary-text mt-0.5 block">
                    Concern: {item.primaryConcern} ({item.aiConfidence}% Conf.)
                  </span>
                </div>
              </div>

              <Link href="/results">
                <span className="text-xs font-medium text-primary-sage hover:text-dark-sage hover:underline">
                  View
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
