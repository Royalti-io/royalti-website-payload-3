// scripts/seed-process-content.js - Sample content for Royalti.io
import payload from 'payload'

const seedProcessContent = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    local: true,
  })

  // How It Works Page - Interactive Process Flow
  const howItWorksPage = await payload.create({
    collection: 'pages',
    data: {
      title: 'How Royalti.io Works',
      slug: 'how-it-works',
      metaTitle: 'How Royalti.io Works - Simple Music Royalty Management',
      metaDescription: 'Learn how our platform simplifies music royalty tracking in 4 easy steps. From setup to revenue optimization.',
      content: [
        {
          blockType: 'secondaryHero',
          heading: 'From Setup to Success in 4 Simple Steps',
          subheading: 'Discover how thousands of artists, labels, and publishers use Royalti.io to take control of their music revenue.',
          backgroundPattern: 'dots',
        },
        {
          blockType: 'interactiveProcessFlow',
          title: 'Your Journey to Better Royalty Management',
          subtitle: 'Click through each step to see how our platform transforms your music business.',
          autoPlay: false,
          steps: [
            {
              icon: 'settings',
              title: 'Connect Your Platforms',
              description: 'Link your streaming platforms, distributors, and collection societies in minutes.',
              duration: '5 minutes',
              badge: 'Easy Setup',
              image: {
                url: '/images/connect-platforms.jpg',
                alt: 'Platform connection interface'
              },
              cta: {
                text: 'Start Connecting',
                url: '/signup'
              }
            },
            {
              icon: 'music',
              title: 'Import Your Catalog',
              description: 'We automatically import your entire music catalog and match it across all platforms.',
              duration: '24 hours',
              badge: 'Automated',
              image: {
                url: '/images/catalog-import.jpg',
                alt: 'Music catalog dashboard'
              },
              cta: {
                text: 'See Demo',
                url: '/demo'
              }
            },
            {
              icon: 'bar-chart',
              title: 'Track Your Revenue',
              description: 'Watch real-time data flow in as we sync your earnings from every platform and territory.',
              duration: 'Real-time',
              badge: 'Live Data',
              image: {
                url: '/images/revenue-tracking.jpg',
                alt: 'Revenue analytics dashboard'
              },
              cta: {
                text: 'View Analytics',
                url: '/analytics'
              }
            },
            {
              icon: 'trending-up',
              title: 'Optimize & Grow',
              description: 'Use our insights to identify opportunities and maximize your music revenue.',
              duration: 'Ongoing',
              badge: 'AI-Powered',
              image: {
                url: '/images/revenue-optimization.jpg',
                alt: 'Growth insights dashboard'
              },
              cta: {
                text: 'Explore Insights',
                url: '/insights'
              }
            }
          ]
        }
      ],
      status: 'published',
    },
  })

  // Onboarding Process Page - Horizontal Flow
  const onboardingPage = await payload.create({
    collection: 'pages',
    data: {
      title: 'Get Started with Royalti.io',
      slug: 'get-started',
      metaTitle: 'Get Started - Royalti.io Onboarding Guide',
      metaDescription: 'Quick start guide to set up your Royalti.io account and begin tracking music royalties in minutes.',
      content: [
        {
          blockType: 'secondaryHero',
          heading: 'Welcome to Royalti.io',
          subheading: 'Get up and running with complete royalty tracking in under 10 minutes.',
          backgroundPattern: 'grid',
        },
        {
          blockType: 'horizontalProcessFlow',
          title: 'Quick Start Guide',
          subtitle: 'Follow these steps to begin tracking your music revenue today.',
          variant: 'cards',
          showConnectors: true,
          backgroundColor: 'white',
          steps: [
            {
              icon: 'users',
              title: 'Create Your Account',
              description: 'Sign up with your email and tell us about your music business.',
              duration: '2 minutes',
              badge: 'Free',
              cta: {
                text: 'Sign Up Now',
                url: '/signup'
              }
            },
            {
              icon: 'link',
              title: 'Connect Platforms',
              description: 'Link your Spotify for Artists, Apple Music for Artists, and distributor accounts.',
              duration: '3 minutes',
              badge: 'Secure',
              cta: {
                text: 'Add Platforms',
                url: '/integrations'
              }
            },
            {
              icon: 'eye',
              title: 'Verify Your Data',
              description: 'Review your imported catalog and earnings data to ensure everything looks correct.',
              duration: '5 minutes',
              cta: {
                text: 'Check Data',
                url: '/dashboard'
              }
            },
            {
              icon: 'check-circle',
              title: 'Start Tracking',
              description: 'You\'re all set! Watch your revenue data update in real-time from now on.',
              duration: 'Instant',
              badge: 'Complete',
              status: 'completed'
            }
          ]
        },
        {
          blockType: 'verticalTimeline',
          title: 'Your First 30 Days',
          subtitle: 'Here\'s what to expect as you get familiar with the platform.',
          variant: 'left',
          steps: [
            {
              icon: 'play',
              title: 'Week 1: Explore Your Dashboard',
              description: 'Get familiar with your revenue analytics, top-performing tracks, and platform breakdowns.',
              duration: 'Daily check-ins',
              status: 'current'
            },
            {
              icon: 'bar-chart',
              title: 'Week 2: Set Up Reports',
              description: 'Configure automated monthly reports for your team, manager, or accountant.',
              duration: '15 minutes setup',
              status: 'upcoming'
            },
            {
              icon: 'trending-up',
              title: 'Week 3: Discover Insights',
              description: 'Use our analytics to identify your best-performing territories and demographic insights.',
              duration: 'Ongoing analysis',
              status: 'upcoming'
            },
            {
              icon: 'dollar-sign',
              title: 'Week 4: Optimize Revenue',
              description: 'Apply insights to your release strategy and promotional efforts for maximum impact.',
              duration: 'Strategic planning',
              status: 'upcoming'
            }
          ]
        }
      ],
      status: 'published',
    },
  })

  // Revenue Tracking Process - Bento Grid
  const revenueProcessPage = await payload.create({
    collection: 'pages',
    data: {
      title: 'Revenue Tracking Process',
      slug: 'revenue-tracking',
      metaTitle: 'Revenue Tracking - How Royalti.io Collects Your Data',
      metaDescription: 'Understand how our platform collects, processes, and analyzes your music revenue data.',
      content: [
        {
          blockType: 'secondaryHero',
          heading: 'Behind the Scenes: How We Track Your Revenue',
          subheading: 'Discover the technology and processes that ensure accurate, real-time royalty tracking.',
          backgroundPattern: 'dots',
        },
        {
          blockType: 'processBentoGrid',
          title: 'Our Revenue Tracking System',
          subtitle: 'From data collection to insights, here\'s how we ensure you never miss a dollar.',
          steps: [
            {
              size: 'large',
              icon: 'globe',
              title: 'Global Data Collection',
              description: 'Our system connects to over 150 platforms worldwide, collecting your streaming, download, and licensing data every 24 hours. We use secure APIs and direct integrations to ensure complete accuracy.',
              duration: 'Every 24 hours',
              badge: 'Automated',
              backgroundGradient: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
              cta: {
                text: 'See All Platforms',
                url: '/integrations'
              }
            },
            {
              size: 'medium',
              icon: 'music',
              title: 'Catalog Matching',
              description: 'Advanced algorithms match your tracks across all platforms, handling variations in titles, artists, and metadata.',
              duration: 'Real-time',
              badge: 'AI-Powered'
            },
            {
              size: 'small',
              icon: 'shield',
              title: 'Data Validation',
              description: 'Multi-layer verification ensures 99.9% accuracy.',
              backgroundGradient: 'linear-gradient(135deg, #006666 0%, #008080 100%)'
            },
            {
              size: 'wide',
              icon: 'bar-chart',
              title: 'Processing & Analysis',
              description: 'Raw data is processed, normalized, and enriched with territorial, demographic, and performance insights.',
              duration: '< 2 minutes',
              backgroundGradient: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)'
            },
            {
              size: 'medium',
              icon: 'eye',
              title: 'Real-Time Updates',
              description: 'Your dashboard updates continuously as new data arrives, giving you the freshest insights possible.',
              badge: 'Live Data',
              cta: {
                text: 'View Dashboard',
                url: '/dashboard'
              }
            },
            {
              size: 'small',
              icon: 'download',
              title: 'Export Ready',
              description: 'Download reports in any format you need.'
            }
          ]
        }
      ],
      status: 'published',
    },
  })

  console.log('✅ Process flow content seeded successfully!')
  console.log(`How It Works page: ${howItWorksPage.id}`)
  console.log(`Onboarding page: ${onboardingPage.id}`)
  console.log(`Revenue Tracking page: ${revenueProcessPage.id}`)
}

export default seedProcessContent
