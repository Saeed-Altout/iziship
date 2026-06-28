import { MarketingBanner } from "@/components/marketing/banner";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', 'Cairo', 'Tajawal', sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <MarketingBanner />
      <MarketingNav />
      {children}
      <MarketingFooter />
    </div>
  );
}
