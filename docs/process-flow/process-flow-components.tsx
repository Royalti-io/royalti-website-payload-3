// components/process/HorizontalProcessFlow.tsx - Traditional step-by-step flow
"use client"

import { Card, CardContent } from "../../src/components/ui/card"
import { Badge } from "../../src/components/ui/badge"
import { Button } from "../../src/components/ui/button"
import { FadeIn } from "../../src/components/ui/animation/FadeIn"
import { GradientText } from "../../src/components/ui/animation/GradientText"
import { cn } from "../../src/utilities/cn"
import { ArrowRight, CheckCircle, Clock, Play } from "lucide-react"
import Image from "next/image"
import { 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  Globe, 
  Star, 
  Heart, 
  Settings,
  BarChart3,
  Music,
  DollarSign,
  Eye,
  Link2,
  FileText,
  Download
} from "lucide-react"

const iconMap = {
  'zap': Zap,
  'shield': Shield,
  'trending-up': TrendingUp,
  'users': Users,
  'globe': Globe,
  'star': Star,
  'heart': Heart,
  'settings': Settings,
  'bar-chart': BarChart3,
  'music': Music,
  'dollar-sign': DollarSign,
  'eye': Eye,
  'link': Link2,
  'file-text': FileText,
  'download': Download,
  'play': Play,
  'check-circle': CheckCircle,
  'clock': Clock,
}

interface ProcessStep {
  number?: number
  icon?: keyof typeof iconMap
  title: string
  description: string
  duration?: string
  badge?: string
  image?: {
    url: string
    alt: string
  }
  cta?: {
    text: string
    url: string
  }
  status?: 'upcoming' | 'current' | 'completed'
}

interface HorizontalProcessFlowProps {
  title?: string
  subtitle?: string
  steps: ProcessStep[]
  variant?: 'default' | 'cards' | 'minimal' | 'timeline'
  showConnectors?: boolean
  className?: string
}

