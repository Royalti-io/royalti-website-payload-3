// collections/blocks/CTABlocks.ts - PayloadCMS CTA block definitions
import { Block } from 'payload/types'

// CTA intent options
const ctaIntentOptions = [
  { label: 'Start Free Trial', value: 'trial' },
  { label: 'Watch Demo', value: 'demo' },
  { label: 'Contact Sales', value: 'contact' },
  { label: 'Learn More', value: 'learn' },
  { label: 'Subscribe to Updates', value: 'subscribe' },
  { label: 'Upgrade Plan', value: 'upgrade' },
]

// Audience targeting options
const audienceOptions = [
  { label: 'Independent Artists', value: 'artist' },
  { label: 'Record Labels', value: 'label' },
  { label: 'Music Publishers', value: 'publisher' },
  { label: 'Enterprise', value: 'enterprise' },
]

// Urgency level options
const urgencyOptions = [
  { label: 'Low (Standard)', value: 'low' },
  { label: 'Medium (Popular)', value: 'medium' },
  { label: 'High (Limited Time)', value: 'high' },
]

// Smart CTA Block
export const SmartCTABlock: Block = {
  slug: 'smartCTA',
  labels: {
    singular: 'Smart CTA',
    plural: 'Smart CTAs',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      options: [
        { label: 'Primary (Bold)', value: 'primary' },
        { label: 'Secondary (Outline)', value: 'secondary' },
        { label: 'Soft (Gentle)', value: 'soft' },
        { label: 'Urgent (High Impact)', value: 'urgent' },
        { label: 'Social Proof', value: 'social-proof' },
      ],
      required: true,
      defaultValue: 'primary',
    },
    {
      name: 'size',
      type: 'select',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
      defaultValue: 'lg',
    },
    {
      name: 'intent',
      type: 'select',
      options: ctaIntentOptions,
      required: true,
      admin: {
        description: 'The primary goal of this CTA',
      },
    },
    {
      name: 'audience',
      type: 'select',
      options: audienceOptions,
      admin: {
        description: 'Target audience for messaging customization',
      },
    },
    {
      name: 'urgency',
      type: 'select',
      options: urgencyOptions,
      defaultValue: 'medium',
      admin: {
        description: 'Urgency level affects styling and messaging',
      },
    },
    {
      name: 'customText',
      type: 'text',
      admin: {
        description: 'Override default text for this CTA (optional)',
      },
    },
    {
      name: 'customUrl',
      type: 'text',
      admin: {
        description: 'Custom URL (optional, defaults based on intent)',
      },
    },
    {
      name: 'socialProof',
      type: 'group',
      admin: {
        condition: (data, siblingData) => siblingData?.variant === 'social-proof',
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'User Count', value: 'users' },
            { label: 'Revenue Tracked', value: 'revenue' },
            { label: 'Rating/Reviews', value: 'rating' },
            { label: 'Customer Testimonial', value: 'testimonial' },
          ],
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g., "10,000+", "4.9/5", "$50M+"',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g., "artists trust us", "revenue tracked"',
          },
        },
      ],
    },
    {
      name: 'freeTrialLength',
      type: 'number',
      defaultValue: 14,
      admin: {
        condition: (data, siblingData) => siblingData?.intent === 'trial',
        description: 'Number of days for free trial',
      },
    },
  ],
  admin: {
    preview: (doc) => `${doc.variant} CTA: ${doc.intent} (${doc.audience || 'all'})`,
  },
}

