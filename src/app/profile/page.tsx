"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { MOCK_USER_PROFILE } from "@/data/mockData";
import {
  User,
  Mail,
  Calendar,
  ScanFace,
  Sparkles,
  ShieldCheck,
  Edit2,
  Camera,
  Eye,
  EyeOff,
  Lock,
  Save,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(MOCK_USER_PROFILE.name);
  const [email] = useState(MOCK_USER_PROFILE.email);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <AppShell pageTitle="My Profile">
      <PageHeader
        title="My Profile"
        description="Manage your account details and personalization preferences."
        badge={
          <StatusBadge variant="success" dot>
            Verified Account
          </StatusBadge>
        }
        action={
          editMode ? (
            <div className="flex items-center gap-2">
              <SecondaryButton
                className="text-sm"
                onClick={() => { setEditMode(false); setName(MOCK_USER_PROFILE.name); }}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                icon={<Save className="w-4 h-4" />}
                className="text-sm"
                onClick={handleSave}
              >
                Save Changes
              </PrimaryButton>
            </div>
          ) : (
            <SecondaryButton
              icon={<Edit2 className="w-4 h-4" />}
              className="text-sm"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </SecondaryButton>
          )
        }
      />

      {/* Saved toast */}
      {saved && (
        <div className="flex items-center gap-2 p-3.5 bg-[#EEF7F2] border border-[#CBE5D6] rounded-[14px] text-sm text-success font-medium">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          Profile updated successfully.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column — Avatar + Stats */}
        <div className="lg:col-span-4 space-y-4">
          {/* Avatar card */}
          <SectionCard>
            <div className="flex flex-col items-center text-center space-y-4 py-2">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-light-sage text-dark-sage flex items-center justify-center font-bold text-2xl border-2 border-primary-sage/20 select-none font-heading">
                  {initials}
                </div>
                {editMode && (
                  <button
                    type="button"
                    aria-label="Change profile photo"
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary-sage text-white flex items-center justify-center border-2 border-surface hover:bg-dark-sage transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="space-y-0.5">
                <h2 className="text-lg font-bold text-primary-text font-heading">{name}</h2>
                <p className="text-xs text-secondary-text">{MOCK_USER_PROFILE.email}</p>
              </div>

              <StatusBadge variant="sage" size="sm">
                Verified Account
              </StatusBadge>
            </div>
          </SectionCard>

          {/* Quick stats */}
          <SectionCard title="Account Summary">
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between p-3 rounded-xl bg-very-light-sage/40 border border-light-sage/60">
                <div className="flex items-center gap-2.5 text-secondary-text">
                  <ScanFace className="w-4 h-4 text-primary-sage" />
                  <span>Total Analyses</span>
                </div>
                <span className="font-bold text-primary-text">3</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-very-light-sage/40 border border-light-sage/60">
                <div className="flex items-center gap-2.5 text-secondary-text">
                  <Sparkles className="w-4 h-4 text-primary-sage" />
                  <span>Recommendations</span>
                </div>
                <span className="font-bold text-primary-text">5</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-very-light-sage/40 border border-light-sage/60">
                <div className="flex items-center gap-2.5 text-secondary-text">
                  <Calendar className="w-4 h-4 text-primary-sage" />
                  <span>Member Since</span>
                </div>
                <span className="font-bold text-primary-text">Jul 2026</span>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Right column — Details + Password */}
        <div className="lg:col-span-8 space-y-6">
          {/* Account Information */}
          <SectionCard
            title="Account Information"
            subtitle="Basic profile details"
          >
            <div className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="profile-name"
                  className="text-xs font-semibold text-primary-text uppercase tracking-wider flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-primary-sage" />
                  Full Name
                </label>
                {editMode ? (
                  <input
                    id="profile-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={cn(
                      "w-full px-3.5 py-2.5 rounded-[12px] bg-surface border border-sage-border text-sm text-primary-text",
                      "focus:outline-none focus:border-primary-sage focus:ring-2 focus:ring-primary-sage/10",
                      "transition-colors duration-150"
                    )}
                  />
                ) : (
                  <div className="px-3.5 py-2.5 rounded-[12px] bg-very-light-sage/40 border border-light-sage/60 text-sm text-primary-text font-medium">
                    {name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="profile-email"
                  className="text-xs font-semibold text-primary-text uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-primary-sage" />
                  Email Address
                </label>
                <div className="relative">
                  <div className={cn(
                    "px-3.5 py-2.5 rounded-[12px] border text-sm",
                    editMode
                      ? "bg-very-light-sage/40 border-light-sage/60 text-secondary-text cursor-not-allowed"
                      : "bg-very-light-sage/40 border-light-sage/60 text-primary-text font-medium"
                  )}>
                    {email}
                  </div>
                  {editMode && (
                    <p className="mt-1 text-[11px] text-secondary-text">
                      Email address cannot be changed in demo mode.
                    </p>
                  )}
                </div>
              </div>

              {/* Member Since */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary-text uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary-sage" />
                  Member Since
                </label>
                <div className="px-3.5 py-2.5 rounded-[12px] bg-very-light-sage/40 border border-light-sage/60 text-sm text-primary-text font-medium">
                  July 2026
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Skin Preferences snapshot */}
          <SectionCard
            title="Skin Preferences"
            subtitle="Personalization data from your questionnaire"
            headerAction={
              <Link href="/questionnaire">
                <SecondaryButton className="text-xs py-1.5 px-3">
                  Update
                </SecondaryButton>
              </Link>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                { label: "Sensitivity Level", value: "Medium" },
                { label: "Budget", value: "PKR 2,000 – 5,000" },
                { label: "Allergies", value: "Fragrance, Essential Oils" },
                { label: "Preferred Products", value: "Gel Cleanser, Niacinamide Serum" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="p-3 rounded-xl bg-very-light-sage/40 border border-light-sage/60 space-y-0.5"
                >
                  <span className="text-[11px] font-semibold text-secondary-text uppercase tracking-wider block">
                    {label}
                  </span>
                  <span className="font-medium text-primary-text text-sm">{value}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Change Password */}
          <SectionCard
            title="Change Password"
            subtitle="Update your account password"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-very-light-sage/60 border border-light-sage text-xs text-dark-sage">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-warning" />
                <span>
                  <strong>Demo mode:</strong> Password changes are not persisted. This form is for UI demonstration only.
                </span>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="current-password"
                  className="text-xs font-semibold text-primary-text uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-primary-sage" />
                  Current Password
                </label>
                <div className="relative">
                  <input
                    id="current-password"
                    type={showCurrentPw ? "text" : "password"}
                    placeholder="Enter current password"
                    className={cn(
                      "w-full px-3.5 pr-11 py-2.5 rounded-[12px] bg-surface border border-sage-border text-sm text-primary-text",
                      "placeholder:text-secondary-text/50",
                      "focus:outline-none focus:border-primary-sage focus:ring-2 focus:ring-primary-sage/10",
                      "transition-colors duration-150"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw((v) => !v)}
                    aria-label={showCurrentPw ? "Hide password" : "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary-text hover:text-primary-text transition-colors"
                  >
                    {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="new-password"
                  className="text-xs font-semibold text-primary-text uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-primary-sage" />
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="new-password"
                    type={showNewPw ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    className={cn(
                      "w-full px-3.5 pr-11 py-2.5 rounded-[12px] bg-surface border border-sage-border text-sm text-primary-text",
                      "placeholder:text-secondary-text/50",
                      "focus:outline-none focus:border-primary-sage focus:ring-2 focus:ring-primary-sage/10",
                      "transition-colors duration-150"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw((v) => !v)}
                    aria-label={showNewPw ? "Hide password" : "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary-text hover:text-primary-text transition-colors"
                  >
                    {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <PrimaryButton
                icon={<Lock className="w-4 h-4" />}
                className="text-sm"
              >
                Update Password
              </PrimaryButton>
            </div>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}
