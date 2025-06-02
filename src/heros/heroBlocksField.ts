import type { Field, Block } from 'payload'
import { MainHeroBlock, SecondaryHeroBlock, ProductHeroBlock } from './HeroBlocks'

// Create a blocks field for hero components
export const heroBlocksField: Field = {
  name: 'heroBlocks',
  type: 'blocks',
  label: 'Hero Components',
  blocks: [
    MainHeroBlock as Block,
    SecondaryHeroBlock as Block,
    ProductHeroBlock as Block,
  ],
}
