"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STAGE_ICONS = [
  (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="16" height="16" rx="3" />
      <path d="M11 7v8M7 11h8" />
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="11" r="2.5" />
      <circle cx="17" cy="5.5" r="2.5" />
      <circle cx="17" cy="16.5" r="2.5" />
      <path d="M7.5 11h4M14.5 5.5l-3 4M14.5 16.5l-3-4" />
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="16" height="13" rx="2.5" />
      <path d="M7 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
      <path d="M7 11h8M7 14h5" />
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="11" r="3" />
      <circle cx="17" cy="11" r="3" />
      <path d="M8 11h6" strokeDasharray="2 2" />
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="18" height="12" rx="3" />
      <path d="M2 10h18" />
      <path d="M6 14h4" />
    </svg>
  ),
];

const STAGE_NUMS = ["01", "02", "03", "04", "05"];
const STAGE_MOCKUP_TYPES = ["form", "compare", "label", "track", "wallet"];

const COMPARE_CARRIER_META = [
  { mark: "B", bg: "bg-accent/10",      fg: "text-accent",      price: "$3.20" },
  { mark: "A", bg: "bg-destructive/10", fg: "text-destructive", price: "$3.80" },
  { mark: "N", bg: "bg-success/10",     fg: "text-success",     price: "$4.50" },
];

function StepMockup({ stageIdx, t }: { stageIdx: number; t: ReturnType<typeof useTranslations<"journey">> }) {
  const type = STAGE_MOCKUP_TYPES[stageIdx];
  const badge = t(`stages.${stageIdx}.badge`);

  if (type === "form") {
    const fields = [0, 1, 2].map((i) => t(`stages.0.formFields.${i}`));
    return (
      <div className="rounded-[18px] border border-border bg-card p-6 shadow-[0_8px_28px_oklch(0.148_0.012_253/8%)]">
        <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
          {t("stages.0.formTitle")}
        </p>
        {fields.map((lbl) => (
          <div key={lbl} className="mb-3">
            <p className="mb-1 text-[11px] font-semibold text-muted-foreground">{lbl}</p>
            <div className="h-8 rounded-lg bg-muted" />
          </div>
        ))}
        <Button size="sm" className="mt-2 w-full rounded-xl font-bold">
          {t("stages.0.formContinue")}
        </Button>
        <Badge variant="secondary" className="mt-3 gap-1.5">
          <span className="size-1.5 rounded-full bg-accent" />{badge}
        </Badge>
      </div>
    );
  }

  if (type === "compare") {
    const carrierNames = COMPARE_CARRIER_META.map((_, i) => {
      const names = ["Bosta", "Aramex", "Naqel"];
      return names[i];
    });
    return (
      <div className="overflow-hidden rounded-[18px] border border-border bg-card shadow-[0_8px_28px_oklch(0.148_0.012_253/8%)]">
        <p className="border-b border-border bg-muted/40 px-5 py-3.5 text-[13px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
          {t("stages.1.compareTitle")}
        </p>
        {COMPARE_CARRIER_META.map((c, i) => (
          <div key={c.mark} className={cn("flex items-center gap-3 px-5 py-3", i > 0 && "border-t border-border", i === 0 && "bg-primary/5")}>
            <div className={`flex size-9 shrink-0 items-center justify-center rounded-[9px] text-[13px] font-extrabold ${c.bg} ${c.fg}`}>
              {c.mark}
            </div>
            <p className="flex-1 text-[13px] font-bold text-foreground">{carrierNames[i]}</p>
            <p className="text-[15px] font-extrabold text-foreground">{c.price}</p>
            {i === 0 && (
              <Button size="sm" className="shrink-0 rounded-[9px] text-xs font-bold">
                {t("stages.1.comparePick")}
              </Button>
            )}
          </div>
        ))}
        <div className="border-t border-border px-5 py-3">
          <Badge variant="secondary" className="gap-1.5">
            <span className="size-1.5 rounded-full bg-accent" />{badge}
          </Badge>
        </div>
      </div>
    );
  }

  if (type === "label") {
    return (
      <div className="rounded-[18px] border border-border bg-card p-6 shadow-[0_8px_28px_oklch(0.148_0.012_253/8%)]">
        <div className="mx-auto mb-4 w-45 rounded-xl border-2 border-dashed border-border bg-muted/30 p-4 text-center">
          <div className="mx-auto mb-2 h-12 w-full rounded bg-foreground/10" />
          <div className="mx-auto h-2 w-24 rounded bg-foreground/20" />
          <div className="mx-auto mt-1.5 h-1.5 w-16 rounded bg-muted-foreground/30" />
          <p className="mt-2 text-[10px] font-bold text-muted-foreground">iziship · #IZ-2890</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 rounded-xl text-xs font-bold">
            {t("stages.2.labelThermal")}
          </Button>
          <Button size="sm" className="flex-1 rounded-xl text-xs font-bold">
            {t("stages.2.labelPdf")}
          </Button>
        </div>
        <Badge variant="secondary" className="mt-3 gap-1.5">
          <span className="size-1.5 rounded-full bg-accent" />{badge}
        </Badge>
      </div>
    );
  }

  if (type === "track") {
    const trackStages = [0, 1, 2, 3, 4].map((i) => t(`stages.3.trackStages.${i}`));
    return (
      <div className="rounded-[18px] border border-border bg-card p-6 shadow-[0_8px_28px_oklch(0.148_0.012_253/8%)]">
        <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
          IZ-2890 · {t("stages.3.trackRoute")}
        </p>
        <div className="flex items-start justify-between">
          {trackStages.map((lbl, i) => (
            <div key={i} className="flex min-w-0 flex-col items-center gap-1.5">
              <div className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                i < 3 ? "bg-primary text-primary-foreground" : i === 3 ? "bg-accent text-accent-foreground ring-4 ring-accent/20" : "bg-muted text-muted-foreground"
              )}>
                {i < 3 ? "✓" : i + 1}
              </div>
              <span className="max-w-12.5 text-center text-[9px] font-semibold leading-tight text-muted-foreground">{lbl}</span>
            </div>
          ))}
        </div>
        <Badge variant="secondary" className="mt-4 gap-1.5">
          <span className="size-1.5 animate-pulse rounded-full bg-accent" />{badge}
        </Badge>
      </div>
    );
  }

  // wallet
  return (
    <div className="rounded-[18px] border border-border bg-card p-6 shadow-[0_8px_28px_oklch(0.148_0.012_253/8%)]">
      <div className="mb-4 rounded-2xl bg-primary p-5 text-primary-foreground">
        <p className="mb-0.5 text-[13px] font-semibold opacity-80">{t("stages.4.walletLabel")}</p>
        <p className="text-[28px] font-extrabold">$1,240.00</p>
        <p className="mt-2 text-[11px] font-semibold opacity-70">{t("stages.4.walletCod")}</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 rounded-xl text-xs font-bold">
          {t("stages.4.walletHistory")}
        </Button>
        <Button size="sm" className="flex-1 rounded-xl text-xs font-bold">
          {t("stages.4.walletWithdraw")}
        </Button>
      </div>
      <Badge variant="secondary" className="mt-3 gap-1.5">
        <span className="size-1.5 rounded-full bg-accent" />{badge}
      </Badge>
    </div>
  );
}

