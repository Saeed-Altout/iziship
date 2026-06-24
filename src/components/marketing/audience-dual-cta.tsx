"use client";

import { useTranslations } from "next-intl";
import { Animate } from "@/components/ui/animate";
import {
  IconPackage,
  IconTruck,
  IconLayoutDashboard,
  IconWallet,
  IconTrendingDown,
  IconRefresh,
  IconUsers,
  IconDeviceMobile,
  IconGitBranch,
  IconChartBar,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { BadgePill } from "@/components/ui/badge-pill";

const MERCHANT_BULLETS: { icon: React.ReactNode; key: number }[] = [
  { icon: <IconLayoutDashboard size={15} />, key: 0 },
  { icon: <IconWallet          size={15} />, key: 1 },
  { icon: <IconTrendingDown    size={15} />, key: 2 },
  { icon: <IconRefresh         size={15} />, key: 3 },
];

const CARRIER_BULLETS: { icon: React.ReactNode; key: number }[] = [
  { icon: <IconUsers        size={15} />, key: 0 },
  { icon: <IconDeviceMobile size={15} />, key: 1 },
  { icon: <IconGitBranch    size={15} />, key: 2 },
  { icon: <IconChartBar     size={15} />, key: 3 },
];


function PackageGlyph() {
  return (
    <svg
      className="pointer-events-none absolute -inset-s-5 -bottom-6 opacity-[0.055] transition-[opacity,transform] duration-300 group-hover:opacity-[0.085] group-hover:-translate-y-1.5 group-hover:scale-105"
      width="260" height="260" viewBox="0 0 260 260" fill="none" aria-hidden="true"
    >
      <path d="M130 28L232 82L232 178L130 232L28 178L28 82Z" stroke="var(--color-primary)" strokeWidth="5" />
      <path d="M28 82L130 136L130 232L28 178Z"               stroke="var(--color-primary)" strokeWidth="3" opacity="0.6" />
      <path d="M232 82L130 136L130 232L232 178Z"             stroke="var(--color-primary)" strokeWidth="3" opacity="0.6" />
      <path d="M28 82L130 136L232 82"                        stroke="var(--color-primary)" strokeWidth="3" />
      <path d="M130 28L130 136"                              stroke="var(--color-primary)" strokeWidth="3" strokeDasharray="8 5" />
      <path d="M100 96Q130 108 160 96"                       stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />
      <path d="M115 82Q130 96 145 82"                        stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function NetworkGlyph() {
  return (
    <svg
      className="pointer-events-none absolute -inset-s-5 -bottom-6 opacity-[0.065] transition-[opacity,transform] duration-300 group-hover:opacity-[0.1] group-hover:-translate-y-1.5 group-hover:scale-105"
      width="280" height="280" viewBox="0 0 280 280" fill="none" aria-hidden="true"
    >
      <circle cx="140" cy="60"  r="14" stroke="var(--color-accent)" strokeWidth="4" />
      <circle cx="60"  cy="180" r="12" stroke="var(--color-accent)" strokeWidth="3.5" />
      <circle cx="220" cy="180" r="12" stroke="var(--color-accent)" strokeWidth="3.5" />
      <circle cx="140" cy="240" r="10" stroke="var(--color-accent)" strokeWidth="3" />
      <path d="M140 74L60 168"   stroke="var(--color-accent)" strokeWidth="2.5" strokeDasharray="7 5" />
      <path d="M140 74L220 168"  stroke="var(--color-accent)" strokeWidth="2.5" strokeDasharray="7 5" />
      <path d="M60 192L140 230"  stroke="var(--color-accent)" strokeWidth="2"   strokeDasharray="6 5" opacity="0.7" />
      <path d="M220 192L140 230" stroke="var(--color-accent)" strokeWidth="2"   strokeDasharray="6 5" opacity="0.7" />
      <path d="M72 180L208 180"  stroke="var(--color-accent)" strokeWidth="2"   opacity="0.5" />
      <circle cx="140" cy="60"  r="4"   fill="var(--color-accent)" opacity="0.7" />
      <circle cx="60"  cy="180" r="3.5" fill="var(--color-accent)" opacity="0.7" />
      <circle cx="220" cy="180" r="3.5" fill="var(--color-accent)" opacity="0.7" />
    </svg>
  );
}

export function AudienceDualCTASection() {
  const t = useTranslations("audience");

  const merchantBullets = MERCHANT_BULLETS.map((b) => ({ ...b, text: t(`merchants.bullets.${b.key}`) }));
  const carrierBullets  = CARRIER_BULLETS.map((b)  => ({ ...b, text: t(`carriers.bullets.${b.key}`)  }));

  return (
    <Section id="audience" padding="large">

      {/* Header */}
      <div className="mb-[clamp(40px,5vw,64px)] text-center">
        <Animate variant="blurUp" delay={0} className="mb-4 flex justify-center">
          <BadgePill intent="primary" dot>
            {t("kicker")}
          </BadgePill>
        </Animate>
        <Animate variant="blurUp" delay={0.1}>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-black leading-[1.08] tracking-[-0.02em] text-foreground">
            {t("h2")}
          </h2>
        </Animate>
        <Animate variant="blurUp" delay={0.18}>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.65] text-muted-foreground">
            {t("sub")}
          </p>
        </Animate>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">

        {/* Carrier card — dark */}
        <Animate variant="blurUp" delay={0.15}>
          <div
            className="group relative isolate flex h-full cursor-default flex-col overflow-hidden rounded-[28px] border border-white/7 p-[clamp(32px,4vw,52px)] shadow-[0_8px_28px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:scale-[1.03] hover:border-accent/30 hover:shadow-[0_32px_72px_rgba(0,0,0,0.45)]"
            style={{ background: "#0D1B2E" }}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <span className="pointer-events-none absolute inset-x-10 top-0 h-[2.5px] rounded-b bg-linear-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />

            <NetworkGlyph />

            <BadgePill intent="secondary" dot className="mb-6 w-fit bg-accent/15 text-[#FF9A6C] border-accent/20">
              <IconTruck size={12} />
              {t("carriers.kicker")}
            </BadgePill>

            <h3 className="mb-3 text-[clamp(22px,2.4vw,30px)] font-black leading-[1.18] tracking-[-0.015em] text-[#F0F4FF]">
              {t("carriers.h3")}
            </h3>
            <p className="mb-6 text-[15px] leading-[1.65] text-[#8899BB]">
              {t("carriers.sub")}
            </p>

            <div className="mb-7 flex flex-wrap gap-2">
              {[0, 1, 2].map((i) => (
                <BadgePill key={i} intent="outline" className="border-white/10 bg-white/7 text-[rgba(240,244,255,0.75)]">
                  {t(`carriers.chips.${i}`)}
                </BadgePill>
              ))}
            </div>

            <ul className="mb-9 flex flex-col gap-3" role="list">
              {carrierBullets.map((item) => (
                <li key={item.key} className="flex items-start gap-2.5 text-[14.5px] font-semibold leading-normal text-[rgba(240,244,255,0.82)]">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent">
                    {item.icon}
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <Button
                asChild
                size="default"
                className="rounded-[14px] bg-accent px-6 font-extrabold text-white shadow-[0_10px_28px_color-mix(in_oklch,var(--accent)_38%,transparent)] hover:bg-accent/90"
              >
                <a href="#contact" className="inline-flex items-center gap-2">
                  {t("carriers.cta")}
                </a>
              </Button>
            </div>
          </div>
        </Animate>

        {/* Merchant card — light */}
        <Animate variant="blurUp" delay={0.22}>
          <div className="group relative isolate flex h-full cursor-default flex-col overflow-hidden rounded-[28px] border border-border bg-card p-[clamp(32px,4vw,52px)] shadow-[0_2px_0_oklch(0.148_0.012_253/3%),0_8px_28px_oklch(0.541_0.233_258/7%)] transition-all duration-300 ease-out hover:scale-[1.03] hover:border-primary/20 hover:shadow-[0_32px_72px_oklch(0.541_0.233_258/14%)]">
            <span className="pointer-events-none absolute inset-x-10 top-0 h-[2.5px] rounded-b bg-linear-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />

            <PackageGlyph />

            <BadgePill intent="primary" dot className="mb-6 w-fit">
              <IconPackage size={12} />
              {t("merchants.kicker")}
            </BadgePill>

            <h3 className="mb-3 text-[clamp(22px,2.4vw,30px)] font-black leading-[1.18] tracking-[-0.015em] text-foreground">
              {t("merchants.h3")}
            </h3>
            <p className="mb-6 text-[15px] leading-[1.65] text-muted-foreground">
              {t("merchants.sub")}
            </p>

            <div className="mb-7 flex flex-wrap gap-2">
              {[0, 1, 2].map((i) => (
                <BadgePill key={i} intent="primary" className="bg-primary/7 text-primary/80 border-primary/10">
                  {t(`merchants.chips.${i}`)}
                </BadgePill>
              ))}
            </div>

            <ul className="mb-9 flex flex-col gap-3" role="list">
              {merchantBullets.map((item) => (
                <li key={item.key} className="flex items-start gap-2.5 text-[14.5px] font-semibold leading-normal text-foreground">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                    {item.icon}
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <Button
                asChild
                size="default"
                className="rounded-[14px] px-6 font-extrabold shadow-[0_10px_28px_color-mix(in_oklch,var(--primary)_32%,transparent)]"
              >
                <a href="https://sevansy.com/auth/login" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  {t("merchants.cta")}
                </a>
              </Button>
            </div>
          </div>
        </Animate>

      </div>
    </Section>
  );
}