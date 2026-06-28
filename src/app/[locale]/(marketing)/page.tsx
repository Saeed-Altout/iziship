import { HeroSection } from "@/components/marketing/hero";
import { SmartRoutingSection } from "@/components/marketing/smart-routing";
import { AudienceDualCTASection } from "@/components/marketing/audience-dual-cta";
import { PlatformFeaturesSection } from "@/components/marketing/platform-features";
import { CTASection } from "@/components/marketing/cta-section";
import { FAQSection } from "@/components/marketing/faq-section";
import { ContactSection } from "@/components/marketing/contact-section";

export default function MarketingPage() {
  return (
    <main>
      <HeroSection />
      <SmartRoutingSection />
      <AudienceDualCTASection />
      <PlatformFeaturesSection />
      {/* <StatsBarSection /> */}
      <CTASection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
