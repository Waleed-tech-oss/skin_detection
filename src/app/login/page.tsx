"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { APP_CONFIG } from "@/constants";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left decorative panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-[420px] xl:w-[480px] bg-primary-sage flex-col justify-between p-10 shrink-0">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center border border-white/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-lg tracking-tight text-white">
            {APP_CONFIG.shortName}
          </span>
        </Link>

        <div className="space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
            <Lock className="w-6 h-6 text-white/80" />
          </div>
          <h2 className="text-3xl font-bold text-white font-heading leading-snug">
            Your skin analysis<br />journey continues.
          </h2>
          <p className="text-white/70 text-sm leading-relaxed max-w-xs">
            Sign in to access your AI-powered skin profile, personalized recommendations, and daily care routine.
          </p>

          <div className="space-y-3 pt-4">
            {[
              "AI-detected skin characteristics",
              "Personalized product compatibility",
              "Routine tracking & progress",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-white/80 text-sm">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/40 text-xs">
          © {new Date().getFullYear()} {APP_CONFIG.name}. Frontend UI — no data is stored.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        {/* Mobile brand header */}
        <div className="lg:hidden mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-primary-sage/10 text-primary-sage flex items-center justify-center border border-light-sage">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-primary-text">
              {APP_CONFIG.shortName}
            </span>
          </Link>
        </div>

        <div className="w-full max-w-md space-y-7">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-primary-text font-heading">
              Welcome back
            </h1>
            <p className="text-sm text-secondary-text">
              Access your personalized skin analysis dashboard
            </p>
          </div>

          {/* Demo notice */}
          <div className="flex items-start gap-3 p-3.5 rounded-[14px] bg-very-light-sage border border-light-sage text-xs text-dark-sage">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-primary-sage" />
            <span>
              <strong>Demo mode:</strong> Enter any email and password, then click Sign In to proceed directly to your dashboard.
            </span>
          </div>

          {/* Login Form */}
          <form
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Email field */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-email"
                className="text-xs font-semibold text-primary-text uppercase tracking-wider block"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text pointer-events-none" />
                <input
                  id="login-email"
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

            {/* Password field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="text-xs font-semibold text-primary-text uppercase tracking-wider block"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary-sage hover:text-dark-sage hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text pointer-events-none" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    "w-full pl-10 pr-11 py-2.5 rounded-[12px] bg-surface border border-sage-border text-sm text-primary-text",
                    "placeholder:text-secondary-text/50",
                    "focus:outline-none focus:border-primary-sage focus:ring-2 focus:ring-primary-sage/10",
                    "transition-colors duration-150"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary-text hover:text-primary-text transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Link href="/dashboard" className="block pt-1">
              <PrimaryButton
                fullWidth
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="py-3 text-[15px]"
              >
                Sign In
              </PrimaryButton>
            </Link>
          </form>

          {/* Divider */}
          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-sage-border" />
            <span className="text-xs text-secondary-text shrink-0">or</span>
            <div className="flex-1 h-px bg-sage-border" />
          </div>

          {/* Footer links */}
          <p className="text-center text-sm text-secondary-text">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary-sage font-semibold hover:text-dark-sage hover:underline transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
