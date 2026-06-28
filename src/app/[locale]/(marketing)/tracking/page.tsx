import { getTranslations } from "next-intl/server";
import { TrackingForm } from "@/components/tracking/tracking-form";
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
  const t = await getTranslations({ locale, namespace: "tracking" });
  return {
    title: `${t("meta.title")} — iziship`,
    description: t("meta.description"),
  };
}

export default async function TrackingPage() {
  const t = await getTranslations("tracking");

  return (
    <main className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mb-10 flex flex-col items-center text-center">
        <SectionBadge className="mb-4">{t("kicker")}</SectionBadge>
        <SectionTitle as="h1" className="mb-3">{t("h1")}</SectionTitle>
        <SectionSubtitle>{t("sub")}</SectionSubtitle>
      </div>

      <TrackingForm />
    </main>
  );
}
