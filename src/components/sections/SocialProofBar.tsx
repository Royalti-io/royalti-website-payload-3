'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Users, DollarSign, CheckCircle, Clock } from 'lucide-react'

const stats = [
  {
    icon: Users,
    number: '1,000+',
    label: 'Artists & Labels Served',
    color: 'text-royal-600 dark:text-royal-400'
  },
  {
    icon: DollarSign,
    number: '$2.5M+',
    label: 'Monthly Royalties Processed',
    color: 'text-green-600 dark:text-green-400'
  },
  {
    icon: CheckCircle,
    number: '99.7%',
    label: 'Payment Accuracy Rate',
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    icon: Clock,
    number: '45 mins',
    label: 'Average Setup Time',
    color: 'text-orange-600 dark:text-orange-400'
  }
]

export const SocialProofBar: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-900">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-lg text-gray-600 dark:text-gray-200">
            Trusted by independent artists, record labels, and distributors across 25+ countries
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className={`text-3xl lg:text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
