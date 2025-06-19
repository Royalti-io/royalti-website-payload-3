"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Container } from '@/components/ui/container'
import { Zap, Palette, Building, Link } from 'lucide-react'

export const DistributionFeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: "Bulk Processing Engine",
      headline: "Process Millions of Transactions Instantly",
      description: "Handle massive transaction volumes from hundreds of platforms simultaneously. Our distributed processing engine scales automatically during peak reporting periods without degrading performance.",
      capabilities: [
        "Parallel processing across multiple data centers",
        "Real-time ingestion from 50+ revenue sources",
        "Automatic duplicate detection and reconciliation",
        "Bulk validation with error flagging and correction",
        "Historical data backfill and reconciliation"
      ],
      benefit: "Process your entire monthly volume in hours, not weeks",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Palette,
      title: "White-Label Distribution Platform",
      headline: "Your Brand, Our Technology",
      description: "Offer artist portals, mobile apps, and reporting tools under your complete branding. Artists see your distribution company as the technology leader, not just a middleman.",
      capabilities: [
        "Complete brand customization and theming",
        "Custom domain and URL structure",
        "Mobile app white-labeling options",
        "API endpoints under your brand",
        "Custom email templates and communications"
      ],
      benefit: "Differentiate from competitors with superior technology presentation",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      iconColor: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Building,
      title: "Multi-Tenant Architecture",
      headline: "Infinite Client Segmentation",
      description: "Create separate environments for labels, managers, and individual artists while maintaining centralized distribution oversight. Each client gets their own secure workspace.",
      capabilities: [
        "Hierarchical permission structures",
        "Client-specific branding and customization",
        "Isolated data environments with shared processing",
        "Custom pricing and feature sets per client",
        "Cross-client analytics and portfolio insights"
      ],
      benefit: "Serve enterprise labels and individual artists with the same platform",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      icon: Link,
      title: "Distribution API Suite",
      headline: "Integration-First Architecture",
      description: "RESTful APIs designed for distribution workflows. Connect your existing CRM, accounting, and marketing tools while providing API access to your larger clients.",
      capabilities: [
        "Complete CRUD operations via API",
        "Real-time webhook notifications",
        "Bulk data import/export endpoints",
        "Client API key management",
        "Rate limiting and usage analytics"
      ],
      benefit: "Integrate with any system and offer API access as a premium service",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
      iconColor: "text-orange-600 dark:text-orange-400"
    }
  ]

  return (
    <section className="py-24 bg-background">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
              Enterprise-Grade Features
              <span className="block text-royal-600 dark:text-royal-400">
                Built for Distribution Scale
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Four core capabilities that power the world's leading music distributors
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={0.2 + index * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`h-full p-8 ${feature.bgColor} border ${feature.borderColor} rounded-2xl hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 ${feature.iconColor} bg-white dark:bg-gray-800 rounded-lg shadow-sm`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {feature.title}
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      {feature.headline}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Key Capabilities:</h4>
                  <ul className="space-y-2">
                    {feature.capabilities.map((capability, capIndex) => (
                      <motion.li
                        key={capIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 + capIndex * 0.1 }}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-green-500 dark:text-green-400 font-bold">•</span>
                        {capability}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className={`p-4 bg-white dark:bg-gray-800 rounded-lg border ${feature.borderColor}`}>
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <div className="text-sm font-medium text-foreground mb-1">
                        Distribution Benefit:
                      </div>
                      <div className="text-sm text-muted-foreground italic">
                        "{feature.benefit}"
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Feature Showcase */}
        <FadeIn delay={0.8}>
          <div className="mt-16 p-8 bg-gradient-to-r from-royal-50 to-accent/10 dark:from-royal-900/20 dark:to-accent/5 rounded-2xl border border-royal-200 dark:border-royal-800">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                See These Features in Action
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Schedule a personalized demo to see how these enterprise features can transform 
                your distribution operations and competitive position.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-royal-600 hover:bg-royal-700 dark:bg-royal-500 dark:hover:bg-royal-600 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl">
                  Schedule Feature Demo
                </button>
                <button className="px-8 py-4 border border-royal-600 dark:border-royal-400 text-royal-600 dark:text-royal-400 hover:bg-royal-50 dark:hover:bg-royal-900/20 rounded-lg font-medium transition-colors">
                  View Technical Specs
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}