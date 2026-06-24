"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { BadgePill } from "@/components/ui/badge-pill";
import { Animate } from "@/components/ui/animate";

function CheckRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-[14px] text-muted-foreground">
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/12">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
          <path d="M2 5.5l2.3 2.3 4.7-4.6" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {children}
    </li>
  );
}

export function ContactSection() {
  const t = useTranslations("contact");

  return (
    <Section id="contact" padding="large" className="relative overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(var(--color-border) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,oklch(0.541_0.233_258/6%),transparent_65%)]" />

      <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

        {/* ── Left — copy ── */}
        <div>
          <Animate variant="blurUp" delay={0} className="mb-4">
            <BadgePill intent="primary" dot>{t("kicker")}</BadgePill>
          </Animate>

          <Animate variant="blurUp" delay={0.08}>
            <h2 className="mb-4 text-[clamp(26px,3.2vw,44px)] font-black leading-[1.08] tracking-[-0.025em] text-foreground">
              {t("h2")}
            </h2>
          </Animate>

          <Animate variant="blurUp" delay={0.14}>
            <p className="mb-8 text-[15px] leading-[1.7] text-muted-foreground">
              {t("sub")}
            </p>
          </Animate>

          <Animate variant="blurUp" delay={0.2}>
            <ul className="flex flex-col gap-3" role="list">
              {[0, 1, 2].map((i) => (
                <CheckRow key={i}>{t(`perks.${i}`)}</CheckRow>
              ))}
            </ul>
          </Animate>
        </div>

        {/* ── Right — form card ── */}
        <Animate variant="blurUp" delay={0.12}>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[0_4px_32px_oklch(0.541_0.233_258/8%)] sm:p-8 dark:border-white/8 dark:bg-[#0D1B2E]">
            {/* Top shimmer */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

            <h3 className="mb-6 text-[18px] font-extrabold text-foreground">{t("formTitle")}</h3>

            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-muted-foreground">{t("fields.name")} *</label>
                <input
                  type="text"
                  placeholder={t("placeholders.name")}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-colors dark:border-white/10 dark:bg-white/4"
                />
              </div>

              {/* Phone + Email row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-muted-foreground">{t("fields.phone")} *</label>
                  <input
                    type="tel"
                    placeholder={t("placeholders.phone")}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-colors dark:border-white/10 dark:bg-white/4"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-muted-foreground">{t("fields.email")}</label>
                  <input
                    type="email"
                    placeholder={t("placeholders.email")}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-colors dark:border-white/10 dark:bg-white/4"
                  />
                </div>
              </div>

              {/* Business type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-muted-foreground">{t("fields.businessType")} *</label>
                <select
                  defaultValue=""
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[14px] text-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-colors dark:border-white/10 dark:bg-[#0D1B2E]"
                >
                  <option value="" disabled>{t("placeholders.businessType")}</option>
                  <option value="merchant">{t("businessTypes.merchant")}</option>
                  <option value="carrier">{t("businessTypes.carrier")}</option>
                  <option value="both">{t("businessTypes.both")}</option>
                </select>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="mt-2 w-full rounded-xl font-extrabold shadow-[0_8px_24px_color-mix(in_oklch,var(--primary)_30%,transparent)]"
              >
                {t("submit")}
              </Button>

              <p className="text-center text-[12px] text-muted-foreground/60">{t("privacy")}</p>
            </form>
          </div>
        </Animate>

      </div>
    </Section>
  );
}