// CTA Section Block
export const CTASectionBlock: Block = {
  slug: 'ctaSection',
  labels: {
    singular: 'CTA Section',
    plural: 'CTA Sections',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      options: [
        { label: 'Hero CTA', value: 'hero' },
        { label: 'Feature-Focused', value: 'feature-focused' },
        { label: 'Objection Handling', value: 'objection-handling' },
        { label: 'Urgency-Driven', value: 'urgency' },
        { label: 'Newsletter Signup', value: 'newsletter' },
      ],
      required: true,
      defaultValue: 'hero',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Main headline for the CTA section',
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
      label: 'Key Features',
      maxRows: 5,
      admin: {
        condition: (data, siblingData) => siblingData?.variant === 'feature-focused',
        description: 'Key features to highlight above CTAs',
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
      name: 'objections',
      type: 'array',
      label: 'Common Objections',
      maxRows: 4,
      admin: {
        condition: (data, siblingData) => siblingData?.variant === 'objection-handling',
        description: 'Address common concerns before CTA',
      },
      fields: [
        {
          name: 'concern',
          type: 'text',
          required: true,
          admin: {
            description: 'Common customer concern or objection',
          },
        },
        {
          name: 'solution',
          type: 'textarea',
          required: true,
          admin: {
            description: 'How you address this concern',
          },
        },
      ],
    },
    {
      name: 'primaryCTA',
      type: 'group',
      label: 'Primary CTA',
      fields: [
        {
          name: 'intent',
          type: 'select',
          options: ctaIntentOptions,
          required: true,
        },
        {
          name: 'audience',
          type: 'select',
          options: audienceOptions,
        },
        {
          name: 'customText',
          type: 'text',
        },
        {
          name: 'customUrl',
          type: 'text',
        },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      label: 'Secondary CTA (Optional)',
      fields: [
        {
          name: 'intent',
          type: 'select',
          options: ctaIntentOptions,
        },
        {
          name: 'audience',
          type: 'select',
          options: audienceOptions,
        },
        {
          name: 'customText',
          type: 'text',
        },
        {
          name: 'customUrl',
          type: 'text',
        },
      ],
    },
    {
      name: 'socialProof',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'User Count', value: 'users' },
            { label: 'Revenue Tracked', value: 'revenue' },
            { label: 'Rating/Reviews', value: 'rating' },
          ],
        },
        {
          name: 'value',
          type: 'text',
        },
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Gray', value: 'gray' },
        { label: 'Brand Gradient', value: 'brand' },
        { label: 'Urgent (Orange)', value: 'urgent' },
      ],
      defaultValue: 'brand',
    },
  ],
  admin: {
    preview: (doc) => `${doc.variant} Section: ${doc.title}`,
  },
}

// A/B Test Block
export const ABTestBlock: Block = {
  slug: 'abTest',
  labels: {
    singular: 'A/B Test',
    plural: 'A/B Tests',
  },
  fields: [
    {
      name: 'testName',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique identifier for this test (e.g., "homepage-hero-cta")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'What are you testing and why?',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Running', value: 'running' },
        { label: 'Paused', value: 'paused' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'draft',
    },
    {
      name: 'variants',
      type: 'array',
      minRows: 2,
      maxRows: 4,
      admin: {
        description: 'Different versions to test',
      },
      fields: [
        {
          name: 'variantId',
          type: 'text',
          required: true,
          admin: {
            description: 'Unique ID (e.g., "control", "variant-a")',
          },
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Human-readable name',
          },
        },
        {
          name: 'trafficPercentage',
          type: 'number',
          min: 0,
          max: 100,
          defaultValue: 50,
          admin: {
            description: 'Percentage of traffic to show this variant',
          },
        },
        {
          name: 'content',
          type: 'blocks',
          blocks: [
            SmartCTABlock,
            CTASectionBlock,
          ],
          admin: {
            description: 'Content to show for this variant',
          },
        },
      ],
    },
    {
      name: 'primaryMetric',
      type: 'select',
      options: [
        { label: 'Trial Signups', value: 'trial_signup' },
        { label: 'Demo Requests', value: 'demo_request' },
        { label: 'Contact Form Submissions', value: 'contact_form' },
        { label: 'Newsletter Signups', value: 'newsletter_signup' },
        { label: 'Button Clicks', value: 'button_click' },
        { label: 'Page Views', value: 'page_view' },
      ],
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        description: 'When to start the test',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        description: 'When to end the test (optional)',
      },
    },
  ],
  admin: {
    preview: (doc) => `A/B Test: ${doc.testName} (${doc.status})`,
  },
}

