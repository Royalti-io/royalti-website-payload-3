'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { TrendingUp, Shield, Users, Clock } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

const staggerChildren = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const CounterAnimation = ({ number, delay = 0 }: { number: string, delay?: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: 'easeOut' }}
      className="text-3xl md:text-4xl font-bold text-royal-600 dark:text-royal-400"
    >
      {number}
    </motion.span>
  )
}

export const SocialProofBar: React.FC = () => {
  const stats = [
    {
      icon: Users,
      number: '1,000+',
      label: 'Artists & Labels Served',
      subtext: 'Trusted by professionals worldwide'
    },
    {
      icon: TrendingUp,
      number: '$2.5M+',
      label: 'Monthly Royalties Processed',
      subtext: 'Growing revenue for our clients'
    },
    {
      icon: Shield,
      number: '99.7%',
      label: 'Payment Accuracy Rate',
      subtext: 'Bank-level precision'
    },
    {
      icon: Clock,
      number: '45 mins',
      label: 'Average Setup Time',
      subtext: 'From signup to first report'
    }
  ]

  return (
    <section className="py-16 bg-gray-50/50 dark:bg-gray-900/50 border-y border-gray-200/50 dark:border-gray-800/50">
      <Container>
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.div variants={fadeInUp} className="mb-12">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Trusted by music professionals across 25+ countries
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="mb-4"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-royal-100 dark:bg-royal-900/50 rounded-xl mb-3">
                    <stat.icon className="w-6 h-6 text-royal-600 dark:text-royal-400" />
                  </div>
                  <CounterAnimation number={stat.number} delay={index * 0.2} />
                </motion.div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  {stat.label}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.subtext}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={fadeInUp}
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                SOC 2 Compliant
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                99.9% Uptime SLA
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                GDPR Ready
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Bank-Level Security
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
