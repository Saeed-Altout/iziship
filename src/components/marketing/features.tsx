"use client";

import { useTranslations } from "next-intl";

const FEATURE_META = [
  { iconBg: "bg-primary/10", iconColor: "text-primary", icon: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="4" rx="1.5" />
      <rect x="4" y="13" width="16" height="4" rx="1.5" />
      <rect x="6" y="19" width="12" height="2" rx="1" opacity="0.4" />
    </svg>
  )},
  { iconBg: "bg-primary/10", iconColor: "text-primary", icon: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="12" r="3" />
      <circle cx="19" cy="12" r="3" />
      <path d="M8 12h8" strokeDasharray="2.5 2" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )},
  { iconBg: "bg-accent/10", iconColor: "text-accent", icon: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="13" rx="3" />
      <path d="M2 10h20" />
      <path d="M6 15h4" />
    </svg>
  )},
  { iconBg: "bg-primary/10", iconColor: "text-primary", icon: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 1-6.41 2.67" />
      <path d="M3 3v6h6" />
    </svg>
  )},
  { iconBg: "bg-primary/10", iconColor: "text-primary", icon: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="8" rx="1.5" />
    </svg>
  )},
  { iconBg: "bg-primary/10", iconColor: "text-primary", icon: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" />
    </svg>
  )},
];

export function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <section id="features" className="bg-muted/40 px-6 py-23">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 max-w-160">
          <p className="mb-3 text-[13px] font-extrabold uppercase tracking-[0.12em] text-primary">
            {t("kicker")}
          </p>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight text-foreground">
            {t("h2")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURE_META.map((f, idx) => (
            <div
              key={idx}
              className="group cursor-default rounded-[18px] border border-border bg-card p-7.5 shadow-[0_1px_0_oklch(0.148_0.012_253/2%)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_34px_oklch(0.148_0.012_253/8%)]"
            >
              <div className={`mb-4 flex size-14 items-center justify-center rounded-2xl ${f.iconBg} ${f.iconColor}`}>
                {f.icon}
              </div>
              <h3 className="mb-2 text-[17px] font-bold text-foreground">
                {t(`items.${idx}.title`)}
              </h3>
              <p className="text-[15px] leading-[1.55] text-muted-foreground">
                {t(`items.${idx}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
