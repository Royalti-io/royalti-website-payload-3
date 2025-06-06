'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Play, ChevronRight, TrendingUp } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' }
}

const fadeInLeft = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
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
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 dark:from-black dark:via-gray-950 dark:to-gray-900 overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-72 h-72 bg-royal-200/30 dark:bg-royal-800/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl"
      />
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-40 right-10 w-72 h-72 bg-purple-200/30 dark:bg-purple-800/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl"
      />

      <Container className="relative z-10">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="text-center lg:text-left">
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-royal-100/80 dark:bg-royal-900/50 text-royal-700 dark:text-royal-300 text-sm font-medium border border-royal-200/50 dark:border-royal-800/50 backdrop-blur-sm">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full mr-2"
                />
                500+ Music Professionals Trust Royalti.io
              </div>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Turn Royalty Chaos Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-600 to-purple-600 dark:from-royal-400 dark:to-purple-400">
                Automated Clarity
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Join 500+ music professionals who eliminated spreadsheet complexity with our all-in-one platform. See results in 90 days—guaranteed.
            </motion.p>

            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-500 dark:text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              Stop losing money to manual errors and missed payments. Royalti.io automates your entire catalog, contract, and royalty workflow.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button 
                size="lg" 
                className="group bg-royal-600 hover:bg-royal-700 dark:bg-royal-500 dark:hover:bg-royal-600 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Start Your 90-Day Free Trial
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => setIsVideoModalOpen(true)}
                className="group border-2 border-royal-600 dark:border-royal-400 text-royal-600 dark:text-royal-400 hover:bg-royal-50 dark:hover:bg-gray-800 px-8 py-4 text-lg rounded-xl"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                See Live Demo
              </Button>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 dark:text-gray-400"
            >
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                No credit card required
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Full access
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Setup in 5 minutes
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={fadeInLeft}
            className="relative"
          >
            <div className="relative">
              <motion.div 
                whileHover={{ rotate: 0, scale: 1.02 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transform rotate-2 transition-all duration-500"
              >
                <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="ml-4 text-xs text-gray-500 dark:text-gray-400">royalti.io/dashboard</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Royalty Dashboard</h3>
                    <div className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-sm font-medium flex items-center">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-green-500 rounded-full mr-2"
                      />
                      Live
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-royal-600 to-purple-600 dark:from-royal-500 dark:to-purple-500 rounded-lg p-4 mb-6">
                    <div className="text-white mb-2">
                      <div className="text-sm opacity-80">Total Revenue (This Month)</div>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-2xl font-bold"
                      >
                        $24,847.32
                      </motion.div>
                    </div>
                    <div className="h-16 bg-white/20 rounded flex items-end space-x-1 p-2">
                      {[40, 65, 45, 80, 60, 90, 75, 85, 70, 95, 85, 100].map((height, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                          className="bg-white/60 rounded-t flex-1"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Platform Breakdown</h4>
                    {[
                      { name: 'Spotify', amount: '$12,340', color: 'bg-green-500' },
                      { name: 'Apple Music', amount: '$7,892', color: 'bg-gray-800 dark:bg-gray-200' },
                      { name: 'YouTube Music', amount: '$3,215', color: 'bg-red-500' },
                      { name: 'Other Platforms', amount: '$1,400', color: 'bg-blue-500' }
                    ].map((platform, i) => (
                      <motion.div 
                        key={platform.name} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.5 + i * 0.1 }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${platform.color}`}></div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{platform.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{platform.amount}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -top-4 -right-4 bg-royal-yellow dark:bg-royal-yellow/90 text-royal-900 dark:text-royal-100 px-3 py-2 rounded-full text-sm font-semibold shadow-lg"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  99.7% Accuracy
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-4 -left-4 bg-green-500 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center"
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Real-time Updates
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Royalti.io Demo</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsVideoModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </Button>
            </div>
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-gray-500 dark:text-gray-400 text-center">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Demo video would be embedded here</p>
                <p className="text-sm mt-2">Connect your actual demo video or interactive tour</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