export function JourneyStepperSection() {
  const t = useTranslations("journey");
  const [active, setActive] = useState(0);

  return (
    <section
      id="journey"
      className="px-6 py-23"
      style={{
        background:
          "radial-gradient(800px 420px at 50% 100%, color-mix(in oklch, var(--accent) 8%, transparent) 0%, transparent 60%), var(--background)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-160 text-center">
          <p className="mb-3 text-[13px] font-extrabold uppercase tracking-[0.12em] text-primary">
            {t("kicker")}
          </p>
          <h2 className="text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight text-foreground">
            {t("h2")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_420px] lg:items-start">
          {/* Stage tabs */}
          <div className="flex flex-col gap-3">
            {STAGE_NUMS.map((num, idx) => (
              <button
                key={num}
                onClick={() => setActive(idx)}
                className={cn(
                  "group flex w-full items-start gap-4 rounded-[16px] border p-5 text-start transition-all duration-200",
                  idx === active
                    ? "border-primary/30 bg-primary/5 shadow-[0_4px_16px_oklch(0.541_0.233_258/10%)]"
                    : "border-border bg-card hover:border-primary/20 hover:bg-primary/3"
                )}
              >
                <div className={cn(
                  "mt-0.5 flex size-10.5 shrink-0 items-center justify-center rounded-[12px] transition-colors",
                  idx === active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                )}>
                  {STAGE_ICONS[idx]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className={cn("text-[11px] font-extrabold tracking-[0.08em]", idx === active ? "text-primary" : "text-muted-foreground")}>
                      {num}
                    </span>
                    <span className={cn("text-[16px] font-bold", idx === active ? "text-foreground" : "text-foreground/80")}>
                      {t(`stages.${idx}.title`)}
                    </span>
                  </div>
                  {idx === active && (
                    <p className="text-[14px] leading-[1.55] text-muted-foreground">
                      {t(`stages.${idx}.desc`)}
                    </p>
                  )}
                </div>
                {idx === active && (
                  <div className="ms-auto mt-1 size-2.5 shrink-0 rounded-full bg-accent" />
                )}
              </button>
            ))}
          </div>

          {/* Mockup panel */}
          <div className="lg:sticky lg:top-24">
            <StepMockup stageIdx={active} t={t} />
          </div>
        </div>
      </div>
    </section>
  );
}
