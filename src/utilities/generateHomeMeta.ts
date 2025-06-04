import type { Metadata } from 'next'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

export const generateHomeMeta = (): Metadata => {
  const title = 'Music Royalty Management Software | 90-Day Free Trial | Royalti.io'
  const description = 'Transform royalty chaos into automated clarity. Join 500+ music professionals using Royalti.io for transparent royalty management. 90-day free trial, no credit card required.'
  const url = getServerSideURL()
  
  return {
    title,
    description,
    keywords: [
      'music royalty management software',
      'royalty tracking',
      'music catalog management', 
      'artist royalty software',
      'music industry automation',
      'royalty calculation',
      'music business platform',
      'artist payments',
      'music rights management',
      'royalty reporting'
    ],
    authors: [{ name: 'Royalti.io' }],
    creator: 'Royalti.io',
    publisher: 'Royalti.io',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: mergeOpenGraph({
      title,
      description,
      url: '/',
      siteName: 'Royalti.io',
      images: [
        {
          url: `${url}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Royalti.io - Music Royalty Management Platform',
        },
      ],
      type: 'website',
    }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@royalti_io',
      images: [`${url}/og-image.jpg`],
    },
    alternates: {
      canonical: url,
    },
  }
}
