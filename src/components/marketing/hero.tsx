"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { BadgePill } from "@/components/ui/badge-pill";
import { Animate } from "@/components/ui/animate";
import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";

const CARRIERS = [
  { name: "FedEx", src: "/logos/logistics-delivery/fedex-logo.svg" },
  { name: "J&T Express", src: "/logos/logistics-delivery/j_t-express-logo.svg" },
  { name: "JNE Express", src: "/logos/logistics-delivery/jne-express-logo.svg" },
  { name: "GoSend", src: "/logos/logistics-delivery/gosend-logo.svg" },
  { name: "GoBox", src: "/logos/logistics-delivery/gobox-logo.svg" },
  { name: "Paxel", src: "/logos/logistics-delivery/paxel-logo.svg" },
  { name: "ID Express", src: "/logos/logistics-delivery/id-express-logo.svg" },
  { name: "Pos Indonesia", src: "/logos/logistics-delivery/pos-indonesia-logo.svg" },
];

const TRUST_ITEMS = ["No setup fee", "Cancel anytime", "24/7 support"];
const AVATAR_COLORS = ["#1B6EF3", "#00A651", "#FF6B2C", "#E60000"] as const;
const AVATAR_INITIALS = ["S", "A", "M", "R"];

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden pb-0 pt-14">
      {/* subtle radial glow behind headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-130 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.541 0.233 258 / 14%), transparent)",
        }}
      />

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
                {TRUST_ITEMS.map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <IconCheck size={13} className="shrink-0 text-success" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Animate>

          {/* Social proof */}
          <Animate variant="fadeIn" delay={0.3}>
            <div className="mt-7 flex items-center gap-3">
              <div className="flex -space-x-2">
                {AVATAR_COLORS.map((bg, i) => (
                  <div
                    key={i}
                    className="flex size-8 items-center justify-center rounded-full border-2 border-background text-[11px] font-bold text-white"
                    style={{ backgroundColor: bg }}
                  >
                    {AVATAR_INITIALS[i]}
                  </div>
                ))}
              </div>
              <div className="text-start">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="#FFB020">
                      <path d="M6.5 1l1.545 3.13L11.5 4.635l-2.5 2.435.59 3.43L6.5 8.885l-3.09 1.615.59-3.43L1.5 4.635l3.455-.505z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[11.5px] text-muted-foreground">
                  <span className="font-bold text-foreground">4.9/5</span> · 500+ merchants
                </p>
              </div>
            </div>
          </Animate>
        </Animate>
      </Section>

      {/* Carrier marquee strip */}
      <Animate variant="fadeIn" delay={0.4} once>
        <div className="border-t border-border bg-background/80 pb-6 pt-5">
          <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Providing solutions for best carriers
          </p>
          <Marquee speed={45} fade pauseOnHover className="[--mq-gap:3.5rem]">
            {CARRIERS.map((c, i) => (
              <div key={i} className="flex shrink-0 items-center">
                <Image
                  src={c.src}
                  alt={c.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </Animate>
    </section>
  );
}
