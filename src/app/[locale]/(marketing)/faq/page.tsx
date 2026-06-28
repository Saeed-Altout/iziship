import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CTASection } from "@/components/marketing/cta-section";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  SectionBadge,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return {
    title: `${t("h2")} — iziship`,
    description: t("sub"),
  };
}

const FAQ_COUNT = 8;

export default async function FAQPage() {
  const t = await getTranslations("faq");

  const items = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    q: t(`items.${i}.q`),
    a: t(`items.${i}.a`),
  }));

  return (
    <main>
      {/* Narrow FAQ content */}
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <SectionBadge className="mb-4">{t("kicker")}</SectionBadge>
          <SectionTitle as="h1" className="mb-3">{t("h2")}</SectionTitle>
          <SectionSubtitle>{t("sub")}</SectionSubtitle>
        </div>

        <Accordion type="single" collapsible defaultValue="0" className="w-full" suppressHydrationWarning>
          {items.map(({ q, a }, i) => (
            <AccordionItem key={i} value={String(i)} className="border-border">
              <AccordionTrigger className="py-5 text-[15px] font-semibold text-foreground hover:no-underline hover:text-primary">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-[14px] leading-[1.75] text-muted-foreground">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[14px] font-bold text-primary transition-opacity hover:opacity-75"
          >
            {t("stillQuestions")}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="rtl:rotate-180">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

      </div>

      {/* Full-width CTA */}
      <CTASection />
    </main>
  );
}
