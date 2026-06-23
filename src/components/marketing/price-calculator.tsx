"use client";

import { useLocale } from "next-intl";

const CONTENT = {
  en: {
    kicker: "LIVE PLATFORM",
    h2: "Compare all shipping companies in one screen",
    searchPlaceholder: "Search for a shipment",
    createBtn: "+ Create shipment",
    calcTitle: "Price Calculator",
    route: "Damascus → Aleppo · Shipping Options",
    proPlan: "Pro Plan",
    columns: ["Carrier", "Service Type", "Delivery Time", "Delivery", "Price"],
    actionLabel: "Create",
    trust: "Trusted by 10,000+ businesses across the region",
    carriersLabel: "carriers",
    carriersNum: "400+",
  },
  ar: {
    kicker: "المنصة مباشرةً",
    h2: "قارن كل شركات الشحن في شاشة واحدة",
    searchPlaceholder: "ابحث عن شحنة",
    createBtn: "+ إنشاء شحنة",
    calcTitle: "حاسبة الأسعار",
    route: "دمشق → حلب · خيارات الشحن",
    proPlan: "الخطة الاحترافية",
    columns: ["شركة الشحن", "نوع الخدمة", "مدة التسليم", "التسليم", "السعر"],
    actionLabel: "أنشئ",
    trust: "موثوق من أكثر من 10,000 شركة في المنطقة",
    carriersLabel: "شركة شحن",
    carriersNum: "+400",
  },
};

const CARRIERS = [
  {
    mark: "B",
    name: "Bosta",
    namear: "بوستا",
    bg: "#FFF0EB",
    fg: "#FF6B2C",
    rating: "4.9",
    serviceEn: "Express",
    serviceAr: "سريع",
    etaEn: "1–2 business days",
    etaAr: "1–2 يوم عمل",
    deliveryEn: "To door",
    deliveryAr: "حتى الباب",
    price: "$3.20",
  },
  {
    mark: "A",
    name: "Aramex",
    namear: "أرامكس",
    bg: "#FFEAEA",
    fg: "#D32F2F",
    rating: "4.8",
    serviceEn: "Express",
    serviceAr: "سريع",
    etaEn: "1–3 business days",
    etaAr: "1–3 يوم عمل",
    deliveryEn: "To door",
    deliveryAr: "حتى الباب",
    price: "$3.80",
  },
  {
    mark: "S",
    name: "SMSA",
    namear: "SMSA",
    bg: "#E8F0FF",
    fg: "#1B6EF3",
    rating: "4.7",
    serviceEn: "Standard",
    serviceAr: "عادي",
    etaEn: "2–3 business days",
    etaAr: "2–3 يوم عمل",
    deliveryEn: "To door",
    deliveryAr: "حتى الباب",
    price: "$4.10",
  },
  {
    mark: "N",
    name: "Naqel",
    namear: "ناقل",
    bg: "#E9FBF0",
    fg: "#16A34A",
    rating: "4.8",
    serviceEn: "Express",
    serviceAr: "سريع",
    etaEn: "1–3 business days",
    etaAr: "1–3 يوم عمل",
    deliveryEn: "Branch",
    deliveryAr: "فرع",
    price: "$4.50",
  },
  {
    mark: "F",
    name: "Fardar",
    namear: "فردار",
    bg: "#F3E8FF",
    fg: "#7C3AED",
    rating: "4.6",
    serviceEn: "Standard",
    serviceAr: "عادي",
    etaEn: "2–4 business days",
    etaAr: "2–4 يوم عمل",
    deliveryEn: "To door",
    deliveryAr: "حتى الباب",
    price: "$4.90",
  },
];

