"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Mail, CheckCircle2, Send } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { APP_CONFIG } from "@/constants";
import { cn } from "@/lib/utils";

type Step = "email" | "sent";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("sent");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Brand header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary-sage/10 text-primary-sage flex items-center justify-center border border-light-sage">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-primary-text">
              {APP_CONFIG.shortName}
            </span>
          </Link>
        </div>

        {step === "email" ? (
          <div className="bg-surface rounded-[18px] border border-sage-border shadow-[0_1px_3px_0_rgba(0,0,0,0.03)] p-8 space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="w-11 h-11 rounded-2xl bg-very-light-sage flex items-center justify-center border border-light-sage mb-3">
                <Mail className="w-5 h-5 text-primary-sage" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-primary-text font-heading">
                Reset your password
              </h1>
              <p className="text-sm text-secondary-text leading-relaxed">
                Enter your account email address and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            {/* Demo notice */}
            <div className="flex items-start gap-3 p-3 rounded-[12px] bg-very-light-sage border border-light-sage text-xs text-dark-sage">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-primary-sage" />
              <span>
                <strong>Demo mode:</strong> No email will actually be sent. Click &ldquo;Send Reset Link&rdquo; to see the confirmation state.
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="forgot-email"
                  className="text-xs font-semibold text-primary-text uppercase tracking-wider block"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text pointer-events-none" />
                  <input
                    id="forgot-email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      "w-full pl-10 pr-4 py-2.5 rounded-[12px] bg-surface border border-sage-border text-sm text-primary-text",
                      "placeholder:text-secondary-text/50",
                      "focus:outline-none focus:border-primary-sage focus:ring-2 focus:ring-primary-sage/10",
                      "transition-colors duration-150"
                    )}
                  />
                </div>
              </div>

              <PrimaryButton
                type="submit"
                fullWidth
                icon={<Send className="w-4 h-4" />}
                iconPosition="right"
                className="py-2.5"
              >
                Send Reset Link
              </PrimaryButton>
            </form>

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-sm text-secondary-text hover:text-primary-text transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Sign In
              </Link>
            </div>
          </div>
        ) : (
          /* Success / sent state */
          <div className="bg-surface rounded-[18px] border border-sage-border shadow-[0_1px_3px_0_rgba(0,0,0,0.03)] p-8 space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-[#EEF7F2] border border-[#CBE5D6] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-bold tracking-tight text-primary-text font-heading">
                Check your inbox
              </h1>
              <p className="text-sm text-secondary-text leading-relaxed">
                A password reset link has been sent to{" "}
                <span className="font-semibold text-primary-text">
                  {email || "your email address"}
                </span>
                . The link will expire in 30 minutes.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Link href="/login" className="block">
                <PrimaryButton fullWidth className="py-2.5">
                  Return to Sign In
                </PrimaryButton>
              </Link>
              <SecondaryButton
                fullWidth
                className="py-2.5 text-sm"
                onClick={() => setStep("email")}
              >
                Resend Link
              </SecondaryButton>
            </div>

            <p className="text-xs text-secondary-text">
              Didn&apos;t receive an email? Check your spam folder or try a different email address.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
