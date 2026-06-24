import { MarketingBanner } from "@/components/marketing/banner";
import { MarketingNav } from "@/components/marketing/nav";
import { HeroSection } from "@/components/marketing/hero";
import { SmartRoutingSection } from "@/components/marketing/smart-routing";
import { AudienceDualCTASection } from "@/components/marketing/audience-dual-cta";
import { PlatformFeaturesSection } from "@/components/marketing/platform-features";
import { IntegrationsSection } from "@/components/marketing/integrations";
import {
  StatsBarSection,
  CTASection,
  MarketingFooter,
} from "@/components/marketing/audience-stats-cta-footer";

export default function MarketingPage() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Cairo', 'Tajawal', sans-serif", WebkitFontSmoothing: "antialiased" }}>
      <MarketingBanner />
      <MarketingNav />
      <main>
        <HeroSection />
        <SmartRoutingSection />
        <AudienceDualCTASection />
        <PlatformFeaturesSection />
        <IntegrationsSection />
        <StatsBarSection />
        <CTASection />
      </main>
      <MarketingFooter />
    </div>
  );
}
