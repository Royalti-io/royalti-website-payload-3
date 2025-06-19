"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Database, Calculator, BarChart3, Send } from 'lucide-react'

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      icon: Database,
      title: "Automatic Data Ingestion",
      description: "Platform releases detected automatically. Streaming data pulled from 50+ sources. Sales and sync data consolidated. Historical data backfilled.",
      visual: "Data flowing from multiple platform logos into central dashboard",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "02", 
      icon: Calculator,
      title: "Intelligent Split Calculation",
      description: "Contract terms applied automatically. Complex recoupment calculations processed. Multi-party splits calculated precisely. Territory-specific rates applied.",
      visual: "Contract terms automatically applied to earnings data",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      icon: BarChart3, 
      title: "Transparent Reporting",
      description: "Artists receive real-time notifications. Detailed statements generated automatically. Marketing insights shared with roster. Label performance analytics updated.",
      visual: "Artists viewing their earnings on branded portal",
      color: "from-green-500 to-teal-500"
    },
    {
      number: "04",
      icon: Send,
      title: "Automated Payments", 
      description: "Bulk payments processed with one click. International transfers handled automatically. Tax documentation generated. Payment confirmations sent to all parties.",
      visual: "Payment confirmations across multiple payment methods",
      color: "from-orange-500 to-red-500"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-24 bg-background">
      <Container>
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              From Release to Payment
              <span className="block text-royal-600 dark:text-royal-400">
                in 4 Simple Steps
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how Royalti.io transforms complex label operations into a seamless, automated workflow
            </p>
          </FadeIn>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-cols-2' : ''
              }`}
            >
              {/* Content Side */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                {/* Step Number & Icon */}
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-6xl font-bold text-muted/20 dark:text-muted/10">
                    {step.number}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-3xl font-bold">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Features List */}
                <div className="space-y-2">
                  {step.description.split('. ').map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`} />
                      <span className="text-foreground font-medium">
                        {feature.trim()}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Visual Side */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  {/* Mock Interface */}
                  <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-royal-600 to-royal-700 dark:from-royal-500 dark:to-royal-600 p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <div className="ml-4 text-white text-sm font-medium">
                          Step {step.number}: {step.title}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 h-64 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto`}>
                          <step.icon className="w-12 h-12 text-white" />
                        </div>
                        <div className="text-muted-foreground text-sm italic">
                          {step.visual}
                        </div>
                        
                        {/* Animated Progress */}
                        <div className="w-full bg-muted rounded-full h-2 mt-4">
                          <motion.div 
                            className={`bg-gradient-to-r ${step.color} h-2 rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 2, delay: 0.5 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Success Badge */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute -top-4 -right-4 bg-gradient-to-r ${step.color} text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg`}
                  >
                    ✓ Automated
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Workflow Benefits */}
        <FadeIn delay={0.8}>
          <div className="mt-20 bg-royal-50 dark:bg-royal-900/20 border border-royal-200 dark:border-royal-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">
              Workflow Benefits
            </h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-royal-600 dark:text-royal-400 mb-2">
                  24 Hours
                </div>
                <div className="text-sm text-muted-foreground">
                  Payment cycle from platform reporting to artist bank account
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-royal-600 dark:text-royal-400 mb-2">
                  99.8%
                </div>
                <div className="text-sm text-muted-foreground">
                  Accuracy across millions of monthly transactions
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-royal-600 dark:text-royal-400 mb-2">
                  Zero
                </div>
                <div className="text-sm text-muted-foreground">
                  Manual intervention required for standard releases
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-royal-600 dark:text-royal-400 mb-2">
                  Complete
                </div>
                <div className="text-sm text-muted-foreground">
                  Audit trail for every transaction
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <div className="text-center mt-16">
          <FadeIn delay={1.0}>
            <Button 
              size="lg" 
              variant="royal"
              className="text-lg px-8 py-4 h-auto"
            >
              See This Workflow in Action - Book Demo
            </Button>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}