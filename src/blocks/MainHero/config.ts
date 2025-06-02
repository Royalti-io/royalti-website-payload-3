import type { Block } from 'payload'

export const MainHero: Block = {
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
  interfaceName: 'MainHeroBlock',
}
