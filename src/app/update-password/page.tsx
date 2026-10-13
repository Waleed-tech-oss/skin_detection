"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { APP_CONFIG } from "@/constants";
import { authService } from "@/services/auth";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { cn } from "@/lib/utils";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");
    setIsError(false);
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      setIsError(true);
      return;
    }
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      setIsError(true);
      return;
    }

    setSubmitting(true);
    try {
      await authService.updateRecoveredPassword(password);
      setMessage("Password updated. Redirecting to your dashboard…");
      window.setTimeout(() => {
        router.replace("/dashboard");
        router.refresh();
      }, 800);
    } catch (error) {
      setMessage(getAuthErrorMessage(error));
      setIsError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
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

        <div className="bg-surface rounded-[18px] border border-sage-border shadow-[0_1px_3px_0_rgba(0,0,0,0.03)] p-8 space-y-6">
          <div className="space-y-2">
            <div className="w-11 h-11 rounded-2xl bg-very-light-sage flex items-center justify-center border border-light-sage mb-3">
              <Lock className="w-5 h-5 text-primary-sage" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-primary-text font-heading">
              Choose a new password
            </h1>
            <p className="text-sm text-secondary-text leading-relaxed">
              Use at least 8 characters and choose a password you do not reuse elsewhere.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { id: "new-password", label: "New Password", value: password, setter: setPassword },
              { id: "confirm-password", label: "Confirm Password", value: confirm, setter: setConfirm },
            ].map(({ id, label, value, setter }) => (
              <div key={id} className="space-y-1.5">
                <label htmlFor={id} className="text-xs font-semibold text-primary-text uppercase tracking-wider block">
                  {label}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text pointer-events-none" />
                  <input
                    id={id}
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={value}
                    onChange={(event) => setter(event.target.value)}
                    minLength={8}
                    required
                    className={cn(
                      "w-full pl-10 pr-11 py-2.5 rounded-[12px] bg-surface border border-sage-border text-sm text-primary-text",
                      "focus:outline-none focus:border-primary-sage focus:ring-2 focus:ring-primary-sage/10",
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Hide passwords" : "Show passwords"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary-text hover:text-primary-text"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}

            <PrimaryButton type="submit" fullWidth disabled={submitting} className="py-2.5">
              {submitting ? "Updating…" : "Update Password"}
            </PrimaryButton>
            {message && (
              <p className={cn("text-xs", isError ? "text-[#B91C1C]" : "text-success")} role="status">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
