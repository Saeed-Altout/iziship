"use client";

import React, { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  autoFill?: boolean;
  ariaLabel?: string;
  ariaLive?: "off" | "polite" | "assertive";
  ariaRole?: string;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 2,
  ariaLabel,
  ariaLive = "off",
  ariaRole = "marquee",
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      data-slot="marquee"
      aria-label={ariaLabel}
      aria-live={ariaLive}
      role={ariaRole}
      className={cn(
        "group flex overflow-hidden [--duration:40s] [--gap:2rem]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      {/* The track holds all copies and scrolls as one unit */}
      <div
        className={cn(
          "flex shrink-0 min-w-full",
          vertical ? "flex-col" : "flex-row",
          vertical ? "[gap:var(--gap)]" : "[gap:var(--gap)]",
          !vertical && "animate-marquee",
          vertical && "animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
      >
        {Array.from({ length: Math.max(repeat, 2) }, (_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0",
              vertical
                ? "flex-col [gap:var(--gap)]"
                : "flex-row [gap:var(--gap)]",
            )}
          >
            {children}
          </div>
        ))}
      </div>

      {/* Duplicate track for seamless loop */}
      <div
        aria-hidden
        className={cn(
          "flex shrink-0 min-w-full",
          vertical ? "flex-col" : "flex-row",
          vertical ? "[gap:var(--gap)]" : "[gap:var(--gap)]",
          !vertical && "animate-marquee",
          vertical && "animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
      >
        {Array.from({ length: Math.max(repeat, 2) }, (_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0",
              vertical
                ? "flex-col [gap:var(--gap)]"
                : "flex-row [gap:var(--gap)]",
            )}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
