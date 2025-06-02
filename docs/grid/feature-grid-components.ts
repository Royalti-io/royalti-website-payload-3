// components/features/ClassicFeatureGrid.tsx - Traditional grid layout
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/ui/animation/FadeIn"
import { GradientText } from "@/components/ui/animation/GradientText"
import Image from "next/image"
import { cn } from "src/utilities/cn"
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  Globe, 
  Clock, 
  Star, 
  Heart, 
  CheckCircle, 
  Settings,
  BarChart3,
  Music,
  DollarSign,
  Eye
} from "lucide-react"

const iconMap = {
  'zap': Zap,
  'shield': Shield,
  'trending-up': TrendingUp,
  'users': Users,
  'globe': Globe,
  'clock': Clock,
  'star': Star,
  'heart': Heart,
  'check-circle': CheckCircle,
  'settings': Settings,
  'bar-chart': BarChart3,
  'music': Music,
  'dollar-sign': DollarSign,
  'eye': Eye,
}

interface Feature {
  icon?: keyof typeof iconMap
  title: string
  description: string
  badge?: string
  image?: {
    url: string
    alt: string
  }
  link?: {
    text: string
    url: string
  }
}

interface ClassicFeatureGridProps {
  title?: string
  subtitle?: string
  features: Feature[]
  columns?: 2 | 3 | 4
  variant?: 'default' | 'minimal' | 'cards'
  className?: string
}

