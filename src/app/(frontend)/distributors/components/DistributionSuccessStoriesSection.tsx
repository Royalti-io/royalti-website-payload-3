"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Container } from '@/components/ui/container'
import { Clock, DollarSign, TrendingUp, Users, Globe, Zap } from 'lucide-react'

export const DistributionSuccessStoriesSection: React.FC = () => {
  const successStories = [
    {
      company: "SoundWave Distribution",
      location: "Los Angeles, CA",
      type: "Mid-tier distributor serving 2,500 artists and 150 labels",
      challenge: "We were processing royalties manually for 3 weeks every month. Artists were threatening to leave, and we couldn't compete with the major distributors on speed or transparency.",
      implementation: "Deployed Royalti.io's bulk processing engine with white-label artist portals and automated payment distribution.",
      results: [
        { icon: Clock, metric: "95% Processing Time Reduction", detail: "From 3 weeks to 2 days monthly" },
        { icon: DollarSign, metric: "$450K Revenue Recovery", detail: "Found unreported streaming royalties" },
        { icon: TrendingUp, metric: "40% Client Growth", detail: "Reputation for speed attracted new artists" },
        { icon: Users, metric: "90% Support Ticket Reduction", detail: "Self-service portals eliminated payment inquiries" },
        { icon: Zap, metric: "200% Staff Productivity", detail: "Team focused on acquisition vs. administration" }
      ],
      quote: "Royalti.io transformed us from a struggling mid-tier distributor into a serious competitor. Our artists now get faster, more accurate payments than some major distributors provide.",
      author: "David Chen",
      title: "Founder & CEO",
      metrics: [
        "Client retention increased from 70% to 94%",
        "Processing accuracy improved from 92% to 99.8%",
        "Average time-to-payment reduced from 45 days to 3 days"
      ],
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      company: "Global Music Distribution Ltd",
      location: "London, UK",
      type: "Enterprise distributor with 15,000+ artists across 25 countries",
      challenge: "Managing international royalties across different currencies, tax systems, and reporting requirements was consuming our entire operations team. We needed enterprise-scale automation.",
      implementation: "Implemented Royalti.io's multi-currency processing with territory-specific compliance and automated international payment distribution.",
      results: [
        { icon: Globe, metric: "25 Countries Automated", detail: "Compliance handled automatically across all territories" },
        { icon: DollarSign, metric: "Multi-Currency Mastery", detail: "Eliminated foreign exchange calculation errors" },
        { icon: TrendingUp, metric: "Real-Time Global Reporting", detail: "Artists see territory-specific earnings instantly" },
        { icon: Users, metric: "60% International Revenue Growth", detail: "Better data enabled market expansion" },
        { icon: Clock, metric: "100% Compliance", detail: "Automated tax reporting and documentation" }
      ],
      quote: "The international capabilities are what set Royalti.io apart. We can onboard artists from any country and have them operational within hours, not weeks.",
      author: "Emma Thompson",
      title: "Operations Director",
      metrics: [
        "International client base grew from 30% to 65% of total roster",
        "Currency conversion errors eliminated completely",
        "Compliance issues reduced from 12 monthly incidents to zero"
      ],
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800"
    },
    {
      company: "Urban Flow Distribution",
      location: "Atlanta, GA",
      type: "Genre-focused distributor specializing in hip-hop and R&B with complex collaboration structures",
      challenge: "Hip-hop releases often have 8-12 contributors with complex split agreements. Manual calculation of producer royalties, feature payments, and sample clearances was becoming impossible.",
      implementation: "Utilized Royalti.io's advanced split calculation engine with custom contract templates for hip-hop industry standards.",
      results: [
        { icon: Users, metric: "Complex Split Automation", detail: "Handle 15+ party agreements automatically" },
        { icon: Zap, metric: "Producer Payment Acceleration", detail: "Producers paid within 48 hours of platform reporting" },
        { icon: TrendingUp, metric: "150% Artist Acquisition", detail: "Reputation for handling complex deals attracted top talent" },
        { icon: Clock, metric: "Zero Split Disputes", detail: "Transparent calculations eliminated payment conflicts" },
        { icon: DollarSign, metric: "Producer Loyalty Program", detail: "Recurring producers choose Urban Flow exclusively" }
      ],
      quote: "Royalti.io's split calculation engine is built for hip-hop. No other platform can handle our complex producer and feature agreements with this level of accuracy.",
      author: "Marcus Rodriguez",
      title: "A&R Director",
      metrics: [
        "Average splits per release: 8.5 contributors",
        "Producer satisfaction score: 9.2/10",
        "Contract dispute resolution time: Reduced from 3 weeks to same-day"
      ],
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800"
    }
  ]

  return (
    <section className="py-24 bg-muted/30 dark:bg-black/20">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
              Distribution Success Stories
              <span className="block text-royal-600 dark:text-royal-400">
                Real Results from Real Distributors
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how leading distribution companies transformed their operations and competitive position with Royalti.io
            </p>
          </div>
        </FadeIn>

        <div className="space-y-16">
          {successStories.map((story, index) => (
            <FadeIn key={index} delay={0.2 + index * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.2 }}
                className={`p-8 lg:p-12 ${story.bgColor} border ${story.borderColor} rounded-2xl`}
              >
                {/* Company Header */}
                <div className="mb-8">
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    {story.company}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {story.location} • {story.type}
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Challenge & Implementation */}
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">
                        The Challenge
                      </h4>
                      <p className="text-muted-foreground leading-relaxed bg-white dark:bg-gray-800 p-4 rounded-lg border italic">
                        "{story.challenge}"
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">
                        The Implementation
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {story.implementation}
                      </p>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                      <p className="text-muted-foreground italic mb-4 leading-relaxed">
                        "{story.quote}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-royal-600 dark:bg-royal-500 rounded-full flex items-center justify-center text-white font-bold">
                          {story.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">
                            {story.author}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {story.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-foreground">
                      Results After Implementation
                    </h4>
                    
                    <div className="grid gap-4">
                      {story.results.map((result, resultIndex) => (
                        <motion.div
                          key={resultIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.2 + resultIndex * 0.1 }}
                          className="flex items-start gap-3 bg-white dark:bg-gray-800 p-4 rounded-lg border"
                        >
                          <div className="p-2 bg-royal-100 dark:bg-royal-800/50 rounded-lg">
                            <result.icon className="w-5 h-5 text-royal-600 dark:text-royal-400" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground text-sm">
                              {result.metric}
                            </div>
                            <div className="text-muted-foreground text-sm">
                              {result.detail}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Additional Metrics */}
                    <div className="bg-royal-50 dark:bg-royal-900/30 p-4 rounded-lg border border-royal-200 dark:border-royal-800">
                      <h5 className="font-semibold text-foreground mb-3 text-sm">
                        Additional Metrics:
                      </h5>
                      <ul className="space-y-1">
                        {story.metrics.map((metric, metricIndex) => (
                          <li key={metricIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="text-green-500 dark:text-green-400">•</span>
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* CTA Section */}
        <FadeIn delay={1}>
          <div className="text-center mt-16 p-8 bg-royal-50 dark:bg-royal-900/20 rounded-2xl border border-royal-200 dark:border-royal-800">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Write Your Own Success Story?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join these leading distributors and transform your operations with enterprise-grade automation and intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-royal-600 hover:bg-royal-700 dark:bg-royal-500 dark:hover:bg-royal-600 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl">
                Schedule Your Demo
              </button>
              <button className="px-8 py-4 border border-royal-600 dark:border-royal-400 text-royal-600 dark:text-royal-400 hover:bg-royal-50 dark:hover:bg-royal-900/20 rounded-lg font-medium transition-colors">
                Download Case Studies
              </button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}