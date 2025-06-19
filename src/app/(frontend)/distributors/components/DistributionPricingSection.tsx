"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Container } from '@/components/ui/container'
import { Check, Star, Crown, Building2, Users, Zap, Shield, HeadphonesIcon } from 'lucide-react'

export const DistributionPricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  const pricingTiers = [
    {
      name: "Distribution Starter",
      price: { monthly: 499, annual: 4990 },
      description: "For Growing Distribution Companies",
      popular: false,
      features: [
        "Up to 1,000 active artists",
        "10 team member accounts",
        "Standard API access (10,000 calls/month)",
        "White-label artist portals",
        "24/7 email support",
        "Standard reporting suite",
        "Multi-currency processing",
        "Setup and migration assistance"
      ],
      icon: Building2,
      color: "blue",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      buttonClass: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
    },
    {
      name: "Distribution Professional",
      price: { monthly: 1499, annual: 14990 },
      description: "For Established Distribution Companies",
      popular: true,
      features: [
        "Up to 10,000 active artists",
        "Unlimited team accounts",
        "Enhanced API access (100,000 calls/month)",
        "Custom branding and theming",
        "Priority phone support",
        "Advanced analytics and reporting",
        "Bulk processing automation",
        "International compliance tools",
        "Dedicated implementation manager"
      ],
      icon: Star,
      color: "royal",
      bgColor: "bg-royal-50 dark:bg-royal-900/20",
      borderColor: "border-royal-200 dark:border-royal-800",
      buttonClass: "bg-royal-600 hover:bg-royal-700 dark:bg-royal-500 dark:hover:bg-royal-600"
    },
    {
      name: "Distribution Enterprise",
      price: { monthly: "Custom", annual: "Custom" },
      description: "For Large-Scale Distribution Operations",
      popular: false,
      features: [
        "Unlimited artists and catalog",
        "Dedicated cloud infrastructure",
        "Custom API limits and SLA",
        "White-label everything including mobile apps",
        "Dedicated account team",
        "Custom compliance and reporting",
        "Advanced security and audit features",
        "Direct platform partnerships",
        "Custom contract logic engine",
        "Multi-distributor management",
        "Advanced workflow automation",
        "Real-time business intelligence"
      ],
      icon: Crown,
      color: "purple",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      buttonClass: "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
    }
  ]

  const volumePricing = [
    {
      title: "Transaction-Based Pricing",
      description: "Pay per successful transaction",
      icon: Zap,
      features: ["No fixed monthly costs", "Scale with your volume", "Transparent per-transaction fees"]
    },
    {
      title: "Volume Discounts",
      description: "Better rates for high-volume accounts",
      icon: Users,
      features: ["Tiered pricing structure", "Negotiate custom rates", "Enterprise volume discounts"]
    },
    {
      title: "Revenue Sharing",
      description: "Partnership models available",
      icon: Shield,
      features: ["Revenue-based partnerships", "Shared success models", "Custom profit sharing"]
    }
  ]

  return (
    <section className="py-24 bg-muted/30 dark:bg-black/20">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
              Enterprise Distribution
              <span className="block text-royal-600 dark:text-royal-400">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transparent pricing that scales with your distribution business
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-muted dark:bg-gray-800 rounded-lg p-1 mb-12">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-royal-600 text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-royal-600 text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Annual
                <span className="ml-2 text-xs bg-green-100 dark:bg-green-800/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                  Save 15%
                </span>
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <FadeIn key={tier.name} delay={0.2 + index * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`relative h-full p-8 ${tier.bgColor} border-2 ${
                  tier.popular ? 'border-royal-400 dark:border-royal-500' : tier.borderColor
                } rounded-2xl ${tier.popular ? 'scale-105 shadow-xl' : 'hover:shadow-lg'} transition-all duration-300`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-royal-600 dark:bg-royal-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <tier.icon className="w-8 h-8 text-royal-600 dark:text-royal-400" />
                  </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {tier.description}
                  </p>
                  
                  {/* Price */}
                  <div className="mb-6">
                    {typeof tier.price[billingCycle] === 'string' ? (
                      <div className="text-4xl font-bold text-royal-600 dark:text-royal-400">
                        {tier.price[billingCycle]}
                      </div>
                    ) : (
                      <div>
                        <div className="text-4xl font-bold text-royal-600 dark:text-royal-400">
                          ${tier.price[billingCycle].toLocaleString()}
                        </div>
                        <div className="text-muted-foreground">
                          per {billingCycle === 'monthly' ? 'month' : 'year'}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full py-3 px-6 ${tier.buttonClass} text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl`}>
                    {tier.name === 'Distribution Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </button>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 + featureIndex * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Volume Pricing Options */}
        <FadeIn delay={0.6}>
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Volume Pricing Options
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Flexible pricing models designed for different distribution business structures
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {volumePricing.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="p-6 bg-white dark:bg-gray-800 border border-border dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-royal-100 dark:bg-royal-800/50 rounded-lg">
                      <option.icon className="w-6 h-6 text-royal-600 dark:text-royal-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {option.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500 dark:text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Enterprise Features */}
        <FadeIn delay={0.8}>
          <div className="p-8 bg-gradient-to-r from-purple-50 to-royal-50 dark:from-purple-900/20 dark:to-royal-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
            <div className="text-center mb-8">
              <Crown className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Enterprise Distribution Features
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Advanced capabilities for large-scale distribution operations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Custom Contract Logic Engine", icon: "⚙️" },
                { title: "Multi-Distributor Management", icon: "🏢" },
                { title: "Advanced Workflow Automation", icon: "🔄" },
                { title: "Real-Time Business Intelligence", icon: "📊" },
                { title: "Dedicated Technical Support", icon: "👨‍💻" },
                { title: "Custom Security & Compliance", icon: "🔒" },
                { title: "White-Label Mobile Apps", icon: "📱" },
                { title: "Direct Platform Partnerships", icon: "🤝" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                  className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-border dark:border-gray-700"
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="text-sm font-medium text-foreground">
                    {feature.title}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA Section */}
        <FadeIn delay={1}>
          <div className="mt-16 text-center p-8 bg-royal-50 dark:bg-royal-900/20 rounded-2xl border border-royal-200 dark:border-royal-800">
            <HeadphonesIcon className="w-12 h-12 text-royal-600 dark:text-royal-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Need Help Choosing the Right Plan?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our distribution experts will help you find the perfect plan for your business size, 
              volume, and growth goals. Get personalized pricing and feature recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-royal-600 hover:bg-royal-700 dark:bg-royal-500 dark:hover:bg-royal-600 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl">
                Schedule Pricing Consultation
              </button>
              <button className="px-8 py-4 border border-royal-600 dark:border-royal-400 text-royal-600 dark:text-royal-400 hover:bg-royal-50 dark:hover:bg-royal-900/20 rounded-lg font-medium transition-colors">
                Compare All Features
              </button>
            </div>
            
            <div className="mt-6 text-sm text-muted-foreground">
              💬 Questions? Call us at <span className="font-medium text-royal-600 dark:text-royal-400">(555) 123-4567</span> or 
              <span className="font-medium text-royal-600 dark:text-royal-400 ml-1">chat with an expert</span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}