"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

/* ── Audience Split ─────────────────────────────────────────────────── */

function CheckIcon({ variant }: { variant: "primary" | "accent" }) {
  return (
    <span
      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
        variant === "primary" ? "bg-primary/12" : "bg-white/10"
      }`}
    >
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <path
          d="M2 5.5l2.3 2.3 4.7-4.6"
          stroke={variant === "primary" ? "var(--color-primary)" : "var(--color-accent)"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Large atmospheric glyph — merchant (package) */
function PackageGlyph() {
  return (
    <svg
      className="pointer-events-none absolute -inset-s-5 -bottom-6 opacity-[0.055] transition-[opacity,transform] duration-300 group-hover:opacity-[0.085] group-hover:-translate-y-1.5 group-hover:scale-105"
      width="260" height="260" viewBox="0 0 260 260" fill="none" aria-hidden="true"
    >
      <path d="M130 28L232 82L232 178L130 232L28 178L28 82Z" stroke="var(--color-primary)" strokeWidth="5" />
      <path d="M28 82L130 136L130 232L28 178Z" stroke="var(--color-primary)" strokeWidth="3" opacity="0.6" />
      <path d="M232 82L130 136L130 232L232 178Z" stroke="var(--color-primary)" strokeWidth="3" opacity="0.6" />
      <path d="M28 82L130 136L232 82" stroke="var(--color-primary)" strokeWidth="3" />
      <path d="M130 28L130 136" stroke="var(--color-primary)" strokeWidth="3" strokeDasharray="8 5" />
      <path d="M100 96Q130 108 160 96" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />
      <path d="M115 82Q130 96 145 82" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* Large atmospheric glyph — carrier (route network) */
function NetworkGlyph() {
  return (
    <svg
      className="pointer-events-none absolute -inset-s-5 -bottom-6 opacity-[0.065] transition-[opacity,transform] duration-300 group-hover:opacity-[0.1] group-hover:-translate-y-1.5 group-hover:scale-105"
      width="280" height="280" viewBox="0 0 280 280" fill="none" aria-hidden="true"
    >
      <circle cx="140" cy="60" r="14" stroke="var(--color-accent)" strokeWidth="4" />
      <circle cx="60" cy="180" r="12" stroke="var(--color-accent)" strokeWidth="3.5" />
      <circle cx="220" cy="180" r="12" stroke="var(--color-accent)" strokeWidth="3.5" />
      <circle cx="140" cy="240" r="10" stroke="var(--color-accent)" strokeWidth="3" />
      <path d="M140 74L60 168" stroke="var(--color-accent)" strokeWidth="2.5" strokeDasharray="7 5" />
      <path d="M140 74L220 168" stroke="var(--color-accent)" strokeWidth="2.5" strokeDasharray="7 5" />
      <path d="M60 192L140 230" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="6 5" opacity="0.7" />
      <path d="M220 192L140 230" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="6 5" opacity="0.7" />
      <path d="M72 180L208 180" stroke="var(--color-accent)" strokeWidth="2" opacity="0.5" />
      <circle cx="140" cy="60" r="4" fill="var(--color-accent)" opacity="0.7" />
      <circle cx="60" cy="180" r="3.5" fill="var(--color-accent)" opacity="0.7" />
      <circle cx="220" cy="180" r="3.5" fill="var(--color-accent)" opacity="0.7" />
    </svg>
  );
}

export function AudienceSplitSection() {
  const t = useTranslations("audience");

  const merchantBullets = [0, 1, 2, 3].map((i) => t(`merchants.bullets.${i}`));
  const carrierBullets  = [0, 1, 2, 3].map((i) => t(`carriers.bullets.${i}`));

  return (
    <section id="audience" className="px-6 py-[clamp(48px,7vw,96px)]">
      <div className="mx-auto max-w-7xl">

        {/* Section header */}
        <div className="mb-[clamp(40px,5vw,64px)] text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.14em] text-primary before:block before:h-px before:w-8 before:bg-primary/35 after:block after:h-px after:w-8 after:bg-primary/35">
            {t("kicker")}
          </div>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-black leading-[1.08] tracking-[-0.02em] text-foreground">
            {t("h2")}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">

          {/* ── Merchant card (light) ── */}
          <div className="group relative isolate cursor-default overflow-hidden rounded-[28px] border border-border bg-card p-[clamp(32px,4vw,52px)] shadow-[0_2px_0_oklch(0.148_0.012_253/3%),0_8px_28px_oklch(0.541_0.233_258/7%)] transition-all duration-300 ease-out hover:scale-[1.03] hover:border-primary/20 hover:shadow-[0_32px_72px_oklch(0.541_0.233_258/14%)]">

            {/* Hover accent bar */}
            <span className="pointer-events-none absolute inset-x-10 top-0 h-[2.5px] rounded-b bg-linear-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />

            <PackageGlyph />

            {/* Kicker */}
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-primary">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
              {t("merchants.kicker")}
            </span>

            <h3 className="mb-3 text-[clamp(22px,2.4vw,30px)] font-black leading-[1.18] tracking-[-0.015em] text-foreground">
              {t("merchants.h3")}
            </h3>
            <p className="mb-6 text-[15px] leading-[1.65] text-muted-foreground">
              {t("merchants.sub")}
            </p>

            {/* Stat chips */}
            <div className="mb-7 flex flex-wrap gap-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className="inline-flex items-center gap-1.5 rounded-lg bg-primary/7 px-2.5 py-1 text-[12px] font-bold text-primary/80">
                  <span className="size-1.25 rounded-full bg-primary" aria-hidden="true" />
                  {t(`merchants.chips.${i}`)}
                </span>
              ))}
            </div>

            <ul className="mb-9 flex flex-col gap-3" role="list">
              {merchantBullets.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14.5px] font-semibold leading-normal text-foreground">
                  <CheckIcon variant="primary" />
                  {item}
                </li>
              ))}
            </ul>

            <Button asChild size="default" className="rounded-[14px] px-6 font-extrabold shadow-[0_10px_28px_color-mix(in_oklch,var(--primary)_32%,transparent)]">
              <a href="#cta" className="inline-flex items-center gap-2">
                {t("merchants.cta")}
                <ArrowIcon />
              </a>
            </Button>
          </div>

          {/* ── Carrier card (dark) ── */}
          <div
            className="group relative isolate cursor-default overflow-hidden rounded-[28px] border border-white/7 p-[clamp(32px,4vw,52px)] shadow-[0_8px_28px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:scale-[1.03] hover:border-accent/30 hover:shadow-[0_32px_72px_rgba(0,0,0,0.45)]"
            style={{ background: "#0D1B2E" }}
          >
            {/* Subtle grid texture */}
            <span
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Hover accent bar */}
            <span className="pointer-events-none absolute inset-x-10 top-0 h-[2.5px] rounded-b bg-linear-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />

            <NetworkGlyph />

            {/* Kicker */}
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#FF9A6C]">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {t("carriers.kicker")}
            </span>

            <h3 className="mb-3 text-[clamp(22px,2.4vw,30px)] font-black leading-[1.18] tracking-[-0.015em] text-[#F0F4FF]">
              {t("carriers.h3")}
            </h3>
            <p className="mb-6 text-[15px] leading-[1.65] text-[#8899BB]">
              {t("carriers.sub")}
            </p>

            {/* Stat chips */}
            <div className="mb-7 flex flex-wrap gap-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className="inline-flex items-center gap-1.5 rounded-lg bg-white/7 px-2.5 py-1 text-[12px] font-bold text-[rgba(240,244,255,0.75)]">
                  <span className="size-1.25 rounded-full bg-accent" aria-hidden="true" />
                  {t(`carriers.chips.${i}`)}
                </span>
              ))}
            </div>

            <ul className="mb-9 flex flex-col gap-3" role="list">
              {carrierBullets.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14.5px] font-semibold leading-normal text-[rgba(240,244,255,0.82)]">
                  <CheckIcon variant="accent" />
                  {item}
                </li>
              ))}
            </ul>

            <Button
              asChild
              size="default"
              className="rounded-[14px] bg-accent px-6 font-extrabold text-white shadow-[0_10px_28px_color-mix(in_oklch,var(--accent)_38%,transparent)] hover:bg-accent/90"
            >
              <a href="#cta" className="inline-flex items-center gap-2">
                {t("carriers.cta")}
                <ArrowIcon />
              </a>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}

