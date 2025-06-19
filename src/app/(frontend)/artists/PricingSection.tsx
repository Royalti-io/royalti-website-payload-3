'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Star, Crown, Users, Music, Smartphone, Phone, Headphones } from 'lucide-react'

export function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  const plans = [
    {
      name: 'Independent Artist',
      price: 'Free',
      description: 'Perfect for Starting Artists',
      icon: Music,
      features: [
        'Up to 10 songs tracked',
        'Basic streaming analytics',
        'Simple split calculations',
        'Mobile app access',
        'Email support',
        'Educational resources'
      ],
      bestFor: 'Artists just starting to earn money from music',
      cta: 'Start Free Forever',
      popular: false,
      gradient: 'from-green-500 to-teal-600'
    },
    {
      name: 'Professional Artist',
      price: '$25',
      period: '/month',
      description: 'Ideal for Serious Independent Artists',
      icon: Star,
      features: [
        'Unlimited song tracking',
        'Advanced analytics and insights',
        'Automatic collaborator payments',
        'Professional reporting tools',
        'Priority support',
        'Tax document preparation',
        'API access for third-party tools'
      ],
      bestFor: 'Artists earning $500+ monthly from music',
      cta: 'Start 90-Day Free Trial',
      popular: true,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      name: 'Enterprise Artist',
      price: '$75',
      period: '/month',
      description: 'For High-Earning Independent Artists',
      icon: Crown,
      features: [
        'Everything in Professional',
        'Custom branding for collaborator portals',
        'Advanced business intelligence',
        'Dedicated success manager',
        'Custom integrations',
        'White-label fan engagement tools'
      ],
      bestFor: 'Artists earning $5,000+ monthly from music',
      cta: 'Start 90-Day Free Trial',
      popular: false,
      gradient: 'from-purple-500 to-pink-600'
    }
  ]
  const guarantees = [
    { icon: Check, text: '90-day free trial on all paid plans' },
    { icon: Check, text: 'No long-term contracts - cancel anytime' },
    { icon: Check, text: 'Money-back guarantee if not satisfied' },
    { icon: Check, text: 'Free plan forever for developing artists' }
  ]

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Transparent Pricing for Transparent Artists
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Simple, artist-friendly pricing with clear value
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-blue-600 dark:ring-blue-400 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center mb-6`}>
                <plan.icon className="w-8 h-8 text-white" />
              </div>

              {/* Plan details */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                {plan.period && <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              {/* Best for */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Best For:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{plan.bestFor}</p>
              </div>

              {/* CTA */}
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Artist Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Artist Guarantees
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="flex items-start gap-3">
                <guarantee.icon className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300">{guarantee.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
