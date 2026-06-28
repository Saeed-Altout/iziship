"use client";

const CARD_CLS =
  "h-52 w-full overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-lg dark:border-white/10 dark:bg-[#0D1B2E] dark:shadow-2xl";

const LABEL_CLS = "text-[10px] font-bold uppercase tracking-widest text-muted-foreground";

const rows = [
  { label: "COD settled",    val: (a: boolean) => a ? "+ SYP 85,000" : "—", pos: true  },
  { label: "Processing fee", val: (a: boolean) => a ? "- SYP 1,200"  : "—", pos: false },
  { label: "Net transfer",   val: (a: boolean) => a ? "+ SYP 83,800" : "—", pos: true  },
];

export function WalletCard({ active }: { active: boolean }) {
  return (
    <div className={CARD_CLS}>
      <div className="mb-2 flex items-center justify-between">
        <p className={LABEL_CLS}>Wallet balance</p>
        <span className="text-[9px] text-muted-foreground">Last COD: Today</span>
      </div>
      <p
        className="mb-3 text-[26px] font-black tracking-tight transition-all duration-700"
        style={{ color: active ? "oklch(0.65 0.22 310)" : "var(--color-muted-foreground)" }}
      >
        {active ? "SYP 248,500" : "SYP 0"}
      </p>
      <div className="flex flex-col gap-1.5">
        {rows.map((r, i) => (
          <div
            key={r.label}
            className="flex justify-between rounded-lg px-3 py-1.5 text-[10px] transition-all duration-500"
            style={{
              background: "oklch(0.5 0 0 / 4%)",
              opacity: active ? 1 : 0.5,
              transitionDelay: `${i * 80}ms`,
            }}
          >
            <span className="text-muted-foreground">{r.label}</span>
            <span style={{ color: r.pos ? "oklch(0.72 0.18 142)" : "oklch(0.601 0.228 26)" }}>{r.val(active)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
