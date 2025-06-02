// scripts/seed-feature-content.js - Sample content for Royalti.io
import payload from 'payload'

const seedFeatureContent = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    local: true,
  })

  // Platform Features Page - Bento Grid
  const platformPage = await payload.create({
    collection: 'pages',
    data: {
      title: 'Platform Features - Royalti.io',
      slug: 'platform',
      metaTitle: 'Royalti.io Platform Features - Complete Music Royalty Management',
      metaDescription: 'Explore our comprehensive music royalty management platform. Real-time analytics, automated reporting, and revenue optimization tools.',
      content: [
        {
          blockType: 'secondaryHero',
          heading: 'Everything You Need to Manage Music Royalties',
          subheading: 'Professional-grade tools designed for artists, labels, and publishers who want complete control over their music revenue.',
          backgroundPattern: 'dots',
        },
        {
          blockType: 'bentoFeatureGrid',
          title: 'Platform Capabilities',
          subtitle: 'Our comprehensive suite of tools helps you track, analyze, and optimize every dollar of your music revenue.',
          features: [
            {
              size: 'large',
              icon: 'bar-chart',
              title: 'Advanced Analytics Dashboard',
              description: 'Get real-time insights into your earnings across all streaming platforms, territories, and time periods. Identify trends and optimize your revenue streams.',
              featured: true,
              backgroundGradient: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
              stats: {
                value: '$50M+',
                label: 'Revenue Tracked'
              },
              link: {
                text: 'View Analytics Demo',
                url: '/demo/analytics'
              }
            },
            {
              size: 'medium',
              icon: 'music',
              title: 'Multi-Platform Tracking',
              description: 'Connect all your streaming platforms and collect royalty data from Spotify, Apple Music, YouTube, and 150+ other services.',
              badge: 'Popular',
              link: {
                text: 'See Platforms',
                url: '/integrations'
              }
            },
            {
              size: 'small',
              icon: 'dollar-sign',
              title: 'Revenue Optimization',
              description: 'AI-powered insights to maximize your earnings.',
              backgroundGradient: 'linear-gradient(135deg, #006666 0%, #008080 100%)'
            },
            {
              size: 'tall',
              icon: 'shield',
              title: 'Enterprise Security',
              description: 'Bank-level encryption and security protocols protect your sensitive financial data. SOC 2 compliant with 99.9% uptime.',
              link: {
                text: 'Security Details',
                url: '/security'
              }
            },
            {
              size: 'medium',
              icon: 'users',
              title: 'Team Collaboration',
              description: 'Invite managers, accountants, and team members with customizable permissions and role-based access controls.',
              badge: 'New'
            },
            {
              size: 'wide',
              icon: 'trending-up',
              title: 'Automated Reporting & Insights',
              description: 'Generate professional reports automatically for investors, partners, and stakeholders. Export to PDF, Excel, or integrate with your existing tools.',
              backgroundGradient: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
              link: {
                text: 'Report Examples',
                url: '/reports'
              }
            }
          ]
        }
      ],
      status: 'published',
    },
  })

  // Homepage - Feature Showcase
  const homepageUpdate = await payload.update({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home'
      }
    },
    data: {
      content: [
        // Existing hero...
        {
          blockType: 'mainHero',
          announcement: '🎵 New Analytics Dashboard Launched!',
          heading: 'Simplify Music Royalty Management',
          subheading: 'Professional platform for artists, labels, and publishers to track, analyze, and optimize music revenue with real-time insights and automated reporting.',
          ctaButton: {
            text: 'Start Free Trial',
            url: '/signup',
          },
          secondaryButton: {
            text: 'Watch Demo',
            url: '/demo',
          },
          features: [
            { feature: 'Real-time Analytics' },
            { feature: 'Automated Reporting' },
            { feature: 'Multi-Platform Tracking' },
            { feature: 'Revenue Optimization' },
          ],
          statistics: [
            { value: '10,000+', label: 'Active Artists' },
            { value: '$50M+', label: 'Tracked Revenue' },
            { value: '99.9%', label: 'Uptime' },
            { value: '150+', label: 'Countries' },
          ],
        },
        // Add feature showcase
        {
          blockType: 'featureShowcase',
          title: 'See Your Revenue in Real-Time',
          subtitle: 'Our advanced analytics platform gives you complete visibility into your music earnings across all platforms and territories.',
          mainFeature: {
            title: 'Advanced Analytics Dashboard',
            description: 'Track every stream, download, and licensing deal in real-time. Our dashboard provides deep insights into your revenue patterns, helping you make data-driven decisions about your music career.',
            image: {
              url: '/images/dashboard-screenshot.jpg', // You'll need to upload this
              alt: 'Royalti.io Analytics Dashboard'
            },
            stats: [
              { value: '150+', label: 'Platforms' },
              { value: '<2min', label: 'Data Sync' }
            ]
          },
          features: [
            {
              icon: 'eye',
              title: 'Real-Time Monitoring',
              description: 'Get instant notifications when new royalties are detected. Never miss a payment or licensing opportunity again.'
            },
            {
              icon: 'trending-up',
              title: 'Performance Insights',
              description: 'Understand which songs, territories, and platforms generate the most revenue with detailed performance analytics.'
            },
            {
              icon: 'globe',
              title: 'Global Tracking',
              description: 'Monitor your earnings from 150+ countries and territories. See exactly where your music is performing best worldwide.'
            }
          ]
        },
        // Add classic feature grid
        {
          blockType: 'classicFeatureGrid',
          title: 'Why Artists Choose Royalti.io',
          subtitle: 'Join thousands of artists, labels, and publishers who trust us with their music revenue management.',
          columns: 3,
          variant: 'cards',
          backgroundColor: 'gray',
          features: [
            {
              icon: 'zap',
              title: 'Lightning Fast Setup',
              description: 'Connect your streaming platforms and start tracking royalties in under 5 minutes. No technical knowledge required.',
              badge: 'Quick Start',
              link: {
                text: 'Get Started',
                url: '/signup'
              }
            },
            {
              icon: 'check-circle',
              title: '99.9% Accuracy Guarantee',
              description: 'Our advanced algorithms ensure your royalty data is accurate down to the cent. We guarantee precision or your money back.',
              badge: 'Guaranteed'
            },
            {
              icon: 'heart',
              title: 'Built by Musicians',
              description: 'Created by artists who understand the challenges of managing music revenue. We built the platform we wished we had.',
            },
            {
              icon: 'users',
              title: '24/7 Expert Support',
              description: 'Get help from our team of music industry experts whenever you need it. Chat, email, or phone support available.',
            },
            {
              icon: 'settings',
              title: 'Powerful Integrations',
              description: 'Connect with your existing tools including QuickBooks, Spotify for Artists, Apple Music for Artists, and more.',
              link: {
                text: 'View Integrations',
                url: '/integrations'
              }
            },
            {
              icon: 'star',
              title: 'Industry Leading',
              description: 'Trusted by Grammy winners, chart-topping artists, and major record labels worldwide. Join the best in the business.',
              badge: 'Award Winning'
            }
          ]
        }
      ]
    }
  })

  // Pricing Page - Simple Classic Grid
  const pricingPage = await payload.create({
    collection: 'pages',
    data: {
      title: 'Pricing - Royalti.io',
      slug: 'pricing',
      metaTitle: 'Royalti.io Pricing - Transparent Music Royalty Management',
      metaDescription: 'Simple, transparent pricing for music royalty management. Start free, upgrade as you grow.',
      content: [
        {
          blockType: 'secondaryHero',
          heading: 'Simple, Transparent Pricing',
          subheading: 'Start tracking your music royalties for free. Upgrade as your career grows.',
          backgroundPattern: 'grid',
        },
        // Pricing cards would go here...
        {
          blockType: 'classicFeatureGrid',
          title: 'All Plans Include',
          subtitle: 'Every Royalti.io plan comes with these powerful features to help you manage your music revenue.',
          columns: 4,
          variant: 'default',
          features: [
            {
              icon: 'bar-chart',
              title: 'Real-Time Analytics',
              description: 'Monitor your earnings as they happen across all platforms.'
            },
            {
              icon: 'shield',
              title: 'Bank-Level Security',
              description: 'Your financial data is protected with enterprise-grade encryption.'
            },
            {
              icon: 'globe',
              title: 'Global Coverage',
              description: 'Track royalties from 150+ countries and territories worldwide.'
            },
            {
              icon: 'users',
              title: '24/7 Support',
              description: 'Get help from our music industry experts whenever you need it.'
            },
            {
              icon: 'settings',
              title: 'API Access',
              description: 'Integrate with your existing tools and workflows.'
            },
            {
              icon: 'trending-up',
              title: 'Revenue Optimization',
              description: 'AI-powered insights to maximize your earnings potential.'
            },
            {
              icon: 'eye',
              title: 'Detailed Reporting',
              description: 'Generate professional reports for stakeholders and partners.'
            },
            {
              icon: 'clock',
              title: 'Historical Data',
              description: 'Access up to 7 years of historical royalty information.'
            }
          ]
        }
      ],
      status: 'published',
    },
  })

  console.log('✅ Feature grid content seeded successfully!')
  console.log(`Platform page: ${platformPage.id}`)
  console.log(`Pricing page: ${pricingPage.id}`)
  
  process.exit(0)
}

