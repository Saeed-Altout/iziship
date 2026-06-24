"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { BadgePill } from "@/components/ui/badge-pill";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const INPUTS = [
  { key: "woo",     label: "WooCommerce", logo: "/logos/marketplace/woocommerce-logo.svg" },
  { key: "shopify", label: "Shopify",     logo: "/logos/marketplace/shopify-logo.svg" },
  { key: "shopee",  label: "Shopee",      logo: "/logos/marketplace/shopee-logo.svg" },
  { key: "lazada",  label: "Lazada",      logo: "/logos/marketplace/lazada-logo.svg" },
  { key: "ebay",    label: "eBay",        logo: "/logos/marketplace/ebay-logo.svg" },
];

const OUTPUTS = [
  { key: "fedex",  label: "FedEx",        logo: "/logos/logistics-delivery/fedex-logo.svg" },
  { key: "jnt",    label: "J&T Express",  logo: "/logos/logistics-delivery/j_t-express-logo.svg" },
  { key: "jne",    label: "JNE Express",  logo: "/logos/logistics-delivery/jne-express-logo.svg" },
  { key: "gosend", label: "GoSend",       logo: "/logos/logistics-delivery/gosend-logo.svg" },
  { key: "paxel",  label: "Paxel",        logo: "/logos/logistics-delivery/paxel-logo.svg" },
  { key: "pos",    label: "Pos Indonesia", logo: "/logos/logistics-delivery/pos-indonesia-logo.svg" },
];

/* ─── SVG layout constants ───────────────────────────────────────────────── */

const VW = 960;
const VH = 500;
const CX = VW / 2;   // 480
const CY = VH / 2;   // 250

// Card dimensions — must match NodeCard styles exactly
const CARD_H        = 72;  // h-18 = 72px
const CARD_GAP_LEFT = 16;  // gap-4
const CARD_GAP_RIGHT= 12;  // gap-3

// Column container width = w-28 = 112px; card width = w-22 = 88px centered inside
const LEFT_EDGE  = 112;
const RIGHT_EDGE = VW - 112;

// Globe radius used for line endpoint offset
const GLOBE_R = 96; // half of size-48 (192px / 2)

// Compute card center Y for each column so lines land exactly in the middle
function cardCenterY(count: number, index: number, gap: number): number {
  const totalHeight = count * CARD_H + (count - 1) * gap;
  const startY = CY - totalHeight / 2;
  return startY + index * (CARD_H + gap) + CARD_H / 2;
}

function bezierPath(fromX: number, fromY: number, toX: number, toY: number) {
  const mx = (fromX + toX) / 2;
  return `M ${fromX} ${fromY} C ${mx} ${fromY}, ${mx} ${toY}, ${toX} ${toY}`;
}

/* ─── AnimatedPath ───────────────────────────────────────────────────────── */

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

/* ─── NodeCard ───────────────────────────────────────────────────────────── */

