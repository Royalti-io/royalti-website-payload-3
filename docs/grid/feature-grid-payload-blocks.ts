// collections/blocks/FeatureGridBlocks.ts - PayloadCMS block definitions
import { Block } from 'payload/types'

// Icon options for all feature grids
const iconOptions = [
  { label: 'Analytics (Bar Chart)', value: 'bar-chart' },
  { label: 'Music Note', value: 'music' },
  { label: 'Revenue (Dollar Sign)', value: 'dollar-sign' },
  { label: 'Insights (Eye)', value: 'eye' },
  { label: 'Lightning (Zap)', value: 'zap' },
  { label: 'Security (Shield)', value: 'shield' },
  { label: 'Growth (Trending Up)', value: 'trending-up' },
  { label: 'Users (People)', value: 'users' },
  { label: 'Global (Globe)', value: 'globe' },
  { label: 'Time (Clock)', value: 'clock' },
  { label: 'Quality (Star)', value: 'star' },
  { label: 'Favorite (Heart)', value: 'heart' },
  { label: 'Success (Check Circle)', value: 'check-circle' },
  { label: 'Settings (Gear)', value: 'settings' },
]

// Classic Feature Grid Block
export const ClassicFeatureGridBlock: Block = {
  slug: 'classicFeatureGrid',
  labels: {
    singular: 'Classic Feature Grid',
    plural: 'Classic Feature Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Main section heading (optional)',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: {
        description: 'Supporting text below the title',
      },
    },
    {
      name: 'columns',
      type: 'select',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      defaultValue: '3',
      admin: {
        description: 'Number of columns on large screens',
      },
    },
    {
      name: 'variant',
      type: 'select',
      options: [
        { label: 'Default (Icon + Text)', value: 'default' },
        { label: 'Minimal (Text Only)', value: 'minimal' },
        { label: 'Cards (Full Cards)', value: 'cards' },
      ],
      defaultValue: 'default',
    },
    {
      name: 'features',
      type: 'array',
      minRows: 2,
      maxRows: 12,
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: iconOptions,
          admin: {
            description: 'Choose an icon for this feature',
          },
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
          admin: {
            description: 'Keep descriptions concise for better readability',
          },
        },
        {
          name: 'badge',
          type: 'text',
          admin: {
            description: 'Optional badge text (e.g., "New", "Popular")',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional feature image (works best with Cards variant)',
          },
        },
        {
          name: 'link',
          type: 'group',
          label: 'Optional Link',
          fields: [
            {
              name: 'text',
              type: 'text',
              admin: {
                description: 'Link text (e.g., "Learn more")',
              },
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                description: 'Link URL',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Gray', value: 'gray' },
        { label: 'Brand Light', value: 'brand' },
      ],
      defaultValue: 'white',
    },
  ],
  admin: {
    preview: (doc) => `Classic Grid: ${doc.features?.length || 0} features`,
  },
}

