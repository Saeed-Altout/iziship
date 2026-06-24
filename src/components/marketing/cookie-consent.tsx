"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { IconCookie, IconX } from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";

const STORAGE_KEY = "iziship_cookie_consent";

type ConsentState = "accepted" | "declined" | null;

export function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const [consent, setConsent] = useState<ConsentState>("accepted"); // hidden until we read storage

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ConsentState | null;
      setConsent(stored);
    } catch {
      setConsent(null);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setConsent("accepted");
  }

  function decline() {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
    } catch {}
    setConsent("declined");
  }

  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label={t("ariaLabel")}
      className="fixed bottom-4 end-4 z-[9999] w-full max-w-sm"
    >
      <div className="relative rounded-2xl border border-white/10 bg-[#0B1626]/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

        <div className="p-5">
          {/* Header */}
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-blue-500/15">
                <IconCookie size={16} className="text-blue-400" />
              </span>
              <p className="text-[14px] font-semibold text-white">
                {t("title")}
              </p>
            </div>
            <button
              onClick={decline}
              aria-label={t("decline")}
              className="mt-0.5 shrink-0 rounded-lg p-1 text-white/30 transition-colors hover:bg-white/5 hover:text-white/60"
            >
              <IconX size={14} />
            </button>
          </div>

          {/* Body */}
          <p className="mb-4 text-[13px] leading-relaxed text-white/55">
            {t("body")}{" "}
            <Link
              href="/cookie-policy"
              className="text-blue-400 underline-offset-2 hover:underline"
            >
              {t("learnMore")}
            </Link>
          </p>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={decline}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[13px] font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white/80"
            >
              {t("decline")}
            </button>
            <button
              onClick={accept}
              className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-blue-500"
            >
              {t("accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
