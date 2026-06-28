"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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
import {
  Section,
  SectionBadge,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { BadgePill } from "@/components/ui/badge-pill";
import {
  AUDIENCE_MERCHANT_BULLET_KEYS,
  AUDIENCE_CARRIER_BULLET_KEYS,
  AUDIENCE_MERCHANT_CHIP_KEYS,
  AUDIENCE_CARRIER_CHIP_KEYS,
} from "@/constants";

const MERCHANT_BULLET_ICONS = [
  <IconLayoutDashboard size={15} key={0} />,
  <IconWallet size={15} key={1} />,
  <IconTrendingDown size={15} key={2} />,
  <IconRefresh size={15} key={3} />,
];

const CARRIER_BULLET_ICONS = [
  <IconUsers size={15} key={0} />,
  <IconDeviceMobile size={15} key={1} />,
  <IconGitBranch size={15} key={2} />,
  <IconChartBar size={15} key={3} />,
];

function PackageGlyph() {
  return (
    <span
      className="pointer-events-none absolute -end-8 -bottom-8 opacity-[0.055] transition-opacity duration-300 group-hover:opacity-100 text-primary"
      aria-hidden="true"
    >
      <IconPackage size={220} stroke={1} />
    </span>
  );
}

function TruckGlyph() {
  return (
    <span
      className="pointer-events-none absolute -end-8 -bottom-8 opacity-[0.065] transition-opacity duration-300 group-hover:opacity-100 text-accent"
      aria-hidden="true"
    >
      <IconTruck size={220} stroke={1} />
    </span>
  );
}

export function AudienceDualCTASection() {
  const t = useTranslations("audience");

  return (
    <Section id="audience" padding="large">
      {/* Header */}
      <div className="mb-[clamp(40px,5vw,64px)] flex flex-col items-center text-center">
        <SectionBadge className="mb-4">{t("kicker")}</SectionBadge>
        <SectionTitle className="mb-3">{t("h2")}</SectionTitle>
        <SectionSubtitle>{t("sub")}</SectionSubtitle>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {/* Carrier card — dark */}
        <Animate variant="blurUp" delay={0.15}>
          <div
            className="group relative isolate flex h-full cursor-default flex-col overflow-hidden rounded-[28px] border border-white/7 p-[clamp(32px,4vw,52px)] shadow-[0_8px_28px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:scale-[1.03] hover:border-accent/30 hover:shadow-[0_32px_72px_color-mix(in_oklch,var(--accent)_35%,transparent)]"
            style={{ background: "#0D1B2E" }}
          >
            <span
              className="pointer-events-none absolute inset-x-10 top-0 h-[2.5px] rounded-b bg-linear-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rtl:bg-linear-to-l"
              aria-hidden="true"
            />

            <TruckGlyph />

            <BadgePill
              intent="secondary"
              dot
              className="mb-6 w-fit bg-accent/15 text-[#FF9A6C] border-accent/20"
            >
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
              {AUDIENCE_CARRIER_CHIP_KEYS.map((i) => (
                <BadgePill
                  key={i}
                  intent="outline"
                  className="border-white/10 bg-white/7 text-[rgba(240,244,255,0.75)]"
                >
                  {t(`carriers.chips.${i}`)}
                </BadgePill>
              ))}
            </div>

            <ul className="mb-9 flex flex-col gap-3" role="list">
              {AUDIENCE_CARRIER_BULLET_KEYS.map((i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[14.5px] font-semibold leading-normal text-[rgba(240,244,255,0.82)]"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-accent">
                    {CARRIER_BULLET_ICONS[i]}
                  </span>
                  {t(`carriers.bullets.${i}`)}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <Button
                asChild
                size="default"
                className="rounded-[14px] bg-accent px-6 font-extrabold text-white shadow-[0_10px_28px_color-mix(in_oklch,var(--accent)_38%,transparent)] hover:bg-accent/90"
              >
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2"
                >
                  {t("carriers.cta")}
                </Link>
              </Button>
            </div>
          </div>
        </Animate>

        {/* Merchant card — light */}
        <Animate variant="blurUp" delay={0.22}>
          <div className="group relative isolate flex h-full cursor-default flex-col overflow-hidden rounded-[28px] border border-border bg-card p-[clamp(32px,4vw,52px)] shadow-[0_2px_0_oklch(0.148_0.012_253/3%),0_8px_28px_oklch(0.541_0.233_258/7%)] transition-all duration-300 ease-out hover:scale-[1.03] hover:border-primary/20 hover:shadow-[0_32px_72px_oklch(0.541_0.233_258/14%)]">
            <span
              className="pointer-events-none absolute inset-x-10 top-0 h-[2.5px] rounded-b bg-linear-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rtl:bg-linear-to-l"
              aria-hidden="true"
            />

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
              {AUDIENCE_MERCHANT_CHIP_KEYS.map((i) => (
                <BadgePill
                  key={i}
                  intent="primary"
                  className="bg-primary/7 text-primary/80 border-primary/10"
                >
                  {t(`merchants.chips.${i}`)}
                </BadgePill>
              ))}
            </div>

            <ul className="mb-9 flex flex-col gap-3" role="list">
              {AUDIENCE_MERCHANT_BULLET_KEYS.map((i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[14.5px] font-semibold leading-normal text-foreground"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-primary">
                    {MERCHANT_BULLET_ICONS[i]}
                  </span>
                  {t(`merchants.bullets.${i}`)}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <Button
                asChild
                size="default"
                className="rounded-[14px] px-6 font-extrabold shadow-[0_10px_28px_color-mix(in_oklch,var(--primary)_32%,transparent)]"
              >
                <Link
                  href="https://sevansy.com/auth/login"
                  target="_blank"
                  className="inline-flex items-center gap-2"
                >
                  {t("merchants.cta")}
                </Link>
              </Button>
            </div>
          </div>
        </Animate>
      </div>
    </Section>
  );
}
