"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ImageUploadZone } from "@/components/analysis/ImageUploadZone";
import { PhotoGuidelinesCard } from "@/components/analysis/PhotoGuidelinesCard";
import { AnalysisProcessingView } from "@/components/analysis/AnalysisProcessingView";

export default function AnalysisPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <AppShell pageTitle="New Skin Analysis">
      {isProcessing ? (
        <AnalysisProcessingView />
      ) : (
        <div className="space-y-6">
          <PageHeader
            title="New Skin Analysis"
            description="Upload a clear front-facing photo to analyze visible skin characteristics."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Image Upload & Preview Zone (7 cols on desktop) */}
            <div className="lg:col-span-7 h-full">
              <ImageUploadZone
                onStartAnalysis={() => setIsProcessing(true)}
              />
            </div>

            {/* Right: Photo Guidelines (5 cols on desktop) */}
            <div className="lg:col-span-5 h-full">
              <PhotoGuidelinesCard />
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
