"use client"

import React from "react"
import { MainHero, SecondaryHero, ProductHero } from "@/components/heroes"

export default function TestPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-royal-600 p-8">Component Test Page</h1>
      
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
        <SecondaryHero 
          heading="Rights Management Made Simple"
          subheading="Effortlessly manage your music catalog, track performances, and collect royalties from streaming platforms worldwide."
          backgroundPattern="grid"
          showBreadcrumbs={true}
          breadcrumbs={[
            { label: "Solutions", href: "/solutions" },
            { label: "Rights Management", href: "/solutions/rights-management" },
          ]}
        />
        <ProductHero 
          heading="Analytics Dashboard"
          subheading="Make data-driven decisions with our comprehensive analytics suite."
          ctaButton={{
            text: "View Live Demo",
            url: "/products/analytics",
          }}
          features={[
            "Real-time performance tracking",
            "Revenue forecasting with ML",
            "Territory-specific insights",
            "Custom reports and alerts"
          ]}
          productImage={{
            url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
            alt: "Analytics Dashboard Interface",
          }}
        />
    </div>
  )
}
