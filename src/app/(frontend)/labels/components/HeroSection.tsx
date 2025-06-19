"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export const HeroSection: React.FC = () => {
  const stats = [
    { number: "200+", label: "Record Labels Trust Royalti.io" },
    { number: "50,000+", label: "Artists Managed on Platform" },
    { number: "$12M+", label: "Monthly Royalties Processed" },
    { number: "99.7%", label: "Payment Accuracy Rate" }
  ]

  return (
    <section className="relative bg-gradient-to-br from-background via-background to-royal-50/20 dark:to-royal-900/20 py-24 lg:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 border border-royal-200/30 dark:border-royal-800/30 rounded-full"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -left-32 w-64 h-64 border border-accent/20 rounded-full"
        />
      </div>

      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <FadeIn delay={0.1}>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Scale Your Label
                <span className="block text-royal-600 dark:text-royal-400">
                  Without the Administrative
                </span>
                <span className="block text-accent">Headaches</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                From 10 artists to 1,000+ – Royalti.io automates your entire royalty workflow 
                so you can focus on discovering and developing talent, not drowning in spreadsheets.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Stop losing money to manual errors and delayed payments. Join 200+ record labels 
                using Royalti.io to automate catalog management, streamline royalty distributions, 
                and provide transparent reporting that builds artist trust.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  variant="royal"
                  className="text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Your 90-Day Free Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-4 h-auto border-royal-200 dark:border-royal-700 hover:border-royal-400 dark:hover:border-royal-500"
                >
                  See Label Demo
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="text-sm text-muted-foreground">
                No credit card required • Import your existing catalog in minutes
              </p>
            </FadeIn>
          </div>

          {/* Visual Side */}
          <div className="relative">
            <FadeIn delay={0.6} direction="right">
              <div className="relative">
                {/* Mock dashboard preview */}
                <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                  <div className="bg-royal-600 dark:bg-royal-700 p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div className="ml-4 text-white text-sm font-medium">
                        Royalti.io Dashboard
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-royal-50 dark:bg-royal-800/50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-royal-600 dark:text-royal-400">
                          45
                        </div>
                        <div className="text-sm text-muted-foreground">Active Artists</div>
                      </div>
                      <div className="bg-accent/10 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-accent">
                          $24.5K
                        </div>
                        <div className="text-sm text-muted-foreground">This Month</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Processing...</span>
                        <span className="text-sm text-muted-foreground">99.7%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div 
                          className="bg-royal-600 dark:bg-royal-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "99.7%" }}
                          transition={{ duration: 2, delay: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating stats */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
                >
                  ✓ Real-time Processing
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Stats Bar */}
        <FadeIn delay={0.8}>
          <div className="mt-20 pt-12 border-t border-border">
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