seedFeatureContent()

// components/RenderBlocks.tsx - Updated with feature grid support
import { HeroRenderer } from '@/components/blocks/HeroRenderer'
import { FeatureGridRenderer } from '@/components/blocks/FeatureGridRenderer'
import { RichTextRenderer } from '@/components/blocks/RichTextRenderer'

const blockComponents = {
  // Hero components
  mainHero: HeroRenderer,
  secondaryHero: HeroRenderer,
  productHero: HeroRenderer,
  
  // Feature grid components
  classicFeatureGrid: FeatureGridRenderer,
  bentoFeatureGrid: FeatureGridRenderer,
  featureShowcase: FeatureGridRenderer,
  
  // Other components
  richText: RichTextRenderer,
} as const

interface Block {
  blockType: keyof typeof blockComponents
  id?: string
  [key: string]: any
}

interface RenderBlocksProps {
  blocks?: Block[]
  className?: string
}

export function RenderBlocks({ blocks, className }: RenderBlocksProps) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className={className}>
      {blocks.map((block, index) => {
        const { blockType, id, ...props } = block
        const Component = blockComponents[blockType]

        if (!Component) {
          console.warn(`Block type "${blockType}" not found`)
          return null
        }

        return (
          <Component
            key={id || `${blockType}-${index}`}
            blockType={blockType}
            {...props}
          />
        )
      })}
    </div>
  )
}

