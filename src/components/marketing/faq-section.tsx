"use client";

import { useTranslations } from "next-intl";
import { Section, SectionBadge, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Animate } from "@/components/ui/animate";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQ_COUNT = 8;

export function FAQSection() {
  const t = useTranslations("faq");

  return (
    <Section id="faq" padding="large" className="relative overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(var(--color-border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Header — centered top ── */}
      <div className="mb-12 flex flex-col items-center text-center md:mb-14">
        <SectionBadge className="mb-4">{t("kicker")}</SectionBadge>
        <SectionTitle className="mb-3">{t("h2")}</SectionTitle>
        <SectionSubtitle>{t("sub")}</SectionSubtitle>
      </div>

      {/* ── Accordion ── */}
      <Animate variant="blurUp" delay={0.18}>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible defaultValue="0" className="w-full" suppressHydrationWarning>
            {Array.from({ length: FAQ_COUNT }, (_, i) => (
              <AccordionItem key={i} value={String(i)} className="border-border">
                <AccordionTrigger className="py-5 text-[15px] font-semibold text-foreground hover:no-underline hover:text-primary">
                  {t(`items.${i}.q`)}
                </AccordionTrigger>
                <AccordionContent className="text-[14px] leading-[1.75] text-muted-foreground">
                  {t(`items.${i}.a`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Still have questions */}
          <div className="mt-10 text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-[14px] font-bold text-primary transition-opacity hover:opacity-75"
            >
              {t("stillQuestions")}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </Animate>
    </Section>
  );
}
