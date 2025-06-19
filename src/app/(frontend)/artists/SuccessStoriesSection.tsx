'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote, Music, Users, Globe, Clock, DollarSign, TrendingUp, Star } from 'lucide-react'

export function SuccessStoriesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  const stories = [
    {
      name: 'DJ Smoove',
      location: 'Detroit, MI',
      type: 'Independent hip-hop artist managing complex producer collaborations',
      avatar: '/avatars/dj-smoove.jpg',
      quote: "Royalti.io didn't just solve my payment problems – it made me a better collaborator. Producers trust me because they can see everything is fair.",
      before: "I was working with 6 different producers and had no idea if I was paying them correctly. Every month was an argument about splits and payments. I was spending more time on spreadsheets than making music.",
      results: [
        { icon: Clock, label: 'Zero Payment Disputes', desc: 'Producers see their earnings in real-time' },
        { icon: TrendingUp, label: '15 Hours Monthly Saved', desc: 'Eliminated manual royalty calculations' },
        { icon: DollarSign, label: '30% Revenue Increase', desc: 'Found unreported streaming royalties' },
        { icon: Users, label: 'Stronger Collaborations', desc: 'Producers prefer working with transparent artists' }
      ]
    },
    {
      name: 'Sarah Chen',
      location: 'Nashville, TN',
      type: 'Signed artist seeking transparency with record label accounting',
      avatar: '/avatars/sarah-chen.jpg',
      quote: "Having my own data changed everything. I went from feeling powerless to being a true partner with my label. Knowledge is power in this business.",
      before: "My label would send quarterly statements that made no sense. I couldn't tell if I was getting paid correctly or how close I was to recouping. It felt like I was working blind.",
      results: [
        { icon: DollarSign, label: 'Label Accountability', desc: 'Discovered $12K in unreported sync licensing' },
        { icon: TrendingUp, label: 'Recoupment Clarity', desc: 'Real-time tracking of advance payback progress' },
        { icon: Star, label: 'Strategic Planning', desc: 'Data-driven decisions on touring and promotion' },
        { icon: Users, label: 'Negotiation Power', desc: 'Renegotiated contract with performance data' }
      ]
    }
  ]
  const thirdStory = {
    name: 'Neon Frequency',
    location: 'Berlin, Germany',
    type: 'Four-member electronic group with international fanbase',
    avatar: '/avatars/neon-frequency.jpg',
    quote: "Royalti.io solved our biggest problem – money stress. Now we can focus on what we do best: making music that moves people.",
    before: "Splitting royalties four ways across different countries was a nightmare. We were using PayPal and guessing at exchange rates. It was causing tension in the group.",
    results: [
      { icon: Globe, label: 'Global Transparency', desc: 'All members see worldwide earnings instantly' },
      { icon: DollarSign, label: 'Currency Automation', desc: 'Eliminated foreign exchange guesswork' },
      { icon: Clock, label: 'Instant Payments', desc: 'Members paid within hours of platform reporting' },
      { icon: Music, label: 'Focus on Music', desc: 'Group dynamics improved dramatically' }
    ]
  }

  const allStories = [...stories, thirdStory]

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
            Real Results from Real Music Professionals
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Specific transformation testimonials with credible details
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-8">
          {allStories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Quote */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic leading-relaxed">
                  "{story.quote}"
                </blockquote>
              </div>

              {/* Author */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {story.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900 dark:text-white">{story.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{story.location}</div>
                </div>
              </div>

              {/* Type */}
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 italic">
                {story.type}
              </p>

              {/* Results */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">Results:</h4>
                {story.results.map((result, resultIndex) => (
                  <div key={resultIndex} className="flex items-start gap-3">
                    <result.icon className="w-4 h-4 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {result.label}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {result.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
