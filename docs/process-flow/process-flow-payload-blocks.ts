// collections/blocks/ProcessFlowBlocks.ts - PayloadCMS block definitions
import { Block } from 'payload/types'

// Icon options for process flows
const processIconOptions = [
  { label: 'Connect (Link)', value: 'link' },
  { label: 'Setup (Settings)', value: 'settings' },
  { label: 'Upload (File)', value: 'file-text' },
  { label: 'Analytics (Bar Chart)', value: 'bar-chart' },
  { label: 'Revenue (Dollar Sign)', value: 'dollar-sign' },
  { label: 'Download (Export)', value: 'download' },
  { label: 'Music Note', value: 'music' },
  { label: 'Insights (Eye)', value: 'eye' },
  { label: 'Growth (Trending Up)', value: 'trending-up' },
  { label: 'Users (People)', value: 'users' },
  { label: 'Security (Shield)', value: 'shield' },
  { label: 'Global (Globe)', value: 'globe' },
  { label: 'Play', value: 'play' },
  { label: 'Success (Check Circle)', value: 'check-circle' },
  { label: 'Time (Clock)', value: 'clock' },
  { label: 'Lightning (Zap)', value: 'zap' },
]

// Status options
const statusOptions = [
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Current', value: 'current' },
  { label: 'Completed', value: 'completed' },
]

// Common step fields
const stepFields = [
  {
    name: 'icon',
    type: 'select',
    options: processIconOptions,
    admin: {
      description: 'Choose an icon that represents this step',
    },
  },
  {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'Clear, action-oriented step title',
    },
  },
  {
    name: 'description',
    type: 'textarea',
    required: true,
    admin: {
      description: 'Explain what happens in this step',
    },
  },
  {
    name: 'duration',
    type: 'text',
    admin: {
      description: 'Time estimate (e.g., "2 minutes", "Instant", "24 hours")',
    },
  },
  {
    name: 'badge',
    type: 'text',
    admin: {
      description: 'Optional badge (e.g., "New", "Automated", "Instant")',
    },
  },
  {
    name: 'status',
    type: 'select',
    options: statusOptions,
    admin: {
      description: 'Visual status indicator for the step',
    },
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    admin: {
      description: 'Optional screenshot or illustration for this step',
    },
  },
  {
    name: 'cta',
    type: 'group',
    label: 'Call to Action',
    fields: [
      {
        name: 'text',
        type: 'text',
        admin: {
          description: 'CTA button text (e.g., "Try it now", "Learn more")',
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
] as const

// Horizontal Process Flow Block
export const HorizontalProcessFlowBlock: Block = {
  slug: 'horizontalProcessFlow',
  labels: {
    singular: 'Horizontal Process Flow',
    plural: 'Horizontal Process Flows',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Main section heading',
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
      name: 'variant',
      type: 'select',
      options: [
        { label: 'Default (Simple)', value: 'default' },
        { label: 'Cards (Full Cards)', value: 'cards' },
        { label: 'Minimal (Text Only)', value: 'minimal' },
      ],
      defaultValue: 'cards',
      admin: {
        description: 'Visual style of the process steps',
      },
    },
    {
      name: 'showConnectors',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show connecting arrows between steps',
      },
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 2,
      maxRows: 6,
      fields: stepFields,
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
    preview: (doc) => `Horizontal Flow: ${doc.steps?.length || 0} steps`,
  },
}

// Vertical Timeline Block
export const VerticalTimelineBlock: Block = {
  slug: 'verticalTimeline',
  labels: {
    singular: 'Vertical Timeline',
    plural: 'Vertical Timelines',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Main section heading',
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
      name: 'variant',
      type: 'select',
      options: [
        { label: 'Left Aligned', value: 'left' },
        { label: 'Center (Alternating)', value: 'alternating' },
        { label: 'Center Aligned', value: 'center' },
      ],
      defaultValue: 'left',
      admin: {
        description: 'Timeline layout style',
      },
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 3,
      maxRows: 8,
      fields: stepFields,
    },
  ],
  admin: {
    preview: (doc) => `Timeline: ${doc.steps?.length || 0} steps`,
  },
}

// Interactive Process Flow Block
export const InteractiveProcessFlowBlock: Block = {
  slug: 'interactiveProcessFlow',
  labels: {
    singular: 'Interactive Process Flow',
    plural: 'Interactive Process Flows',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Main section heading',
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
      name: 'autoPlay',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Automatically cycle through steps',
      },
    },
    {
      name: 'autoPlayInterval',
      type: 'number',
      defaultValue: 3000,
      admin: {
        description: 'Milliseconds between auto-transitions (3000 = 3 seconds)',
        condition: (data, siblingData) => siblingData?.autoPlay,
      },
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 3,
      maxRows: 6,
      admin: {
        description: 'Steps that users can click through interactively',
      },
      fields: [
        ...stepFields,
        {
          name: 'detailedDescription',
          type: 'richText',
          admin: {
            description: 'More detailed content shown in the interactive panel',
          },
        },
      ],
    },
  ],
  admin: {
    preview: (doc) => `Interactive Flow: ${doc.steps?.length || 0} steps`,
  },
}

