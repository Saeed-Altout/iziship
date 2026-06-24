"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgePillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-bold transition-colors",
  {
    variants: {
      intent: {
        primary:
          "border border-primary/20 bg-primary/8 text-primary",
        secondary:
          "border border-secondary-foreground/15 bg-secondary text-secondary-foreground",
        outline:
          "border border-border bg-transparent text-muted-foreground hover:bg-muted",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  },
);

export interface BadgePillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgePillVariants> {
  dot?: boolean;
}

export const BadgePill = React.forwardRef<HTMLSpanElement, BadgePillProps>(
  ({ className, intent, dot = false, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgePillVariants({ intent }), className)}
      {...props}
    >
      {dot && (
        <span className="relative flex size-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  ),
);
BadgePill.displayName = "BadgePill";
