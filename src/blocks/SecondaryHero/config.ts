import type { Block } from 'payload'

export const SecondaryHero: Block = {
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
  interfaceName: 'SecondaryHeroBlock',
}
