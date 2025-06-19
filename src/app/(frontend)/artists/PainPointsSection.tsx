'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { X, Check, AlertCircle, Clock, HelpCircle, Eye, Zap, BarChart3 } from 'lucide-react'

export function PainPointsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  const painPoints = [
    {
      icon: HelpCircle,
      before: 'Payment Mystery',
      beforeDesc: '"I have millions of streams but only got $50?"',
      after: 'Complete Transparency',
      afterDesc: 'See exactly how much each stream pays you'
    },
    {
      icon: Clock,
      before: 'Delayed Information',
      beforeDesc: 'Waiting 3-6 months to see streaming numbers',
      after: 'Real-Time Updates',
      afterDesc: 'Know your earnings as soon as platforms report'
    },
    {
      icon: AlertCircle,
      before: 'Split Confusion',
      beforeDesc: 'Unclear how collaborator payments are calculated',
      after: 'Clear Split Tracking',
      afterDesc: 'Understand every collaborator payment automatically'
    }
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
            The Artist's Dilemma: 
            <span className="text-red-600 dark:text-red-400"> Your Music, Your Confusion</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* What Artists Experience Today */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-2xl border border-red-200 dark:border-red-800">
              <h3 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-6 flex items-center gap-3">
                <X className="w-6 h-6" />
                What Artists Experience Today
              </h3>
              <div className="space-y-4">
                {painPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                  >
                    <point.icon className="w-5 h-5 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {point.before}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {point.beforeDesc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Your New Reality with Royalti.io */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-2xl border border-green-200 dark:border-green-800">
              <h3 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-6 flex items-center gap-3">
                <Check className="w-6 h-6" />
                Your New Reality with Royalti.io
              </h3>
              <div className="space-y-4">
                {painPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {point.after}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {point.afterDesc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
