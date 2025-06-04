'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Zap, Eye, TrendingUp, Check } from 'lucide-react'

const pillars = [
  {
    icon: Zap,
    title: 'Complete Automation',
    subtitle: 'Set It and Forget It',
    description: 'Connect your streaming platforms, distribution channels, and accounting systems once. Royalti.io automatically imports, calculates, and distributes royalties based on your contracts.',
    benefit: 'Eliminate 95% of manual data entry',
    features: [
      'Automated royalty calculations from 50+ sources',
      'Smart contract management with deadline alerts',
      'Real-time catalog organization and metadata sync'
    ],
    color: 'from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500'
  },
  {
    icon: Eye,
    title: 'Real-Time Transparency',
    subtitle: 'Everyone Sees Everything',
    description: 'Artists, collaborators, and stakeholders access real-time earnings data through personalized dashboards. No more "when will I get paid?" conversations.',
    benefit: 'Reduce payment inquiries by 80%',
    features: [
      'Source-level royalty tracking and attribution',
      'Detailed earnings breakdowns by platform, territory, and time',
      'Customizable reports for artists, managers, and accountants'
    ],
    color: 'from-green-500 to-green-600 dark:from-green-400 dark:to-green-500'
  },
  {
    icon: TrendingUp,
    title: 'Growth Intelligence',
    subtitle: 'Data-Driven Decisions',
    description: 'Advanced analytics reveal your most profitable artists, territories, and revenue streams. Identify opportunities and optimize your catalog strategy.',
    benefit: 'Increase revenue per artist by 25%',
    features: [
      'Unlimited catalog size with enterprise-grade performance',
      '50+ platform integrations and growing',
      'API access for custom workflows and third-party tools'
    ],
    color: 'from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500'
  }
]

export const CoreValuePillars: React.FC = () => {
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
            Everything You Need to Scale Your Music Business
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto">
            Three core capabilities that transform how you manage royalties, contracts, and catalog growth
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-950 rounded-2xl p-8 shadow-lg hover:shadow-xl dark:shadow-black/50 transition-shadow duration-300 h-full border dark:border-gray-900"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${pillar.color} flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{pillar.title}</h3>
                <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-4">{pillar.subtitle}</h4>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-6">{pillar.description}</p>
                
                <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-3 mb-6 border dark:border-green-800/20">
                  <div className="text-sm font-semibold text-green-700 dark:text-green-400">{pillar.benefit}</div>
                </div>

                <ul className="space-y-3">
                  {pillar.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
