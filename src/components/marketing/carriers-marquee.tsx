"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Marquee } from "@/components/ui/marquee";
import { CARRIERS } from "@/constants";

export function CarriersMarquee() {
  const t = useTranslations("hero");

  const items = [...CARRIERS, ...CARRIERS];

  return (
    <div className="border-t border-border bg-background/80 pb-6 pt-5">
      <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        {t("carriersLabel")}
      </p>

      <div className="relative flex w-full flex-col items-center justify-center gap-1 overflow-hidden pt-4">
        <Marquee
          pauseOnHover
          repeat={10}
          className="[--duration:500s] [--gap:5rem]"
        >
          {items.map((c, i) => (
            <div key={i} className="flex shrink-0 items-center">
              <Image
                src={c.src}
                alt={c.name}
                width={120}
                height={40}
                className="h-8 w-auto object-contain brightness-0 opacity-40 transition-all duration-300 hover:brightness-100 hover:opacity-100 dark:invert dark:opacity-70 dark:hover:invert-0 dark:hover:opacity-100"
              />
            </div>
          ))}
        </Marquee>

        {/* Stylish gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-background/95 to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-linear-to-l from-background/95 to-transparent"></div>
      </div>
    </div>
  );
}
