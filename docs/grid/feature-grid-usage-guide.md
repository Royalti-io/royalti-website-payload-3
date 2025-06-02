# Feature Grid Usage Guide for Royalti.io

## Component Overview

### 1. **Classic Feature Grid** - Traditional & Reliable
- **Best for**: Service lists, capability overviews, comparison pages
- **Use cases**: Pricing features, platform capabilities, "why choose us" sections
- **Variants**: 
  - `default`: Icon + text (clean, professional)
  - `cards`: Full card layout (more visual impact)
  - `minimal`: Text-only (when you want focus on content)

### 2. **Bento Feature Grid** - Modern & Eye-catching 🎯
- **Best for**: Homepage features, product showcases, visual storytelling
- **Use cases**: Platform overview, feature highlights, service breakdown
- **Key advantage**: Asymmetrical layout creates visual interest and hierarchy

### 3. **Feature Showcase** - Focused & Detailed
- **Best for**: Detailed product explanations, before/after comparisons
- **Use cases**: Main product features, detailed platform walkthroughs
- **Key advantage**: Combines detailed explanation with supporting points

## Recommended Usage for Royalti.io

### Homepage Layout Strategy
```
1. MainHero (grabbing attention)
2. FeatureShowcase (main platform demo)
3. BentoFeatureGrid (platform capabilities)
4. ClassicFeatureGrid (why choose us - cards variant)
5. Testimonials/CTA
```

### Platform/Product Pages
```
1. SecondaryHero (page introduction)
2. BentoFeatureGrid (main features with 1 large focal point)
3. ClassicFeatureGrid (detailed capabilities - default variant)
4. Technical specs/integrations
```

### Pricing Pages
```
1. SecondaryHero (pricing introduction)
2. Pricing cards
3. ClassicFeatureGrid (what's included in all plans)
4. FAQ/Support
```

## Bento Grid Layout Best Practices

### Perfect Bento Layouts (6-8 features)

**Option 1: Hero Focus**
```
[LARGE    ] [small] [medium]
[LARGE    ] [small] [medium]
[wide             ] [small]
```

**Option 2: Balanced**
```
[medium] [small] [tall ]
[medium] [small] [tall ]
[small ] [wide        ]
```

**Option 3: Content Rich**
```
[LARGE    ] [medium]
[LARGE    ] [medium]
[small] [small] [wide ]
```

### Size Guidelines

| Size | Grid Space | Best For | Max Text |
|------|------------|----------|----------|
| `small` | 1x1 | Simple features, stats | 2-3 lines |
| `medium` | 2x1 | Standard features | 4-5 lines |
| `large` | 3x2 | Hero feature, main product | 6+ lines + stats |
| `wide` | 4x1 | Process steps, timelines | 3-4 lines |
| `tall` | 2x2 | Detailed features | 5-6 lines |

### Content Strategy for Each Size

**Large Features (Hero spots):**
- Your main differentiator
- Most important platform feature  
- Include statistics/proof points
- Use compelling background gradients
- Example: "Advanced Analytics Dashboard"

**Medium Features (Supporting):**
- Key platform capabilities
- Popular features (add badges)
- Integration highlights
- Example: "Multi-Platform Tracking"

**Small Features (Quick hits):**
- Simple benefits
- Trust indicators
- Quick wins
- Example: "99.9% Uptime"

## Music Industry Specific Recommendations

### Icon Selection for Music Platform

**Revenue & Analytics:**
- `bar-chart`: Analytics, reporting
- `trending-up`: Growth, optimization
- `dollar-sign`: Revenue, earnings
- `eye`: Insights, visibility

**Music Specific:**
- `music`: Platform integrations
- `globe`: Global distribution
- `users`: Artist/label management

**Trust & Security:**
- `shield`: Security, protection
- `check-circle`: Accuracy, verification
- `star`: Quality, premium features

### Content Themes for Royalti.io

**Platform Capabilities:**
1. Real-time analytics & reporting
2. Multi-platform integration (Spotify, Apple Music, etc.)
3. Global royalty tracking
4. Revenue optimization
5. Team collaboration
6. Automated reporting
7. Data security & compliance
8. Historical data access

**Trust Building:**
1. Industry certifications
2. Client testimonials
3. Security standards
4. Accuracy guarantees
5. Expert support
6. Track record (money tracked, artists served)

## Animation & Performance Tips

### Stagger Delays
```typescript
// Good stagger timing for feature grids
features.map((feature, index) => (
  <FadeIn delay={0.3 + index * 0.1}>
    {/* Feature content */}
  </FadeIn>
))
```

### Performance Optimization
- Use `loading="lazy"` for feature images
- Optimize images to WebP/AVIF format
- Keep animation delays under 1 second total
- Use `transform` instead of `position` for animations

### Accessibility
```typescript
// Respect user motion preferences
const prefersReducedMotion = useReducedMotion()

<FadeIn delay={prefersReducedMotion ? 0 : 0.3}>
```

## Content Writing Guidelines

### Headlines (Feature Titles)
- **Length**: 2-5 words maximum
- **Style**: Action-oriented, benefit-focused
- **Examples**: 
  - ✅ "Real-Time Analytics"
  - ✅ "Revenue Optimization" 
  - ❌ "Our Advanced Analytics Platform That Tracks Everything"

### Descriptions
- **Length**: 1-2 sentences (20-40 words)
- **Focus**: Specific benefits, not features
- **Include**: Numbers, proof points when possible
- **Examples**:
  - ✅ "Track earnings from 150+ platforms with accuracy down to the cent."
  - ❌ "We have a system that tracks your earnings."

### Badges
- **Use sparingly**: Only for genuinely important callouts
- **Options**: "New", "Popular", "Featured", "Award Winning"
- **Avoid**: Generic terms like "Great" or "Amazing"

## A/B Testing Recommendations

### Test Variables
1. **Grid type**: Classic vs Bento on homepage
2. **Feature order**: Most important features first vs logical grouping
3. **Visual style**: Icons vs images vs gradients
4. **CTA placement**: Feature-level links vs section-level CTA

### Metrics to Track
- **Engagement**: Time on page, scroll depth
- **Conversion**: CTA clicks, signup rate
- **User feedback**: Heatmaps, user recordings

## Common Mistakes to Avoid

### ❌ Don't Do This
- **Too many large features**: Max 1 large per Bento grid
- **Inconsistent descriptions**: Varying lengths and styles
- **Generic icons**: Using same icon for different features
- **Text-heavy small cards**: Keep small features concise
- **No visual hierarchy**: Making all features same size/importance

### ✅ Do This Instead
- **One hero feature**: Make it your strongest differentiator
- **Consistent voice**: Same tone and length across features
- **Meaningful icons**: Icons that actually relate to the feature
- **Progressive disclosure**: Summary in grid, details on click
- **Clear hierarchy**: Visual importance matches business importance

## Technical Implementation Notes

### Bundle Size Optimization
```typescript
// Lazy load icons to reduce initial bundle
const iconMap = {
  'zap': lazy(() => import('lucide-react').then(mod => ({ default: mod.Zap }))),
  // ... other icons
}
```

### SEO Considerations
- Use semantic HTML structure
- Include `alt` text for all feature images
- Use proper heading hierarchy (h2 for section, h3 for features)
- Implement structured data for key features

### Mobile Responsiveness
- Bento grids collapse to single column on mobile
- Classic grids use responsive column counts
- Touch targets are minimum 44px
- Text remains readable at all screen sizes

This comprehensive system gives you maximum flexibility while maintaining consistency across your Royalti.io website. Start with the basics and gradually experiment with more complex Bento layouts as your content strategy evolves!