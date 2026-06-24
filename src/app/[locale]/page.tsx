import { MarketingBanner } from "@/components/marketing/banner";
import { MarketingNav } from "@/components/marketing/nav";
import { HeroSection } from "@/components/marketing/hero";
import { SmartRoutingSection } from "@/components/marketing/smart-routing";
import { AudienceDualCTASection } from "@/components/marketing/audience-dual-cta";
import { PriceCalculatorSection } from "@/components/marketing/price-calculator";
import { HowItWorksSection } from "@/components/marketing/how-it-works";
import { FeaturesSection } from "@/components/marketing/features";
import { JourneyStepperSection } from "@/components/marketing/journey-stepper";
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
        <PriceCalculatorSection />
        <HowItWorksSection />
        <FeaturesSection />
        <JourneyStepperSection />
        <IntegrationsSection />
        <StatsBarSection />
        <CTASection />
      </main>
      <MarketingFooter />
    </div>
  );
}