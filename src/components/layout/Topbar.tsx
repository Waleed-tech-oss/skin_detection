"use client";

import React from "react";
import { Menu, Sparkles, User as UserIcon } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { APP_CONFIG } from "@/constants";

interface TopbarProps {
  onMenuToggle?: () => void;
  title?: string;
}

export function Topbar({ onMenuToggle, title }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 bg-surface/90 backdrop-blur-xs border-b border-sage-border px-4 sm:px-6 py-3.5 flex items-center justify-between">
      {/* Left: Mobile Hamburger & Current Page / Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label="Open sidebar"
          className="md:hidden p-2 rounded-xl text-primary-text hover:bg-very-light-sage border border-sage-border/60 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
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
            Alex
          </span>
          <div className="w-8 h-8 rounded-full bg-light-sage text-dark-sage flex items-center justify-center font-semibold text-xs border border-primary-sage/20">
            <UserIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
