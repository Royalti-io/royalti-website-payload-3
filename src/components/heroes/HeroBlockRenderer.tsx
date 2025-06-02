"use client"

import React from "react"
import type { FC } from "react"
import { MainHero } from "./MainHero"
import { SecondaryHero } from "./SecondaryHero"
import { ProductHero } from "./ProductHero"

// Define interfaces for each hero block type
interface MainHeroBlockData {
  blockType: 'mainHero',
  announcement?: string,
  heading: string,
  subheading?: string,
  ctaButton?: {
    text: string,
    url: string,
  },
  secondaryButton?: {
    text: string,
    url: string,
  },
  backgroundImage?: {
    url: string,
    alt: string,
  },
  features?: Array<{ feature: string }>,
  statistics?: Array<{
    value: string,
    label: string,
  }>,
}

interface SecondaryHeroBlockData {
  blockType: 'secondaryHero',
  heading: string,
  subheading?: string,
  backgroundPattern?: "dots" | "grid" | "none",
  showBreadcrumbs?: boolean,
  breadcrumbs?: Array<{
    label: string,
    href: string,
  }>,
}

interface ProductHeroBlockData {
  blockType: 'productHero',
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
  features?: Array<{ feature: string }>,
}

// Union type for all hero block data
type HeroBlockData = MainHeroBlockData | SecondaryHeroBlockData | ProductHeroBlockData

// Props interface for the HeroBlockRenderer
interface HeroBlockRendererProps {
  block: HeroBlockData,
}

export const HeroBlockRenderer: FC<HeroBlockRendererProps> = ({ block }) => {
  // Transform CMS data to component props
  switch (block.blockType) {
    case 'mainHero':
      return (
        <MainHero
          heading={block.heading}
          subheading={block.subheading}
          announcement={block.announcement}
          ctaButton={block.ctaButton}
          secondaryButton={block.secondaryButton}
          backgroundImage={block.backgroundImage}
          features={block.features?.map(f => f.feature) || []}
          statistics={block.statistics}
        />
      )
    
    case 'secondaryHero':
      return (
        <SecondaryHero
          heading={block.heading}
          subheading={block.subheading}
          backgroundPattern={block.backgroundPattern}
          showBreadcrumbs={block.showBreadcrumbs}
          breadcrumbs={block.breadcrumbs}
        />
      )
    
    case 'productHero':
      return (
        <ProductHero
          heading={block.heading}
          subheading={block.subheading}
          ctaButton={block.ctaButton}
          productImage={block.productImage}
          features={block.features?.map(f => f.feature) || []}
        />
      )
    
    default:
      return null
  }
}
