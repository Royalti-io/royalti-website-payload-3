import path from 'node:path';
import { fileURLToPath } from 'node:url';
// dotenv is now preloaded via -r dotenv/config in package.json script

import payload from 'payload';
import type { Payload, PayloadRequest } from 'payload';
import axios from 'axios';
import mime from 'mime-types';
import * as cheerio from 'cheerio';

// Define cheerio types using any to resolve compatibility issues with Cheerio 1.0.0
// This is a workaround for the build process and should be revisited when time permits
type CheerioElementType = any;
type CheerioAnyNodeType = any;
type CheerioCollectionType<T> = any;
type CheerioAPIType = any;
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
  excerpt: string;
  publishDate: string;
  status: string;
  creator: string;
  categories: string[];
  tags?: string[];
  seo?: {
    title?: string;
    description?: string;
  };
  featuredImageId?: string;
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

interface WPTag {
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

// Helper function to extract WordPress image ID from a URL or class
const extractWpImageId = (imgElement: CheerioCollectionType<CheerioElementType>): string | null => {
  // Try to extract from class name (wp-image-XXXXX)
  const className = imgElement.attr('class') || '';
  const classMatch = className.match(/wp-image-([0-9]+)/);
  if (classMatch && classMatch[1]) {
    return classMatch[1];
  }
  
  // Try to extract from parent anchor href
  const parentHref = imgElement.parent('a').attr('href') || '';
  const urlMatch = parentHref.match(/\/wp-content\/uploads\/[^\/]+\/([^\/]+)\.[a-zA-Z]+$/);
  if (urlMatch && urlMatch[1]) {
    // This is just the filename, not the ID, but it can help find the media
    return urlMatch[1];
  }
  
  return null;
};

const htmlToLexical = (html: string, mediaMap?: Record<string, string>): PayloadRichText => {
  const $: CheerioAPIType = cheerio.load(html);
  const children: LexicalBlockNode[] = []; // Root children should be block nodes

  // Pre-process: Extract all img tags and create media blocks for them
  // This handles standalone images not nested in paragraphs
  $('img:not(p img, h1 img, h2 img, h3 img, h4 img, h5 img, h6 img, li img)').each((_, img) => {
    const imgElement = $(img);
    const mediaBlock = createMediaBlockFromImg(imgElement, mediaMap);
    if (mediaBlock) {
      children.push(mediaBlock);
    }
    // Remove this image from the DOM so it doesn't get processed again
    imgElement.remove();
  });

  function createMediaBlockFromImg(imgElement: CheerioCollectionType<CheerioElementType>, mediaMap?: Record<string, string>): any {
    // Extract the WordPress image ID or media details
    const wpImageId = extractWpImageId(imgElement);
    const src = imgElement.attr('src') || '';
    const alt = imgElement.attr('alt') || '';
    
    // Try to find media ID from mediaMap
    let mediaId: string | number | null = null;
    
    if (wpImageId && mediaMap && mediaMap[wpImageId]) {
      mediaId = Number(mediaMap[wpImageId]);
    } else if (mediaMap) {
      // Try to match by filename in the src attribute
      const filename = src.split('/').pop()?.split('?')[0] || '';
      for (const [oldId, newId] of Object.entries(mediaMap)) {
        if (src.includes(oldId) || oldId.includes(filename)) {
          mediaId = Number(newId);
          break;
        }
      }
    }
    
    // Create a media block
    if (mediaId) {
      return {
        type: 'block',
        fields: {
          blockName: alt || '', // Use alt text as block name if available
          blockType: 'mediaBlock',
          media: mediaId
        },
        format: '',
        version: 2,
        children: [], // Blocks don't need children
      };
    }
    
    // Fallback: Create a paragraph with text indicating the image couldn't be found
    return {
      type: 'paragraph',
      version: 1,
      children: [{ 
        type: 'text', 
        text: `[Image: ${alt || src}]`, 
        version: 1, 
        format: 0 
      }],
      direction: null,
      format: '',
      indent: 0,
    };
  }

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
    
    // Special handling for our custom-link elements
    if (tagName === 'custom-link') {
      const href = element.attr('href') || '';
      const target = element.attr('target');
      
      // Process the inner content of the link, which might include styled spans
      const linkChildren: Array<LexicalTextNode> = [];
      
      // Process all the content inside, including spans with styles
      element.find('span').each((_, spanEl) => {
        const span = $(spanEl);
        const style = span.attr('style') || '';
        const spanText = span.text();
        
        if (spanText.trim()) {
          // Parse formatting based on style
          let format = 0;
          
          // Parse font-weight for bold
          if (style.includes('font-weight:')) {
            const fontWeightMatch = style.match(/font-weight:\s*(\d+|bold|bolder)/i);
            if (fontWeightMatch) {
              const weight = fontWeightMatch[1];
              if (weight === 'bold' || weight === 'bolder' || (parseInt(weight, 10) >= 600)) {
                format |= TEXT_FORMAT_MAP.bold;
              }
            }
          }
          
          // Parse font-style for italic
          if (style.includes('font-style:') && style.includes('italic')) {
            format |= TEXT_FORMAT_MAP.italic;
          }
          
          // Add the text with formatting
          linkChildren.push({
            type: 'text',
            text: spanText,
            version: 1,
            format: format
          });
        }
      });
      
      // If no spans were found, use the entire text content
      if (linkChildren.length === 0) {
        linkChildren.push({
          type: 'text',
          text: element.text(),
          version: 1,
          format: 0
        });
      }
      
      // Create a link node wrapped in a paragraph (block node)
      const linkNode: LexicalLinkNode = {
        type: 'link',
        version: 1,
        children: linkChildren,
        direction: null,
        format: '',
        indent: 0,
        url: href,
        fields: {
          linkType: 'custom',
          url: href,
          newTab: target === '_blank'
        }
      };
      
      // Wrap in a paragraph since we must return a block node
      return {
        type: 'paragraph',
        version: 1,
        children: [linkNode],
        direction: null,
        format: '',
        indent: 0
      };
    }
    
    // Check for images within block elements
    if (tagName && ['p', 'div', 'figure'].includes(tagName)) {
      // Check if this element contains ONLY an image (plus optional anchor)
      const images = element.find('img');
      if (images.length === 1 && element.text().trim() === '') {
        // This paragraph/div contains only an image, convert to media block
        const mediaBlock = createMediaBlockFromImg(images, mediaMap);
        if (mediaBlock) {
          return mediaBlock;
        }
      }
    }

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

          // Skip processing images inside links, they'll be handled separately
          if (childTagName === 'img') {
            // Skip the image, it will be handled as a block
            return;
          }

          // Handle style attributes directly
          const styleAttr = currentElementForFormat.attr('style') || '';
          
          // Check for style attributes or our custom data attributes
          if (styleAttr || currentElementForFormat.attr('data-weight') || currentElementForFormat.attr('data-italic')) {
            // Parse font-weight for bold - either from style or data attribute
            if (currentElementForFormat.attr('data-weight') === 'true' || styleAttr.includes('font-weight:')) {
              if (currentElementForFormat.attr('data-weight') === 'true') {
                // Data attribute explicitly marks this as bold
                format |= TEXT_FORMAT_MAP.bold;
              } else if (styleAttr.includes('font-weight:')) {
                // Parse from style
                const fontWeightMatch = styleAttr.match(/font-weight:\s*(\d+|bold|bolder)/i);
                if (fontWeightMatch) {
                  const weight = fontWeightMatch[1];
                  // Apply bold formatting for weights >= 600 or 'bold'/'bolder'
                  if (weight === 'bold' || weight === 'bolder' || (parseInt(weight, 10) >= 600)) {
                    format |= TEXT_FORMAT_MAP.bold;
                  }
                }
              }
            }
            
            // Parse font-style for italic - either from style or data attribute
            if (currentElementForFormat.attr('data-italic') === 'true' || 
                (styleAttr.includes('font-style:') && styleAttr.includes('italic'))) {
              format |= TEXT_FORMAT_MAP.italic;
            }
            
            // Parse text decoration
            if (styleAttr.includes('text-decoration:')) {
              if (styleAttr.includes('underline')) format |= TEXT_FORMAT_MAP.underline;
              if (styleAttr.includes('line-through')) format |= TEXT_FORMAT_MAP.strikethrough;
            }
          }
          
          // Tag-based format detection
          if (childTagName === 'strong' || childTagName === 'b') format |= TEXT_FORMAT_MAP.bold;
          if (childTagName === 'em' || childTagName === 'i') format |= TEXT_FORMAT_MAP.italic;
          if (childTagName === 'u' || styleAttr.includes('text-decoration: underline')) format |= TEXT_FORMAT_MAP.underline;
          if (childTagName === 's' || childTagName === 'strike' || styleAttr.includes('text-decoration: line-through')) format |= TEXT_FORMAT_MAP.strikethrough;
          // Add more format handlers (underline, strikethrough) if needed

          if (childTagName === 'a') {
            // Check if this anchor contains only an image
            const anchorImages = currentElementForFormat.find('img');
            if (anchorImages.length === 1 && currentElementForFormat.text().trim() === '') {
              // Skip anchors that only contain images, they'll be handled as media blocks
              return;
            }
            
            // Get link attributes directly
            const href = currentElementForFormat.attr('href') || '';
            const target = currentElementForFormat.attr('target');
            const isPlainLink = currentElementForFormat.attr('data-plain-link') === 'true';
            
            // Important: Extract the full text of the link for fallback
            const linkText = currentElementForFormat.text().trim();
            
            // Process the children of the link to get any formatting
            let linkChildren: Array<LexicalTextNode | LexicalLinkNode> = [];
            
            // For plain links marked with data-plain-link, use simplified processing
            if (isPlainLink) {
              // For plain links, just use the link text directly
              linkChildren = [{
                type: 'text',
                text: linkText || href,
                version: 1,
                format: 0 // Plain text
              }];
            } else {
              // For complex links, use full processing
              // Get all direct child nodes and process them
              let hasProcessedChildren = false;
              
              // Special handling for direct text nodes inside links
              currentElementForFormat.contents().each((_, childNode) => {
                if (childNode.type === 'text' && $(childNode).text().trim()) {
                  linkChildren.push({
                    type: 'text',
                    text: $(childNode).text(),
                    version: 1,
                    format: 0 // Plain text
                  });
                  hasProcessedChildren = true;
                } else if (childNode.type === 'tag') {
                  const childTag = childNode.tagName.toLowerCase();
                  
                  // Special handling for spans inside links
                  if (childTag === 'span') {
                    const span = $(childNode);
                    const spanText = span.text();
                    if (spanText.trim()) {
                      // Determine formatting from styles
                      let format = 0;
                      const style = span.attr('style') || '';
                      const hasDataWeight = span.attr('data-weight') === 'true';
                      const hasDataItalic = span.attr('data-italic') === 'true';
                      
                      // Parse font-weight for bold - from style or data attribute
                      if (hasDataWeight || style.includes('font-weight:')) {
                        if (hasDataWeight) {
                          format |= TEXT_FORMAT_MAP.bold;
                        } else if (style.includes('font-weight:')) {
                          const fontWeightMatch = style.match(/font-weight:\s*(\d+|bold|bolder)/i);
                          if (fontWeightMatch) {
                            const weight = fontWeightMatch[1];
                            if (weight === 'bold' || weight === 'bolder' || (parseInt(weight, 10) >= 600)) {
                              format |= TEXT_FORMAT_MAP.bold;
                            }
                          }
                        }
                      }
                      
                      // Parse font-style for italic - from style or data attribute
                      if (hasDataItalic || (style.includes('font-style:') && style.includes('italic'))) {
                        format |= TEXT_FORMAT_MAP.italic;
                      }
                      
                      // Add formatted text node
                      linkChildren.push({
                        type: 'text',
                        text: spanText,
                        version: 1,
                        format: format
                      });
                      hasProcessedChildren = true;
                    }
                  } else {
                    // For other tags, try to process them recursively
                    const processedSubChildren = processChildren($(childNode), $);
                    if (processedSubChildren.length > 0) {
                      linkChildren.push(...processedSubChildren);
                      hasProcessedChildren = true;
                    }
                  }
                }
              });
              
              // If we somehow failed to extract any children, use the full link text as fallback
              if (!hasProcessedChildren && linkText) {
                linkChildren = [{
                  type: 'text',
                  text: linkText,
                  version: 1,
                  format: 0
                }];
              }
            }
            
            // Always create a link node, even if we couldn't extract formatted children
            const linkNode: LexicalLinkNode = {
              type: 'link',
              version: 1,
              children: linkChildren.length > 0 ? linkChildren : [{ type: 'text', text: linkText || href, version: 1, format: 0 }],
              direction: null,
              format: '',
              indent: 0,
              url: href,
              fields: {
                linkType: 'custom',
                url: href,
                newTab: target === '_blank'
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
          const liElement = liNodes.get(i) as CheerioElementType; // .get(i) returns cheerio.Element | undefined
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
      case 'img': {
        // Handle standalone images
        return createMediaBlockFromImg($(element), mediaMap);
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
  // Create two maps: one by ID and one by name for easier lookups
  const categoryMap: Record<string, string> = {};
  const categoryNameMap: Record<string, string> = {}; // Map name -> id
  let importCount = 0;

  for (const category of categories) {
    try {
      const existingCategories = await payload.find({
        collection: 'categories',
        where: { slug: { equals: category.slug } },
      });

      if (existingCategories.docs.length > 0 && CONFIG.skipExisting) {
        log(`⏭️  Category already exists: ${category.name}`);
        const categoryId = existingCategories.docs[0].id.toString();
        categoryMap[category.id.toString()] = categoryId;
        categoryNameMap[category.name] = categoryId; // Also store by name
        continue;
      }

      const categoryId = await createCategory(category);
      categoryMap[category.id.toString()] = categoryId;
      categoryNameMap[category.name] = categoryId; // Also store by name

      importCount++;
      log(`✅ Created category: ${category.name}`);
    } catch (error) {
      logError(`Failed to create category ${category.name}`, error as Error);
    }
  }

  log(`Imported ${importCount} categories`);
  // Return the name-to-id map for easier lookups by name
  return categoryNameMap;
};

const createTag = async (tag: WPTag): Promise<string> => {
  const result = await payload.create({
    collection: 'tags',
    data: {
      title: tag.name,
      slug: tag.slug,
    },
  });
  return (result as { id: string | number }).id.toString();
};

const importTags = async (): Promise<Record<string, string>> => {
  log('Importing tags...');
  const tags = loadJson<WPTag>('tags.json');
  const tagMap: Record<string, string> = {}; // id -> id mapping
  const tagNameMap: Record<string, string> = {}; // name -> id mapping
  let importCount = 0;
  
  for (const tag of tags) {
    try {
      const existingTags = await payload.find({
        collection: 'tags',
        where: { slug: { equals: tag.slug } },
      });
      if (existingTags.docs.length > 0 && CONFIG.skipExisting) {
        log(`⏭️  Tag already exists: ${tag.name}`);
        const tagId = existingTags.docs[0].id.toString();
        tagMap[tag.id.toString()] = tagId;
        tagNameMap[tag.name] = tagId; // Also store by name
        continue;
      }
      const result = await createTag(tag);
      tagMap[tag.id.toString()] = result;
      tagNameMap[tag.name] = result; // Also store by name
      importCount++;
      log(`✅ Created tag: ${tag.name}`);
    } catch (err) {
      logError(`Failed to import tag ${tag.name}`, err as Error);
    }
  }
  
  log(`Imported ${importCount} tags`);
  // Return the name-to-id map for easier lookups by name
  return tagNameMap;
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
      // const urlParts = media.url.match(/\/uploads\/(\d{4}\/\d{2})\//);
      // if (urlParts?.[1]) {
      //   const datePrefix = `${urlParts[1]}/`; // e.g., "2018/02/"
      //   const currentYear = datePrefix.split('/')[0];
      //   const currentMonth = datePrefix.split('/')[1];
      // }

      const newMediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: altText,
          wordpressId: media.id, // Store the WordPress ID
        },
        file: {
          name: filename, // Use prefixed filename
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
interface ScriptPayloadRequest extends Partial<PayloadRequest> {
  payload: Payload;
  skipRevalidation?: boolean;
}

const importPosts = async (categoryMap: Record<string, string>, userMap: Record<string, string>, mediaMap: Record<string, string>, tagMap: Record<string, string> = {}) => {
  log('Importing posts...');
  const posts = loadJson<WPPost>('posts.json');
  let importCount = 0;

  for (const post of posts) {
    try {
      const existingPosts = await payload.find({
        collection: 'posts',
        where: { title: { equals: post.title } },
      });

      if (existingPosts.docs.length > 0 && CONFIG.skipExisting) {
        log(`⏭️  Post already exists: ${post.title}`);
        continue;
      }

      // Map post categories
      const categoryIds: number[] = [];
      if (post.categories && Array.isArray(post.categories)) {
        const categories = loadJson<WPCategory>('categories.json');
        for (const categoryName of post.categories) {
          const category = categories.find(c => c.name === categoryName);
          if (category && categoryMap[category.id]) {
            // Convert string ID to number
            const categoryId = Number(categoryMap[category.id]);
            if (!isNaN(categoryId)) {
              categoryIds.push(categoryId);
            }
          }
        }
      }

      // Map post tags
      const tagIds: number[] = [];
      if (post.tags && Array.isArray(post.tags)) {
        const tags = loadJson<WPTag>('tags.json');
        for (const tagName of post.tags) {
          const tag = tags.find(t => t.name === tagName);
          if (tag && tagMap[tag.id]) {
            // Convert string ID to number
            const tagId = Number(tagMap[tag.id]);
            if (!isNaN(tagId)) {
              tagIds.push(tagId);
            }
          }
        }
      }

      // Extract featured image if present using the post.featuredImageId field
      let featuredImageId: number | null = null;
      
      if (post.featuredImageId && mediaMap[post.featuredImageId]) {
        featuredImageId = Number(mediaMap[post.featuredImageId]);
        log(`Set featured image ID to: ${featuredImageId} from WordPress featured image ID: ${post.featuredImageId}`);
      }

      // Preprocess content to replace [object Object]
      let processedContent = post.content.replace(/\[object Object\]/g, '');
      // Remove empty paragraphs
      processedContent = processedContent.replace(/<p>\s*<\/p>/g, '');
      
      // Special preprocessing for complex HTML content
      const tempDom = cheerio.load(processedContent);
      
      // First, clean up any empty spans that may be causing issues
      tempDom('span:empty').remove();
      
      // Process all links with spans inside them
      tempDom('a').each((_, link) => {
        const $link = tempDom(link);
        const href = $link.attr('href');
        const target = $link.attr('target');
        
        // Skip if no href
        if (!href) return;
        
        // Extract the link HTML - this preserves any spans inside with their formatting
        const linkInnerHtml = $link.html();
        
        // Check if this link is just plain text or contains styled spans
        const hasSpans = $link.find('span').length > 0;
        
        if (hasSpans) {
          // For links with spans, convert to our custom element for special handling
          $link.replaceWith(`<custom-link href="${href}" ${target ? `target="${target}"` : ''}>${linkInnerHtml}</custom-link>`);
        } else {
          // For simple links, make sure they're still properly processed
          // Keep them as regular <a> tags but normalize attributes
          $link.attr('data-plain-link', 'true');
        }
      });
      
      // Process any inline styles on spans outside of links
      tempDom('span[style]').each((_, span) => {
        const $span = tempDom(span);
        const style = $span.attr('style') || '';
        const text = $span.text().trim();
        
        // Only process non-empty spans that aren't inside links or custom-links
        if (text && !$span.parents('a, custom-link').length) {
          // Mark the span with data attributes for styling
          if (style.includes('font-weight:')) {
            $span.attr('data-weight', 'true');
          }
          if (style.includes('font-style:') && style.includes('italic')) {
            $span.attr('data-italic', 'true');
          }
        }
      });
      
      processedContent = tempDom.html() || processedContent;

      // Process content to replace media URLs with new media IDs
      
      // Look for image URLs in the content and replace them with the new media IDs
      Object.entries(mediaMap).forEach(([oldId, newId]) => {
        // Extract the filename from oldId if it's a URL
        const filename = oldId.split('/').pop();
        if (filename) {
          // Look for URLs containing this filename in the content
          const regex = new RegExp(`https?:\/\/royalti\.io\/wp-content\/uploads\/[^\s"']+${filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi');
          processedContent = processedContent.replace(regex, (match) => {
            log(`Replacing media URL: ${match} with ID: ${newId}`);
            return `/media/${newId}`;
          });
        }
      });

      if (!CONFIG.dryRun) {
        const createPost = async (post: WPPost): Promise<void> => {
          // Find author ID from creator name
          let authorId: string | null = null;
          if (post.creator && userMap[post.creator]) {
            authorId = userMap[post.creator];
          }
          
          // Find category IDs from names or create them on-the-fly if missing
          const categoryIds: string[] = [];
          if (post.categories && post.categories.length > 0) {
            // Process each category in sequence to avoid race conditions
            for (const categoryName of post.categories) {
              if (categoryMap[categoryName]) {
                // Category exists in map, use its ID
                categoryIds.push(categoryMap[categoryName]);
              } else {
                try {
                  // Look for the category by title first
                  const existingCategories = await payload.find({
                    collection: 'categories',
                    where: { title: { equals: categoryName } }
                  });
                  
                  if (existingCategories.docs.length > 0) {
                    // Category exists in database but wasn't in our map - add it
                    const categoryId = existingCategories.docs[0].id.toString();
                    categoryMap[categoryName] = categoryId;
                    categoryIds.push(categoryId);
                    log(`Found existing category: ${categoryName} (ID: ${categoryId})`);
                  } else if (!CONFIG.dryRun) {
                    // Category doesn't exist - create it on the fly
                    const slug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                    const newCategory = await payload.create({
                      collection: 'categories',
                      data: {
                        title: categoryName,
                        slug: slug
                      }
                    });
                    const newCategoryId = newCategory.id.toString();
                    categoryMap[categoryName] = newCategoryId;
                    categoryIds.push(newCategoryId);
                    log(`Created missing category on-the-fly: ${categoryName} (ID: ${newCategoryId})`);
                  }
                } catch (err) {
                  log(`WARNING: Failed to process category: ${categoryName} - ${err}`);
                }
              }
            }
          }
          
          // Find tag IDs from names or create them on-the-fly if missing
          const tagIds: string[] = [];
          if (post.tags && post.tags.length > 0) {
            // Process each tag in sequence to avoid race conditions
            for (const tagName of post.tags) {
              if (tagMap[tagName]) {
                // Tag exists in map, use its ID
                tagIds.push(tagMap[tagName]);
              } else {
                try {
                  // Look for the tag by title first
                  const existingTags = await payload.find({
                    collection: 'tags',
                    where: { title: { equals: tagName } }
                  });
                  
                  if (existingTags.docs.length > 0) {
                    // Tag exists in database but wasn't in our map - add it
                    const tagId = existingTags.docs[0].id.toString();
                    tagMap[tagName] = tagId;
                    tagIds.push(tagId);
                    log(`Found existing tag: ${tagName} (ID: ${tagId})`);
                  } else if (!CONFIG.dryRun) {
                    // Tag doesn't exist - create it on the fly
                    const slug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                    const newTag = await payload.create({
                      collection: 'tags',
                      data: {
                        title: tagName,
                        slug: slug
                      }
                    });
                    const newTagId = newTag.id.toString();
                    tagMap[tagName] = newTagId;
                    tagIds.push(newTagId);
                    log(`Created missing tag on-the-fly: ${tagName} (ID: ${newTagId})`);
                  }
                } catch (err) {
                  log(`WARNING: Failed to process tag: ${tagName} - ${err}`);
                }
              }
            }
          }
          
          const postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'sizes'> = {
            title: post.title,
            slug: post.slug,
            _status: post.status === 'publish' ? 'published' : 'draft',
            meta: {
              title: post.seo?.title || post.title,
              description: post.seo?.description || '',
              image: featuredImageId, // Add the featured image to meta.image
            },
            // Format author relationship as array of numbers
            authors: authorId ? [Number(authorId)] : null,
            
            // Format category relationships as array of numbers
            categories: categoryIds.length > 0 
              ? categoryIds.map(id => Number(id))
              : null,
            
            // Format tag relationships as array of numbers
            tags: tagIds.length > 0 
              ? tagIds.map(id => Number(id))
              : null,
              
            featuredImage: featuredImageId, // Add the featured image to the dedicated field
            content: { root: htmlToLexical(processedContent, mediaMap) },
            publishedAt: post.publishDate,
          };

          try {
            const result = await payload.create({
              collection: 'posts',
              data: postData,
              req: {
                payload: payload, // Pass the payload instance
                skipRevalidation: true, // Skip Next.js revalidation during import
                // Add a flag to disable search indexing during import
                // disableSearchSync: true,
              } as PayloadRequest & { skipRevalidation: boolean },
            });
            if (result.id) {
              log(`✅ Created post: ${result.id} ${post.title} with ${categoryIds.length} categories and author: ${post.creator || 'none'}`);
            }
          } catch (error) {
            // If the error is related to search indexing, log it but don't fail the import
            if (error?.stack?.includes('search') || 
                error?.message?.includes('search') || 
                (error?.data?.errors && error?.data?.errors.some(e => e.path === 'id' && e.message === 'Value must be unique'))) {
              log(`Warning: Search indexing error for post ${post.title}, but post was likely created successfully`);
              // We can consider the post created despite the search error
              return;
            }
            // Re-throw other errors
            throw error;
          }
        };

        await createPost(post);

        importCount++;
      } else {
        log(`[DRY RUN] Would create post: ${post.title} with ${categoryIds.length} categories and author: ${post.creator || 'none'}`);
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
            req: {
              payload: payload,
              skipRevalidation: true, // Skip Next.js revalidation during import
            } as PayloadRequest & { skipRevalidation: boolean },
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

    // Import tags
    const tagMap = await importTags();
    log(`✅ Tag import complete. ${Object.keys(tagMap).length} tags processed.`);
    
    // Debug: Show sample of tag map to verify we have correct keys
    log('Sample of tag map entries:');
    Object.entries(tagMap).slice(0, 5).forEach(([name, id]) => {
      log(`  Tag: "${name}" => ID: ${id}`);
    });

    // Import users
    const userMap = await importUsers();
    log(`✅ User import complete. ${Object.keys(userMap).length} users processed.`);

    // Import media
    const mediaMap = await importMedia(payload);
    log(`✅ Media import complete. ${Object.keys(mediaMap).length} media items processed.`);

    // Import posts
    await importPosts(categoryMap, userMap, mediaMap, tagMap);
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
