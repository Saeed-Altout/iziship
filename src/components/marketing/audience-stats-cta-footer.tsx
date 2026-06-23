"use client";

import { useLocale } from "next-intl";

/* ── Audience Split ─────────────────────────────────────────────────── */
export function AudienceSplitSection() {
  const locale = useLocale() as "en" | "ar";
  const isAr = locale === "ar";

  const merchantBullets = isAr
    ? [
        "لوحة واحدة لكل طلب وكل شركة شحن",
        "الدفع عند التسليم وتسوية سريعة لمحفظتك",
        "أسعار أقل بفضل منافسة حقيقية بين الشركات",
        "المرتجعات والتتبع في مكان واحد",
      ]
    : [
        "One dashboard for every order and every carrier",
        "Cash on delivery, settled fast to your wallet",
        "Lower rates through real carrier competition",
        "Returns and tracking handled in one place",
      ];

  const carrierBullets = isAr
    ? [
        "الوصول إلى تجار يبحثون عن الشحن الآن",
        "أدر كل طلب من منصة تقنية واحدة",
        "توجيه ذكي وتوزيع تلقائي للطلبات",
        "قلّل حجمك دون فريق مبيعات",
      ]
    : [
        "Reach merchants actively looking to ship",
        "Manage every order from one tech platform",
        "Smart routing and automatic assignment",
        "Grow your volume without a sales team",
      ];

  function BulletList({
    items,
    checkColor,
    checkBg,
  }: {
    items: string[];
    checkColor: string;
    checkBg: string;
  }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((item) => (
          <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: checkBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path
                  d="M1.5 4.5l2 2 4-4"
                  stroke={checkColor}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span style={{ fontSize: 15, color: "#5A6573", lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section
      id="audience"
      style={{ background: "#ffffff", padding: "92px 24px" }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 28,
        }}
        className="audience-grid"
      >
        {/* Merchants */}
        <div
          style={{
            background: "#EEF4FF",
            borderRadius: 24,
            padding: 40,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#1B6EF3",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: "#D6E8FF",
              borderRadius: 8,
              padding: "4px 10px",
              display: "inline-block",
              marginBottom: 20,
            }}
          >
            {isAr ? "للتجار" : "For merchants"}
          </span>
          <h3
            style={{
              fontSize: "clamp(22px, 2.5vw, 30px)",
              fontWeight: 800,
              color: "#1B6EF3",
              marginBottom: 24,
              lineHeight: 1.25,
            }}
          >
            {isAr
              ? "تخلّص عن إدارة خمس شركات شحن"
              : "Stop juggling five shipping companies"}
          </h3>
          <BulletList items={merchantBullets} checkColor="#1B6EF3" checkBg="#C5D8FF" />
          <a
            href="#cta"
            style={{
              display: "inline-block",
              marginTop: 28,
              background: "#1B6EF3",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              borderRadius: 12,
              padding: "11px 20px",
              textDecoration: "none",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#0B4FCC")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1B6EF3")}
          >
            {isAr ? "ابدأ الشحن مجاناً" : "Start shipping free"}
          </a>
        </div>

        {/* Carriers */}
        <div
          style={{
            background: "#FFF4EE",
            borderRadius: 24,
            padding: 40,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#C2410C",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: "#FFE0CF",
              borderRadius: 8,
              padding: "4px 10px",
              display: "inline-block",
              marginBottom: 20,
            }}
          >
            {isAr ? "لشركات الشحن" : "For carriers"}
          </span>
          <h3
            style={{
              fontSize: "clamp(22px, 2.5vw, 30px)",
              fontWeight: 800,
              color: "#C2410C",
              marginBottom: 24,
              lineHeight: 1.25,
            }}
          >
            {isAr
              ? "تدفق ثابت من طلبات التجار"
              : "A steady stream of merchant orders"}
          </h3>
          <BulletList items={carrierBullets} checkColor="#C2410C" checkBg="#FFD5BF" />
          <a
            href="#cta"
            style={{
              display: "inline-block",
              marginTop: 28,
              background: "#FF6B2C",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              borderRadius: 12,
              padding: "11px 20px",
              textDecoration: "none",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e85a1c")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#FF6B2C")}
          >
            {isAr ? "انضم كشركة شحن" : "Join as a carrier"}
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .audience-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ── Stats Bar ──────────────────────────────────────────────────────── */
const STATS = [
  { enNum: "10+", arNum: "+10", enLabel: "Shipping carriers", arLabel: "شركة شحن" },
  { enNum: "500+", arNum: "+500", enLabel: "Active merchants", arLabel: "تاجر نشط" },
  { enNum: "98%", arNum: "98%", enLabel: "On-time delivery", arLabel: "معدل التسليم في الوقت" },
  { enNum: "5", arNum: "5", enLabel: "Live tracking stages", arLabel: "مراحل تتبع حية" },
];

export function StatsBarSection() {
  const locale = useLocale() as "en" | "ar";
  const isAr = locale === "ar";

  return (
    <section style={{ background: "#F7F8FA", padding: "64px 24px" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          gap: 48,
          flexWrap: "wrap",
        }}
      >
        {STATS.map((s) => (
          <div key={s.enLabel} style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: "#1B6EF3",
                margin: 0,
                lineHeight: 1,
              }}
            >
              {isAr ? s.arNum : s.enNum}
            </p>
            <p
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#5A6573",
                margin: "6px 0 0",
              }}
            >
              {isAr ? s.arLabel : s.enLabel}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── CTA Section ────────────────────────────────────────────────────── */
export function CTASection() {
  const locale = useLocale() as "en" | "ar";
  const isAr = locale === "ar";

  return (
    <section
      id="cta"
      style={{
        background:
          "radial-gradient(900px 480px at 50% 0%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 62%), #1B6EF3",
        padding: "96px 24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "clamp(30px, 4vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#fff",
            marginBottom: 16,
          }}
        >
          {isAr
            ? "مصمّم لسوقك. ابدأ مجاناً اليوم."
            : "Built for your market. Start free today."}
        </h2>
        <p
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.75)",
            maxWidth: 520,
            margin: "0 auto 32px",
            lineHeight: 1.55,
          }}
        >
          {isAr
            ? "انضم إلى التجار الذين يشحنون بذكاء في سوريا والمنطقة."
            : "Join the merchants shipping smarter across Syria and MENA."}
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#"
            style={{
              display: "inline-block",
              fontSize: 15,
              fontWeight: 700,
              color: "#1B6EF3",
              background: "#fff",
              borderRadius: 12,
              padding: "15px 28px",
              textDecoration: "none",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {isAr ? "ابدأ مجاناً" : "Get Started Free"}
          </a>
          <a
            href="#"
            style={{
              display: "inline-block",
              fontSize: 15,
              fontWeight: 700,
              color: "#fff",
              background: "transparent",
              border: "1.5px solid rgba(255,255,255,0.45)",
              borderRadius: 12,
              padding: "15px 28px",
              textDecoration: "none",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)")
            }
          >
            {isAr ? "تحدث إلينا" : "Talk to us"}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────────────────────── */
export function MarketingFooter() {
  const locale = useLocale() as "en" | "ar";
  const isAr = locale === "ar";

  return (
    <footer
      style={{
        background: "#0D1B2A",
        padding: "44px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        {/* Logo + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, direction: "ltr" }}>
            <span
              style={{
                width: 30,
                height: 30,
                background: "#1B6EF3",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="14" viewBox="0 0 20 18" fill="none">
                <path d="M3 14 L10 4 L17 14" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="17" cy="14" r="3" fill="#FF6B2C" stroke="white" strokeWidth="1.5" />
              </svg>
            </span>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>
              <span style={{ fontWeight: 500 }}>izi</span>ship
            </span>
          </div>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.5)",
              maxWidth: 420,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {isAr
              ? "أول منصة لوجستية متعددة الشركات في سوريا — مصنوعة للتجار الذين يشحنون بالدفع عند التسليم."
              : "Syria's first multi-carrier logistics platform — built for merchants who ship COD."}
          </p>
        </div>

        {/* Copyright */}
        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.4)",
            marginInlineStart: "auto",
            margin: 0,
          }}
        >
          {isAr
            ? "© 2026 iziship. جميع الحقوق محفوظة."
            : "© 2026 iziship. All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
