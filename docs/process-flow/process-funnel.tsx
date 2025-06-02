// components/process/ProcessFunnel.tsx - Funnel visualization component
"use client"

import { Card, CardContent } from "../../src/components/ui/card"
import { FadeIn } from "../../src/components/ui/animation/FadeIn"
import { GradientText } from "../../src/components/ui/animation/GradientText"
import { cn } from "../../src/utilities/cn"
import { motion } from "framer-motion"

interface FunnelStage {
  title: string
  description: string
  metric?: string
  color: 'royal' | 'green' | 'blue' | 'purple' | 'gray'
}

interface ProcessFunnelProps {
  title?: string
  subtitle?: string
  stages: FunnelStage[]
  className?: string
}

export function ProcessFunnel({
  title,
  subtitle,
  stages,
  className = "",
}: ProcessFunnelProps) {
  const colorClasses = {
    royal: 'from-royal-500 to-royal-600',
    green: 'from-green-500 to-green-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    gray: 'from-gray-500 to-gray-600',
  }

  const getWidth = (index: number) => {
    const maxWidth = 100
    const minWidth = 40
    const reduction = (maxWidth - minWidth) / (stages.length - 1)
    return maxWidth - (reduction * index)
  }

  return (
    <section className={cn("py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white", className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div className="max-w-3xl mx-auto text-center mb-16">
            {title && (
              <FadeIn delay={0.1}>
                <h2 className="text-display-sm md:text-display-md font-bold text-gray-900 mb-6">
                  <GradientText>{title}</GradientText>
                </h2>
              </FadeIn>
            )}
            {subtitle && (
              <FadeIn delay={0.2}>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {subtitle}
                </p>
              </FadeIn>
            )}
          </div>
        )}

        {/* Funnel */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {stages.map((stage, index) => {
              const width = getWidth(index)
              
              return (
                <FadeIn key={index} delay={0.3 + index * 0.1}>
                  <div className="flex justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      style={{ width: `${width}%` }}
                      className="relative"
                    >
                      <Card className="border-royal-100 hover:border-royal-200 hover:shadow-lg transition-all duration-300 group">
                        <CardContent className="p-6 md:p-8">
                          <div className={cn(
                            "absolute inset-0 bg-gradient-to-r opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-lg",
                            colorClasses[stage.color]
                          )} />
                          
                          <div className="relative z-10 text-center">
                            <div className="flex items-center justify-center mb-4">
                              <div className={cn(
                                "w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center text-white font-bold text-sm mr-3",
                                colorClasses[stage.color]
                              )}>
                                {index + 1}
                              </div>
                              <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-royal-600 transition-colors">
                                {stage.title}
                              </h3>
                            </div>
                            
                            <p className="text-gray-600 leading-relaxed mb-4">
                              {stage.description}
                            </p>
                            
                            {stage.metric && (
                              <div className={cn(
                                "inline-block px-4 py-2 rounded-full text-white font-semibold text-sm bg-gradient-to-r",
                                colorClasses[stage.color]
                              )}>
                                {stage.metric}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
