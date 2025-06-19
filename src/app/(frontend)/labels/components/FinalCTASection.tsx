"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Download, Phone, Calendar, Zap, Shield, TrendingUp, Users } from 'lucide-react'

export const FinalCTASection: React.FC = () => {
  const benefits = [
    {
      icon: TrendingUp,
      text: "Scale unlimited - Add artists without adding admin overhead"
    },
    {
      icon: Users,
      text: "Build trust - Give artists transparency they've never seen"
    },
    {
      icon: Zap,
      text: "Recover revenue - Find money you're currently missing"
    },
    {
      icon: Shield,
      text: "Professional operations - Compete with major labels on efficiency"
    }
  ]

  const ctaOptions = [
    {
      icon: Calendar,
      title: "Start Your 90-Day Label Trial",
      description: "No risk • Full catalog migration included • Cancel anytime",
      buttonText: "Start Free Trial",
      buttonVariant: "royal" as const,
      primary: true
    },
    {
      icon: Users,
      title: "Schedule Label Demo",
      description: "See features specific to your roster size",
      buttonText: "Book Demo",
      buttonVariant: "outline" as const,
      primary: false
    },
    {
      icon: Phone,
      title: "Talk to Label Expert",
      description: "30-minute consultation on your specific needs",
      buttonText: "Expert Call",
      buttonVariant: "outline" as const,
      primary: false
    },
    {
      icon: Download,
      title: "Download Label ROI Guide",
      description: "7-page guide to maximizing label profitability",
      buttonText: "Get Guide",
      buttonVariant: "outline" as const,
      primary: false
    }
  ]

  const trustIndicators = [
    "Trusted by 200+ labels managing 50,000+ artists worldwide",
    "SOC 2 Certified",
    "99.9% Uptime",
    "GDPR Compliant"
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-royal-600 via-royal-700 to-royal-800 dark:from-royal-500 dark:via-royal-600 dark:to-royal-700 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 border border-white/10 rounded-full"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -left-32 w-64 h-64 border border-accent/20 rounded-full"
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.1
            }}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <Container className="relative">
        {/* Main Headline */}
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready to Scale Your Label
              <span className="block text-accent">
                the Smart Way?
              </span>
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Join 200+ record labels who've transformed their operations with Royalti.io. 
              Stop letting administrative complexity limit your growth and start building 
              the label your artists deserve.
            </p>
          </FadeIn>
        </div>

        {/* Benefits Grid */}
        <FadeIn delay={0.4}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium">
                  {benefit.text}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* CTA Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ctaOptions.map((option, index) => (
            <FadeIn key={index} delay={0.7 + index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className={`bg-white text-gray-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  option.primary ? 'ring-4 ring-accent' : ''
                }`}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    option.primary 
                      ? 'bg-accent text-white' 
                      : 'bg-royal-600 text-white'
                  }`}>
                    <option.icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2">
                    {option.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-6">
                    {option.description}
                  </p>
                  
                  <Button
                    variant={option.buttonVariant}
                    size="lg"
                    className={`w-full ${
                      option.primary 
                        ? 'bg-accent hover:bg-accent/90 text-white' 
                        : 'border-royal-600 text-royal-600 hover:bg-royal-600 hover:text-white'
                    }`}
                  >
                    {option.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Primary CTA */}
        <div className="text-center mb-12">
          <FadeIn delay={1.2}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white text-xl px-12 py-6 h-auto shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <Calendar className="w-6 h-6 mr-3" />
                Start Your 90-Day Label Trial
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </motion.div>
          </FadeIn>
          
          <FadeIn delay={1.4}>
            <p className="text-white/80 mt-4 text-lg">
              No risk • Full catalog migration included • Cancel anytime
            </p>
          </FadeIn>
        </div>

        {/* Trust Reinforcement */}
        <FadeIn delay={1.6}>
          <div className="border-t border-white/20 pt-12">
            <div className="text-center">
              <p className="text-white/90 text-lg mb-6">
                {trustIndicators[0]}
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/70">
                {trustIndicators.slice(1).map((indicator, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {indicator}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Final Success Message */}
        <FadeIn delay={2.0}>
          <div className="mt-16 text-center">
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(243, 120, 78, 0.3)",
                  "0 0 40px rgba(243, 120, 78, 0.5)",
                  "0 0 20px rgba(243, 120, 78, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block bg-accent/20 border border-accent/30 rounded-2xl p-8 backdrop-blur-sm"
            >
              <div className="text-2xl font-bold mb-2">
                🎵 Join the Music Revolution
              </div>
              <p className="text-white/90 max-w-2xl">
                Transform your label from administrative chaos to operational excellence. 
                Your artists are waiting for the transparency they deserve.
              </p>
            </motion.div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}