export function ClassicFeatureGrid({
  title,
  subtitle,
  features,
  columns = 3,
  variant = 'default',
  className = "",
}: ClassicFeatureGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
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

        {/* Feature Grid */}
        <div className={cn("grid gap-8", gridCols[columns])}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon ? iconMap[feature.icon] : null

            return (
              <FadeIn key={index} delay={0.3 + index * 0.1}>
                {variant === 'cards' ? (
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer border-royal-100 hover:border-royal-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        {IconComponent && (
                          <div className="w-12 h-12 bg-royal-100 rounded-lg flex items-center justify-center group-hover:bg-royal-200 transition-colors">
                            <IconComponent className="w-6 h-6 text-royal-600" />
                          </div>
                        )}
                        {feature.badge && (
                          <Badge variant="outline" className="text-xs border-royal-200 text-royal-700">
                            {feature.badge}
                          </Badge>
                        )}
                      </div>
                      {feature.image && (
                        <div className="w-full h-48 relative mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={feature.image.url}
                            alt={feature.image.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-royal-600 transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                      {feature.link && (
                        <a 
                          href={feature.link.url}
                          className="inline-flex items-center text-royal-600 hover:text-royal-700 font-medium text-sm group-hover:translate-x-1 transition-all"
                        >
                          {feature.link.text}
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center group">
                    {IconComponent && (
                      <div className="w-16 h-16 bg-gradient-to-br from-royal-100 to-royal-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-royal-600" />
                      </div>
                    )}
                    {feature.image && (
                      <div className="w-24 h-24 relative mx-auto mb-6 rounded-xl overflow-hidden">
                        <Image
                          src={feature.image.url}
                          alt={feature.image.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    {feature.badge && (
                      <Badge variant="outline" className="mb-4 border-royal-200 text-royal-700">
                        {feature.badge}
                      </Badge>
                    )}
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    {feature.link && (
                      <a 
                        href={feature.link.url}
                        className="inline-flex items-center text-royal-600 hover:text-royal-700 font-medium text-sm"
                      >
                        {feature.link.text}
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// components/features/BentoFeatureGrid.tsx - Bento style layout
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/animation/FadeIn"
import { GradientText } from "@/components/ui/animation/GradientText"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface BentoFeature {
  icon?: keyof typeof iconMap
  title: string
  description: string
  badge?: string
  image?: {
    url: string
    alt: string
  }
  link?: {
    text: string
    url: string
  }
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall'
  featured?: boolean
  backgroundGradient?: string
  stats?: {
    value: string
    label: string
  }
}

interface BentoFeatureGridProps {
  title?: string
  subtitle?: string
  features: BentoFeature[]
  className?: string
}

export function BentoFeatureGrid({
  title,
  subtitle,
  features,
  className = "",
}: BentoFeatureGridProps) {
  // Define grid layouts for different feature sizes
  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 md:col-span-2 row-span-1",
    large: "col-span-1 md:col-span-2 lg:col-span-3 row-span-2",
    wide: "col-span-1 md:col-span-2 lg:col-span-4 row-span-1",
    tall: "col-span-1 md:col-span-2 row-span-2",
  }

  const contentPadding = {
    small: "p-6",
    medium: "p-8",
    large: "p-10",
    wide: "p-8",
    tall: "p-8",
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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-fr">
          {features.map((feature, index) => {
            const IconComponent = feature.icon ? iconMap[feature.icon] : null

            return (
              <FadeIn key={index} delay={0.3 + index * 0.1}>
                <Card 
                  className={cn(
                    "group relative overflow-hidden border-royal-100 hover:border-royal-200 hover:shadow-xl transition-all duration-500 cursor-pointer",
                    sizeClasses[feature.size],
                    feature.featured && "ring-2 ring-royal-200 ring-offset-2",
                    feature.backgroundGradient && "bg-gradient-to-br"
                  )}
                  style={feature.backgroundGradient ? { background: feature.backgroundGradient } : undefined}
                >
                  <CardContent className={cn("relative h-full flex flex-col", contentPadding[feature.size])}>
                    {/* Background Image */}
                    {feature.image && (
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={feature.image.url}
                          alt={feature.image.alt}
                          fill
                          className="object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        {IconComponent && (
                          <div className={cn(
                            "bg-royal-100 rounded-xl flex items-center justify-center group-hover:bg-royal-200 transition-colors",
                            feature.size === 'large' ? "w-16 h-16" : "w-12 h-12"
                          )}>
                            <IconComponent className={cn(
                              "text-royal-600",
                              feature.size === 'large' ? "w-8 h-8" : "w-6 h-6"
                            )} />
                          </div>
                        )}
                        {feature.badge && (
                          <Badge variant="outline" className="border-royal-200 text-royal-700 bg-white/50 backdrop-blur-sm">
                            {feature.badge}
                          </Badge>
                        )}
                      </div>

                      {/* Title & Description */}
                      <div className="flex-1">
                        <h3 className={cn(
                          "font-bold text-gray-900 mb-3 group-hover:text-royal-600 transition-colors",
                          feature.size === 'large' ? "text-2xl lg:text-3xl" : 
                          feature.size === 'wide' ? "text-xl lg:text-2xl" : "text-lg"
                        )}>
                          {feature.title}
                        </h3>
                        <p className={cn(
                          "text-gray-600 leading-relaxed",
                          feature.size === 'large' ? "text-lg" : "text-base"
                        )}>
                          {feature.description}
                        </p>
                      </div>

                      {/* Stats (for large cards) */}
                      {feature.stats && feature.size === 'large' && (
                        <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-royal-200">
                          <div className="text-3xl font-bold text-royal-600 mb-1">
                            {feature.stats.value}
                          </div>
                          <div className="text-sm text-gray-600 uppercase tracking-wide">
                            {feature.stats.label}
                          </div>
                        </div>
                      )}

                      {/* Link/CTA */}
                      {feature.link && (
                        <div className="mt-6">
                          {feature.size === 'large' ? (
                            <Button variant="outline" className="group-hover:bg-royal-50 border-royal-200" asChild>
                              <a href={feature.link.url}>
                                {feature.link.text}
                                <ArrowRight className="ml-2 w-4 h-4" />
                              </a>
                            </Button>
                          ) : (
                            <a 
                              href={feature.link.url}
                              className="inline-flex items-center text-royal-600 hover:text-royal-700 font-medium text-sm group-hover:translate-x-1 transition-all"
                            >
                              {feature.link.text}
                              <ArrowRight className="ml-1 w-4 h-4" />
                            </a>
                          )}
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

// components/features/FeatureShowcase.tsx - Special showcase variant
"use client"

interface FeatureShowcaseProps {
  title: string
  subtitle?: string
  features: Array<{
    icon: keyof typeof iconMap
    title: string
    description: string
    image?: {
      url: string
      alt: string
    }
  }>
  mainFeature: {
    title: string
    description: string
    image: {
      url: string
      alt: string
    }
    stats?: Array<{
      value: string
      label: string
    }>
  }
  className?: string
}

export function FeatureShowcase({
  title,
  subtitle,
  features,
  mainFeature,
  className = "",
}: FeatureShowcaseProps) {
  return (
    <section className={cn("py-20 lg:py-32 bg-gradient-to-br from-royal-50/30 to-white", className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <FadeIn delay={0.1}>
            <h2 className="text-display-sm md:text-display-md font-bold text-gray-900 mb-6">
              <GradientText>{title}</GradientText>
            </h2>
          </FadeIn>
          {subtitle && (
            <FadeIn delay={0.2}>
              <p className="text-xl text-gray-600 leading-relaxed">
                {subtitle}
              </p>
            </FadeIn>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Main Feature */}
          <FadeIn delay={0.3}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-royal-600/20 to-royal-400/20 rounded-3xl blur-3xl transform rotate-3" />
              <Card className="relative bg-white shadow-2xl border-royal-100">
                <CardContent className="p-8">
                  <div className="relative h-64 md:h-80 mb-6 rounded-xl overflow-hidden">
                    <Image
                      src={mainFeature.image.url}
                      alt={mainFeature.image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {mainFeature.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {mainFeature.description}
                  </p>
                  {mainFeature.stats && (
                    <div className="grid grid-cols-2 gap-4">
                      {mainFeature.stats.map((stat, index) => (
                        <div key={index} className="text-center p-4 bg-royal-50 rounded-lg">
                          <div className="text-2xl font-bold text-royal-600">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-600 uppercase tracking-wide">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </FadeIn>

          {/* Supporting Features */}
          <div className="space-y-8">
            {features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon]
              
              return (
                <FadeIn key={index} delay={0.4 + index * 0.1}>
                  <div className="flex items-start space-x-6 group">
                    <div className="flex-shrink-0 w-14 h-14 bg-royal-100 rounded-xl flex items-center justify-center group-hover:bg-royal-200 transition-colors">
                      <IconComponent className="w-7 h-7 text-royal-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-royal-600 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                      {feature.image && (
                        <div className="mt-4 relative h-32 rounded-lg overflow-hidden">
                          <Image
                            src={feature.image.url}
                            alt={feature.image.alt}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
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