export function HorizontalProcessFlow({
  title,
  subtitle,
  steps,
  variant = 'default',
  showConnectors = true,
  className = "",
}: HorizontalProcessFlowProps) {
  return (
    <section className={cn("py-20 lg:py-32", className)}>
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

        {/* Process Steps */}
        <div className="relative">
          {/* Connector Line */}
          {showConnectors && variant !== 'cards' && (
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-royal-200 via-royal-300 to-royal-200 transform -translate-y-1/2" />
          )}

          <div className={cn(
            "grid gap-8",
            steps.length <= 3 ? "md:grid-cols-3" : 
            steps.length <= 4 ? "md:grid-cols-2 lg:grid-cols-4" :
            "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          )}>
            {steps.map((step, index) => {
              const IconComponent = step.icon ? iconMap[step.icon] : null
              const stepNumber = step.number || index + 1

              return (
                <FadeIn key={index} delay={0.3 + index * 0.1}>
                  <div className="relative group">
                    {/* Connector Arrow (between steps) */}
                    {showConnectors && index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-16 -right-4 z-10">
                        <div className="w-8 h-8 bg-white rounded-full border-2 border-royal-300 flex items-center justify-center group-hover:border-royal-400 transition-colors">
                          <ArrowRight className="w-4 h-4 text-royal-600" />
                        </div>
                      </div>
                    )}

                    {variant === 'cards' ? (
                      <Card className="h-full border-royal-100 hover:border-royal-200 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                        <CardContent className="p-8 text-center">
                          {/* Step Number/Icon */}
                          <div className="relative mb-6">
                            <div className={cn(
                              "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300",
                              step.status === 'completed' ? "bg-green-100 text-green-600" :
                              step.status === 'current' ? "bg-royal-100 text-royal-600 ring-4 ring-royal-200" :
                              "bg-gray-100 text-gray-600 group-hover:bg-royal-100 group-hover:text-royal-600"
                            )}>
                              {IconComponent ? (
                                <IconComponent className="w-8 h-8" />
                              ) : (
                                <span className="text-2xl font-bold">{stepNumber}</span>
                              )}
                            </div>
                            {step.badge && (
                              <Badge variant="outline" className="absolute -top-2 -right-2 border-royal-200 text-royal-700 bg-white">
                                {step.badge}
                              </Badge>
                            )}
                          </div>

                          {/* Content */}
                          <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-royal-600 transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {step.description}
                          </p>
                          
                          {step.duration && (
                            <div className="flex items-center justify-center text-sm text-royal-600 mb-4">
                              <Clock className="w-4 h-4 mr-1" />
                              {step.duration}
                            </div>
                          )}

                          {step.image && (
                            <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                              <Image
                                src={step.image.url}
                                alt={step.image.alt}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}

                          {step.cta && (
                            <Button variant="outline" size="sm" className="mt-4" asChild>
                              <a href={step.cta.url}>
                                {step.cta.text}
                              </a>
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="text-center">
                        {/* Step Number/Icon */}
                        <div className="relative mb-6">
                          <div className={cn(
                            "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto transition-all duration-300 relative z-10",
                            step.status === 'completed' ? "bg-green-100 text-green-600" :
                            step.status === 'current' ? "bg-royal-600 text-white ring-4 ring-royal-200" :
                            "bg-royal-100 text-royal-600 group-hover:bg-royal-200"
                          )}>
                            {IconComponent ? (
                              <IconComponent className="w-8 h-8" />
                            ) : (
                              <span className="text-2xl font-bold">{stepNumber}</span>
                            )}
                          </div>
                          {step.badge && (
                            <Badge variant="outline" className="absolute -top-2 -right-4 border-royal-200 text-royal-700 bg-white">
                              {step.badge}
                            </Badge>
                          )}
                        </div>

                        {/* Content */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-royal-600 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                          {step.description}
                        </p>
                        
                        {step.duration && (
                          <div className="flex items-center justify-center text-xs text-royal-600">
                            <Clock className="w-3 h-3 mr-1" />
                            {step.duration}
                          </div>
                        )}
                      </div>
                    )}
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

// components/process/VerticalTimeline.tsx - Mobile-friendly vertical flow
"use client"

interface VerticalTimelineProps {
  title?: string
  subtitle?: string
  steps: ProcessStep[]
  variant?: 'left' | 'alternating' | 'center'
  className?: string
}

export function VerticalTimeline({
  title,
  subtitle,
  steps,
  variant = 'left',
  className = "",
}: VerticalTimelineProps) {
  return (
    <section className={cn("py-20 lg:py-32", className)}>
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

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className={cn(
            "absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-royal-200 via-royal-300 to-royal-200",
            variant === 'center' ? "left-1/2 transform -translate-x-1/2" : "left-8"
          )} />

          <div className="space-y-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon ? iconMap[step.icon] : null
              const stepNumber = step.number || index + 1
              const isLeft = variant === 'alternating' ? index % 2 === 0 : variant === 'left'

              return (
                <FadeIn key={index} delay={0.3 + index * 0.15}>
                  <div className={cn(
                    "relative flex items-start",
                    variant === 'center' && !isLeft && "flex-row-reverse"
                  )}>
                    {/* Timeline Node */}
                    <div className={cn(
                      "flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-300",
                      variant === 'center' ? "mx-8" : "mr-8",
                      step.status === 'completed' ? "bg-green-100 text-green-600" :
                      step.status === 'current' ? "bg-royal-600 text-white ring-4 ring-royal-200" :
                      "bg-royal-100 text-royal-600"
                    )}>
                      {IconComponent ? (
                        <IconComponent className="w-8 h-8" />
                      ) : (
                        <span className="text-xl font-bold">{stepNumber}</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className={cn(
                      "flex-1 min-w-0",
                      variant === 'center' && !isLeft && "text-right"
                    )}>
                      <Card className="border-royal-100 hover:border-royal-200 hover:shadow-md transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {step.title}
                            </h3>
                            {step.badge && (
                              <Badge variant="outline" className="border-royal-200 text-royal-700">
                                {step.badge}
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {step.description}
                          </p>

                          {step.duration && (
                            <div className={cn(
                              "flex items-center text-sm text-royal-600 mb-4",
                              variant === 'center' && !isLeft && "justify-end"
                            )}>
                              <Clock className="w-4 h-4 mr-1" />
                              {step.duration}
                            </div>
                          )}

                          {step.image && (
                            <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                              <Image
                                src={step.image.url}
                                alt={step.image.alt}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}

                          {step.cta && (
                            <div className={cn(
                              variant === 'center' && !isLeft && "text-right"
                            )}>
                              <Button variant="outline" size="sm" asChild>
                                <a href={step.cta.url}>
                                  {step.cta.text}
                                  <ArrowRight className="ml-2 w-4 h-4" />
                                </a>
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
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

// components/process/InteractiveProcessFlow.tsx - Animated interactive flow
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface InteractiveProcessFlowProps {
  title?: string
  subtitle?: string
  steps: ProcessStep[]
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

export function InteractiveProcessFlow({
  title,
  subtitle,
  steps,
  autoPlay = false,
  autoPlayInterval = 3000,
  className = "",
}: InteractiveProcessFlowProps) {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, steps.length])

  return (
    <section className={cn("py-20 lg:py-32 bg-gradient-to-br from-royal-50/30 to-white", className)}>
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

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Step Navigation */}
          <div>
            <div className="space-y-4">
              {steps.map((step, index) => {
                const IconComponent = step.icon ? iconMap[step.icon] : null
                const isActive = index === activeStep

                return (
                  <motion.div
                    key={index}
                    className={cn(
                      "flex items-start space-x-4 p-4 rounded-xl cursor-pointer transition-all duration-300",
                      isActive ? "bg-royal-50 border-2 border-royal-200" : "hover:bg-gray-50"
                    )}
                    onClick={() => setActiveStep(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={cn(
                      "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300",
                      isActive ? "bg-royal-600 text-white" : "bg-royal-100 text-royal-600"
                    )}>
                      {IconComponent ? (
                        <IconComponent className="w-6 h-6" />
                      ) : (
                        <span className="font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={cn(
                        "font-semibold mb-1 transition-colors",
                        isActive ? "text-royal-600" : "text-gray-900"
                      )}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                      {step.duration && (
                        <div className="flex items-center text-xs text-royal-600 mt-2">
                          <Clock className="w-3 h-3 mr-1" />
                          {step.duration}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Progress Bar */}
            <div className="mt-8">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Progress</span>
                <span>{Math.round(((activeStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-royal-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>

          {/* Active Step Content */}
          <div className="relative h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Card className="h-full border-royal-100 shadow-lg">
                  <CardContent className="p-8 h-full flex flex-col">
                    {steps[activeStep].image && (
                      <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                        <Image
                          src={steps[activeStep].image!.url}
                          alt={steps[activeStep].image!.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {steps[activeStep].title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {steps[activeStep].description}
                      </p>
                    </div>

                    {steps[activeStep].cta && (
                      <Button className="w-full" asChild>
                        <a href={steps[activeStep].cta!.url}>
                          {steps[activeStep].cta!.text}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

// components/process/ProcessBentoGrid.tsx - Modern bento-style process
"use client"

interface ProcessBentoGridProps {
  title?: string
  subtitle?: string
  steps: Array<ProcessStep & {
    size: 'small' | 'medium' | 'large' | 'wide'
    backgroundGradient?: string
  }>
  className?: string
}

export function ProcessBentoGrid({
  title,
  subtitle,
  steps,
  className = "",
}: ProcessBentoGridProps) {
  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 md:col-span-2 row-span-1",
    large: "col-span-1 md:col-span-2 lg:col-span-3 row-span-2",
    wide: "col-span-1 md:col-span-2 lg:col-span-4 row-span-1",
  }

  return (
    <section className={cn("py-20 lg:py-32", className)}>
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

        {/* Bento Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-fr">
          {steps.map((step, index) => {
            const IconComponent = step.icon ? iconMap[step.icon] : null
            const stepNumber = step.number || index + 1

            return (
              <FadeIn key={index} delay={0.3 + index * 0.1}>
                <Card 
                  className={cn(
                    "group relative overflow-hidden border-royal-100 hover:border-royal-200 hover:shadow-xl transition-all duration-500",
                    sizeClasses[step.size]
                  )}
                  style={step.backgroundGradient ? { background: step.backgroundGradient } : undefined}
                >
                  <CardContent className="relative h-full flex flex-col p-6 lg:p-8">
                    {/* Background Image */}
                    {step.image && (
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={step.image.url}
                          alt={step.image.alt}
                          fill
                          className="object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center bg-royal-100 group-hover:bg-royal-200 transition-colors",
                          step.size === 'large' && "w-16 h-16"
                        )}>
                          {IconComponent ? (
                            <IconComponent className={cn(
                              "text-royal-600",
                              step.size === 'large' ? "w-8 h-8" : "w-6 h-6"
                            )} />
                          ) : (
                            <span className={cn(
                              "font-bold text-royal-600",
                              step.size === 'large' ? "text-xl" : "text-lg"
                            )}>
                              {stepNumber}
                            </span>
                          )}
                        </div>
                        {step.badge && (
                          <Badge variant="outline" className="border-royal-200 text-royal-700 bg-white/80 backdrop-blur-sm">
                            {step.badge}
                          </Badge>
                        )}
                      </div>

                      {/* Title & Description */}
                      <div className="flex-1">
                        <h3 className={cn(
                          "font-bold text-gray-900 mb-3 group-hover:text-royal-600 transition-colors",
                          step.size === 'large' ? "text-2xl" : "text-lg"
                        )}>
                          {step.title}
                        </h3>
                        <p className={cn(
                          "text-gray-600 leading-relaxed",
                          step.size === 'large' ? "text-base" : "text-sm"
                        )}>
                          {step.description}
                        </p>
                      </div>

                      {/* Duration */}
                      {step.duration && (
                        <div className="mt-4 flex items-center text-sm text-royal-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {step.duration}
                        </div>
                      )}

                      {/* CTA */}
                      {step.cta && (
                        <div className="mt-4">
                          <Button variant="outline" size="sm" className="group-hover:bg-royal-50" asChild>
                            <a href={step.cta.url}>
                              {step.cta.text}
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-royal-600/5 to-royal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </CardContent>
                </Card>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}