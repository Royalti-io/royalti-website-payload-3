import type { Metadata } from 'next'

import React from 'react'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { generateMeta } from '@/utilities/generateMeta'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { homeStatic } from '@/endpoints/seed/home-static'

import type { Page as PageType } from '@/payload-types'

import HomePageClient from './page.client'
import { MainHero } from '@/components/heroes'

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const slug = 'home'
  const url = '/'

  let page: PageType | null = null

  // Try to get the homepage from the database
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  page = result.docs?.[0] || null

  // If no page is found in the database, use the static home data
  if (!page) {
    page = homeStatic
  }
  
  // Fallback for error handling
  if (!page) {
    return <PayloadRedirects url={url} />
  }
  
  const { layout } = page

  return (
    <article className="min-h-screen">
      <HomePageClient />
      <PayloadRedirects disableNotFound url={url} />

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
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Royalty Management Made Simple</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-gray-50">
              <h3 className="text-xl font-semibold mb-3">Rights Management</h3>
              <p className="text-gray-600">Easily manage music rights, sync licensing, and royalty distributions all in one platform.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-gray-50">
              <h3 className="text-xl font-semibold mb-3">Financial Tracking</h3>
              <p className="text-gray-600">Track revenue streams, generate reports, and distribute royalties with precision.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-gray-50">
              <h3 className="text-xl font-semibold mb-3">PRO Integration</h3>
              <p className="text-gray-600">Seamlessly integrate with performing rights organizations for efficient work registration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <RenderBlocks blocks={layout} />

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Manage Your Royalties?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Join thousands of artists and publishers who trust Royalti.io to manage their music rights and royalties.</p>
          <div className="flex justify-center gap-4">
            <Link href="/contact" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Get Started</Link>
            <Link href="/demo" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">Request Demo</Link>
          </div>
        </div>
      </section>
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'home'
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: draft } = await draftMode()

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const page = result.docs?.[0] || homeStatic

  return generateMeta({ doc: page })
}