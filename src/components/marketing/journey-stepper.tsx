"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

const STAGES = [
  {
    enLabel: "Checkout",
    arLabel: "الدفع",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#fff" : "#9DB0C8"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    bg: "#EEF4FF",
    accentColor: "#1B6EF3",
    enBullets: [
      "Let shoppers choose their preferred shipping method.",
      "Show accurate delivery estimates to reduce cart abandonment.",
      "Offer better rates and flexible delivery options.",
    ],
    arBullets: [
      "دع المتسوقين يختاروا طريقة الشحن المفضلة.",
      "اعرض تقديرات تسليم دقيقة لتقليل التخلي عن السلة.",
      "قدّم أسعارًا أفضل وخيارات تسليم مرنة.",
    ],
    checkBg: "#DCE8FF",
    checkColor: "#1B6EF3",
    enH3: "Smarter checkout, higher conversions",
    arH3: "دفع أذكى، معدل تحويل أعلى",
  },
  {
    enLabel: "Picking & Packing",
    arLabel: "التجهيز والتغليف",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#fff" : "#9DB0C8"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    bg: "#FFF4EE",
    accentColor: "#C2410C",
    enBullets: [
      "Process more orders faster with mobile-friendly picking.",
      "Assign tasks and monitor your warehouse team in real time.",
      "Reduce packing errors and return rates.",
    ],
    arBullets: [
      "عالج طلبات أكثر وأسرع عبر التجهيز من الجوال.",
      "وزّع المهام وتابع فريق المستودع لحظيًا.",
      "قلّل أخطاء التغليف وعدد المرتجعات.",
    ],
    checkBg: "#FFE0CF",
    checkColor: "#C2410C",
    enH3: "Warehouse operations, simplified",
    arH3: "عمليات المستودع، مبسّطة",
  },
  {
    enLabel: "Shipping",
    arLabel: "الشحن",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#fff" : "#9DB0C8"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1.5" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    bg: "#E8F0FF",
    accentColor: "#1B6EF3",
    enBullets: [
      "Manage all orders and shipping labels from one dashboard.",
      "Instant integration with 400+ local and regional carriers.",
      "Automate carrier selection and order tracking.",
    ],
    arBullets: [
      "أدر كل الطلبات وبطاقات الشحن من لوحة واحدة.",
      "تكامل فوري مع +400 شركة شحن محلية وإقليمية.",
      "أتمتة اختيار الشركة وتتبع الطلب.",
    ],
    checkBg: "#DCE8FF",
    checkColor: "#1B6EF3",
    enH3: "Ship faster, ship smarter",
    arH3: "شحن أسرع، شحن أذكى",
  },
  {
    enLabel: "Returns",
    arLabel: "المرتجعات",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#fff" : "#9DB0C8"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 1-6.41 2.67" />
        <path d="M3 3v6h6" />
      </svg>
    ),
    bg: "#F3E8FF",
    accentColor: "#7C3AED",
    enBullets: [
      "Give customers a self-service returns portal with your branding.",
      "Offer multiple return methods from pickup to drop-off points.",
      "Automate approvals, tracking, and notifications.",
    ],
    arBullets: [
      "امنح عملاءك بوابة إرجاع ذاتية بهويتك.",
      "وفّر طرق إرجاع متعددة من الاستلام حتى نقاط التسليم.",
      "أتمتة الموافقات والتتبع والإشعارات.",
    ],
    checkBg: "#EDE9FE",
    checkColor: "#7C3AED",
    enH3: "Returns that don't drain your team",
    arH3: "مرتجعات لا تستنزف فريقك",
  },
];

function CheckItem({
  text,
  bg,
  color,
}: {
  text: string;
  bg: string;
  color: string;
}) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M2 5.5l2 2 4-4"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p style={{ fontSize: 15, color: "#5A6573", lineHeight: 1.55, margin: 0 }}>
        {text}
      </p>
    </div>
  );
}

