"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { getSheetSide } from "@/lib/i18n";
import { type ILocale } from "@/i18n/routing";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LangToggle } from "@/components/marketing/lang-toggle";

export function MarketingNav() {
  const t = useTranslations("nav");
  const scrolled = useScroll(8);
  const locale = useLocale() as ILocale;

  const links = [
    { label: t("links.features"), href: "#platform-features" },
    { label: t("links.whoItsFor"), href: "#audience" },
    { label: t("links.faq"), href: "#faq" },
    { label: t("links.contact"), href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md backdrop-saturate-180"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-6">
        {/* Logo */}
        <a href="#" className="me-4 shrink-0" dir="ltr">
          <Image
            src="/logo.svg"
            alt="iziship"
            width={0}
            height={0}
            priority
            className="h-9 w-auto"
            style={{ width: "auto" }}
          />
        </a>

        {/* Desktop nav */}
        <NavigationMenu viewport={false} className="hidden md:flex">
          <NavigationMenuList className="gap-0">
            {links.map((l) => (
              <NavigationMenuItem key={l.label}>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-[14px] font-medium text-muted-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent data-popup-open:bg-transparent data-open:bg-transparent",
                  )}
                >
                  <a href={l.href}>{l.label}</a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <LangToggle className="hidden md:inline-flex" />

          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href="#cta">{t("cta")}</a>
          </Button>

          {/* Mobile sheet trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden"
                aria-label="Toggle menu"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M3 5h14M3 10h14M3 15h14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </Button>
            </SheetTrigger>

            <SheetContent
              side={getSheetSide(locale)}
              className="flex flex-col p-0"
            >
              <SheetHeader className="border-b border-border px-6 py-4">
                <SheetTitle asChild>
                  <a href="#" dir="ltr">
                    <Image
                      src="/logo.svg"
                      alt="iziship"
                      width={0}
                      height={0}
                      className="h-8 w-auto"
                      style={{ width: "auto" }}
                    />
                  </a>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col px-4 py-3">
                {links.map((l) => (
                  <SheetClose asChild key={l.label}>
                    <a
                      href={l.href}
                      className="rounded-md px-3 py-2.5 text-[15px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-2 border-t border-border px-6 py-4">
                <Button asChild size="sm">
                  <a href="#cta">{t("cta")}</a>
                </Button>
                <LangToggle size="sm" className="w-full" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
