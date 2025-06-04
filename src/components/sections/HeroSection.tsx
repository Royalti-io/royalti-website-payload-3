'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Play, Shield, Zap, Users } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' }
}

const staggerChildren = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-black dark:via-gray-950 dark:to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/api/placeholder/1200/800')] opacity-5 dark:opacity-[0.02] bg-repeat bg-[length:400px_400px]" />
      
      <Container className="relative z-10">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="lg:pr-8">
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-royal-100 dark:bg-gray-900 text-royal-700 dark:text-royal-300 text-sm font-medium mb-6 border dark:border-gray-800">
                <Zap className="w-4 h-4 mr-2" />
                90-Day Free Trial • No Credit Card Required
              </div>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-5xl lg:text-6xl font-bold text-royal-800 dark:text-white leading-tight mb-6"
            >
              Turn Royalty Chaos Into 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-600 to-teal-600 dark:from-royal-400 dark:to-teal-400">
                {' '}Automated Clarity
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-200 leading-relaxed mb-8 max-w-xl"
            >
              Join 500+ music professionals who eliminated spreadsheet complexity with our all-in-one platform. 
              See results in 90 days—guaranteed.
            </motion.p>

            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-10"
            >
              Stop losing money to manual errors and missed payments. Royalti.io automates your entire catalog, 
              contract, and royalty workflow so you can focus on what matters: growing your music business.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Button 
                size="lg" 
                className="bg-royal-600 hover:bg-royal-700 dark:bg-royal-500 dark:hover:bg-royal-600 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Your 90-Day Free Trial
                <Zap className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-royal-600 dark:border-royal-400 text-royal-600 dark:text-royal-400 hover:bg-royal-50 dark:hover:bg-gray-900 dark:bg-transparent px-8 py-4 text-lg rounded-xl"
              >
                <Play className="mr-2 w-5 h-5" />
                See Live Demo
              </Button>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="text-sm text-gray-500 dark:text-gray-400 space-y-1"
            >
              <div>No credit card required • Full access • Setup in 5 minutes</div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Shield className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                SOC 2 Compliant
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Zap className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                99.9% Uptime
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Users className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                GDPR Ready
              </div>
            </motion.div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <motion.div 
            variants={fadeInUp}
            className="relative lg:pl-8"
          >
            <div className="relative">
              {/* Main Dashboard Image */}
              <div className="relative bg-white dark:bg-gray-950 rounded-2xl shadow-2xl p-4 transform rotate-3 hover:rotate-0 transition-transform duration-500 border dark:border-gray-800">
                <div className="bg-gradient-to-br from-royal-600 to-teal-600 dark:from-royal-500 dark:to-teal-500 rounded-xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Live Royalty Analytics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Revenue</span>
                      <span className="font-bold text-2xl">$47,583.24</span>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Spotify</span>
                        <span>$15,247.83</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Apple Music</span>
                        <span>$12,156.91</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>YouTube</span>
                        <span>$8,742.45</span>
                      </div>
                    </div>
                    <div className="bg-green-400/20 rounded-lg p-3 text-center">
                      <div className="text-sm">↗ 23% increase this month</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-950 rounded-xl shadow-xl p-4 border border-gray-100 dark:border-gray-800"
              >
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Payment Accuracy</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">99.7%</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute -top-6 -right-6 bg-white dark:bg-gray-950 rounded-xl shadow-xl p-4 border border-gray-100 dark:border-gray-800"
              >
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Time Saved</div>
                <div className="text-2xl font-bold text-royal-600 dark:text-royal-400">20+ hrs</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
