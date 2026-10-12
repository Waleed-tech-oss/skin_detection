import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { MOCK_ANALYSIS_HISTORY } from "@/data/mockData";
import {
  Calendar,
  ArrowRight,
  ScanFace,
  TrendingUp,
  Clock,
  ChevronRight,
} from "lucide-react";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-PK", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HistoryPage() {
  const totalScans = MOCK_ANALYSIS_HISTORY.length;
  const latest = MOCK_ANALYSIS_HISTORY[0];

  return (
    <AppShell pageTitle="Analysis History">
      <PageHeader
        title="Analysis History"
        description="Review past AI skin analyses and observe how your skin profile has evolved over time."
        badge={
          <StatusBadge variant="sage" dot>
            {totalScans} Analyses
          </StatusBadge>
        }
        action={
          <Link href="/analysis">
            <PrimaryButton
              icon={<ScanFace className="w-4 h-4" />}
              className="text-sm"
            >
              New Analysis
            </PrimaryButton>
          </Link>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-surface rounded-[16px] border border-sage-border p-4 space-y-1">
          <span className="text-[11px] font-semibold text-secondary-text uppercase tracking-wider">
            Total Analyses
          </span>
          <div className="flex items-end gap-1.5">
            <span className="text-2xl font-bold text-primary-text font-heading">
              {totalScans}
            </span>
            <span className="text-xs text-secondary-text mb-0.5">scans</span>
          </div>
        </div>

        <div className="bg-surface rounded-[16px] border border-sage-border p-4 space-y-1">
          <span className="text-[11px] font-semibold text-secondary-text uppercase tracking-wider">
            Latest Skin Type
          </span>
          <div className="flex items-end gap-1.5">
            <span className="text-2xl font-bold text-primary-sage font-heading">
              {latest.skinType}
            </span>
          </div>
        </div>

        <div className="bg-surface rounded-[16px] border border-sage-border p-4 space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-semibold text-secondary-text uppercase tracking-wider">
            Primary Visible Concern
          </span>
          <div className="flex items-end gap-1.5">
            <span className="text-2xl font-bold text-primary-text font-heading">
              {latest.primaryConcern}
            </span>
          </div>
        </div>
      </div>

      {/* Analysis list */}
      <SectionCard
        title="Past AI Analyses"
        subtitle="Timeline of all recorded skin scans"
        headerAction={
          <div className="flex items-center gap-1.5 text-xs text-secondary-text">
            <TrendingUp className="w-3.5 h-3.5" />
            Newest first
          </div>
        }
      >
        <div className="space-y-3">
          {MOCK_ANALYSIS_HISTORY.map((scan, index) => (
            <div
              key={scan.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-sage-border bg-surface hover:bg-very-light-sage/40 transition-colors gap-3 group"
            >
              {/* Left: icon + info */}
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-light-sage text-dark-sage flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                  <ScanFace className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {index === 0 && (
                      <StatusBadge variant="success" size="sm" dot>
                        Latest
                      </StatusBadge>
                    )}
                    <span className="font-semibold text-primary-text text-sm">
                      {scan.skinType} Skin · {scan.primaryConcern}
                    </span>
                    <StatusBadge variant="neutral" size="sm">
                      {scan.aiConfidence}% AI Confidence
                    </StatusBadge>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-secondary-text">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{formatDate(scan.createdAt ?? "")}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-secondary-text">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{formatTime(scan.createdAt ?? "")}</span>
                    </div>
                  </div>
                  {/* Detected concerns pills */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {scan.detectedConcerns.map((c) => (
                      <span
                        key={c.concern}
                        className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-full bg-very-light-sage border border-light-sage text-dark-sage font-medium"
                      >
                        {c.concern}
                        <span className="ml-1 text-secondary-text font-normal">
                          {c.confidence}%
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: action */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <Link href={`/history/${scan.id}`}>
                  <SecondaryButton
                    icon={<ChevronRight className="w-3.5 h-3.5" />}
                    iconPosition="right"
                    className="text-xs py-1.5 px-3 group-hover:border-primary-sage/40 group-hover:text-dark-sage"
                  >
                    View Detail
                  </SecondaryButton>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Pagination placeholder */}
      <div className="flex items-center justify-between p-4 bg-surface rounded-2xl border border-sage-border text-xs text-secondary-text">
        <span>Showing {totalScans} of {totalScans} analyses</span>
        <div className="flex items-center gap-2 text-primary-sage font-medium">
          <ArrowRight className="w-3.5 h-3.5" />
          <span>Pagination available after backend integration</span>
        </div>
      </div>
    </AppShell>
  );
}
