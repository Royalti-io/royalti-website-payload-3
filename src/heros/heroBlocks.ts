import { Block } from 'payload/types'
import { MainHeroBlock, SecondaryHeroBlock, ProductHeroBlock } from '@/collections/blocks/HeroBlocks'

// Export the hero blocks for use in PayloadCMS collections
export const heroBlocks: Block[] = [
  MainHeroBlock,
  SecondaryHeroBlock,
  ProductHeroBlock,
]
