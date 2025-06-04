import type { CollectionAfterChangeHook, PayloadRequest } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Post } from '../../../payload-types'

// Extend PayloadRequest to include our custom property
interface RequestWithSkipRevalidation extends PayloadRequest {
  skipRevalidation?: boolean;
}

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req, // Use the extended type for req
}: { doc: Post; previousDoc: Post; req: RequestWithSkipRevalidation }) => {
  // Check for a custom flag to skip revalidation during import
  if (req.skipRevalidation) {
    req.payload.logger.info(`Skipping revalidation for post: ${doc.slug} (import process)`);
    return doc;
  }

  // Check if we're in a Next.js context before attempting revalidation
  try {
    if (doc._status === 'published') {
      const path = `/posts/${doc.slug}`

      req.payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
    }
    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/posts/${previousDoc.slug}`

      req.payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
    }
  } catch (error) {
    // Silently handle revalidation errors during imports or script execution
    if (error.message?.includes('static generation store') || 
        error.message?.includes('revalidatePath')) {
      req.payload.logger.info(`Skipping revalidation for post: ${doc.slug} (not in Next.js context)`);
    } else {
      // Log other unexpected errors
      req.payload.logger.error(`Error during post revalidation: ${error.message}`);
    }
  }

  return doc
}
