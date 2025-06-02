// components/cta/SmartCTA.tsx - Intelligent CTA that adapts to user context
"use client"

import { Button } from "../../src/components/ui/button"
import { Badge } from "../../src/components/ui/badge"
import { Card, CardContent } from "../../src/components/ui/card"
import { FadeIn } from "../../src/components/ui/animation/FadeIn"
import { cn } from "../../src/utilities/cn"
import { 
  ArrowRight, 
  Play, 
  Star, 
  Clock, 
  Users, 
  Shield, 
  Zap,
  Calendar,
  Phone,
  MessageCircle
} from "lucide-react"

interface CTAProps {
  variant: 'primary' | 'secondary' | 'soft' | 'urgent' | 'social-proof'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  intent: 'trial' | 'demo' | 'contact' | 'learn' | 'subscribe' | 'upgrade'
  urgency?: 'low' | 'medium' | 'high'
  socialProof?: {
    type: 'users' | 'revenue' | 'rating' | 'testimonial'
    value: string
    label: string
  }
  freeTrialLength?: number
  audience?: 'artist' | 'label' | 'publisher' | 'enterprise'
  className?: string
  onClick?: () => void
}

const intentConfig = {
  trial: {
    primary: "Start Free Trial",
    secondary: "Try Royalti.io Free",
    icon: Zap,
    color: "royal"
  },
  demo: {
    primary: "Watch Demo",
    secondary: "See It in Action",
    icon: Play,
    color: "blue"
  },
  contact: {
    primary: "Get In Touch",
    secondary: "Talk to Sales",
    icon: MessageCircle,
    color: "green"
  },
  learn: {
    primary: "Learn More",
    secondary: "Explore Features",
    icon: ArrowRight,
    color: "gray"
  },
  subscribe: {
    primary: "Get Updates",
    secondary: "Stay Informed",
    icon: Calendar,
    color: "purple"
  },
  upgrade: {
    primary: "Upgrade Now",
    secondary: "Unlock Features",
    icon: Star,
    color: "gold"
  }
}

const urgencyConfig = {
  low: {
    badge: null,
    modifier: ""
  },
  medium: {
    badge: "Popular",
    modifier: "Join thousands of artists"
  },
  high: {
    badge: "Limited Time",
    modifier: "Don't miss out"
  }
}