// Block registry
export const CTABlocks = [
  SmartCTABlock,
  CTASectionBlock,
  ABTestBlock,
]

// components/blocks/CTARenderer.tsx - Universal CTA renderer
import { SmartCTA } from '@/components/cta/SmartCTA'
import { CTASection } from '@/components/cta/CTASection'
import { ABTestRenderer } from '@/components/cta/ABTestRenderer'

interface CTABlockData {
  blockType: 'smartCTA' | 'ctaSection' | 'abTest'
  [key: string]: any
}

export function CTARenderer({ blockType, ...data }: CTABlockData) {
  switch (blockType) {
    case 'smartCTA':
      return (
        <div className="flex justify-center py-8">
          <SmartCTA
            variant={data.variant}
            size={data.size}
            intent={data.intent}
            audience={data.audience}
            urgency={data.urgency}
            socialProof={data.socialProof}
            freeTrialLength={data.freeTrialLength}
          />
        </div>
      )
    
    case 'ctaSection':
      return (
        <CTASection
          variant={data.variant}
          title={data.title}
          subtitle={data.subtitle}
          features={data.features?.map((f: any) => f.feature) || []}
          objections={data.objections || []}
          primaryCTA={data.primaryCTA}
          secondaryCTA={data.secondaryCTA}
          socialProof={data.socialProof}
          className={
            data.backgroundColor === 'urgent' ? 'bg-gradient-to-r from-orange-50 to-red-50' :
            data.backgroundColor === 'brand' ? 'bg-gradient-to-br from-royal-50 to-white' :
            data.backgroundColor === 'gray' ? 'bg-gray-50' : ''
          }
        />
      )
    
    case 'abTest':
      return (
        <ABTestRenderer
          testName={data.testName}
          variants={data.variants || []}
          status={data.status}
        />
      )
    
    default:
      return null
  }
}

// scripts/seed-conversion-content.js - Sample content with conversion optimization
import payload from 'payload'

