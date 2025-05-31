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

import { Storage, StorageOptions } from '@google-cloud/storage'


// Helper function to generate YYYY/MM/ folder structure
const generateDateFolder = (date: Date = new Date()): string => {
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  return `${year}/${month}`
}

// Helper function to move files in GCS
const moveFileInGCS = async (oldPath: string, newPath: string) => {
  // Initialize Google Cloud Storage client
  const gcpProjectId = process.env.GCP_PROJECT_ID;
  const gcsBucketName = process.env.GCS_BUCKET!;
  const gcsServiceAccountKey = process.env.GCS_SERVICE_ACCOUNT_KEY;
  
  const storageOptions: StorageOptions = {
    projectId: gcpProjectId, // Added trailing comma
  };
  
  if (gcsServiceAccountKey) {
    try {
      const serviceAccount = JSON.parse(gcsServiceAccountKey);
      if (serviceAccount.client_email && serviceAccount.private_key) {
        storageOptions.credentials = {
          client_email: serviceAccount.client_email,
          private_key: serviceAccount.private_key.replace(/\\n/g, '\n'), // Important for newlines in private key
        };
        // console.log('Using GCS_SERVICE_ACCOUNT_KEY for GCS authentication.'); // Optional: for debugging
      }
    } catch (error) {
      console.error('Failed to parse GCS_SERVICE_ACCOUNT_KEY:', error);
    }
  }
  
  const storage = new Storage(storageOptions);
  const bucket = storage.bucket(gcsBucketName);
  try {
    const file = bucket.file(oldPath);
    await file.move(bucket.file(newPath));
    console.log(`Successfully moved GCS file from '${oldPath}' to '${newPath}'.`); // Added trailing comma
  } catch (error) {
    console.error(`Error moving GCS file from '${oldPath}' to '${newPath}':`, error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
    // Store upload date and folder info before saving
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create') {
          const now = new Date()
          data.uploadDate = now.toISOString()
        }
        return data
      }
    ],
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
