import type { Field } from 'payload'
import { MainHeroBlock, SecondaryHeroBlock, ProductHeroBlock } from '@/collections/blocks/HeroBlocks'

// Create a blocks field for hero components
export const heroBlocksField: Field = {
  name: 'heroBlocks',
  type: 'blocks',
  label: 'Hero Components',
  blocks: [
    MainHeroBlock,
    SecondaryHeroBlock,
    ProductHeroBlock,
  ],
}
