import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc, payload, req }) => {
  // Check if we're in an import context and should skip search indexing
  if (req?.skipRevalidation || req?.skipSearchSync) {
    payload.logger.info(`Skipping search sync for document: ${originalDoc.id || originalDoc.slug} (import process)`);
    // Return null to skip indexing entirely during import
    return null;
  }

  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, id, categories, title, meta, excerpt } = originalDoc

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: meta?.image?.id || meta?.image,
      description: meta?.description,
    },
    categories: [],
  }
  if (categories && Array.isArray(categories) && categories.length > 0) {
    // get full categories and keep a flattened copy of their most important properties
    try {
      const mappedCategories = categories.map((category) => {
        const { id, title } = category

        return {
          relationTo: 'categories',
          id,
          title,
        }
      })

      modifiedDoc.categories = mappedCategories
    } catch (err) {
      console.error(
        `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
      )
    }
  }

  return modifiedDoc
}
