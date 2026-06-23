"use client";

import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import { type ILocale } from "@/i18n/routing";
import { isRtl } from "@/lib/i18n";

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale() as ILocale;
  const rtl = isRtl(locale);

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-16">
      {/* Grid texture */}
      {/* <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      /> */}

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 md:grid-cols-[1.1fr_1fr]">
        {/* ── Left ── */}
        <div className="animate-iz-fade-up flex flex-col">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3.5 py-1.5 text-[12.5px] font-bold text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            {t("badge")}
          </div>

          <h1 className="mt-5 text-[clamp(38px,4.8vw,62px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-foreground">
            {t.rich("h1", {
              highlight: (chunks) => (
                <span className="relative inline-block whitespace-nowrap">
                  <span className="relative z-10 text-primary">{chunks}</span>
                  <svg
                    className="absolute -bottom-2 start-0 w-full"
                    viewBox="0 0 220 12"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 9 C30 3, 60 11, 110 6 C160 1, 190 9, 218 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary/30"
                    />
                    <path
                      d="M2 9 C30 3, 60 11, 110 6 C160 1, 190 9, 218 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="218"
                      strokeDashoffset="218"
                      className="text-primary"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="218"
                        to="0"
                        dur="0.8s"
                        begin="0.4s"
                        fill="freeze"
                        calcMode="spline"
                        keySplines="0.4 0 0.2 1"
                      />
                    </path>
                  </svg>
                </span>
              ),
            })}
          </h1>

          <p className="mt-5 max-w-[520px] text-[18px] leading-[1.6] text-muted-foreground">
            {t("sub")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-accent font-bold text-accent-foreground shadow-[0_10px_28px_color-mix(in_oklch,var(--accent)_35%,transparent)] hover:bg-accent/90 transition-shadow"
            >
              <a href="#cta" className="gap-2">
                {t("cta1")} <IconArrowRight size={17} />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full font-bold hover:border-primary/40 hover:bg-primary/5"
            >
              <a href="#how">{t("cta2")}</a>
            </Button>
          </div>

          <p className="mt-3.5 text-[13px] font-medium text-muted-foreground/60">
            {t("note")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6">
            {[
              { num: "500+", label: "Active merchants" },
              { num: "10+", label: "Carriers" },
              { num: "98%", label: "On-time delivery" },
            ].map((s) => (
              <div key={s.num} className="flex items-baseline gap-1.5">
                <span className="text-[22px] font-extrabold tracking-tight text-foreground">
                  {s.num}
                </span>
                <span className="text-[13px] font-medium text-muted-foreground">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Dashboard mockup ── */}
        <div className="animate-iz-fade-up" style={{ animationDelay: "0.15s" }}>
          <DashboardMockup rtl={rtl} />
        </div>
      </div>
    </section>
  );
}

const ORDERS = [
  {
    id: "#4821",
    dest: "Aleppo",
    carrier: "Bosta",
    status: "Delivered",
    statusColor: "success",
  },
  {
    id: "#4820",
    dest: "Homs",
    carrier: "Aramex",
    status: "In transit",
    statusColor: "primary",
  },
  {
    id: "#4819",
    dest: "Latakia",
    carrier: "Fardar",
    status: "Picked up",
    statusColor: "primary",
  },
  {
    id: "#4818",
    dest: "Damascus",
    carrier: "SMSA",
    status: "Pending",
    statusColor: "warning",
  },
];

const STATUS_COLORS: Record<string, string> = {
  success: "bg-success/12 text-success",
  primary: "bg-primary/10 text-primary",
  warning: "bg-warning/15 text-warning",
};

function DashboardMockup({ rtl }: { rtl: boolean }) {
  return (
    <div
      className="relative rounded-2xl border border-border bg-card shadow-[0_32px_80px_oklch(0.148_0.012_253/14%)]"
      dir={rtl ? "rtl" : "ltr"}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-400" />
        <span className="size-2.5 rounded-full bg-yellow-400" />
        <span className="size-2.5 rounded-full bg-green-400" />
        <div className="mx-auto flex items-center gap-1.5 rounded-md bg-muted px-3 py-1 text-[11px] text-muted-foreground">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle
              cx="5"
              cy="5"
              r="4"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M5 3v2.5l1.5 1"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          app.iziship.co
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Top row: wallet + tracking progress */}
        <div className="grid grid-cols-2 gap-3">
          {/* Wallet card */}
          <div className="rounded-xl bg-primary p-3.5 text-primary-foreground">
            <p className="text-[10.5px] font-semibold opacity-70">
              Wallet balance
            </p>
            <p className="mt-1 text-[22px] font-extrabold tracking-tight">
              $2,340
            </p>
            <div className="mt-2.5 flex items-center gap-1.5">
              <div className="h-1 flex-1 rounded-full bg-white/20">
                <div className="h-1 w-[68%] rounded-full bg-white/80" />
              </div>
              <span className="text-[10px] font-semibold opacity-70">COD</span>
            </div>
            <p className="mt-1.5 text-[10.5px] font-semibold opacity-60">
              Last payout: today
            </p>
          </div>

          {/* Live tracking card */}
          <div className="rounded-xl border border-border bg-background p-3.5">
            <div className="flex items-center justify-between">
              <p className="text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">
                Live
              </p>
              <span className="flex size-1.5 rounded-full bg-success">
                <span className="animate-ping size-1.5 rounded-full bg-success opacity-60" />
              </span>
            </div>
            <p className="mt-1.5 text-[13px] font-bold text-foreground">
              Order #4820
            </p>
            <p className="text-[11px] text-muted-foreground">
              Damascus → Aleppo
            </p>
            <div className="mt-3 flex items-center gap-0.5">
              {["Created", "Pickup", "Transit", "Delivery", "Done"].map(
                (s, i) => (
                  <div
                    key={s}
                    className="flex flex-1 flex-col items-center gap-1"
                  >
                    <div
                      className={`size-2 rounded-full ${i <= 2 ? "bg-primary" : "bg-border"}`}
                    />
                    {i < 4 && (
                      <div
                        className={`h-0.5 w-full ${i < 2 ? "bg-primary" : "bg-border"}`}
                      />
                    )}
                  </div>
                ),
              )}
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">
              In transit · ETA 2h
            </p>
          </div>
        </div>

        {/* Orders table */}
        <div className="rounded-xl border border-border bg-background overflow-hidden">
          <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border">
            <p className="text-[12px] font-bold text-foreground">
              Recent orders
            </p>
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
              4 today
            </span>
          </div>
          <div className="divide-y divide-border">
            {ORDERS.map((o, i) => (
              <div
                key={o.id}
                className="flex items-center justify-between px-3.5 py-2"
                style={{ opacity: 1 - i * 0.07 }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <rect
                        x="1"
                        y="3"
                        width="10"
                        height="8"
                        rx="1.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M4 3V2.5a2 2 0 014 0V3"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11.5px] font-bold text-foreground leading-none">
                      {o.id}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {o.dest} · {o.carrier}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[o.statusColor]}`}
                >
                  {o.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Carrier compare strip */}
        <div className="rounded-xl border border-border bg-background p-3">
          <p className="mb-2 text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">
            Best price · Damascus → Aleppo
          </p>
          <div className="space-y-1.5">
            {[
              { name: "Bosta", price: "$4.20", eta: "1 day", best: true },
              { name: "Aramex", price: "$5.10", eta: "2 days", best: false },
              { name: "Fardar", price: "$3.90", eta: "3 days", best: false },
            ].map((c) => (
              <div
                key={c.name}
                className={`flex items-center justify-between rounded-lg px-3 py-1.5 ${c.best ? "bg-primary/8 ring-1 ring-primary/20" : "bg-muted/50"}`}
              >
                <div className="flex items-center gap-2">
                  {c.best && (
                    <span className="rounded-sm bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold text-primary">
                      BEST
                    </span>
                  )}
                  <span className="text-[11.5px] font-semibold text-foreground">
                    {c.name}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] text-muted-foreground">
                    {c.eta}
                  </span>
                  <span
                    className={`text-[12px] font-bold ${c.best ? "text-primary" : "text-foreground"}`}
                  >
                    {c.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating notification */}
      <div
        className={`animate-iz-float absolute -top-5 z-10 flex items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-2.5 shadow-lg ${rtl ? "-right-4" : "-left-4"}`}
      >
        <div className="flex size-7 items-center justify-center rounded-lg bg-success/12 text-success">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7l4 4 6-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground">
            COD collected
          </p>
          <p className="text-[12.5px] font-bold text-foreground">
            +$340 · Order #4817
          </p>
        </div>
      </div>
    </div>
  );
}
