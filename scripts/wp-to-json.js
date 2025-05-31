// WordPress XML to JSON Converter
// This script converts WordPress XML export to structured JSON
// that can be imported later into PayloadCMS without dependency issues

import { XMLParser } from 'fast-xml-parser';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  xmlFile: path.join(__dirname, 'royaltiio.WordPress.2025-05-28.xml'),
  outputDir: path.join(__dirname, '../migration-output'),
  downloadMedia: false, // Whether to download media files (can be large)
  mediaDir: path.join(__dirname, '../migration-output/media'),
};

// Ensure output directories exist
if (!fs.existsSync(CONFIG.outputDir)) {
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
}

if (CONFIG.downloadMedia && !fs.existsSync(CONFIG.mediaDir)) {
  fs.mkdirSync(CONFIG.mediaDir, { recursive: true });
}

// Helper function to extract text from WordPress XML objects
const extractText = (obj) => {
  if (typeof obj === 'string') return obj;
  if (typeof obj === 'object') {
    return obj?.__cdata || obj?.['#text'] || obj?.toString();
  }
  return obj?.toString() || '';
};

// Helper function to download a file from URL to local path
const downloadFile = async (url, localPath) => {
  try {
    const response = await axios({
      method: 'GET',
      url,
      responseType: 'arraybuffer',
    });
    
    fs.writeFileSync(localPath, response.data);
    console.log(`✅ Downloaded: ${path.basename(localPath)}`);
    return localPath;
  } catch (error) {
    console.error(`❌ Failed to download: ${url}`, error.message);
    return null;
  }
};

