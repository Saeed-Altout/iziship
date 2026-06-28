"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const STAGE_COUNT = 5;

type TrackingResult =
  | { found: false }
  | {
      found: true;
      trackingNumber: string;
      currentStage: number;
    };

function StageTimeline({
  currentStage,
  stages,
}: {
  currentStage: number;
  stages: string[];
}) {
  return (
    <ol className="relative mt-8 flex flex-col gap-0">
      {stages.map((label, i) => {
        const done = i < currentStage;
        const active = i === currentStage;
        const last = i === stages.length - 1;

        return (
          <li key={i} className="flex items-start gap-4">
            {/* Connector column */}
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  done
                    ? "border-primary bg-primary text-primary-foreground"
                    : active
                      ? "border-primary bg-primary/12 text-primary"
                      : "border-border bg-muted text-muted-foreground",
                )}
              >
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6l2.8 2.8 5.2-5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span className="text-[11px] font-bold">{i + 1}</span>
                )}
              </span>
              {!last && (
                <span
                  className={cn(
                    "mt-1 w-0.5 flex-1 min-h-8",
                    done ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </div>

            {/* Label */}
            <div className={cn("pb-8", last && "pb-0")}>
              <p
                className={cn(
                  "pt-1 text-[14px] font-semibold",
                  done
                    ? "text-foreground"
                    : active
                      ? "text-primary"
                      : "text-muted-foreground",
                )}
              >
                {label}
              </p>
              {active && (
                <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                  <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                  Live
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function TrackingForm() {
  const t = useTranslations("tracking");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    setLoading(true);
    setResult(null);

    // Artificial delay simulating an API call
    await new Promise((r) => setTimeout(r, 700));

    // Demo: numbers starting with "IZI" return a found result
    if (trimmed.toUpperCase().startsWith("IZI")) {
      setResult({
        found: true,
        trackingNumber: trimmed.toUpperCase(),
        currentStage: 2,
      });
    } else {
      setResult({ found: false });
    }

    setLoading(false);
  }

  const stages: string[] = Array.from({ length: STAGE_COUNT }, (_, i) =>
    t(`stages.${i}`),
  );

  return (
    <div>
      {/* Search form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label
            htmlFor="tracking-input"
            className="mb-1.5 block text-[13px] font-medium text-foreground"
          >
            {t("inputLabel")}
          </label>
          <Input
            id="tracking-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t("inputPlaceholder")}
            className="h-11"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <Button type="submit" disabled={loading || !value.trim()} className="h-11 px-6 sm:shrink-0">
          {loading ? (
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          ) : (
            t("submit")
          )}
        </Button>
      </form>

      {/* Result */}
      {result && (
        <div className="mt-8">
          {result.found ? (
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 dark:border-white/8 dark:bg-[#0D1B2E]">
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {result.trackingNumber}
              </div>
              <p className="text-[13px] text-muted-foreground">
                {t("statusLabel")}: <span className="font-semibold text-primary">{stages[result.currentStage]}</span>
              </p>
              <StageTimeline currentStage={result.currentStage} stages={stages} />
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
              <p className="text-[15px] font-semibold text-foreground">{t("notFound.title")}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{t("notFound.body")}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