export function PriceCalculatorSection() {
  const locale = useLocale() as "en" | "ar";
  const isAr = locale === "ar";
  const c = isAr ? CONTENT.ar : CONTENT.en;

  return (
    <section
      style={{
        background:
          "radial-gradient(900px 480px at 50% -12%, #E8F0FF 0%, rgba(232,240,255,0) 62%), #ffffff",
        padding: "36px 24px 88px",
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: "center", maxWidth: 660, margin: "0 auto 48px" }}>
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
          {c.kicker}
        </p>
        <h2
          style={{
            fontSize: "clamp(28px, 3.5vw, 40px)",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            color: "#14181F",
          }}
        >
          {c.h2}
        </h2>
      </div>

      {/* Dashboard mockup */}
      <div
        style={{
          maxWidth: 1060,
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #EAEEF4",
            borderRadius: 20,
            boxShadow: "0 34px 80px rgba(13,27,42,0.18)",
            overflow: "hidden",
            display: "flex",
          }}
        >
          {/* Left sidebar */}
          <div
            style={{
              width: 54,
              background: "#0D1B2A",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "16px 0",
              gap: 14,
              flexShrink: 0,
            }}
          >
            <div
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
              <span style={{ fontSize: 10, fontWeight: 800, color: "#fff" }}>izi</span>
            </div>
            {[55, 30, 40, 22, 35].map((w, i) => (
              <div
                key={i}
                style={{
                  width: w * 0.38,
                  height: 6,
                  borderRadius: 3,
                  background: i === 0 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)",
                }}
              />
            ))}
          </div>

          {/* Main body */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Top bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 20px",
                borderBottom: "1px solid #EAEEF4",
                flexWrap: "wrap",
              }}
            >
              {/* Search */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#F4F6FA",
                  borderRadius: 9,
                  padding: "7px 12px",
                  flex: 1,
                  minWidth: 140,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="6" cy="6" r="4.5" stroke="#AEB6C2" strokeWidth="1.4" />
                  <path d="M9.5 9.5L12 12" stroke="#AEB6C2" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <span style={{ fontSize: 13, color: "#AEB6C2" }}>{c.searchPlaceholder}</span>
              </div>
              {/* Create button */}
              <button
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1B6EF3",
                  background: "#fff",
                  border: "1.5px solid #1B6EF3",
                  borderRadius: 9,
                  padding: "7px 13px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {c.createBtn}
              </button>
              {/* Revenue */}
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#5A6573",
                  background: "#F4F6FA",
                  borderRadius: 8,
                  padding: "5px 10px",
                }}
              >
                $3,260
              </span>
              {/* Bell */}
              <div style={{ position: "relative" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M9 2a5 5 0 0 1 5 5v3.5l1.5 2H2.5L4 10.5V7a5 5 0 0 1 5-5zM7 15a2 2 0 0 0 4 0"
                    stroke="#5A6573"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    position: "absolute",
                    top: -2,
                    insetInlineEnd: -2,
                    width: 7,
                    height: 7,
                    background: "#FF6B2C",
                    borderRadius: "50%",
                    border: "1.5px solid #fff",
                  }}
                />
              </div>
            </div>

            {/* Calculator section */}
            <div style={{ padding: "20px 24px" }}>
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: "#E8F0FF",
                    borderRadius: 9,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="2" width="5" height="5" rx="1.5" fill="#1B6EF3" />
                    <rect x="9" y="2" width="5" height="5" rx="1.5" fill="#1B6EF3" opacity="0.5" />
                    <rect x="2" y="9" width="5" height="5" rx="1.5" fill="#1B6EF3" opacity="0.5" />
                    <rect x="9" y="9" width="5" height="5" rx="1.5" fill="#1B6EF3" opacity="0.3" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#14181F", margin: 0 }}>
                    {c.calcTitle}
                  </p>
                  <p style={{ fontSize: 12, color: "#AEB6C2", margin: 0 }}>{c.route}</p>
                </div>
                <div style={{ marginInlineStart: "auto", display: "flex", gap: 8 }}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#14181F",
                      background: "#F4F6FA",
                      borderRadius: 8,
                      padding: "5px 10px",
                    }}
                  >
                    <span
                      style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6B2C" }}
                    />
                    {c.proPlan}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2.5 4L5 6.5L7.5 4" stroke="#AEB6C2" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Table */}
              <div
                style={{
                  border: "1px solid #EEF1F6",
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                {/* Table header */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.7fr 1fr 1.4fr 1fr 0.8fr auto",
                    background: "#F7F8FA",
                    padding: "9px 16px",
                    gap: 8,
                  }}
                >
                  {c.columns.map((col) => (
                    <span
                      key={col}
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.03em",
                        textTransform: "uppercase",
                        color: "#AEB6C2",
                      }}
                    >
                      {col}
                    </span>
                  ))}
                  <span />
                </div>

                {/* Rows */}
                {CARRIERS.map((carrier, idx) => (
                  <div
                    key={carrier.name}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.7fr 1fr 1.4fr 1fr 0.8fr auto",
                      padding: "11px 16px",
                      gap: 8,
                      alignItems: "center",
                      borderTop: idx > 0 ? "1px solid #EAEEF4" : "none",
                      background: "#fff",
                    }}
                  >
                    {/* Carrier */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 9,
                          background: carrier.bg,
                          color: carrier.fg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: 13,
                          flexShrink: 0,
                        }}
                      >
                        {carrier.mark}
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#14181F",
                            margin: 0,
                          }}
                        >
                          {isAr ? carrier.namear : carrier.name}
                        </p>
                        <p style={{ fontSize: 11, color: "#AEB6C2", margin: 0 }}>
                          ★ {carrier.rating}
                        </p>
                      </div>
                    </div>

                    {/* Service */}
                    <span style={{ fontSize: 13, color: "#5A6573" }}>
                      {isAr ? carrier.serviceAr : carrier.serviceEn}
                    </span>

                    {/* ETA */}
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#16A34A",
                        background: "#E9FBF0",
                        border: "1px solid #CDF3DC",
                        borderRadius: 999,
                        padding: "3px 9px",
                        display: "inline-block",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {isAr ? carrier.etaAr : carrier.etaEn}
                    </span>

                    {/* Delivery type */}
                    <span style={{ fontSize: 13, color: "#5A6573" }}>
                      {isAr ? carrier.deliveryAr : carrier.deliveryEn}
                    </span>

                    {/* Price */}
                    <span style={{ fontSize: 15, fontWeight: 800, color: "#14181F" }}>
                      {carrier.price}
                    </span>

                    {/* Action */}
                    <button
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#fff",
                        background: "#1B6EF3",
                        border: "none",
                        borderRadius: 9,
                        padding: "7px 14px",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#0B4FCC")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#1B6EF3")}
                    >
                      {c.actionLabel}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating badge */}
        <div
          style={{
            position: "absolute",
            bottom: -20,
            insetInlineEnd: -16,
            background: "#1B6EF3",
            color: "#fff",
            borderRadius: 16,
            padding: "14px 20px",
            boxShadow: "0 16px 40px rgba(27,110,243,0.35)",
            animation: "izFloat 5s ease-in-out infinite 1s",
            transform: "rotate(-7deg)",
            textAlign: "center",
            zIndex: 3,
          }}
        >
          <p
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#FF6B2C",
              margin: 0,
              lineHeight: 1,
            }}
          >
            {c.carriersNum}
          </p>
          <p style={{ fontSize: 12, fontWeight: 600, margin: "4px 0 0" }}>{c.carriersLabel}</p>
        </div>
      </div>

      {/* Trust text */}
      <p
        style={{
          textAlign: "center",
          fontSize: 21,
          fontWeight: 700,
          color: "#14181F",
          marginTop: 72,
        }}
      >
        {c.trust}
      </p>
    </section>
  );
}
