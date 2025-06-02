"use client"

import React from "react"
import type { FC } from "react"
import { cn } from "../../utilities/cn"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { FadeIn } from "../ui/animation/FadeIn"
import { TextReveal } from "../ui/animation/TextReveal"
import { GradientText } from "../ui/animation/GradientText"
import { Container } from "../ui/container"
import { ArrowRight, Play, Zap, TrendingUp } from "lucide-react"
import Image from "next/image"

interface MainHeroProps {
  announcement?: string,
  heading: string,
  subheading?: string,
  ctaButton?: {
    text: string,
    url: string,
    variant?: "default" | "destructive" | "ghost" | "link" | "outline" | "secondary" | "royal",
  },
  secondaryButton?: {
    text: string,
    url: string,
    variant?: "default" | "destructive" | "ghost" | "link" | "outline" | "secondary" | "royal",
  },
  backgroundImage?: {
    url: string,
    alt: string,
  },
  features?: string[],
  statistics?: Array<{
    value: string,
    label: string,
  }>,
}

export const MainHero: FC<MainHeroProps> = ({
  announcement,
  heading,
  subheading,
  ctaButton,
  secondaryButton,
  backgroundImage,
  features = [],
  statistics = [],
}) => {
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
      <Container className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Announcement Badge */}
          {announcement && (
            <FadeIn delay={0.1}>
              <Badge variant="royal" className="mb-8 px-4 py-2 text-sm">
                <Zap className="w-4 h-4 mr-2" />
                {announcement}
              </Badge>
            </FadeIn>
          )}

          {/* Main Heading */}
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
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
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {subheading}
              </p>
            </FadeIn>
          )}

          {/* CTA Buttons */}
          <FadeIn delay={0.5} className="flex flex-wrap justify-center gap-4 mb-12">
            {ctaButton && (
              <Button size="lg" variant={ctaButton.variant || "royal"}>
                {ctaButton.text}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            )}
            {secondaryButton && (
              <Button size="lg" variant={secondaryButton.variant || "outline"}>
                <Play className="mr-2 w-4 h-4" />
                {secondaryButton.text}
              </Button>
            )}
          </FadeIn>

          {/* Features */}
          {features.length > 0 && (
            <FadeIn delay={0.6} className="mb-16">
              <div className="flex flex-wrap justify-center gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
                  >
                    <TrendingUp className="w-3 h-3 mr-2 text-royal-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

          {/* Statistics */}
          {statistics.length > 0 && (
            <FadeIn delay={0.7}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                {statistics.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-royal-600 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}
        </div>
      </Container>
    </section>
  )
}
