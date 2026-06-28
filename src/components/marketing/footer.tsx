"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/marketing/logo";

const TWITTER_PATH =
  "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z";
const LINKEDIN_PATH =
  "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z";

const MERGED_HREFS = ["#platform-features", "#audience", "#faq", "#contact"];
const LEGAL_HREFS = ["/privacy", "/terms", "/cookie-policy"] as const;

export function MarketingFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 py-12 sm:flex-row sm:items-start sm:justify-between sm:py-14">
          {/* Brand */}
          <div className="flex flex-col items-start gap-3 sm:max-w-55">
            <Logo />
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8">
            {/* Merged: Product + Company */}
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground">
                {t("links.merged.title")}
              </p>
              <ul className="flex flex-col gap-2.5">
                {MERGED_HREFS.map((href, i) => (
                  <li key={i}>
                    <a
                      href={href}
                      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t(`links.merged.items.${i}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground">
                {t("links.legal.title")}
              </p>
              <ul className="flex flex-col gap-2.5">
                {LEGAL_HREFS.map((href, i) => (
                  <li key={i}>
                    <Link
                      href={href}
                      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t(`links.legal.items.${i}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar (no separator) ── */}
        <div className="flex flex-col items-center gap-4 pb-8 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-5">
            <p className="text-[12px] text-muted-foreground">
              {t("copyright")}
            </p>
            <div className="flex items-center gap-2">
              {[
                { label: "Twitter / X", path: TWITTER_PATH },
                { label: "LinkedIn", path: LINKEDIN_PATH },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
