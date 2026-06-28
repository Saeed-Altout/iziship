export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-7 bg-background">

      {/* Dot-grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(color-mix(in oklch, var(--foreground) 12%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in oklch, var(--primary) 8%, transparent), transparent 68%)",
        }}
      />

      {/* Orbital loader */}
      <div className="relative size-[72px]" role="status" aria-label="Loading">
        {/* Static ring */}
        <div className="absolute inset-0 rounded-full border border-primary/20" />
        {/* Orbits */}
        <div className="absolute inset-0 animate-spin rounded-full [animation-duration:1.4s] before:absolute before:left-1/2 before:top-0 before:size-[7px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-primary before:shadow-[0_0_10px_var(--color-primary),0_0_20px_color-mix(in_oklch,var(--color-primary)_45%,transparent)]" />
        <div className="absolute inset-3 animate-spin rounded-full [animation-direction:reverse] [animation-duration:2s] before:absolute before:left-1/2 before:top-0 before:size-[5px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-primary/65" />
        <div className="absolute inset-6 animate-spin rounded-full [animation-duration:2.8s] before:absolute before:left-1/2 before:top-0 before:size-[4px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-primary/40" />
        {/* Hub icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true" className="animate-pulse text-primary"
          >
            <path d="M5 8h14M5 8a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v0a2 2 0 01-2 2M5 8l1 10a2 2 0 002 2h8a2 2 0 002-2L19 8" />
          </svg>
        </div>
      </div>

      {/* Label */}
      <div className="relative z-10 flex flex-col items-center gap-1.5">
        <span className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          Loading
        </span>
        <div className="flex items-center gap-1" aria-hidden="true">
          <span className="size-[3.5px] animate-bounce rounded-full bg-primary opacity-50 [animation-delay:0ms]" />
          <span className="size-[3.5px] animate-bounce rounded-full bg-primary opacity-50 [animation-delay:200ms]" />
          <span className="size-[3.5px] animate-bounce rounded-full bg-primary opacity-50 [animation-delay:400ms]" />
        </div>
      </div>

    </div>
  );
}
