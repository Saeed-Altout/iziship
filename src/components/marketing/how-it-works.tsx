"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Lenis from "lenis";
import { toast } from "sonner";

// ─── Road path in a tall viewBox ─────────────────────────────────────────────
// ViewBox: 200 wide × 600 tall — keeps road narrow and centred
// S-curve: top-centre → bulge left → bulge right → bottom-centre
const VBW = 200;
const VBH = 600;
const ROAD_D = "M 100,0 C 100,70 30,100 30,210 C 30,320 170,350 170,460 C 170,540 100,570 100,600";
const ROAD_LEN = 681;

// t∈[0,1] where each milestone sits
const STEP_T = [0.2, 0.51, 0.82];

function cubicBezier(p0: number, p1: number, p2: number, p3: number, t: number) {
  const u = 1 - t;
  return u ** 3 * p0 + 3 * u ** 2 * t * p1 + 3 * u * t ** 2 * p2 + t ** 3 * p3;
}

// Three bezier segments
const SEGS = [
  { t0: 0,    t1: 0.42, px: [100, 100,  30,  30], py: [  0,  70, 100, 210] },
  { t0: 0.42, t1: 0.78, px: [ 30,  30, 170, 170], py: [210, 320, 350, 460] },
  { t0: 0.78, t1: 1,    px: [170, 170, 100, 100], py: [460, 540, 570, 600] },
];

function roadPoint(t: number) {
  const seg = SEGS.find((s) => t <= s.t1) ?? SEGS[SEGS.length - 1];
  const s = Math.min(1, Math.max(0, (t - seg.t0) / (seg.t1 - seg.t0)));
  return {
    x: cubicBezier(seg.px[0], seg.px[1], seg.px[2], seg.px[3], s),
    y: cubicBezier(seg.py[0], seg.py[1], seg.py[2], seg.py[3], s),
  };
}

const MILESTONES = STEP_T.map(roadPoint);

// Step 0 → bulges LEFT  → card on RIGHT side of screen
// Step 1 → bulges RIGHT → card on LEFT side of screen
// Step 2 → bulges LEFT  → card on RIGHT side of screen
const CARD_RIGHT = [true, false, true];

// ─── Icons ───────────────────────────────────────────────────────────────────
const ICONS = [
  <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/>
  </svg>,
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="12" r="2.5"/><circle cx="19" cy="6" r="2.5"/><circle cx="19" cy="18" r="2.5"/>
    <path d="M7.5 12h4M16.5 6l-5 4M16.5 18l-5-4"/>
  </svg>,
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="12" r="3"/><circle cx="18" cy="12" r="3"/>
    <path d="M9 12h6" strokeDasharray="2 2"/>
  </svg>,
];

// ─── Hex badge ───────────────────────────────────────────────────────────────
function Hex({ reached }: { reached: boolean }) {
  return (
    <div
      className="absolute z-10"
      style={{
        filter: reached
          ? "drop-shadow(0 0 14px oklch(0.541 0.233 258 / 70%))"
          : "drop-shadow(0 2px 6px oklch(0 0 0 / 20%))",
        transition: "filter 0.5s",
      }}
    >
      <svg width="42" height="42" viewBox="0 0 64 64">
        <polygon
          points="32,3 59,18 59,46 32,61 5,46 5,18"
          fill={reached ? "oklch(0.541 0.233 258)" : "white"}
          stroke={reached ? "oklch(0.541 0.233 258)" : "oklch(0.80 0.01 253)"}
          strokeWidth="2"
          style={{ transition: "fill 0.5s, stroke 0.5s" }}
        />
      </svg>
    </div>
  );
}

