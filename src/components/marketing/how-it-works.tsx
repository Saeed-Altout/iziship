"use client";

import { useTranslations } from "next-intl";

const STEP_ICONS = [
  (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="12" r="2.5" />
      <circle cx="19" cy="6" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M7.5 12h4M16.5 6l-5 4M16.5 18l-5-4" />
    </svg>
  ),
  (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="12" r="3" />
      <path d="M9 12h6" strokeDasharray="2 2" />
    </svg>
  ),
];

const STEP_NUMS = ["01", "02", "03"];

export function HowItWorksSection() {
  const t = useTranslations("howItWorks");

  return (
    <section id="how" className="bg-background px-6 py-23">
      <div className="mx-auto max-w-7xl">

        <div className="mx-auto mb-14 max-w-160 text-center">
          <p className="mb-3 text-[13px] font-extrabold uppercase tracking-[0.12em] text-primary">
            {t("kicker")}
          </p>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight text-foreground">
            {t("h2")}
          </h2>
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute hidden h-0.5 md:block"
            style={{
              top: "38px",
              left: "16%",
              right: "16%",
              background: "repeating-linear-gradient(90deg, color-mix(in oklch, var(--primary) 40%, transparent) 0 10px, transparent 10px 20px)",
            }}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEP_NUMS.map((num, idx) => (
              <div
                key={num}
                className="group cursor-default rounded-[18px] border border-border bg-card p-7 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_34px_oklch(0.148_0.012_253/8%)]"
              >
                <div className="relative mx-auto mb-5 flex size-19 items-center justify-center rounded-[20px] bg-primary/10 text-primary">
                  {STEP_ICONS[idx]}
                  <span className="absolute -inset-e-2 -top-2 flex size-6.5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground">
                    {num}
                  </span>
                </div>
                <h3 className="mb-2.5 text-[20px] font-bold text-foreground">
                  {t(`steps.${idx}.title`)}
                </h3>
                <p className="text-[15px] leading-[1.55] text-muted-foreground">
                  {t(`steps.${idx}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
