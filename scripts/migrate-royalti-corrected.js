import payload from 'payload'
import { XMLParser } from 'fast-xml-parser'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
const CONFIG = {
  xmlFile: path.join(__dirname, 'royaltiio.WordPress.2025-06-06.xml'),
  dryRun: true, // Set to true to test without actually creating records
  skipMedia: false, // Set to true to skip media migration
  skipExisting: true, // Skip if records already exist
  batchSize: 10, // Process items in batches to avoid memory issues
}

const migrate = async () => {
  console.log('🚀 Starting Royalti.io WordPress migration...')
  console.log(`📁 Using XML file: ${CONFIG.xmlFile}`)
  
  try {
    // Initialize Payload
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local: true,
    })
    console.log('✅ Payload initialized successfully')

    // Parse WordPress XML with FIXED parser configuration
    const xmlData = fs.readFileSync(CONFIG.xmlFile, 'utf8')
    const parser = new XMLParser({
      ignoreAttributes: false,
      parseAttributeValue: true,
      parseTagValue: true,
      trimValues: true,
      cdataPropName: '__cdata', // Handle CDATA sections properly
      textNodeName: '#text',
      isArray: (name) => name === 'item', // Always treat items as array
      processEntities: true,
      htmlEntities: true,
    })
    const wpData = parser.parse(xmlData)
    console.log('✅ WordPress XML parsed successfully')

    // Helper function to extract text from WordPress XML objects
    const extractText = (obj) => {
      if (typeof obj === 'string') return obj
      if (typeof obj === 'object') {
        return obj.__cdata || obj['#text'] || obj.toString()
      }
      return obj?.toString() || ''
    }

    // Migration steps - START WITH DRY RUN FIRST!
    console.log('\n📊 Starting migration process...')
    
    // 1. Migrate categories
    const categoryMap = await migrateCategories(wpData, extractText)
    
    // 2. Migrate posts
    await migratePosts(wpData, categoryMap, extractText)
    
    // 3. Migrate pages (WPBakery needs manual work)
    await migratePages(wpData, extractText)
    
    console.log('\n🎉 Migration completed successfully!')
    console.log('📋 Summary:')
    console.log(`   - Categories: ${Object.keys(categoryMap).length}`)
    
    console.log('\n⚠️  IMPORTANT: Next steps for WPBakery pages:')
    console.log('   - Homepage, Pricing, API pages need manual conversion')
    console.log('   - Use PayloadCMS admin to recreate layouts with blocks')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
  
  process.exit(0)
}

const migrateCategories = async (wpData, extractText) => {
  console.log('\n📂 Migrating categories...')
  const categoryMap = {}
  
  const categories = wpData.rss.channel['wp:category'] || []
  const categoryList = Array.isArray(categories) ? categories : [categories]
  
  for (const category of categoryList) {
    if (!category) continue
    
    const termId = extractText(category['wp:term_id'])
    const nicename = extractText(category['wp:category_nicename'])
    const name = extractText(category['wp:cat_name'])
    
    if (!name || !nicename) {
      console.log(`⚠️  Skipping category with missing data: ${termId}`)
      continue
    }
    
    try {
      // Check if category already exists
      const existingCategories = await payload.find({
        collection: 'categories',
        where: { slug: { equals: nicename } }
      })
      
      if (existingCategories.docs.length > 0 && CONFIG.skipExisting) {
        console.log(`⏭️  Category already exists: ${name}`)
        categoryMap[name.toLowerCase()] = existingCategories.docs[0].id
        continue
      }
      
      if (!CONFIG.dryRun) {
        const newCategory = await payload.create({
          collection: 'categories',
          data: { title: name, slug: nicename }
        })
        
        categoryMap[name.toLowerCase()] = newCategory.id
        console.log(`✅ Created category: ${name}`)
      } else {
        console.log(`[DRY RUN] Would create category: ${name}`)
        categoryMap[name.toLowerCase()] = 'dry-run-id'
      }
    } catch (error) {
      console.error(`❌ Failed to create category ${name}:`, error.message)
    }
  }
  
  return categoryMap
}

