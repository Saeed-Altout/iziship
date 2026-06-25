"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "left" | "right";
  /** pixels per second */
  speed?: number;
  pauseOnHover?: boolean;
  fade?: boolean;
}

export function Marquee({
  direction = "left",
  speed = 40,
  pauseOnHover = true,
  fade = true,
  className,
  children,
  ...props
}: MarqueeProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [duration, setDuration] = React.useState(20);

  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const totalWidth = el.scrollWidth / 2; // two copies
    setDuration(totalWidth / speed);
  }, [speed]);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {fade && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
        </>
      )}
      <div
        ref={trackRef}
        className={cn(
          "flex w-max gap-[var(--mq-gap,2.5rem)]",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{
          animationName: "mq-scroll",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {children}
        {/* duplicate for seamless loop */}
        {children}
      </div>

      <style>{`
        @keyframes mq-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
