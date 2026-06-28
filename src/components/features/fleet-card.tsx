"use client";

const CARD_CLS =
  "h-52 w-full overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-lg dark:border-white/10 dark:bg-[#0D1B2E] dark:shadow-2xl";

const LABEL_CLS = "text-[10px] font-bold uppercase tracking-widest text-muted-foreground";

const branches = [
  { name: "Damascus HQ", pct: 92 },
  { name: "Aleppo",      pct: 78 },
  { name: "Homs",        pct: 65 },
  { name: "Latakia",     pct: 88 },
  { name: "Tartus",      pct: 71 },
  { name: "Deir ez-Zor", pct: 55 },
];

export function FleetCard({ active }: { active: boolean }) {
  return (
    <div className={`${CARD_CLS} flex flex-col`}>
      <p className={`mb-2 ${LABEL_CLS}`}>Branch capacity</p>
      <div className="flex flex-1 flex-col justify-between">
        {branches.map((b, i) => (
          <div key={b.name} className="flex items-center gap-3">
            <p className="w-22 shrink-0 text-[11px] font-semibold text-foreground">{b.name}</p>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: active ? `${b.pct}%` : "10%",
                  background: "oklch(0.62 0.22 195)",
                  transitionDelay: `${i * 120}ms`,
                }}
              />
            </div>
            <p
              className="w-8 shrink-0 text-end text-[10px] font-bold transition-colors duration-500"
              style={{ color: active ? "oklch(0.62 0.22 195)" : "var(--color-muted-foreground)" }}
            >
              {active ? `${b.pct}%` : "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
