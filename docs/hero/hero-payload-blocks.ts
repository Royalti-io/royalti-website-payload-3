// collections/blocks/HeroBlocks.ts - PayloadCMS block definitions
import { Block } from 'payload/types'

// Main Hero Block (Homepage)
export const MainHeroBlock: Block = {
  slug: 'mainHero',
  labels: {
    singular: 'Main Hero',
    plural: 'Main Heroes',
  },
  fields: [
    {
      name: 'announcement',
      type: 'text',
      admin: {
        description: 'Optional announcement badge (e.g., "🎉 New feature launched!")',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Main headline. Last 2 words will be highlighted with gradient.',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: {
        description: 'Supporting text below the headline',
      },
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'Primary CTA Button',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'Internal link (/about) or external (https://...)',
          },
        },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      label: 'Secondary Button (Optional)',
      fields: [
        {
          name: 'text',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional background image (will be subtle overlay)',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Key Features',
      maxRows: 5,
      admin: {
        description: 'Small feature bullets displayed below CTAs',
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'statistics',
      type: 'array',
      label: 'Statistics',
      maxRows: 4,
      admin: {
        description: 'Key metrics displayed at bottom of hero',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g., "10,000+" or "99%"',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g., "Active Users" or "Uptime"',
          },
        },
      ],
    },
  ],
  admin: {
    preview: (doc) => `Main Hero: ${doc.heading}`,
  },
}

// Secondary Hero Block (Inner pages)
export const SecondaryHeroBlock: Block = {
  slug: 'secondaryHero',
  labels: {
    singular: 'Secondary Hero',
    plural: 'Secondary Heroes',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'backgroundPattern',
      type: 'select',
      options: [
        { label: 'Dots', value: 'dots' },
        { label: 'Grid', value: 'grid' },
        { label: 'None', value: 'none' },
      ],
      defaultValue: 'dots',
    },
    {
      name: 'showBreadcrumbs',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Automatically show breadcrumbs based on page hierarchy',
      },
    },
  ],
  admin: {
    preview: (doc) => `Secondary Hero: ${doc.heading}`,
  },
}

// Product Hero Block
export const ProductHeroBlock: Block = {
  slug: 'productHero',
  labels: {
    singular: 'Product Hero',
    plural: 'Product Heroes',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'ctaButton',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'productImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Product screenshot or demo image',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Key Features',
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Zap (Lightning)', value: 'zap' },
            { label: 'Shield (Security)', value: 'shield' },
            { label: 'Trending Up (Growth)', value: 'trending-up' },
            { label: 'Users (Team)', value: 'users' },
            { label: 'Globe (Global)', value: 'globe' },
            { label: 'Clock (Time)', value: 'clock' },
            { label: 'Star (Quality)', value: 'star' },
            { label: 'Heart (Favorite)', value: 'heart' },
            { label: 'Check Circle (Success)', value: 'check-circle' },
            { label: 'Settings (Configuration)', value: 'settings' },
          ],
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
  admin: {
    preview: (doc) => `Product Hero: ${doc.heading}`,
  },
}

// Block registry for all hero types
export const HeroBlocks = [
  MainHeroBlock,
  SecondaryHeroBlock,
  ProductHeroBlock,
]

// components/blocks/HeroRenderer.tsx - Universal hero block renderer
import { MainHero } from '@/components/heroes/MainHero'
import { SecondaryHero } from '@/components/heroes/SecondaryHero'
import { ProductHero } from '@/components/heroes/ProductHero'
import { 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  Globe, 
  Clock, 
  Star, 
  Heart, 
  CheckCircle, 
  Settings 
} from 'lucide-react'

// Icon mapping for product features
const iconMap = {
  'zap': Zap,
  'shield': Shield,
  'trending-up': TrendingUp,
  'users': Users,
  'globe': Globe,
  'clock': Clock,
  'star': Star,
  'heart': Heart,
  'check-circle': CheckCircle,
  'settings': Settings,
}

interface HeroBlockData {
  blockType: 'mainHero' | 'secondaryHero' | 'productHero'
  [key: string]: any
}

export function HeroRenderer({ blockType, ...data }: HeroBlockData) {
  switch (blockType) {
    case 'mainHero':
      return (
        <MainHero
          announcement={data.announcement}
          heading={data.heading}
          subheading={data.subheading}
          ctaButton={data.ctaButton}
          secondaryButton={data.secondaryButton}
          backgroundImage={data.backgroundImage}
          features={data.features?.map((f: any) => f.feature) || []}
          statistics={data.statistics || []}
        />
      )
    
    case 'secondaryHero':
      return (
        <SecondaryHero
          heading={data.heading}
          subheading={data.subheading}
          backgroundPattern={data.backgroundPattern}
          // Breadcrumbs would be generated automatically based on current page
        />
      )
    
    case 'productHero':
      return (
        <ProductHero
          heading={data.heading}
          subheading={data.subheading}
          ctaButton={data.ctaButton}
          productImage={data.productImage}
          features={data.features?.map((f: any) => ({
            icon: iconMap[f.icon as keyof typeof iconMap] || Zap,
            title: f.title,
            description: f.description,
          })) || []}
        />
      )
    
    default:
      return null
  }
}

// collections/Pages.ts - Updated to include hero blocks
import { CollectionConfig } from 'payload/types'
import { HeroBlocks } from './blocks/HeroBlocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      admin: {
        description: 'SEO title (max 60 characters)',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        description: 'SEO description (max 160 characters)',
      },
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [
        ...HeroBlocks,
        // Other content blocks would go here
        {
          slug: 'richText',
          fields: [
            {
              name: 'content',
              type: 'richText',
            },
          ],
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}