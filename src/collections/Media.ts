import type { CollectionConfig, CollectionBeforeChangeHook, CollectionBeforeValidateHook } from 'payload';

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

// Hook to organize file uploads by year/month in the file system
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

// Hook to set the default folder to the current year/month folder
const setDefaultYearMonthFolder: CollectionBeforeValidateHook = async ({ 
req, data, operation, context }) => {
  // Only run on create operations for media uploads
  if (operation === 'create' && data && !data.folder && req?.payload) {
    try {
      const now = new Date();
      const currentYear = now.getFullYear().toString();
      const currentMonth = (now.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is 0-indexed
      
      // First, find or create the year folder
      let yearFolder = await findFolderByName(req.payload, currentYear);
      
      if (!yearFolder) {
        // Create the year folder if it doesn't exist
        yearFolder = await req.payload.create({
          collection: 'payload-folders', // Use the correct collection name for folders
          data: {
            name: currentYear,
          },
        });
      }
      
      // Then, find or create the month folder as a child of the year folder
      let monthFolder = await findFolderByNameAndParent(
        req.payload, 
        currentMonth, 
        yearFolder.id
      );
      
      if (!monthFolder) {
        // Create the month folder if it doesn't exist
        monthFolder = await req.payload.create({
          collection: 'payload-folders', // Use the correct collection name for folders
          data: {
            name: currentMonth,
            // Payload's folder structure uses 'parent' field 
            folder: yearFolder.id,
          },
        });
      }
      
      // Set the default folder to the month folder
      if (monthFolder?.id && data) {
        data.folder = monthFolder.id;
      }
    } catch (error) {
      console.error('Error setting default year/month folder:', error);
    }
  }
  
  return data;
};

// Helper function to find a folder by name
async function findFolderByName(payload, name) {
  const folders = await payload.find({
    collection: 'payload-folders', // Use the correct collection name for folders
    where: {
      name: {
        equals: name,
      },
      folder: {
        exists: false,
      },
    },
  });
  
  return folders?.docs?.[0] || null;
}

// Helper function to find a folder by name and parent ID
async function findFolderByNameAndParent(payload, name, parentId) {
  const folders = await payload.find({
    collection: 'payload-folders', // Use the correct collection name for folders
    where: {
      name: {
        equals: name,
      },
      folder: {
        equals: parentId,
      },
    },
  });
  
  return folders?.docs?.[0] || null;
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
    beforeValidate: [setDefaultYearMonthFolder],
  },
  admin: {
    folders: true,
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
