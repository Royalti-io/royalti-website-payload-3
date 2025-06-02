import React from 'react'
import { MainHero } from '@/components/heroes/MainHero'

export const HomePage: React.FC = () => {
  return (
    <MainHero 
      heading="Transform Your Music Publishing with Royalti.io"
      subheading="Streamline your music publishing workflow with comprehensive rights management."
      announcement="🎉 New: AI-Powered Royalty Tracking"
      ctaButton={{
        text: "Start Free Trial",
        url: "/signup",
        variant: "royal",
      }}
      secondaryButton={{
        text: "Watch Demo", 
        url: "/demo",
        variant: "outline",
      }}
      features={[
        "Automated royalty distribution",
        "Real-time analytics dashboard", 
        "Global rights management",
        "Direct pay worldwide"
      ]}
      statistics={[
        { value: "$50M+", label: "Royalties Processed" },
        { value: "100K+", label: "Songs Managed" },
        { value: "99.9%", label: "Accuracy Rate" },
        { value: "50+", label: "Countries" }
      ]}
      backgroundImage={{
        url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
        alt: "Music studio background",
      }}
    />
  )
}
