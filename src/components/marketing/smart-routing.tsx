"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

import {
  SMART_ROUTING_INPUTS,
  SMART_ROUTING_OUTPUTS,
  SMART_ROUTING_ROTATES,
} from "@/constants";
import { bezierPath, cardCenterY } from "@/lib/utils/smart-routing";

import {
  Section,
  SectionBadge,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";

const COOKIE_VW = 960;
const COOKIE_VH = 500;
const COOKIE_CX = COOKIE_VW / 2; // 480
const COOKIE_CY = COOKIE_VH / 2; // 250
const COOKIE_CARD_H = 72; // h-18 = 72px
const COOKIE_CARD_GAP_LEFT = 16; // gap-4
const COOKIE_CARD_GAP_RIGHT = 12; // gap-3
const COOKIE_LEFT_EDGE = 112; // column container width = w-28 = 112px
const COOKIE_RIGHT_EDGE = COOKIE_VW - 112;
const COOKIE_GLOBE_R = 96; // half of size-48 (192px / 2)

function AnimatedPath({
  d,
  active,
  gradient,
  delay,
}: {
  d: string;
  active: boolean;
  gradient: string;
  delay: number;
}) {
  return (
    <AnimatePresence>
      {active && (
        <motion.path
          key="p"
          d={d}
          stroke={`url(#${gradient})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="5 16"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, strokeDashoffset: [-0, -42] }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.2, delay },
            strokeDashoffset: {
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
              delay,
            },
          }}
        />
      )}
    </AnimatePresence>
  );
}

function NodeCard({
  label,
  logo,
  highlighted,
  rotateClass,
}: {
  label: string;
  logo: string;
  highlighted: boolean;
  rotateClass: string;
}) {
  return (
    <motion.div
      animate={
        highlighted
          ? {
              scale: 1.07,
              borderColor: "#10b981",
              backgroundColor: "#ecfdf5",
              boxShadow: "0 6px 20px rgba(16,185,129,0.22)",
            }
          : {
              scale: 1,
              borderColor: "rgba(226,232,240,0.9)",
              backgroundColor: "rgba(255,255,255,0.9)",
              boxShadow: "0 2px 6px rgba(15,23,42,0.04)",
            }
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex h-18 w-22 items-center justify-center rounded-2xl border p-3 backdrop-blur-sm ${rotateClass}`}
    >
      <div className="relative h-10 w-full">
        <Image src={logo} alt={label} fill className="object-contain" />
      </div>
    </motion.div>
  );
}

export function SmartRoutingSection() {
  const t = useTranslations("smartRouting");

  const [phase, setPhase] = useState<
    "idle" | "input" | "processing" | "output"
  >("idle");
  const [bestChoice, setBestChoice] = useState(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  const [diagramScale, setDiagramScale] = useState(1);
  const updateScale = useCallback(() => {
    setDiagramScale(Math.min(1, window.innerWidth / COOKIE_VW));
  }, []);
  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  useEffect(() => {
    function runCycle() {
      cleanupRef.current?.();

      const choice = Math.floor(Math.random() * SMART_ROUTING_OUTPUTS.length);
      setBestChoice(choice);
      setPhase("input");

      const t1 = setTimeout(() => setPhase("processing"), 900);
      const t2 = setTimeout(() => setPhase("output"), 1500);
      const t3 = setTimeout(() => setPhase("idle"), 3200);

      cleanupRef.current = () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }

    runCycle();
    const interval = setInterval(runCycle, 4800);
    return () => {
      cleanupRef.current?.();
      clearInterval(interval);
    };
  }, []);

  const showLeft = phase === "input" || phase === "processing";
  const showRight = phase === "output";
  const processing = phase === "processing" || phase === "output";

  return (
    <section className="relative overflow-hidden py-20">
      <div className="relative z-10">
        <Section width="container" padding="none">
          {/* heading */}
          <div className="mb-12 flex flex-col items-center px-4 text-center">
            <SectionBadge className="mb-4">{t("badge")}</SectionBadge>
            <SectionTitle className="mb-3">{t("h2")}</SectionTitle>
            <SectionSubtitle>{t("sub")}</SectionSubtitle>
          </div>

          {/* diagram — scales down on mobile, full size on md+ */}
          <div
            className="flex justify-center overflow-hidden"
            style={{ height: COOKIE_VH * diagramScale }}
          >
            <div
              style={{
                width: COOKIE_VW,
                transformOrigin: "top center",
                transform: `scale(${diagramScale})`,
              }}
            >
            <div
              className="relative"
              style={{
                width: COOKIE_VW,
                height: COOKIE_VH,
              }}
            >
              {/* ── SVG lines ───────────────────────────────────────────── */}
              <svg
                viewBox={`0 0 ${COOKIE_VW} ${COOKIE_VH}`}
                width={COOKIE_VW}
                height={COOKIE_VH}
                className="pointer-events-none absolute inset-0"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="sr-grad-in"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <linearGradient
                    id="sr-grad-out"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>
                </defs>

                {/* ghost lines — inputs */}
                <g opacity="0.55" stroke="#94a3b8" strokeWidth="1.5">
                  {SMART_ROUTING_INPUTS.map((_, i) => (
                    <path
                      key={i}
                      d={bezierPath(
                        COOKIE_LEFT_EDGE,
                        cardCenterY(
                          SMART_ROUTING_INPUTS.length,
                          i,
                          COOKIE_CARD_GAP_LEFT,
                          COOKIE_CARD_H,
                          COOKIE_CY,
                        ),
                        COOKIE_CX - COOKIE_GLOBE_R,
                        COOKIE_CY,
                      )}
                    />
                  ))}
                </g>

                {/* ghost lines — outputs */}
                <g opacity="0.55" stroke="#94a3b8" strokeWidth="1.5">
                  {SMART_ROUTING_OUTPUTS.map((_, i) => (
                    <path
                      key={i}
                      d={bezierPath(
                        COOKIE_CX + COOKIE_GLOBE_R,
                        COOKIE_CY,
                        COOKIE_RIGHT_EDGE,
                        cardCenterY(
                          SMART_ROUTING_OUTPUTS.length,
                          i,
                          COOKIE_CARD_GAP_RIGHT,
                          COOKIE_CARD_H,
                          COOKIE_CY,
                        ),
                      )}
                    />
                  ))}
                </g>

                {/* animated input streams */}
                {SMART_ROUTING_INPUTS.map((_, i) => (
                  <AnimatedPath
                    key={`in-${i}`}
                    d={bezierPath(
                      COOKIE_LEFT_EDGE,
                      cardCenterY(
                        SMART_ROUTING_INPUTS.length,
                        i,
                        COOKIE_CARD_GAP_LEFT,
                        COOKIE_CARD_H,
                        COOKIE_CY,
                      ),
                      COOKIE_CX - COOKIE_GLOBE_R,
                      COOKIE_CY,
                    )}
                    active={showLeft}
                    gradient="sr-grad-in"
                    delay={i * 0.05}
                  />
                ))}

                {/* animated output stream — chosen carrier only */}
                <AnimatedPath
                  key={`out-${bestChoice}`}
                  d={bezierPath(
                    COOKIE_CX + COOKIE_GLOBE_R,
                    COOKIE_CY,
                    COOKIE_RIGHT_EDGE,
                    cardCenterY(
                      SMART_ROUTING_OUTPUTS.length,
                      bestChoice,
                      COOKIE_CARD_GAP_RIGHT,
                      COOKIE_CARD_H,
                      COOKIE_CY,
                    ),
                  )}
                  active={showRight}
                  gradient="sr-grad-out"
                  delay={0}
                />
              </svg>

              {/* ── Left column ─────────────────────────────────────────── */}
              <div className="absolute left-0 top-0 flex h-full w-28 flex-col items-center justify-center gap-4">
                {SMART_ROUTING_INPUTS.map((node, i) => (
                  <NodeCard
                    key={node.key}
                    label={node.label}
                    logo={node.logo}
                    highlighted={false}
                    rotateClass={
                      SMART_ROUTING_ROTATES[i % SMART_ROUTING_ROTATES.length]
                    }
                  />
                ))}
              </div>

              {/* ── Center globe ────────────────────────────────────────── */}
              <div
                className="absolute flex items-center justify-center"
                style={{
                  left: COOKIE_CX - 96,
                  top: COOKIE_CY - 96,
                  width: 192,
                  height: 192,
                }}
              >
                {/* ping ring */}
                <div
                  className="pointer-events-none absolute size-60 animate-ping rounded-full border border-blue-200/30"
                  style={{ animationDuration: "4s" }}
                />

                <motion.svg
                  viewBox="0 0 100 100"
                  width="160"
                  height="160"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="iziship"
                  animate={
                    processing
                      ? { filter: "drop-shadow(0 0 12px rgba(59,130,246,0.4))" }
                      : { filter: "drop-shadow(0 4px 12px rgba(59,130,246,0.15))" }
                  }
                  transition={{ duration: 0.4 }}
                >
                  <rect width="100" height="100" rx="50" fill="#1B6EF3" />
                  <g
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M28 72 L56 44" />
                    <path d="M42.5 44 H56 V57.5" />
                  </g>
                  <circle cx="70" cy="30" r="8.5" fill="#FF6B2C" />
                </motion.svg>

                {/* "Selecting Best Route" badge */}
                <motion.div
                  animate={
                    processing
                      ? { opacity: 1, x: 0, borderColor: "#10b981" }
                      : { opacity: 0, x: -8, borderColor: "#e2e8f0" }
                  }
                  transition={{ duration: 0.3 }}
                  className="absolute -right-9 top-1/2 -translate-y-1/2 rotate-2 rounded-xl border bg-white px-3 py-1.5 text-center shadow-md"
                >
                  <p className="font-mono text-[7px] font-black tracking-widest text-emerald-600 uppercase">
                    {t("selecting")}
                  </p>
                  <p className="text-[8px] font-bold tracking-wide text-slate-800 uppercase">
                    {t("bestRoute")}
                  </p>
                </motion.div>
              </div>

              {/* ── Right column ────────────────────────────────────────── */}
              <div className="absolute right-0 top-0 flex h-full w-28 flex-col items-center justify-center gap-3">
                {SMART_ROUTING_OUTPUTS.map((node, i) => (
                  <NodeCard
                    key={node.key}
                    label={node.label}
                    logo={node.logo}
                    highlighted={showRight && i === bestChoice}
                    rotateClass={
                      SMART_ROUTING_ROTATES[
                        (i + 2) % SMART_ROUTING_ROTATES.length
                      ]
                    }
                  />
                ))}
              </div>
            </div>
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
}
