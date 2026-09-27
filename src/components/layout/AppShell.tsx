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
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        <Topbar
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
          title={pageTitle}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
