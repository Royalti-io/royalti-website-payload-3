'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Check, X, AlertTriangle } from 'lucide-react'

const StatusIcon: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'included':
      return <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
    case 'missing':
      return <X className="w-5 h-5 text-red-500 dark:text-red-400" />
    case 'limited':
      return <AlertTriangle className="w-5 h-5 text-orange-500 dark:text-orange-400" />
    default:
      return null
  }
}

export const FeatureComparison: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Why Music Professionals Choose Royalti.io
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto">
            Compare our specialized music industry solution with generic alternatives
          </p>
        </motion.div>

        <div className="bg-white dark:bg-black rounded-2xl shadow-xl overflow-hidden border dark:border-gray-900">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-royal-600 dark:bg-royal-700 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold">Royalti.io</th>
                  <th className="px-6 py-4 text-center font-semibold">Spreadsheets</th>
                  <th className="px-6 py-4 text-center font-semibold">Generic Accounting</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: 'Music Industry Specific',
                    royalti: { status: 'included', text: 'Built for music' },
                    spreadsheets: { status: 'missing', text: 'Generic only' },
                    accounting: { status: 'missing', text: 'Generic only' }
                  },
                  {
                    feature: 'Multi-Platform Sync',
                    royalti: { status: 'included', text: '50+ integrations' },
                    spreadsheets: { status: 'missing', text: 'Manual import' },
                    accounting: { status: 'limited', text: 'Limited' }
                  },
                  {
                    feature: 'Setup Time',
                    royalti: { status: 'included', text: '5 minutes' },
                    spreadsheets: { status: 'missing', text: 'Weeks' },
                    accounting: { status: 'missing', text: 'Weeks' }
                  }
                ].map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-black'}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <StatusIcon status={row.royalti.status} />
                        <span className="font-semibold text-royal-600 dark:text-royal-400">{row.royalti.text}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <StatusIcon status={row.spreadsheets.status} />
                        <span className="text-gray-600 dark:text-gray-300">{row.spreadsheets.text}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <StatusIcon status={row.accounting.status} />
                        <span className="text-gray-600 dark:text-gray-300">{row.accounting.text}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  )
}
