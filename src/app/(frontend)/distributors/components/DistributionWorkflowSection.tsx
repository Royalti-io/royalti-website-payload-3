"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Container } from '@/components/ui/container'
import { Upload, Database, Calculator, CreditCard, CheckCircle, Play } from 'lucide-react'

export const DistributionWorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const workflowSteps = [
    {
      id: 1,
      icon: Upload,
      title: "Release Ingestion",
      subtitle: "(Automated)",
      description: "Digital releases uploaded via distributor portal with automatic metadata validation and platform-specific formatting applied.",
      details: [
        "Digital releases uploaded via distributor portal",
        "Metadata validation and enhancement",
        "Platform-specific formatting applied automatically",
        "Distribution to 200+ platforms initiated"
      ],
      color: "blue",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      id: 2,
      icon: Database,
      title: "Revenue Aggregation",
      subtitle: "(Real-Time)",
      description: "Revenue streams converging from global platforms with automatic currency conversion and real-time data synchronization.",
      details: [
        "Streaming data pulled from all platforms",
        "Sales and download data consolidated",
        "Sync and licensing revenue tracked",
        "Currency conversion applied automatically"
      ],
      color: "green",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      id: 3,
      icon: Calculator,
      title: "Split Calculation",
      subtitle: "(Instant)",
      description: "Contract terms processed automatically with producer splits, sample clearances, and territory-specific rates calculated in real-time.",
      details: [
        "Artist agreements processed automatically",
        "Producer and feature splits calculated",
        "Sample clearance fees deducted",
        "Territory-specific rates applied"
      ],
      color: "purple",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      iconColor: "text-purple-600 dark:text-purple-400"
    },
    {
      id: 4,
      icon: CreditCard,
      title: "Payment Distribution",
      subtitle: "(Bulk Processing)",
      description: "Automated bulk payments processed to all parties with international transfers, tax documentation, and real-time confirmations.",
      details: [
        "Bulk payments processed to all parties",
        "International transfers handled automatically",
        "Tax documentation generated per territory",
        "Real-time payment confirmations sent"
      ],
      color: "orange",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
      iconColor: "text-orange-600 dark:text-orange-400"
    }
  ]

  const benefits = [
    "24-hour payment cycle from platform reporting to artist bank account",
    "99.8% accuracy across millions of monthly transactions",
    "Zero manual intervention required for standard releases",
    "Complete audit trail for every transaction"
  ]

  const startAnimation = () => {
    setIsAnimating(true)
    let step = 0
    const interval = setInterval(() => {
      setActiveStep(step)
      step++
      if (step >= workflowSteps.length) {
        clearInterval(interval)
        setTimeout(() => {
          setIsAnimating(false)
          setActiveStep(0)
        }, 2000)
      }
    }, 2000)
  }

  return (
    <section className="py-24 bg-background">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
              From Release Delivery to Artist Payment
              <span className="block text-royal-600 dark:text-royal-400">
                in 24 Hours
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Watch how Royalti.io automates your entire distribution workflow with enterprise-grade precision
            </p>
            
            <button
              onClick={startAnimation}
              disabled={isAnimating}
              className="inline-flex items-center gap-2 px-6 py-3 bg-royal-600 hover:bg-royal-700 dark:bg-royal-500 dark:hover:bg-royal-600 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <Play className="w-5 h-5" />
              {isAnimating ? 'Processing...' : 'See Workflow in Action'}
            </button>
          </div>
        </FadeIn>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border dark:bg-gray-700 -translate-y-1/2 z-0" />
          
          <div className="grid lg:grid-cols-4 gap-8 relative z-10">
            {workflowSteps.map((step, index) => (
              <FadeIn key={step.id} delay={0.2 + index * 0.1}>
                <motion.div
                  animate={{
                    scale: activeStep === index && isAnimating ? 1.05 : 1,
                    opacity: isAnimating ? (activeStep >= index ? 1 : 0.4) : 1
                  }}
                  transition={{ duration: 0.5 }}
                  className={`relative p-6 ${step.bgColor} border ${step.borderColor} rounded-2xl hover:shadow-lg transition-all duration-300`}
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-white dark:bg-gray-800 border-2 border-royal-600 dark:border-royal-400 rounded-full flex items-center justify-center text-sm font-bold text-royal-600 dark:text-royal-400">
                    {step.id}
                  </div>

                  {/* Active Indicator */}
                  <AnimatePresence>
                    {activeStep === index && isAnimating && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Icon */}
                  <div className={`inline-flex p-3 ${step.iconColor} bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-4`}>
                    <step.icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      Stage {step.id}: {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {step.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <motion.div
                        key={detailIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: activeStep === index && isAnimating ? 1 : 0.7,
                          x: activeStep === index && isAnimating ? 0 : -10
                        }}
                        transition={{ delay: detailIndex * 0.2 }}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <span className="text-green-500 dark:text-green-400 font-bold">•</span>
                        {detail}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <FadeIn delay={0.6}>
          <div className="mt-16 p-8 bg-muted/50 dark:bg-gray-800/50 rounded-2xl border border-border dark:border-gray-700">
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">
              Workflow Benefits
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-800/30"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA Section */}
        <FadeIn delay={0.8}>
          <div className="mt-16 text-center p-8 bg-gradient-to-r from-royal-50 to-accent/10 dark:from-royal-900/20 dark:to-accent/5 rounded-2xl border border-royal-200 dark:border-royal-800">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Experience This Workflow with Your Data
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              See how your current distribution process transforms with Royalti.io's automated intelligence. 
              Schedule a demo with your actual workflow requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-royal-600 hover:bg-royal-700 dark:bg-royal-500 dark:hover:bg-royal-600 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl">
                See Enterprise Distribution Demo
              </button>
              <button className="px-8 py-4 border border-royal-600 dark:border-royal-400 text-royal-600 dark:text-royal-400 hover:bg-royal-50 dark:hover:bg-royal-900/20 rounded-lg font-medium transition-colors">
                Download Workflow Guide
              </button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}