const migratePosts = async (wpData, categoryMap, extractText) => {
  console.log('\n📝 Migrating blog posts...')
  
  const items = wpData.rss.channel.item || []
  const itemList = Array.isArray(items) ? items : [items]
  const posts = itemList.filter(item => extractText(item['wp:post_type']) === 'post')
  
  console.log(`Found ${posts.length} posts to migrate`)
  
  for (const post of posts) {
    const title = extractText(post.title) || 'Untitled'
    const slug = extractText(post['wp:post_name'])
    const content = extractText(post['content:encoded']) || ''
    const publishDate = extractText(post['wp:post_date'])
    const status = extractText(post['wp:status'])
    
    if (!title || !slug) {
      console.log("⚠️  Skipping post with missing title/slug")
      continue
    }
    
    try {
      // Check if post already exists
      const existingPosts = await payload.find({
        collection: 'posts',
        where: { slug: { equals: slug } }
      })
      
      if (existingPosts.docs.length > 0 && CONFIG.skipExisting) {
        console.log(`⏭️  Post already exists: ${title}`)
        continue
      }
      
      // Get Yoast SEO data
      const postMeta = post['wp:postmeta'] || []
      const metaList = Array.isArray(postMeta) ? postMeta : [postMeta]
      
      const yoastTitleMeta = metaList.find(meta => extractText(meta['wp:meta_key']) === '_yoast_wpseo_title')
      const yoastDescMeta = metaList.find(meta => extractText(meta['wp:meta_key']) === '_yoast_wpseo_metadesc')
      const yoastTitle = yoastTitleMeta ? extractText(yoastTitleMeta['wp:meta_value']) : ''
      const yoastDescription = yoastDescMeta ? extractText(yoastDescMeta['wp:meta_value']) : ''
      
      // Get categories
      const postCategories = []
      const categories = post.category || []
      const categoryList = Array.isArray(categories) ? categories : [categories]
      
      for (const cat of categoryList) {
        const catName = extractText(cat)
        if (catName && categoryMap[catName.toLowerCase()]) {
          postCategories.push(categoryMap[catName.toLowerCase()])
        }
      }

      if (!CONFIG.dryRun) {
        const postData = {
          title,
          slug,
          content: convertWordPressContentToLexical(content),
          publishedAt: new Date(publishDate),
          _status: status === 'publish' ? 'published' : 'draft',
          categories: postCategories,
          meta: {
            title: yoastTitle || title,
            description: yoastDescription || generateExcerpt(content),
          },
        }
        
        await payload.create({
          collection: 'posts',
          data: postData
        })
        
        console.log(`✅ Created post: ${title}`)
      } else {
        console.log(`[DRY RUN] Would create post: ${title}`)
      }
    } catch (error) {
      console.error(`❌ Failed to create post ${title}:`, error.message)
    }
  }
}

const migratePages = async (wpData, extractText) => {
  console.log('\n📄 Migrating pages...')
  
  const items = wpData.rss.channel.item || []
  const itemList = Array.isArray(items) ? items : [items]
  const pages = itemList.filter(item => extractText(item['wp:post_type']) === 'page')
  
  console.log(`Found ${pages.length} pages to migrate`)
  console.log('⚠️  Note: WPBakery content will need manual conversion!')
  
  for (const page of pages) {
    const title = extractText(page.title) || 'Untitled'
    const slug = extractText(page['wp:post_name']) || 'untitled'
    const content = extractText(page['content:encoded']) || ''
    const status = extractText(page['wp:status'])
    
    // Flag critical pages
    const criticalPages = ['home', 'pricing', 'api', 'about']
    const isCritical = criticalPages.includes(slug.toLowerCase())
    
    if (!title) {
      console.log("⚠️  Skipping page with missing title")
      continue
    }
    
    try {
      // Check if page already exists
      const existingPages = await payload.find({
        collection: 'pages',
        where: { slug: { equals: slug === 'home' ? '' : slug } }
      })
      
      if (existingPages.docs.length > 0 && CONFIG.skipExisting) {
        console.log(`⏭️  Page already exists: ${title}`)
        continue
      }
      
      // Get Yoast SEO data
      const postMeta = page['wp:postmeta'] || []
      const metaList = Array.isArray(postMeta) ? postMeta : [postMeta]
      
      const yoastTitleMeta = metaList.find(meta => extractText(meta['wp:meta_key']) === '_yoast_wpseo_title')
      const yoastDescMeta = metaList.find(meta => extractText(meta['wp:meta_key']) === '_yoast_wpseo_metadesc')
      const yoastTitle = yoastTitleMeta ? extractText(yoastTitleMeta['wp:meta_value']) : ''
      const yoastDescription = yoastDescMeta ? extractText(yoastDescMeta['wp:meta_value']) : ''
      
      if (!CONFIG.dryRun) {
        const pageData = {
          title,
          slug: slug === 'home' ? '' : slug,
          hero: {
            type: 'lowImpact',
            richText: convertWordPressContentToLexical(`<h1>${title}</h1>`),
          },
          layout: [
            {
              blockType: 'content',
              richText: convertWordPressContentToLexical(content || `<p>Content from ${title} needs manual conversion from WPBakery.</p>`),
            }
          ],
          publishedAt: new Date(),
          _status: status === 'publish' ? 'published' : 'draft',
          meta: {
            title: yoastTitle || title,
            description: yoastDescription || generateExcerpt(content),
          },
        }
        await payload.create({
          collection: 'pages',
          data: pageData
        })
        
        const criticalFlag = isCritical ? ' 🔥 CRITICAL' : ''
        console.log(`✅ Created page: ${title}${criticalFlag}`)
        
        if (isCritical) {
          console.log("   ⚠️  REQUIRES MANUAL WPBAKERY CONVERSION")
        }
      } else {
        console.log(`[DRY RUN] Would create page: ${title}`)
      }
    } catch (error) {
      console.error(`❌ Failed to create page ${title}:`, error.message)
    }
  }
}

// Helper functions
const generateExcerpt = (content) => {
  const text = content.replace(/<[^>]*>/g, '').trim()
  return text.length > 160 ? `${text.substring(0, 157)}...` : text
}

const convertWordPressContentToLexical = (content) => {
  if (!content || content.trim() === '') {
    return {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'text',
                format: 0,
                text: 'Content needs to be added.',
                version: 1,
              },
            ],
          },
        ],
      },
    }
  }
  
  // Basic HTML to Lexical conversion
  const cleanContent = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim()
  
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              format: 0,
              text: cleanContent.replace(/<[^>]*>/g, '').substring(0, 500) + (cleanContent.length > 500 ? '...' : ''),
              version: 1,
            },
          ],
        },
      ],
    },
  }
}

// Run the migration
if (import.meta.url === `file://${process.argv[1]}`) {
  migrate()
}

export default migrate
