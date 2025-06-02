// lib/conversion-tracking.ts - Conversion funnel analytics
"use client"

import { useEffect, useState } from 'react'

// Conversion events we track for Royalti.io
export type ConversionEvent = 
  | 'page_view'
  | 'hero_cta_click'
  | 'demo_request'
  | 'trial_signup'
  | 'onboarding_complete'
  | 'first_platform_connected'
  | 'dashboard_viewed'
  | 'upgrade_clicked'
  | 'subscription_complete'
  | 'churned'

export type UserSegment = 
  | 'indie_artist'
  | 'growing_artist' 
  | 'small_label'
  | 'medium_label'
  | 'music_publisher'
  | 'enterprise'
  | 'unknown'

export interface ConversionFunnelData {
  segment: UserSegment
  events: Array<{
    event: ConversionEvent
    timestamp: Date
    metadata?: Record<string, any>
  }>
  acquisitionSource: string
  currentStage: 'awareness' | 'interest' | 'consideration' | 'trial' | 'customer' | 'churned'
}

// Conversion tracking hook
export function useConversionTracking() {
  const [funnelData, setFunnelData] = useState<ConversionFunnelData | null>(null)
  
  const trackEvent = (event: ConversionEvent, metadata?: Record<string, any>) => {
    // Track in analytics (Google Analytics, Mixpanel, etc.)
    if (typeof window !== 'undefined') {
      // Google Analytics 4
      window.gtag?.('event', event, {
        custom_parameter_1: metadata?.source,
        custom_parameter_2: metadata?.segment,
        ...metadata
      })
      
      // Mixpanel
      window.mixpanel?.track(event, {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        ...metadata
      })
      
      // Internal analytics
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event,
          metadata,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent
        })
      }).catch(console.error)
    }
  }

  const identifyUser = (segment: UserSegment, acquisitionSource: string) => {
    setFunnelData(prev => ({
      ...prev,
      segment,
      acquisitionSource,
      events: prev?.events || [],
      currentStage: 'awareness'
    }))
    
    trackEvent('page_view', { segment, acquisitionSource })
  }

  const getCurrentStage = (): 'awareness' | 'interest' | 'consideration' | 'trial' | 'customer' => {
    if (!funnelData) return 'awareness'
    
    const events = funnelData.events.map(e => e.event)
    
    if (events.includes('subscription_complete')) return 'customer'
    if (events.includes('trial_signup')) return 'trial'
    if (events.includes('demo_request') || events.includes('first_platform_connected')) return 'consideration'
    if (events.includes('hero_cta_click')) return 'interest'
    return 'awareness'
  }

  return {
    funnelData,
    trackEvent,
    identifyUser,
    getCurrentStage
  }
}

// components/analytics/ConversionFunnel.tsx - Visual funnel analysis
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react"

interface FunnelStageData {
  name: string
  users: number
  conversionRate: number
  dropOffRate: number
  averageTime: string
  topActions: string[]
  improvements: string[]
}

interface ConversionFunnelProps {
  data: FunnelStageData[]
  timeframe: '7d' | '30d' | '90d'
  segment?: UserSegment
  className?: string
}

