
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// dotenv is now preloaded via -r dotenv/config in package.json script

import payload from 'payload';
import type { Payload } from 'payload';
import axios from 'axios';
import mime from 'mime-types';
import * as cheerio from 'cheerio';

// Define types from the cheerio namespace
type CheerioElementType = cheerio.Element; // Type for raw DOM elements
type CheerioAnyNodeType = cheerio.AnyNode;
type CheerioCollectionType<T> = cheerio.Cheerio<T>; // Type for a Cheerio collection, e.g. $(...)
type CheerioAPIType = cheerio.CheerioAPI; // Type for the $ instance itself
import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import config from '../src/payload.config';
import type { Post, Page, Category } from '../src/payload-types';

// PayloadRichTextNode will effectively be LexicalNode (defined later)
// For now, let's make it a broad type to avoid cascading errors before LexicalNode is defined.
// Aligned with LexicalNode structure
type PayloadRichTextNode = LexicalNode;

// Explicitly defined to match LexicalTextNode for clarity
type PayloadTextNode = {
  type: 'text';
  text: string;
  version: 1;
  format?: number;
  style?: string;
  detail?: number;
  mode?: 'normal' | 'token' | 'segmented';
};

// Explicitly defined to match LexicalParagraphNode for clarity
type PayloadParagraphNode = {
  type: 'paragraph';
  version: 1;
  children: Array<PayloadTextNode | LexicalLinkNode>; // Allows text and link nodes
  direction: 'ltr' | 'rtl' | null;
  format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify';
  indent: number;
};

interface PayloadRichText {
  [key: string]: unknown; // Allow arbitrary fields from Lexical
  type: 'root';
  children: LexicalBlockNode[];
  direction: 'ltr' | 'rtl' | null;
  format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify';
  indent: number;
  version: number;
}

interface PayloadRichTextFieldWrapper {
  root: PayloadRichText;
  [key: string]: unknown; // Allow other potential wrapper fields
}

interface PayloadLink {
  type?: 'reference' | 'custom' | null;
  newTab?: boolean | null;
  reference?: {
    relationTo: 'pages';
    value: number | Page;
  } | null;
  url?: string | null;
  label: string;
  appearance?: 'default' | 'outline' | null;
}

interface ContentBlock {
  blockType: 'content';
  richText: PayloadRichTextFieldWrapper;
}

interface CallToActionBlock {
  blockType: 'cta';
  richText: PayloadRichText;
  links: Array<{
    link: PayloadLink;
  }>;
}

interface MediaBlock {
  blockType: 'media';
  richText: PayloadRichText;
}

interface ArchiveBlock {
  blockType: 'archive';
  richText: PayloadRichText;
}

interface FormBlock {
  blockType: 'form';
  richText: PayloadRichText;
}

type Block = ContentBlock | CallToActionBlock | MediaBlock | ArchiveBlock | FormBlock;

interface BlockTypes {
  content: ContentBlock;
  cta: CallToActionBlock;
  media: MediaBlock;
  archive: ArchiveBlock;
  form: FormBlock;
};

interface PayloadBase {
  id?: string;
  title: string;
  slug: string;
  _status: 'published' | 'draft';
  meta: {
    title: string;
    description: string;
  };
  createdAt?: string;
  updatedAt?: string;
  sizes?: unknown;
}

interface PayloadNode {
  type: string;
  version: number;
  format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify';
  indent: number;
  [key: string]: unknown;
}

interface PayloadText extends PayloadNode {
  type: 'text';
  text: string;
}

interface PayloadParagraph extends PayloadNode {
  type: 'paragraph';
  children: PayloadText[];
}

interface PayloadRoot extends PayloadNode {
  type: 'root';
  direction: 'ltr' | 'rtl' | null;
  children: PayloadParagraph[];
}

interface PayloadPost extends PayloadBase {
  content: PayloadRichText;
  publishedAt?: string;
  authors?: User[] | null;
  categories?: Category[] | null;
}

