"use client";

import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section
      className="px-6 pb-20 pt-19"
      style={{
        background:
          "radial-gradient(1100px 540px at 78% -8%, color-mix(in oklch, var(--primary) 12%, transparent) 0%, transparent 62%), var(--background)",
      }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-[1.04fr_1fr] md:gap-13">

        {/* Left column */}
        <div className="animate-iz-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-[13px] font-bold text-primary">
            <span className="size-1.75 shrink-0 rounded-full bg-primary" />
            {t("badge")}
          </span>

          <h1 className="mt-5 text-[clamp(36px,4.5vw,58px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-foreground">
            {t.rich("h1", {
              highlight: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h1>

          <p className="mt-5 max-w-130 text-[19px] leading-[1.55] text-muted-foreground">
            {t("sub")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-accent font-bold text-accent-foreground shadow-[0_10px_24px_color-mix(in_oklch,var(--accent)_30%,transparent)] hover:bg-accent/90"
            >
              <a href="#cta">{t("cta1")}</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl border-primary/25 font-bold hover:border-primary">
              <a href="#how">{t("cta2")}</a>
            </Button>
          </div>

          <p className="mt-4 text-[13.5px] font-semibold text-muted-foreground/70">
            {t("note")}
          </p>
        </div>

        {/* Right column */}
        <div className="relative">
          <HeroMap isAr={isAr} cardLabel={t("card.label")} cardStatus={t("card.status")} />
        </div>
      </div>
    </section>
  );
}

function HeroMap({ isAr, cardLabel, cardStatus }: { isAr: boolean; cardLabel: string; cardStatus: string }) {
  return (
    <div className="relative">
      <svg viewBox="0 0 600 470" width="100%" className="block overflow-visible">
        <defs>
          <linearGradient id="izRoute" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1B6EF3" />
            <stop offset="100%" stopColor="#5B9BFF" />
          </linearGradient>
        </defs>

        <ellipse cx="300" cy="235" rx="260" ry="210" fill="oklch(0.541 0.233 258 / 8%)" />
        <circle cx="300" cy="235" r="240" fill="none" stroke="oklch(0.541 0.233 258 / 20%)" strokeWidth="1.2" strokeDasharray="2 6" />

        {[
          { d: "M300,250 Q210,190 130,110", dur: "1.8s" },
          { d: "M300,250 Q390,230 490,215", dur: "2.1s" },
          { d: "M300,250 Q370,310 430,380", dur: "2.4s" },
        ].map((r, i) => (
          <path key={i} id={`izR${i + 1}`} d={r.d} fill="none" stroke="url(#izRoute)" strokeWidth="2.4" strokeDasharray="7 9" strokeLinecap="round">
            <animate attributeName="stroke-dashoffset" from="0" to="-64" dur={r.dur} repeatCount="indefinite" />
          </path>
        ))}
        {[
          { d: "M300,250 Q210,250 100,240", dur: "2.6s" },
          { d: "M300,250 Q295,160 290,80", dur: "2.2s" },
        ].map((r, i) => (
          <path key={i} d={r.d} fill="none" stroke="#9DBEFF" strokeWidth="2" strokeDasharray="6 8" strokeLinecap="round">
            <animate attributeName="stroke-dashoffset" from="0" to="-56" dur={r.dur} repeatCount="indefinite" />
          </path>
        ))}

        {[{ cx: 130, cy: 110 }, { cx: 490, cy: 215 }, { cx: 430, cy: 380 }, { cx: 100, cy: 240 }, { cx: 290, cy: 80 }].map((p, i) => (
          <g key={i}>
            <circle cx={p.cx} cy={p.cy} r={6} fill="#1B6EF3" opacity={0.85} />
            <circle cx={p.cx} cy={p.cy} r={2.5} fill="white" />
          </g>
        ))}

        <circle cx="300" cy="250" fill="none" stroke="#FF6B2C" strokeWidth="2" r="10" opacity="0">
          <animate attributeName="r" values="10;36" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="250" r="9" fill="#FF6B2C" />
        <circle cx="300" cy="250" r="3.4" fill="white" />

        {[1, 2, 3].map((i) => (
          <g key={i}>
            <animateMotion dur={`${i * 1.2 + 2.4}s`} repeatCount="indefinite" rotate="auto">
              <mpath href={`#izR${i}`} />
            </animateMotion>
            <rect x="-9" y="-7" width="18" height="14" rx="3" fill="#1B6EF3" />
            <line x1="-5" y1="0" x2="5" y2="0" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="5" cy="-5" r="3" fill="#FF6B2C" />
          </g>
        ))}
      </svg>

      <div className={`animate-iz-float absolute bottom-[12%] z-10 min-w-50 rounded-[14px] border border-border bg-card p-4 shadow-[0_18px_40px_oklch(0.148_0.012_253/12%)] ${isAr ? "-inset-e-1.5" : "-inset-s-1.5"}`}>
        <p className="mb-2.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {cardLabel}
        </p>
        <div className="mb-2.5 flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-1">
              <div
                className="size-2.5 shrink-0 rounded-full"
                style={{
                  background: i < 2 ? "var(--color-primary)" : i === 2 ? "var(--color-accent)" : "var(--color-border)",
                  border: i === 2 ? "2px solid var(--color-accent)" : "none",
                }}
              />
              {i < 4 && (
                <div
                  className="h-0.5 w-4 rounded-full"
                  style={{ background: i < 2 ? "var(--color-primary)" : "var(--color-border)" }}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-sm font-bold text-foreground">{cardStatus}</p>
      </div>
    </div>
  );
}
