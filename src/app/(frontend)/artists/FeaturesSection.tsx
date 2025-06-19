'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { BarChart3, Handshake, Target, TrendingUp, Users, Globe, Clock, DollarSign } from 'lucide-react'

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  const features = [
    {
      icon: BarChart3,
      title: 'Real-Time Earnings Dashboard',
      headline: 'Watch Your Money Grow in Real-Time',
      description: 'See your streaming royalties, download sales, and sync licensing income update in real-time. No more waiting months to know how your latest release is performing financially.',
      capabilities: [
        'Live streaming revenue from all platforms',
        'Daily, weekly, and monthly earning trends',
        'Song-by-song performance breakdown',
        'Territory-specific earnings analysis',
        'Platform comparison insights'
      ],
      benefit: 'Know your hit songs before your label does',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: Handshake,
      title: 'Transparent Split Management',
      headline: 'No More Split Surprises',
      description: 'Understand exactly how collaborator payments work. See your percentage of each song, track producer royalties, and know what everyone earns on every release.',
      capabilities: [
        'Visual split breakdowns for every song',
        'Automatic collaborator notifications',
        'Producer and songwriter royalty tracking',
        'Feature artist payment calculations',
        'Historical split performance analysis'
      ],
      benefit: 'Build better relationships through payment transparency',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: Target,
      title: 'Career Intelligence Analytics',
      headline: 'Make Smarter Career Decisions',
      description: 'Get insights that help you grow your music business. Understand which platforms pay best, what territories love your music, and how to optimize your release strategy.',
      capabilities: [
        'Best-performing territories and demographics',
        'Platform revenue optimization insights',
        'Genre and style performance analytics',
        'Release timing and strategy recommendations',
        'Collaboration ROI analysis'
      ],
      benefit: 'Turn your passion into a profitable business',
      gradient: 'from-orange-500 to-red-600'
    }
  ]

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Artist-Specific Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Three core features that artists care most about
          </p>
        </motion.div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}
            >
              {/* Feature Content */}
              <div className="flex-1 space-y-6">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {feature.headline}
                </h3>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Key Capabilities:</h4>
                  <ul className="space-y-2">
                    {feature.capabilities.map((capability, capIndex) => (
                      <li key={capIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={`p-4 bg-gradient-to-r ${feature.gradient} bg-opacity-10 dark:bg-opacity-20 rounded-lg border-l-4 border-blue-600 dark:border-blue-400`}>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Artist Benefit: <span className="font-normal italic">"{feature.benefit}"</span>
                  </p>
                </div>
              </div>
              
              {/* Feature Visual Placeholder */}
              <div className="flex-1">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <feature.icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Feature Visualization</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
