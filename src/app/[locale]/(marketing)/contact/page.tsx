import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ContactForm } from "@/components/forms/contact-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: `${t("h2")} — iziship`,
    description: t("sub"),
  };
}

function CheckRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-[14px] text-muted-foreground">
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/12">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
          <path d="M2 5.5l2.3 2.3 4.7-4.6" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {children}
    </li>
  );
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <main className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(var(--color-border) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,oklch(0.541_0.233_258/6%),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left — copy */}
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-500">
              {t("kicker")}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("h2")}
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              {t("sub")}
            </p>

            <ul className="mt-8 flex flex-col gap-3" role="list">
              {[0, 1, 2].map((i) => (
                <CheckRow key={i}>{t(`perks.${i}`)}</CheckRow>
              ))}
            </ul>

            <div className="mt-10 border-t border-border pt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-[13px] font-medium text-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="rtl:rotate-180"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                {t("back")}
              </Link>
            </div>
          </div>

          {/* Right — form card */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[0_4px_32px_oklch(0.541_0.233_258/8%)] sm:p-8 dark:border-white/8 dark:bg-[#0D1B2E]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
            <h2 className="mb-6 text-[18px] font-extrabold text-foreground">{t("formTitle")}</h2>
            <ContactForm />
          </div>

        </div>
      </div>
    </main>
  );
}
