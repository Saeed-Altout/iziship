"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

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
