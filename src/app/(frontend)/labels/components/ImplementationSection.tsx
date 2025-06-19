"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Calendar, Users, Settings, Rocket, HeadphonesIcon, BarChart3, Shield } from 'lucide-react'

export const ImplementationSection: React.FC = () => {
  const phases = [
    {
      week: "Week 1",
      title: "Data Migration",
      icon: Calendar,
      tasks: [
        { day: "Day 1", task: "Catalog data import and validation" },
        { day: "Day 3", task: "Contract terms configuration" },
        { day: "Day 5", task: "Platform connections established" },
        { day: "Day 7", task: "Historical royalty data backfill complete" }
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      week: "Week 2", 
      title: "Team Training",
      icon: Users,
      tasks: [
        { day: "Day 8", task: "Admin team training sessions" },
        { day: "Day 10", task: "Artist portal setup and branding" },
        { day: "Day 12", task: "Custom workflow configuration" },
        { day: "Day 14", task: "Go-live with full support" }
      ],
      color: "from-green-500 to-teal-500"
    }
  ]

  const ongoingSupport = [
    {
      icon: Users,
      title: "Dedicated Label Success Manager",
      description: "Your personal point of contact for all platform needs"
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Priority Technical Support", 
      description: "Round-the-clock assistance when you need it most"
    },
    {
      icon: Rocket,
      title: "Monthly Platform Updates",
      description: "New features and improvements delivered automatically"
    },
    {
      icon: BarChart3,
      title: "Quarterly Business Reviews",
      description: "Optimization sessions to maximize your ROI"
    }
  ]

  return (
    <section className="py-24 bg-muted/30 dark:bg-muted/10">
      <Container>
        <div className="text-center mb-16">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-royal-600 dark:bg-royal-700 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              White-Glove Implementation
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Implementation & Support
              <span className="block text-royal-600 dark:text-royal-400">
                For Labels
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get up and running quickly with our proven implementation process and ongoing support
            </p>
          </FadeIn>
        </div>

        {/* Implementation Timeline */}
        <div className="mb-20">
          <FadeIn delay={0.2}>
            <h3 className="text-2xl font-bold text-center mb-12">
              Implementation Timeline
            </h3>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12">
            {phases.map((phase, index) => (
              <FadeIn key={index} delay={0.3 + index * 0.2}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Phase Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center`}>
                      <phase.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">
                        {phase.week}
                      </div>
                      <h4 className="text-xl font-bold">
                        {phase.title}
                      </h4>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="space-y-4">
                    {phase.tasks.map((task, taskIndex) => (
                      <motion.div
                        key={taskIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + taskIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4 p-3 bg-background border border-border rounded-lg"
                      >
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center flex-shrink-0`}>
                          <span className="text-white text-xs font-bold">
                            {task.day.split(' ')[1]}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-royal-600 dark:text-royal-400">
                            {task.day}
                          </div>
                          <div className="text-foreground">
                            {task.task}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Progress</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div 
                        className={`bg-gradient-to-r ${phase.color} h-2 rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 2, delay: 0.5 + index * 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Ongoing Support */}
        <div>
          <FadeIn delay={0.8}>
            <h3 className="text-2xl font-bold text-center mb-12">
              Ongoing Support
            </h3>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ongoingSupport.map((support, index) => (
              <FadeIn key={index} delay={1.0 + index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="bg-card border border-border rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-royal-600 to-royal-700 dark:from-royal-500 dark:to-royal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <support.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">
                    {support.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {support.description}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <FadeIn delay={1.4}>
          <div className="mt-20 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10 border border-green-200 dark:border-green-800 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">
                Implementation Success Guarantee
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We guarantee your label will be fully operational within 14 days, 
                or we'll extend your trial period at no additional cost.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  14 Days
                </div>
                <div className="text-sm text-muted-foreground">
                  Maximum implementation time
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  99.9%
                </div>
                <div className="text-sm text-muted-foreground">
                  Data migration accuracy
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  24/7
                </div>
                <div className="text-sm text-muted-foreground">
                  Support during implementation
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  100%
                </div>
                <div className="text-sm text-muted-foreground">
                  Implementation success rate
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <div className="text-center mt-16">
          <FadeIn delay={1.6}>
            <div className="space-y-4">
              <Button 
                size="lg" 
                variant="royal"
                className="text-lg px-8 py-4 h-auto mr-4"
              >
                Get Started with Expert Implementation
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-4 h-auto"
              >
                Book Implementation Consultation
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No setup fees • White-glove migration included • 90-day guarantee
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}