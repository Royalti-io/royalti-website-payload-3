#!/usr/bin/env tsx
/**
 * Rebuild search index after import
 * Run with: pnpm run rebuild:search
 */

import payload from 'payload'
import config from '../src/payload.config'
import { exit } from 'process'

async function rebuildSearchIndex() {
  console.log('🔍 Starting search index rebuild...')
  
  try {
    // Initialize PayloadCMS (this will include the search plugin since DISABLE_SEARCH is not set)
    await payload.init({
      config,
    })
    console.log('✅ PayloadCMS initialized with search plugin')

    // Find all published posts
    const posts = await payload.find({
      collection: 'posts',
      where: {
        _status: {
          equals: 'published'
        }
      },
      limit: 1000, // Adjust if you have more than 1000 posts
    })

    console.log(`📊 Found ${posts.docs.length} published posts to index`)

    // Clear existing search documents
    try {
      const existingSearchDocs = await payload.find({
        collection: 'search',
        limit: 1000,
      })
      
      console.log(`🗑️ Clearing ${existingSearchDocs.docs.length} existing search documents`)
      
      for (const doc of existingSearchDocs.docs) {
        await payload.delete({
          collection: 'search',
          id: doc.id,
        })
      }
    } catch (error) {
      console.log('No existing search documents to clear or error clearing:', error.message)
    }

    // Rebuild search index by updating each post (this will trigger the search sync)
    let indexedCount = 0
    for (const post of posts.docs) {
      try {
        await payload.update({
          collection: 'posts',
          id: post.id,
          data: {
            // Just update the updatedAt timestamp to trigger search sync
            updatedAt: new Date().toISOString(),
          },
        })
        indexedCount++
        console.log(`✅ Indexed post: ${post.title} (${indexedCount}/${posts.docs.length})`)
      } catch (error) {
        console.error(`❌ Failed to index post: ${post.title}`, error.message)
      }
    }

    console.log(`🎉 Search index rebuild completed! Indexed ${indexedCount} posts.`)
    
  } catch (error) {
    console.error('❌ Search index rebuild failed:', error.message)
    console.error('Full error:', error)
    exit(1)
  }
  
  exit(0)
}

rebuildSearchIndex()