// app/platform/page.tsx - Example platform page
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/components/RenderBlocks'
import { notFound } from 'next/navigation'

export default async function PlatformPage() {
  const payload = await getPayloadHMR({ config: configPromise })
  
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'platform',
      },
    },
  })

  if (!pages.docs.length) {
    notFound()
  }

  const page = pages.docs[0]

  return (
    <main>
      <RenderBlocks blocks={page.content} />
    </main>
  )
}

// Types for better TypeScript support
// types/features.ts
export interface Feature {
  icon?: string
  title: string
  description: string
  badge?: string
  image?: {
    url: string
    alt: string
  }
  link?: {
    text: string
    url: string
  }
}

export interface BentoFeature extends Feature {
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall'
  featured?: boolean
  backgroundGradient?: string
  stats?: {
    value: string
    label: string
  }
}

export interface FeatureGridProps {
  title?: string
  subtitle?: string
  features: Feature[]
  className?: string
}

export interface BentoFeatureGridProps {
  title?: string
  subtitle?: string
  features: BentoFeature[]
  className?: string
}

// utils/feature-helpers.ts - Helper functions
export const validateBentoLayout = (features: BentoFeature[]): boolean => {
  // Ensure good bento layout with proper size distribution
  const sizeCounts = features.reduce((acc, feature) => {
    acc[feature.size] = (acc[feature.size] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Recommendations for good layouts
  const hasLargeFeature = sizeCounts.large > 0
  const hasVariety = Object.keys(sizeCounts).length >= 3
  
  return hasLargeFeature && hasVariety
}

export const generateFeatureGridPreview = (features: Feature[]): string => {
  if (!features || features.length === 0) return 'No features'
  
  const titles = features.slice(0, 3).map(f => f.title)
  const remaining = features.length - 3
  
  return remaining > 0 
    ? `${titles.join(', ')} +${remaining} more`
    : titles.join(', ')
}

// Responsive breakpoint helpers
export const getResponsiveGridCols = (columns: number) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  }
  
  return gridClasses[columns as keyof typeof gridClasses] || gridClasses[3]
}