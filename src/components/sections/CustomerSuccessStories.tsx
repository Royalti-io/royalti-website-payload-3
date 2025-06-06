'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    quote: "Royalti.io transformed our royalty process from a monthly nightmare into a 10-minute automated task. We went from spending 40 hours per month on spreadsheets to having everything automated and accurate.",
    author: "Sarah Chen",
    title: "Founder, Sunset Records",
    company: "Managing 200+ artists • Switched from Excel",
    avatar: "/api/placeholder/60/60",
    results: [
      { metric: "95% Time Savings", description: "on royalty administration" },
      { metric: "Zero Payment Disputes", description: "since implementation" },
      { metric: "15 New Artists Signed", description: "with saved time" }
    ]
  },
  {
    quote: "Managing royalties for 12 artists across multiple platforms was impossible until Royalti.io. Now my artists get detailed statements automatically, and I can focus on growing their careers instead of spreadsheet errors.",
    author: "Marcus Rodriguez",
    title: "Artist Manager",
    company: "Representing platinum-selling artists • Previously used 3 different tools",
    avatar: "/api/placeholder/60/60",
    results: [
      { metric: "30% Faster Payments", description: "to artists" },
      { metric: "100% Transparency", description: "across all revenue streams" },
      { metric: "Stronger Artist Relationships", description: "through trust" }
    ]
  },
  {
    quote: "The transparency Royalti.io provides has completely changed our relationship with artists. Everyone can see exactly where their money comes from, building trust and eliminating disputes.",
    author: "Emma Thompson",
    title: "VP Royalties, Harmony Music Publishing",
    company: "10,000+ song catalog • Migrated from legacy system",
    avatar: "/api/placeholder/60/60",
    results: [
      { metric: "80% Reduction", description: "in royalty disputes" },
      { metric: "Real-time Reporting", description: "for all stakeholders" },
      { metric: "Audit-Ready Documentation", description: "at all times" }
    ]
  }
]

export const CustomerSuccessStories: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-black">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Real Results from Real Music Professionals
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto">
            See how industry professionals transformed their royalty operations with Royalti.io
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-950 rounded-2xl p-8 shadow-lg hover:shadow-xl dark:shadow-black/50 transition-shadow duration-300 h-full flex flex-col border dark:border-gray-900"
            >
              <div className="flex-grow">
                <Quote className="w-10 h-10 text-royal-600 dark:text-royal-400 mb-4" />
                <blockquote className="text-lg text-gray-700 dark:text-gray-200 italic leading-relaxed mb-6">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
              </div>

              <div className="border-t dark:border-gray-800 pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full mr-4 overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">{testimonial.title}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">{testimonial.company}</div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4 border-l-4 border-green-500 dark:border-green-400">
                  <div className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2 uppercase tracking-wide">Results</div>
                  <div className="space-y-2">
                    {testimonial.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="text-sm">
                        <span className="font-semibold text-green-800 dark:text-green-300">{result.metric}</span>
                        <span className="text-green-700 dark:text-green-400"> {result.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
