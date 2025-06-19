import React from 'react'
import { Metadata } from 'next'

import { HeroSection } from './components/HeroSection'
import { ProblemsSection } from './components/ProblemsSection'
import { FeaturesSection } from './components/FeaturesSection'
import { SuccessStoriesSection } from './components/SuccessStoriesSection'
import { WorkflowSection } from './components/WorkflowSection'
import { ROICalculator } from './components/ROICalculator'
import { IntegrationSection } from './components/IntegrationSection'
import { PricingSection } from './components/PricingSection'
import { ImplementationSection } from './components/ImplementationSection'
import { FinalCTASection } from './components/FinalCTASection'

export const metadata: Metadata = {
  title: 'For Record Labels | Royalti.io - Scale Your Label Without Administrative Headaches',
  description: 'From 10 artists to 1,000+ – Royalti.io automates your entire royalty workflow so you can focus on discovering and developing talent, not drowning in spreadsheets.',
  keywords: [
    'record label management',
    'royalty automation',
    'music label software',
    'artist management',
    'royalty distribution',
    'label administration',
    'music industry technology'
  ],
  openGraph: {
    title: 'Record Label Management Software | Royalti.io',
    description: 'Scale your record label from 10 to 1,000+ artists with automated royalty management, transparent reporting, and seamless artist relations.',
    type: 'website',
  }
}

export default function LabelsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <ProblemsSection />
      <FeaturesSection />
      <SuccessStoriesSection />
      <WorkflowSection />
      <ROICalculator />
      <IntegrationSection />
      <PricingSection />
      <ImplementationSection />
      <FinalCTASection />
    </main>
  )
}