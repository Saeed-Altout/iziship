import { type ILocale } from "@/i18n/routing";

const RTL_LOCALES: ILocale[] = ["ar"];

/** "rtl" | "ltr" */
export function getDir(locale: ILocale): "rtl" | "ltr" {
  return RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
}

/** true when locale reads right-to-left */
export function isRtl(locale: ILocale): boolean {
  return RTL_LOCALES.includes(locale);
}

/** The other locale to switch to */
export function getOppositeLocale(locale: ILocale): ILocale {
  return locale === "ar" ? "en" : "ar";
}

/** Sheet / drawer side based on reading direction */
export function getSheetSide(locale: ILocale): "left" | "right" {
  return isRtl(locale) ? "left" : "right";
}
