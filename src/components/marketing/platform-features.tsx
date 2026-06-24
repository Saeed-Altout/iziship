"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Lenis from "lenis";
import { Section } from "@/components/ui/section";
import { BadgePill } from "@/components/ui/badge-pill";
import { Animate } from "@/components/ui/animate";

// ─── Per-card accent colours ──────────────────────────────────────────────────
const ACCENTS = [
  { glow: "oklch(0.541 0.233 258)", a12: "oklch(0.541 0.233 258 / 12%)", a7: "oklch(0.541 0.233 258 / 7%)", a5: "oklch(0.541 0.233 258 / 5%)" },
  { glow: "oklch(0.72 0.18 142)",   a12: "oklch(0.72 0.18 142 / 12%)",   a7: "oklch(0.72 0.18 142 / 7%)",   a5: "oklch(0.72 0.18 142 / 5%)"   },
  { glow: "oklch(0.70 0.18 30)",    a12: "oklch(0.70 0.18 30 / 12%)",    a7: "oklch(0.70 0.18 30 / 7%)",    a5: "oklch(0.70 0.18 30 / 5%)"    },
  { glow: "oklch(0.65 0.22 310)",   a12: "oklch(0.65 0.22 310 / 12%)",   a7: "oklch(0.65 0.22 310 / 7%)",   a5: "oklch(0.65 0.22 310 / 5%)"   },
  { glow: "oklch(0.62 0.22 195)",   a12: "oklch(0.62 0.22 195 / 12%)",   a7: "oklch(0.62 0.22 195 / 7%)",   a5: "oklch(0.62 0.22 195 / 5%)"   },
] as const;

const CARD_COUNT = 5;

// ─── Shared card shell — light/dark aware ─────────────────────────────────────
// Light: white card with border. Dark: deep navy card.
const CARD_CLS =
  "h-70 w-full overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-lg dark:border-white/10 dark:bg-[#0D1B2E] dark:shadow-2xl";

// ─── Shared label colour — muted in both modes ────────────────────────────────
const LABEL_CLS = "text-[10px] font-bold uppercase tracking-widest text-muted-foreground";

// ─── Visual mockups ───────────────────────────────────────────────────────────

