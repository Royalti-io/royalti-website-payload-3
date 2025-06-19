import React from 'react'
import { Metadata } from 'next'

import { DistributorHeroSection } from './components/DistributorHeroSection'
import { DistributionChallengesSection } from './components/DistributionChallengesSection'
import { DistributionFeaturesSection } from './components/DistributionFeaturesSection'
import { DistributionSuccessStoriesSection } from './components/DistributionSuccessStoriesSection'
import { DistributionWorkflowSection } from './components/DistributionWorkflowSection'
import { DistributionROICalculator } from './components/DistributionROICalculator'
import { DistributionIntegrationSection } from './components/DistributionIntegrationSection'
import { DistributionPricingSection } from './components/DistributionPricingSection'
import { DistributionImplementationSection } from './components/DistributionImplementationSection'
import { DistributionFinalCTASection } from './components/DistributionFinalCTASection'

export const metadata: Metadata = {
  title: 'For Music Distributors | Royalti.io - Power Your Distribution with Automated Royalty Intelligence',
  description: 'Process millions of transactions for thousands of artists with enterprise-grade accuracy. Royalti.io handles the complexity while you focus on acquiring and serving more clients.',
  keywords: [
    'music distribution software',
    'royalty automation',
    'digital distribution platform',
    'bulk royalty processing',
    'white-label distribution',
    'music technology',
    'distribution api',
    'enterprise music software'
  ],
  openGraph: {
    title: 'Music Distribution Software | Royalti.io',
    description: 'Power your distribution with automated royalty intelligence. Process millions of transactions with enterprise-grade accuracy and scale operations efficiently.',
    type: 'website',
  }
}

export default function DistributorsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <DistributorHeroSection />
      <DistributionChallengesSection />
      <DistributionFeaturesSection />
      <DistributionSuccessStoriesSection />
      <DistributionWorkflowSection />
      <DistributionROICalculator />
      <DistributionIntegrationSection />
      <DistributionPricingSection />
      <DistributionImplementationSection />
      <DistributionFinalCTASection />
    </main>
  )
}