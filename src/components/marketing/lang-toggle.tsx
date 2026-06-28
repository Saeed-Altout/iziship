"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { getOppositeLocale } from "@/lib/i18n";
import { type ILocale } from "@/i18n/routing";
import { type ComponentProps } from "react";

type Props = Omit<ComponentProps<"button">, "onClick" | "dir" | "children"> & {
  size?: "default" | "sm";
};

const LABELS: Record<ILocale, string> = { en: "English", ar: "العربية" };

export function LangToggle({ size, className, ...props }: Props) {
  const locale = useLocale() as ILocale;
  const router = useRouter();
  const pathname = usePathname();

  function toggle() {
    router.replace(pathname, { locale: getOppositeLocale(locale) });
  }

  const isSmall = size === "sm";

  return (
    <button
      onClick={toggle}
      dir="ltr"
      aria-label="Switch language"
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 text-[13px] font-medium text-muted-foreground transition-colors hover:border-border/80 hover:text-foreground ${isSmall ? "h-8" : "h-9"} ${className ?? ""}`}
      {...props}
    >
      {/* Globe icon */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
      <span>{LABELS[getOppositeLocale(locale) as ILocale]}</span>
    </button>
  );
}