export function ConversionFunnel({ 
  data, 
  timeframe, 
  segment, 
  className = "" 
}: ConversionFunnelProps) {
  const getTotalUsers = () => data[0]?.users || 0
  const getOverallConversion = () => {
    const first = data[0]?.users || 0
    const last = data[data.length - 1]?.users || 0
    return first > 0 ? (last / first * 100).toFixed(1) : '0'
  }

  return (
    <div className={className}>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Conversion Funnel Analysis
          </h2>
          <div className="flex items-center space-x-4">
            {segment && (
              <Badge variant="outline" className="border-royal-200 text-royal-700">
                {segment.replace('_', ' ').toUpperCase()}
              </Badge>
            )}
            <Badge variant="outline">
              {timeframe.toUpperCase()}
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-royal-600">
                {getTotalUsers().toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Visitors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {getOverallConversion()}%
              </div>
              <div className="text-sm text-gray-600">Overall Conversion</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {data[data.length - 1]?.users.toLocaleString() || 0}
              </div>
              <div className="text-sm text-gray-600">New Customers</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        {data.map((stage, index) => {
          const previousStage = data[index - 1]
          const width = getTotalUsers() > 0 ? (stage.users / getTotalUsers() * 100) : 0
          
          return (
            <Card key={stage.name} className="border-royal-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{stage.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={stage.conversionRate >= 50 ? 'default' : stage.conversionRate >= 25 ? 'secondary' : 'destructive'}
                    >
                      {stage.conversionRate.toFixed(1)}% conversion
                    </Badge>
                    {stage.dropOffRate > 50 && (
                      <Badge variant="destructive">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        High drop-off
                      </Badge>
                    )}
                  </div>
                </div>
                <CardDescription>
                  {stage.users.toLocaleString()} users • Average time: {stage.averageTime}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Visual funnel representation */}
                  <div className="relative">
                    <div className="flex justify-center">
                      <div 
                        className="bg-gradient-to-r from-royal-400 to-royal-600 rounded-lg flex items-center justify-center text-white font-semibold py-4 transition-all duration-500"
                        style={{ width: `${Math.max(width, 20)}%` }}
                      >
                        {stage.users.toLocaleString()} users
                      </div>
                    </div>
                    {index < data.length - 1 && (
                      <div className="flex justify-center mt-2">
                        <ArrowRight className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Stage details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Top Actions</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {stage.topActions.map((action, i) => (
                          <li key={i} className="flex items-center">
                            <div className="w-2 h-2 bg-royal-400 rounded-full mr-2" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Improvement Opportunities</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {stage.improvements.map((improvement, i) => (
                          <li key={i} className="flex items-center">
                            <TrendingUp className="w-3 h-3 text-green-500 mr-2" />
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

// components/analytics/ABTestDashboard.tsx - A/B testing management
"use client"

interface ABTest {
  id: string
  name: string
  status: 'draft' | 'running' | 'completed' | 'paused'
  variants: Array<{
    id: string
    name: string
    traffic: number
    conversions: number
    conversionRate: number
    confidence: number
  }>
  startDate: Date
  endDate?: Date
  primaryMetric: string
  description: string
}

interface ABTestDashboardProps {
  tests: ABTest[]
  className?: string
}

export function ABTestDashboard({ tests, className = "" }: ABTestDashboardProps) {
  const runningTests = tests.filter(t => t.status === 'running')
  const completedTests = tests.filter(t => t.status === 'completed')

  return (
    <div className={className}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          A/B Testing Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {runningTests.length}
              </div>
              <div className="text-sm text-gray-600">Running Tests</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {completedTests.length}
              </div>
              <div className="text-sm text-gray-600">Completed Tests</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">
                {completedTests.filter(t => t.variants.some(v => v.confidence > 95)).length}
              </div>
              <div className="text-sm text-gray-600">Significant Results</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">
                {runningTests.reduce((acc, test) => acc + test.variants.reduce((sum, v) => sum + v.traffic, 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Total Traffic</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        {tests.map((test) => (
          <Card key={test.id} className="border-royal-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{test.name}</CardTitle>
                  <CardDescription>{test.description}</CardDescription>
                </div>
                <Badge 
                  variant={
                    test.status === 'running' ? 'default' :
                    test.status === 'completed' ? 'secondary' :
                    test.status === 'paused' ? 'destructive' : 'outline'
                  }
                >
                  {test.status.toUpperCase()}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                Primary Metric: {test.primaryMetric} • 
                Started: {test.startDate.toLocaleDateString()}
                {test.endDate && ` • Ended: ${test.endDate.toLocaleDateString()}`}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {test.variants.map((variant) => {
                  const isWinner = variant.conversionRate === Math.max(...test.variants.map(v => v.conversionRate))
                  
                  return (
                    <div key={variant.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{variant.name}</h4>
                          {isWinner && test.status === 'completed' && (
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              Winner
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {variant.confidence.toFixed(1)}% confidence
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Traffic</div>
                          <div className="font-medium">{variant.traffic.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Conversions</div>
                          <div className="font-medium">{variant.conversions.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Conversion Rate</div>
                          <div className="font-medium">{variant.conversionRate.toFixed(2)}%</div>
                        </div>
                      </div>
                      <Progress 
                        value={variant.conversionRate} 
                        className="mt-2"
                        // max={Math.max(...test.variants.map(v => v.conversionRate))}
                      />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// hooks/useABTest.ts - A/B testing hook
"use client"

import { useState, useEffect } from 'react'

export function useABTest(testName: string, variants: string[]) {
  const [variant, setVariant] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing assignment
    const stored = localStorage.getItem(`ab_test_${testName}`)
    if (stored && variants.includes(stored)) {
      setVariant(stored)
      setIsLoading(false)
      return
    }

    // Assign new variant
    const randomVariant = variants[Math.floor(Math.random() * variants.length)]
    setVariant(randomVariant)
    localStorage.setItem(`ab_test_${testName}`, randomVariant)
    setIsLoading(false)

    // Track assignment
    fetch('/api/analytics/ab-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        testName,
        variant: randomVariant,
        timestamp: new Date().toISOString()
      })
    }).catch(console.error)
  }, [testName, variants])

  const trackConversion = (conversionType: string = 'primary') => {
    fetch('/api/analytics/ab-test-conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        testName,
        variant,
        conversionType,
        timestamp: new Date().toISOString()
      })
    }).catch(console.error)
  }

  return { variant, isLoading, trackConversion }
}

// lib/conversion-optimization.ts - Optimization strategies
export const conversionOptimizationStrategies = {
  // Audience-specific CTAs
  audienceSpecificCTAs: {
    indie_artist: {
      primary: "Start tracking your streams for free",
      secondary: "See how much you're missing",
      urgency: "Join 8,000+ independent artists",
      socialProof: "Used by artists on Spotify's Top 50"
    },
    growing_artist: {
      primary: "Scale your revenue tracking",
      secondary: "Professional artist dashboard",
      urgency: "Ready for the next level?",
      socialProof: "Trusted by charting artists"
    },
    small_label: {
      primary: "Manage all your artists in one place",
      secondary: "Label dashboard demo",
      urgency: "Perfect for growing labels",
      socialProof: "1,200+ labels trust us"
    },
    music_publisher: {
      primary: "Track complex licensing deals",
      secondary: "Publisher-specific features",
      urgency: "Built for publishers",
      socialProof: "300+ publishers choose us"
    }
  },

  // Page-specific optimizations
  pageOptimizations: {
    homepage: {
      heroFocus: "Value proposition + social proof",
      ctaPlacement: "Above fold + sticky bottom",
      trustSignals: "Customer logos + revenue tracked",
      urgency: "Free trial + setup time"
    },
    pricing: {
      heroFocus: "ROI calculation",
      ctaPlacement: "In each pricing card + sticky",
      trustSignals: "Money-back guarantee",
      urgency: "Limited time discount"
    },
    demo: {
      heroFocus: "Time to value",
      ctaPlacement: "Pre-form + post-form",
      trustSignals: "No sales pressure",
      urgency: "Book same day"
    }
  },

  // Conversion barriers and solutions
  commonBarriers: {
    price_concern: {
      barrier: "Platform seems expensive",
      solution: "ROI calculator + free trial",
      testVariants: ["Free forever plan", "Money-back guarantee", "ROI projection"]
    },
    complexity_fear: {
      barrier: "Looks too complex to set up",
      solution: "Setup time guarantee + onboarding video",
      testVariants: ["5-minute setup", "White-glove onboarding", "Done-for-you setup"]
    },
    trust_issues: {
      barrier: "Unknown company",
      solution: "Customer testimonials + security badges",
      testVariants: ["Customer stories", "Security certifications", "Money-back guarantee"]
    },
    switching_cost: {
      barrier: "Already using another platform",
      solution: "Free migration + comparison chart",
      testVariants: ["Free data migration", "Side-by-side comparison", "Trial without commitment"]
    }
  }
}

// Sample A/B tests for Royalti.io
export const sampleABTests: ABTest[] = [
  {
    id: 'hero-cta-text',
    name: 'Homepage Hero CTA Text',
    status: 'running',
    description: 'Testing different CTA button text on homepage hero',
    primaryMetric: 'Trial Signups',
    startDate: new Date('2024-01-15'),
    variants: [
      {
        id: 'control',
        name: 'Start Free Trial',
        traffic: 2840,
        conversions: 142,
        conversionRate: 5.0,
        confidence: 87.3
      },
      {
        id: 'variant-a',
        name: 'Track Your Revenue Free',
        traffic: 2901,
        conversions: 174,
        conversionRate: 6.0,
        confidence: 94.1
      },
      {
        id: 'variant-b',
        name: 'Start Earning More',
        traffic: 2755,
        conversions: 138,
        conversionRate: 5.0,
        confidence: 23.1
      }
    ]
  },
  {
    id: 'pricing-page-layout',
    name: 'Pricing Page Layout',
    status: 'completed',
    description: 'Testing 3-tier vs 4-tier pricing layout',
    primaryMetric: 'Subscription Conversions',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-31'),
    variants: [
      {
        id: 'three-tier',
        name: '3-Tier Pricing',
        traffic: 1200,
        conversions: 48,
        conversionRate: 4.0,
        confidence: 78.2
      },
      {
        id: 'four-tier',
        name: '4-Tier Pricing',
        traffic: 1150,
        conversions: 69,
        conversionRate: 6.0,
        confidence: 96.7
      }
    ]
  }
]