function CompareVisual({ active }: { active: boolean }) {
  const rows = [
    { name: "Aramex", price: "SYP 2,400", eta: "1–2 days", best: true  },
    { name: "Bosta",  price: "SYP 2,800", eta: "1–3 days", best: false },
    { name: "SMSA",   price: "SYP 3,100", eta: "2–3 days", best: false },
  ];
  return (
    <div className={CARD_CLS}>
      <p className={`mb-3 ${LABEL_CLS}`}>Damascus → Aleppo</p>
      <div className="flex flex-col gap-2">
        {rows.map((r, i) => (
          <div
            key={r.name}
            className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-500"
            style={{
              background: r.best && active
                ? "oklch(0.541 0.233 258 / 12%)"
                : "oklch(0.5 0 0 / 4%)",
              border: `1px solid ${r.best && active ? "oklch(0.541 0.233 258 / 30%)" : "oklch(0.5 0 0 / 8%)"}`,
              transitionDelay: `${i * 60}ms`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex size-7 items-center justify-center rounded-full text-[9px] font-black text-white transition-colors duration-500"
                style={{ background: r.best && active ? "oklch(0.541 0.233 258)" : "oklch(0.5 0 0 / 12%)" }}
              >
                {r.name[0]}
              </div>
              <div>
                <p className="text-[12px] font-bold text-foreground">{r.name}</p>
                <p className="text-[10px] text-muted-foreground">{r.eta}</p>
              </div>
            </div>
            <div className="text-end">
              <p
                className="text-[13px] font-black transition-colors duration-500"
                style={{ color: r.best && active ? "oklch(0.541 0.233 258)" : "var(--color-foreground)" }}
              >
                {r.price}
              </p>
              {r.best && (
                <p
                  className="text-[9px] font-bold uppercase tracking-wider transition-colors duration-500"
                  style={{ color: active ? "oklch(0.72 0.18 142)" : "var(--color-muted-foreground)" }}
                >
                  {active ? "Best" : "—"}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntegrationVisual({ active }: { active: boolean }) {
  const stores = ["Salla", "Zid", "WooCommerce", "Shopify"];
  return (
    <div className={`${CARD_CLS} p-5`}>
      <p className={`mb-3 ${LABEL_CLS}`}>Connected stores</p>
      <div className="grid grid-cols-2 gap-2.5">
        {stores.map((s, i) => (
          <div
            key={s}
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 transition-all duration-500"
            style={{
              background: active ? "oklch(0.72 0.18 142 / 10%)" : "oklch(0.5 0 0 / 4%)",
              border: `1px solid ${active ? "oklch(0.72 0.18 142 / 25%)" : "oklch(0.5 0 0 / 8%)"}`,
              transitionDelay: `${i * 80}ms`,
            }}
          >
            <div
              className="flex size-6 items-center justify-center rounded-lg text-[8px] font-black text-white transition-colors duration-500"
              style={{ background: active ? "oklch(0.72 0.18 142 / 40%)" : "oklch(0.5 0 0 / 12%)" }}
            >
              {s[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-bold text-foreground">{s}</p>
              <div
                className="mt-0.5 h-1 rounded-full transition-all duration-700"
                style={{
                  width: active ? "100%" : "40%",
                  background: active ? "oklch(0.72 0.18 142)" : "oklch(0.5 0 0 / 12%)",
                  transitionDelay: `${i * 100 + 200}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrackingVisual({ active }: { active: boolean }) {
  const stages = ["Created", "Picked up", "In transit", "Out for delivery", "Delivered"];
  const activeStage = active ? 3 : 1;
  return (
    <div className={`${CARD_CLS} p-5`}>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[11px] font-bold text-foreground">Order #OID-3443-111</p>
        <span
          className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-colors duration-500"
          style={{
            background: active ? "oklch(0.70 0.18 30 / 15%)" : "oklch(0.5 0 0 / 6%)",
            color: active ? "oklch(0.70 0.18 30)" : "var(--color-muted-foreground)",
          }}
        >
          {active ? "Out for delivery" : "In transit"}
        </span>
      </div>
      <div className="relative flex flex-col gap-2.5">
        <div
          className="absolute left-2.25 top-2 w-0.5 rounded-full transition-all duration-700"
          style={{
            height: `${(activeStage / (stages.length - 1)) * 90}%`,
            background: "oklch(0.70 0.18 30)",
          }}
        />
        {stages.map((s, i) => (
          <div
            key={s}
            className="flex items-center gap-3 transition-opacity duration-500"
            style={{ opacity: i <= activeStage ? 1 : 0.3 }}
          >
            <div
              className="relative z-10 size-4.5 shrink-0 rounded-full border-2 transition-all duration-500"
              style={{
                background: i <= activeStage ? "oklch(0.70 0.18 30)" : "var(--color-card)",
                borderColor: i <= activeStage ? "oklch(0.70 0.18 30)" : "var(--color-border)",
                boxShadow: i === activeStage && active ? "0 0 10px oklch(0.70 0.18 30 / 50%)" : "none",
              }}
            />
            <p
              className="text-[11px] font-semibold transition-colors duration-500"
              style={{ color: i <= activeStage ? "var(--color-foreground)" : "var(--color-muted-foreground)" }}
            >
              {s}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WalletVisual({ active }: { active: boolean }) {
  return (
    <div className={`${CARD_CLS} p-5`}>
      <div className="mb-4 flex items-center justify-between">
        <p className={LABEL_CLS}>Wallet balance</p>
        <span className="text-[9px] text-muted-foreground">Last COD: Today</span>
      </div>
      <p
        className="mb-4 text-[32px] font-black tracking-tight transition-all duration-700"
        style={{ color: active ? "oklch(0.65 0.22 310)" : "var(--color-muted-foreground)" }}
      >
        {active ? "SYP 248,500" : "SYP 0"}
      </p>
      <div className="flex flex-col gap-2">
        {[
          { label: "COD settled",    val: active ? "+ SYP 85,000" : "—", pos: true  },
          { label: "Processing fee", val: active ? "- SYP 1,200"  : "—", pos: false },
          { label: "Net transfer",   val: active ? "+ SYP 83,800" : "—", pos: true  },
        ].map((r, i) => (
          <div
            key={r.label}
            className="flex justify-between rounded-lg px-3 py-2 text-[11px] transition-all duration-500"
            style={{
              background: "oklch(0.5 0 0 / 4%)",
              opacity: active ? 1 : 0.5,
              transitionDelay: `${i * 80}ms`,
            }}
          >
            <span className="text-muted-foreground">{r.label}</span>
            <span style={{ color: r.pos ? "oklch(0.72 0.18 142)" : "oklch(0.601 0.228 26)" }}>{r.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FleetVisual({ active }: { active: boolean }) {
  const branches = [
    { name: "Damascus HQ", pct: 92 },
    { name: "Aleppo",      pct: 78 },
    { name: "Homs",        pct: 65 },
    { name: "Latakia",     pct: 88 },
  ];
  return (
    <div className={`${CARD_CLS} p-5`}>
      <p className={`mb-3 ${LABEL_CLS}`}>Branch capacity</p>
      <div className="flex flex-col gap-3">
        {branches.map((b, i) => (
          <div key={b.name} className="flex items-center gap-3">
            <p className="w-22.5 shrink-0 text-[11px] font-semibold text-foreground">{b.name}</p>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: active ? `${b.pct}%` : "10%",
                  background: "oklch(0.62 0.22 195)",
                  transitionDelay: `${i * 120}ms`,
                }}
              />
            </div>
            <p
              className="w-8 shrink-0 text-end text-[10px] font-bold transition-colors duration-500"
              style={{ color: active ? "oklch(0.62 0.22 195)" : "var(--color-muted-foreground)" }}
            >
              {active ? `${b.pct}%` : "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Card index icons ─────────────────────────────────────────────────────────
function CardIcon({ index }: { index: number }) {
  const icons = [
    <svg key={0} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M3 6h18M3 12h12M3 18h6" />
    </svg>,
    <svg key={1} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>,
    <svg key={2} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="10" r="3" /><path d="M12 2a8 8 0 00-8 8c0 5 8 13 8 13s8-8 8-13a8 8 0 00-8-8z" />
    </svg>,
    <svg key={3} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M16 12h2" />
    </svg>,
    <svg key={4} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1" /><path d="M9 7h6M9 12h6M9 17h6" />
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

    if (candidate > prev && fraction > 0.02) {
      rawIndexRef.current = candidate;
      setActiveIndex(candidate);
    } else if (candidate < prev) {
      rawIndexRef.current = candidate;
      setActiveIndex(candidate);
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", onScroll);
    let raf: number;
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, [onScroll]);

  const accent = ACCENTS[activeIndex];

  const CARD_TITLE_KEYS = [
    "cards.0.title", "cards.1.title", "cards.2.title", "cards.3.title", "cards.4.title",
  ] as const;

  const BULLET_KEYS = [
    ["cards.0.bullets.0", "cards.0.bullets.1", "cards.0.bullets.2"],
    ["cards.1.bullets.0", "cards.1.bullets.1", "cards.1.bullets.2"],
    ["cards.2.bullets.0", "cards.2.bullets.1", "cards.2.bullets.2"],
    ["cards.3.bullets.0", "cards.3.bullets.1", "cards.3.bullets.2"],
    ["cards.4.bullets.0", "cards.4.bullets.1", "cards.4.bullets.2"],
  ] as const;

  const VISUALS = [
    <CompareVisual     key={0} active={isVisible && activeIndex >= 0} />,
    <IntegrationVisual key={1} active={isVisible && activeIndex >= 1} />,
    <TrackingVisual    key={2} active={isVisible && activeIndex >= 2} />,
    <WalletVisual      key={3} active={isVisible && activeIndex >= 3} />,
    <FleetVisual       key={4} active={isVisible && activeIndex >= 4} />,
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
            backgroundImage: "radial-gradient(var(--color-border) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <Section
          padding="none"
          className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8"
        >
          {/* ── Header ── */}
          <div className="mb-8 text-center md:mb-10">
            <Animate variant="blurUp" delay={0} className="mb-4 flex justify-center">
              <BadgePill
                intent="primary"
                dot
                style={{ borderColor: `${accent.glow}30`, background: `${accent.glow}15`, color: accent.glow } as React.CSSProperties}
              >
                {t("kicker")}
              </BadgePill>
            </Animate>
            <Animate variant="blurUp" delay={0.08}>
              <h2 className="text-[clamp(22px,2.6vw,36px)] font-extrabold leading-[1.1] tracking-tight text-foreground">
                {t("h2")}
              </h2>
            </Animate>
            <Animate variant="blurUp" delay={0.16}>
              <p className="mx-auto mt-3 max-w-xl text-[15px] leading-[1.65] text-muted-foreground">
                {t("sub")}
              </p>
            </Animate>
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
                      background: i === activeIndex ? accent.glow : "var(--color-border)",
                    }}
                  />
                ))}
              </div>

              {/* Card index badge */}
              <BadgePill
                className="mb-4 transition-all duration-500"
                style={{ borderColor: `${accent.glow}30`, background: `${accent.glow}12`, color: accent.glow } as React.CSSProperties}
              >
                <CardIcon index={activeIndex} />
                {String(activeIndex + 1).padStart(2, "0")} / {String(CARD_COUNT).padStart(2, "0")}
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
                      transform: i === activeIndex
                        ? "translateY(0)"
                        : i < activeIndex ? "translateY(-12px)" : "translateY(14px)",
                      pointerEvents: i === activeIndex ? "auto" : "none",
                    }}
                  >
                    <h3 className="mb-4 text-[clamp(20px,2.8vw,34px)] font-black leading-[1.12] tracking-[-0.02em] text-foreground">
                      {t(titleKey)}
                    </h3>
                    <ul className="flex flex-col gap-3" role="list">
                      {BULLET_KEYS[i].map((bk) => (
                        <li key={bk} className="flex items-start gap-3 text-[14px] leading-[1.6] text-muted-foreground">
                          <svg
                            width="15" height="15" viewBox="0 0 24 24" fill="none"
                            stroke={accent.glow} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                            className="mt-0.5 shrink-0 transition-colors duration-500"
                          >
                            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
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
                    const isAhead  = i > activeIndex;
                    const depth    = Math.max(0, activeIndex - i);
                    const translateY = isBehind ? -(depth * 13) : isAhead ? 20 : 0;
                    const scale      = isBehind ? 1 - depth * 0.04 : isAhead ? 0.96 : 1;
                    const opacity    = isAhead ? 0 : isBehind ? Math.max(0.2, 1 - depth * 0.22) : 1;
                    const zIndex     = isAhead ? 0 : CARD_COUNT - depth;

                    return (
                      <div
                        key={i}
                        className="w-full transition-all duration-500"
                        style={{
                          position: isActive ? "relative" : "absolute",
                          top: 0, left: 0, right: 0,
                          zIndex,
                          opacity,
                          transform: `translateY(${translateY}px) scale(${scale})`,
                          transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
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
