"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

const CONTENT = {
  en: {
    badge: "Syria's first logistics network",
    h1a: "One dashboard for all your ",
    h1b: "shipments",
    sub: "Connect multiple shipping companies, track in real time, and collect cash on delivery — built for merchants in Syria and the region.",
    cta1: "Start Free",
    cta2: "See how it works",
    note: "No setup fee · Cancel anytime",
    cardLabel: "LIVE SHIPMENT",
    cardStatus: "In delivery · Damascus",
  },
  ar: {
    badge: "أول شبكة لوجستية في سوريا",
    h1a: "لوحة واحدة لكل ",
    h1b: "شحناتك",
    sub: "اربط عدة شركات شحن، وتتبع في الوقت الفعلي، وحصّل الدفع عند التسليم — مصمم للتجار في سوريا والمنطقة.",
    cta1: "ابدأ مجاناً",
    cta2: "شاهد كيف يعمل",
    note: "بدون رسوم إعداد · ألغِ في أي وقت",
    cardLabel: "شحنة مباشرة",
    cardStatus: "قيد التوصيل · دمشق",
  },
};

export function HeroSection() {
  const locale = useLocale() as "en" | "ar";
  const isAr = locale === "ar";
  const c = isAr ? CONTENT.ar : CONTENT.en;

  return (
    <section
      style={{
        background:
          "radial-gradient(1100px 540px at 78% -8%, #E8F0FF 0%, rgba(232,240,255,0) 62%), #ffffff",
        padding: "76px 24px 84px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.04fr 1fr",
          gap: 52,
          alignItems: "center",
        }}
        className="marketing-hero-grid"
      >
        {/* Left column */}
        <div
          style={{
            animation: "izFadeUp 0.7s ease both",
          }}
        >
          {/* Badge */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#E8F0FF",
              color: "#1B6EF3",
              fontSize: 13,
              fontWeight: 700,
              borderRadius: 999,
              padding: "7px 13px",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#1B6EF3",
                flexShrink: 0,
              }}
            />
            {c.badge}
          </span>

          {/* H1 */}
          <h1
            style={{
              fontSize: "clamp(36px, 4.5vw, 58px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#14181F",
              lineHeight: 1.1,
              marginTop: 20,
              marginBottom: 0,
            }}
          >
            {c.h1a}
            <span style={{ color: "#1B6EF3" }}>{c.h1b}</span>
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: 19,
              color: "#5A6573",
              lineHeight: 1.55,
              maxWidth: 520,
              marginTop: 22,
            }}
          >
            {c.sub}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              marginTop: 32,
            }}
          >
            <a
              href="#cta"
              style={{
                display: "inline-block",
                fontSize: 15,
                fontWeight: 700,
                color: "#fff",
                background: "#FF6B2C",
                borderRadius: 12,
                padding: "15px 26px",
                textDecoration: "none",
                boxShadow: "0 10px 24px rgba(255,107,44,0.3)",
                transition: "background 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e85a1c";
                e.currentTarget.style.boxShadow = "0 14px 28px rgba(255,107,44,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#FF6B2C";
                e.currentTarget.style.boxShadow = "0 10px 24px rgba(255,107,44,0.3)";
              }}
            >
              {c.cta1}
            </a>
            <a
              href="#how"
              style={{
                display: "inline-block",
                fontSize: 15,
                fontWeight: 700,
                color: "#14181F",
                background: "#fff",
                border: "1.5px solid #CFE0FF",
                borderRadius: 12,
                padding: "15px 26px",
                textDecoration: "none",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1B6EF3")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#CFE0FF")}
            >
              {c.cta2}
            </a>
          </div>

          {/* Note */}
          <p
            style={{
              fontSize: 13.5,
              fontWeight: 600,
              color: "#AEB6C2",
              marginTop: 16,
            }}
          >
            {c.note}
          </p>
        </div>

        {/* Right column — SVG Route Map */}
        <div style={{ position: "relative" }}>
          <HeroMap isAr={isAr} cardLabel={c.cardLabel} cardStatus={c.cardStatus} />
        </div>
      </div>

      <style>{`
        @keyframes izFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes izFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @media (max-width: 768px) {
          .marketing-hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function HeroMap({ isAr, cardLabel, cardStatus }: { isAr: boolean; cardLabel: string; cardStatus: string }) {
  return (
    <div style={{ position: "relative" }}>
      <svg
        viewBox="0 0 600 470"
        width="100%"
        style={{ overflow: "visible", display: "block" }}
      >
        <defs>
          <linearGradient id="izRoute" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1B6EF3" />
            <stop offset="100%" stopColor="#5B9BFF" />
          </linearGradient>
          <linearGradient id="izRouteFade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B6EF3" />
            <stop offset="100%" stopColor="#5B9BFF" />
          </linearGradient>
        </defs>

        {/* Background organic shape */}
        <ellipse cx="300" cy="235" rx="260" ry="210" fill="#EEF4FF" opacity="0.6" />

        {/* Dashed outer ring */}
        <circle cx="300" cy="235" r="240" fill="none" stroke="#D6E4FF" strokeWidth="1.2" strokeDasharray="2 6" />

        {/* Route paths */}
        {/* R1: Damascus → top-left (Latakia) */}
        <path id="izR1" d="M300,250 Q210,190 130,110" fill="none" stroke="url(#izRoute)" strokeWidth="2.4" strokeDasharray="7 9" strokeLinecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to="-64" dur="1.8s" repeatCount="indefinite" />
        </path>
        {/* R2: Damascus → right (Deir ez-Zor) */}
        <path id="izR2" d="M300,250 Q390,230 490,215" fill="none" stroke="url(#izRoute)" strokeWidth="2.4" strokeDasharray="7 9" strokeLinecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to="-64" dur="2.1s" repeatCount="indefinite" />
        </path>
        {/* R3: Damascus → bottom-right (Sweida) */}
        <path id="izR3" d="M300,250 Q370,310 430,380" fill="none" stroke="url(#izRoute)" strokeWidth="2.4" strokeDasharray="7 9" strokeLinecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to="-64" dur="2.4s" repeatCount="indefinite" />
        </path>
        {/* R4: Damascus → left (Tartus) */}
        <path id="izR4" d="M300,250 Q210,250 100,240" fill="none" stroke="#9DBEFF" strokeWidth="2" strokeDasharray="6 8" strokeLinecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to="-56" dur="2.6s" repeatCount="indefinite" />
        </path>
        {/* R5: Damascus → top (Aleppo) */}
        <path id="izR5" d="M300,250 Q295,160 290,80" fill="none" stroke="#9DBEFF" strokeWidth="2" strokeDasharray="6 8" strokeLinecap="round">
          <animate attributeName="stroke-dashoffset" from="0" to="-56" dur="2.2s" repeatCount="indefinite" />
        </path>

        {/* City endpoint nodes */}
        {[
          { cx: 130, cy: 110 },
          { cx: 490, cy: 215 },
          { cx: 430, cy: 380 },
          { cx: 100, cy: 240 },
          { cx: 290, cy: 80 },
        ].map((pt, i) => (
          <g key={i}>
            <circle cx={pt.cx} cy={pt.cy} r={6} fill="#1B6EF3" opacity={0.85} />
            <circle cx={pt.cx} cy={pt.cy} r={2.5} fill="white" />
          </g>
        ))}

        {/* Damascus hub — pulsing orange */}
        <circle cx="300" cy="250" r="10" fill="none" stroke="#FF6B2C" strokeWidth="2" opacity="0">
          <animate attributeName="r" values="10;36" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="250" r="9" fill="#FF6B2C" />
        <circle cx="300" cy="250" r="3.4" fill="white" />

        {/* Animated package sprites */}
        <g>
          <animateMotion dur="3.6s" repeatCount="indefinite" rotate="auto">
            <mpath href="#izR1" />
          </animateMotion>
          <rect x="-9" y="-7" width="18" height="14" rx="3" fill="#1B6EF3" />
          <line x1="-5" y1="0" x2="5" y2="0" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="5" cy="-5" r="3" fill="#FF6B2C" />
        </g>
        <g>
          <animateMotion dur="4.2s" repeatCount="indefinite" rotate="auto">
            <mpath href="#izR2" />
          </animateMotion>
          <rect x="-9" y="-7" width="18" height="14" rx="3" fill="#1B6EF3" />
          <line x1="-5" y1="0" x2="5" y2="0" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="5" cy="-5" r="3" fill="#FF6B2C" />
        </g>
        <g>
          <animateMotion dur="4.8s" repeatCount="indefinite" rotate="auto">
            <mpath href="#izR3" />
          </animateMotion>
          <rect x="-9" y="-7" width="18" height="14" rx="3" fill="#1B6EF3" />
          <line x1="-5" y1="0" x2="5" y2="0" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="5" cy="-5" r="3" fill="#FF6B2C" />
        </g>
      </svg>

      {/* Floating tracking card */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          insetInlineStart: isAr ? "auto" : "-6px",
          insetInlineEnd: isAr ? "-6px" : "auto",
          background: "#fff",
          border: "1px solid #EEF1F6",
          borderRadius: 14,
          padding: "14px 16px",
          boxShadow: "0 18px 40px rgba(13,27,42,0.12)",
          animation: "izFloat 5s ease-in-out infinite",
          minWidth: 200,
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#AEB6C2",
            margin: "0 0 10px",
          }}
        >
          {cardLabel}
        </p>
        {/* Progress tracker */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div
                style={{
                  width: i <= 2 ? 10 : 10,
                  height: 10,
                  borderRadius: "50%",
                  background: i < 2 ? "#1B6EF3" : i === 2 ? "#FF6B2C" : "#E6E9EF",
                  border: i === 2 ? "2px solid #FF6B2C" : "none",
                  flexShrink: 0,
                }}
              />
              {i < 4 && (
                <div
                  style={{
                    width: 16,
                    height: 2,
                    borderRadius: 1,
                    background: i < 2 ? "#1B6EF3" : "#E6E9EF",
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#14181F", margin: 0 }}>
          {cardStatus}
        </p>
      </div>
    </div>
  );
}
