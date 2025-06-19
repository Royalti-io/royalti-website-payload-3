"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export const DistributorHeroSection: React.FC = () => {
  const stats = [
    { number: "50+", label: "Distribution Companies Trust Royalti.io" },
    { number: "100,000+", label: "Artists Served Through Platform" },
    { number: "$25M+", label: "Monthly Distribution Volume" },
    { number: "99.8%", label: "Processing Accuracy at Scale" }
  ]

  return (
    <section className="relative bg-gradient-to-br from-background via-background to-royal-50/20 dark:to-black/40 py-24 lg:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 border border-royal-200/20 dark:border-royal-800/20 rounded-full"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -left-32 w-64 h-64 border border-accent/20 dark:border-accent/10 rounded-full"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-royal-500/10 dark:bg-royal-400/5 rounded-full blur-xl"
        />
      </div>

      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <FadeIn delay={0.1}>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Power Your Distribution
                <span className="block text-royal-600 dark:text-royal-400">
                  with Automated
                </span>
                <span className="block text-accent dark:text-accent">Royalty Intelligence</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                Process millions of transactions for thousands of artists with enterprise-grade accuracy. 
                Royalti.io handles the complexity while you focus on acquiring and serving more clients.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Stop losing distribution clients to manual processing delays and errors. Join leading 
                distributors using Royalti.io to automate bulk royalty processing, provide white-label 
                artist portals, and scale operations without proportional cost increases.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  variant="royal"
                  className="text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300 bg-royal-600 hover:bg-royal-700 dark:bg-royal-500 dark:hover:bg-royal-600"
                >
                  Schedule Enterprise Demo
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-4 h-auto border-royal-200 dark:border-royal-700 hover:border-royal-400 dark:hover:border-royal-500 hover:bg-royal-50 dark:hover:bg-royal-900/20"
                >
                  Calculate Distribution ROI
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="text-sm text-muted-foreground">
                See platform configured for distributor workflows
              </p>
            </FadeIn>
          </div>

          {/* Visual Side */}
          <div className="relative">
            <FadeIn delay={0.6} direction="right">
              <div className="relative">
                {/* Mock enterprise dashboard */}
                <div className="bg-card dark:bg-gray-900 border border-border dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="bg-royal-600 dark:bg-gray-800 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <div className="ml-4 text-white text-sm font-medium">
                          Distribution Control Center
                        </div>
                      </div>
                      <div className="text-white text-xs">
                        Enterprise Dashboard
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6 bg-white dark:bg-black">
                    {/* Processing stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-royal-50 dark:bg-royal-800/20 p-4 rounded-lg border dark:border-royal-700/30">
                        <div className="text-2xl font-bold text-royal-600 dark:text-royal-400">
                          2.5K
                        </div>
                        <div className="text-sm text-muted-foreground">Active Artists</div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-800/20 p-4 rounded-lg border dark:border-green-700/30">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          $1.2M
                        </div>
                        <div className="text-sm text-muted-foreground">Monthly Volume</div>
                      </div>
                      <div className="bg-accent/10 dark:bg-accent/5 p-4 rounded-lg border dark:border-accent/20">
                        <div className="text-2xl font-bold text-accent">
                          99.8%
                        </div>
                        <div className="text-sm text-muted-foreground">Accuracy</div>
                      </div>
                    </div>
                    
                    {/* Processing indicator */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Bulk Processing</span>
                        <span className="text-sm text-muted-foreground">15.7M transactions</span>
                      </div>
                      <div className="w-full bg-muted dark:bg-gray-800 rounded-full h-3">
                        <motion.div 
                          className="bg-gradient-to-r from-royal-600 to-accent h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "87%" }}
                          transition={{ duration: 3, delay: 1 }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Processing complete in 2.3 hours
                      </div>
                    </div>

                    {/* Recent distributions */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Recent Distributions</div>
                      {[
                        { artist: "SoundWave Records", amount: "$24,500", status: "Completed" },
                        { artist: "Global Music Ltd", amount: "$18,200", status: "Processing" },
                        { artist: "Indie Flow Distribution", amount: "$31,750", status: "Completed" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.5 + index * 0.2 }}
                          className="flex justify-between items-center p-2 bg-muted/50 dark:bg-gray-800/50 rounded text-sm"
                        >
                          <span className="font-medium">{item.artist}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-green-600 dark:text-green-400 font-semibold">{item.amount}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              item.status === 'Completed' 
                                ? 'bg-green-100 dark:bg-green-800/30 text-green-700 dark:text-green-300' 
                                : 'bg-yellow-100 dark:bg-yellow-800/30 text-yellow-700 dark:text-yellow-300'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating indicators */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
                >
                  ⚡ Real-time Processing
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-accent text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
                >
                  🏢 Enterprise Ready
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Stats Bar */}
        <FadeIn delay={0.8}>
          <div className="mt-20 pt-12 border-t border-border dark:border-gray-700">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-royal-600 dark:text-royal-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}