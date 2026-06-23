"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

const NAV_LINKS = {
  en: [
    { label: "How it works", href: "#how" },
    { label: "Features", href: "#features" },
    { label: "For merchants", href: "#audience" },
    { label: "For carriers", href: "#audience" },
    { label: "Integrations", href: "#int" },
  ],
  ar: [
    { label: "كيف يعمل", href: "#how" },
    { label: "الميزات", href: "#features" },
    { label: "للتجار", href: "#audience" },
    { label: "شركات الشحن", href: "#audience" },
    { label: "التكاملات", href: "#int" },
  ],
};

export function MarketingNav() {
  const locale = useLocale() as "en" | "ar";
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
  const links = isAr ? NAV_LINKS.ar : NAV_LINKS.en;
  const ctaLabel = isAr ? "ابدأ مجاناً" : "Start Free";
  const langLabel = isAr ? "EN" : "ع";

  function toggleLang() {
    router.replace(pathname, { locale: isAr ? "en" : "ar" });
  }

  return (
    <header
      className="sticky top-0 z-50 transition-all"
      style={{
        background: scrolled
          ? "rgba(255,255,255,0.92)"
          : "rgba(255,255,255,0.98)",
        backdropFilter: "saturate(180%) blur(12px)",
        borderBottom: "1px solid #EEF1F6",
      }}
    >
      <div
        className="flex items-center gap-6 mx-auto px-6"
        style={{ maxWidth: 1280, height: 64 }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0" style={{ direction: "ltr" }}>
          <span
            className="flex items-center justify-center shrink-0"
            style={{
              width: 34,
              height: 34,
              background: "#1B6EF3",
              borderRadius: 10,
            }}
          >
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
              <path
                d="M3 14 L10 4 L17 14"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="17" cy="14" r="3" fill="#FF6B2C" stroke="white" strokeWidth="1.5" />
            </svg>
          </span>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#14181F", letterSpacing: "-0.02em", direction: "ltr" }}>
            <span style={{ fontWeight: 500 }}>izi</span>
            <span style={{ fontWeight: 800 }}>ship</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1" style={{ marginInlineStart: "auto" }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontSize: 14.5,
                fontWeight: 600,
                color: "#4A5568",
                padding: "6px 12px",
                borderRadius: 8,
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1B6EF3")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4A5568")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2" style={{ marginInlineStart: "auto" }}>
          {/* Lang toggle */}
          <button
            onClick={toggleLang}
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#1B6EF3",
              background: "#E8F0FF",
              borderRadius: 9,
              padding: "9px 13px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.15s",
              direction: "ltr",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1B6EF3";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#E8F0FF";
              e.currentTarget.style.color = "#1B6EF3";
            }}
          >
            {langLabel}
          </button>

          {/* CTA */}
          <a
            href="#cta"
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              background: "#FF6B2C",
              borderRadius: 12,
              padding: "9px 18px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e85a1c")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#FF6B2C")}
          >
            {ctaLabel}
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <path d="M5 5L17 17M17 5L5 17" stroke="#14181F" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 6h16M3 11h16M3 16h16" stroke="#14181F" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            background: "#fff",
            borderTop: "1px solid #EEF1F6",
            padding: "12px 24px 20px",
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                fontSize: 15,
                fontWeight: 600,
                color: "#4A5568",
                padding: "10px 0",
                textDecoration: "none",
                borderBottom: "1px solid #F3F4F6",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
