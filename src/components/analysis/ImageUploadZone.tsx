"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  Camera,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Image as ImageIcon,
  Scan,
} from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SectionCard } from "@/components/ui/SectionCard";

type UploadState = "idle" | "preview" | "error";

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

  const handleSelectSample = () => {
    setPreviewUrl(null);
    setState("preview");
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
                  handleSelectSample();
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

          {/* Quick Demo Controls */}
          <div className="p-3 bg-surface rounded-xl border border-sage-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="text-secondary-text font-medium">
              Simulation Demo:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSelectSample}
                className="px-2.5 py-1 rounded-lg bg-very-light-sage text-dark-sage hover:bg-light-sage font-medium text-xs transition-colors"
              >
                Load Sample Photo
              </button>
              <button
                type="button"
                onClick={() => setState("error")}
                className="px-2.5 py-1 rounded-lg bg-[#FEF2F2] text-[#B91C1C] hover:bg-[#FEE2E2] font-medium text-xs transition-colors"
              >
                Simulate Detection Error
              </button>
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
            ) : (
              /* Stylized Mock Portrait Frame */
              <div className="relative w-36 h-44 sm:w-44 sm:h-52 rounded-full border-2 border-dashed border-primary-sage/60 flex items-center justify-center bg-surface/60 backdrop-blur-xs">
                {/* Optical Brackets */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary-sage" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary-sage" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary-sage" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary-sage" />

                <svg
                  className="w-24 h-32 text-primary-sage/50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 3 9 7 12 4-3 7-7 7-12a7 7 0 0 0-7-7z" />
                  <circle cx="9" cy="9" r="1" fill="currentColor" />
                  <circle cx="15" cy="9" r="1" fill="currentColor" />
                  <path d="M12 12v2" />
                  <path d="M10 16c1 .5 3 .5 4 0" />
                </svg>

                <div className="absolute -top-3 px-2.5 py-0.5 bg-primary-sage text-white text-[10px] font-semibold rounded-full shadow-xs flex items-center gap-1">
                  <Scan className="w-2.5 h-2.5" />
                  Frontal Alignment Verified
                </div>
              </div>
            )}
          </div>

          {/* Quality Badges */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-surface border border-sage-border flex items-center justify-between">
              <span className="text-xs text-secondary-text">Image Quality</span>
              <StatusBadge variant="success" size="sm">
                <CheckCircle2 className="w-3 h-3 mr-1 inline" />
                Good
              </StatusBadge>
            </div>

            <div className="p-3 rounded-xl bg-surface border border-sage-border flex items-center justify-between">
              <span className="text-xs text-secondary-text">Face Detected</span>
              <StatusBadge variant="success" size="sm">
                <CheckCircle2 className="w-3 h-3 mr-1 inline" />
                Yes
              </StatusBadge>
            </div>
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

      {/* ============================================================ */}
      {/* 3. ERROR STATE: Face Not Detected Error                     */}
      {/* ============================================================ */}
      {state === "error" && (
        <div className="space-y-6">
          <div className="border-2 border-[#FCA5A5] rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-4 bg-[#FEF2F2]/60 min-h-[300px]">
            <div className="w-14 h-14 rounded-2xl bg-[#FEE2E2] text-[#B91C1C] flex items-center justify-center border border-[#FCA5A5]">
              <AlertCircle className="w-7 h-7" />
            </div>

            <div className="space-y-1.5 max-w-sm">
              <h3 className="text-base font-bold text-[#991B1B] font-heading">
                No clear face detected
              </h3>
              <p className="text-xs text-secondary-text leading-relaxed">
                Please ensure your face is fully centered, well-lit, and not obstructed by hair, sunglasses, or extreme angles.
              </p>
            </div>

            <div className="pt-2">
              <PrimaryButton
                type="button"
                onClick={handleReset}
                icon={<RefreshCw className="w-4 h-4" />}
                className="bg-[#B91C1C] hover:bg-[#991B1B]"
              >
                Try Another Photo
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  );
}
