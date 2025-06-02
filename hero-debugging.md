# Hero Components Debugging Guide

## Check These If Still Having Issues:

### 1. Verify Import Paths in tsconfig.json
Make sure your `@/` alias is working:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 2. Check Console for Errors
Open browser DevTools (F12) and look for:
- Import errors
- Animation/Framer Motion errors  
- TypeScript errors
- Missing CSS/Tailwind issues

### 3. Test Individual Components
Create a simple test to verify components work:

```typescript
// app/test/page.tsx
"use client"
import { MainHero } from "@/components/heroes"

export default function TestPage() {
  return (
    <MainHero 
      heading="Test Hero"
      subheading="Testing if components render"
    />
  )
}
```

### 4. Verify Dependencies
Ensure these are installed:
```bash
npm list framer-motion
npm list lucide-react
npm list next
```

### 5. Check Component Exports
Verify the index file exports:
```typescript
// src/components/heroes/index.ts should have:
export { MainHero } from "./MainHero"
export { SecondaryHero } from "./SecondaryHero" 
export { ProductHero } from "./ProductHero"
```

### 6. Restart Development Server
Sometimes Next.js needs a restart:
```bash
npm run dev
# or
pnpm dev
```
