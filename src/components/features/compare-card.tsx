"use client";

const CARD_CLS =
  "h-52 w-full overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-lg dark:border-white/10 dark:bg-[#0D1B2E] dark:shadow-2xl";

const LABEL_CLS = "text-[10px] font-bold uppercase tracking-widest text-muted-foreground";

const rows = [
  { name: "Aramex", price: "SYP 2,400", eta: "1–2 days", best: true  },
  { name: "Bosta",  price: "SYP 2,800", eta: "1–3 days", best: false },
  { name: "SMSA",   price: "SYP 3,100", eta: "2–3 days", best: false },
];

export function CompareCard({ active }: { active: boolean }) {
  return (
    <div className={CARD_CLS}>
      <p className={`mb-2 ${LABEL_CLS}`}>Damascus → Aleppo</p>
      <div className="flex flex-col gap-1.5">
        {rows.map((r, i) => (
          <div
            key={r.name}
            className="flex items-center justify-between rounded-xl px-3 py-2 transition-all duration-500"
            style={{
              background: r.best && active ? "oklch(0.541 0.233 258 / 12%)" : "oklch(0.5 0 0 / 4%)",
              border: `1px solid ${r.best && active ? "oklch(0.541 0.233 258 / 30%)" : "oklch(0.5 0 0 / 8%)"}`,
              transitionDelay: `${i * 60}ms`,
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="flex size-6 items-center justify-center rounded-full text-[9px] font-black text-white transition-colors duration-500"
                style={{ background: r.best && active ? "oklch(0.541 0.233 258)" : "oklch(0.5 0 0 / 12%)" }}
              >
                {r.name[0]}
              </div>
              <div>
                <p className="text-[11px] font-bold text-foreground">{r.name}</p>
                <p className="text-[9px] text-muted-foreground">{r.eta}</p>
              </div>
            </div>
            <div className="text-end">
              <p
                className="text-[12px] font-black transition-colors duration-500"
                style={{ color: r.best && active ? "oklch(0.541 0.233 258)" : "var(--color-foreground)" }}
              >
                {r.price}
              </p>
              {r.best && (
                <p
                  className="text-[9px] font-bold uppercase tracking-wider transition-colors duration-500"
                  style={{ color: active ? "oklch(0.72 0.18 142)" : "var(--color-muted-foreground)" }}
                >
                  {active ? "Best" : "—"}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
