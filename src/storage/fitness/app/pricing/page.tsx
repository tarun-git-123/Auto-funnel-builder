import PricingHero from "../../components/pricing/PricingHero";
import PricingTabs from "../../components/pricing/PricingTabs";
import CtaSection from "../../components/home/CtaSection";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
}

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingTabs/>
      <CtaSection />
    </>
  );
}