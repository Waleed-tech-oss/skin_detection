"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  Camera,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { SectionCard } from "@/components/ui/SectionCard";

type UploadState = "idle" | "preview";

interface ImageUploadZoneProps {
  onStartAnalysis: () => void;
}

export function ImageUploadZone({ onStartAnalysis }: ImageUploadZoneProps) {
  const [state, setState] = useState<UploadState>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setState("preview");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setState("preview");
    }
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setState("idle");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <SectionCard
      title="Image Input"
      subtitle="Select or capture a front-facing photo"
      className="h-full flex flex-col justify-between"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* ============================================================ */}
      {/* 1. IDLE STATE: Upload / Camera Options                       */}
      {/* ============================================================ */}
      {state === "idle" && (
        <div className="space-y-5">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-sage-border hover:border-primary-sage rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-4 bg-very-light-sage/30 hover:bg-very-light-sage/60 transition-all cursor-pointer min-h-[300px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-light-sage text-dark-sage flex items-center justify-center border border-primary-sage/20 shadow-xs">
              <Upload className="w-6 h-6 text-primary-sage" />
            </div>

            <div className="space-y-1">
              <p className="text-sm sm:text-base font-bold text-primary-text font-heading">
                Drag and drop your photo here, or browse
              </p>
              <p className="text-xs text-secondary-text max-w-xs mx-auto">
                Upload a clear front-facing portrait in good natural lighting.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <PrimaryButton
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                icon={<Upload className="w-4 h-4" />}
                className="text-xs py-2 px-4"
              >
                Upload Photo
              </PrimaryButton>

              <SecondaryButton
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                icon={<Camera className="w-4 h-4" />}
                className="text-xs py-2 px-4"
              >
                Use Camera
              </SecondaryButton>
            </div>

            <div className="pt-2 text-[11px] text-secondary-text">
              Accepted: JPG / PNG • Maximum 10 MB
            </div>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* 2. PREVIEW STATE: Valid Image & Confirmation                */}
      {/* ============================================================ */}
      {state === "preview" && (
        <div className="space-y-5">
          <div className="relative aspect-4/3 w-full rounded-2xl bg-very-light-sage/50 border border-light-sage overflow-hidden flex items-center justify-center">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Uploaded face preview"
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>

          <div className="rounded-xl border border-sage-border bg-surface p-3 text-xs text-secondary-text">
            Image selected. Quality and face validation will be returned by the analysis service.
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <SecondaryButton
              fullWidth
              onClick={handleReset}
              icon={<RefreshCw className="w-4 h-4" />}
            >
              Choose Another Photo
            </SecondaryButton>

            <PrimaryButton
              fullWidth
              onClick={onStartAnalysis}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Analyze My Skin
            </PrimaryButton>
          </div>
        </div>
      )}

    </SectionCard>
  );
}
