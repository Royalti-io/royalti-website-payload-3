"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Clock, TrendingUp, Users, DollarSign, Award, Heart } from 'lucide-react'

export const SuccessStoriesSection: React.FC = () => {
  const [activeStory, setActiveStory] = useState(0)

  const stories = [
    {
      company: "Midnight Studios Records",
      location: "Atlanta, GA",
      description: "Managing 45 artists across hip-hop, R&B, and pop genres",
      challenge: "We were spending entire weekends calculating royalties and still making mistakes. Artists were frustrated with delays, and we were losing credibility.",
      testimonial: "Royalti.io didn't just save us time – it saved our relationships with our artists. The transparency has completely changed how they view working with us.",
      author: "Marcus Williams",
      role: "Founder",
      results: [
        { icon: Clock, value: "92%", label: "Time Reduction", desc: "From 20 hours to 1.5 hours monthly" },
        { icon: DollarSign, value: "$180K", label: "Additional Revenue", desc: "Found missed streaming royalties" },
        { icon: TrendingUp, value: "200%", label: "Artist Retention", desc: "Improved from losing 30% artists annually to 15%" },
        { icon: Users, value: "3x", label: "Faster Payments", desc: "Artists now paid within 48 hours" }
      ],
      color: "from-orange-500 to-red-500"
    },
    {
      company: "Pulse Electronic Recordings", 
      location: "Berlin, Germany",
      description: "International label with 80+ artists across 15 countries",
      challenge: "Managing international royalties with different tax rates, currencies, and split agreements was a nightmare. We needed a system that could handle global complexity.",
      testimonial: "The international capabilities are unmatched. Our artists in Tokyo see their earnings at the same time as our artists in Berlin.",
      author: "Elena Kraftwerk",
      role: "Operations Director", 
      results: [
        { icon: Award, value: "15", label: "Countries Supported", desc: "Automated compliance across all territories" },
        { icon: DollarSign, value: "Multi-Currency", label: "Automation", desc: "Eliminated foreign exchange errors" },
        { icon: TrendingUp, value: "Real-Time", label: "Global Reporting", desc: "Artists see earnings by territory instantly" },
        { icon: Heart, value: "40%", label: "Revenue Increase", desc: "Better data led to strategic market expansion" }
      ],
      color: "from-blue-500 to-purple-500"
    },
    {
      company: "Coastal Records",
      location: "Los Angeles, CA", 
      description: "Scaled from 12 to 150 artists in 18 months",
      challenge: "We were growing so fast that our Excel system couldn't keep up. We needed to choose between growth and accuracy – an impossible decision.",
      testimonial: "Royalti.io is the reason we could scale this fast. It's like having a full accounting department that never makes mistakes.",
      author: "Sarah Chen",
      role: "CEO",
      results: [
        { icon: TrendingUp, value: "1,250%", label: "Artist Growth", desc: "Scaled without adding accounting staff" },
        { icon: Clock, value: "Same-Day", label: "Onboarding", desc: "New artists operational within hours" },
        { icon: Users, value: "Complete", label: "Integration", desc: "Connected to existing CRM and marketing tools" },
        { icon: Award, value: "99.9%", label: "Accuracy", desc: "Zero payment disputes in 18 months" }
      ],
      color: "from-green-500 to-teal-500"
    }
  ]

  const currentStory = stories[activeStory]

  return (
    <section className="py-24 bg-muted/30 dark:bg-muted/10">
      <Container>
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Label Success Stories
              <span className="block text-royal-600 dark:text-royal-400">
                Real Results from Real Labels
              </span>
            </h2>
          </FadeIn>
        </div>

        {/* Story Selector */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12 justify-center">
          {stories.map((story, index) => (
            <FadeIn key={index} delay={0.1 + index * 0.1}>
              <motion.button
                onClick={() => setActiveStory(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                  activeStory === index
                    ? 'border-royal-600 dark:border-royal-400 bg-royal-50 dark:bg-royal-900/20'
                    : 'border-border bg-card hover:border-royal-300 dark:hover:border-royal-700'
                }`}
              >
                <div className="font-semibold text-foreground">
                  {story.company}
                </div>
                <div className="text-sm text-muted-foreground">
                  {story.location}
                </div>
              </motion.button>
            </FadeIn>
          ))}
        </div>

        {/* Story Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border rounded-2xl p-8 lg:p-12 shadow-lg"
          >
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Story Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                    {currentStory.company}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {currentStory.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                    The Challenge:
                  </h4>
                  <p className="text-muted-foreground italic">
                    "{currentStory.challenge}"
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                    The Result:
                  </h4>
                  <blockquote className="text-lg text-foreground italic border-l-4 border-royal-600 dark:border-royal-400 pl-4">
                    "{currentStory.testimonial}"
                  </blockquote>
                  <div className="mt-4">
                    <div className="font-semibold text-foreground">
                      — {currentStory.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {currentStory.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Grid */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-center lg:text-left">
                  Measurable Results:
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {currentStory.results.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="bg-background border border-border rounded-xl p-4 text-center"
                    >
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${currentStory.color} flex items-center justify-center mx-auto mb-3`}>
                        <result.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-royal-600 dark:text-royal-400 mb-1">
                        {result.value}
                      </div>
                      <div className="text-sm font-medium text-foreground mb-1">
                        {result.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {result.desc}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="text-center mt-16">
          <FadeIn delay={0.5}>
            <Button 
              size="lg" 
              variant="royal"
              className="text-lg px-8 py-4 h-auto"
            >
              Join These Success Stories
            </Button>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}