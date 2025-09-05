import React from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import HowItWorksSection from "./HowItWorksSection";
import CtaSection from "./CtaSection";
import "../globals.css";
import PricingSection from "./PricingSection";

export default function Home() {
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