const seedConversionContent = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    local: true,
  })

  // Homepage with optimized CTAs
  const homepageUpdate = await payload.update({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    data: {
      content: [
        // Existing hero...
        {
          blockType: 'mainHero',
          announcement: '🎵 New Analytics Dashboard Launched!',
          heading: 'Track Every Dollar of Your Music Revenue',
          subheading: 'Join 10,000+ artists using our platform to discover hidden revenue, optimize earnings, and never miss a royalty payment again.',
          ctaButton: {
            text: 'Start Free 14-Day Trial',
            url: '/signup',
          },
          secondaryButton: {
            text: 'Watch 3-Min Demo',
            url: '/demo',
          },
          features: [
            { feature: 'Setup in 5 minutes' },
            { feature: 'No credit card required' },
            { feature: 'Cancel anytime' },
            { feature: '99.9% data accuracy guarantee' },
          ],
          statistics: [
            { value: '10,000+', label: 'Active Artists' },
            { value: '$50M+', label: 'Revenue Tracked' },
            { value: '99.9%', label: 'Uptime' },
            { value: '15%', label: 'Avg Revenue Increase' },
          ],
        },
        // Add conversion-optimized CTA section
        {
          blockType: 'ctaSection',
          variant: 'objection-handling',
          title: 'Still Not Sure? We Get It.',
          subtitle: 'These are the most common concerns we hear from artists before they join Royalti.io.',
          objections: [
            {
              concern: 'What if it\'s too complicated to set up?',
              solution: 'Our 5-minute setup wizard guides you through every step. Plus, our support team offers free onboarding calls to get you started.'
            },
            {
              concern: 'I already track my royalties in spreadsheets',
              solution: 'We can import your existing data and show you revenue streams you might be missing. Most users find 15-20% more revenue in their first month.'
            },
            {
              concern: 'What if I don\'t like it after signing up?',
              solution: 'Try it free for 14 days, no credit card required. If you\'re not completely satisfied, we\'ll help you export your data with no hassles.'
            },
            {
              concern: 'Is my financial data secure?',
              solution: 'We use bank-level encryption and are SOC 2 compliant. Your data is more secure with us than storing it locally or in regular cloud services.'
            }
          ],
          primaryCTA: {
            intent: 'trial',
            audience: 'artist'
          },
          socialProof: {
            type: 'users',
            value: '10,000+',
            label: 'artists trust us with their data'
          },
          backgroundColor: 'gray'
        },
        // Add urgency-driven CTA
        {
          blockType: 'ctaSection',
          variant: 'urgency',
          title: 'Don\'t Leave Money on the Table',
          subtitle: 'Every day you wait is money you might be missing. Start tracking all your revenue streams today.',
          features: [
            'Find hidden revenue streams',
            'Catch missing payments',
            'Optimize your earnings',
            'Professional reporting'
          ],
          primaryCTA: {
            intent: 'trial',
            audience: 'artist'
          },
          secondaryCTA: {
            intent: 'demo',
            audience: 'artist'
          },
          socialProof: {
            type: 'revenue',
            value: '$2.3M',
            label: 'in missing royalties found last month'
          },
          backgroundColor: 'urgent'
        }
      ]
    }
  })

  // Pricing page with conversion optimization
  const pricingPage = await payload.create({
    collection: 'pages',
    data: {
      title: 'Pricing - Royalti.io',
      slug: 'pricing-optimized',
      metaTitle: 'Royalti.io Pricing - ROI Calculator Included',
      metaDescription: 'See exactly how much you\'ll save and earn with Royalti.io. Free trial, no setup fees, cancel anytime.',
      content: [
        {
          blockType: 'secondaryHero',
          heading: 'Pricing That Pays for Itself',
          subheading: 'Most artists find 15% more revenue in their first month, easily covering their subscription cost.',
          backgroundPattern: 'dots',
        },
        // Pricing cards would go here...
        {
          blockType: 'ctaSection',
          variant: 'feature-focused',
          title: 'Every Plan Includes These Powerful Features',
          subtitle: 'No hidden fees, no setup costs, no long-term contracts. Just powerful royalty tracking that grows with you.',
          features: [
            'Real-time revenue tracking',
            'Unlimited platform connections',
            'Professional reporting',
            'Bank-level security',
            'Expert support',
            'Mobile app access'
          ],
          primaryCTA: {
            intent: 'trial',
            audience: 'artist'
          },
          socialProof: {
            type: 'rating',
            value: '4.9/5',
            label: 'average rating from 2,000+ reviews'
          },
          backgroundColor: 'brand'
        },
        // Add A/B test for pricing CTA
        {
          blockType: 'abTest',
          testName: 'pricing-page-final-cta',
          description: 'Testing different final CTA approaches on pricing page',
          status: 'running',
          primaryMetric: 'trial_signup',
          variants: [
            {
              variantId: 'control',
              name: 'Standard CTA',
              trafficPercentage: 50,
              content: [
                {
                  blockType: 'smartCTA',
                  variant: 'primary',
                  size: 'xl',
                  intent: 'trial',
                  audience: 'artist',
                  urgency: 'medium'
                }
              ]
            },
            {
              variantId: 'roi-focused',
              name: 'ROI-Focused CTA',
              trafficPercentage: 50,
              content: [
                {
                  blockType: 'ctaSection',
                  variant: 'hero',
                  title: 'See Your ROI in 30 Days or Less',
                  subtitle: 'The average artist finds $247 in missing revenue in their first month. Start your free trial and see what you\'re missing.',
                  primaryCTA: {
                    intent: 'trial',
                    audience: 'artist',
                    customText: 'Find My Missing Revenue'
                  },
                  socialProof: {
                    type: 'revenue',
                    value: '$247',
                    label: 'average additional revenue found monthly'
                  },
                  backgroundColor: 'brand'
                }
              ]
            }
          ]
        }
      ],
      status: 'published',
    },
  })

  // Demo page with progressive CTAs
  const demoPage = await payload.create({
    collection: 'pages',
    data: {
      title: 'Demo - See Royalti.io in Action',
      slug: 'demo',
      metaTitle: 'Royalti.io Demo - See Our Platform in Action',
      metaDescription: 'Watch a personalized demo of our music royalty tracking platform. See real data, real insights, real results.',
      content: [
        {
          blockType: 'secondaryHero',
          heading: 'See Exactly How It Works',
          subheading: 'Watch a real artist discover $1,200 in missing royalties using our platform.',
          backgroundPattern: 'grid',
        },
        // Demo video would go here...
        {
          blockType: 'ctaSection',
          variant: 'hero',
          title: 'Ready to Find Your Missing Revenue?',
          subtitle: 'Start your free trial now and see what you\'ve been missing. No credit card required.',
          features: [
            '5-minute setup',
            'Import your existing data',
            'Connect all platforms',
            'See results immediately'
          ],
          primaryCTA: {
            intent: 'trial',
            audience: 'artist',
            customText: 'Start My Free Trial'
          },
          secondaryCTA: {
            intent: 'contact',
            audience: 'artist',
            customText: 'Talk to Our Team'
          },
          socialProof: {
            type: 'users',
            value: '10,000+',
            label: 'artists have found missing revenue'
          },
          backgroundColor: 'brand'
        }
      ],
      status: 'published',
    },
  })

  console.log('✅ Conversion-optimized content seeded successfully!')
  console.log(`Homepage updated with CTAs`)
  console.log(`Pricing page: ${pricingPage.id}`)
  console.log(`Demo page: ${demoPage.id}`)
  
  process.exit(0)
}