function PanelMockup({ stage, isAr }: { stage: number; isAr: boolean }) {
  const s = STAGES[stage];

  if (stage === 0) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 16px 40px rgba(13,27,42,0.1)",
          padding: 20,
          maxWidth: 320,
        }}
      >
        <p style={{ fontSize: 12, fontWeight: 700, color: "#AEB6C2", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 14px" }}>
          {isAr ? "سريع" : "Express"}
        </p>
        {[
          { name: "Aramex", price: "$3.80", selected: true },
          { name: "Bosta", price: "$3.20", selected: false },
        ].map((row) => (
          <div
            key={row.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 10,
              border: row.selected ? "2px solid #1B6EF3" : "1.5px solid #EEF1F6",
              marginBottom: 10,
              opacity: row.selected ? 1 : 0.6,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: row.selected ? "2px solid #FF6B2C" : "2px solid #E6E9EF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {row.selected && (
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF6B2C" }} />
              )}
            </div>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "#14181F" }}>{row.name}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#14181F" }}>{row.price}</span>
          </div>
        ))}
        <button
          style={{
            width: "100%",
            background: "#1B6EF3",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "11px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            marginTop: 4,
          }}
        >
          {isAr ? "متابعة" : "Proceed"}
        </button>
      </div>
    );
  }

  if (stage === 1) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 16px 40px rgba(13,27,42,0.1)",
          overflow: "hidden",
          maxWidth: 320,
        }}
      >
        <div style={{ background: "#F4F6FA", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#5A6573" }}>{isAr ? "مستودع دمشق" : "Damascus warehouse"}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#16A34A", background: "#E9FBF0", borderRadius: 6, padding: "2px 8px" }}>
            {isAr ? "تم التسليم" : "Delivered"}
          </span>
        </div>
        <div style={{ padding: "14px 16px" }}>
          {[
            { id: "#ORD-4821", status: isAr ? "قيد التجهيز" : "Packing" },
            { id: "#ORD-4822", status: isAr ? "في الانتظار" : "Pending" },
          ].map((item) => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #F3F4F6" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#14181F" }}>{item.id}</span>
              <span style={{ fontSize: 12, color: "#5A6573" }}>{item.status}</span>
            </div>
          ))}
          <button
            style={{
              width: "100%",
              background: "#1B6EF3",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "9px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              marginTop: 12,
            }}
          >
            {isAr ? "المسح الرمز" : "Scan"}
          </button>
        </div>
      </div>
    );
  }

  if (stage === 2) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 16px 40px rgba(13,27,42,0.1)",
          overflow: "hidden",
          maxWidth: 320,
          position: "relative",
        }}
      >
        <div style={{ background: "#0D1B2A", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 22, height: 22, background: "#1B6EF3", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 8, fontWeight: 800, color: "#fff" }}>izi</span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>Bosta</span>
        </div>
        <div style={{ padding: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#AEB6C2", margin: "0 0 12px" }}>
            {isAr ? "بطاقة شحن" : "Shipping label"}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <p style={{ fontSize: 10, color: "#AEB6C2", margin: 0 }}>FROM</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#14181F", margin: 0 }}>{isAr ? "دمشق" : "Damascus"}</p>
            </div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M12 6l4 4-4 4" stroke="#1B6EF3" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <div>
              <p style={{ fontSize: 10, color: "#AEB6C2", margin: 0 }}>TO</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#14181F", margin: 0 }}>{isAr ? "حلب" : "Aleppo"}</p>
            </div>
          </div>
          <div style={{ width: 72, height: 72, background: "#F4F6FA", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              {[0, 1, 2, 3].map((r) =>
                [0, 1, 2, 3].map((c) => (
                  <rect key={`${r}-${c}`} x={2 + c * 8} y={2 + r * 8} width={Math.random() > 0.4 ? 6 : 3} height={Math.random() > 0.4 ? 6 : 3} rx="1" fill="#14181F" opacity={Math.random() > 0.3 ? 0.8 : 0.3} />
                ))
              )}
            </svg>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 8,
            insetInlineEnd: -8,
            background: "#1B6EF3",
            color: "#fff",
            borderRadius: 10,
            padding: "6px 10px",
            fontSize: 11,
            fontWeight: 700,
            transform: "rotate(-5deg)",
            animation: "izFloat 4s ease-in-out infinite",
          }}
        >
          +400 {isAr ? "شركة شحن" : "carriers"}
        </div>
      </div>
    );
  }

  // stage 3 — returns
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 16px 40px rgba(13,27,42,0.1)",
        overflow: "hidden",
        maxWidth: 320,
      }}
    >
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #F3F4F6" }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#14181F", margin: 0 }}>
          {isAr ? "طلبات الإرجاع" : "Return Requests"}
        </p>
      </div>
      <div style={{ padding: "10px 16px" }}>
        {[
          { id: "#RET-0193", status: isAr ? "تم تأكيد الإرجاع" : "Confirmed" },
          { id: "#RET-0194", status: isAr ? "تم تأكيد الإرجاع" : "Confirmed" },
        ].map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: "1px solid #F3F4F6",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: "#14181F" }}>{item.id}</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#7C3AED",
                background: "#EDE9FE",
                borderRadius: 6,
                padding: "3px 8px",
              }}
            >
              {item.status}
            </span>
          </div>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button
            style={{
              flex: 1,
              background: "#7C3AED",
              color: "#fff",
              border: "none",
              borderRadius: 9,
              padding: "8px",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {isAr ? "موافقة" : "Approve"}
          </button>
          <button
            style={{
              flex: 1,
              background: "#fff",
              color: "#5A6573",
              border: "1.5px solid #E6E9EF",
              borderRadius: 9,
              padding: "8px",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {isAr ? "رفض" : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function JourneyStepperSection() {
  const locale = useLocale() as "en" | "ar";
  const isAr = locale === "ar";
  const [active, setActive] = useState(0);

  const s = STAGES[active];
  const bullets = isAr ? s.arBullets : s.enBullets;

  // Progress bar: center of each stage node
  const progressPct = ((active + 0.5) / STAGES.length) * 75 + 12.5;

  return (
    <section style={{ background: "#ffffff", padding: "92px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", maxWidth: 660, margin: "0 auto 52px" }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#1B6EF3",
              marginBottom: 12,
            }}
          >
            {isAr ? "رحلة الشحن" : "SHIPPING JOURNEY"}
          </p>
          <h2
            style={{
              fontSize: "clamp(26px, 3.5vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: "#14181F",
            }}
          >
            {isAr
              ? "مزايا أساسية عبر رحلة الشحن"
              : "Key benefits across the shipping journey"}
          </h2>
        </div>

        {/* Stepper rail */}
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto 48px",
            position: "relative",
          }}
        >
          {/* Gray base track */}
          <div
            style={{
              position: "absolute",
              top: 26,
              left: "12.5%",
              right: "12.5%",
              height: 3,
              background: "#E5EAF1",
              borderRadius: 2,
            }}
          />
          {/* Blue progress bar */}
          <div
            style={{
              position: "absolute",
              top: 26,
              left: "12.5%",
              width: `${progressPct - 12.5}%`,
              height: 3,
              background: "#1B6EF3",
              borderRadius: 2,
              transition: "width 0.4s ease",
            }}
          />

          {/* Stage buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            {STAGES.map((stage, i) => {
              const isDone = i < active;
              const isActive = i === active;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                  }}
                  onClick={() => setActive(i)}
                >
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: "50%",
                      background: isDone ? "#1B6EF3" : isActive ? "#FF6B2C" : "#fff",
                      border: !isDone && !isActive ? "2px solid #E5EAF1" : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: isActive
                        ? "0 10px 24px rgba(255,107,44,0.4)"
                        : "none",
                      transform: isActive ? "scale(1.12)" : "scale(1)",
                      transition: "all 0.25s ease",
                    }}
                  >
                    {stage.icon(isDone || isActive)}
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: isActive ? 800 : 600,
                      color: isActive
                        ? "#14181F"
                        : isDone
                        ? "#1B6EF3"
                        : "#AEB6C2",
                      textAlign: "center",
                      maxWidth: 80,
                      lineHeight: 1.3,
                    }}
                  >
                    {isAr ? stage.arLabel : stage.enLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div
          key={active}
          style={{
            background: s.bg,
            borderRadius: 26,
            padding: "48px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 44,
            alignItems: "center",
            animation: "izFadeUp 0.5s ease both",
            minHeight: 340,
          }}
          className="journey-panel"
        >
          {/* Left: text */}
          <div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: s.accentColor,
                marginBottom: 24,
              }}
            >
              {isAr ? s.arH3 : s.enH3}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {bullets.map((b) => (
                <CheckItem
                  key={b}
                  text={b}
                  bg={s.checkBg}
                  color={s.checkColor}
                />
              ))}
            </div>
          </div>

          {/* Right: mockup */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PanelMockup stage={active} isAr={isAr} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .journey-panel {
            grid-template-columns: 1fr !important;
            padding: 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
