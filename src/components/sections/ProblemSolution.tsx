'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { X, Check } from 'lucide-react'

const problems = [
  {
    title: 'Manual Errors',
    description: 'Spreadsheet mistakes cost the average label $12K annually'
  },
  {
    title: 'Time Waste',
    description: '15+ hours monthly on royalty calculations and reporting'
  },
  {
    title: 'Payment Delays',
    description: 'Artists wait 60+ days for accurate statements'
  },
  {
    title: 'Data Silos',
    description: 'Information scattered across platforms and files'
  },
  {
    title: 'Compliance Risk',
    description: 'Missing audit trails and documentation'
  }
]

const solutions = [
  {
    title: 'Zero Manual Errors',
    description: 'AI-powered calculations with 99.7% accuracy'
  },
  {
    title: 'Save 20+ Hours Monthly',
    description: 'Automated reporting and payments'
  },
  {
    title: 'Real-Time Transparency',
    description: 'Artists see earnings instantly'
  },
  {
    title: 'Unified Data',
    description: 'All sources connected in one dashboard'
  },
  {
    title: 'Audit-Ready',
    description: 'Complete transaction history and documentation'
  }
]

export const ProblemSolution: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Problems Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-6">
              Your Current Royalty Process Is Costing You Money
            </h2>
            <div className="space-y-6">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center border dark:border-red-800/50">
                      <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{problem.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Solutions Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-6">
              Royalti.io Automates Everything
            </h2>
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center border dark:border-green-800/50">
                      <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{solution.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{solution.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
