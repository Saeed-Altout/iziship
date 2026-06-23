"use client";

import { useLocale } from "next-intl";

const FEATURES = [
  {
    iconBg: "#E8F0FF",
    enTitle: "Multi-carrier comparison",
    arTitle: "مقارنة شركات الشحن",
    enDesc: "Compare every carrier's price and speed in one view.",
    arDesc: "قارن سعر وسرعة كل شركة في مكان واحد.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B6EF3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="4" rx="1.5" />
        <rect x="4" y="13" width="16" height="4" rx="1.5" />
        <rect x="6" y="19" width="12" height="2" rx="1" opacity="0.4" />
      </svg>
    ),
  },
  {
    iconBg: "#E8F0FF",
    enTitle: "5-stage live tracking",
    arTitle: "تتبع حي بخمس مراحل",
    enDesc: "Real-time status from pickup all the way to the doorstep.",
    arDesc: "حالة فورية من الاستلام حتى باب العميل.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B6EF3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="12" r="3" />
        <circle cx="19" cy="12" r="3" />
        <path d="M8 12h8" strokeDasharray="2.5 2" />
        <circle cx="12" cy="12" r="1.5" fill="#1B6EF3" />
      </svg>
    ),
  },
  {
    iconBg: "#FFF0EB",
    enTitle: "COD & wallet",
    arTitle: "الدفع عند التسليم والمحفظة",
    enDesc: "Collect cash on delivery and settle straight to your wallet.",
    arDesc: "حصّل المبالغ النقدية وسيّلها مباشرة في محفظتك.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B2C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="13" rx="3" />
        <path d="M2 10h20" />
        <path d="M6 15h4" />
      </svg>
    ),
  },
  {
    iconBg: "#E8F0FF",
    enTitle: "Returns management",
    arTitle: "إدارة المرتجعات",
    enDesc: "Handle returns without phone calls or paperwork.",
    arDesc: "تعامل مع المرتجعات دون مكالمات أو أوراق.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B6EF3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 1-6.41 2.67" />
        <path d="M3 3v6h6" />
      </svg>
    ),
  },
  {
    iconBg: "#E8F0FF",
    enTitle: "Store integrations",
    arTitle: "تكامل المتاجر",
    enDesc: "WooCommerce, Salla, Zid and custom stores in one click.",
    arDesc: "ووكومرس وسلة وزد والمتاجر المخصصة بنقرة واحدة.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B6EF3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 7H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="8" rx="1.5" />
      </svg>
    ),
  },
  {
    iconBg: "#E8F0FF",
    enTitle: "Bilingual dashboard",
    arTitle: "لوحة ثنائية اللغة",
    enDesc: "Full Arabic and English — switch anytime.",
    arDesc: "عربية وإنجليزية كاملة — بدون قيود تشاء.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B6EF3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" />
      </svg>
    ),
  },
];

export function FeaturesSection() {
  const locale = useLocale() as "en" | "ar";
  const isAr = locale === "ar";

  return (
    <section
      id="features"
      style={{ background: "#F7F8FA", padding: "92px 24px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ maxWidth: 640, marginBottom: 48 }}>
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
            {isAr ? "الميزات" : "FEATURES"}
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
              ? "كل ما تحتاجه للشحن واستلام أموالك"
              : "Everything you need to ship and get paid"}
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 22,
          }}
          className="features-grid"
        >
          {FEATURES.map((f) => (
            <div
              key={f.enTitle}
              style={{
                background: "#fff",
                border: "1px solid #EEF1F6",
                borderRadius: 18,
                padding: 30,
                boxShadow: "0 1px 0 rgba(13,27,42,0.02)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 16px 34px rgba(13,27,42,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 1px 0 rgba(13,27,42,0.02)";
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: f.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 18,
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#14181F",
                  marginBottom: 8,
                }}
              >
                {isAr ? f.arTitle : f.enTitle}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "#5A6573",
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {isAr ? f.arDesc : f.enDesc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
