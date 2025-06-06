import React from 'react'
import {
  // HeroSection,
  SocialProofBar,
  ProblemSolution,
  CoreValuePillars,
  ProductDemo,
  CustomerSuccessStories,
  FeatureComparison,
  PricingSection,
  TrustSecuritySection,
  FAQSection,
  FinalCTASection
} from '@/components/sections'
import { MainHero } from '@/components/heroes/MainHero'
import { HeroSection } from '@/components/ui/hero-section'
import { Icons } from '@/components/ui/icons'

export const HomePage: React.FC = () => {
  return (
    <>      
      <HeroSection
        // badge={{
        //   text: "Introducing our new components",
        //   action: {
        //     text: "Learn more",
        //     href: "/docs",
        //   },
        // }}
        title="All-in-one workspace for music business"
        description="Royalti.io is a comprehensive platform that streamlines your music publishing workflow with comprehensive rights management."
        actions={[
          {
            text: "Get Started",
            href: "/docs/getting-started",
            variant: "default",
          },
          {
            text: "Watch Demo",
            href: "/demo",
            variant: "glow",
            // icon: <Icons.gitHub className="h-5 w-5" />,
          },
        ]}
        image={{
          light: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1248&auto=format&fit=crop",
          dark: "/api/media/file/royalti-io-home-hero-image.png",
          alt: "UI Components Preview",
        }}
      />
      <SocialProofBar />
      <ProblemSolution />
      <CoreValuePillars />
      <ProductDemo />
      <PricingSection />
      <TrustSecuritySection />
      <FAQSection />
      <FinalCTASection />
    </>
  )
}