seedConversionContent()

// lib/music-industry-conversion.ts - Industry-specific strategies
export const musicIndustryConversionStrategies = {
  // Pain points and solutions for each audience
  audiencePainPoints: {
    indie_artist: {
      painPoints: [
        'Missing royalty payments',
        'Complex royalty statements',
        'No time for admin work',
        'Uncertain about revenue sources',
        'Fear of leaving money on table'
      ],
      solutions: [
        'Automated tracking catches everything',
        'Simple, clear reporting',
        'Set-and-forget automation',
        'Complete revenue visibility',
        'Never miss a payment again'
      ],
      urgencyTriggers: [
        'Peak streaming season',
        'Tax season approaching',
        'New release upcoming',
        'Revenue discrepancies noticed'
      ]
    },
    growing_artist: {
      painPoints: [
        'Scaling administrative burden',
        'Need professional reporting',
        'Multiple revenue streams',
        'Team collaboration needs',
        'Label/manager reporting'
      ],
      solutions: [
        'Scales with your success',
        'Professional-grade reports',
        'All revenue in one place',
        'Team access and permissions',
        'Stakeholder reporting tools'
      ],
      urgencyTriggers: [
        'Major release campaign',
        'Label negotiations',
        'Manager/team onboarding',
        'Tour revenue tracking'
      ]
    },
    small_label: {
      painPoints: [
        'Multiple artist management',
        'Complex reporting needs',
        'Revenue attribution',
        'Stakeholder transparency',
        'Operational efficiency'
      ],
      solutions: [
        'Multi-artist dashboard',
        'Automated label reporting',
        'Clear revenue splits',
        'Transparent stakeholder access',
        'Streamlined operations'
      ],
      urgencyTriggers: [
        'Quarterly reporting',
        'Artist contract renewals',
        'Investor meetings',
        'Audit preparations'
      ]
    }
  },

  // Conversion copy variants by audience
  conversionCopy: {
    headlines: {
      artist: [
        'Track Every Dollar of Your Music Revenue',
        'Never Miss a Royalty Payment Again',
        'Find the Money You\'re Missing',
        'Professional Revenue Tracking for Artists'
      ],
      label: [
        'Complete Revenue Management for Labels',
        'Scale Your Label with Professional Tools',
        'The Label Management Platform',
        'Revenue Intelligence for Record Labels'
      ],
      publisher: [
        'Publisher-Grade Royalty Intelligence',
        'Complex Rights Made Simple',
        'The Complete Publishing Platform',
        'Maximize Your Catalog Revenue'
      ]
    },
    subheadings: {
      artist: [
        'Join 10,000+ artists who\'ve discovered hidden revenue streams with our automated tracking platform.',
        'Our platform automatically finds and tracks revenue from 150+ sources so you never miss a payment.',
        'Most artists find 15% more revenue in their first month. See what you\'ve been missing.'
      ],
      label: [
        'Manage multiple artists, complex deals, and stakeholder reporting in one powerful platform.',
        'From indie labels to major distributors, we provide the tools you need to scale efficiently.',
        'Trusted by 1,200+ labels worldwide for transparent, accurate revenue management.'
      ]
    },
    urgencyMessages: {
      artist: [
        'Every day you wait is money you might be missing',
        'Peak streaming season is here - don\'t miss out',
        'Your next royalty statement might have errors',
        'Other artists are already finding hidden revenue'
      ],
      label: [
        'Q4 reporting season is approaching',
        'Your competitors are already using better tools',
        'Artists are demanding more transparency',
        'Operational efficiency gives you competitive advantage'
      ]
    }
  },

  // Social proof by audience
  socialProof: {
    artist: {
      userCount: '10,000+ independent artists',
      revenue: '$50M+ tracked for artists',
      testimonial: 'Found $1,200 in missing royalties in my first month',
      rating: '4.9/5 stars from artists'
    },
    label: {
      userCount: '1,200+ record labels',
      revenue: '$250M+ managed for labels',
      testimonial: 'Reduced reporting time by 80%',
      rating: '4.8/5 stars from label executives'
    },
    publisher: {
      userCount: '300+ music publishers',
      revenue: '$100M+ in complex deals tracked',
      testimonial: 'Finally understand our sync revenue',
      rating: '4.9/5 stars from publishers'
    }
  },

  // Risk reversal tactics
  riskReversal: {
    artist: [
      '14-day free trial, no credit card required',
      'Cancel anytime, keep your data',
      'Money-back guarantee if not satisfied',
      'Free data migration from spreadsheets'
    ],
    label: [
      'Free white-glove onboarding',
      'Custom reporting setup included',
      'No long-term contracts',
      'Migration support from existing tools'
    ],
    publisher: [
      'Enterprise-grade security guaranteed',
      'Dedicated account manager included',
      'Custom integration support',
      'SLA-backed uptime guarantee'
    ]
  },

  // Seasonal/contextual triggers
  seasonalTriggers: {
    'q4-reporting': {
      message: 'Q4 reporting deadline approaching',
      urgency: 'high',
      audienceRelevance: ['label', 'publisher', 'enterprise']
    },
    'tax-season': {
      message: 'Get organized for tax season',
      urgency: 'medium',
      audienceRelevance: ['artist', 'label', 'publisher']
    },
    'streaming-peak': {
      message: 'Peak streaming season - track every stream',
      urgency: 'medium',
      audienceRelevance: ['artist', 'label']
    },
    'new-year': {
      message: 'Start the year with better tracking',
      urgency: 'low',
      audienceRelevance: ['artist', 'label', 'publisher']
    }
  }
}