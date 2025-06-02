import type { Metadata } from 'next'

import React from 'react'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { generateMeta } from '@/utilities/generateMeta'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { homeStatic } from '@/endpoints/seed/home-static'

import type { Page as PageType } from '@/payload-types'

import HomePageClient from './page.client'
import { HomePage as HomePageContent } from './HomePage'

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
      <HomePageContent />
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