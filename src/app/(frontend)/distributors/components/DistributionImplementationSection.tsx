"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Container } from '@/components/ui/container'
import { 
  Server, 
  Settings, 
  Rocket, 
  CheckCircle, 
  Clock, 
  Users, 
  Shield, 
  HeadphonesIcon, 
  Calendar, 
  Target,
  Zap
} from 'lucide-react'

export const DistributionImplementationSection: React.FC = () => {
  const [activePhase, setActivePhase] = useState(0)

  const implementationPhases = [
    {
      id: 1,
      title: "Infrastructure Setup",
      duration: "Week 1-2",
      icon: Server,
      color: "blue",
      description: "Foundation and environment preparation",
      tasks: [
        "Dedicated cloud environment provisioning",
        "API endpoint configuration and testing", 
        "Security protocols implementation",
        "Data migration planning and execution",
        "Integration testing with existing systems"
      ],
      deliverables: [
        "Dedicated enterprise infrastructure",
        "Security audit compliance report",
        "API documentation and testing suite",
        "Data migration completion report"
      ]
    },
    {
      id: 2,
      title: "Platform Configuration",
      duration: "Week 3-4", 
      icon: Settings,
      color: "green",
      description: "Customization and workflow setup",
      tasks: [
        "White-label branding implementation",
        "Artist portal customization and testing",
        "Workflow automation setup",
        "Team training and certification",
        "Soft launch with select artists"
      ],
      deliverables: [
        "Fully branded distribution platform",
        "Custom artist portal configurations",
        "Automated workflow documentation",
        "Team certification completion"
      ]
    },
    {
      id: 3,
      title: "Full Deployment",
      duration: "Week 5-6",
      icon: Rocket,
      color: "purple",
      description: "Complete migration and go-live",
      tasks: [
        "Complete artist migration to new platform",
        "Go-live with full support coverage",
        "Performance monitoring and optimization",
        "Client onboarding training materials",
        "Success metrics baseline establishment"
      ],
      deliverables: [
        "100% artist migration completion",
        "Performance optimization report",
        "Client training materials",
        "Success metrics dashboard"
      ]
    }
  ]

  const ongoingSupport = [
    {
      title: "Dedicated Distribution Success Manager",
      description: "Personal point of contact for strategic guidance and optimization",
      icon: Users,
      features: [
        "Weekly check-ins and performance reviews",
        "Strategic planning and growth recommendations", 
        "Priority escalation and issue resolution",
        "Industry best practices consultation"
      ]
    },
    {
      title: "24/7 Priority Technical Support",  
      description: "Enterprise-grade support with guaranteed response times",
      icon: HeadphonesIcon,
      features: [
        "< 15 minute response time for critical issues",
        "Direct access to senior engineering team",
        "Proactive monitoring and issue prevention",
        "Custom support documentation and training"
      ]
    },
    {
      title: "Quarterly Business Reviews",
      description: "Regular optimization and strategic planning sessions",
      icon: Target,
      features: [
        "Performance analytics and ROI analysis",
        "Feature roadmap planning and input",
        "Competitive analysis and positioning",
        "Growth strategy recommendations"
      ]
    },
    {
      title: "Platform Updates & Training",
      description: "Stay current with latest features and industry trends",
      icon: Zap,
      features: [
        "Early access to new features and capabilities",
        "Custom training for new platform updates",
        "Industry webinars and educational content",
        "Direct input on product development roadmap"
      ]
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        text: 'text-blue-600 dark:text-blue-400',
        button: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-900/20', 
        border: 'border-green-200 dark:border-green-800',
        text: 'text-green-600 dark:text-green-400',
        button: 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        border: 'border-purple-200 dark:border-purple-800', 
        text: 'text-purple-600 dark:text-purple-400',
        button: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600'
      }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  return (
    <section className="py-24 bg-background">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
              Enterprise Distribution
              <span className="block text-royal-600 dark:text-royal-400">
                Implementation
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              White-glove implementation process designed for enterprise distribution operations
            </p>
          </div>
        </FadeIn>

        {/* Implementation Timeline */}
        <div className="mb-16">
          <FadeIn delay={0.2}>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                6-Week Implementation Timeline
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Structured approach ensuring smooth transition with minimal disruption to your operations
              </p>
            </div>
          </FadeIn>

          {/* Phase Navigation */}
          <FadeIn delay={0.3}>
            <div className="flex justify-center mb-12">
              <div className="flex bg-muted dark:bg-gray-800 rounded-lg p-1">
                {implementationPhases.map((phase, index) => (
                  <button
                    key={phase.id}
                    onClick={() => setActivePhase(index)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      activePhase === index
                        ? 'bg-royal-600 text-white shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <phase.icon className="w-4 h-4" />
                    Phase {phase.id}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Phase Content */}
          <AnimatePresence mode="wait">
            {implementationPhases.map((phase, index) => {
              if (index !== activePhase) return null
              
              const colors = getColorClasses(phase.color)
              
              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`p-8 ${colors.bg} border ${colors.border} rounded-2xl`}
                >
                  <div className="grid lg:grid-cols-2 gap-12">
                    {/* Phase Overview */}
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`p-3 ${colors.text} bg-white dark:bg-gray-800 rounded-lg shadow-sm`}>
                          <phase.icon className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold text-foreground">
                            {phase.title}
                          </h4>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{phase.duration}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {phase.description}
                      </p>

                      <div className="space-y-6">
                        {/* Tasks */}
                        <div>
                          <h5 className="font-semibold text-foreground mb-3">
                            Key Implementation Tasks:
                          </h5>
                          <ul className="space-y-2">
                            {phase.tasks.map((task, taskIndex) => (
                              <motion.li
                                key={taskIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + taskIndex * 0.1 }}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                {task}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <h5 className="font-semibold text-foreground mb-6">
                        Phase Deliverables:
                      </h5>
                      <div className="space-y-4">
                        {phase.deliverables.map((deliverable, deliverableIndex) => (
                          <motion.div
                            key={deliverableIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + deliverableIndex * 0.1 }}
                            className="p-4 bg-white dark:bg-gray-800 border border-border dark:border-gray-700 rounded-lg"
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-1 ${colors.text.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-')}/20 rounded`}>
                                <CheckCircle className={`w-4 h-4 ${colors.text}`} />
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {deliverable}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Phase CTA */}
                      <div className="mt-8">
                        <button className={`w-full py-3 px-6 ${colors.button} text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl`}>
                          Learn More About Phase {phase.id}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Ongoing Support */}
        <FadeIn delay={0.6}>
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ongoing Enterprise Support
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Continuous support and optimization to ensure your distribution platform delivers maximum ROI
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {ongoingSupport.map((support, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="p-6 bg-muted/50 dark:bg-gray-800/50 border border-border dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-royal-100 dark:bg-royal-800/50 rounded-lg">
                      <support.icon className="w-6 h-6 text-royal-600 dark:text-royal-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        {support.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {support.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {support.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Implementation Guarantee */}
        <FadeIn delay={0.8}>
          <div className="p-8 bg-gradient-to-r from-green-50 to-royal-50 dark:from-green-900/20 dark:to-royal-900/20 rounded-2xl border border-green-200 dark:border-green-800">
            <div className="text-center">
              <Shield className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                99.9% Uptime SLA with Enterprise-Grade Infrastructure
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We guarantee enterprise-level reliability with comprehensive support throughout your implementation 
                and beyond. Your distribution operations are too important for anything less.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime SLA</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-royal-600 dark:text-royal-400 mb-2">&lt;15min</div>
                  <div className="text-sm text-muted-foreground">Critical Issue Response</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Enterprise Support</div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* CTA Section */}
        <FadeIn delay={1}>
          <div className="mt-16 text-center p-8 bg-royal-50 dark:bg-royal-900/20 rounded-2xl border border-royal-200 dark:border-royal-800">
            <Calendar className="w-12 h-12 text-royal-600 dark:text-royal-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Begin Your Implementation?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our implementation specialists are ready to design a custom deployment plan for your 
              distribution business. Schedule a consultation to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-royal-600 hover:bg-royal-700 dark:bg-royal-500 dark:hover:bg-royal-600 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl">
                Schedule Implementation Consultation
              </button>
              <button className="px-8 py-4 border border-royal-600 dark:border-royal-400 text-royal-600 dark:text-royal-400 hover:bg-royal-50 dark:hover:bg-royal-900/20 rounded-lg font-medium transition-colors">
                Download Implementation Guide
              </button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}