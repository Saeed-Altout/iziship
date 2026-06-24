import { getTranslations } from "next-intl/server";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";
import { MarketingBanner } from "@/components/marketing/banner";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: `${t("meta.title")} — iziship`,
    description: t("meta.description"),
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");

  const sections = [
    "collection",
    "use",
    "sharing",
    "retention",
    "security",
    "rights",
    "cookies",
    "changes",
    "contact",
  ] as const;

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Cairo', 'Tajawal', sans-serif", WebkitFontSmoothing: "antialiased" }}>
      <MarketingBanner />
      <MarketingNav />

      <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-500">
            {t("kicker")}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("h1")}
          </h1>
          <p className="mt-4 text-[15px] text-muted-foreground">{t("updated")}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            {t("intro")}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((key) => (
            <section key={key}>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                {t(`sections.${key}.title`)}
              </h2>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {t(`sections.${key}.body`)}
              </p>
            </section>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-14 border-t border-border pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-[13px] font-medium text-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="rtl:rotate-180"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            {t("back")}
          </Link>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
