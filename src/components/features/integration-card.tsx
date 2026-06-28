"use client";

const CARD_CLS =
  "h-52 w-full overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-lg dark:border-white/10 dark:bg-[#0D1B2E] dark:shadow-2xl";

const LABEL_CLS = "text-[10px] font-bold uppercase tracking-widest text-muted-foreground";

const stores = ["Salla", "Zid", "WooCommerce", "Shopify"];

export function IntegrationCard({ active }: { active: boolean }) {
  return (
    <div className={`${CARD_CLS} flex flex-col`}>
      <p className={`mb-2 ${LABEL_CLS}`}>Connected stores</p>
      <div className="grid flex-1 grid-cols-2 gap-2">
        {stores.map((s, i) => (
          <div
            key={s}
            className="flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-500"
            style={{
              background: active ? "oklch(0.72 0.18 142 / 10%)" : "oklch(0.5 0 0 / 4%)",
              border: `1px solid ${active ? "oklch(0.72 0.18 142 / 25%)" : "oklch(0.5 0 0 / 8%)"}`,
              transitionDelay: `${i * 80}ms`,
            }}
          >
            <div
              className="flex size-6 items-center justify-center rounded-lg text-[8px] font-black text-white transition-colors duration-500"
              style={{ background: active ? "oklch(0.72 0.18 142 / 40%)" : "oklch(0.5 0 0 / 12%)" }}
            >
              {s[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-bold text-foreground">{s}</p>
              <div
                className="mt-0.5 h-1 rounded-full transition-all duration-700"
                style={{
                  width: active ? "100%" : "40%",
                  background: active ? "oklch(0.72 0.18 142)" : "oklch(0.5 0 0 / 12%)",
                  transitionDelay: `${i * 100 + 200}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
