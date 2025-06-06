'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Zap, Shield, CheckCircle, Phone, CreditCard } from 'lucide-react'

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-royal-600 to-teal-600 dark:from-black dark:via-gray-950 dark:to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/api/placeholder/100/100')] opacity-10 dark:opacity-[0.02] bg-repeat" />
      
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Music Business?
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-12">
            Join hundreds of music professionals who&apos;ve eliminated royalty headaches and increased their revenue with Royalti.io. 
            Start your 90-day transformation today.
          </p>

          <Button
            size="lg"
            className="bg-white text-royal-600 hover:bg-gray-100 dark:bg-white dark:text-black dark:hover:bg-gray-200 px-12 py-4 text-2xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 mb-8"
          >
            <Zap className="mr-3 w-7 h-7" />
            Start Your 90-Day Free Trial
          </Button>

          <p className="mb-12 text-lg opacity-90">
            No credit card required • Setup in 5 minutes • Cancel anytime
          </p>

          {/* Trust Signals */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: Shield, text: 'Money-back guarantee' },
              { icon: Phone, text: 'Free setup assistance' },
              { icon: CheckCircle, text: 'No long-term contracts' },
              { icon: CreditCard, text: 'Enterprise-grade security' }
            ].map((signal, index) => {
              const Icon = signal.icon
              return (
                <div key={index} className="flex items-center justify-center space-x-3 opacity-90">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{signal.text}</span>
                </div>
              )
            })}
          </div>

          <p className="text-lg font-medium opacity-90">
            Trusted by 500+ music professionals worldwide • SOC 2 Certified • 99.9% Uptime
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
