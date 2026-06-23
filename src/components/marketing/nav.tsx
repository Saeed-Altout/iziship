"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MarketingNav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isAr = locale === "ar";

  const links = [
    { label: t("links.howItWorks"),   href: "#how" },
    { label: t("links.features"),     href: "#features" },
    { label: t("links.forMerchants"), href: "#audience" },
    { label: t("links.forCarriers"),  href: "#audience" },
    { label: t("links.integrations"), href: "#int" },
  ];

  function toggleLang() {
    router.replace(pathname, { locale: isAr ? "en" : "ar" });
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border transition-all",
        scrolled ? "bg-background/92 backdrop-saturate-180 backdrop-blur-md" : "bg-background/98"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
        <a href="#" className="shrink-0" dir="ltr">
          <Image src="/logo.svg" alt="iziship" width={130} height={36} priority className="h-9 w-auto" />
        </a>

        <nav className="ms-auto hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-lg px-3 py-1.5 text-[14.5px] font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2 md:ms-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={toggleLang}
            className="rounded-lg bg-primary/10 font-bold text-primary hover:bg-primary hover:text-primary-foreground"
            dir="ltr"
          >
            {t("langToggle")}
          </Button>

          <Button
            asChild
            size="sm"
            className="rounded-xl bg-accent font-bold text-accent-foreground shadow-[0_8px_20px_color-mix(in_oklch,var(--accent)_30%,transparent)] hover:bg-accent/90"
          >
            <a href="#cta">{t("cta")}</a>
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {menuOpen ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-background px-6 pb-5 pt-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-border py-2.5 text-[15px] font-semibold text-muted-foreground last:border-0 hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
