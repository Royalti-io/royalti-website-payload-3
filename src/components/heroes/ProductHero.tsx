"use client"

import React from "react"
import type { FC } from "react"
import { Button } from "../ui/button"
import { FadeIn } from "../ui/animation/FadeIn"
import { Container } from "../ui/container"
import { ArrowRight, Check } from "lucide-react"
import Image from "next/image"
import { cn } from "../../utilities/cn"

interface ProductHeroProps {
  heading: string,
  subheading?: string,
  ctaButton?: {
    text: string,
    url: string,
  },
  productImage?: {
    url: string,
    alt: string,
  },
  features?: string[],
  className?: string,
}

export const ProductHero: FC<ProductHeroProps> = ({
  heading,
  subheading,
  ctaButton,
  productImage,
  features = [],
  className,
}) => {
  return (
    <section className={cn(
      "relative py-20 lg:py-32 overflow-hidden",
      className,
    )}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-royal-50/30 to-royal-100/50" />
      
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <FadeIn delay={0.1}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {heading}
              </h1>
            </FadeIn>
            
            {subheading && (
              <FadeIn delay={0.2}>
                <p className="text-lg text-gray-600 mb-8">
                  {subheading}
                </p>
              </FadeIn>
            )}
            
            {features.length > 0 && (
              <FadeIn delay={0.3} className="mb-8">
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-royal-100 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4 text-royal-600" />
                      </div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            )}
            
            {ctaButton && (
              <FadeIn delay={0.4}>
                <Button 
                  size="lg" 
                  className="bg-royal-600 hover:bg-royal-700"
                  data-analytics-id="product-hero-cta"
                >
                  {ctaButton.text}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </FadeIn>
            )}
          </div>
          
          {/* Image */}
          {productImage && (
            <FadeIn delay={0.3} direction="left" className="lg:order-last">
              <div className="relative h-[400px] lg:h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={productImage.url}
                  alt={productImage.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </FadeIn>
          )}
        </div>
      </Container>
    </section>
  )
}
