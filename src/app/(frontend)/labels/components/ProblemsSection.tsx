"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Container } from '@/components/ui/container'
import { CheckCircle, XCircle } from 'lucide-react'

export const ProblemsSection: React.FC = () => {
  const challenges = [
    {
      problem: "Artist Relations Crisis",
      description: "60% of artist disputes stem from unclear royalty reporting",
      solution: "Trust & Transparency",
      solutionDesc: "Artists see earnings in real-time, eliminating disputes"
    },
    {
      problem: "Administrative Burden", 
      description: "Teams spend 40+ hours monthly on royalty calculations",
      solution: "Operational Efficiency",
      solutionDesc: "Automate 95% of royalty administration"
    },
    {
      problem: "Cash Flow Issues",
      description: "Manual processes delay payments by 30-60 days",
      solution: "Faster Payments", 
      solutionDesc: "Process artist payments in minutes, not weeks"
    },
    {
      problem: "Scaling Limitations",
      description: "Can't sign new talent without adding expensive admin staff",
      solution: "Unlimited Growth",
      solutionDesc: "Scale from 10 to 1,000+ artists without adding staff"
    },
    {
      problem: "Revenue Leakage",
      description: "Missing revenue from platforms due to tracking gaps", 
      solution: "Revenue Optimization",
      solutionDesc: "Capture every penny from 50+ revenue sources"
    },
    {
      problem: "Compliance Risk",
      description: "Audit trail gaps create legal vulnerabilities",
      solution: "Audit Ready",
      solutionDesc: "Complete transaction history and compliance documentation"
    }
  ]

  return (
    <section className="py-24 bg-muted/30 dark:bg-muted/10">
      <Container>
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              The Reality of Running a
              <span className="block text-royal-600 dark:text-royal-400">
                Modern Record Label
              </span>
            </h2>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Current Challenges */}
          <FadeIn delay={0.2} direction="left">
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                  Current Challenges
                </h3>
              </div>
              
              <div className="space-y-4">
                {challenges.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-red-50/50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-700 dark:text-red-300 mb-1">
                          {item.problem}
                        </h4>
                        <p className="text-sm text-red-600/80 dark:text-red-400/80">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* With Royalti.io */}
          <FadeIn delay={0.4} direction="right">
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
                  With Royalti.io
                </h3>
              </div>
              
              <div className="space-y-4">
                {challenges.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-300 mb-1">
                          {item.solution}
                        </h4>
                        <p className="text-sm text-green-600/80 dark:text-green-400/80">
                          {item.solutionDesc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Transformation Arrow */}
        <div className="flex justify-center mt-16">
          <FadeIn delay={1.0}>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-4 bg-royal-600 dark:bg-royal-700 text-white px-6 py-3 rounded-full">
                <span className="font-medium">Transform Your Label Today</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}