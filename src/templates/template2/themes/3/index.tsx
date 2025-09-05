import React from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import HowItWorksSection from "./HowItWorksSection";
import CtaSection from "./CtaSection";
import PricingSection from "./PricingSection";

export default function Theme() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection/>
      <PricingSection/>
      <CtaSection />
    </>
  );
}