"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { IconX, IconArrowRight } from "@tabler/icons-react";

export function MarketingBanner() {
  const t = useTranslations("banner");
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative z-50 bg-accent px-10 py-2.5 text-accent-foreground">
      <div className="flex flex-col items-center justify-center gap-1.5 text-center sm:flex-row sm:gap-3">
        <p className="text-sm leading-snug font-medium">
          {t("text")}
        </p>

        <a
          href="#cta"
          className="inline-flex items-center gap-1 shrink-0 rounded-full border border-accent-foreground/25 bg-accent-foreground/10 px-3.5 py-1 text-xs font-semibold transition-colors hover:bg-accent-foreground/20"
        >
          {t("cta")}
          <IconArrowRight size={12} />
        </a>
      </div>

      <button
        onClick={() => setDismissed(true)}
        aria-label={t("close")}
        className="absolute end-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 opacity-60 transition-opacity hover:opacity-100"
      >
        <IconX size={14} />
      </button>
    </div>
  );
}