// Bento Feature Grid Block
export const BentoFeatureGridBlock: Block = {
  slug: 'bentoFeatureGrid',
  labels: {
    singular: 'Bento Feature Grid',
    plural: 'Bento Feature Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Main section heading (optional)',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: {
        description: 'Supporting text below the title',
      },
    },
    {
      name: 'features',
      type: 'array',
      minRows: 3,
      maxRows: 8,
      admin: {
        description: 'Features for the bento grid. Mix different sizes for best visual impact.',
      },
      fields: [
        {
          name: 'size',
          type: 'select',
          options: [
            { label: 'Small (1x1)', value: 'small' },
            { label: 'Medium (2x1)', value: 'medium' },
            { label: 'Large (3x2) - Hero Feature', value: 'large' },
            { label: 'Wide (4x1)', value: 'wide' },
            { label: 'Tall (2x2)', value: 'tall' },
          ],
          required: true,
          admin: {
            description: 'Size determines grid placement. Use 1 large feature as focal point.',
          },
        },
        {
          name: 'icon',
          type: 'select',
          options: iconOptions,
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
        {
          name: 'badge',
          type: 'text',
          admin: {
            description: 'Optional badge (e.g., "Featured", "New")',
          },
        },
        {
          name: 'featured',
          type: 'checkbox',
          admin: {
            description: 'Add special ring highlight to this feature',
          },
        },
        {
          name: 'backgroundGradient',
          type: 'select',
          options: [
            { label: 'None', value: '' },
            { label: 'Royal Blue', value: 'linear-gradient(135deg, #006666 0%, #008080 100%)' },
            { label: 'Soft Royal', value: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)' },
            { label: 'Warm Gray', value: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)' },
            { label: 'Royal to Light', value: 'linear-gradient(135deg, #006666 0%, #f0fdfa 100%)' },
          ],
          admin: {
            description: 'Optional background gradient for visual variety',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Background image (will be subtle overlay)',
          },
        },
        {
          name: 'stats',
          type: 'group',
          label: 'Statistics (Large size only)',
          admin: {
            description: 'Show a key statistic in large cards',
            condition: (data, siblingData) => siblingData?.size === 'large',
          },
          fields: [
            {
              name: 'value',
              type: 'text',
              admin: {
                description: 'e.g., "10,000+" or "99.9%"',
              },
            },
            {
              name: 'label',
              type: 'text',
              admin: {
                description: 'e.g., "Active Users" or "Uptime"',
              },
            },
          ],
        },
        {
          name: 'link',
          type: 'group',
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
      ],
    },
  ],
  admin: {
    preview: (doc) => `Bento Grid: ${doc.features?.length || 0} features`,
  },
}

// Feature Showcase Block
export const FeatureShowcaseBlock: Block = {
  slug: 'featureShowcase',
  labels: {
    singular: 'Feature Showcase',
    plural: 'Feature Showcases',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'mainFeature',
      type: 'group',
      label: 'Main Feature (Left Side)',
      fields: [
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
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Main feature image/screenshot',
          },
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Statistics',
          maxRows: 4,
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: 'Supporting Features (Right Side)',
      minRows: 2,
      maxRows: 4,
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: iconOptions,
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
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional supporting image',
          },
        },
      ],
    },
  ],
  admin: {
    preview: (doc) => `Feature Showcase: ${doc.title}`,
  },
}

// Block registry
export const FeatureGridBlocks = [
  ClassicFeatureGridBlock,
  BentoFeatureGridBlock,
  FeatureShowcaseBlock,
]

// components/blocks/FeatureGridRenderer.tsx - Universal renderer
import { ClassicFeatureGrid } from '@/components/features/ClassicFeatureGrid'
import { BentoFeatureGrid } from '@/components/features/BentoFeatureGrid'
import { FeatureShowcase } from '@/components/features/FeatureShowcase'

interface FeatureGridBlockData {
  blockType: 'classicFeatureGrid' | 'bentoFeatureGrid' | 'featureShowcase'
  [key: string]: any
}

export function FeatureGridRenderer({ blockType, ...data }: FeatureGridBlockData) {
  const backgroundClasses = {
    white: '',
    gray: 'bg-gray-50',
    brand: 'bg-gradient-to-br from-royal-50/30 to-white',
  }

  switch (blockType) {
    case 'classicFeatureGrid':
      return (
        <ClassicFeatureGrid
          title={data.title}
          subtitle={data.subtitle}
          features={data.features || []}
          columns={parseInt(data.columns) as 2 | 3 | 4}
          variant={data.variant}
          className={backgroundClasses[data.backgroundColor as keyof typeof backgroundClasses]}
        />
      )
    
    case 'bentoFeatureGrid':
      return (
        <BentoFeatureGrid
          title={data.title}
          subtitle={data.subtitle}
          features={data.features || []}
        />
      )
    
    case 'featureShowcase':
      return (
        <FeatureShowcase
          title={data.title}
          subtitle={data.subtitle}
          mainFeature={data.mainFeature}
          features={data.features || []}
        />
      )
    
    default:
      return null
  }
}

// Example usage in Pages collection
// collections/Pages.ts - Add feature grid blocks
import { CollectionConfig } from 'payload/types'
import { HeroBlocks } from './blocks/HeroBlocks'
import { FeatureGridBlocks } from './blocks/FeatureGridBlocks'

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
        ...FeatureGridBlocks,
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