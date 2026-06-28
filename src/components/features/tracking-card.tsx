"use client";

const CARD_CLS =
  "h-52 w-full overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-lg dark:border-white/10 dark:bg-[#0D1B2E] dark:shadow-2xl";

const stages = ["Created", "Picked up", "In transit", "Out for delivery", "Delivered"];

export function TrackingCard({ active }: { active: boolean }) {
  const activeStage = active ? 3 : 1;
  return (
    <div className={`${CARD_CLS} flex flex-col`}>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-bold text-foreground">Order #OID-3443-111</p>
        <span
          className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-colors duration-500"
          style={{
            background: active ? "oklch(0.70 0.18 30 / 15%)" : "oklch(0.5 0 0 / 6%)",
            color: active ? "oklch(0.70 0.18 30)" : "var(--color-muted-foreground)",
          }}
        >
          {active ? "Out for delivery" : "In transit"}
        </span>
      </div>
      <div className="relative flex flex-1 flex-col justify-between">
        <div
          className="absolute left-2.25 top-2 w-0.5 rounded-full transition-all duration-700"
          style={{
            height: `${(activeStage / (stages.length - 1)) * 90}%`,
            background: "oklch(0.70 0.18 30)",
          }}
        />
        {stages.map((s, i) => (
          <div
            key={s}
            className="flex items-center gap-3 transition-opacity duration-500"
            style={{ opacity: i <= activeStage ? 1 : 0.3 }}
          >
            <div
              className="relative z-10 size-4 shrink-0 rounded-full border-2 transition-all duration-500"
              style={{
                background: i <= activeStage ? "oklch(0.70 0.18 30)" : "var(--color-card)",
                borderColor: i <= activeStage ? "oklch(0.70 0.18 30)" : "var(--color-border)",
                boxShadow: i === activeStage && active ? "0 0 8px oklch(0.70 0.18 30 / 50%)" : "none",
              }}
            />
            <p
              className="text-[10px] font-semibold transition-colors duration-500"
              style={{ color: i <= activeStage ? "var(--color-foreground)" : "var(--color-muted-foreground)" }}
            >
              {s}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
