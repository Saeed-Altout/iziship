"use client";

import { useTranslations } from "next-intl";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { BadgePill } from "@/components/ui/badge-pill";
import { Animate } from "@/components/ui/animate";
import { CarriersMarquee } from "@/components/marketing/carriers-marquee";

export function HeroSection() {
  const t = useTranslations("hero");
  const trustItems = t.raw("trust") as string[];

  return (
    <section className="relative overflow-hidden pb-0 pt-14">
      <Section width="container" padding="none">
        <Animate
          variant="staggerContainer"
          className="relative flex flex-col items-center px-4 py-16 text-center xl:px-64"
        >
          {/* Badge */}
          <Animate variant="slideUp" delay={0}>
            <BadgePill intent="primary" dot>
              {t("badge")}
            </BadgePill>
          </Animate>

          {/* Headline */}
          <Animate variant="slideUp" delay={0.08}>
            <h1 className="mt-6 text-[clamp(36px,5.5vw,68px)] font-extrabold leading-[1.06] tracking-[-0.03em] text-foreground">
              {t.rich("h1", {
                highlight: (chunks) => (
                  <span className="relative inline-block whitespace-nowrap">
                    <span className="relative z-10 text-primary">{chunks}</span>
                    <svg
                      className="absolute -bottom-2 inset-s-0 w-full"
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
                        className="text-primary/25"
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
          </Animate>

          {/* Subtitle */}
          <Animate variant="slideUp" delay={0.14}>
            <p className="mt-5 max-w-130 text-[17px] leading-[1.65] text-muted-foreground">
              {t("sub")}
            </p>
          </Animate>

          {/* CTA */}
          <Animate variant="slideUp" delay={0.2}>
            <div className="mt-8 flex flex-col items-center gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-accent px-8 font-bold text-accent-foreground shadow-[0_12px_32px_color-mix(in_oklch,var(--accent)_38%,transparent)] hover:bg-accent/90"
              >
                <a href="#cta" className="gap-2">
                  {t("cta1")} <IconArrowRight size={17} />
                </a>
              </Button>

              <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[12.5px] font-medium text-muted-foreground">
                {trustItems.map((item: string) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <IconCheck size={13} className="shrink-0 text-success" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Animate>
        </Animate>
      </Section>

      <CarriersMarquee />
    </section>
  );
}
