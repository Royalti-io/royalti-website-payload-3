# Hero Components System Usage Guide

This guide explains how to use the hero components system in your Royalti.io website.

## Available Components

The hero components system includes three main hero types:

1. **MainHero** - For homepage and high-impact landing pages
2. **SecondaryHero** - For inner pages with breadcrumbs and subtle backgrounds
3. **ProductHero** - For product/feature pages with image showcase

## Using Components in React

You can import and use the hero components directly in your React components:

```tsx
import { MainHero, SecondaryHero, ProductHero } from "@/components/heroes"

// Example usage
<MainHero 
  heading="Your Headline Here"
  subheading="Supporting text goes here"
  announcement="🎉 Special announcement"
  ctaButton={{
    text: "Get Started",
    url: "/signup",
  }}
  // ... other props
/>
```

## Using with PayloadCMS

The hero components are integrated with PayloadCMS as blocks that can be added to pages:

1. When editing a page in the admin panel, go to the "Hero Components" tab
2. Choose a hero type (Main, Secondary, or Product)
3. Fill in the required fields
4. Save the page

The appropriate hero will be rendered automatically on the frontend using the `HeroBlockRenderer` component.

## Component Props

### MainHero

| Prop | Type | Description |
|------|------|-------------|
| heading | string | Main headline (required) |
| subheading | string | Supporting text below headline |
| announcement | string | Optional announcement badge text |
| ctaButton | { text: string, url: string } | Primary call-to-action button |
| secondaryButton | { text: string, url: string } | Optional secondary button |
| backgroundImage | { url: string, alt: string } | Optional background image |
| features | string[] | List of feature bullet points |
| statistics | { value: string, label: string }[] | Key metrics to display |
| className | string | Optional CSS class name |

### SecondaryHero

| Prop | Type | Description |
|------|------|-------------|
| heading | string | Page headline (required) |
| subheading | string | Supporting text below headline |
| backgroundPattern | "dots" \| "grid" \| "none" | Background pattern style |
| showBreadcrumbs | boolean | Whether to show breadcrumbs |
| breadcrumbs | { label: string, href: string }[] | Custom breadcrumb items |
| className | string | Optional CSS class name |

### ProductHero

| Prop | Type | Description |
|------|------|-------------|
| heading | string | Product headline (required) |
| subheading | string | Supporting text below headline |
| ctaButton | { text: string, url: string } | Call-to-action button |
| productImage | { url: string, alt: string } | Product showcase image |
| features | string[] | List of product features |
| className | string | Optional CSS class name |

## Example Page

An example page showing all three hero components is available at:
`/examples/hero-examples`

## Animation Components

The hero components use these animation components internally:

- `FadeIn` - Fade and slide animations with configurable direction and timing
- `TextReveal` - Word-by-word text reveal animation
- `GradientText` - Animated gradient text effect

These can also be used independently in other components.

## Accessibility

All hero components are built with accessibility in mind:

- Proper heading hierarchy
- Sufficient color contrast
- Keyboard navigation support
- Reduced motion support
- Semantic HTML structure

## Performance Considerations

- Images are optimized using Next.js Image component
- Animations use hardware-accelerated properties
- Components support lazy loading where appropriate