// Main function to convert WordPress XML to JSON
const convertToJson = async () => {
  console.log('🚀 Starting WordPress XML to JSON conversion');
  console.log(`📁 Using XML file: ${CONFIG.xmlFile}`);
  
  try {
    // Read and parse XML file
    console.log('Reading XML file...');
    const xmlData = fs.readFileSync(CONFIG.xmlFile, 'utf8');
    console.log(`Successfully read ${Math.round(xmlData.length / 1024)} KB of XML data`);
    
    console.log('Parsing XML data...');
    const parser = new XMLParser({
      ignoreAttributes: false,
      parseAttributeValue: true,
      parseTagValue: true,
      trimValues: true,
      cdataPropName: '__cdata',
      textNodeName: '#text',
      isArray: (name) => name === 'item',
      processEntities: true,
      htmlEntities: true,
    });
    
    const wpData = parser.parse(xmlData);
    console.log('Successfully parsed WordPress XML');
    
    const channel = wpData.rss?.channel;
    if (!channel) {
      throw new Error('Could not find channel in WordPress XML');
    }
    
    // Extract site metadata
    const siteInfo = {
      title: extractText(channel.title),
      link: extractText(channel.link),
      description: extractText(channel.description),
      wpVersion: extractText(channel['wp:wxr_version']),
      exportDate: new Date().toISOString(),
    };
    
    // Save site info
    fs.writeFileSync(
      path.join(CONFIG.outputDir, 'site-info.json'),
      JSON.stringify(siteInfo, null, 2)
    );
    console.log('✅ Saved site information');
    
    // Process categories
    const categories = channel['wp:category'] || [];
    const categoryList = Array.isArray(categories) ? categories : [categories];
    const processedCategories = categoryList.map(cat => ({
      id: extractText(cat['wp:term_id']),
      name: extractText(cat['wp:cat_name']),
      slug: extractText(cat['wp:category_nicename']),
    })).filter(cat => cat.name && cat.slug);
    
    fs.writeFileSync(
      path.join(CONFIG.outputDir, 'categories.json'),
      JSON.stringify(processedCategories, null, 2)
    );
    console.log(`✅ Processed ${processedCategories.length} categories`);
    
    // Process tags
    const tags = channel['wp:tag'] || [];
    const tagList = Array.isArray(tags) ? tags : [tags];
    const processedTags = tagList.map(tag => ({
      id: extractText(tag['wp:term_id']),
      name: extractText(tag['wp:tag_name']),
      slug: extractText(tag['wp:tag_slug']),
    })).filter(tag => tag.name && tag.slug);
    
    fs.writeFileSync(
      path.join(CONFIG.outputDir, 'tags.json'),
      JSON.stringify(processedTags, null, 2)
    );
    console.log(`✅ Processed ${processedTags.length} tags`);
    
    // Process authors
    const authors = channel['wp:author'] || [];
    const authorList = Array.isArray(authors) ? authors : [authors];
    const processedAuthors = authorList.map(author => ({
      login: extractText(author['wp:author_login']),
      email: extractText(author['wp:author_email']),
      displayName: extractText(author['wp:author_display_name']) || extractText(author['wp:author_login']),
      firstName: extractText(author['wp:author_first_name']) || '',
      lastName: extractText(author['wp:author_last_name']) || '',
    })).filter(author => author.login && author.email);
    
    fs.writeFileSync(
      path.join(CONFIG.outputDir, 'authors.json'),
      JSON.stringify(processedAuthors, null, 2)
    );
    console.log(`✅ Processed ${processedAuthors.length} authors`);
    
    // Process items (posts, pages, attachments)
    const items = channel.item || [];
    console.log(`Found ${items.length} total items to process`);
    
    // Process posts
    const posts = items.filter(item => {
      const postType = extractText(item['wp:post_type']);
      return postType === 'post';
    });
    
    const processedPosts = posts.map(post => {
      // Extract basic post data
      const postData = {
        id: extractText(post['wp:post_id']),
        title: extractText(post.title),
        slug: extractText(post['wp:post_name']),
        content: extractText(post['content:encoded']),
        excerpt: extractText(post['excerpt:encoded']),
        publishDate: extractText(post['wp:post_date']),
        status: extractText(post['wp:status']),
        creator: extractText(post['dc:creator']),
      };
      
      // Extract categories and tags
      // Access raw category data and convert to consistent format
      const postCategories = post.category || [];
      const categoryArray = Array.isArray(postCategories) ? postCategories : [postCategories];
      
      // In WordPress XML, categories have attributes stored in a special way
      // Log raw object details to understand the structure
      if (postData.id === '57549') {
        console.log('DEBUG: Raw post categories object keys:', Object.keys(post));
        console.log('DEBUG: Raw category data structure example:');
        if (categoryArray.length > 0) {
          const example = categoryArray[0];
          console.log('Keys:', Object.keys(example));
          console.log('Direct stringify:', JSON.stringify(example));
          // Check if attributes are stored in @_ prefix format (common XML parsing pattern)
          const attrKeys = Object.keys(example).filter(k => k.startsWith('@_'));
          console.log('Attribute keys (@_):', attrKeys);
        }
      }
      
      // Extract both categories and tags from the category array
      const categories = [];
      const tags = [];
      
      // Process each category element and sort into categories or tags based on domain
      categoryArray.forEach(cat => {
        if (!cat) return; // Skip null/undefined entries
        
        const text = extractText(cat);
        if (!text) return; // Skip empty text
        
        // Check if this is a tag or category based on the domain attribute
        // In WordPress XML, attributes are stored with @_ prefix
        if (cat['@_domain'] === 'post_tag') {
          tags.push(text);
        } else {
          // It's a category if it has no domain or domain is 'category'
          if (!cat['@_domain'] || cat['@_domain'] === 'category') {
            categories.push(text);
          }
        }
      });
      
      // Assign the extracted categories and tags to the post data
      postData.categories = categories;
      postData.tags = tags;
      
      // Debug output for specific posts to verify
      if (postData.id === '57549') {
        console.log(`Post ${postData.title} has ${tags.length} tags:`, tags);
      }
      
      // Extract metadata
      const postMeta = post['wp:postmeta'] || [];
      const metaList = Array.isArray(postMeta) ? postMeta : [postMeta];
      
      // Extract SEO metadata
      const seoData = {};
      const yoastTitleMeta = metaList.find(meta => extractText(meta['wp:meta_key']) === '_yoast_wpseo_title');
      const yoastDescMeta = metaList.find(meta => extractText(meta['wp:meta_key']) === '_yoast_wpseo_metadesc');
      
      if (yoastTitleMeta) {
        seoData.title = extractText(yoastTitleMeta['wp:meta_value']);
      }
      
      if (yoastDescMeta) {
        seoData.description = extractText(yoastDescMeta['wp:meta_value']);
      }
      
      postData.seo = seoData;
      
      // Extract featured image info
      const thumbnailId = metaList.find(meta => extractText(meta['wp:meta_key']) === '_thumbnail_id');
      if (thumbnailId) {
        postData.featuredImageId = extractText(thumbnailId['wp:meta_value']);
      }
      
      return postData;
    });
    
    fs.writeFileSync(
      path.join(CONFIG.outputDir, 'posts.json'),
      JSON.stringify(processedPosts, null, 2)
    );
    console.log(`✅ Processed ${processedPosts.length} posts`);
    
    // Process pages
    const pages = items.filter(item => {
      const postType = extractText(item['wp:post_type']);
      return postType === 'page';
    });
    
    const processedPages = pages.map(page => {
      // Extract basic page data
      const pageData = {
        id: extractText(page['wp:post_id']),
        title: extractText(page.title),
        slug: extractText(page['wp:post_name']),
        content: extractText(page['content:encoded']),
        template: extractText(page['wp:template']),
        parent: extractText(page['wp:post_parent']),
        menuOrder: extractText(page['wp:menu_order']),
        status: extractText(page['wp:status']),
      };
      
      // Check for WPBakery content
      pageData.hasWPBakery = pageData.content?.includes('[vc_row') || pageData.content?.includes('[vc_section');
      
      // Extract metadata for SEO
      const pageMeta = page['wp:postmeta'] || [];
      const metaList = Array.isArray(pageMeta) ? pageMeta : [pageMeta];
      
      // Extract SEO metadata
      const seoData = {};
      const yoastTitleMeta = metaList.find(meta => extractText(meta['wp:meta_key']) === '_yoast_wpseo_title');
      const yoastDescMeta = metaList.find(meta => extractText(meta['wp:meta_key']) === '_yoast_wpseo_metadesc');
      
      if (yoastTitleMeta) {
        seoData.title = extractText(yoastTitleMeta['wp:meta_value']);
      }
      
      if (yoastDescMeta) {
        seoData.description = extractText(yoastDescMeta['wp:meta_value']);
      }
      
      pageData.seo = seoData;
      
      return pageData;
    });
    
    fs.writeFileSync(
      path.join(CONFIG.outputDir, 'pages.json'),
      JSON.stringify(processedPages, null, 2)
    );
    console.log(`✅ Processed ${processedPages.length} pages`);
    
    // Process media attachments
    const attachments = items.filter(item => {
      const postType = extractText(item['wp:post_type']);
      return postType === 'attachment';
    });
    
    const mediaMap = {};
    const processedMedia = attachments.map(attachment => {
      const mediaData = {
        id: extractText(attachment['wp:post_id']),
        title: extractText(attachment.title),
        description: extractText(attachment['excerpt:encoded']) || '',
        date: extractText(attachment['wp:post_date']),
        url: extractText(attachment['wp:attachment_url']),
        mimeType: extractText(attachment['wp:post_mime_type']),
        parent: extractText(attachment['wp:post_parent']),
      };
      
      // Store in media map for reference
      mediaMap[mediaData.id] = mediaData.url;
      
      return mediaData;
    });
    
    fs.writeFileSync(
      path.join(CONFIG.outputDir, 'media.json'),
      JSON.stringify(processedMedia, null, 2)
    );
    console.log(`✅ Processed ${processedMedia.length} media attachments`);
    
    // Save media mapping
    fs.writeFileSync(
      path.join(CONFIG.outputDir, 'media-map.json'),
      JSON.stringify(mediaMap, null, 2)
    );
    
    // Download media if enabled
    if (CONFIG.downloadMedia) {
      console.log('\nDownloading media files (this may take some time)...');
      
      // Create a queue to avoid overloading the server
      const downloadQueue = processedMedia.slice(0, 20); // Limit to 20 for testing
      
      for (const media of downloadQueue) {
        const filename = path.basename(media.url);
        const localPath = path.join(CONFIG.mediaDir, filename);
        
        try {
          await downloadFile(media.url, localPath);
        } catch (error) {
          console.error(`Failed to download ${media.url}: ${error.message}`);
        }
      }
      
      console.log(`✅ Media download completed`);
    } else {
      console.log('Media download skipped (set CONFIG.downloadMedia to true to enable)');
    }
    
    // Create a summary file with statistics
    const summary = {
      exportDate: new Date().toISOString(),
      siteTitle: siteInfo.title,
      totalItems: items.length,
      posts: processedPosts.length,
      pages: processedPages.length,
      media: processedMedia.length,
      categories: processedCategories.length,
      authors: processedAuthors.length,
    };
    
    fs.writeFileSync(
      path.join(CONFIG.outputDir, 'summary.json'),
      JSON.stringify(summary, null, 2)
    );
    
    // Create a README file with instructions
    const readmeContent = `# WordPress Export to PayloadCMS
    
## Export Summary

- **Site:** ${siteInfo.title}
- **Export Date:** ${summary.exportDate}
- **Total Items:** ${summary.totalItems}
- **Posts:** ${summary.posts}
- **Pages:** ${summary.pages}
- **Media:** ${summary.media}
- **Categories:** ${summary.categories}
- **Authors:** ${summary.authors}

## File Contents

- **site-info.json** - Basic information about the WordPress site
- **categories.json** - All categories exported from WordPress
- **authors.json** - All authors from the WordPress site
- **posts.json** - All blog posts with metadata
- **pages.json** - All pages with metadata
- **media.json** - All media attachments
- **media-map.json** - Mapping of media IDs to URLs
- **summary.json** - Statistical summary of the export

## Next Steps

1. Use these JSON files with the PayloadCMS import script
2. Run the PayloadCMS migration using:
   \`\`\`
   pnpm run migrate:payload
   \`\`\`
3. Check the migration logs for any issues

## Media Files

${CONFIG.downloadMedia 
  ? 'Media files have been downloaded to the "media" directory'
  : 'Media files were not downloaded. Enable CONFIG.downloadMedia in the script to download them'
}
`;
    
    fs.writeFileSync(
      path.join(CONFIG.outputDir, 'README.md'),
      readmeContent
    );
    
    console.log('\n✅ Export completed successfully!');
    console.log(`📁 Output directory: ${CONFIG.outputDir}`);
  } catch (error) {
    console.error('❌ Error during conversion:', error);
  }
};

// Run the conversion
console.log('Starting WordPress XML to JSON conversion...');
convertToJson().catch(err => {
  console.error('Unhandled error:', err);
});