export function SmartCTA({
  variant,
  size = 'lg',
  intent,
  urgency = 'low',
  socialProof,
  freeTrialLength = 14,
  audience = 'artist',
  className = "",
  onClick
}: CTAProps) {
  const config = intentConfig[intent]
  const urgencyInfo = urgencyConfig[urgency]
  const IconComponent = config.icon

  // Audience-specific messaging
  const audienceMessages = {
    artist: {
      trial: `Start your ${freeTrialLength}-day free trial`,
      demo: "See how artists grow revenue",
      contact: "Speak with our artist success team"
    },
    label: {
      trial: `Free ${freeTrialLength}-day trial for labels`,
      demo: "Watch label management demo",
      contact: "Talk to our label specialists"
    },
    publisher: {
      trial: `${freeTrialLength} days free for publishers`,
      demo: "See publisher workflow demo",
      contact: "Connect with publisher experts"
    },
    enterprise: {
      trial: "Enterprise trial available",
      demo: "Schedule private demo",
      contact: "Speak with enterprise sales"
    }
  }

  const getButtonText = () => {
    if (variant === 'soft') {
      return audienceMessages[audience][intent] || config.secondary
    }
    return config.primary
  }

  if (variant === 'social-proof' && socialProof) {
    return (
      <FadeIn>
        <Card className="border-royal-200 bg-royal-50/50 hover:bg-royal-50 transition-colors cursor-pointer group" onClick={onClick}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-royal-100 rounded-lg flex items-center justify-center group-hover:bg-royal-200 transition-colors">
                  <IconComponent className="w-6 h-6 text-royal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{getButtonText()}</h3>
                  {urgencyInfo.modifier && (
                    <p className="text-sm text-gray-600">{urgencyInfo.modifier}</p>
                  )}
                </div>
              </div>
              {urgencyInfo.badge && (
                <Badge variant="outline" className="border-royal-300 text-royal-700">
                  {urgencyInfo.badge}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-royal-600">
                {socialProof.type === 'users' && <Users className="w-4 h-4" />}
                {socialProof.type === 'rating' && <Star className="w-4 h-4" />}
                {socialProof.type === 'revenue' && <ArrowRight className="w-4 h-4" />}
                <span className="font-medium">{socialProof.value}</span>
                <span className="text-gray-500">{socialProof.label}</span>
              </div>
              <ArrowRight className="w-5 h-5 text-royal-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    )
  }

  return (
    <FadeIn>
      <div className={cn("flex flex-col items-center space-y-3", className)}>
        {urgencyInfo.badge && (
          <Badge variant="outline" className="border-royal-300 text-royal-700 bg-royal-50">
            {urgencyInfo.badge}
          </Badge>
        )}
        
        <Button
          size={size}
          variant={variant === 'primary' ? 'default' : 'outline'}
          className={cn(
            "group relative overflow-hidden",
            variant === 'primary' && "bg-royal-600 hover:bg-royal-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200",
            variant === 'urgent' && "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg animate-pulse",
            size === 'xl' && "px-12 py-4 text-lg",
            size === 'lg' && "px-8 py-3",
            size === 'md' && "px-6 py-2",
            size === 'sm' && "px-4 py-2 text-sm"
          )}
          onClick={onClick}
        >
          <span className="flex items-center">
            {getButtonText()}
            <IconComponent className={cn(
              "ml-2 group-hover:translate-x-1 transition-transform",
              size === 'xl' ? "w-6 h-6" : "w-5 h-5"
            )} />
          </span>
          
          {variant === 'primary' && (
            <div className="absolute inset-0 bg-gradient-to-r from-royal-400/20 to-royal-600/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          )}
        </Button>

        {socialProof && variant !== 'social-proof' && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            {socialProof.type === 'users' && <Users className="w-4 h-4" />}
            {socialProof.type === 'rating' && <Star className="w-4 h-4 text-yellow-500" />}
            <span>{socialProof.value} {socialProof.label}</span>
          </div>
        )}

        {urgencyInfo.modifier && (
          <p className="text-sm text-gray-600 text-center max-w-xs">
            {urgencyInfo.modifier}
          </p>
        )}
      </div>
    </FadeIn>
  )
}

// components/cta/CTASection.tsx - Full CTA sections with multiple variants
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../src/components/ui/card"
import { Input } from "../../src/components/ui/input"
import { Button } from "../../src/components/ui/button"
import { SmartCTA } from "./SmartCTA"

interface CTASectionProps {
  variant: 'hero' | 'feature-focused' | 'objection-handling' | 'urgency' | 'newsletter'
  title?: string
  subtitle?: string
  features?: string[]
  objections?: Array<{
    concern: string
    solution: string
  }>
  primaryCTA: {
    intent: 'trial' | 'demo' | 'contact'
    audience?: 'artist' | 'label' | 'publisher' | 'enterprise'
  }
  secondaryCTA?: {
    intent: 'trial' | 'demo' | 'contact' | 'learn'
    audience?: 'artist' | 'label' | 'publisher' | 'enterprise'
  }
  socialProof?: {
    type: 'users' | 'revenue' | 'rating' | 'testimonial'
    value: string
    label: string
  }
  className?: string
}

export function CTASection({
  variant,
  title,
  subtitle,
  features = [],
  objections = [],
  primaryCTA,
  secondaryCTA,
  socialProof,
  className = ""
}: CTASectionProps) {
  const [email, setEmail] = useState("")

  if (variant === 'newsletter') {
    return (
      <section className={cn("py-20 bg-gradient-to-br from-royal-50 to-royal-100", className)}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn delay={0.1}>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {title || "Stay Updated on Music Industry Trends"}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-gray-600 mb-8">
                {subtitle || "Get weekly insights on royalty management, industry news, and revenue optimization tips."}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button className="bg-royal-600 hover:bg-royal-700">
                  Subscribe
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </FadeIn>
            {socialProof && (
              <FadeIn delay={0.4}>
                <p className="text-sm text-gray-600 mt-4">
                  Join {socialProof.value} {socialProof.label} getting our insights
                </p>
              </FadeIn>
            )}
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'objection-handling') {
    return (
      <section className={cn("py-20", className)}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                {title || "Still Have Questions?"}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-gray-600 text-center mb-12">
                {subtitle || "We've helped thousands of artists overcome these common concerns."}
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {objections.map((objection, index) => (
                <FadeIn key={index} delay={0.3 + index * 0.1}>
                  <Card className="border-royal-100 hover:border-royal-200 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900">
                        "{objection.concern}"
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{objection.solution}</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.6}>
              <div className="text-center">
                <SmartCTA
                  variant="primary"
                  size="xl"
                  intent={primaryCTA.intent}
                  audience={primaryCTA.audience}
                  socialProof={socialProof}
                  urgency="medium"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={cn(
      "py-20",
      variant === 'hero' ? "bg-gradient-to-br from-royal-50 to-white" : "",
      variant === 'urgency' ? "bg-gradient-to-r from-orange-50 to-red-50" : "",
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn delay={0.1}>
            <h2 className={cn(
              "font-bold text-gray-900 mb-6",
              variant === 'hero' ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
            )}>
              {title}
            </h2>
          </FadeIn>
          
          {subtitle && (
            <FadeIn delay={0.2}>
              <p className="text-xl text-gray-600 mb-8">
                {subtitle}
              </p>
            </FadeIn>
          )}

          {features.length > 0 && (
            <FadeIn delay={0.3}>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Shield className="w-4 h-4 text-green-500 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SmartCTA
                variant={variant === 'urgency' ? 'urgent' : 'primary'}
                size="xl"
                intent={primaryCTA.intent}
                audience={primaryCTA.audience}
                socialProof={socialProof}
                urgency={variant === 'urgency' ? 'high' : 'medium'}
              />
              
              {secondaryCTA && (
                <SmartCTA
                  variant="secondary"
                  size="lg"
                  intent={secondaryCTA.intent}
                  audience={secondaryCTA.audience}
                  urgency="low"
                />
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// components/cta/ProgressiveCTA.tsx - Multi-step conversion funnel
"use client"

interface ProgressiveCTAProps {
  currentStep: 'awareness' | 'interest' | 'consideration' | 'trial' | 'conversion'
  audience: 'artist' | 'label' | 'publisher' | 'enterprise'
  userBehavior?: {
    timeOnSite: number
    pagesViewed: number
    hasWatchedDemo: boolean
    hasDownloadedGuide: boolean
  }
  className?: string
}

export function ProgressiveCTA({
  currentStep,
  audience,
  userBehavior,
  className = ""
}: ProgressiveCTAProps) {
  const getCTAForStep = () => {
    switch (currentStep) {
      case 'awareness':
        return {
          intent: 'learn' as const,
          variant: 'soft' as const,
          title: `Perfect for ${audience === 'artist' ? 'Artists' : audience === 'label' ? 'Labels' : 'Publishers'} Like You`,
          subtitle: "See how we're different from other royalty platforms"
        }
      
      case 'interest':
        return {
          intent: 'demo' as const,
          variant: 'primary' as const,
          title: "See It in Action",
          subtitle: "Watch a 5-minute demo of our platform"
        }
      
      case 'consideration':
        return {
          intent: userBehavior?.hasWatchedDemo ? 'trial' : 'demo' as const,
          variant: 'primary' as const,
          title: userBehavior?.hasWatchedDemo ? "Ready to Try It?" : "Still Deciding?",
          subtitle: userBehavior?.hasWatchedDemo ? 
            "Start your free trial today" : 
            "See exactly how it works for your music"
        }
      
      case 'trial':
        return {
          intent: 'trial' as const,
          variant: 'urgent' as const,
          title: "Start Your Free Trial",
          subtitle: "No credit card required. Set up in 5 minutes."
        }
      
      case 'conversion':
        return {
          intent: 'upgrade' as const,
          variant: 'urgent' as const,
          title: "Upgrade to Continue",
          subtitle: "Keep accessing all your royalty data"
        }
    }
  }

  const config = getCTAForStep()

  return (
    <div className={cn("sticky bottom-4 z-50", className)}>
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="border-royal-200 bg-white/95 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {config.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {config.subtitle}
                </p>
                <SmartCTA
                  variant={config.variant}
                  size="md"
                  intent={config.intent}
                  audience={audience}
                  urgency={currentStep === 'trial' || currentStep === 'conversion' ? 'high' : 'medium'}
                  socialProof={
                    currentStep === 'consideration' ? {
                      type: 'users',
                      value: '10,000+',
                      label: 'artists trust us'
                    } : undefined
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// components/cta/ExitIntentCTA.tsx - Catch users before they leave
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface ExitIntentCTAProps {
  audience: 'artist' | 'label' | 'publisher' | 'enterprise'
  onClose: () => void
}

export function ExitIntentCTA({ audience, onClose }: ExitIntentCTAProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsVisible(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  const audienceContent = {
    artist: {
      title: "Wait! Don't Miss Out on Your Revenue",
      subtitle: "Join 8,000+ artists who track every penny with Royalti.io",
      offer: "Start your 14-day free trial - no credit card required"
    },
    label: {
      title: "Before You Go...",
      subtitle: "See how labels increase revenue by 23% on average",
      offer: "Schedule a free demo for your label"
    },
    publisher: {
      title: "Don't Leave Money on the Table",
      subtitle: "Publishers using our platform find 15% more revenue",
      offer: "Get a publisher-specific demo"
    },
    enterprise: {
      title: "Let's Talk About Your Needs",
      subtitle: "Custom enterprise solutions for major labels",
      offer: "Schedule a private consultation"
    }
  }

  const content = audienceContent[audience]

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={() => {
          setIsVisible(false)
          onClose()
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl p-8 max-w-md mx-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              setIsVisible(false)
              onClose()
            }}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {content.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {content.subtitle}
            </p>
            <div className="space-y-4">
              <SmartCTA
                variant="urgent"
                size="lg"
                intent={audience === 'enterprise' ? 'contact' : 'trial'}
                audience={audience}
                urgency="high"
                className="w-full"
              />
              <p className="text-sm text-gray-500">
                {content.offer}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}