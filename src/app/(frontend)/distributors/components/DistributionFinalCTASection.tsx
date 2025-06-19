"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Container } from '@/components/ui/container'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Zap, 
  Shield, 
  Phone, 
  CheckCircle, 
  ArrowRight,
  FileText,
  Calendar,
  MessageCircle,
  Star
} from 'lucide-react'

export const DistributionFinalCTASection: React.FC = () => {
  const distributionBenefits = [
    {
      icon: TrendingUp,
      title: "Competitive Advantage",
      description: "Match major distributors on speed and transparency"
    },
    {
      icon: Zap,
      title: "Operational Excellence", 
      description: "Automate 95% of royalty processing workflows"
    },
    {
      icon: Users,
      title: "Client Satisfaction",
      description: "Provide real-time visibility that builds loyalty"
    },
    {
      icon: DollarSign,
      title: "Revenue Growth",
      description: "Focus on acquisition instead of administration"
    }
  ]

  const trustSignals = [
    {
      icon: Shield,
      text: "SOC 2 Type II Certified"
    },
    {
      icon: TrendingUp,
      text: "99.9% Uptime SLA"
    },
    {
      icon: Users,
      text: "50+ Distributors Trust Us"
    },
    {
      icon: CheckCircle,
      text: "GDPR Compliant"
    }
  ]

  const ctaOptions = [
    {
      title: "Schedule Enterprise Distribution Demo",
      description: "See platform configured for your specific distribution workflows",
      icon: Calendar,
      primary: true,
      buttonText: "Schedule Demo",
      buttonClass: "bg-royal-600 hover:bg-royal-700 dark:bg-royal-500 dark:hover:bg-royal-600 text-white shadow-xl hover:shadow-2xl"
    },
    {
      title: "Download Distribution ROI Analysis", 
      description: "Complete cost-benefit analysis for distributors",
      icon: FileText,
      primary: false,
      buttonText: "Download Analysis",  
      buttonClass: "bg-white dark:bg-gray-800 border-2 border-royal-600 dark:border-royal-400 text-royal-600 dark:text-royal-400 hover:bg-royal-50 dark:hover:bg-royal-900/20"
    },
    {
      title: "Speak with Distribution Expert",
      description: "60-minute consultation on scaling strategies", 
      icon: MessageCircle,
      primary: false,
      buttonText: "Book Consultation",
      buttonClass: "bg-gradient-to-r from-accent to-royal-600 hover:from-accent/90 hover:to-royal-700 text-white shadow-lg hover:shadow-xl"
    }
  ]

  return (
    <section className="relative py-24 bg-gradient-to-br from-royal-900 via-royal-800 to-accent dark:from-black dark:via-gray-900 dark:to-royal-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
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
          className="absolute -bottom-32 -left-32 w-64 h-64 border border-white/10 rounded-full"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl"
        />
      </div>

      <Container className="relative">
        <FadeIn>
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-6xl font-bold mb-6"
            >
              Scale Your Distribution
              <span className="block text-accent dark:text-accent">
                with Enterprise Technology
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto"
            >
              Join the growing network of distribution companies providing major-label-quality 
              service with Royalti.io's enterprise platform. Stop losing artists to competitors 
              with better technology.
            </motion.p>
          </div>
        </FadeIn>

        {/* Distribution Value Propositions */}
        <FadeIn delay={0.4}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {distributionBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-6 bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-xl hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300"
              >
                <div className="inline-flex p-4 bg-white/20 dark:bg-white/10 rounded-full mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {benefit.title}
                </h3>
                <p className="text-white/70 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* CTA Options */}
        <FadeIn delay={0.6}>
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {ctaOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: option.primary ? 1.05 : 1.02 }}
                className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                  option.primary 
                    ? 'bg-white/15 dark:bg-white/10 border-white/30 dark:border-white/20 shadow-2xl' 
                    : 'bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10 hover:bg-white/15 dark:hover:bg-white/10'
                }`}
              >
                {option.primary && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-accent px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Recommended
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="inline-flex p-4 bg-white/20 dark:bg-white/10 rounded-full mb-4">
                    <option.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {option.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {option.description}
                  </p>
                </div>

                <button className={`w-full py-4 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${option.buttonClass}`}>
                  {option.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Trust & Credentials */}
        <FadeIn delay={0.8}>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-8">
              Trusted by Leading Distribution Companies
            </h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {trustSignals.map((signal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-center justify-center gap-3 p-4 bg-white/10 dark:bg-white/5 rounded-lg"
                >
                  <signal.icon className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-white/90">
                    {signal.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="inline-flex items-center gap-4 bg-white/10 dark:bg-white/5 p-6 rounded-xl border border-white/20 dark:border-white/10"
            >
              <Phone className="w-6 h-6 text-accent" />
              <div className="text-left">
                <div className="text-white/90 font-medium">
                  Need immediate assistance?
                </div>
                <div className="text-white/70 text-sm">
                  Call our distribution specialists: 
                  <span className="text-accent ml-1 font-semibold">(555) 123-4567</span>
                </div>
              </div>
            </motion.div>
          </div>
        </FadeIn>

        {/* Success Statistics */}
        <FadeIn delay={1}>
          <div className="text-center">
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-accent mb-2">400%</div>
                <div className="text-white/70 text-sm">Average ROI in First Year</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-accent mb-2">95%</div>
                <div className="text-white/70 text-sm">Reduction in Processing Time</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-accent mb-2">99.8%</div>
                <div className="text-white/70 text-sm">Payment Accuracy Rate</div>
              </motion.div>
            </div>
          </div>
        </FadeIn>

        {/* Bottom CTA */}
        <FadeIn delay={1.2}>
          <div className="mt-16 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-accent to-royal-500 hover:from-accent/90 hover:to-royal-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                <Calendar className="w-6 h-6" />
                Get Started Today
                <ArrowRight className="w-6 h-6" />
              </button>
            </motion.div>
            
            <p className="mt-4 text-white/60 text-sm">
              Enterprise setup typically completed in 6 weeks
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}