interface PayloadPage extends PayloadBase {
  hero: {
    type: 'lowImpact';
    richText: PayloadRichText;
  };
  layout: {
    blockType: string;
    richText?: PayloadRichText;
    links?: PayloadLink[];
  }[];
}

interface PostData {
  title: string;
  slug: string;
  _status: 'published' | 'draft';
  meta: {
    title: string;
    description: string;
  };
  content: PayloadRichText;
  author?: {
    relationTo: 'users';
    value: string;
  } | null;
  categories?: Array<{
    relationTo: 'categories';
    value: string;
  }> | null;
  publishedAt?: string;
}

interface PageData {
  title: string;
  slug: string;
  _status: 'draft' | 'published';
  meta: {
    title: string;
    description: string;
  };
  hero: {
    type: 'lowImpact' | 'highImpact' | 'mediumImpact' | 'none';
    richText: PayloadRichText;
  };
  layout: Block[];
  author?: string;
  categories?: string[];
}

interface WPUser {
  id: string;
  email: string;
  name: string;
  status: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  _status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

interface WPPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: string;
  date?: string;
  excerpt?: string;
  creator?: string;
  categories?: string[];
  seo?: {
    title?: string;
    description?: string;
  };
}

interface WPPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: string;
  date?: string;
  seo?: {
    title?: string;
    description?: string;
  };
}

interface PayloadData {
  id: number;
  title: string;
  slug: string;
  content: PayloadRichText;
  _status: 'published' | 'draft';
  publishedAt?: string;
  meta: {
    title: string;
    description: string;
  };
  categories?: { relationTo: 'categories'; value: string; }[] | null;
  author?: { relationTo: 'users'; value: string; } | null;
  createdAt?: string;
  updatedAt?: string;
  sizes?: unknown;
}

interface ImportedPost {
  title: string;
  slug: string;
  content: string;
  status: string;
  date?: string;
  seo?: {
    title?: string;
    description?: string;
  };
  excerpt?: string;
  creator?: string;
  categories?: string[];
}

interface ImportedPage {
  title: string;
  slug: string;
  content: string;
  status: string;
  date?: string;
  seo?: {
    title?: string;
    description?: string;
  };
}

