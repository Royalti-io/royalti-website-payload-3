// components/features/ClassicFeatureGrid.tsx - Traditional grid layout
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../src/components/ui/card"
import { Badge } from "../../src/components/ui/badge"
import { FadeIn } from "../../src/components/ui/animation/FadeIn"
import { GradientText } from "../../src/components/ui/animation/GradientText"
import Image from "next/image"
import { cn } from "../../src/utilities/cn"
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
} from "lucide-react"
import { Button } from "../../src/components/ui/button"
import React from "react"

// Icon mapping
const iconMap = {
  zap: Zap,
  shield: Shield,
  trending: TrendingUp,
  users: Users,
  globe: Globe,
  clock: Clock,
  star: Star,
  heart: Heart,
  check: CheckCircle,
  settings: Settings,
  arrow: ArrowRight,
}

// Feature interface
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

// Props interface
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
  // Grid column configuration
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
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

        {/* Features Grid */}
        <div className={cn("grid gap-8", gridCols[columns])}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon ? iconMap[feature.icon] : null

            return (
              <FadeIn key={index} delay={0.3 + index * 0.1}>
                {variant === 'minimal' ? (
                  <div className="flex items-start space-x-6 group">
                    {IconComponent && (
                      <div className="flex-shrink-0 w-12 h-12 bg-royal-100 rounded-xl flex items-center justify-center group-hover:bg-royal-200 transition-colors">
                        <IconComponent className="w-6 h-6 text-royal-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-royal-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                      {feature.link && (
                        <a 
                          href={feature.link.url}
                          className="inline-flex items-center text-royal-600 hover:text-royal-700 font-medium mt-4 text-sm group-hover:translate-x-1 transition-all"
                        >
                          {feature.link.text}
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ) : variant === 'cards' ? (
                  <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
                    {feature.image && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={feature.image.url}
                          alt={feature.image.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      {feature.badge && (
                        <Badge variant="outline" className="mb-2 self-start">
                          {feature.badge}
                        </Badge>
                      )}
                      <div className="flex items-center space-x-3">
                        {IconComponent && (
                          <div className="flex-shrink-0 w-10 h-10 bg-royal-100 rounded-full flex items-center justify-center group-hover:bg-royal-200 transition-colors">
                            <IconComponent className="w-5 h-5 text-royal-600" />
                          </div>
                        )}
                        <CardTitle className="text-xl group-hover:text-royal-600 transition-colors">
                          {feature.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-gray-600">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {feature.link && (
                        <Button variant="outline" className="w-full group-hover:bg-royal-50 border-royal-200" asChild>
                          <a href={feature.link.url}>
                            {feature.link.text}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="flex flex-col h-full p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all group">
                    <div className="mb-5">
                      {IconComponent && (
                        <div className="w-14 h-14 bg-royal-100 rounded-xl flex items-center justify-center group-hover:bg-royal-200 transition-colors">
                          <IconComponent className="w-7 h-7 text-royal-600" />
                        </div>
                      )}
                      {feature.badge && (
                        <Badge variant="outline" className="mt-4">
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-royal-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed flex-1">
                      {feature.description}
                    </p>
                    {feature.image && (
                      <div className="my-5 relative h-48 w-full rounded-xl overflow-hidden">
                        <Image
                          src={feature.image.url}
                          alt={feature.image.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    {feature.link && (
                      <div className="mt-auto pt-5">
                        <a 
                          href={feature.link.url}
                          className="inline-flex items-center text-royal-600 hover:text-royal-700 font-medium text-sm group-hover:translate-x-1 transition-all"
                        >
                          {feature.link.text}
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </a>
                      </div>
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

// components/features/ModernFeatureGrid.tsx - Advanced grid with sizing options
"use client"

interface ModernFeatureGridProps {
  title?: string
  subtitle?: string
  features: Array<{
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
    size?: 'small' | 'medium' | 'large' | 'wide'
    featured?: boolean
    backgroundGradient?: string
    stats?: {
      value: string
      label: string
    }
  }>
  className?: string
}

export function ModernFeatureGrid({
  title,
  subtitle,
  features,
  className = "",
}: ModernFeatureGridProps) {
  // Size configurations
  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 row-span-1 md:col-span-1 md:row-span-2",
    large: "col-span-1 row-span-1 md:col-span-2 md:row-span-2",
    wide: "col-span-1 row-span-1 md:col-span-2 md:row-span-1",
  }
  
  const contentPadding = {
    small: "p-6",
    medium: "p-6 md:p-8",
    large: "p-6 md:p-10",
    wide: "p-6 md:p-8",
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon ? iconMap[feature.icon] : null
            const size = feature.size || 'small'
            
            return (
              <FadeIn 
                key={index} 
                delay={0.3 + index * 0.1} 
                className={sizeClasses[size]}
              >
                <Card 
                  className={cn(
                    "group relative overflow-hidden border-royal-100 hover:border-royal-200 hover:shadow-xl transition-all duration-500 cursor-pointer",
                    sizeClasses[size],
                    feature.featured && "ring-2 ring-royal-200 ring-offset-2",
                    feature.backgroundGradient && "bg-gradient-to-br"
                  )}
                  style={feature.backgroundGradient ? { background: feature.backgroundGradient } : undefined}
                >
                  <CardContent className={cn("relative h-full flex flex-col", contentPadding[size])}>
                    {/* Background Image */}
                    {feature.image && (
                      <div className="absolute inset-0 z-0 opacity-10">
                        <Image
                          src={feature.image.url}
                          alt={feature.image.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon & Badge */}
                      <div className="flex items-start justify-between mb-6">
                        {IconComponent && (
                          <div className={cn(
                            "bg-royal-100 rounded-xl flex items-center justify-center group-hover:bg-royal-200 transition-colors",
                            size === 'large' ? "w-16 h-16" : "w-12 h-12"
                          )}>
                            <IconComponent className={cn(
                              "text-royal-600",
                              size === 'large' ? "w-8 h-8" : "w-6 h-6"
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
                          size === 'large' ? "text-2xl lg:text-3xl" : 
                          size === 'wide' ? "text-xl lg:text-2xl" : "text-lg"
                        )}>
                          {feature.title}
                        </h3>
                        <p className={cn(
                          "text-gray-600 leading-relaxed",
                          size === 'large' ? "text-lg" : "text-base"
                        )}>
                          {feature.description}
                        </p>
                      </div>

                      {/* Stats (for large cards) */}
                      {feature.stats && size === 'large' && (
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
                          {size === 'large' ? (
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
