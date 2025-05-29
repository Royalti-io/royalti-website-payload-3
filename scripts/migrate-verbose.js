// WordPress to PayloadCMS Migration Script - Verbose Mode
import payload from 'payload';
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
  dryRun: true, // Set to true to test without actually creating records
  skipMedia: true, // Skip media for faster testing
  skipUsers: false,
  logDir: path.join(__dirname, '../logs'),
  logFile: path.join(__dirname, '../logs/verbose-migration.log'),
};

// Create log directory if it doesn't exist
if (!fs.existsSync(CONFIG.logDir)) {
  fs.mkdirSync(CONFIG.logDir, { recursive: true });
}

// Simple logging functions
const log = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  
  // Log to console
  console.log(message);
  
  // Log to file
  fs.appendFileSync(CONFIG.logFile, `${logMessage}\n`);
};

const logError = (message, error) => {
  const timestamp = new Date().toISOString();
  const errorMessage = `[${timestamp}] ERROR: ${message}\n${error ? `${error.message}\n${error.stack}` : ''}`;
  
  // Log to console
  console.error(`ERROR: ${message}`);
  if (error) {
    console.error(error);
  }
  
  // Log to file
  fs.appendFileSync(CONFIG.logFile, `${errorMessage}\n`);
};

// Main migration function
const runMigration = async () => {
  log('🚀 Starting WordPress to PayloadCMS migration - VERBOSE MODE');
  log(`📁 Using XML file: ${CONFIG.xmlFile}`);
  
  try {
    // Read and parse the WordPress XML export
    log('Reading XML file...');
    const xmlData = fs.readFileSync(CONFIG.xmlFile, 'utf8');
    log(`Successfully read ${Math.round(xmlData.length / 1024)} KB of XML data`);
    
    log('Parsing XML data...');
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
    log('Successfully parsed WordPress XML');
    
    // Extract basic statistics for verification
    const channel = wpData.rss?.channel;
    
    if (!channel) {
      throw new Error('Could not find channel in WordPress XML');
    }
    
    const items = channel.item || [];
    const posts = items.filter(item => {
      const postType = item['wp:post_type'];
      return postType?.__cdata === 'post' || postType === 'post';
    });
    
    const pages = items.filter(item => {
      const postType = item['wp:post_type'];
      return postType?.__cdata === 'page' || postType === 'page';
    });
    
    log(`Found ${items.length} total items`);
    log(`Found ${posts.length} posts`);
    log(`Found ${pages.length} pages`);
    
    // Initialize PayloadCMS
    log('Initializing PayloadCMS...');
    log(`Database URI environment variable: ${process.env.DATABASE_URI ? 'Set' : 'NOT SET'}`);
    
    try {
      await payload.init({
        secret: process.env.PAYLOAD_SECRET || 'test-migration-secret',
        local: true,
      });
      log('✅ PayloadCMS initialized successfully');
      
      // Only proceed if initialization is successful
      log('🔍 Checking collections...');
      const collections = payload.collections;
      
      if (collections) {
        const collectionNames = Object.keys(collections);
        log(`Available collections: ${collectionNames.join(', ')}`);
        
        // Try a simple database query to verify connection
        log('Testing database connection with a simple query...');
        try {
          const categoriesResult = await payload.find({
            collection: 'categories',
            limit: 1,
          });
          
          log(`Database query successful, found ${categoriesResult.docs.length} categories`);
          
          // If we got here, we have a working PayloadCMS connection
          log('✅ Database connection verified');
          log('✅ Ready to proceed with migration');
          
          // Report success but skip actual migration in verbose mode
          log('VERBOSE MODE: Migration body skipped for verification purposes');
          log('To run the complete migration, use the main migrate-royalti-improved.js script');
        } catch (dbError) {
          logError('Database query failed', dbError);
        }
      } else {
        logError('No collections found in PayloadCMS');
      }
    } catch (payloadError) {
      logError('Failed to initialize PayloadCMS', payloadError);
    }
    
  } catch (error) {
    logError('Migration failed', error);
    process.exit(1);
  }
  
  log('🏁 Verbose migration check completed');
};

// Run the migration
log('Starting migration script...');
runMigration().catch(err => {
  logError('Uncaught error in migration script', err);
  process.exit(1);
});
