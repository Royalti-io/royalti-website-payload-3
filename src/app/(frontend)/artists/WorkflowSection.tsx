'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link, Eye, Zap, ArrowRight, Music, BarChart3, CreditCard } from 'lucide-react'

export function WorkflowSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  const steps = [
    {
      number: 1,
      icon: Link,
      title: 'Connect Your Music',
      duration: '2 Minutes',
      description: 'Link your streaming platform accounts, connect your distribution service, and watch automatic discovery of your entire catalog with historical data imported automatically.',
      experience: '"I connected my accounts and immediately saw 2 years of earnings I never knew about"',
      visual: 'Artist connecting Spotify, Apple Music, and distribution accounts'
    },
    {
      number: 2,
      icon: Eye,
      title: 'Understand Your Earnings',
      duration: 'Real-Time',
      description: 'Get real-time streaming revenue updates, clear breakdown by song and platform, collaboration splits calculated automatically, and territory and demographic insights.',
      experience: '"I finally understand which songs actually make money and which platforms pay best"',
      visual: 'Beautiful dashboard showing streaming revenue flowing in'
    },
    {
      number: 3,
      icon: Zap,
      title: 'Get Paid Transparently',
      duration: 'Automated',
      description: 'Receive instant payments when money arrives, automatic collaborator distributions, clear payment notifications and receipts, and complete transaction history.',
      experience: '"My producers love working with me because they get paid immediately and can see everything is fair"',
      visual: 'Automatic payments flowing to artist and collaborators'
    }
  ]
  return (
    <section ref={ref} className="py-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            From Release to Payment in 3 Simple Steps
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Simple, visual step-by-step process for artists
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <svg className="w-full h-2" viewBox="0 0 800 8">
              <motion.path
                d="M0,4 Q200,4 400,4 T800,4"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-blue-300 dark:text-blue-700"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </svg>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                  {step.number}
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 pt-12">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <step.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>

                  {/* Title and duration */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                      {step.duration}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Experience quote */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-600 dark:border-blue-400">
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                      Artist Experience: {step.experience}
                    </p>
                  </div>
                </div>

                {/* Arrow for large screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105">
              Try This with Your Music - Start Free Trial
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
