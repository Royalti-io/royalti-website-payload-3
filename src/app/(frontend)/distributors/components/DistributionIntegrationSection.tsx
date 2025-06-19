"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Container } from '@/components/ui/container'
import { Link, Database, CreditCard, BarChart3, Music, Globe } from 'lucide-react'

export const DistributionIntegrationSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('content')

  const integrationCategories = [
    {
      id: 'content',
      title: 'Content Management & Delivery',
      icon: Music,
      description: 'Complete integration for digital supply chain and catalog management',
      color: 'blue',
      integrations: [
        { name: 'FUGA', description: 'Complete integration for digital supply chain' },
        { name: 'Believe', description: 'Direct API connection for catalog management' },
        { name: 'Symphonic', description: 'Seamless royalty data flow' },
        { name: 'AMPED', description: 'Automated metadata and revenue sync' },
        { name: 'Kontor', description: 'Real-time processing integration' },
        { name: 'DistroKid', description: 'Bulk artist management and processing' }
      ]
    },
    {
      id: 'platforms',
      title: 'Platform Connections (200+ Supported)',
      icon: Globe,
      description: 'Direct integrations with streaming, download, and emerging platforms worldwide',
      color: 'green',
      integrations: [
        { name: 'Spotify', description: 'Real-time streaming data and analytics' },
        { name: 'Apple Music', description: 'Complete sales and streaming integration' },
        { name: 'Amazon Music', description: 'Multi-territory revenue tracking' },
        { name: 'YouTube Music', description: 'Content ID and ad revenue integration' },
        { name: 'TikTok', description: 'Emerging platform revenue tracking' },
        { name: 'Beatport', description: 'Electronic music specialist platform' },
        { name: 'Bandcamp', description: 'Direct-to-fan sales integration' },
        { name: 'JioSaavn', description: 'Indian market streaming integration' }
      ]
    },
    {
      id: 'financial',
      title: 'Financial & Compliance',
      icon: CreditCard,
      description: 'Accounting, payments, tax compliance, and banking integrations',
      color: 'purple',
      integrations: [
        { name: 'QuickBooks Enterprise', description: 'Advanced accounting synchronization' },
        { name: 'SAP', description: 'Enterprise resource planning integration' },
        { name: 'Oracle', description: 'Large-scale financial management' },
        { name: 'PayPal Mass Pay', description: 'Bulk international payments' },
        { name: 'Stripe Connect', description: 'Marketplace payment processing' },
        { name: 'TaxJar', description: 'Automated tax calculation and filing' },
        { name: 'Avalara', description: 'Global tax compliance automation' },
        { name: 'Thomson Reuters', description: 'Legal and compliance management' }
      ]
    },
    {
      id: 'analytics',
      title: 'Business Intelligence',
      icon: BarChart3,
      description: 'Analytics, CRM, communication, and reporting tool integrations',
      color: 'orange',
      integrations: [
        { name: 'Chartmetric', description: 'Music industry analytics and insights' },
        { name: 'Soundcharts', description: 'Comprehensive music data platform' },
        { name: 'Music Analytics', description: 'Advanced performance tracking' },
        { name: 'Salesforce', description: 'Customer relationship management' },
        { name: 'HubSpot', description: 'Marketing automation and CRM' },
        { name: 'Pipedrive', description: 'Sales pipeline management' },
        { name: 'Tableau', description: 'Advanced data visualization' },
        { name: 'Power BI', description: 'Microsoft business intelligence' }
      ]
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        text: 'text-blue-600 dark:text-blue-400',
        button: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-200 dark:border-green-800',
        text: 'text-green-600 dark:text-green-400',
        button: 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        border: 'border-purple-200 dark:border-purple-800',
        text: 'text-purple-600 dark:text-purple-400',
        button: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600'
      },
      orange: {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        border: 'border-orange-200 dark:border-orange-800',
        text: 'text-orange-600 dark:text-orange-400',
        button: 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600'
      }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  return (
    <section className="py-24 bg-background">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
              Built for Distribution
              <span className="block text-royal-600 dark:text-royal-400">
                Technology Stacks
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Single API integration connects your entire distribution technology ecosystem
            </p>
            
            <div className="inline-flex items-center gap-2 bg-royal-50 dark:bg-royal-900/20 text-royal-700 dark:text-royal-300 px-4 py-2 rounded-full text-sm font-medium">
              <Link className="w-4 h-4" />
              200+ Platform Integrations Available
            </div>
          </div>
        </FadeIn>

        {/* Category Tabs */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {integrationCategories.map((category) => {
              const colors = getColorClasses(category.color)
              const isActive = activeCategory === category.id
              
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive 
                      ? `${colors.button} text-white shadow-lg` 
                      : `bg-muted dark:bg-gray-800 text-muted-foreground hover:bg-muted/80 dark:hover:bg-gray-700`
                  }`}
                >
                  <category.icon className="w-5 h-5" />
                  <span className="text-sm">{category.title}</span>
                </button>
              )
            })}
          </div>
        </FadeIn>

        {/* Integration Content */}
        <AnimatePresence mode="wait">
          {integrationCategories.map((category) => {
            if (category.id !== activeCategory) return null
            
            const colors = getColorClasses(category.color)
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`p-8 ${colors.bg} border ${colors.border} rounded-2xl`}
              >
                <FadeIn>
                  <div className="text-center mb-8">
                    <div className={`inline-flex p-4 ${colors.text} bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-4`}>
                      <category.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {category.description}
                    </p>
                  </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.integrations.map((integration, index) => (
                    <motion.div
                      key={integration.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="p-4 bg-white dark:bg-gray-800 border border-border dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-foreground text-sm">
                          {integration.name}
                        </h4>
                        <div className={`w-2 h-2 ${colors.text.replace('text-', 'bg-')} rounded-full`} />
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {integration.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Category-specific call-to-action */}
                <FadeIn delay={0.4}>
                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Database className="w-4 h-4" />
                      {category.id === 'platforms' && "Connected to 200+ platforms worldwide"}
                      {category.id === 'content' && "Direct API connections for seamless workflow"}
                      {category.id === 'financial' && "Enterprise-grade financial integrations"}
                      {category.id === 'analytics' && "Advanced business intelligence tools"}
                    </div>
                    <button className={`px-6 py-3 ${colors.button} text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl`}>
                      View {category.title} Documentation
                    </button>
                  </div>
                </FadeIn>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Integration Benefits */}
        <FadeIn delay={0.6}>
          <div className="mt-16 p-8 bg-gradient-to-r from-royal-50 to-accent/10 dark:from-royal-900/20 dark:to-accent/5 rounded-2xl border border-royal-200 dark:border-royal-800">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Single API Integration Benefits
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                One integration connects your entire distribution technology stack, 
                eliminating data silos and streamlining operations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-royal-100 dark:bg-royal-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Link className="w-8 h-8 text-royal-600 dark:text-royal-400" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Unified Data Flow</h4>
                <p className="text-sm text-muted-foreground">
                  All revenue sources, platforms, and tools connected through single API
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Real-Time Sync</h4>
                <p className="text-sm text-muted-foreground">
                  Instant data synchronization across all connected platforms and tools
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Scalable Architecture</h4>
                <p className="text-sm text-muted-foreground">
                  Add new platforms and tools without disrupting existing workflows
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* CTA Section */}
        <FadeIn delay={0.8}>
          <div className="mt-16 text-center p-8 bg-royal-50 dark:bg-royal-900/20 rounded-2xl border border-royal-200 dark:border-royal-800">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Connect Your Distribution Stack
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              See how Royalti.io integrates with your current tools and platforms. 
              Our integration specialists will design a custom solution for your workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-royal-600 hover:bg-royal-700 dark:bg-royal-500 dark:hover:bg-royal-600 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl">
                Schedule Integration Consultation
              </button>
              <button className="px-8 py-4 border border-royal-600 dark:border-royal-400 text-royal-600 dark:text-royal-400 hover:bg-royal-50 dark:hover:bg-royal-900/20 rounded-lg font-medium transition-colors">
                View All Integrations
              </button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}