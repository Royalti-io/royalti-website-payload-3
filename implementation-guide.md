# FeatureGrid Implementation Guide for Royalti.io

## Files to Create

### 1. Create FeatureGrid Block Configuration
**File: `src/blocks/FeatureGrid/config.ts`**
Copy the FeatureGridBlock configuration from the first artifact

### 2. Create FeatureGrid Component  
**File: `src/blocks/FeatureGrid/Component.tsx`**
```typescript
export { FeatureGrid as FeatureGridBlock } from '@/components/FeatureGrid'
```

### 3. Create Main FeatureGrid Component
**File: `src/components/FeatureGrid/index.tsx`**
Copy the full FeatureGrid component from the second artifact

## Files to Update

### 1. Update RenderBlocks.tsx
**File: `src/blocks/RenderBlocks.tsx`**

Add import:
```typescript
import { FeatureGridBlock } from '@/blocks/FeatureGrid/Component'
```

Add to blockComponents:
```typescript
const blockComponents = {
  // ... existing blocks
  featureGrid: FeatureGridBlock, // Add this
}
```

### 2. Update Pages Collection
**File: `src/collections/Pages/index.ts`**

Add import:
```typescript
import { FeatureGrid } from '../../blocks/FeatureGrid/config'
```

Update blocks array:
```typescript
blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, FeatureGrid]
```

## Usage Examples

### Example 1: Icon Cards Layout
```json
{
  "blockType": "featureGrid",
  "title": "Why Choose Royalti.io",
  "eyebrow": "FEATURES", 
  "subtitle": "Everything you need to manage your music royalties",
  "layout": "3-col",
  "variant": "icon-cards",
  "backgroundColor": "white",
  "features": [
    {
      "icon": "TrendingUp",
      "title": "Real-time Analytics",
      "description": "Track your royalty earnings in real-time with detailed analytics and insights."
    },
    {
      "icon": "Shield", 
      "title": "Secure & Compliant",
      "description": "Bank-level security with full compliance to industry standards."
    },
    {
      "icon": "Zap",
      "title": "Lightning Fast", 
      "description": "Process royalty payments and reports in seconds, not days."
    }
  ]
}
```

### Example 2: Image Cards for Product Features
```json
{
  "blockType": "featureGrid",
  "title": "Platform Features",
  "layout": "2-col",
  "variant": "image-cards", 
  "backgroundColor": "gray-50",
  "features": [
    {
      "image": { "url": "/dashboard-screenshot.jpg", "alt": "Dashboard" },
      "title": "Powerful Dashboard",
      "description": "Comprehensive overview of all your royalty streams and earnings.",
      "link": {
        "text": "Try Dashboard",
        "url": "/demo",
        "openInNewTab": false
      }
    }
  ]
}
```

## Testing & Migration Notes

### Testing Checklist
1. PayloadCMS admin - create a new page with FeatureGrid block
2. Frontend rendering - ensure animations and styling work  
3. Mobile responsiveness across all variants
4. Different layouts (2-col, 3-col, 4-col, masonry)
5. All variants (icon-cards, icon-text, image-cards, minimal, numbered)

### Migration Integration
This FeatureGrid will be perfect for converting your WPBakery feature sections 
during the WordPress migration. The block system provides much more flexibility 
than WPBakery shortcodes.

### Color Scheme Integration
The component uses your existing "royal" color palette:
- royal-50, royal-100, royal-200, royal-500, royal-600
- Make sure these are defined in your tailwind.config.mjs

### Animation Features
- Uses framer-motion for smooth entry animations
- Staggered reveals for each feature item
- Hover effects on cards and interactive elements
- Fully configurable animation timing via PayloadCMS
