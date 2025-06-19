"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Container } from '@/components/ui/container'
import { Users, FileText, Palette } from 'lucide-react'

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: "Multi-Artist Dashboard",
      subtitle: "Manage Your Entire Roster",
      description: "Get a bird's-eye view of your label's performance with artist-by-artist breakdowns, cross-catalog analytics, and portfolio insights that help you make data-driven A&R decisions.",
      capabilities: [
        "Artist performance rankings and trends",
        "Revenue per artist analysis", 
        "Contract expiration alerts",
        "Portfolio diversification insights",
        "Cross-promotional opportunity identification"
      ],
      benefit: "Identify your most profitable artists and optimize your roster investment strategy",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: FileText,
      title: "Complex Deal Structure Support", 
      subtitle: "Handle Any Deal Structure",
      description: "From simple 50/50 splits to complex multi-party agreements with recoupment, advances, and territory-specific terms – Royalti.io automatically calculates even the most intricate label deals.",
      capabilities: [
        "Multi-level recoupment tracking",
        "Territory-specific royalty rates",
        "Advance and expense management", 
        "Producer and songwriter splits",
        "Cross-collateralization support"
      ],
      benefit: "Sign complex deals with confidence knowing every penny is calculated correctly",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Palette,
      title: "White-Label Artist Portals",
      subtitle: "Brand-Consistent Artist Experience", 
      description: "Give your artists professional, branded portals where they can track earnings, download statements, and access promotional materials – all under your label's brand identity.",
      capabilities: [
        "Custom branding and logo integration",
        "Artist-specific dashboard views",
        "Downloadable statements and reports",
        "Marketing asset distribution",
        "Direct artist communication tools"
      ],
      benefit: "Strengthen artist relationships with professional, transparent communication",
      gradient: "from-orange-500 to-red-500"
    }
  ]

  return (
    <section className="py-24 bg-background">
      <Container>
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Label-Specific Features
              <span className="block text-royal-600 dark:text-royal-400">
                Built for Your Success
              </span>
            </h2>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={0.2 + index * 0.2}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full"
              >
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-2 rounded-2xl border border-dashed border-muted opacity-20"
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-2">
                  {feature.title}
                </h3>
                <h4 className="text-lg text-royal-600 dark:text-royal-400 font-semibold mb-4">
                  {feature.subtitle}
                </h4>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Capabilities */}
                <div className="mb-6">
                  <h5 className="text-sm font-semibold text-foreground mb-3">
                    Key Capabilities:
                  </h5>
                  <ul className="space-y-2">
                    {feature.capabilities.map((capability, capIndex) => (
                      <motion.li
                        key={capIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.2 + capIndex * 0.1 }}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 bg-royal-600 dark:bg-royal-400 rounded-full mt-2 flex-shrink-0" />
                        {capability}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Benefit */}
                <div className="bg-royal-50/50 dark:bg-royal-900/20 border border-royal-200/50 dark:border-royal-800/50 rounded-lg p-4">
                  <p className="text-sm font-medium text-royal-700 dark:text-royal-300 italic">
                    "{feature.benefit}"
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <FadeIn delay={0.8}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              <div className="bg-gradient-to-r from-royal-600 to-royal-700 dark:from-royal-500 dark:to-royal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300">
                Experience These Features Today
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}