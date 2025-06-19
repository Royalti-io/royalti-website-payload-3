"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Container } from '@/components/ui/container'
import { Music, DollarSign, BarChart3, Link } from 'lucide-react'

export const IntegrationSection: React.FC = () => {
  const integrationCategories = [
    {
      icon: Music,
      title: "Distribution & Aggregation",
      description: "Connect with major distributors and aggregators",
      integrations: [
        "CD Baby Pro", "DistroKid", "TuneCore", "AWAL", "Virgin Music Group", "Stem"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Streaming Platforms",
      description: "Direct data feeds from all major platforms",
      integrations: [
        "Spotify for Artists", "Apple Music for Artists", "YouTube Music Analytics", 
        "Amazon Music for Artists", "Tidal for Artists", "Deezer for Creators"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: DollarSign,
      title: "Financial & Legal",
      description: "Seamless accounting and payment processing",
      integrations: [
        "QuickBooks", "Xero", "Sage", "DocuSign", "HelloSign", "PayPal/Stripe"
      ],
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Link,
      title: "Marketing & Analytics",
      description: "Connect your promotional and analytics tools",
      integrations: [
        "Chartmetric", "Soundcharts", "Bandsintown", "Songkick", "Mailchimp", "HubSpot"
      ],
      color: "from-orange-500 to-red-500"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-24 bg-muted/30 dark:bg-muted/10">
      <Container>
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Connects with Your Existing
              <span className="block text-royal-600 dark:text-royal-400">
                Label Tech Stack
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stop switching between 15 different platforms. Royalti.io brings all your label data into one unified workspace.
            </p>
          </FadeIn>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {integrationCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Integration Grid */}
              <div className="grid grid-cols-2 gap-3">
                {category.integrations.map((integration, intIndex) => (
                  <motion.div
                    key={intIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + intIndex * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-background border border-border rounded-lg p-3 text-center text-sm font-medium hover:shadow-md transition-all duration-200"
                  >
                    {integration}
                  </motion.div>
                ))}
              </div>

              {/* Connection Indicator */}
              <div className="mt-6 flex items-center justify-center">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                  Real-time Sync
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Integration Hub Visual */}
        <FadeIn delay={0.8}>
          <div className="mt-20">
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <div className="relative max-w-4xl mx-auto">
                {/* Central Hub */}
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 mx-auto bg-gradient-to-br from-royal-600 to-royal-700 dark:from-royal-500 dark:to-royal-600 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <div className="text-white font-bold text-lg">
                      Royalti.io
                    </div>
                  </motion.div>

                  {/* Connecting Lines */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="absolute w-24 h-0.5 bg-gradient-to-r from-royal-600/50 to-transparent dark:from-royal-400/50"
                        style={{
                          transform: `rotate(${angle}deg)`,
                          transformOrigin: 'left center',
                          left: '50%',
                          top: '50%'
                        }}
                      />
                    ))}
                  </div>

                  {/* Integration Points */}
                  {integrationCategories.map((category, index) => {
                    const angle = (index * 90) * (Math.PI / 180)
                    const radius = 140
                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                        className={`absolute w-12 h-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center`}
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <category.icon className="w-6 h-6 text-white" />
                      </motion.div>
                    )
                  })}
                </div>

                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-4">
                    Single API Integration
                  </h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    One integration connects your entire distribution technology stack. 
                    Spend minutes setting up, not weeks managing multiple platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Integration Benefits */}
        <FadeIn delay={1.0}>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">One-Time Setup</h4>
              <p className="text-muted-foreground text-sm">
                Connect all your tools in under 30 minutes with guided setup wizard
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">∞</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Unlimited Sync</h4>
              <p className="text-muted-foreground text-sm">
                Real-time data synchronization across all connected platforms
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">✓</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Zero Maintenance</h4>
              <p className="text-muted-foreground text-sm">
                Automatic updates when platforms change their APIs or data formats
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}