// ─── Step card ───────────────────────────────────────────────────────────────
function Card({
  idx, title, desc, reached, right,
}: {
  idx: number; title: string; desc: string; reached: boolean; right: boolean;
}) {
  return (
    <div
      className="w-56 rounded-2xl border bg-white/80 p-5 backdrop-blur-sm transition-all duration-600"
      style={{
        borderColor: reached ? "oklch(0.541 0.233 258 / 35%)" : "oklch(0.91 0.008 253)",
        boxShadow: reached
          ? "0 8px 32px oklch(0.541 0.233 258 / 15%), 0 2px 8px oklch(0 0 0 / 6%)"
          : "0 2px 12px oklch(0 0 0 / 6%)",
        opacity: reached ? 1 : 0.4,
        transform: reached
          ? "translateX(0) scale(1)"
          : `translateX(${right ? "12px" : "-12px"}) scale(0.97)`,
        textAlign: right ? "start" : "end",
      }}
    >
      <span
        className="mb-2 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
        style={{
          background: reached ? "oklch(0.541 0.233 258 / 12%)" : "oklch(0.93 0.005 253)",
          color: reached ? "oklch(0.541 0.233 258)" : "oklch(0.55 0.01 253)",
          transition: "background 0.5s, color 0.5s",
        }}
      >
        Step 0{idx + 1}
      </span>
      <h3 className="text-[15px] font-bold leading-snug text-foreground">{title}</h3>
      <p className="mt-1.5 text-[12.5px] leading-[1.6] text-muted-foreground">{desc}</p>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export function HowItWorksSection() {
  const t = useTranslations("howItWorks");
  const sectionRef = useRef<HTMLElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const toastFiredRef = useRef(false);

  const stepReached = STEP_T.map((st) => progress >= st - 0.06);
  const dashOffset = ROAD_LEN * (1 - progress);
  const dotPos = roadPoint(progress);

  const onScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = el.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    const p = Math.min(Math.max(0, -rect.top) / total, 1);
    setProgress(p);
    if (p >= 0.96 && !toastFiredRef.current) {
      toastFiredRef.current = true;
      toast.success(t("steps.2.title"), { description: t("steps.2.desc"), duration: 4500 });
    }
    if (p < 0.35) toastFiredRef.current = false;
  }, [t]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", onScroll);
    let raf: number;
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, [onScroll]);

  return (
    // 280vh gives comfortable scroll travel
    <section
      id="how"
      ref={sectionRef}
      className="relative bg-[oklch(0.967_0.003_253)]"
      style={{ height: "280vh" }}
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Subtle grid bg */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(oklch(0.4 0.01 253) 1px, transparent 1px), linear-gradient(90deg, oklch(0.4 0.01 253) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Header */}
        <div className="relative z-10 pt-12 text-center">
          <p className="mb-2 flex items-center justify-center gap-2.5 text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-primary">
            <span className="h-px w-6 bg-primary/60" />
            {t("kicker")}
            <span className="h-px w-6 bg-primary/60" />
          </p>
          <h2 className="text-[clamp(22px,2.6vw,36px)] font-extrabold leading-[1.1] tracking-tight text-foreground">
            {t("h2")}
          </h2>
        </div>

        {/* ── Desktop layout ── */}
        <div className="absolute inset-0 hidden pt-28 md:block" aria-label="How it works steps">

          {/*
            Three columns: LEFT cards | ROAD | RIGHT cards
            Road column is fixed at 160px wide, centred absolutely.
            Left/right columns fill the remaining space.
          */}
          <div className="relative mx-auto h-full max-w-5xl">

            {/* ROAD column — centred */}
            <div
              ref={roadRef}
              className="absolute inset-y-0 left-1/2 -translate-x-1/2"
              style={{ width: "160px" }}
            >
              <svg
                viewBox={`0 0 ${VBW} ${VBH}`}
                preserveAspectRatio="xMidYMid meet"
                className="h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <defs>
                  <filter id="hiw-glow" x="-200%" y="-200%" width="500%" height="500%">
                    <feGaussianBlur stdDeviation="8" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <linearGradient id="hiw-rg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.32 0.012 253)"/>
                    <stop offset="50%" stopColor="oklch(0.18 0.01 253)"/>
                    <stop offset="100%" stopColor="oklch(0.32 0.012 253)"/>
                  </linearGradient>
                </defs>

                {/* Outer shadow */}
                <path d={ROAD_D} fill="none" stroke="oklch(0.1 0.01 253 / 15%)" strokeWidth="54" strokeLinecap="round"/>
                {/* Dim undrawn base */}
                <path d={ROAD_D} fill="none" stroke="url(#hiw-rg)" strokeWidth="42" strokeLinecap="round" opacity="0.15"/>
                {/* Main road — animated */}
                <path d={ROAD_D} fill="none" stroke="url(#hiw-rg)" strokeWidth="42" strokeLinecap="round"
                  strokeDasharray={ROAD_LEN} strokeDashoffset={dashOffset}/>
                {/* Edge gloss */}
                <path d={ROAD_D} fill="none" stroke="oklch(0.65 0.008 253)" strokeWidth="42" strokeLinecap="round"
                  strokeDasharray={ROAD_LEN} strokeDashoffset={dashOffset} opacity="0.18"/>
                {/* White centre stripe */}
                <path d={ROAD_D} fill="none" stroke="white" strokeWidth="1.8" strokeDasharray="14 11" strokeLinecap="round"
                  opacity="0.35" style={{ clipPath: `inset(0 0 ${(1 - progress) * 100}% 0)` }}/>

                {/* Blue progress stripe */}
                <path d={ROAD_D} fill="none" stroke="oklch(0.541 0.233 258)" strokeWidth="5" strokeLinecap="round"
                  strokeDasharray={ROAD_LEN} strokeDashoffset={dashOffset} opacity="0.85"/>

                {/* Travelling dot — always visible, starts at top of road */}
                <>
                  <circle cx={dotPos.x} cy={dotPos.y} r="16" fill="oklch(0.541 0.233 258 / 20%)" filter="url(#hiw-glow)"/>
                  <circle cx={dotPos.x} cy={dotPos.y} r="8"  fill="oklch(0.541 0.233 258)" filter="url(#hiw-glow)"/>
                  <circle cx={dotPos.x} cy={dotPos.y} r="3.5" fill="white"/>
                </>

                {/* Milestone rings on road */}
                {MILESTONES.map((pos, i) => (
                  <g key={i}>
                    <circle cx={pos.x} cy={pos.y} r="10"
                      fill={stepReached[i] ? "oklch(0.541 0.233 258 / 20%)" : "transparent"}
                      style={{ transition: "fill 0.4s" }}/>
                    <circle cx={pos.x} cy={pos.y} r="6"
                      fill={stepReached[i] ? "oklch(0.541 0.233 258)" : "oklch(0.85 0.008 253)"}
                      stroke="white" strokeWidth="2"
                      style={{ transition: "fill 0.4s" }}/>
                  </g>
                ))}
              </svg>
            </div>

            {/* STEP ROWS — one per milestone, vertically placed to match road */}
            {[0, 1, 2].map((idx) => {
              const ms = MILESTONES[idx];
              // y in viewBox (0–600) → % of the road container height
              // Road container goes from pt-28 (112px) to bottom. Approximate full height usage.
              const topPct = (ms.y / VBH) * 100;
              const cardRight = CARD_RIGHT[idx];

              return (
                <div
                  key={idx}
                  className="absolute inset-x-0 flex items-center"
                  style={{ top: `${topPct}%`, transform: "translateY(-50%)" }}
                >
                  {/* LEFT half */}
                  <div className="flex flex-1 items-center justify-end" style={{ paddingRight: "88px" }}>
                    {!cardRight ? (
                      <div className="flex items-center gap-3">
                        <Card idx={idx} title={t(`steps.${idx}.title`)} desc={t(`steps.${idx}.desc`)} reached={stepReached[idx]} right={false}/>
                        {/* Dashed connector */}
                        <svg width="48" height="2" className="shrink-0">
                          <line x1="0" y1="1" x2="48" y2="1"
                            stroke={stepReached[idx] ? "oklch(0.541 0.233 258)" : "oklch(0.80 0.01 253)"}
                            strokeWidth="1.5" strokeDasharray="4 3"
                            style={{ transition: "stroke 0.5s" }}/>
                        </svg>
                        {/* Hex icon beside road */}
                        <div className="relative flex size-11 items-center justify-center" style={{
                          filter: stepReached[idx] ? "drop-shadow(0 0 12px oklch(0.541 0.233 258 / 65%))" : "drop-shadow(0 2px 5px oklch(0 0 0 / 18%))",
                          transition: "filter 0.5s",
                        }}>
                          <svg viewBox="0 0 64 64" className="absolute inset-0 size-full">
                            <polygon points="32,3 59,18 59,46 32,61 5,46 5,18"
                              fill={stepReached[idx] ? "oklch(0.541 0.233 258)" : "white"}
                              stroke={stepReached[idx] ? "oklch(0.541 0.233 258)" : "oklch(0.80 0.01 253)"}
                              strokeWidth="2" style={{ transition: "fill 0.5s, stroke 0.5s" }}/>
                          </svg>
                          <span className={`relative z-10 ${stepReached[idx] ? "text-white" : "text-primary"}`}>{ICONS[idx]}</span>
                        </div>
                      </div>
                    ) : (
                      // empty spacer keeps road centred
                      <div />
                    )}
                  </div>

                  {/* Road spacer */}
                  <div className="shrink-0" style={{ width: "160px" }} />

                  {/* RIGHT half */}
                  <div className="flex flex-1 items-center justify-start" style={{ paddingLeft: "88px" }}>
                    {cardRight ? (
                      <div className="flex items-center gap-3">
                        {/* Hex */}
                        <div className="relative flex size-11 items-center justify-center" style={{
                          filter: stepReached[idx] ? "drop-shadow(0 0 12px oklch(0.541 0.233 258 / 65%))" : "drop-shadow(0 2px 5px oklch(0 0 0 / 18%))",
                          transition: "filter 0.5s",
                        }}>
                          <svg viewBox="0 0 64 64" className="absolute inset-0 size-full">
                            <polygon points="32,3 59,18 59,46 32,61 5,46 5,18"
                              fill={stepReached[idx] ? "oklch(0.541 0.233 258)" : "white"}
                              stroke={stepReached[idx] ? "oklch(0.541 0.233 258)" : "oklch(0.80 0.01 253)"}
                              strokeWidth="2" style={{ transition: "fill 0.5s, stroke 0.5s" }}/>
                          </svg>
                          <span className={`relative z-10 ${stepReached[idx] ? "text-white" : "text-primary"}`}>{ICONS[idx]}</span>
                        </div>
                        {/* Dashed connector */}
                        <svg width="48" height="2" className="shrink-0">
                          <line x1="0" y1="1" x2="48" y2="1"
                            stroke={stepReached[idx] ? "oklch(0.541 0.233 258)" : "oklch(0.80 0.01 253)"}
                            strokeWidth="1.5" strokeDasharray="4 3"
                            style={{ transition: "stroke 0.5s" }}/>
                        </svg>
                        <Card idx={idx} title={t(`steps.${idx}.title`)} desc={t(`steps.${idx}.desc`)} reached={stepReached[idx]} right/>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile ── */}
        <div className="flex h-full flex-col justify-center gap-8 px-6 pt-24 md:hidden">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 transition-all duration-500"
              style={{
                opacity: stepReached[idx] ? 1 : 0.35,
                transform: stepReached[idx] ? "translateX(0)" : "translateX(-8px)",
              }}
            >
              <div className="relative flex size-11 shrink-0 items-center justify-center" style={{
                filter: stepReached[idx] ? "drop-shadow(0 0 10px oklch(0.541 0.233 258 / 60%))" : "none",
                transition: "filter 0.5s",
              }}>
                <svg viewBox="0 0 64 64" className="absolute inset-0 size-full">
                  <polygon points="32,3 59,18 59,46 32,61 5,46 5,18"
                    fill={stepReached[idx] ? "oklch(0.541 0.233 258)" : "white"}
                    stroke={stepReached[idx] ? "oklch(0.541 0.233 258)" : "oklch(0.80 0.01 253)"}
                    strokeWidth="2" style={{ transition: "fill 0.5s" }}/>
                </svg>
                <span className={`relative z-10 ${stepReached[idx] ? "text-white" : "text-primary"}`}>{ICONS[idx]}</span>
              </div>
              <div>
                <span className="mb-1 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
                  style={{ background: "oklch(0.541 0.233 258 / 10%)", color: "oklch(0.541 0.233 258)" }}>
                  0{idx + 1}
                </span>
                <h3 className="text-[16px] font-bold leading-snug text-foreground">{t(`steps.${idx}.title`)}</h3>
                <p className="mt-1 text-[13px] leading-[1.55] text-muted-foreground">{t(`steps.${idx}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
