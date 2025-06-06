# WordPress Export to PayloadCMS
    
## Export Summary

- **Site:** Royalti.io
- **Export Date:** 2025-06-06T11:34:50.379Z
- **Total Items:** 342
- **Posts:** 85
- **Pages:** 16
- **Media:** 157
- **Categories:** 4
- **Authors:** 9

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
   ```
   pnpm run migrate:payload
   ```
3. Check the migration logs for any issues

## Media Files

Media files were not downloaded. Enable CONFIG.downloadMedia in the script to download them
