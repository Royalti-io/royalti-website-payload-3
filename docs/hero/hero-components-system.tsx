// components/ui/animation/FadeIn.tsx - Reusable animation wrapper
"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
  duration?: number
}

export function FadeIn({ 
  children, 
  delay = 0, 
  direction = "up", 
  className = "",
  duration = 0.6 
}: FadeInProps) {
  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { y: 0, x: -20 },
    right: { y: 0, x: 20 },
    none: { y: 0, x: 0 },
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction] 
      }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      transition={{ 
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// components/ui/animation/TextReveal.tsx - Animated text reveal
"use client"

import { motion } from "framer-motion"

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
}

export function TextReveal({ children, className = "", delay = 0 }: TextRevealProps) {
  const words = children.split(" ")

  return (
    <motion.div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.1,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// components/ui/animation/GradientText.tsx - Animated gradient text
"use client"

import { motion } from "framer-motion"
import { cn } from "../../src/utilities/cn"

interface GradientTextProps {
  children: string
  className?: string
  animate?: boolean
}

export function GradientText({ children, className = "", animate = true }: GradientTextProps) {
  return (
    <motion.span
      className={cn(
        "bg-gradient-to-r from-royal-600 via-royal-500 to-royal-400 bg-clip-text text-transparent",
        animate && "bg-[length:200%_auto] animate-gradient-x",
        className
      )}
      initial={{ backgroundPosition: "200% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  )
}

// components/heroes/MainHero.tsx - Primary homepage hero
"use client"

import { Button } from "../../../src/components/ui/button"
import { Badge } from "../../../src/components/ui/badge"
import { FadeIn } from "./animation/FadeIn"
import { TextReveal } from "./animation/TextReveal"
import { GradientText } from "./animation/GradientText"
import { ArrowRight, Play, Zap, TrendingUp } from "lucide-react"
import Image from "next/image"

interface MainHeroProps {
  announcement?: string
  heading: string
  subheading?: string
  ctaButton?: {
    text: string
    url: string
  }
  secondaryButton?: {
    text: string
    url: string
  }
  backgroundImage?: {
    url: string
    alt: string
  }
  features?: string[]
  statistics?: Array<{
    value: string
    label: string
  }>
}

export function MainHero({
  announcement,
  heading,
  subheading,
  ctaButton,
  secondaryButton,
  backgroundImage,
  features = [],
  statistics = [],
}: MainHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-royal-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#006666_1px,transparent_0)] bg-[size:20px_20px]" />
      </div>

      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt}
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Announcement Badge */}
          {announcement && (
            <FadeIn delay={0.1}>
              <Badge variant="outline" className="mb-8 px-4 py-2 text-sm border-royal-200 text-royal-700 bg-royal-50/50 backdrop-blur-sm">
                <Zap className="w-4 h-4 mr-2" />
                {announcement}
              </Badge>
            </FadeIn>
          )}

          {/* Main Heading */}
          <FadeIn delay={0.2}>
            <h1 className="text-display-lg md:text-display-xl font-bold text-gray-900 mb-6 leading-tight">
              <TextReveal delay={0.3}>
                {heading.split(" ").slice(0, -2).join(" ")}
              </TextReveal>{" "}
              <GradientText>
                {heading.split(" ").slice(-2).join(" ")}
              </GradientText>
            </h1>
          </FadeIn>

          {/* Subheading */}
          {subheading && (
            <FadeIn delay={0.4}>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                {subheading}
              </p>
            </FadeIn>
          )}

          {/* CTA Buttons */}
          <FadeIn delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {ctaButton && (
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-4 bg-royal-600 hover:bg-royal-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200" 
                  asChild
                >
                  <a href={ctaButton.url}>
                    {ctaButton.text}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              )}
              {secondaryButton && (
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-4 border-2 border-royal-200 text-royal-700 hover:bg-royal-50 hover:border-royal-300" 
                  asChild
                >
                  <a href={secondaryButton.url}>
                    <Play className="mr-2 w-5 h-5" />
                    {secondaryButton.text}
                  </a>
                </Button>
              )}
            </div>
          </FadeIn>

          {/* Features List */}
          {features.length > 0 && (
            <FadeIn delay={0.6}>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-12">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-royal-500 rounded-full mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

          {/* Statistics */}
          {statistics.length > 0 && (
            <FadeIn delay={0.7}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-200">
                {statistics.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-royal-600 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-20 animate-float">
        <div className="w-16 h-16 bg-gradient-to-br from-royal-400 to-royal-600 rounded-2xl" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-12 h-12 bg-gradient-to-br from-royal-300 to-royal-500 rounded-xl" />
      </div>
    </section>
  )
}

// components/heroes/SecondaryHero.tsx - For inner pages
interface SecondaryHeroProps {
  heading: string
  subheading?: string
  breadcrumbs?: Array<{
    label: string
    url?: string
  }>
  backgroundPattern?: "dots" | "grid" | "none"
}

export function SecondaryHero({
  heading,
  subheading,
  breadcrumbs = [],
  backgroundPattern = "dots",
}: SecondaryHeroProps) {
  const patterns = {
    dots: "bg-[radial-gradient(circle_at_1px_1px,#006666_1px,transparent_0)] bg-[size:20px_20px]",
    grid: "bg-[linear-gradient(#006666_1px,transparent_1px),linear-gradient(90deg,#006666_1px,transparent_1px)] bg-[size:20px_20px]",
    none: "",
  }

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-royal-50">
      {/* Background Pattern */}
      <div className={`absolute inset-0 opacity-5 ${patterns[backgroundPattern]}`} />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <FadeIn delay={0.1}>
              <nav className="flex justify-center mb-8">
                <ol className="flex items-center space-x-2 text-sm text-gray-600">
                  {breadcrumbs.map((crumb, index) => (
                    <li key={index} className="flex items-center">
                      {index > 0 && (
                        <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
                      )}
                      {crumb.url ? (
                        <a href={crumb.url} className="hover:text-royal-600 transition-colors">
                          {crumb.label}
                        </a>
                      ) : (
                        <span className="text-royal-600 font-medium">{crumb.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </FadeIn>
          )}

          {/* Heading */}
          <FadeIn delay={0.2}>
            <h1 className="text-display-md md:text-display-lg font-bold text-gray-900 mb-6">
              <TextReveal delay={0.3}>
                {heading}
              </TextReveal>
            </h1>
          </FadeIn>

          {/* Subheading */}
          {subheading && (
            <FadeIn delay={0.4}>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {subheading}
              </p>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  )
}

// components/heroes/ProductHero.tsx - For product/feature pages
interface ProductHeroProps {
  heading: string
  subheading?: string
  ctaButton?: {
    text: string
    url: string
  }
  productImage?: {
    url: string
    alt: string
  }
  features?: Array<{
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
  }>
}

export function ProductHero({
  heading,
  subheading,
  ctaButton,
  productImage,
  features = [],
}: ProductHeroProps) {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-royal-50/30 to-royal-100/50" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <FadeIn delay={0.1}>
              <h1 className="text-display-md lg:text-display-lg font-bold text-gray-900 mb-6">
                <TextReveal delay={0.2}>
                  {heading}
                </TextReveal>
              </h1>
            </FadeIn>

            {subheading && (
              <FadeIn delay={0.3}>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {subheading}
                </p>
              </FadeIn>
            )}

            {ctaButton && (
              <FadeIn delay={0.4}>
                <Button 
                  size="lg" 
                  className="mb-12 bg-royal-600 hover:bg-royal-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  asChild
                >
                  <a href={ctaButton.url}>
                    {ctaButton.text}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </FadeIn>
            )}

            {/* Features */}
            {features.length > 0 && (
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <FadeIn key={index} delay={0.5 + index * 0.1}>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-royal-100 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-royal-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>

          {/* Product Image */}
          {productImage && (
            <FadeIn delay={0.3} direction="right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-royal-600/20 to-royal-400/20 rounded-2xl blur-3xl transform rotate-6" />
                <div className="relative bg-white rounded-2xl shadow-2xl p-8">
                  <Image
                    src={productImage.url}
                    alt={productImage.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  )
}