"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Bell,
  Lock,
  Palette,
  Shield,
  Eye,
  Trash2,
  ChevronRight,
  Info,
  AlertTriangle,
  Check,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* Reusable toggle switch */
function Toggle({
  id,
  checked,
  onChange,
  disabled = false,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-sage/40 focus-visible:ring-offset-2",
        checked ? "bg-primary-sage" : "bg-sage-border",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <span
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200",
          checked ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  );
}

/* Row with a toggle */
function ToggleRow({
  icon: Icon,
  label,
  description,
  settingId,
  checked,
  onChange,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  settingId: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-very-light-sage/40 border border-light-sage/60 gap-4">
      <div className="flex items-start gap-3 min-w-0">
        <Icon className="w-4 h-4 text-primary-sage mt-0.5 shrink-0" />
        <div className="min-w-0">
          <span className="font-medium text-primary-text text-sm block">{label}</span>
          <span className="text-xs text-secondary-text">{description}</span>
        </div>
      </div>
      <Toggle id={settingId} checked={checked} onChange={onChange} />
    </div>
  );
}

type AppearanceMode = "light" | "system" | "dark";

export default function SettingsPage() {
  // Privacy & Security
  const [imageRetention, setImageRetention] = useState(true);
  const [analyticsOptOut, setAnalyticsOptOut] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(true);

  // Notifications
  const [analysisAlerts, setAnalysisAlerts] = useState(true);
  const [recommendationUpdates, setRecommendationUpdates] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  // Appearance
  const [mode, setMode] = useState<AppearanceMode>("light");

  // Save feedback
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AppShell pageTitle="Settings">
      <PageHeader
        title="Settings & Preferences"
        description="Manage privacy options, notification preferences, and application appearance."
        badge={<StatusBadge variant="neutral">Settings</StatusBadge>}
      />

      {saved && (
        <div className="flex items-center gap-2 p-3.5 bg-[#EEF7F2] border border-[#CBE5D6] rounded-[14px] text-sm text-success font-medium">
          <Check className="w-4 h-4 shrink-0" />
          Settings saved. Changes will apply after backend integration.
        </div>
      )}

      {/* Demo mode notice */}
      <div className="flex items-start gap-3 p-4 rounded-[14px] bg-[#FDF6ED] border border-[#F3DFC9] text-sm text-[#7C5B2B]">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <span>
          <strong>Demo mode:</strong> All toggles are interactive for UI demonstration. No settings are persisted until backend integration.
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Privacy & Security */}
        <SectionCard
          title="Privacy & Security"
          subtitle="Control how your data is handled"
        >
          <div className="space-y-3">
            <ToggleRow
              icon={Shield}
              settingId="settings-image-retention"
              label="Restrict AI Image Retention"
              description="Do not store raw facial images after analysis"
              checked={imageRetention}
              onChange={setImageRetention}
            />
            <ToggleRow
              icon={Eye}
              settingId="settings-analytics"
              label="Opt Out of Analytics"
              description="Prevent anonymized usage data collection"
              checked={analyticsOptOut}
              onChange={setAnalyticsOptOut}
            />
            <ToggleRow
              icon={Lock}
              settingId="settings-session"
              label="Auto Session Timeout"
              description="Automatically log out after 30 minutes of inactivity"
              checked={sessionTimeout}
              onChange={setSessionTimeout}
            />

            {/* Change password link */}
            <a
              href="/profile"
              className="flex items-center justify-between p-4 rounded-xl bg-very-light-sage/40 border border-light-sage/60 hover:bg-very-light-sage transition-colors group"
            >
              <div className="flex items-start gap-3">
                <Lock className="w-4 h-4 text-primary-sage mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-primary-text text-sm block">Account Password</span>
                  <span className="text-xs text-secondary-text">Last changed 30 days ago</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-secondary-text group-hover:text-primary-sage transition-colors" />
            </a>
          </div>
        </SectionCard>

        {/* Notifications */}
        <SectionCard
          title="Notifications"
          subtitle="Choose what you want to be notified about"
        >
          <div className="space-y-3">
            <ToggleRow
              icon={Bell}
              settingId="settings-analysis-alerts"
              label="Analysis Complete Alerts"
              description="Notify when a skin analysis finishes processing"
              checked={analysisAlerts}
              onChange={setAnalysisAlerts}
            />
            <ToggleRow
              icon={Bell}
              settingId="settings-recommendation-updates"
              label="Recommendation Updates"
              description="Alert when new compatible products are available"
              checked={recommendationUpdates}
              onChange={setRecommendationUpdates}
            />
            <ToggleRow
              icon={Bell}
              settingId="settings-weekly-digest"
              label="Weekly Skin Digest"
              description="Receive a weekly summary of your skin profile trends"
              checked={weeklyDigest}
              onChange={setWeeklyDigest}
            />
          </div>
        </SectionCard>

        {/* Appearance */}
        <SectionCard
          title="Appearance"
          subtitle="Visual theme and display preferences"
        >
          <div className="space-y-4">
            {/* Theme palette — read-only */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-very-light-sage/40 border border-light-sage/60">
              <div className="flex items-start gap-3">
                <Palette className="w-4 h-4 text-primary-sage mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-primary-text text-sm block">Theme Palette</span>
                  <span className="text-xs text-secondary-text">Soft Clinical Sage</span>
                </div>
              </div>
              <StatusBadge variant="sage" size="sm">Active</StatusBadge>
            </div>

            {/* Display mode selector */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-primary-text uppercase tracking-wider block">
                Display Mode
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { value: "light", icon: Sun, label: "Light" },
                    { value: "system", icon: Monitor, label: "System" },
                    { value: "dark", icon: Moon, label: "Dark" },
                  ] as { value: AppearanceMode; icon: React.ComponentType<{ className?: string }>; label: string }[]
                ).map(({ value, icon: Icon, label }) => (
                  <button
                    key={value}
                    id={`settings-mode-${value}`}
                    type="button"
                    onClick={() => setMode(value)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all duration-150",
                      mode === value
                        ? "bg-primary-sage text-white border-primary-sage shadow-sm"
                        : "bg-surface text-secondary-text border-sage-border hover:border-primary-sage/40 hover:text-primary-text"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-secondary-text">
                Dark mode will be available after backend integration.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Danger Zone */}
        <SectionCard
          title="Data Management"
          subtitle="Irreversible account actions"
        >
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-xs text-[#B91C1C]">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                These actions cannot be undone. In demo mode, no data is actually deleted.
              </span>
            </div>

            <button
              type="button"
              className="w-full flex items-center gap-3 p-4 rounded-xl border border-[#FCA5A5]/60 bg-[#FEF2F2]/40 hover:bg-[#FEF2F2] text-sm text-[#B91C1C] font-medium transition-colors text-left group"
            >
              <Trash2 className="w-4 h-4 shrink-0 text-[#B91C1C]" />
              <div>
                <span className="block">Delete All Analysis History</span>
                <span className="text-xs font-normal text-[#B91C1C]/70">
                  Permanently removes all stored AI analysis data
                </span>
              </div>
            </button>

            <button
              type="button"
              className="w-full flex items-center gap-3 p-4 rounded-xl border border-[#FCA5A5]/60 bg-[#FEF2F2]/40 hover:bg-[#FEF2F2] text-sm text-[#B91C1C] font-medium transition-colors text-left group"
            >
              <Trash2 className="w-4 h-4 shrink-0 text-[#B91C1C]" />
              <div>
                <span className="block">Delete Account</span>
                <span className="text-xs font-normal text-[#B91C1C]/70">
                  Permanently removes your account and all associated data
                </span>
              </div>
            </button>
          </div>
        </SectionCard>
      </div>

      {/* Save bar */}
      <div className="flex items-center justify-between p-4 bg-surface rounded-2xl border border-sage-border">
        <p className="text-sm text-secondary-text">
          Changes are applied locally for UI preview only.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="text-sm text-secondary-text hover:text-primary-text transition-colors px-3 py-1.5"
            onClick={() => {
              setImageRetention(true);
              setAnalyticsOptOut(false);
              setSessionTimeout(true);
              setAnalysisAlerts(true);
              setRecommendationUpdates(true);
              setWeeklyDigest(false);
              setMode("light");
            }}
          >
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[12px] bg-primary-sage text-white text-sm font-medium hover:bg-dark-sage transition-colors"
          >
            <Check className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </div>
    </AppShell>
  );
}
