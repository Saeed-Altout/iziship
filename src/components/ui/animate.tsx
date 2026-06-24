"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const variantMap: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  },
  blurUp: {
    hidden: { opacity: 0, y: 20, filter: "blur(14px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  },
};

export interface AnimateProps extends HTMLMotionProps<"div"> {
  variant?: keyof typeof variantMap;
  delay?: number;
  once?: boolean;
}

export const Animate = React.forwardRef<HTMLDivElement, AnimateProps>(
  (
    { variant = "slideUp", delay = 0, once = true, className, children, ...props },
    ref,
  ) => {
    const selected = variantMap[variant];

    const delayedVariants: Variants = {
      hidden: selected.hidden,
      visible: {
        ...(selected.visible as object),
        transition: {
          ...((selected.visible as { transition?: object }).transition ?? {}),
          delay,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        variants={delayedVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);
Animate.displayName = "Animate";
