"use client";

import Lenis from "lenis";
import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";

import { BadgePill } from "@/components/ui/badge-pill";
import { Animate } from "@/components/ui/animate";
import {
  Section,
  SectionBadge,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import {
  CompareCard,
  IntegrationCard,
  TrackingCard,
  WalletCard,
  FleetCard,
} from "@/components/features";

// ─── Per-card accent colours ──────────────────────────────────────────────────
const ACCENTS = [
  {
    glow: "oklch(0.541 0.233 258)",
    a12: "oklch(0.541 0.233 258 / 12%)",
    a7: "oklch(0.541 0.233 258 / 7%)",
    a5: "oklch(0.541 0.233 258 / 5%)",
  },
  {
    glow: "oklch(0.72 0.18 142)",
    a12: "oklch(0.72 0.18 142 / 12%)",
    a7: "oklch(0.72 0.18 142 / 7%)",
    a5: "oklch(0.72 0.18 142 / 5%)",
  },
  {
    glow: "oklch(0.70 0.18 30)",
    a12: "oklch(0.70 0.18 30 / 12%)",
    a7: "oklch(0.70 0.18 30 / 7%)",
    a5: "oklch(0.70 0.18 30 / 5%)",
  },
  {
    glow: "oklch(0.65 0.22 310)",
    a12: "oklch(0.65 0.22 310 / 12%)",
    a7: "oklch(0.65 0.22 310 / 7%)",
    a5: "oklch(0.65 0.22 310 / 5%)",
  },
  {
    glow: "oklch(0.62 0.22 195)",
    a12: "oklch(0.62 0.22 195 / 12%)",
    a7: "oklch(0.62 0.22 195 / 7%)",
    a5: "oklch(0.62 0.22 195 / 5%)",
  },
] as const;

const CARD_COUNT = 5;

// ─── Card index icons ─────────────────────────────────────────────────────────
function CardIcon({ index }: { index: number }) {
  const icons = [
    <svg
      key={0}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <path d="M3 6h18M3 12h12M3 18h6" />
    </svg>,
    <svg
      key={1}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>,
    <svg
      key={2}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="10" r="3" />
      <path d="M12 2a8 8 0 00-8 8c0 5 8 13 8 13s8-8 8-13a8 8 0 00-8-8z" />
    </svg>,
    <svg
      key={3}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M16 12h2" />
    </svg>,
    <svg
      key={4}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 7h6M9 12h6M9 17h6" />
    </svg>,
  ];
  return icons[index] ?? icons[0];
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function PlatformFeaturesSection() {
  const t = useTranslations("platformFeatures");
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const rawIndexRef = useRef(0);

  const onScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = el.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    const p = Math.min(Math.max(0, -rect.top) / total, 1);
    setIsVisible(p > 0.01);

    const raw = p * CARD_COUNT;
    const candidate = Math.min(Math.floor(raw), CARD_COUNT - 1);
    const fraction = raw - Math.floor(raw);
    const prev = rawIndexRef.current;

    if (candidate > prev && fraction > 0.15) {
      rawIndexRef.current = candidate;
      setActiveIndex(candidate);
    } else if (candidate < prev) {
      rawIndexRef.current = candidate;
      setActiveIndex(candidate);
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.055, smoothWheel: true, wheelMultiplier: 0.8 });
    lenis.on("scroll", onScroll);
    let raf: number;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [onScroll]);

  const accent = ACCENTS[activeIndex];

  const CARD_TITLE_KEYS = [
    "cards.0.title",
    "cards.1.title",
    "cards.2.title",
    "cards.3.title",
    "cards.4.title",
  ] as const;

  const BULLET_KEYS = [
    ["cards.0.bullets.0", "cards.0.bullets.1", "cards.0.bullets.2"],
    ["cards.1.bullets.0", "cards.1.bullets.1", "cards.1.bullets.2"],
    ["cards.2.bullets.0", "cards.2.bullets.1", "cards.2.bullets.2"],
    ["cards.3.bullets.0", "cards.3.bullets.1", "cards.3.bullets.2"],
    ["cards.4.bullets.0", "cards.4.bullets.1", "cards.4.bullets.2"],
  ] as const;

  const VISUALS = [
    <CompareCard key={0} active={isVisible && activeIndex >= 0} />,
    <IntegrationCard key={1} active={isVisible && activeIndex >= 1} />,
    <TrackingCard key={2} active={isVisible && activeIndex >= 2} />,
    <WalletCard key={3} active={isVisible && activeIndex >= 3} />,
    <FleetCard key={4} active={isVisible && activeIndex >= 4} />,
  ];

  const peekCount = Math.min(activeIndex, 3);

  return (
    // 500vh scroll travel — on mobile we skip the sticky effect and stack cards linearly
    <section
      id="platform-features"
      ref={sectionRef}
      className="relative"
      style={{ height: `${CARD_COUNT * 100}vh` }}
    >
      {/* ── Sticky viewport (desktop) / normal flow (mobile via @media override) ── */}
      <div className="sticky top-0 h-screen overflow-clip bg-background">
        {/* Ambient glow radials */}
        <div
          className="pointer-events-none absolute inset-0 transition-[background] duration-700"
          style={{
            background: [
              `radial-gradient(ellipse 80% 60% at 70% 40%, ${accent.a12}, transparent 65%)`,
              `radial-gradient(ellipse 55% 45% at 28% 72%, ${accent.a7}, transparent 60%)`,
              `radial-gradient(ellipse 100% 50% at 50% 100%, ${accent.a5}, transparent 55%)`,
            ].join(", "),
          }}
        />

        {/* Dot grid — light mode uses border colour, dark uses white */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-border) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <Section
          padding="none"
          className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8"
        >
          {/* ── Header ── */}
          <div className="mb-8 flex flex-col items-center text-center md:mb-10">
            <SectionBadge
              className="mb-4"
              style={
                {
                  borderColor: `${accent.glow}30`,
                  background: `${accent.glow}15`,
                  color: accent.glow,
                } as React.CSSProperties
              }
            >
              {t("kicker")}
            </SectionBadge>
            <SectionTitle className="mb-3 text-[clamp(22px,2.6vw,36px)]">
              {t("h2")}
            </SectionTitle>
            <SectionSubtitle className="mt-0">{t("sub")}</SectionSubtitle>
          </div>

          {/* ── Two-column body ── */}
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-20">
            {/* LEFT — text */}
            <div className="order-2 md:order-1">
              {/* Progress dots */}
              <div className="mb-6 flex items-center gap-2">
                {Array.from({ length: CARD_COUNT }, (_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-500"
                    style={{
                      width: i === activeIndex ? "28px" : "6px",
                      height: "6px",
                      background:
                        i === activeIndex ? accent.glow : "var(--color-border)",
                    }}
                  />
                ))}
              </div>

              {/* Card index badge */}
              <BadgePill
                className="mb-4 transition-all duration-500"
                style={
                  {
                    borderColor: `${accent.glow}30`,
                    background: `${accent.glow}12`,
                    color: accent.glow,
                  } as React.CSSProperties
                }
              >
                <CardIcon index={activeIndex} />
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(CARD_COUNT).padStart(2, "0")}
              </BadgePill>

              {/* Card text — all stacked, toggled by CSS */}
              <div className="relative" style={{ minHeight: "200px" }}>
                {CARD_TITLE_KEYS.map((titleKey, i) => (
                  <div
                    key={i}
                    className="transition-all duration-500"
                    style={{
                      position: i === activeIndex ? "relative" : "absolute",
                      inset: 0,
                      opacity: i === activeIndex ? 1 : 0,
                      transform:
                        i === activeIndex
                          ? "translateY(0)"
                          : i < activeIndex
                            ? "translateY(-12px)"
                            : "translateY(14px)",
                      pointerEvents: i === activeIndex ? "auto" : "none",
                    }}
                  >
                    <h3 className="mb-4 text-[clamp(20px,2.8vw,34px)] font-black leading-[1.12] tracking-[-0.02em] text-foreground">
                      {t(titleKey)}
                    </h3>
                    <ul className="flex flex-col gap-3" role="list">
                      {BULLET_KEYS[i].map((bk) => (
                        <li
                          key={bk}
                          className="flex items-start gap-3 text-[14px] leading-[1.6] text-muted-foreground"
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={accent.glow}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mt-0.5 shrink-0 transition-colors duration-500"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              strokeOpacity="0.25"
                            />
                            <path d="M8 12l3 3 5-5" />
                          </svg>
                          <span>{t(bk)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — stacking visual cards */}
            <div className="order-1 flex justify-center md:order-2">
              <div className="relative w-full max-w-sm">
                {/* Glow halo */}
                <div
                  className="pointer-events-none absolute -inset-8 rounded-3xl blur-3xl opacity-15 transition-all duration-700 dark:opacity-20"
                  style={{ background: accent.glow }}
                />

                {/* Stack */}
                <div
                  className="relative"
                  style={{
                    paddingTop: `${peekCount * 13}px`,
                    paddingBottom: `${peekCount * 4}px`,
                  }}
                >
                  {VISUALS.map((visual, i) => {
                    const isActive = i === activeIndex;
                    const isBehind = i < activeIndex;
                    const isAhead = i > activeIndex;
                    const depth = Math.max(0, activeIndex - i);
                    const translateY = isBehind
                      ? -(depth * 13)
                      : isAhead
                        ? 20
                        : 0;
                    const scale = isBehind
                      ? 1 - depth * 0.04
                      : isAhead
                        ? 0.96
                        : 1;
                    const opacity = isAhead
                      ? 0
                      : isBehind
                        ? Math.max(0.2, 1 - depth * 0.22)
                        : 1;
                    const zIndex = isAhead ? 0 : CARD_COUNT - depth;

                    return (
                      <div
                        key={i}
                        className="w-full transition-all duration-500"
                        style={{
                          position: isActive ? "relative" : "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          zIndex,
                          opacity,
                          transform: `translateY(${translateY}px) scale(${scale})`,
                          transitionTimingFunction:
                            "cubic-bezier(0.22,1,0.36,1)",
                        }}
                      >
                        {visual}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
}