// Process Bento Grid Block
export const ProcessBentoGridBlock: Block = {
  slug: 'processBentoGrid',
  labels: {
    singular: 'Process Bento Grid',
    plural: 'Process Bento Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Main section heading',
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
      name: 'steps',
      type: 'array',
      minRows: 4,
      maxRows: 8,
      admin: {
        description: 'Process steps with different sizes for visual hierarchy',
      },
      fields: [
        {
          name: 'size',
          type: 'select',
          options: [
            { label: 'Small (1x1)', value: 'small' },
            { label: 'Medium (2x1)', value: 'medium' },
            { label: 'Large (3x2) - Hero Step', value: 'large' },
            { label: 'Wide (4x1)', value: 'wide' },
          ],
          required: true,
          admin: {
            description: 'Size determines visual importance and grid placement',
          },
        },
        ...stepFields,
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
      ],
    },
  ],
  admin: {
    preview: (doc) => `Bento Process: ${doc.steps?.length || 0} steps`,
  },
}

// Process Funnel Block (bonus component)
export const ProcessFunnelBlock: Block = {
  slug: 'processFunnel',
  labels: {
    singular: 'Process Funnel',
    plural: 'Process Funnels',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Main section heading',
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
      name: 'stages',
      type: 'array',
      minRows: 3,
      maxRows: 5,
      admin: {
        description: 'Funnel stages from top (widest) to bottom (narrowest)',
      },
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
          name: 'metric',
          type: 'text',
          admin: {
            description: 'Optional metric (e.g., "10,000 artists", "95% success rate")',
          },
        },
        {
          name: 'color',
          type: 'select',
          options: [
            { label: 'Royal Blue', value: 'royal' },
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
            { label: 'Purple', value: 'purple' },
            { label: 'Gray', value: 'gray' },
          ],
          defaultValue: 'royal',
        },
      ],
    },
  ],
  admin: {
    preview: (doc) => `Funnel: ${doc.stages?.length || 0} stages`,
  },
}

// Block registry
export const ProcessFlowBlocks = [
  HorizontalProcessFlowBlock,
  VerticalTimelineBlock,
  InteractiveProcessFlowBlock,
  ProcessBentoGridBlock,
  ProcessFunnelBlock,
]

// components/blocks/ProcessFlowRenderer.tsx - Universal renderer
import { HorizontalProcessFlow } from '@/components/process/HorizontalProcessFlow'
import { VerticalTimeline } from '@/components/process/VerticalTimeline'
import { InteractiveProcessFlow } from '@/components/process/InteractiveProcessFlow'
import { ProcessBentoGrid } from '@/components/process/ProcessBentoGrid'
import { ProcessFunnel } from '@/components/process/ProcessFunnel'

interface ProcessFlowBlockData {
  blockType: 'horizontalProcessFlow' | 'verticalTimeline' | 'interactiveProcessFlow' | 'processBentoGrid' | 'processFunnel'
  [key: string]: any
}

export function ProcessFlowRenderer({ blockType, ...data }: ProcessFlowBlockData) {
  const backgroundClasses = {
    white: '',
    gray: 'bg-gray-50',
    brand: 'bg-gradient-to-br from-royal-50/30 to-white',
  }

  switch (blockType) {
    case 'horizontalProcessFlow':
      return (
        <HorizontalProcessFlow
          title={data.title}
          subtitle={data.subtitle}
          steps={data.steps || []}
          variant={data.variant}
          showConnectors={data.showConnectors}
          className={backgroundClasses[data.backgroundColor as keyof typeof backgroundClasses]}
        />
      )
    
    case 'verticalTimeline':
      return (
        <VerticalTimeline
          title={data.title}
          subtitle={data.subtitle}
          steps={data.steps || []}
          variant={data.variant}
        />
      )
    
    case 'interactiveProcessFlow':
      return (
        <InteractiveProcessFlow
          title={data.title}
          subtitle={data.subtitle}
          steps={data.steps || []}
          autoPlay={data.autoPlay}
          autoPlayInterval={data.autoPlayInterval}
        />
      )
    
    case 'processBentoGrid':
      return (
        <ProcessBentoGrid
          title={data.title}
          subtitle={data.subtitle}
          steps={data.steps || []}
        />
      )
    
    case 'processFunnel':
      return (
        <ProcessFunnel
          title={data.title}
          subtitle={data.subtitle}
          stages={data.stages || []}
        />
      )
    
    default:
      return null
  }
}

// Example usage in Pages collection
// collections/Pages.ts - Add process flow blocks
import { CollectionConfig } from 'payload/types'
import { HeroBlocks } from './blocks/HeroBlocks'
import { FeatureGridBlocks } from './blocks/FeatureGridBlocks'
import { ProcessFlowBlocks } from './blocks/ProcessFlowBlocks'

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
        ...ProcessFlowBlocks,
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