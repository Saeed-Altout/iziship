"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { BadgePill } from "@/components/ui/badge-pill";
import { Animate } from "@/components/ui/animate";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <Section id="cta" padding="large" className="relative">
      <Animate variant="scaleUp">
        <div className="relative isolate overflow-hidden rounded-[32px] px-8 py-16 text-center sm:px-16 sm:py-20">
          {/* Dark base */}
          <div className="absolute inset-0 rounded-[inherit] bg-[#060F1E]" />
          {/* Radial glow top */}
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,oklch(0.541_0.233_258/22%),transparent_65%)]" />
          {/* Soft bottom fill */}
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,oklch(0.541_0.233_258/8%),transparent_60%)]" />
          {/* Dot grid */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.035]"
            style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "26px 26px" }}
          />
          {/* Top border shimmer */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[inherit] bg-linear-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative z-10">
            <Animate variant="blurUp" delay={0} className="mb-5 flex justify-center">
              <BadgePill className="border-white/15 bg-white/8 text-white/80">
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                iziship
              </BadgePill>
            </Animate>

            <Animate variant="blurUp" delay={0.08}>
              <h2 className="mb-4 text-[clamp(28px,4vw,52px)] font-black leading-[1.06] tracking-[-0.03em] text-white">
                {t("h2")}
              </h2>
            </Animate>

            <Animate variant="blurUp" delay={0.16}>
              <p className="mx-auto mb-10 max-w-xl text-[17px] leading-[1.6] text-white/55">
                {t("sub")}
              </p>
            </Animate>

            <Animate variant="blurUp" delay={0.22}>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  asChild size="lg"
                  className="rounded-[14px] bg-white px-8 font-extrabold text-[#060F1E] shadow-[0_0_40px_oklch(0.541_0.233_258/35%)] transition-shadow hover:bg-white/90 hover:shadow-[0_0_60px_oklch(0.541_0.233_258/50%)]"
                >
                  <a href="#">{t("primary")}</a>
                </Button>
                <Button
                  asChild variant="outline" size="lg"
                  className="rounded-[14px] border-white/20 bg-white/5 px-8 font-bold text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <a href="#">{t("secondary")}</a>
                </Button>
              </div>
            </Animate>

            <Animate variant="blurUp" delay={0.3}>
              <p className="mt-8 text-[13px] text-white/30">
                {t("trust")}
              </p>
            </Animate>
          </div>
        </div>
      </Animate>
    </Section>
  );
}
