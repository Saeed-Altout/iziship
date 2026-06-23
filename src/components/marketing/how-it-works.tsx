"use client";

import { useLocale } from "next-intl";

const STEPS = [
  {
    num: "01",
    enTitle: "Merchant creates an order",
    arTitle: "التاجر يضيف طلبه",
    enDesc: "Add a shipment in seconds — from your dashboard or straight from your store.",
    arDesc: "أضف شحنتك خلال ثوانٍ — من لوحتك أو مباشرة من متجرك.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1B6EF3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
  {
    num: "02",
    enTitle: "We match the best carrier",
    arTitle: "نختار أفضل شركة شحن",
    enDesc: "Compare price, speed and coverage across carriers, instantly and automatically.",
    arDesc: "نقارن السعر والسرعة والتغطية بين الشركات فوريًا وتلقائيًا.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1B6EF3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="12" r="2.5" />
        <circle cx="19" cy="6" r="2.5" />
        <circle cx="19" cy="18" r="2.5" />
        <path d="M7.5 12h4M16.5 6l-5 4M16.5 18l-5-4" />
      </svg>
    ),
  },
  {
    num: "03",
    enTitle: "Track live & collect COD",
    arTitle: "تتبع حي وتحصيل عند التسليم",
    enDesc: "Follow all five stages and get cash on delivery settled to your wallet.",
    arDesc: "تابع المراحل الخمس واستلم أموالك في محفظتك.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1B6EF3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="12" r="3" />
        <path d="M9 12h6" strokeDasharray="2 2" />
      </svg>
    ),
  },
];

export function HowItWorksSection() {
  const locale = useLocale() as "en" | "ar";
  const isAr = locale === "ar";

  return (
    <section
      id="how"
      style={{ background: "#ffffff", padding: "92px 24px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
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
            {isAr ? "كيف يعمل" : "HOW IT WORKS"}
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
              ? "من الطلب إلى الباب في ثلاث خطوات"
              : "From order to doorstep in three steps"}
          </h2>
        </div>

        {/* Cards grid */}
        <div style={{ position: "relative" }}>
          {/* Dashed connector */}
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              top: 38,
              left: "16%",
              right: "16%",
              height: 2,
              background:
                "repeating-linear-gradient(90deg, #CFE0FF 0 10px, transparent 10px 20px)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
            className="how-grid"
          >
            {STEPS.map((step) => (
              <div
                key={step.num}
                style={{
                  background: "#fff",
                  border: "1px solid #EEF1F6",
                  borderRadius: 18,
                  padding: 28,
                  textAlign: "center",
                  position: "relative",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 16px 34px rgba(13,27,42,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Icon container */}
                <div
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 20,
                    background: "#E8F0FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    position: "relative",
                  }}
                >
                  {step.icon}
                  {/* Number disc */}
                  <div
                    style={{
                      position: "absolute",
                      top: -8,
                      insetInlineEnd: -8,
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: "#FF6B2C",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {step.num}
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#14181F",
                    marginTop: 20,
                    marginBottom: 10,
                  }}
                >
                  {isAr ? step.arTitle : step.enTitle}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    color: "#5A6573",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {isAr ? step.arDesc : step.enDesc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .how-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
