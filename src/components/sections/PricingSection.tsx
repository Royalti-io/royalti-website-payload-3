'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Check, Star, Zap } from 'lucide-react'

export const PricingSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-black">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Transparent Pricing, Transparent Results
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto mb-4">
            Choose your plan and start your 90-day free trial today
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-300">
            All plans include complete feature access during trial
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              name: 'Starter',
              price: '$50',
              period: 'month',
              description: 'Perfect for Independent Artists & Small Labels',
              popular: false,
              features: [
                'Up to 25 artists',
                '5 connected platforms',
                'Basic reporting',
                'Email support',
                'Artist transparency portals',
                'Contract management'
              ]
            },
            {
              name: 'Professional',
              price: '$150',
              period: 'month',
              description: 'Ideal for Growing Labels & Managers',
              popular: true,
              features: [
                'Up to 100 artists',
                'Unlimited platform connections',
                'Advanced analytics',
                'Priority support',
                'Custom branding',
                'API access',
                'Bulk payment processing'
              ]
            },
            {
              name: 'Enterprise',
              price: 'Custom',
              period: 'pricing',
              description: 'For Large Labels & Distributors',
              popular: false,
              features: [
                'Unlimited artists',
                'White-label solution',
                'Dedicated account manager',
                'Custom integrations',
                'SLA guarantees',
                'Advanced security features'
              ]
            }
          ].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative bg-white dark:bg-gray-950 rounded-2xl p-8 shadow-lg hover:shadow-xl dark:shadow-black/50 transition-all duration-300 border ${
                plan.popular ? 'border-royal-600 dark:border-royal-400 transform scale-105' : 'border-gray-200 dark:border-gray-900'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-royal-600 dark:bg-royal-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-royal-600 dark:text-royal-400">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-500 dark:text-gray-400">/{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-300 ${
                  plan.popular
                    ? 'bg-royal-600 hover:bg-royal-700 dark:bg-royal-500 dark:hover:bg-royal-600 text-white shadow-lg'
                    : plan.name === 'Enterprise'
                    ? 'bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white'
                    : 'border-2 border-royal-600 dark:border-royal-400 text-royal-600 dark:text-royal-400 hover:bg-royal-50 dark:hover:bg-gray-900/30 dark:bg-transparent'
                }`}
                variant={plan.popular ? 'default' : plan.name === 'Enterprise' ? 'default' : 'outline'}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                {plan.name !== 'Enterprise' && <Zap className="ml-2 w-5 h-5" />}
              </Button>

              {plan.name !== 'Enterprise' && (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  90-day free trial included
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
