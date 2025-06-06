#!/usr/bin/env tsx
/**
 * Database verification script for PayloadCMS
 * Run with: pnpm run test:db
 */

import payload from 'payload'
import config from '../src/payload.config'
import { exit } from 'process'

async function testDatabase() {
  console.log('🚀 Starting database verification...')
  
  try {
    // Initialize PayloadCMS
    await payload.init({
      config,
    })
    console.log('✅ PayloadCMS initialized successfully')

    // Test database connection by counting collections
    // Use 'as const' to tell TypeScript these are specific string literals that match collection slugs
    const collections = ['posts', 'pages', 'categories', 'users', 'media'] as const
    
    for (const collection of collections) {
      try {
        const result = await payload.find({
          collection,
          limit: 5,
          depth: 0, // Minimal depth to reduce load
        })
        
        console.log(`📊 ${collection}: ${result.totalDocs} documents found`)
        
        if (result.docs.length > 0) {
          const sample = result.docs[0]
          // Use optional chaining and type assertion to safely access properties that might not exist on all collection types
          console.log(`   Sample item: ${(sample as any).title || (sample as any).name || sample.id}`)
        }
      } catch (error) {
        console.error(`❌ Error querying ${collection}:`, error.message)
      }
    }
    // Test creating a simple post to verify write operations
    console.log('\n🧪 Testing write operations...')
    
    try {
      const testPost = await payload.create({
        collection: 'posts' as const,
        data: {
          title: 'Test Post - Database Verification',
          slug: 'test-post-db-verification',
          content: {
            root: {
              type: 'root',
              children: [{
                type: 'paragraph',
                children: [{
                  type: 'text',
                  text: 'This is a test post to verify database functionality.',
                  version: 1
                }],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1
              }],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1
            }
          },
          _status: 'draft',
          meta: {
            title: 'Test Post - Database Verification',
            description: 'Test post for database verification'
          }
        },        req: {
          payload: payload,
          skipRevalidation: true,
          skipSearchSync: true,
        } as any
      })
      
      console.log(`✅ Successfully created test post with ID: ${testPost.id}`)
      
      // Clean up the test post
      await payload.delete({
        collection: 'posts',
        id: testPost.id,
        req: {
          payload: payload,
          skipRevalidation: true,
          skipSearchSync: true,
        } as any
      })
      
      console.log(`🗑️  Successfully deleted test post`)
      
    } catch (error) {
      console.error('❌ Error during write test:', error.message)
      console.error('Full error:', error)
    }

    console.log('\n✨ Database verification completed!')
    
  } catch (error) {
    console.error('❌ Database verification failed:', error.message)
    console.error('Full error:', error)
    exit(1)
  }
  
  exit(0)
}

testDatabase()