interface RichTextNode {
  type: string;
  format: string;
  indent: number;
  version: number;
  direction?: 'ltr' | 'rtl' | null;
  children: Array<{
    type: string;
    format: string | number;
    indent?: number;
    version: number;
    text?: string;
    children?: RichTextNode[];
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

interface CreatePostData {
  title: string;
  slug: string;
  content: PayloadRichTextFieldWrapper;
  publishedAt?: string;
  _status: 'draft' | 'published';
  categories?: (number | Category)[];
  author?: { relationTo: 'users'; value: string };
  meta: {
    title: string;
    description: string;
  };
}

interface CreatePageData {
  title: string;
  slug: string;
  hero: {
    type: 'lowImpact' | 'highImpact' | 'mediumImpact' | 'none';
    richText: PayloadRichTextFieldWrapper;
  };
  layout: {
    blockType: string;
    richText: PayloadRichTextFieldWrapper;
    links?: {
      type: string;
      label: string;
      url: string;
    }[];
  }[];
  _status: 'draft' | 'published';
  meta?: {
    title?: string;
    description?: string;
  };
}

interface WPCategory {
  id: string;
  name: string;
  slug: string;
}

interface Author {
  login: string;
  email: string;
  displayName: string;
}

// Duplicate cheerio import removed from here (originally line 352)

type LexicalTextFormat = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code' | 'subscript' | 'superscript';

interface LexicalTextNode {
  [key: string]: unknown;
  type: 'text';
  text: string;
  version: 1;
  format?: number; // Bitmask for formats like bold, italic
  style?: string; // For inline styles, though typically not recommended to generate directly
  detail?: number; // For segmented, token, or immutable text nodes
  mode?: 'normal' | 'token' | 'segmented'; // Mode of the text node
}

interface LexicalLinkNode {
  [key: string]: unknown;
  type: 'link';
  version: 1;
  children: Array<LexicalTextNode | LexicalLinkNode>; // Adjusted to allow nested links or text, as per processChildren output
  direction: 'ltr' | 'rtl' | null;
  format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify';
  indent: number;
  rel?: string | null;
  target?: string | null;
  title?: string | null;
  url: string; // For payload < 3.0, this was part of `fields`
  // For payload 3.0+ link structure:
  fields?: {
    doc?: { value: string | object, relationTo: string } | null;
    linkType?: 'internal' | 'custom' | null;
    newTab?: boolean | null;
    url?: string | null;
  };
}

interface LexicalListItemNode {
  [key: string]: unknown;
  type: 'listitem';
  version: 1;
  children: Array<LexicalTextNode | LexicalLinkNode | LexicalListNode>; // List items can contain text, links, or nested lists
  direction: 'ltr' | 'rtl' | null;
  format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify';
  indent: number;
  value: number; // For ordered lists, the number of the item
}

interface LexicalListNode {
  [key: string]: unknown;
  type: 'list';
  version: 1;
  children: LexicalListItemNode[];
  direction: 'ltr' | 'rtl' | null;
  format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify';
  indent: number;
  listType: 'bullet' | 'number' | 'check';
  start: number; // For ordered lists, the start number
  tag: 'ul' | 'ol';
}

interface LexicalHeadingNode {
  [key: string]: unknown;
  type: 'heading';
  version: 1;
  children: Array<LexicalTextNode | LexicalLinkNode>; // Headings can contain text or links
  direction: 'ltr' | 'rtl' | null;
  format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify';
  indent: number;
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

interface LexicalParagraphNode {
  [key: string]: unknown;
  type: 'paragraph';
  version: 1;
  children: Array<LexicalTextNode | LexicalLinkNode>; // Paragraphs can contain text or links
  direction: 'ltr' | 'rtl' | null;
  format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify';
  indent: number;
}

type LexicalInlineNode = LexicalTextNode | LexicalLinkNode;
type LexicalBlockNode = LexicalParagraphNode | LexicalHeadingNode | LexicalListNode;
type LexicalNode = LexicalBlockNode | LexicalInlineNode; // General node type

const TEXT_FORMAT_MAP: Record<LexicalTextFormat, number> = {
  bold: 1,
  italic: 1 << 1,
  strikethrough: 1 << 2,
  underline: 1 << 3,
  code: 1 << 4,
  subscript: 1 << 5,
  superscript: 1 << 6,
};

const htmlToLexical = (html: string): PayloadRichText => {
  const $: CheerioAPIType = cheerio.load(html);
  const children: LexicalBlockNode[] = []; // Root children should be block nodes

  function processNode(node: CheerioElementType, $: CheerioAPIType): LexicalBlockNode | null {
    const element = $(node);
    let lexicalBlockNode: LexicalBlockNode | null = null;

    // Handle text nodes directly
    if (node.type === 'text') {
      const textContent = element.text().trim();
      if (textContent) {
        // Wrap root-level or block-expected text in a paragraph
        return {
          type: 'paragraph',
          version: 1,
          children: [{ type: 'text', text: textContent, version: 1, format: 0 }],
          direction: null,
          format: '',
          indent: 0,
        };
      }
      return null;
    }

    // Handle element nodes
    const tagName = node.tagName?.toLowerCase();

    // Recursive function to process children and build up text/link nodes
    function processChildren(element: CheerioCollectionType<CheerioElementType>, $: CheerioAPIType): Array<LexicalTextNode | LexicalLinkNode> {
      const processedChildren: Array<LexicalTextNode | LexicalLinkNode> = [];
      element.contents().each((index: number, childNode: CheerioElementType) => {
        const child = $(childNode);
        if (childNode.type === 'text') {
          const text = child.text();
          if (text.trim() || text) { // Keep whitespace if it's part of formatting
            processedChildren.push({ type: 'text', text: text, version: 1 });
          }
        } else if (childNode.type === 'tag') {
          let format = 0; // 'let' is appropriate here due to bitwise modifications (|=)
          const childTagName = childNode.tagName.toLowerCase();
          const currentElementForFormat = $(childNode);

          // Simple format detection - can be expanded
          if (childTagName === 'strong' || childTagName === 'b') format |= TEXT_FORMAT_MAP.bold;
          if (childTagName === 'em' || childTagName === 'i') format |= TEXT_FORMAT_MAP.italic;
          // Add more format handlers (underline, strikethrough) if needed

          if (childTagName === 'a') {
            const linkNode: LexicalLinkNode = {
              type: 'link',
              version: 1,
              children: processChildren(currentElementForFormat, $), // Process children of the link
              direction: null,
              format: '',
              indent: 0,
              url: currentElementForFormat.attr('href') || '',
              fields: { // Payload 3.0 link structure
                linkType: 'custom',
                url: currentElementForFormat.attr('href') || '',
                newTab: currentElementForFormat.attr('target') === '_blank',
              }
            };
            processedChildren.push(linkNode);
          } else if (format !== 0) {
            // If it's a formatting tag, process its children and apply the format
            const formattedChildren = processChildren(currentElementForFormat, $);
            for (const fc of formattedChildren) {
              if (fc.type === 'text') {
                fc.format = (fc.format || 0) | format;
              }
            }
            processedChildren.push(...formattedChildren);
          } else {
            // If it's another unhandled tag within a block, recurse or ignore
            // For simplicity, we'll just grab its text content for now
            // A more robust solution would map more tags or handle them as separate blocks
            const textContent = child.text();
            if (textContent.trim()) {
                processedChildren.push({ type: 'text', text: textContent, version: 1, format: 0 });
            }
          }
        }
      });
      return processedChildren;
    }

    switch (tagName) {
      case 'p':
        lexicalBlockNode = { type: 'paragraph', version: 1, children: processChildren($(element), $), direction: null, format: '', indent: 0 };
        break;
      case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6':
        lexicalBlockNode = { type: 'heading', tag: tagName, version: 1, children: processChildren($(element), $), direction: null, format: '', indent: 0 };
        break;
      case 'ul':
      case 'ol': {
        const listItems: LexicalListItemNode[] = [];
        const liNodes = $(element).children('li');
        for (let i = 0; i < liNodes.length; i++) {
          const liElement = liNodes.get(i) as CheerioElement; // .get(i) returns cheerio.Element | undefined
          if (liElement) { // Ensure element exists
            listItems.push({
              type: 'listitem',
              version: 1,
              children: processChildren($(liElement), $),
              direction: null,
              format: '',
              indent: 0,
              value: i + 1,
            });
          }
        }
        lexicalBlockNode = { type: 'list', listType: tagName === 'ul' ? 'bullet' : 'number', tag: tagName, version: 1, children: listItems, direction: null, format: '', indent: 0, start: 1, };
        break;
      }
      // Note: 'a', 'strong', 'em', 'b', 'i' are handled by processChildren for inline conversion.
      // Direct children of the root that are inline will be wrapped in paragraphs by the fallback.
    }

    if (lexicalBlockNode) {
      return lexicalBlockNode;
    }
    // Fallback for unhandled block tags or root text: wrap in a paragraph
    if (node.type === 'tag' && element.text().trim()) {
        return { type: 'paragraph', version: 1, children: processChildren($(element), $), direction: null, format: '', indent: 0 };
    }
    return null;
  }

  // Process direct children of the body, or root if no body
  let baseSelection: CheerioCollectionType<CheerioAnyNodeType>;
  if ($('body').length > 0) {
    baseSelection = $('body') as CheerioCollectionType<CheerioAnyNodeType>;
  } else {
    baseSelection = $.root() as CheerioCollectionType<CheerioAnyNodeType>; // Call $.root() in a simpler context
  }

  const rootChildren = baseSelection.children(); // This is Cheerio<Element>
  
  // Iterate over the raw DOM elements obtained by .get()
  for (const el of rootChildren.get()) {
    // el is a raw CheerioElement (DOM Node)
    const processedNode = processNode(el, $); // processNode expects a raw element
    if (processedNode) {
      children.push(processedNode);
    }
  }
  
  // If nothing was processed and there's plain text, wrap it in a paragraph
  if (children.length === 0 && $.text().trim()) {
    children.push({
      type: 'paragraph',
      version: 1,
      children: [{ type: 'text', text: $.text().trim(), version: 1 }],
      direction: null,
      format: '',
      indent: 0,
    });
  }

  return {
    type: 'root',
    children: children.length > 0 ? children : [{ type: 'paragraph', version: 1, children: [{ type: 'text', text: '', version: 1, }], direction: null, format: '', indent: 0, }], // Ensure there's always at least one paragraph
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  };
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const CONFIG = {
  inputDir: path.join(__dirname, '../migration-output'),
  logFile: path.join(__dirname, '../logs/import-log.txt'),
  dryRun: false, // Set to true to test without creating records
  skipExisting: true, // Skip if records already exist
};

if (!fs.existsSync(path.dirname(CONFIG.logFile))) {
  fs.mkdirSync(path.dirname(CONFIG.logFile), { recursive: true });
}

fs.writeFileSync(CONFIG.logFile, `--- Migration Log Started at ${new Date().toISOString()} ---\n\n`);

const log = (message: string): void => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  
  console.log(message);
  
  fs.appendFileSync(CONFIG.logFile, `${logMessage}\n`);
};

const logError = (message: string, error?: Error): void => {
  const timestamp = new Date().toISOString();
  const errorMessage = `[${timestamp}] ERROR: ${message}\n${error ? `${error.message}\n${error.stack}` : ''}`;
  
  console.error(`ERROR: ${message}`);
  if (error) {
    console.error(error);
  }
  
  fs.appendFileSync(CONFIG.logFile, `${errorMessage}\n`);
};

const loadJson = <T>(filename: string): T[] => {
  const filePath = path.join(CONFIG.inputDir, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const createCategory = async (category: WPCategory): Promise<string> => {
  if (!CONFIG.dryRun) {
    const result = await payload.create({
      collection: 'categories',
      data: {
        title: category.name,
        slug: category.slug,
      },
    });
    return (result as { id: string | number }).id.toString();
  }
  return 'dry-run-id';
};

const importCategories = async (): Promise<Record<string, string>> => {
  log('Importing categories...');
  const categories = loadJson<WPCategory>('categories.json');
  const categoryMap: Record<string, string> = {};
  let importCount = 0;

  for (const category of categories) {
    try {
      const existingCategories = await payload.find({
        collection: 'categories',
        where: { slug: { equals: category.slug } },
      });

      if (existingCategories.docs.length > 0 && CONFIG.skipExisting) {
        log(`⏭️  Category already exists: ${category.name}`);
        categoryMap[category.id.toString()] = existingCategories.docs[0].id.toString();
        continue;
      }

      const categoryId = await createCategory(category);
      categoryMap[category.id.toString()] = categoryId;

      importCount++;
      log(`✅ Created category: ${category.name}`);
    } catch (error) {
      logError(`Failed to create category ${category.name}`, error as Error);
    }
  }

  log(`Imported ${importCount} categories`);
  return categoryMap;
};

const createUser = async (user: WPUser): Promise<string> => {
  if (!CONFIG.dryRun) {
    const userData = {
      email: user.email,
      name: user.name,
      _status: 'published',
      password: 'TempPassword123!', // Users should change this ASAP
    };

    const result = await payload.create({
      collection: 'users',
      data: userData,
    });
    return (result as { id: string | number }).id.toString();
  }
  return 'dry-run-id';
};

const importUsers = async (): Promise<Record<string, string>> => {
  log('Importing users...');
  const users = loadJson<Author>('authors.json'); // Changed WPUser to Author and users.json to authors.json
  const userMap: Record<string, string> = {};
  let importCount = 0;

  for (const user of users) {
    try {
      const existingUsers = await payload.find({
        collection: 'users',
        where: { email: { equals: user.email } },
      });

      if (existingUsers.docs.length > 0 && CONFIG.skipExisting) {
        log(`⏭️  User already exists: ${user.displayName} (Email: ${user.email})`);
        userMap[user.login.toString()] = existingUsers.docs[0].id.toString(); // Use user.login for map key
        continue;
      }

      const userId = await createUser({
        id: user.login, // Map login to id
        email: user.email,
        name: user.displayName, // Map displayName to name
        status: 'published', // Default status to 'published'
      } as WPUser);
      userMap[user.login.toString()] = userId; // Use user.login for map key
      userMap[user.login.toString()] = userId; // Use user.login for map key

      importCount++;
      log(`✅ Created user: ${user.displayName} (Email: ${user.email})`);
    } catch (error) {
      logError(`Failed to create user ${user.displayName} (Email: ${user.email})`, error as Error);
    }
  }

  log(`Imported ${importCount} users`);
  return userMap;
};

// Define the structure of items in media.json
interface MediaItem {
  id: string;
  url: string;
  alt?: string; // Optional alt text from media.json
}

// Minimal type for Payload error data
interface PayloadErrorData {
  field?: string;
  message: string;
}

interface PayloadErrorCause {
  data?: PayloadErrorData[];
  // Payload errors might have other properties, but 'data' is common for validation.
}

const importMedia = async (payload: Payload): Promise<Record<string, string>> => {
  log('Processing media...');
  const mediaItems = loadJson<MediaItem>('media.json');
  const mediaMap: Record<string, string> = {};
  let successCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const media of mediaItems) {
    try {
      if (CONFIG.dryRun) {
        log(`DRY RUN: Would process media item ${media.id} (URL: ${media.url})`);
        mediaMap[media.id] = `dry-run-media-id-${media.id}`;
        successCount++;
        continue;
      }

      // Check if media with this WordPress ID already exists
      const existingMedia = await payload.find({
        collection: 'media',
        where: {
          wordpressId: { // Ensure this field exists in your Payload media collection
            equals: media.id,
          },
        },
        limit: 1,
      });

      if (existingMedia.docs.length > 0) {
        const existingDoc = existingMedia.docs[0];
        mediaMap[media.id] = String(existingDoc.id);
        skippedCount++;
        log(`⏭️ Media item ${media.id} (WP ID) already exists as ${existingDoc.id} (Payload ID). Skipping download.`);
        continue; 
      }

      // If not found, and not dryRun, proceed with download and creation
      log(`Downloading: ${media.url}`);
      const response = await axios.get(media.url, { responseType: 'arraybuffer' });

      const urlObject = new URL(media.url);
      const filename = path.basename(urlObject.pathname);
      const mimeType = mime.lookup(filename) || 'application/octet-stream';

      

      const defaultAltText = filename.substring(0, filename.lastIndexOf('.')) || filename;
      const altText = media.alt || defaultAltText.replace(/[-_]/g, ' ');

      // Extract YYYY/MM/ prefix from media.url
      let prefixedFilename = filename; // Default to original filename
      // const urlParts = media.url.match(/\/uploads\/(\d{4}\/\d{2})\//);
      // if (urlParts?.[1]) {
      //   const datePrefix = `${urlParts[1]}/`; // e.g., "2018/02/"
      //   prefixedFilename = `${datePrefix}${filename}`;
      //   log(`Uploading ${filename} as ${prefixedFilename} (${(response.data.byteLength / 1024).toFixed(2)} KB) to Payload...`);
      // } else {
      //   log(`⚠️ Could not extract YYYY/MM from URL: ${media.url}. Uploading ${filename} without date prefix.`);
      //   // Log without the 'as prefixedFilename' part if no prefix is applied
      //   log(`Uploading ${filename} (${(response.data.byteLength / 1024).toFixed(2)} KB) to Payload...`);
      // }


      const newMediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: altText,
          wordpressId: media.id, // Store the WordPress ID
        },
        file: {
          name: prefixedFilename, // Use prefixed filename
          data: Buffer.from(response.data),
          mimetype: mimeType,
          size: response.data.byteLength,
        },
      });

      mediaMap[media.id] = String(newMediaDoc.id);
      successCount++;
      log(`✅ Successfully imported ${filename} as ${newMediaDoc.id} (Payload) from ${media.id} (Original WP ID)`);

    } catch (error) {
      failedCount++;
      log(`Error processing media item ${media.id} (URL: ${media.url}):`);
      if (axios.isAxiosError(error)) {
        log(`  Axios Error: ${error.message}`);
        if (error.response) {
          log(`  Status: ${error.response.status}`);
          log(`  Response Data: ${JSON.stringify(error.response.data)}`);
        }
      } else if (error instanceof Error) {
        log(`  Error: ${error.message}`);
        if (error.cause && typeof error.cause === 'object' && 'data' in error.cause) {
            const payloadErrorCause = error.cause as PayloadErrorCause;
            if (payloadErrorCause.data) {
              log(`  Payload Error Details: ${JSON.stringify(payloadErrorCause.data)}`);
            } else {
              log(`  Payload Error Cause: ${JSON.stringify(error.cause)}`);
            }
        } else {
           log(`  Error cause: ${JSON.stringify(error.cause)}`); // Log cause even if no 'data' field
        }
      } else {
        log(`  Unknown error: ${String(error)}`);
      }
    }
  }

  log(`Media import summary: 
    Successfully imported: ${successCount}
    Skipped (already existing): ${skippedCount}
    Failed: ${failedCount}
    Total processed: ${mediaItems.length}`);
  if (failedCount > 0) {
    log(`${failedCount} media items failed to import. Please check the logs above for details.`);
  }
  return mediaMap;
};

// Define a minimal interface for the 'req' object for the script context
interface ScriptPayloadRequest {
  payload: Payload; // Hooks like revalidatePost expect req.payload
  skipRevalidation?: boolean; // Our custom flag
}

const importPosts = async (categoryMap: Record<string, string>, userMap: Record<string, string>, mediaMap: Record<string, string>) => {
  log('Importing posts...');
  const posts = loadJson<WPPost>('posts.json');
  let importCount = 0;

  for (const post of posts) {
    try {
      const existingPosts = await payload.find({
        collection: 'posts',
        where: { slug: { equals: post.slug } },
      });

      if (existingPosts.docs.length > 0 && CONFIG.skipExisting) {
        log(`⏭️  Post already exists: ${post.title}`);
        continue;
      }

      const postCategories: string[] = [];
      if (post.categories && Array.isArray(post.categories)) {
        const categories = loadJson<WPCategory>('categories.json');
        for (const categoryName of post.categories) {
          const category = categories.find(c => c.name === categoryName);
          if (category && categoryMap[category.id]) {
            postCategories.push(categoryMap[category.id]);
          }
        }
      }

      if (!CONFIG.dryRun) {
        const createPost = async (post: WPPost): Promise<void> => {
          const postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'sizes'> = {
            title: post.title,
            slug: post.slug,
            _status: post.status === 'publish' ? 'published' : 'draft',
            meta: {
              title: post.seo?.title || post.title,
              description: post.seo?.description || '',
            },
            content: { root: htmlToLexical(post.content) },
            publishedAt: post.date,
          };

          await payload.create({
            collection: 'posts',
            data: postData,
            req: {
              payload: payload, // Pass the payload instance
              skipRevalidation: true,
            } as ScriptPayloadRequest,
          });
        };

        await createPost(post);

        importCount++;
        log(`✅ Created post: ${post.title}`);
      } else {
        log(`[DRY RUN] Would create post: ${post.title}`);
      }
    } catch (error) {
      logError(`Failed to create post ${post.title}`, error as Error);
    }
  }

  log(`Imported ${importCount} posts`);
};

const importPages = async (mediaMap: Record<string, string>) => {
  log('Importing pages...');
  const pages = loadJson<WPPage>('pages.json');
  let importCount = 0;

  for (const page of pages) {
    try {
      const existingPages = await payload.find({
        collection: 'pages',
        where: { slug: { equals: page.slug === 'home' ? '' : page.slug } },
      });

      if (existingPages.docs.length > 0 && CONFIG.skipExisting) {
        log(`⏭️  Page already exists: ${page.title}`);
        continue;
      }

      const richText = htmlToLexical(page.content || '');

      const pageBlocks: ContentBlock[] = [{
          blockType: 'content',
          richText: { root: htmlToLexical(page.content || '') },
        }];

      if (!CONFIG.dryRun) {
        const createPage = async (page: WPPage): Promise<void> => {
          const pageData: Omit<Page, 'id' | 'createdAt' | 'updatedAt' | 'sizes'> = {
            title: page.title,
            slug: page.slug === 'home' ? '' : page.slug,
            _status: page.status === 'publish' ? 'published' : 'draft',
            meta: {
              title: page.seo?.title || page.title,
              description: page.seo?.description || '', // WPPage has no excerpt; simplified fallback. TODO: Refine plain text extraction from page.content if needed.
            },
            hero: {
              type: 'lowImpact' as const,
              richText: { root: htmlToLexical(page.content || '') },
            },
            layout: pageBlocks,
          };

          await payload.create({
            collection: 'pages',
            data: pageData,
          });
        };

        await createPage(page);

        log(`✅ Created page: ${page.title}`);
        importCount++;
      } else {
        log(`[DRY RUN] Would create page: ${page.title}`);
      }
    } catch (error) {
      logError(`Failed to create page ${page.title}`, error as Error);
    }
  }

  log(`Imported ${importCount} pages`);
};

const runImport = async () => {
  log('Starting JSON to PayloadCMS import...');
  try {
    // Check if JSON files exist
    const requiredFiles = ['categories.json', 'authors.json', 'posts.json', 'pages.json', 'media.json'];
    for (const file of requiredFiles) {
      const filePath = path.join(CONFIG.inputDir, file);
      if (!fs.existsSync(filePath)) {
        throw new Error(`Required file not found: ${file}`);
      }
    }

    // Initialize PayloadCMS
    log('Initializing PayloadCMS...');
    await payload.init({
      config,
    });
    log('✅ PayloadCMS initialized successfully');

    // Import categories
    const categoryMap = await importCategories();
    log(`✅ Category import complete. ${Object.keys(categoryMap).length} categories processed.`);

    // Import users
    const userMap = await importUsers();
    log(`✅ User import complete. ${Object.keys(userMap).length} users processed.`);

    // Import media
    const mediaMap = await importMedia(payload);
    log(`✅ Media import complete. ${Object.keys(mediaMap).length} media items processed.`);

    // Import posts
    await importPosts(categoryMap, userMap, mediaMap);
    log('✅ Post import complete.');

    // Import pages
    await importPages(mediaMap);
    log('✅ Page import complete.');

    log('✨ Import process completed successfully!');
  } catch (error) {
    logError('Import process failed', error as Error);
    process.exit(1);
  }
};

// Run the import
runImport().catch(err => {
  logError('Import failed', err as Error);
  process.exit(1);
});