const ROTATES = ["rotate-2", "-rotate-2", "rotate-1", "-rotate-3", "rotate-3"];

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
      // h-[72px] w-[88px] — keep in sync with CARD_H / column width constants
      className={`flex h-18 w-22 items-center justify-center rounded-2xl border p-3 backdrop-blur-sm ${rotateClass}`}
    >
      <div className="relative h-10 w-full">
        <Image src={logo} alt={label} fill className="object-contain" />
      </div>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export function SmartRoutingSection() {
  const t = useTranslations("smartRouting");

  const [phase, setPhase] = useState<"idle" | "input" | "processing" | "output">("idle");
  const [bestChoice, setBestChoice] = useState(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    function runCycle() {
      // clear any lingering timeouts from a previous cycle
      cleanupRef.current?.();

      const choice = Math.floor(Math.random() * OUTPUTS.length);
      setBestChoice(choice);
      setPhase("input");

      const t1 = setTimeout(() => setPhase("processing"), 900);
      const t2 = setTimeout(() => setPhase("output"),     1500);
      const t3 = setTimeout(() => setPhase("idle"),       3200);

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

  const showLeft   = phase === "input" || phase === "processing";
  const showRight  = phase === "output";
  const processing = phase === "processing" || phase === "output";

  return (
    <section className="relative overflow-hidden py-20">
      <div className="relative z-10">
        <Section width="container" padding="none">

          {/* heading */}
          <div className="mb-12 flex flex-col items-center px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0 }}
              className="mb-4"
            >
              <BadgePill intent="primary" dot>
                {t("badge")}
              </BadgePill>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: "blur(14px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="mb-3 text-[clamp(26px,3.5vw,44px)] font-extrabold tracking-tight text-slate-900"
            >
              {t("h2")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="max-w-lg text-[15px] leading-relaxed text-slate-500"
            >
              {t("sub")}
            </motion.p>
          </div>

          {/* diagram */}
          <div
            className="flex justify-center overflow-x-auto pb-4"
            style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
          >
            <div className="relative" style={{ width: VW, height: VH, minWidth: VW }}>

              {/* ── SVG lines ───────────────────────────────────────────── */}
              <svg
                viewBox={`0 0 ${VW} ${VH}`}
                width={VW}
                height={VH}
                className="pointer-events-none absolute inset-0"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="sr-grad-in" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <linearGradient id="sr-grad-out" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>
                </defs>

                {/* ghost lines — inputs */}
                <g opacity="0.2" stroke="#cbd5e1" strokeWidth="1.5">
                  {INPUTS.map((_, i) => (
                    <path
                      key={i}
                      d={bezierPath(LEFT_EDGE, cardCenterY(INPUTS.length, i, CARD_GAP_LEFT), CX - GLOBE_R, CY)}
                    />
                  ))}
                </g>

                {/* ghost lines — outputs */}
                <g opacity="0.2" stroke="#cbd5e1" strokeWidth="1.5">
                  {OUTPUTS.map((_, i) => (
                    <path
                      key={i}
                      d={bezierPath(CX + GLOBE_R, CY, RIGHT_EDGE, cardCenterY(OUTPUTS.length, i, CARD_GAP_RIGHT))}
                    />
                  ))}
                </g>

                {/* animated input streams */}
                {INPUTS.map((_, i) => (
                  <AnimatedPath
                    key={`in-${i}`}
                    d={bezierPath(LEFT_EDGE, cardCenterY(INPUTS.length, i, CARD_GAP_LEFT), CX - GLOBE_R, CY)}
                    active={showLeft}
                    gradient="sr-grad-in"
                    delay={i * 0.05}
                  />
                ))}

                {/* animated output stream — chosen carrier only */}
                <AnimatedPath
                  key={`out-${bestChoice}`}
                  d={bezierPath(CX + GLOBE_R, CY, RIGHT_EDGE, cardCenterY(OUTPUTS.length, bestChoice, CARD_GAP_RIGHT))}
                  active={showRight}
                  gradient="sr-grad-out"
                  delay={0}
                />
              </svg>

              {/* ── Left column ─────────────────────────────────────────── */}
              <div
                className="absolute left-0 top-0 flex h-full w-28 flex-col items-center justify-center gap-4"
              >
                {INPUTS.map((node, i) => (
                  <NodeCard
                    key={node.key}
                    label={node.label}
                    logo={node.logo}
                    highlighted={false}
                    rotateClass={ROTATES[i % ROTATES.length]}
                  />
                ))}
              </div>

              {/* ── Center globe ────────────────────────────────────────── */}
              <div
                className="absolute flex items-center justify-center"
                style={{
                  left: CX - 96,
                  top:  CY - 96,
                  width: 192,
                  height: 192,
                }}
              >
                {/* ping ring */}
                <div
                  className="pointer-events-none absolute size-60 animate-ping rounded-full border border-blue-200/30"
                  style={{ animationDuration: "4s" }}
                />

                <motion.div
                  animate={
                    processing
                      ? {
                          borderColor: "#3b82f6",
                          boxShadow:
                            "0 0 0 4px rgba(59,130,246,0.1), 0 12px 40px rgba(59,130,246,0.15)",
                        }
                      : {
                          borderColor: "#e2e8f0",
                          boxShadow: "0 8px 32px rgba(59,130,246,0.06)",
                        }
                  }
                  transition={{ duration: 0.4 }}
                  className="relative flex size-48 flex-col items-center justify-center overflow-hidden rounded-full border-2 bg-white"
                >
                  {/* dot-grid texture */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                      backgroundImage: "radial-gradient(#000 1.5px,transparent 1.5px)",
                      backgroundSize: "10px 10px",
                    }}
                  />
                  {/* iziship icon mark — inline so it fills the circle properly */}
                  <svg
                    viewBox="0 0 100 100"
                    width="80"
                    height="80"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="iziship"
                  >
                    <rect width="100" height="100" rx="24" fill="#1B6EF3" />
                    <g fill="none" stroke="#FFFFFF" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M28 72 L56 44" />
                      <path d="M42.5 44 H56 V57.5" />
                    </g>
                    <circle cx="70" cy="30" r="8.5" fill="#FF6B2C" />
                  </svg>
                </motion.div>

                {/* "Selecting Best Route" badge */}
                <motion.div
                  animate={
                    processing
                      ? { opacity: 1, x: 0,  borderColor: "#10b981" }
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
              <div
                className="absolute right-0 top-0 flex h-full w-28 flex-col items-center justify-center gap-3"
              >
                {OUTPUTS.map((node, i) => (
                  <NodeCard
                    key={node.key}
                    label={node.label}
                    logo={node.logo}
                    highlighted={showRight && i === bestChoice}
                    rotateClass={ROTATES[(i + 2) % ROTATES.length]}
                  />
                ))}
              </div>

            </div>
          </div>

        </Section>
      </div>
    </section>
  );
}
