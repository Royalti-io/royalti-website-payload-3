import React from 'react'
import {
  HeroSection,
  SocialProofBar,
  ProblemSolution,
  CoreValuePillars,
  ProductDemo,
  CustomerSuccessStories,
  FeatureComparison,
  PricingSection,
  FAQSection,
  FinalCTASection
} from '@/components/sections'

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <SocialProofBar />
      <ProblemSolution />
      <CoreValuePillars />
      <ProductDemo />
      <CustomerSuccessStories />
      <FeatureComparison />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
    </>
  )
}
