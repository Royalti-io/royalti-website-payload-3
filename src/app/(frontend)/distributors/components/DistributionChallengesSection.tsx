"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Container } from '@/components/ui/container'
import { AlertTriangle, CheckCircle } from 'lucide-react'

export const DistributionChallengesSection: React.FC = () => {
  const challenges = [
    {
      icon: "⏱️",
      title: "Processing Bottlenecks",
      description: "Manual royalty calculations create weeks-long delays"
    },
    {
      icon: "📉",
      title: "Client Churn",
      description: "40% of artists leave due to payment transparency issues"
    },
    {
      icon: "💰",
      title: "Scaling Costs",
      description: "Adding artists requires proportional staff increases"
    },
    {
      icon: "🔀",
      title: "Revenue Fragmentation",
      description: "Data scattered across platforms creates calculation errors"
    },
    {
      icon: "🎯",
      title: "Support Overload",
      description: "60% of support tickets relate to 'where's my payment?'"
    },
    {
      icon: "⚖️",
      title: "Competitive Pressure",
      description: "Can't match major distributors on speed and transparency"
    }
  ]

  const solutions = [
    {
      icon: "⚡",
      title: "Instant Processing",
      description: "Automated bulk calculations handle millions of transactions"
    },
    {
      icon: "📈",
      title: "Client Retention",
      description: "95% satisfaction through real-time transparency"
    },
    {
      icon: "📊",
      title: "Linear Scaling",
      description: "Add 10x artists with minimal operational overhead"
    },
    {
      icon: "🔄",
      title: "Unified Revenue View",
      description: "All sources consolidated into single platform"
    },
    {
      icon: "🛠️",
      title: "Self-Service Portals",
      description: "Artists get answers without contacting support"
    },
    {
      icon: "🏆",
      title: "Competitive Advantage",
      description: "Match or exceed major distributor capabilities"
    }
  ]

  return (
    <section className="py-24 bg-muted/30 dark:bg-black/20">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
              The Distribution Dilemma:
              <span className="block text-royal-600 dark:text-royal-400">
                Scale vs. Service Quality
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Traditional distribution faces impossible choices. Royalti.io eliminates the trade-off.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Traditional Challenges */}
          <FadeIn delay={0.2}>
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <AlertTriangle className="w-4 h-4" />
                  Traditional Distribution Challenges
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  The Old Way Doesn't Scale
                </h3>
              </div>
              
              <div className="space-y-4">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-red-200 dark:border-red-800/30 shadow-sm"
                  >
                    <div className="text-2xl">{challenge.icon}</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        ❌ {challenge.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {challenge.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Royalti.io Solutions */}
          <FadeIn delay={0.4}>
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <CheckCircle className="w-4 h-4" />
                  Royalti.io Distribution Solution
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Enterprise-Grade Automation
                </h3>
              </div>
              
              <div className="space-y-4">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-green-200 dark:border-green-800/30 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="text-2xl">{solution.icon}</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        ✅ {solution.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {solution.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Transformation Arrow */}
        <FadeIn delay={0.8}>
          <div className="flex justify-center mt-12">
            <motion.div
              animate={{ 
                x: [0, 10, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-6xl text-royal-600 dark:text-royal-400"
            >
              →
            </motion.div>
          </div>
        </FadeIn>

        {/* Bottom CTA */}
        <FadeIn delay={1}>
          <div className="text-center mt-16 p-8 bg-royal-50 dark:bg-royal-900/20 rounded-2xl border border-royal-200 dark:border-royal-800">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your Distribution?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              See how leading distributors eliminated processing bottlenecks and scaled 
              operations with Royalti.io's enterprise platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-royal-600 hover:bg-royal-700 dark:bg-royal-500 dark:hover:bg-royal-600 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl">
                Schedule Enterprise Demo
              </button>
              <button className="px-6 py-3 border border-royal-600 dark:border-royal-400 text-royal-600 dark:text-royal-400 hover:bg-royal-50 dark:hover:bg-royal-900/20 rounded-lg font-medium transition-colors">
                See Success Stories
              </button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}