"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

/* ── Audience Split ─────────────────────────────────────────────────── */
function BulletList({ items, accent }: { items: string[]; accent: "primary" | "accent" }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2.5">
          <div className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${accent === "primary" ? "bg-primary/20" : "bg-accent/20"}`}>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path
                d="M1.5 4.5l2 2 4-4"
                stroke={accent === "primary" ? "var(--color-primary)" : "var(--color-accent)"}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-[15px] leading-normal text-foreground/75">{item}</span>
        </div>
      ))}
    </div>
  );
}

export function AudienceSplitSection() {
  const t = useTranslations("audience");

  const merchantBullets = [0, 1, 2, 3].map((i) => t(`merchants.bullets.${i}`));
  const carrierBullets  = [0, 1, 2, 3].map((i) => t(`carriers.bullets.${i}`));

  return (
    <section id="audience" className="bg-background px-6 py-23">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 md:grid-cols-2">

        {/* Merchants */}
        <div className="rounded-3xl bg-primary/8 p-10">
          <span className="mb-5 inline-block rounded-lg bg-primary/15 px-2.5 py-1 text-[12px] font-bold uppercase tracking-[0.06em] text-primary">
            {t("merchants.kicker")}
          </span>
          <h3 className="mb-6 text-[clamp(22px,2.5vw,30px)] font-extrabold leading-tight text-primary">
            {t("merchants.h3")}
          </h3>
          <BulletList items={merchantBullets} accent="primary" />
          <Button asChild size="default" className="mt-7 rounded-xl font-bold">
            <a href="#cta">{t("merchants.cta")}</a>
          </Button>
        </div>

        {/* Carriers */}
        <div className="rounded-3xl bg-accent/8 p-10">
          <span className="mb-5 inline-block rounded-lg bg-accent/15 px-2.5 py-1 text-[12px] font-bold uppercase tracking-[0.06em] text-accent">
            {t("carriers.kicker")}
          </span>
          <h3 className="mb-6 text-[clamp(22px,2.5vw,30px)] font-extrabold leading-tight text-accent">
            {t("carriers.h3")}
          </h3>
          <BulletList items={carrierBullets} accent="accent" />
          <Button
            asChild
            size="default"
            className="mt-7 rounded-xl bg-accent font-bold text-accent-foreground shadow-[0_10px_24px_color-mix(in_oklch,var(--accent)_30%,transparent)] hover:bg-accent/90"
          >
            <a href="#cta">{t("carriers.cta")}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ── Stats Bar ──────────────────────────────────────────────────────── */
export function StatsBarSection() {
  const t = useTranslations("stats");

  return (
    <section className="bg-muted/50 px-6 py-16">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-12">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="text-center">
            <p className="text-[48px] font-extrabold leading-none text-primary">
              {t(`items.${i}.num`)}
            </p>
            <p className="mt-1.5 text-[15px] font-semibold text-muted-foreground">
              {t(`items.${i}.label`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── CTA Section ────────────────────────────────────────────────────── */
export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section
      id="cta"
      className="px-6 py-24 text-center"
      style={{
        background:
          "radial-gradient(900px 480px at 50% 0%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 62%), var(--color-primary)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-[clamp(30px,4vw,48px)] font-extrabold tracking-[-0.03em] text-white">
          {t("h2")}
        </h2>
        <p className="mx-auto mb-8 max-w-130 text-[18px] leading-[1.55] text-white/75">
          {t("sub")}
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <Button
            asChild
            size="lg"
            className="rounded-xl bg-white font-bold text-primary hover:bg-white/90"
          >
            <a href="#">{t("primary")}</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl border-white/45 font-bold text-white hover:border-white/80 hover:bg-transparent hover:text-white"
          >
            <a href="#">{t("secondary")}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────────────────────── */
export function MarketingFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#0D1B2A] px-6 py-11">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6">
        <div className="flex flex-col gap-2">
          <div dir="ltr">
            <Image src="/logo-dark.svg" alt="iziship" width={120} height={34} className="h-8.5 w-auto" />
          </div>
          <p className="max-w-105 text-[14px] leading-normal text-white/50">
            {t("tagline")}
          </p>
        </div>
        <p className="ms-auto text-[13px] text-white/40">
          {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
