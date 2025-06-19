'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  TrendingUp, 
  Eye, 
  Users, 
  BarChart3, 
  Shield, 
  Play, 
  MessageSquare, 
  Download,
  Music,
  Clock,
  CheckCircle
} from 'lucide-react'

export function FinalCTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  const benefits = [
    { icon: Eye, text: 'Total Transparency - See every penny from every stream' },
    { icon: Clock, text: 'Real-Time Knowledge - Know your success as it happens' },
    { icon: Users, text: 'Fair Collaborations - Build trust with producers and writers' },
    { icon: BarChart3, text: 'Business Intelligence - Make decisions based on real data' },
    { icon: TrendingUp, text: 'Financial Control - Understand and optimize your music income' }
  ]

  const ctaOptions = [
    {
      icon: Music,
      title: 'Watch Artist Demo',
      description: '3-minute tour of artist dashboard',
      type: 'secondary'
    },
    {
      icon: Users,
      title: 'Join Artist Community',
      description: 'Connect with other independent artists',
      type: 'secondary'
    },
    {
      icon: Download,
      title: 'Download Artist Guide',
      description: 'Free 15-page music business guide',
      type: 'secondary'
    }
  ]
  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-black relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Music. Your Money. Your Control.
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join 50,000+ artists who stopped wondering "where's my money?" and started building 
            real music businesses. Take control of your financial future and focus on what you 
            do best – creating amazing music.
          </p>
        </motion.div>
        {/* Artist Empowerment Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm">{benefit.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-12 py-6 rounded-2xl font-bold text-2xl shadow-2xl transition-all duration-300 mb-4"
          >
            Start Your Free Artist Trial
          </motion.button>
          <p className="text-gray-300 text-sm">
            Connect your music in 2 minutes • No credit card required • Cancel anytime
          </p>
        </motion.div>

        {/* Artist-Specific CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
        >
          {ctaOptions.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-6 rounded-xl transition-all duration-300 border border-white/20"
            >
              <option.icon className="w-8 h-8 mx-auto mb-3" />
              <div className="font-semibold mb-2">{option.title}</div>
              <div className="text-sm text-gray-300">{option.description}</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Testimonial Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-4xl mx-auto"
        >
          <blockquote className="text-white italic text-lg mb-4">
            "I wish I had this when I started. Royalti.io would have saved me years of confusion 
            and thousands of dollars in missed opportunities."
          </blockquote>
          <cite className="text-blue-400 font-semibold">— Alex Rivera, Independent Artist</cite>
        </motion.div>
      </div>
    </section>
  )
}
