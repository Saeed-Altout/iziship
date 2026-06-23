"use client";

import { useLocale } from "next-intl";

const STORES = [
  { mark: "Woo", bg: "#F3E8FF", fg: "#7C3AED", enName: "WooCommerce", arName: "ووكومرس" },
  { mark: "سلة", bg: "#E9FBF0", fg: "#16A34A", enName: "Salla", arName: "سلة" },
  { mark: "زد", bg: "#FFF0EB", fg: "#FF6B2C", enName: "Zid", arName: "زد" },
  { mark: "M", bg: "#FFEDE4", fg: "#EA580C", enName: "Magento", arName: "ماجنتو" },
  { mark: "S", bg: "#E9F7E1", fg: "#5A8F2B", enName: "Shopify", arName: "شوبيفاي" },
  { mark: "API", bg: "#E8F0FF", fg: "#1B6EF3", enName: "Custom API", arName: "واجهة برمجية" },
];

const CARRIERS = [
  { mark: "A", bg: "#FFEAEA", fg: "#D32F2F", name: "Aramex" },
  { mark: "DHL", bg: "#FFF8E1", fg: "#B9930B", name: "DHL" },
  { mark: "B", bg: "#FFF0EB", fg: "#FF6B2C", name: "Bosta" },
  { mark: "N", bg: "#E9FBF0", fg: "#16A34A", name: "Naqel" },
  { mark: "SMSA", bg: "#E8F0FF", fg: "#1B6EF3", name: "SMSA" },
  { mark: "UPS", bg: "#EFE4D9", fg: "#6B4423", name: "UPS" },
];

function NodeGrid({ items }: { items: typeof STORES }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
        marginTop: 28,
      }}
    >
      {items.map((item) => (
        <div
          key={item.mark}
          style={{
            background: item.bg,
            borderRadius: 14,
            padding: "14px 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            transition: "transform 0.15s",
            cursor: "default",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 11,
              background: item.bg,
              border: `1.5px solid ${item.fg}22`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 11,
              color: item.fg,
            }}
          >
            {item.mark}
          </div>
          {"enName" in item && (
            <span style={{ fontSize: 11, fontWeight: 600, color: item.fg, textAlign: "center" }}>
              {(item as typeof STORES[0]).enName}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function CarrierGrid({ items }: { items: typeof CARRIERS }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
        marginTop: 28,
      }}
    >
      {items.map((item) => (
        <div
          key={item.mark}
          style={{
            background: item.bg,
            borderRadius: 14,
            padding: "14px 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            transition: "transform 0.15s",
            cursor: "default",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 11,
              background: item.bg,
              border: `1.5px solid ${item.fg}22`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 10,
              color: item.fg,
            }}
          >
            {item.mark}
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: item.fg, textAlign: "center" }}>
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export function IntegrationsSection() {
  const locale = useLocale() as "en" | "ar";
  const isAr = locale === "ar";

  return (
    <section
      id="int"
      style={{ background: "#F7F8FA", padding: "88px 24px" }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
        }}
        className="int-grid"
      >
        {/* Left — stores */}
        <div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "#E8F0FF",
              color: "#1B6EF3",
              fontSize: 13,
              fontWeight: 700,
              borderRadius: 999,
              padding: "6px 12px",
              marginBottom: 20,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1B6EF3", flexShrink: 0 }} />
            {isAr ? "+35 متجر ومنصة" : "35+ stores & marketplaces"}
          </span>
          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#14181F",
              marginBottom: 12,
            }}
          >
            {isAr ? "يتصل بمتجرك بضغطة واحدة" : "Plugs into your store instantly"}
          </h2>
          <p style={{ fontSize: 16, color: "#5A6573", lineHeight: 1.55 }}>
            {isAr
              ? "اربط متجرك الحالي بنقرة واحدة — دون الحاجة إلى مطورين."
              : "Connect your existing store in one click — no developers required."}
          </p>

          {/* Hub indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 28,
              padding: "14px 18px",
              background: "#fff",
              borderRadius: 14,
              border: "1px solid #EEF1F6",
              maxWidth: 340,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                background: "#1B6EF3",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>izi</span>
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#14181F", margin: 0 }}>iziship Hub</p>
              <p style={{ fontSize: 12, color: "#AEB6C2", margin: 0 }}>
                {isAr ? "نقطة تكامل مركزية واحدة" : "One central integration point"}
              </p>
            </div>
            <div style={{ marginInlineStart: "auto" }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#16A34A",
                  background: "#E9FBF0",
                  borderRadius: 6,
                  padding: "3px 8px",
                }}
              >
                {isAr ? "متصل" : "Live"}
              </span>
            </div>
          </div>

          <NodeGrid items={STORES} />
        </div>

        {/* Right — carriers */}
        <div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "#FFF0EB",
              color: "#FF6B2C",
              fontSize: 13,
              fontWeight: 700,
              borderRadius: 999,
              padding: "6px 12px",
              marginBottom: 20,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6B2C", flexShrink: 0 }} />
            {isAr ? "+400 شركة شحن" : "400+ shipping carriers"}
          </span>
          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#14181F",
              marginBottom: 12,
            }}
          >
            {isAr ? "أكبر شبكة ناقلين في المنطقة" : "The region's largest carrier network"}
          </h2>
          <p style={{ fontSize: 16, color: "#5A6573", lineHeight: 1.55 }}>
            {isAr
              ? "محليون وإقليميون — تغطية شاملة بسعر تنافسي."
              : "Local and regional — comprehensive coverage at competitive rates."}
          </p>

          {/* Carrier stats row */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 28,
              marginBottom: 0,
            }}
          >
            {[
              { num: "98%", label: isAr ? "التسليم في الوقت" : "On-time delivery" },
              { num: "400+", label: isAr ? "شركة شحن" : "Carriers" },
            ].map((stat) => (
              <div
                key={stat.num}
                style={{
                  padding: "14px 18px",
                  background: "#fff",
                  borderRadius: 14,
                  border: "1px solid #EEF1F6",
                }}
              >
                <p
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#1B6EF3",
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  {stat.num}
                </p>
                <p style={{ fontSize: 12, color: "#AEB6C2", margin: "4px 0 0", fontWeight: 600 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <CarrierGrid items={CARRIERS} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .int-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
