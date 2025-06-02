# Hero Components Implementation Plan

This document outlines the step-by-step process for implementing the Royalti.io hero component system across the website. It includes technical requirements, implementation phases, and best practices.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Component Implementation](#component-implementation)
3. [PayloadCMS Integration](#payloadcms-integration)
4. [Testing Plan](#testing-plan)
5. [Accessibility Checklist](#accessibility-checklist)
6. [Performance Optimization](#performance-optimization)
7. [Recommendations](#recommendations)

## Prerequisites

- [x] Ensure all dependencies are installed:
  - [x] Framer Motion for animations
  - [x] Lucide for icon components
  - [x] Tailwind CSS for styling
  - [x] Next.js 13+ (App Router) for rendering

```bash
npm install framer-motion lucide-react
```

- [x] Create utility functions in `lib/utils.ts` for className merging:

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Component Implementation

### 1. Animation Components

- [x] Create animation components directory: `components/ui/animation`
- [x] Implement base animation components:
  - [x] FadeIn.tsx
  - [x] TextReveal.tsx
  - [x] GradientText.tsx

### 2. UI Components

- [x] Ensure basic UI components exist:
  - [x] Badge.tsx
  - [x] Button.tsx
  - [x] Container.tsx

### 3. Hero Components

- [x] Create heroes directory: `components/heroes`
- [x] Implement hero components:
  - [x] MainHero.tsx - For homepage
  - [x] SecondaryHero.tsx - For inner pages
  - [x] ProductHero.tsx - For product pages

### 4. Integration Components

- [x] Create HeroRenderer.tsx for dynamic rendering based on block type
- [x] Implement responsive image handling with Next.js Image component

## PayloadCMS Integration

- [x] Create hero block definitions in PayloadCMS
  - [x] Define MainHeroBlock schema
  - [x] Define SecondaryHeroBlock schema
  - [x] Define ProductHeroBlock schema
- [x] Register hero blocks in PayloadCMS
  - [x] Add to Pages collection
  - [x] Add to other relevant collections if needed
- [x] Create client-side renderer for hero blocks

```typescript
// collections/globals/blocks.ts
import { HeroBlocks } from '../blocks/HeroBlocks'

export const Blocks = {
  // Other block types
  ...HeroBlocks
}
```

- [ ] Add hero blocks to page templates:
  - [ ] Homepage layout
  - [ ] Standard page layout
  - [ ] Product page layout

## Testing Plan

- [ ] Create component tests:
  - [ ] Visual regression tests with Storybook or Chromatic
  - [ ] Unit tests for animation behaviors
  - [ ] Responsive behavior tests across breakpoints
  
- [ ] End-to-end testing:
  - [ ] Integration with PayloadCMS data
  - [ ] Content editor workflow validation

## Accessibility Checklist

- [ ] Implement proper semantic HTML structure
- [ ] Add appropriate ARIA attributes:
  - [ ] aria-label for buttons without visible text
  - [ ] aria-hidden for decorative elements
  
- [ ] Ensure keyboard navigation support:
  - [ ] Focus states for interactive elements
  - [ ] Tab order follows visual layout

- [ ] Include reduced-motion preferences:
```typescript
// Example modification to FadeIn component
const prefersReducedMotion = 
  typeof window !== "undefined" 
  ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
  : false;

// Use in components
initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, ...directions[direction] }}
```

- [ ] Test with screen readers

## Performance Optimization

- [ ] Implement lazy loading for hero images
- [ ] Consider component code splitting for hero variants
- [ ] Optimize animation performance:
  - [ ] Use `transform` over absolute positioning
  - [ ] Enable hardware acceleration for animations
  - [ ] Avoid layout thrashing by batching DOM reads/writes

- [ ] Image optimization:
  - [ ] Use appropriate image formats (WebP/AVIF with fallbacks)
  - [ ] Implement responsive image sizes
  - [ ] Set correct priority for above-the-fold hero images

## Recommendations

### Technical Improvements

1. **Animation Theming System**
   - Create a centralized animation config to maintain consistency across components
   - Example implementation:

```typescript
// lib/animation-config.ts
export const animationConfig = {
  durations: {
    fast: 0.3,
    default: 0.6,
    slow: 0.9,
  },
  easings: {
    default: [0.4, 0, 0.2, 1],
    bounce: [0.175, 0.885, 0.32, 1.275],
  }
}
```

2. **Component Variants System**
   - Extend components with preset variants for different content types

```typescript
// components/heroes/SecondaryHero.tsx
interface SecondaryHeroProps {
  // ...existing props
  variant?: 'default' | 'compact' | 'feature'
}
```

3. **Analytics Integration**
   - Add data attributes for tracking hero interactions:

```tsx
<Button 
  data-analytics-id="hero-cta"
  data-campaign="homepage-q2"
>
  Get Started
</Button>
```

### Design Considerations

1. **Mobile-First Approach**
   - Design hero components for mobile first, then enhance for larger screens
   - Consider vertical spacing and readability on small screens

2. **Dark Mode Support**
   - Implement dark mode variants for all hero components
   - Ensure sufficient contrast in all states

3. **Interaction States**
   - Design hover, focus, and active states for interactive elements
   - Consider touch interactions for mobile devices

## Implementation Timeline

1. **Week 1**: Base component implementation
   - Animation components
   - UI component foundations
   - MainHero component

2. **Week 2**: Additional hero variants and PayloadCMS integration
   - SecondaryHero and ProductHero components
   - Block type definitions
   - CMS field configurations

3. **Week 3**: Testing, optimization, and documentation
   - Unit/component tests
   - Performance optimizations
   - Documentation updates

4. **Week 4**: Refinement and deployment
   - Address feedback
   - Final accessibility checks
   - Deploy to staging/production

---

*This implementation plan provides a structured approach to developing the hero component system for Royalti.io. Follow each section methodically to ensure a robust, accessible, and performant implementation.*
