"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function MarketingFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="relative overflow-hidden border-t border-white/6 bg-[#060F1E]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,oklch(0.541_0.233_258/8%),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Main row ── */}
        <div className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between sm:py-14">

          {/* Brand */}
          <div className="flex flex-col items-start gap-3 sm:max-w-xs">
            <div dir="ltr">
              <Image src="/logo-dark.svg" alt="iziship" width={110} height={30} className="h-8 w-auto" />
            </div>
            <p className="text-[13px] leading-relaxed text-white/45">
              {t("tagline")}
            </p>
            {/* Social links */}
            <div className="mt-1 flex items-center gap-3">
              {[
                { label: "Twitter / X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { label: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/40 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white/70"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {(["product", "company", "legal"] as const).map((group) => (
              <div key={group}>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/30">
                  {t(`links.${group}.title`)}
                </p>
                <ul className="flex flex-col gap-2">
                  {[0, 1, 2].map((i) => {
                    const legalHrefs = ["/privacy", "/terms", "/cookie-policy"] as const;
                    const productHrefs = ["#platform-features", "#audience", "#faq"] as const;
                    const companyHrefs = ["#contact", "#faq", "#contact"] as const;
                    const isLegal = group === "legal";
                    const href = isLegal
                      ? legalHrefs[i]
                      : group === "product"
                      ? productHrefs[i]
                      : companyHrefs[i];
                    return (
                      <li key={i}>
                        {isLegal ? (
                          <Link
                            href={legalHrefs[i]}
                            className="text-[13px] text-white/45 transition-colors hover:text-white/80"
                          >
                            {t(`links.${group}.items.${i}`)}
                          </Link>
                        ) : (
                          <a
                            href={href}
                            className="text-[13px] text-white/45 transition-colors hover:text-white/80"
                          >
                            {t(`links.${group}.items.${i}`)}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center gap-2 border-t border-white/6 py-5 sm:flex-row sm:justify-between">
          <p className="text-[12px] text-white/30">{t("copyright")}</p>
          <div className="flex items-center gap-1.5">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            <p className="text-[12px] text-white/30">{t("status")}</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
