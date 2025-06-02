"use client"

import React from "react"
import type { FC } from "react"
import { FadeIn } from "../ui/animation/FadeIn"
import { Container } from "../ui/container"
import { cn } from "../../utilities/cn"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface SecondaryHeroProps {
  heading: string,
  subheading?: string,
  backgroundPattern?: "dots" | "grid" | "none",
  showBreadcrumbs?: boolean,
  breadcrumbs?: Array<{
    label: string,
    href: string,
  }>,
  className?: string,
}

export const SecondaryHero: FC<SecondaryHeroProps> = ({
  heading,
  subheading,
  backgroundPattern = "dots",
  showBreadcrumbs = true,
  breadcrumbs = [],
  className,
}) => {
  const patterns = {
    dots: "bg-[radial-gradient(circle_at_1px_1px,#006666_1px,transparent_0)] bg-[size:20px_20px]",
    grid: "bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px]",
    none: "",
  }

  return (
    <section 
      className={cn(
        "relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-white via-royal-50/30 to-royal-100/50",
        className,
      )}
    >
      {/* Background Pattern */}
      {backgroundPattern !== "none" && (
        <div className="absolute inset-0 opacity-5">
          <div className={cn("absolute inset-0", patterns[backgroundPattern])} />
        </div>
      )}

      <Container>
        {/* Breadcrumbs */}
        {showBreadcrumbs && breadcrumbs.length > 0 && (
          <FadeIn 
            delay={0.1} 
            direction="none" 
            className="mb-8 flex items-center text-sm text-gray-500"
          >
            <Link href="/" className="flex items-center hover:text-royal-600 transition-colors">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <ChevronRight className="w-3 h-3 mx-2 text-gray-400" />
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-700 font-medium">{crumb.label}</span>
                ) : (
                  <Link 
                    href={crumb.href} 
                    className="hover:text-royal-600 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </FadeIn>
        )}

        {/* Heading */}
        <FadeIn delay={0.2}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {heading}
          </h1>
        </FadeIn>

        {/* Subheading */}
        {subheading && (
          <FadeIn delay={0.3}>
            <p className="text-lg text-gray-600 max-w-3xl">
              {subheading}
            </p>
          </FadeIn>
        )}
      </Container>
    </section>
  )
}
