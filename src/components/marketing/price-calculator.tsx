"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const CARRIERS = [
  { mark: "B", name: "Bosta",  bg: "bg-accent/10",       fg: "text-accent",       rating: "4.9", price: "$3.20" },
  { mark: "A", name: "Aramex", bg: "bg-destructive/10",  fg: "text-destructive",  rating: "4.8", price: "$3.80" },
  { mark: "S", name: "SMSA",   bg: "bg-primary/10",      fg: "text-primary",      rating: "4.7", price: "$4.10" },
  { mark: "N", name: "Naqel",  bg: "bg-success/10",      fg: "text-success",      rating: "4.8", price: "$4.50" },
  { mark: "F", name: "Fardar", bg: "bg-[#7C3AED]/10",    fg: "text-[#7C3AED]",   rating: "4.6", price: "$4.90" },
];

export function PriceCalculatorSection() {
  const t = useTranslations("priceCalculator");

  const columns = [
    t("columns.carrier"),
    t("columns.serviceType"),
    t("columns.deliveryTime"),
    t("columns.delivery"),
    t("columns.price"),
  ];

  return (
    <section
      className="px-6 pb-22 pt-9"
      style={{
        background:
          "radial-gradient(900px 480px at 50% -12%, color-mix(in oklch, var(--primary) 12%, transparent) 0%, transparent 62%), var(--background)",
      }}
    >
      {/* Heading */}
      <div className="mx-auto mb-12 max-w-165 text-center">
        <p className="mb-3 text-[13px] font-extrabold uppercase tracking-[0.12em] text-primary">
          {t("kicker")}
        </p>
        <h2 className="text-[clamp(28px,3.5vw,40px)] font-extrabold tracking-tight text-foreground">
          {t("h2")}
        </h2>
      </div>

      {/* Dashboard mockup */}
      <div className="relative mx-auto max-w-265">
        <div className="flex overflow-hidden rounded-[20px] border border-border bg-card shadow-[0_34px_80px_oklch(0.148_0.012_253/18%)]">

          {/* Left sidebar */}
          <div className="flex w-13.5 shrink-0 flex-col items-center gap-3.5 bg-[#0D1B2A] py-4">
            <div className="flex size-7.5 items-center justify-center rounded-lg bg-primary">
              <span className="text-[10px] font-extrabold text-primary-foreground">izi</span>
            </div>
            {[55, 30, 40, 22, 35].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full"
                style={{
                  width: w * 0.38,
                  background: i === 0 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)",
                }}
              />
            ))}
          </div>

          {/* Main body */}
          <div className="min-w-0 flex-1">

            {/* Top bar */}
            <div className="flex flex-wrap items-center gap-2.5 border-b border-border px-5 py-3">
              <div className="flex min-w-35 flex-1 items-center gap-2 rounded-[9px] bg-muted px-3 py-1.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-muted-foreground">
                  <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <span className="text-[13px] text-muted-foreground">{t("searchPlaceholder")}</span>
              </div>
              <Button variant="outline" size="sm" className="whitespace-nowrap rounded-[9px] border-primary/40 text-xs font-bold text-primary">
                {t("createBtn")}
              </Button>
              <Badge variant="secondary" className="rounded-lg font-bold">$3,260</Badge>
              <div className="relative">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-muted-foreground">
                  <path d="M9 2a5 5 0 0 1 5 5v3.5l1.5 2H2.5L4 10.5V7a5 5 0 0 1 5-5zM7 15a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="absolute -inset-e-0.5 -top-0.5 size-1.75 rounded-full border-[1.5px] border-card bg-accent" />
              </div>
            </div>

            {/* Calculator header */}
            <div className="px-6 py-5">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-[9px] bg-primary/10">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="2" width="5" height="5" rx="1.5" fill="currentColor" className="text-primary" />
                    <rect x="9" y="2" width="5" height="5" rx="1.5" fill="currentColor" className="text-primary" opacity="0.5" />
                    <rect x="2" y="9" width="5" height="5" rx="1.5" fill="currentColor" className="text-primary" opacity="0.5" />
                    <rect x="9" y="9" width="5" height="5" rx="1.5" fill="currentColor" className="text-primary" opacity="0.3" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[15px] font-bold text-foreground">{t("calcTitle")}</p>
                  <p className="text-xs text-muted-foreground">{t("route")}</p>
                </div>
                <div className="ms-auto">
                  <Badge variant="secondary" className="gap-1.5 rounded-lg font-semibold">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {t("proPlan")}
                  </Badge>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-hidden rounded-[14px] border border-border">
                <div
                  className="grid bg-muted/60 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.03em] text-muted-foreground"
                  style={{ gridTemplateColumns: "1.7fr 1fr 1.4fr 1fr 0.8fr auto" }}
                >
                  {columns.map((col) => <span key={col}>{col}</span>)}
                  <span />
                </div>

                {CARRIERS.map((carrier, idx) => (
                  <div key={carrier.name}>
                    {idx > 0 && <Separator />}
                    <div
                      className="grid items-center gap-2 bg-card px-4 py-2.5"
                      style={{ gridTemplateColumns: "1.7fr 1fr 1.4fr 1fr 0.8fr auto" }}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`flex size-9 shrink-0 items-center justify-center rounded-[9px] text-[13px] font-extrabold ${carrier.bg} ${carrier.fg}`}>
                          {carrier.mark}
                        </div>
                        <div>
                          <p className="text-[13px] font-bold leading-tight text-foreground">{carrier.name}</p>
                          <p className="text-[11px] text-muted-foreground">★ {carrier.rating}</p>
                        </div>
                      </div>

                      <span className="text-[13px] text-muted-foreground">
                        {t(`carriers.${idx}.service`)}
                      </span>

                      <Badge variant="outline" className="w-fit rounded-full border-success/30 bg-success/10 text-[11px] font-bold text-success">
                        {t(`carriers.${idx}.eta`)}
                      </Badge>

                      <span className="text-[13px] text-muted-foreground">
                        {t(`carriers.${idx}.delivery`)}
                      </span>

                      <span className="text-[15px] font-extrabold text-foreground">{carrier.price}</span>

                      <Button size="sm" className="rounded-[9px] text-xs font-bold">
                        {t("actionLabel")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating badge */}
        <div className="animate-iz-float-slow absolute -bottom-5 -inset-e-4 z-10 rotate-[-7deg] rounded-2xl bg-primary px-5 py-3.5 text-center text-primary-foreground shadow-[0_16px_40px_oklch(0.541_0.233_258/35%)]">
          <p className="text-[26px] font-extrabold leading-none text-accent">{t("carriersNum")}</p>
          <p className="mt-1 text-xs font-semibold">{t("carriersLabel")}</p>
        </div>
      </div>

      <p className="mx-auto mt-18 max-w-7xl text-center text-[21px] font-bold text-foreground">
        {t("trust")}
      </p>
    </section>
  );
}
