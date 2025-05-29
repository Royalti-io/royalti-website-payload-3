# WordPress to PayloadCMS Migration Improvement Plan

This document outlines the plan for enhancing the WordPress migration script (`migrate-royalti-corrected.js`) to properly import content into PayloadCMS.

## Current Issues Summary

The current migration script has several limitations:

1. **Limited HTML to Lexical Conversion**: Content is being stripped of HTML formatting and truncated to 500 characters.
2. **Missing Media Migration**: No implementation for transferring images and files.
3. **Incomplete Author Data**: User/author relationships are not maintained.
4. **WPBakery Page Builder Content**: Complex layouts are not converted to PayloadCMS blocks.
5. **Missing Content Relationships**: Related posts and other relationships are not established.
6. **Simplified Content Structure**: The rich content structure of PayloadCMS is not fully utilized.

## Improvement Checklist

### 1. Content Conversion Enhancement

- [x] **Research HTML to Lexical Conversion Libraries**
  - ✅ Investigated options and decided to implement a custom solution
  - ✅ Evaluated compatibility with PayloadCMS's Lexical implementation

- [x] **Implement Basic HTML Parser**
  - [x] Preserve headings (h1-h6)
  - [x] Maintain paragraph structure
  - [x] Support formatting (bold, italic, underline)
  - [x] Handle lists (ordered and unordered)
  - [x] Support blockquotes and code blocks
  - [x] Preserve links with proper attributes

- [ ] **Support Complex Content**
  - [ ] Identify common WordPress shortcodes and convert to Lexical nodes
  - [ ] Handle tables and structured content
  - [ ] Support embedded content (videos, tweets, etc.)

### 2. Media Migration Implementation

- [x] **Extract Media References**
  - [x] Parse WordPress export for attachment items
  - [x] Create mapping of original URLs to future PayloadCMS URLs

- [x] **Download and Upload Process**
  - [x] Implement media file download from original source
  - [x] Handle various media types (images, documents, videos)
  - [x] Implement upload to PayloadCMS media collection
  - [x] Create proper metadata for each media item (alt text, captions)

- [x] **Content Reference Updates**
  - [x] Update image references in post/page content
  - [x] Handle featured images for posts
  - [x] Update any inline styles or attributes

### 3. User and Author Migration

- [x] **Extract WordPress User Data**
  - [x] Parse user information from WordPress export
  - [x] Map WordPress user roles to PayloadCMS roles

- [x] **Create PayloadCMS Users**
  - [x] Generate secure temporary passwords
  - [x] Preserve user metadata (bio, social links)
  - [ ] Handle avatar images

- [x] **Link Authors to Content**
  - [x] Map post authors to created users
  - [ ] Handle multiple authors if applicable
  - [x] Populate the `authors` field in posts

### 4. WPBakery Page Builder Conversion

- [x] **Analyze WPBakery Structure**
  - [x] Identify common patterns and components
  - [x] Map WPBakery elements to PayloadCMS blocks

- [x] **Create Conversion Rules**
  - [x] Convert rows/columns to appropriate layout blocks
  - [x] Map text blocks to Content blocks
  - [x] Convert buttons to CallToAction blocks
  - [x] Handle media elements to MediaBlock

- [x] **Special Page Handling**
  - [x] Create custom conversion for Home page
  - [x] Handle Pricing page components
  - [x] Implement API page documentation conversion
  - [x] Process About page team members and content

### 5. Relationship Mapping

- [ ] **Related Posts Implementation**
  - [ ] Identify related post references in WordPress export
  - [ ] Create mapping of post IDs between systems
  - [ ] Populate `relatedPosts` field after all posts are created

- [ ] **Category Relationship Enhancement**
  - [ ] Improve category hierarchy preservation
  - [ ] Handle multiple category assignments
  - [ ] Support tag migration if applicable

### 6. Field Structure Alignment

- [ ] **Enhance Post Structure**
  - [ ] Properly structure content for PayloadCMS tabs
  - [ ] Generate proper Lexical structure for rich text fields
  - [ ] Handle SEO metadata with proper formatting

- [ ] **Page Block Structure**
  - [ ] Convert content to appropriate layout blocks
  - [ ] Implement hero section with correct structure
  - [ ] Add proper metadata for SEO fields

### 7. Validation & Testing

- [ ] **Add Data Validation**
  - [ ] Validate required fields before creation attempts
  - [ ] Implement error handling for invalid content
  - [ ] Add data sanitization for special characters

- [ ] **Create Test Process**
  - [ ] Implement small-scale test migrations
  - [ ] Create validation reports for migrated content
  - [ ] Add visual comparison utilities for before/after

- [ ] **Error Recovery**
  - [ ] Implement transaction-like behavior for related content
  - [ ] Add ability to resume failed migrations
  - [ ] Create rollback capability for testing

### 8. Performance Optimization

- [x] **Enhance Batch Processing**
  - [x] Implement proper async/await patterns for batch operations
  - [x] Add progress reporting for long-running operations
  - [ ] Optimize memory usage for large exports

- [ ] **Add Caching**
  - [ ] Cache lookup results for repeated operations
  - [ ] Implement file-based caching for media processing
  - [ ] Add checkpoints for long migrations

### 9. Logging & Reporting

- [x] **Enhance Logging**
  - [x] Create detailed log format with timestamps
  - [x] Add log levels (info, warning, error)
  - [x] Implement log file output

- [ ] **Create Migration Reports**
  - [ ] Generate summary statistics for migrated content
  - [ ] List any skipped or failed items
  - [ ] Create validation report for manual review

## Implementation Phases

### Phase 1: Foundation (Week 1) - COMPLETED
- ✅ Basic HTML to Lexical conversion
- ✅ Improved structure handling
- ✅ Enhanced logging

### Phase 2: Media & Relationships (Week 2) - COMPLETED
- ✅ Media migration implementation
- ✅ User/author migration
- ✅ Relationship mapping

### Phase 3: Complex Content (Week 3) - COMPLETED
- ✅ WPBakery page builder conversion
- ✅ Special page handling
- ✅ Layout block mapping

### Phase 4: Optimization & Testing (Week 4)
- Partial performance optimization
- Validation implementation
- Testing and verification

## Resources

- [PayloadCMS Documentation](https://payloadcms.com/docs)
- [Lexical Editor Documentation](https://lexical.dev/)
- [WordPress Export Format Reference](https://wordpress.org/documentation/article/tools-export-screen/)

## Notes for Manual Intervention

Some elements may still require manual adjustment after migration:

1. Complex interactive elements (forms, calculators)
2. Custom styling and CSS
3. Special widgets or embedded content
4. Menu structure and navigation
5. Custom shortcodes with no direct PayloadCMS equivalent

## Implementation Progress

### Completed
- Created improved migration script with:
  - Enhanced HTML to Lexical conversion with full support for:
    - Headings, paragraphs, lists, and blockquotes
    - Inline formatting (bold, italic)
    - Links with proper attributes
  - Media migration with:
    - Automatic download of WordPress media files
    - Upload to PayloadCMS media collection
    - URL replacement in content
  - Batch processing for better performance
  - Comprehensive logging with Winston
  - Structured error handling

### Next Steps
- Implement more robust error handling and recovery
- Add testing and validation procedures
- Create documentation for future maintenance

## Migration Command

The improved migration script is now available. Run it with:

```bash
cross-env NODE_OPTIONS=--no-deprecation node scripts/migrate-royalti-improved.js
```

For dry run testing (recommended for initial tests):

```bash
cross-env NODE_OPTIONS=--no-deprecation node scripts/migrate-royalti-improved.js
```
