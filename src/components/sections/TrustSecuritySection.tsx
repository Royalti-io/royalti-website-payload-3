'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Shield, Lock, FileCheck, Cloud, Zap, Users } from 'lucide-react'

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

export const TrustSecuritySection: React.FC = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'SOC 2 Type II Certified',
      description: 'Annual third-party security audits'
    },
    {
      icon: Lock,
      title: 'GDPR & CCPA Compliant',
      description: 'Full data protection compliance'
    },
    {
      icon: Lock,
      title: 'Bank-Level Encryption',
      description: '256-bit SSL encryption for all data'
    },
    {
      icon: Cloud,
      title: 'Google Cloud Infrastructure',
      description: '99.9% uptime SLA'
    },
    {
      icon: Shield,
      title: 'Multi-Factor Authentication',
      description: 'Advanced access controls'
    },
    {
      icon: FileCheck,
      title: 'Audit Trails',
      description: 'Complete transaction history'
    }
  ]

  const integrationPartners = [
    'Spotify for Artists',
    'Apple Music for Artists',
    'YouTube Analytics',
    'ASCAP/BMI',
    'SoundExchange',
    'PayPal/Stripe'
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <Container>
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Enterprise-Grade Security & Compliance
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto"
          >
            Your data is protected by the same security standards used by banks and financial institutions
          </motion.p>
        </motion.div>

        {/* Security Features Grid */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-royal-100 dark:bg-royal-900/50 rounded-xl mb-4">
                <feature.icon className="w-6 h-6 text-royal-600 dark:text-royal-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Integration Partners */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.h3 
            variants={fadeInUp}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8"
          >
            Trusted Integration Partners
          </motion.h3>
          
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
          >
            {integrationPartners.map((partner, index) => (
              <motion.div
                key={partner}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center justify-center h-16"
              >
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300 text-center">
                  {partner}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            variants={fadeInUp}
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                99.9% Uptime SLA
              </div>
              <div className="flex items-center">
                <Lock className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                Zero Data Breaches
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                500+ Happy Customers
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                24/7 Monitoring
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
