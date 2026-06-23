"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { getOppositeLocale } from "@/lib/i18n";
import { type ILocale } from "@/i18n/routing";
import { type ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Button>, "onClick" | "dir" | "children">;

export function LangToggle(props: Props) {
  const t = useTranslations("nav");
  const locale = useLocale() as ILocale;
  const router = useRouter();
  const pathname = usePathname();

  function toggle() {
    router.replace(pathname, { locale: getOppositeLocale(locale) });
  }

  return (
    <Button variant="outline" size="icon-sm" onClick={toggle} dir="ltr" {...props}>
      {t("langToggle")}
    </Button>
  );
}
