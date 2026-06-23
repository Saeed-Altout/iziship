"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STORE_META = [
  { mark: "Woo", bg: "bg-[#F3E8FF]", fg: "text-[#7C3AED]" },
  { mark: "سلة", bg: "bg-[#E9FBF0]", fg: "text-[#16A34A]" },
  { mark: "زد",  bg: "bg-accent/10",  fg: "text-accent" },
  { mark: "M",   bg: "bg-[#FFEDE4]", fg: "text-[#EA580C]" },
  { mark: "S",   bg: "bg-[#E9F7E1]", fg: "text-[#5A8F2B]" },
  { mark: "API", bg: "bg-primary/10", fg: "text-primary" },
];

const CARRIER_META = [
  { mark: "B", bg: "bg-accent/10",      fg: "text-accent" },
  { mark: "A", bg: "bg-destructive/10", fg: "text-destructive" },
  { mark: "S", bg: "bg-primary/10",     fg: "text-primary" },
  { mark: "N", bg: "bg-success/10",     fg: "text-success" },
  { mark: "F", bg: "bg-[#7C3AED]/10",   fg: "text-[#7C3AED]" },
  { mark: "+", bg: "bg-muted",          fg: "text-muted-foreground" },
];

const BULLET_ICONS = ["🔌", "🔄", "📦"];

export function IntegrationsSection() {
  const t = useTranslations("integrations");

  return (
    <section id="int" className="bg-muted/40 px-6 py-23">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start">

          {/* Left: heading + CTA */}
          <div>
            <p className="mb-3 text-[13px] font-extrabold uppercase tracking-[0.12em] text-primary">
              {t("kicker")}
            </p>
            <h2 className="mb-5 text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight text-foreground">
              {t("h2")}
            </h2>
            <p className="mb-8 max-w-110 text-[17px] leading-[1.6] text-muted-foreground">
              {t("sub")}
            </p>

            <div className="mb-8 flex flex-col gap-3">
              {BULLET_ICONS.map((icon, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 text-[18px] leading-none">{icon}</span>
                  <span className="text-[15px] leading-normal text-foreground/80">
                    {t(`bullets.${idx}`)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2.5">
              <Button
                asChild
                size="lg"
                className="rounded-xl bg-accent font-bold text-accent-foreground shadow-[0_10px_24px_color-mix(in_oklch,var(--accent)_30%,transparent)] hover:bg-accent/90"
              >
                <a href="#cta">{t("ctaPrimary")}</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl border-primary/25 font-bold hover:border-primary">
                <a href="#" target="_blank" rel="noopener noreferrer">{t("ctaSecondary")}</a>
              </Button>
            </div>
          </div>

          {/* Right: hub grid */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                {t("storesLabel")}
              </p>
              <Badge variant="outline" className="rounded-full text-[11px] font-bold">{STORE_META.length}</Badge>
            </div>
            <div className="mb-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {STORE_META.map((s, idx) => (
                <div key={idx} className="flex items-center gap-3 rounded-[14px] border border-border bg-card px-4 py-3 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_oklch(0.148_0.012_253/7%)]">
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-[10px] text-[13px] font-extrabold ${s.bg} ${s.fg}`}>
                    {s.mark}
                  </div>
                  <span className="text-[14px] font-semibold text-foreground">{t(`stores.${idx}.name`)}</span>
                </div>
              ))}
            </div>

            {/* Connector */}
            <div className="relative my-2 flex items-center">
              <div className="h-px flex-1 bg-border" />
              <div className="mx-3 flex size-10 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-xs font-extrabold text-primary shadow-[0_0_0_6px_oklch(0.541_0.233_258/8%)]">
                izi
              </div>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="mb-4 mt-6 flex items-center gap-2">
              <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                {t("carriersLabel")}
              </p>
              <Badge variant="outline" className="rounded-full text-[11px] font-bold">400+</Badge>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {CARRIER_META.map((c, idx) => (
                <div key={idx} className="flex items-center gap-3 rounded-[14px] border border-border bg-card px-4 py-3 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_oklch(0.148_0.012_253/7%)]">
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-[10px] text-[13px] font-extrabold ${c.bg} ${c.fg}`}>
                    {c.mark}
                  </div>
                  <span className="text-[14px] font-semibold text-foreground">{t(`carriers.${idx}.name`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
