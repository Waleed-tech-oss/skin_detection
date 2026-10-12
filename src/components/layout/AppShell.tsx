"use client";

import React, { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { Topbar } from "./Topbar";

interface AppShellProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export function AppShell({ children, pageTitle }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-primary-text flex flex-col md:flex-row">
      {/* Sidebar (Desktop Persistent & Mobile Drawer) */}
      <AppSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col md:pl-64">
        <Topbar
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
          title={pageTitle}
        />
        <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
