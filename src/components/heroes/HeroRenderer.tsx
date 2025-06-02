"use client"

import React from "react"
import type { FC } from "react"
import { MainHero } from "./MainHero"
import { SecondaryHero } from "./SecondaryHero"
import { ProductHero } from "./ProductHero"

// Define the base hero block data interface
interface HeroBlockData {
  blockType: 'mainHero' | 'secondaryHero' | 'productHero',
  [key: string]: any,
}

export const HeroRenderer: FC<HeroBlockData> = ({ blockType, ...data }) => {
  switch (blockType) {
    case 'mainHero':
      return <MainHero {...data} />
    case 'secondaryHero':
      return <SecondaryHero {...data} />
    case 'productHero':
      return <ProductHero {...data} />
    default:
      return null
  }
}
