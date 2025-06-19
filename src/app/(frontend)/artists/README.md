# Royalti.io Artists Page - Dependencies

This page uses several dependencies that need to be installed:

## Required Dependencies

```bash
npm install framer-motion lucide-react
```

## Dependencies Used:

1. **framer-motion** - For smooth animations and scroll-triggered animations
2. **lucide-react** - For consistent, beautiful icons throughout the page

## Features Implemented:

### 🎨 Design & Theme Support
- Full dark/light mode support with Tailwind dark: variants
- Responsive design for all screen sizes
- Modern gradient backgrounds and effects
- Smooth color transitions between themes

### ✨ Animations
- Scroll-triggered animations using Framer Motion's `useInView`
- Smooth fade-in and slide-up animations
- Hover effects on interactive elements
- Background particle animations
- Staggered animations for lists and grids

### 📱 Responsive Components
- Mobile-first design approach
- Adaptive layouts for different screen sizes
- Touch-friendly interactive elements
- Optimized typography scaling

### 🎯 Artist-Focused Content
- Pain points addressed specifically for artists
- Success stories with relatable artist personas
- Three-tier pricing structure for different artist levels
- Clear workflow demonstration
- Comprehensive feature explanations

### 🔧 Technical Implementation
- TypeScript for type safety
- Next.js 14+ App Router compatibility
- Tailwind CSS for styling
- Semantic HTML structure
- Accessibility-friendly components

## File Structure Created:

```
/app/artists/
├── page.tsx (Main page component)
├── HeroSection.tsx (Hero with animated background)
├── PainPointsSection.tsx (Before/after comparison)
├── FeaturesSection.tsx (Three main features)
├── SuccessStoriesSection.tsx (Artist testimonials)
├── WorkflowSection.tsx (3-step process)
├── PricingSection.tsx (Pricing tiers)
└── FinalCTASection.tsx (Conversion zone)
```

All components are self-contained and follow modern React patterns with proper error handling and performance optimization.
