"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ScanFace,
  Fingerprint,
  Sparkles,
  CalendarCheck,
  History,
  User,
  Settings,
  LogOut,
  X,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_CONFIG } from "@/constants";
import { authService } from "@/services/auth";

interface NavItemConfig {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItemConfig[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "New Analysis", href: "/analysis", icon: ScanFace },
  { label: "My Analysis", href: "/skin-profile", icon: Fingerprint },
  { label: "Recommendations", href: "/recommendations", icon: Sparkles },
  { label: "Routine", href: "/routine", icon: CalendarCheck },
  { label: "History", href: "/history", icon: History },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface AppSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AppSidebar({ isOpen = false, onClose }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await authService.signOut();
    } finally {
      router.replace("/login");
      router.refresh();
      setLoggingOut(false);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-surface border-r border-sage-border text-primary-text">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-sage-border/60">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 group"
          onClick={onClose}
        >
          <div className="w-9 h-9 rounded-xl bg-primary-sage/10 text-primary-sage flex items-center justify-center border border-light-sage group-hover:bg-primary-sage group-hover:text-white transition-colors duration-150">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-heading font-bold text-base tracking-tight text-primary-text block leading-tight">
              {APP_CONFIG.shortName}
            </span>
            <span className="text-[11px] text-secondary-text font-normal block leading-none mt-0.5">
              AI Skin Analysis
            </span>
          </div>
        </Link>

        {/* Mobile close button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="md:hidden p-1.5 rounded-lg text-secondary-text hover:text-primary-text hover:bg-very-light-sage transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold text-secondary-text uppercase tracking-wider">
          Menu
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
                isActive
                  ? "bg-primary-sage text-white shadow-xs font-semibold"
                  : "text-primary-text/80 hover:bg-very-light-sage hover:text-dark-sage"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  isActive
                    ? "text-white"
                    : "text-secondary-text group-hover:text-dark-sage"
                )}
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom User / Logout Section */}
      <div className="p-3 border-t border-sage-border/60">
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-secondary-text hover:text-[#B91C1C] hover:bg-[#FEF2F2] transition-colors group"
        >
          <LogOut className="w-4 h-4 shrink-0 text-secondary-text group-hover:text-[#B91C1C] transition-colors" />
          <span>{loggingOut ? "Logging out…" : "Log out"}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-primary-text/30 backdrop-blur-xs z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-in Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 md:hidden transform transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
