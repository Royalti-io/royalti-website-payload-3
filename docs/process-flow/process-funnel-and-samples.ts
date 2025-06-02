// components/process/ProcessFunnel.tsx - Funnel visualization component
"use client"

import { Card, CardContent } from "../../src/components/ui/card"
import { FadeIn } from "../../src/components/ui/animation/FadeIn"
import { GradientText } from "../../src/components/ui/animation/GradientText"
import { cn } from "../../src/utilities/cn"
import { motion } from "framer-motion"

interface FunnelStage {
  title: string
  description: string
  metric?: string
  color: 'royal' | 'green' | 'blue' | 'purple' | 'gray'
}

interface ProcessFunnelProps {
  title?: string
  subtitle?: string
  stages: FunnelStage[]
  className?: string
}

export function ProcessFunnel({
  title,
  subtitle,
  stages,
  className = "",
}: ProcessFunnelProps) {
  const colorClasses = {
    royal: 'from-royal-500 to-royal-600',
    green: 'from-green-500 to-green-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    gray: 'from-gray-500 to-gray-600',
  }

  const getWidth = (index: number) => {
    const maxWidth = 100
    const minWidth = 40
    const reduction = (maxWidth - minWidth) / (stages.length - 1)
    return maxWidth - (reduction * index)
  }

  return (
    <section className={cn("py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white", className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div className="max-w-3xl mx-auto text-center mb-16">
            {title && (
              <FadeIn delay={0.1}>
                <h2 className="text-display-sm md:text-display-md font-bold text-gray-900 mb-6">
                  <GradientText>{title}</GradientText>
                </h2>
              </FadeIn>
            )}
            {subtitle && (
              <FadeIn delay={0.2}>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {subtitle}
                </p>
              </FadeIn>
            )}
          </div>
        )}

        {/* Funnel */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {stages.map((stage, index) => {
              const width = getWidth(index)
              
              return (
                <FadeIn key={index} delay={0.3 + index * 0.1}>
                  <div className="flex justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      style={{ width: `${width}%` }}
                      className="relative"
                    >
                      <Card className="border-royal-100 hover:border-royal-200 hover:shadow-lg transition-all duration-300 group">
                        <CardContent className="p-6 md:p-8">
                          <div className={cn(
                            "absolute inset-0 bg-gradient-to-r opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-lg",
                            colorClasses[stage.color]
                          )} />
                          
                          <div className="relative z-10 text-center">
                            <div className="flex items-center justify-center mb-4">
                              <div className={cn(
                                "w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center text-white font-bold text-sm mr-3",
                                colorClasses[stage.color]
                              )}>
                                {index + 1}
                              </div>
                              <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-royal-600 transition-colors">
                                {stage.title}
                              </h3>
                            </div>
                            
                            <p className="text-gray-600 leading-relaxed mb-4">
                              {stage.description}
                            </p>
                            
                            {stage.metric && (
                              <div className={cn(
                                "inline-block px-4 py-2 rounded-full text-white font-semibold text-sm bg-gradient-to-r",
                                colorClasses[stage.color]
                              )}>
                                {stage.metric}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// scripts/seed-process-content.js - Sample content for Royalti.io
import payload from 'payload'

const seedProcessContent = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    local: true,
  })

  // How It Works Page - Interactive Process Flow
  const howItWorksPage = await payload.create({
    collection: 'pages',
    data: {
      title: 'How Royalti.io Works',
      slug: 'how-it-works',
      metaTitle: 'How Royalti.io Works - Simple Music Royalty Management',
      metaDescription: 'Learn how our platform simplifies music royalty tracking in 4 easy steps. From setup to revenue optimization.',
      content: [
        {
          blockType: 'secondaryHero',
          heading: 'From Setup to Success in 4 Simple Steps',
          subheading: 'Discover how thousands of artists, labels, and publishers use Royalti.io to take control of their music revenue.',
          backgroundPattern: 'dots',
        },
        {
          blockType: 'interactiveProcessFlow',
          title: 'Your Journey to Better Royalty Management',
          subtitle: 'Click through each step to see how our platform transforms your music business.',
          autoPlay: false,
          steps: [
            {
              icon: 'settings',
              title: 'Connect Your Platforms',
              description: 'Link your streaming platforms, distributors, and collection societies in minutes.',
              duration: '5 minutes',
              badge: 'Easy Setup',
              image: {
                url: '/images/connect-platforms.jpg',
                alt: 'Platform connection interface'
              },
              cta: {
                text: 'Start Connecting',
                url: '/signup'
              }
            },
            {
              icon: 'music',
              title: 'Import Your Catalog',
              description: 'We automatically import your entire music catalog and match it across all platforms.',
              duration: '24 hours',
              badge: 'Automated',
              image: {
                url: '/images/catalog-import.jpg',
                alt: 'Music catalog dashboard'
              },
              cta: {
                text: 'See Demo',
                url: '/demo'
              }
            },
            {
              icon: 'bar-chart',
              title: 'Track Your Revenue',
              description: 'Watch real-time data flow in as we sync your earnings from every platform and territory.',
              duration: 'Real-time',
              badge: 'Live Data',
              image: {
                url: '/images/revenue-tracking.jpg',
                alt: 'Revenue analytics dashboard'
              },
              cta: {
                text: 'View Analytics',
                url: '/features/analytics'
              }
            },
            {
              icon: 'trending-up',
              title: 'Optimize & Grow',
              description: 'Use our insights to identify opportunities and maximize your music revenue potential.',
              duration: 'Ongoing',
              badge: 'AI-Powered',
              image: {
                url: '/images/optimization.jpg',
                alt: 'Revenue optimization insights'
              },
              cta: {
                text: 'Learn Optimization',
                url: '/features/optimization'
              }
            }
          ]
        },
        {
          blockType: 'processFunnel',
          title: 'From Artists to Industry Leaders',
          subtitle: 'See how our platform scales with your success, from independent artists to major labels.',
          stages: [
            {
              title: 'Independent Artists',
              description: 'Solo artists and small bands tracking streams from major platforms like Spotify, Apple Music, and YouTube.',
              metric: '8,000+ active users',
              color: 'royal'
            },
            {
              title: 'Growing Labels',
              description: 'Independent labels managing multiple artists and building comprehensive royalty reports for stakeholders.',
              metric: '1,200+ labels',
              color: 'blue'
            },
            {
              title: 'Music Publishers',
              description: 'Publishers tracking complex licensing deals, sync placements, and performance royalties across territories.',
              metric: '300+ publishers',
              color: 'purple'
            },
            {
              title: 'Major Industry Players',
              description: 'Large labels and distributors processing millions in royalties with enterprise-grade security and reporting.',
              metric: '50+ enterprise clients',
              color: 'green'
            }
          ]
        }
      ],
      status: 'published',
    },
  })

  // Onboarding Process Page - Horizontal Flow
  const onboardingPage = await payload.create({
    collection: 'pages',
    data: {
      title: 'Get Started with Royalti.io',
      slug: 'get-started',
      metaTitle: 'Get Started - Royalti.io Onboarding Guide',
      metaDescription: 'Quick start guide to set up your Royalti.io account and begin tracking music royalties in minutes.',
      content: [
        {
          blockType: 'secondaryHero',
          heading: 'Welcome to Royalti.io',
          subheading: 'Get up and running with complete royalty tracking in under 10 minutes.',
          backgroundPattern: 'grid',
        },
        {
          blockType: 'horizontalProcessFlow',
          title: 'Quick Start Guide',
          subtitle: 'Follow these steps to begin tracking your music revenue today.',
          variant: 'cards',
          showConnectors: true,
          backgroundColor: 'white',
          steps: [
            {
              icon: 'users',
              title: 'Create Your Account',
              description: 'Sign up with your email and tell us about your music business.',
              duration: '2 minutes',
              badge: 'Free',
              cta: {
                text: 'Sign Up Now',
                url: '/signup'
              }
            },
            {
              icon: 'link',
              title: 'Connect Platforms',
              description: 'Link your Spotify for Artists, Apple Music for Artists, and distributor accounts.',
              duration: '3 minutes',
              badge: 'Secure',
              cta: {
                text: 'Add Platforms',
                url: '/integrations'
              }
            },
            {
              icon: 'eye',
              title: 'Verify Your Data',
              description: 'Review your imported catalog and earnings data to ensure everything looks correct.',
              duration: '5 minutes',
              cta: {
                text: 'Check Data',
                url: '/dashboard'
              }
            },
            {
              icon: 'check-circle',
              title: 'Start Tracking',
              description: 'You\'re all set! Watch your revenue data update in real-time from now on.',
              duration: 'Instant',
              badge: 'Complete',
              status: 'completed'
            }
          ]
        },
        {
          blockType: 'verticalTimeline',
          title: 'Your First 30 Days',
          subtitle: 'Here\'s what to expect as you get familiar with the platform.',
          variant: 'left',
          steps: [
            {
              icon: 'play',
              title: 'Week 1: Explore Your Dashboard',
              description: 'Get familiar with your revenue analytics, top-performing tracks, and platform breakdowns.',
              duration: 'Daily check-ins',
              status: 'current'
            },
            {
              icon: 'bar-chart',
              title: 'Week 2: Set Up Reports',
              description: 'Configure automated monthly reports for your team, manager, or accountant.',
              duration: '15 minutes setup',
              status: 'upcoming'
            },
            {
              icon: 'trending-up',
              title: 'Week 3: Discover Insights',
              description: 'Use our analytics to identify your best-performing territories and demographic insights.',
              duration: 'Ongoing analysis',
              status: 'upcoming'
            },
            {
              icon: 'dollar-sign',
              title: 'Week 4: Optimize Revenue',
              description: 'Apply insights to your release strategy and promotional efforts for maximum impact.',
              duration: 'Strategic planning',
              status: 'upcoming'
            }
          ]
        }
      ],
      status: 'published',
    },
  })

  // Revenue Tracking Process - Bento Grid
  const revenueProcessPage = await payload.create({
    collection: 'pages',
    data: {
      title: 'Revenue Tracking Process',
      slug: 'revenue-tracking',
      metaTitle: 'Revenue Tracking - How Royalti.io Collects Your Data',
      metaDescription: 'Understand how our platform collects, processes, and analyzes your music revenue data.',
      content: [
        {
          blockType: 'secondaryHero',
          heading: 'Behind the Scenes: How We Track Your Revenue',
          subheading: 'Discover the technology and processes that ensure accurate, real-time royalty tracking.',
          backgroundPattern: 'dots',
        },
        {
          blockType: 'processBentoGrid',
          title: 'Our Revenue Tracking System',
          subtitle: 'From data collection to insights, here\'s how we ensure you never miss a dollar.',
          steps: [
            {
              size: 'large',
              icon: 'globe',
              title: 'Global Data Collection',
              description: 'Our system connects to over 150 platforms worldwide, collecting your streaming, download, and licensing data every 24 hours. We use secure APIs and direct integrations to ensure complete accuracy.',
              duration: 'Every 24 hours',
              badge: 'Automated',
              backgroundGradient: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
              cta: {
                text: 'See All Platforms',
                url: '/integrations'
              }
            },
            {
              size: 'medium',
              icon: 'music',
              title: 'Catalog Matching',
              description: 'Advanced algorithms match your tracks across all platforms, handling variations in titles, artists, and metadata.',
              duration: 'Real-time',
              badge: 'AI-Powered'
            },
            {
              size: 'small',
              icon: 'shield',
              title: 'Data Validation',
              description: 'Multi-layer verification ensures 99.9% accuracy.',
              backgroundGradient: 'linear-gradient(135deg, #006666 0%, #008080 100%)'
            },
            {
              size: 'wide',
              icon: 'bar-chart',
              title: 'Processing & Analysis',
              description: 'Raw data is processed, normalized, and enriched with territorial, demographic, and performance insights.',
              duration: '< 2 minutes',
              backgroundGradient: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)'
            },
            {
              size: 'medium',
              icon: 'eye',
              title: 'Real-Time Updates',
              description: 'Your dashboard updates continuously as new data arrives, giving you the freshest insights possible.',
              badge: 'Live Data',
              cta: {
                text: 'View Dashboard',
                url: '/dashboard'
              }
            },
            {
              size: 'small',
              icon: 'download',
              title: 'Export Ready',
              description: 'Download reports in any format you need.'
            }
          ]
        }
      ],
      status: 'published',
    },
  })

  console.log('✅ Process flow content seeded successfully!')
  console.log(`How It Works page: ${howItWorksPage.id}`)
  console.log(`Onboarding page: ${onboardingPage.id}`)
  console.log(`Revenue Tracking page: ${revenueProcessPage.id}`)
  
  process.exit(0)
}

seedProcessContent()

// components/RenderBlocks.tsx - Updated with process flow support
import { HeroRenderer } from '@/components/blocks/HeroRenderer'
import { FeatureGridRenderer } from '@/components/blocks/FeatureGridRenderer'
import { ProcessFlowRenderer } from '@/components/blocks/ProcessFlowRenderer'
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
  
  // Process flow components
  horizontalProcessFlow: ProcessFlowRenderer,
  verticalTimeline: ProcessFlowRenderer,
  interactiveProcessFlow: ProcessFlowRenderer,
  processBentoGrid: ProcessFlowRenderer,
  processFunnel: ProcessFlowRenderer,
  
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

// app/how-it-works/page.tsx - Example usage
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/components/RenderBlocks'
import { notFound } from 'next/navigation'

export default async function HowItWorksPage() {
  const payload = await getPayloadHMR({ config: configPromise })
  
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'how-it-works',
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

// utils/process-helpers.ts - Helper utilities
export const processFlowTypes = {
  onboarding: 'Getting users started with the platform',
  workflow: 'How the platform works internally',
  revenue: 'Revenue tracking and optimization process',
  integration: 'Platform connection and setup process',
  reporting: 'Report generation and delivery process',
} as const

export const validateProcessFlow = (steps: any[]): boolean => {
  // Ensure good process flow structure
  if (!steps || steps.length < 2) return false
  
  // Check for logical progression
  const hasSetup = steps.some(step => 
    step.title?.toLowerCase().includes('setup') || 
    step.title?.toLowerCase().includes('connect')
  )
  
  const hasCompletion = steps.some(step => 
    step.title?.toLowerCase().includes('complete') || 
    step.title?.toLowerCase().includes('success') ||
    step.status === 'completed'
  )
  
  return hasSetup || hasCompletion
}

export const generateProcessSteps = (type: keyof typeof processFlowTypes) => {
  const templates = {
    onboarding: [
      { title: 'Sign Up', icon: 'users' },
      { title: 'Connect Platforms', icon: 'link' },
      { title: 'Import Data', icon: 'music' },
      { title: 'Start Tracking', icon: 'check-circle' },
    ],
    workflow: [
      { title: 'Data Collection', icon: 'globe' },
      { title: 'Processing', icon: 'settings' },
      { title: 'Analysis', icon: 'bar-chart' },
      { title: 'Insights', icon: 'eye' },
    ],
    revenue: [
      { title: 'Platform Sync', icon: 'link' },
      { title: 'Revenue Calculation', icon: 'dollar-sign' },
      { title: 'Report Generation', icon: 'file-text' },
      { title: 'Optimization', icon: 'trending-up' },
    ],
  }
  
  return templates[type] || templates.onboarding
}

// Performance optimization for animations
export const useProcessFlowAnimation = (totalSteps: number) => {
  const baseDelay = 0.3
  const stepDelay = 0.1
  const maxDelay = 1.0
  
  return {
    staggerDelay: Math.min(stepDelay, maxDelay / totalSteps),
    totalDuration: Math.min(baseDelay + (totalSteps * stepDelay), maxDelay + baseDelay),
  }
}