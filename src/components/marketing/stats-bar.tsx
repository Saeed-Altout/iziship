"use client";

import { useTranslations } from "next-intl";
import { Animate } from "@/components/ui/animate";

export function StatsBarSection() {
  const t = useTranslations("stats");

  const pillContent = (
    <div className="flex flex-col divide-y divide-border sm:flex-row sm:divide-x sm:divide-y-0 dark:divide-white/8">
      {/* Left tagline */}
      <div className="flex items-center px-8 py-6 sm:w-52 sm:shrink-0 sm:py-9 lg:w-60 lg:px-10">
        <p className="text-[14px] font-extrabold leading-[1.35] tracking-tight text-foreground lg:text-[15px]">
          {t("tagline")}
        </p>
      </div>
      {/* Stats */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-1 flex-col justify-center gap-1 px-8 py-6 sm:py-9 lg:px-10"
        >
          <p className="text-[clamp(24px,2.6vw,34px)] font-black leading-none tracking-[-0.03em] text-foreground">
            {t(`items.${i}.num`)}
          </p>
          <p className="text-[13px] font-medium text-muted-foreground">
            {t(`items.${i}.label`)}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative pb-8 pt-14 sm:pb-10 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Animate variant="slideUp" delay={0}>
          {/* Stack wrapper — ghost cards peek from the top */}
          <div className="relative">

            {/* Ghost card 3 — furthest back, highest up */}
            <div
              className="absolute inset-x-6 -top-4 h-full rounded-2xl border border-border bg-card opacity-40 dark:border-white/5 dark:bg-[#0D1B2E]/60"
              aria-hidden="true"
            />

            {/* Ghost card 2 — middle */}
            <div
              className="absolute inset-x-3 -top-2 h-full rounded-2xl border border-border bg-card opacity-65 dark:border-white/6 dark:bg-[#0D1B2E]/80"
              aria-hidden="true"
            />

            {/* Main pill — front */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm dark:border-white/8 dark:bg-[#0D1B2E]">
              {/* Bottom shimmer */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/25 to-transparent" />
              {pillContent}
            </div>

          </div>
        </Animate>
      </div>
    </section>
  );
}
