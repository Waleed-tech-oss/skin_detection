import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "sage" | "success" | "warning" | "neutral" | "beige";

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  dot?: boolean;
}

export function StatusBadge({
  children,
  variant = "sage",
  size = "md",
  dot = false,
  className,
  ...props
}: StatusBadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    sage: "bg-very-light-sage text-dark-sage border-light-sage",
    success: "bg-[#EEF7F2] text-success border-[#CBE5D6]",
    warning: "bg-[#FDF6ED] text-warning border-[#F3DFC9]",
    neutral: "bg-[#F0F2EE] text-secondary-text border-sage-border",
    beige: "bg-[#F7F2EB] text-[#635544] border-warm-beige",
  };

  const dotColors: Record<BadgeVariant, string> = {
    sage: "bg-primary-sage",
    success: "bg-success",
    warning: "bg-warning",
    neutral: "bg-secondary-text",
    beige: "bg-[#8E7963]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full border select-none",
        size === "sm" ? "text-xs px-2.5 py-0.5" : "text-xs sm:text-sm px-3 py-1",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}
