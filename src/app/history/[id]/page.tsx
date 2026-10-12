import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { MOCK_ANALYSIS_HISTORY } from "@/data/mockData";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Layers,
  Sun,
  Eye,
  Shield,
  Sparkles,
  ScanFace,
  ChevronRight,
} from "lucide-react";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-PK", {
    weekday: "long",
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

function ConfidenceBar({
  label,
  confidence,
  isPrimary = false,
}: {
  label: string;
  confidence: number;
  isPrimary?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium text-primary-text">{label}</span>
          {isPrimary && (
            <StatusBadge variant="sage" size="sm">
              Primary
            </StatusBadge>
          )}
        </div>
        <span className="font-bold text-primary-sage tabular-nums">
          {confidence}%
        </span>
      </div>
      <div className="h-2 w-full bg-very-light-sage rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${confidence}%`,
            background: isPrimary
              ? "var(--primary-sage)"
              : "var(--light-sage)",
          }}
        />
      </div>
    </div>
  );
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HistoryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const scan = MOCK_ANALYSIS_HISTORY.find((s) => s.id === id);

  if (!scan) {
    notFound();
  }

  const dateStr = formatDate(scan.createdAt ?? "");
  const timeStr = formatTime(scan.createdAt ?? "");

  // Find prev/next for navigation
  const idx = MOCK_ANALYSIS_HISTORY.indexOf(scan);
  const prev = MOCK_ANALYSIS_HISTORY[idx + 1];
  const next = MOCK_ANALYSIS_HISTORY[idx - 1];

  return (
    <AppShell pageTitle="Analysis Detail">
      <PageHeader
        title="Analysis Detail"
        description={`${dateStr} · ${timeStr}`}
        badge={
          <StatusBadge variant="sage" dot>
            Analysis Complete
          </StatusBadge>
        }
        action={
          <Link href="/history">
            <SecondaryButton icon={<ArrowLeft className="w-4 h-4" />}>
              Back to History
            </SecondaryButton>
          </Link>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Photo frame + metadata */}
        <div className="lg:col-span-5 space-y-4">
          <SectionCard title="Analyzed Photo" subtitle="Frontal portrait assessment">
            <div className="space-y-4">
              {/* Placeholder scan frame */}
              <div className="relative aspect-4/3 w-full rounded-2xl bg-very-light-sage/60 border border-light-sage overflow-hidden flex items-center justify-center p-4">
                <div className="relative w-36 h-44 sm:w-44 sm:h-52 rounded-full border-2 border-dashed border-primary-sage/60 flex items-center justify-center bg-surface/50 backdrop-blur-xs">
                  <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-primary-sage" />
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-primary-sage" />
                  <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-primary-sage" />
                  <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-primary-sage" />
                  <svg
                    className="w-24 h-32 text-primary-sage/50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  >
                    <path d="M12 2a7 7 0 0 0-7 7c0 5 3 9 7 12 4-3 7-7 7-12a7 7 0 0 0-7-7z" />
                    <circle cx="9" cy="9" r="1" fill="currentColor" />
                    <circle cx="15" cy="9" r="1" fill="currentColor" />
                    <path d="M12 12v2" />
                    <path d="M10 16c1 .5 3 .5 4 0" />
                  </svg>
                  <div className="absolute top-8 left-6 w-2.5 h-2.5 rounded-full bg-warning ring-4 ring-warning/20" />
                  <div className="absolute top-12 right-7 w-2.5 h-2.5 rounded-full bg-warning ring-4 ring-warning/20" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-surface/95 backdrop-blur-xs border border-sage-border px-3 py-2 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-secondary-text">Alignment: Frontal</span>
                  <span className="font-semibold text-primary-sage">Analysis Complete</span>
                </div>
              </div>

              {/* Scan metadata */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 text-secondary-text">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{dateStr}</span>
                </div>
                <div className="flex items-center gap-2 text-secondary-text">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{timeStr}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-very-light-sage/60 border border-light-sage text-xs text-dark-sage">
                <Shield className="w-4 h-4 text-primary-sage shrink-0" />
                <span>AI Confidence: <strong>{scan.aiConfidence}%</strong> overall model output</span>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Right: AI Results */}
        <div className="lg:col-span-7 space-y-6">
          {/* Primary metrics */}
          <SectionCard title="Primary AI Results" subtitle="Automated visual classifications">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-xl bg-very-light-sage/40 border border-light-sage/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-secondary-text uppercase tracking-wider">
                    Skin Type
                  </span>
                  <Layers className="w-3.5 h-3.5 text-primary-sage" />
                </div>
                <span className="text-xl font-bold text-primary-text font-heading block">
                  {scan.skinType}
                </span>
                <span className="text-[11px] text-secondary-text">
                  AI Confidence:{" "}
                  <span className="font-bold text-primary-sage">
                    {scan.aiConfidence}%
                  </span>
                </span>
              </div>

              <div className="p-4 rounded-xl bg-very-light-sage/40 border border-light-sage/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-secondary-text uppercase tracking-wider">
                    Skin Tone
                  </span>
                  <Sun className="w-3.5 h-3.5 text-[#8E7963]" />
                </div>
                <span className="text-xl font-bold text-primary-text font-heading block">
                  {scan.skinTone ?? "Mid-Light"}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-very-light-sage/40 border border-light-sage/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-secondary-text uppercase tracking-wider">
                    Primary Visible Concern
                  </span>
                  <Eye className="w-3.5 h-3.5 text-primary-sage" />
                </div>
                <span className="text-xl font-bold text-primary-sage font-heading block">
                  {scan.primaryConcern}
                </span>
              </div>
            </div>
          </SectionCard>

          {/* Detected concerns */}
          <SectionCard
            title="Detected Visible Concerns"
            subtitle="AI confidence breakdown for visible characteristics"
          >
            <div className="space-y-4">
              {scan.detectedConcerns.map((item) => (
                <ConfidenceBar
                  key={item.concern}
                  label={item.concern}
                  confidence={item.confidence}
                  isPrimary={item.concern === scan.primaryConcern}
                />
              ))}
              <p className="text-[11px] text-secondary-text leading-relaxed pt-1">
                * Percentages are AI Confidence outputs for visible surface characteristics, not medical severity measures.
              </p>
            </div>
          </SectionCard>

          {/* Next Step CTA */}
          <div className="bg-very-light-sage/60 rounded-[18px] border border-light-sage/80 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-sage">
                <Sparkles className="w-3.5 h-3.5" />
                Based on this analysis
              </div>
              <p className="text-sm font-semibold text-primary-text">
                View your personalized recommendations
              </p>
            </div>
            <Link href="/recommendations">
              <PrimaryButton
                icon={<ChevronRight className="w-4 h-4" />}
                iconPosition="right"
                className="text-sm shrink-0"
              >
                Recommendations
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between gap-4 pt-2">
        {prev ? (
          <Link href={`/history/${prev.id}`} className="flex-1 max-w-xs">
            <SecondaryButton
              icon={<ArrowLeft className="w-4 h-4" />}
              className="text-sm w-full justify-start"
            >
              <span className="truncate">Older: {prev.primaryConcern} · {prev.skinType}</span>
            </SecondaryButton>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link href={`/history/${next.id}`} className="flex-1 max-w-xs ml-auto">
            <SecondaryButton
              icon={<ScanFace className="w-4 h-4" />}
              iconPosition="right"
              className="text-sm w-full justify-end"
            >
              <span className="truncate">Newer: {next.primaryConcern} · {next.skinType}</span>
            </SecondaryButton>
          </Link>
        ) : null}
      </div>
    </AppShell>
  );
}
