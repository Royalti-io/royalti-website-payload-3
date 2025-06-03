import React from 'react'
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
          light: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1248&auto=format&fit=crop",
          dark: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1248&auto=format&fit=crop",
          alt: "UI Components Preview",
        }}
      />
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
    </>
  )
}
