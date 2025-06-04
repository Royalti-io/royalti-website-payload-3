'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'How long does setup actually take?',
    answer: 'Most customers are processing royalties within 30 minutes of signup. Our intelligent data import handles the heavy lifting, and our setup wizard guides you through each step.'
  },
  {
    question: 'What happens to my data if I cancel?',
    answer: 'Your data belongs to you, always. We provide full export capabilities and 90 days to download everything before secure deletion.'
  },
  {
    question: 'Can Royalti.io handle my specific royalty structure?',
    answer: 'Yes. Our system handles complex deal structures, multiple territories, and custom calculation methods. If something doesn\'t work out of the box, our API lets you customize it.'
  },
  {
    question: 'How secure is my financial data?',
    answer: 'Bank-level security with SOC 2 compliance, 256-bit encryption, and regular third-party security audits. Your data is more secure with us than on your computer.'
  },
  {
    question: 'What kind of support do you provide?',
    answer: '24/7 chat support, phone support during business hours, comprehensive documentation, and video tutorials. Plus, every customer gets a dedicated onboarding specialist.'
  },
  {
    question: 'Can I integrate with my existing tools?',
    answer: 'Absolutely. We integrate with 50+ platforms including QuickBooks, Spotify for Artists, ASCAP, BMI, and most major distributors. Our API handles custom integrations.'
  }
]

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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
            Questions? We Have Answers.
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto">
            Get clarity on how Royalti.io can transform your music business
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border border-gray-200 dark:border-gray-800 rounded-xl mb-4 overflow-hidden bg-white dark:bg-black"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200 flex items-center justify-between"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-8">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-royal-600 dark:text-royal-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-gray-700 dark:text-gray-200 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
