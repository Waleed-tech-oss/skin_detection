import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Info, Palette, Plug, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppShell pageTitle="Settings">
      <PageHeader
        title="Settings & Preferences"
        description="Review application display and integration settings."
        badge={<StatusBadge variant="neutral">Settings</StatusBadge>}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard
          title="Appearance"
          subtitle="Current visual configuration"
        >
          <div className="flex items-center justify-between rounded-xl border border-light-sage/60 bg-very-light-sage/40 p-4">
            <div className="flex items-start gap-3">
              <Palette className="mt-0.5 h-4 w-4 shrink-0 text-primary-sage" />
              <div>
                <span className="block text-sm font-medium text-primary-text">
                  Theme Palette
                </span>
                <span className="text-xs text-secondary-text">
                  Soft Clinical Sage
                </span>
              </div>
            </div>
            <StatusBadge variant="sage" size="sm">
              Active
            </StatusBadge>
          </div>
        </SectionCard>

        <SectionCard
          title="Backend Integration"
          subtitle="Service-backed settings planned for the next phase"
        >
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-xl border border-light-sage/60 bg-very-light-sage/40 p-4">
              <Plug className="mt-0.5 h-4 w-4 shrink-0 text-primary-sage" />
              <div>
                <span className="block text-sm font-medium text-primary-text">
                  Service connections
                </span>
                <span className="text-xs leading-relaxed text-secondary-text">
                  Auth, analysis, questionnaire, product, recommendation, and history contracts are ready for adapters.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-sage-border bg-surface p-4">
              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary-sage" />
              <div>
                <span className="block text-sm font-medium text-primary-text">
                  Account and data controls
                </span>
                <span className="text-xs leading-relaxed text-secondary-text">
                  These controls will appear only after authenticated persistence and deletion behavior are implemented.
                </span>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="flex items-start gap-3 rounded-[14px] border border-sage-border bg-surface p-4 text-sm text-secondary-text">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary-sage" />
        <span>
          Notification and privacy toggles are intentionally omitted until their behavior is backed by real services.
        </span>
      </div>
    </AppShell>
  );
}
