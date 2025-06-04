import type { CollectionAfterChangeHook, PayloadRequest } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Page } from '../../../payload-types'

// Extend PayloadRequest to include our custom property
interface RequestWithSkipRevalidation extends PayloadRequest {
  skipRevalidation?: boolean;
}

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req,
}: { doc: Page; previousDoc: Page; req: RequestWithSkipRevalidation }) => {
  // Check for a custom flag to skip revalidation during import
  if (req.skipRevalidation) {
    req.payload.logger.info(`Skipping revalidation for page: ${doc.slug} (import process)`);
    return doc;
  }

  // Check if we're in a Next.js context before attempting revalidation
  try {
    if (doc._status === 'published') {
      const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

      req.payload.logger.info(`Revalidating page at path: ${path}`)

      revalidatePath(path)
    }
    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`

      req.payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      revalidatePath(oldPath)
    }
  } catch (error) {
    // Silently handle revalidation errors during imports or script execution
    if (error.message?.includes('static generation store') || 
        error.message?.includes('revalidatePath')) {
      req.payload.logger.info(`Skipping revalidation for page: ${doc.slug} (not in Next.js context)`);
    } else {
      // Log other unexpected errors
      req.payload.logger.error(`Error during page revalidation: ${error.message}`);
    }
  }

  return doc
}
