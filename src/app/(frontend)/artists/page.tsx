import { Metadata } from 'next'
import { HeroSection } from './HeroSection'
import { PainPointsSection } from './PainPointsSection'
import { FeaturesSection } from './FeaturesSection'
import { SuccessStoriesSection } from './SuccessStoriesSection'
import { WorkflowSection } from './WorkflowSection'
import { PricingSection } from './PricingSection'
import { FinalCTASection } from './FinalCTASection'

export const metadata: Metadata = {
  title: 'Royalti.io for Artists - Finally, See Every Penny Your Music Earns',
  description: 'Stop wondering "where\'s my money?" Get real-time visibility into your streaming royalties, collaborator splits, and earnings from every platform – all in one beautiful dashboard.',
  keywords: 'music royalties for artists, streaming royalty tracking, artist earnings dashboard, music collaboration splits, independent artist tools',
  openGraph: {
    title: 'Royalti.io for Artists - Complete Music Earnings Transparency',
    description: 'Track every stream, understand every payment, and make data-driven decisions about your music career with real-time royalty insights.',
    images: ['/og-artists.jpg'],
  },
}

export default function ArtistsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <HeroSection />
      <PainPointsSection />
      <FeaturesSection />
      <SuccessStoriesSection />
      <WorkflowSection />
      <PricingSection />
      <FinalCTASection />
    </main>
  )
}
