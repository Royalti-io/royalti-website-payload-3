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
    {
      name: 'breadcrumbs',
      type: 'array',
      label: 'Custom Breadcrumbs',
      admin: {
        description: 'Optional custom breadcrumbs (if automatic breadcrumbs are not suitable)',
        condition: (_, siblingData) => siblingData?.showBreadcrumbs,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
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
      required: true,
      admin: {
        description: 'Product showcase image',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Key Features',
      admin: {
        description: 'Product features with checkmarks',
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
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

// Type definition for hero block data
export interface HeroBlockData {
  blockType: 'mainHero' | 'secondaryHero' | 'productHero',
  [key: string]: any,
}
