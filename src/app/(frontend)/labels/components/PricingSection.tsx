"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Check, Star, Crown, Zap } from 'lucide-react'

export const PricingSection: React.FC = () => {
  const plans = [
    {
      name: "Professional Label",
      price: 149,
      period: "month",
      description: "Perfect for Independent and Boutique Labels",
      badge: "Most Popular",
      badgeColor: "bg-royal-600 dark:bg-royal-500",
      features: [
        "Up to 100 artists",
        "Unlimited revenue sources", 
        "Advanced label analytics",
        "White-label artist portals",
        "Custom contract templates",
        "API access",
        "Priority support",
        "Multi-user team accounts"
      ],
      roiPromise: "Average label saves $3,200/month vs. manual processes",
      buttonText: "Start Free Trial",
      buttonVariant: "royal" as const,
      popular: true
    },
    {
      name: "Enterprise Label",
      price: "Custom",
      period: "pricing",
      description: "Built for Major and Large Independent Labels",
      badge: "Enterprise",
      badgeColor: "bg-gradient-to-r from-purple-600 to-pink-600",
      features: [
        "Unlimited artists and catalog",
        "Dedicated account manager",
        "Custom integrations", 
        "Advanced reporting suite",
        "White-label everything",
        "SLA guarantees",
        "Custom contract logic",
        "International compliance tools"
      ],
      enterpriseFeatures: [
        "Multi-label management",
        "Territory-specific user access",
        "Advanced audit trails",
        "Custom approval workflows",
        "Dedicated cloud infrastructure"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false
    }
  ]

  return (
    <section className="py-24 bg-background">
      <Container>
        <div className="text-center mb-16">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              90-Day ROI Guarantee
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Pricing That Scales
              <span className="block text-royal-600 dark:text-royal-400">
                with Your Label
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transparent pricing with no hidden fees. Start free for 90 days and see the ROI for yourself.
            </p>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <FadeIn key={index} delay={0.2 + index * 0.2}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className={`relative bg-card border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  plan.popular 
                    ? 'border-royal-600 dark:border-royal-400 scale-105' 
                    : 'border-border'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`${plan.badgeColor} text-white px-4 py-2 rounded-full text-sm font-medium`}>
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="mb-6">
                    {typeof plan.price === 'number' ? (
                      <div>
                        <span className="text-5xl font-bold text-royal-600 dark:text-royal-400">
                          ${plan.price}
                        </span>
                        <span className="text-muted-foreground">
                          /{plan.period}
                        </span>
                      </div>
                    ) : (
                      <div className="text-4xl font-bold text-royal-600 dark:text-royal-400">
                        {plan.price}
                      </div>
                    )}
                  </div>

                  {plan.roiPromise && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                      <p className="text-sm font-medium text-green-700 dark:text-green-300">
                        ROI Promise: {plan.roiPromise}
                      </p>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + featureIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-foreground">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Enterprise Features */}
                {plan.enterpriseFeatures && (
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-2 pt-4 border-t border-border">
                      <Crown className="w-5 h-5 text-royal-600 dark:text-royal-400" />
                      <span className="font-semibold text-royal-600 dark:text-royal-400">
                        Enterprise Features:
                      </span>
                    </div>
                    {plan.enterpriseFeatures.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + featureIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 bg-royal-100 dark:bg-royal-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Star className="w-3 h-3 text-royal-600 dark:text-royal-400" />
                        </div>
                        <span className="text-foreground">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <Button
                  variant={plan.buttonVariant}
                  size="lg"
                  className="w-full text-lg py-4 h-auto"
                >
                  {plan.buttonText}
                </Button>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Guarantee Section */}
        <FadeIn delay={0.6}>
          <div className="mt-20 bg-gradient-to-br from-royal-50 to-accent/5 dark:from-royal-900/10 dark:to-accent/5 border border-royal-200 dark:border-royal-800 rounded-2xl p-8 text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">
                90-Day ROI Guarantee
              </h3>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              If Royalti.io doesn't save your label money in 90 days, we'll refund your entire investment. 
              That's how confident we are in our platform's value.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-royal-600 dark:text-royal-400 mb-2">
                  No Risk
                </div>
                <div className="text-sm text-muted-foreground">
                  Full money-back guarantee
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-royal-600 dark:text-royal-400 mb-2">
                  No Contracts
                </div>
                <div className="text-sm text-muted-foreground">
                  Cancel anytime, no questions asked
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-royal-600 dark:text-royal-400 mb-2">
                  No Setup Fees
                </div>
                <div className="text-sm text-muted-foreground">
                  Start immediately with full access
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Trust Indicators */}
        <FadeIn delay={0.8}>
          <div className="mt-16 text-center">
            <div className="text-sm text-muted-foreground mb-4">
              Trusted by 200+ labels managing 50,000+ artists worldwide
            </div>
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                SOC 2 Certified
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                99.9% Uptime
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                GDPR Compliant
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}