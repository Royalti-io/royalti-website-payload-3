'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Play, ChevronRight, Upload, BarChart3, CreditCard, FileText } from 'lucide-react'

const demoSteps = [
  {
    id: 1,
    title: 'Import Your Data',
    description: 'Upload from any source in seconds',
    icon: Upload,
    content: 'Connect your streaming platforms, distributors, and existing spreadsheets. Our intelligent import handles all formats.'
  },
  {
    id: 2,
    title: 'Automated Processing',
    description: 'Watch calculations happen in real-time',
    icon: BarChart3,
    content: 'AI-powered algorithms process your royalty data, apply contract terms, and calculate splits automatically.'
  },
  {
    id: 3,
    title: 'Generate Reports',
    description: 'Professional reports with one click',
    icon: FileText,
    content: 'Create customized statements for artists, detailed breakdowns for labels, and audit-ready reports for accountants.'
  },
  {
    id: 4,
    title: 'Payment Processing',
    description: 'Send payments directly to collaborators',
    icon: CreditCard,
    content: 'Bulk payments, individual transfers, or hold funds for later - all with complete transparency and audit trails.'
  }
]

export const ProductDemo: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            See Royalti.io in Action
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto mb-8">
            Watch how our platform transforms complex royalty management into simple, automated workflows
          </p>
        </motion.div>

        <div className="bg-gray-50 dark:bg-black rounded-3xl p-8 lg:p-12 border dark:border-gray-900">
          {/* Demo Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4 bg-white dark:bg-gray-950 rounded-2xl p-2 border dark:border-gray-900">
              {demoSteps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeStep === step.id
                      ? 'bg-royal-600 dark:bg-royal-500 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeStep === step.id ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-800'
                  }`}>
                    <span className={`font-bold text-sm ${
                      activeStep === step.id ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      {step.id}
                    </span>
                  </div>
                  <span className="font-medium hidden sm:block">{step.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Demo Screen */}
          <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-8 mb-8 border dark:border-gray-900">
            <div className="aspect-video bg-gradient-to-br from-royal-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden border dark:border-gray-800">
              <div className="text-center">
                <div className="w-20 h-20 bg-royal-600 dark:bg-royal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {React.createElement(demoSteps.find(step => step.id === activeStep)?.icon || Upload, {
                    className: "w-10 h-10 text-white"
                  })}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {demoSteps.find(step => step.id === activeStep)?.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                  {demoSteps.find(step => step.id === activeStep)?.content}
                </p>
              </div>
              
              {/* Animated dots background */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-royal-600 dark:bg-royal-400 rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-royal-600 hover:bg-royal-700 dark:bg-royal-500 dark:hover:bg-royal-600 text-white">
                <Play className="mr-2 w-5 h-5" />
                Try Interactive Demo
              </Button>
              <Button size="lg" variant="outline" className="border-royal-600 dark:border-royal-400 text-royal-600 dark:text-royal-400 hover:bg-royal-50 dark:hover:bg-gray-900/50 dark:bg-transparent">
                Book Personal Demo
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
