import React from "react";
import { cn } from "@/lib/utils";

export interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  noPadding?: boolean;
}

export function SectionCard({
  children,
  className,
  title,
  subtitle,
  headerAction,
  noPadding = false,
  ...props
}: SectionCardProps) {
  const hasHeader = title || subtitle || headerAction;

  return (
    <div
      className={cn(
        "bg-surface rounded-[18px] border border-sage-border shadow-[0_1px_3px_0_rgba(0,0,0,0.03)]",
        className
      )}
      {...props}
    >
      {hasHeader && (
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-sage-border/60">
          <div>
            {title && (
              <h2 className="text-lg font-semibold tracking-tight text-primary-text font-heading">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs sm:text-sm text-secondary-text mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div className="shrink-0 ml-4">{headerAction}</div>}
        </div>
      )}
      <div className={cn(!noPadding && "p-6")}>{children}</div>
    </div>
  );
}
