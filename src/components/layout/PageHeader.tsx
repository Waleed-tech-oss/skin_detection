import React from "react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  badge?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  action,
  badge,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-4 border-b border-sage-border/60 pb-6 pt-1 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    >
      <div className="min-w-0 space-y-1">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="break-words font-heading text-2xl font-bold leading-tight tracking-tight text-primary-text sm:text-3xl">
            {title}
          </h1>
          {badge && <div className="shrink-0">{badge}</div>}
        </div>
        {description && (
          <p className="text-sm text-secondary-text max-w-2xl">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0 sm:self-center">{action}</div>}
    </div>
  );
}
