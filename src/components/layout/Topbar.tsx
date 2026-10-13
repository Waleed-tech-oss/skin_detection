"use client";

import React from "react";
import { Menu, User as UserIcon } from "lucide-react";
import { APP_CONFIG } from "@/constants";
import { useAuth } from "@/components/auth/AuthProvider";

interface TopbarProps {
  onMenuToggle?: () => void;
  title?: string;
}

export function Topbar({ onMenuToggle, title }: TopbarProps) {
  const { user, loading } = useAuth();
  const displayName = user?.name || (loading ? "Loading…" : "Account");
  const initials = user?.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between border-b border-sage-border bg-surface/90 px-4 py-3.5 backdrop-blur-xs sm:px-6">
      {/* Left: Mobile Hamburger & Current Page / Breadcrumb */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label="Open sidebar"
          className="md:hidden p-2 rounded-xl text-primary-text hover:bg-very-light-sage border border-sage-border/60 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex min-w-0 items-center gap-2">
          <span className="text-xs sm:text-sm font-medium text-secondary-text hidden sm:inline-block">
            {APP_CONFIG.shortName}
          </span>
          {title && (
            <>
              <span className="text-secondary-text/50 hidden sm:inline-block">
                /
              </span>
              <span className="text-sm font-semibold text-primary-text truncate">
                {title}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right: User Profile Indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-medium text-secondary-text hidden sm:inline-block">
            {displayName}
          </span>
          <div className="w-8 h-8 rounded-full bg-light-sage text-dark-sage flex items-center justify-center font-semibold text-xs border border-primary-sage/20">
            {initials || <UserIcon className="w-4 h-4" />}
          </div>
        </div>
      </div>
    </header>
  );
}
