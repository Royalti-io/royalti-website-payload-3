import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload';

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// This is the original hook, we'll keep it for reference or later use if needed for UI uploads
const formatUploadFilename: CollectionBeforeChangeHook = async ({ req, data, operation }) => {
  if (operation === 'create' && req.file) {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is 0-indexed
    const datePrefix = `${year}/${month}/`;

    req.file.name = `${datePrefix}${req.file.name}`;

    if (data) {
      data.filename = req.file.name;
    }
  }
  return data;
};

// New hook to preserve paths in filenames from import script
const preservePathInFilename: CollectionBeforeChangeHook = async ({ req, data, operation }) => {
  // Ensure 'data' exists, especially for a 'create' operation with a file.
  if (operation === 'create' && req.file?.name && data) {
    const desiredFullFilename = req.file.name; // This is the filename from your import script, e.g., "2020/12/image.png"

    if (desiredFullFilename.includes('/')) {
      // Extract the path prefix, e.g., "2020/12/"
      const pathPrefix = desiredFullFilename.substring(0, desiredFullFilename.lastIndexOf('/') + 1);
      
      // 1. Set the main document's filename.
      // This ensures the original image is saved with the correct path.
      data.filename = desiredFullFilename;

      // 2. Adjust filenames for all generated image sizes.
      // Payload populates `data.sizes` before this hook runs.
      // `data.sizes[sizeKey].filename` typically contains the size-specific name
      // (e.g., "image-thumbnail.png") without any path.
      if (data.sizes) {
        for (const sizeKey in data.sizes) {
          const sizeData = data.sizes[sizeKey];
          // Ensure sizeData and its filename exist and filename is a string
          if (sizeData && typeof sizeData.filename === 'string') {
            // Prepend the pathPrefix to the existing size filename.
            // This makes "image-thumbnail.png" become "2020/12/image-thumbnail.png".
            sizeData.filename = `${pathPrefix}${sizeData.filename}`;
          }
        }
      }
    }
  }
  return data;
};

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    beforeChange: [formatUploadFilename],
  },
  fields: [
    {
      name: 'wordpressId',
      label: 'WordPress ID',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'The original ID from WordPress, used for import linking.',
      },
    },
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
    ],
  },
}
