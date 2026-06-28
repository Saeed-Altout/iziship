"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Animate, type AnimateProps } from "@/components/ui/animate";

const sectionVariants = cva("w-full", {
  variants: {
    width: {
      full: "w-full",
      narrow: "max-w-4xl mx-auto",
      container: "max-w-7xl mx-auto",
    },
    padding: {
      none: "",
      default: "px-4 py-16 sm:px-6 lg:px-8",
      large: "px-4 py-24 sm:px-6 lg:px-8 lg:py-32",
      sm: "px-4 py-8 sm:px-6",
    },
  },
  defaultVariants: {
    width: "container",
    padding: "default",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: React.ElementType;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, width, padding, as: Comp = "section", ...props }, ref) => (
    <Comp
      ref={ref}
      className={cn(sectionVariants({ width, padding }), className)}
      {...props}
    />
  ),
);
Section.displayName = "Section";

/* ─── SectionBadge ───────────────────────────────────────────────────────── */

export interface SectionBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  dot?: boolean;
  animateProps?: Partial<AnimateProps>;
}

export const SectionBadge = React.forwardRef<HTMLSpanElement, SectionBadgeProps>(
  ({ dot = true, animateProps, className, children, ...props }, ref) => (
    <Animate variant="blurUp" delay={0} {...animateProps} className={cn("inline-flex", animateProps?.className)}>
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3.5 py-1.5 text-[12.5px] font-bold text-primary transition-colors",
          className,
        )}
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
    </Animate>
  ),
);
SectionBadge.displayName = "SectionBadge";

/* ─── SectionTitle ───────────────────────────────────────────────────────── */

export interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3";
  animateProps?: Partial<AnimateProps>;
}

export const SectionTitle = React.forwardRef<HTMLHeadingElement, SectionTitleProps>(
  ({ as: Comp = "h2", animateProps, className, children, ...props }, ref) => (
    <Animate variant="blurUp" delay={0.08} {...animateProps}>
      <Comp
        ref={ref}
        className={cn(
          "text-[clamp(26px,3.5vw,44px)] font-black leading-[1.08] tracking-tight text-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    </Animate>
  ),
);
SectionTitle.displayName = "SectionTitle";

/* ─── SectionSubtitle ────────────────────────────────────────────────────── */

export interface SectionSubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  animateProps?: Partial<AnimateProps>;
}

export const SectionSubtitle = React.forwardRef<HTMLParagraphElement, SectionSubtitleProps>(
  ({ animateProps, className, children, ...props }, ref) => (
    <Animate variant="blurUp" delay={0.16} {...animateProps}>
      <p
        ref={ref}
        className={cn(
          "mx-auto max-w-xl text-[15px] leading-relaxed text-muted-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </p>
    </Animate>
  ),
);
SectionSubtitle.displayName = "SectionSubtitle";
