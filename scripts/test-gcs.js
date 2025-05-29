import { Storage } from '@google-cloud/storage'
import * as dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const testGCS = async () => {
  console.log('🧪 Testing Google Cloud Storage...')
  
  const projectId = process.env.GCP_PROJECT_ID
  const bucketName = process.env.GCS_BUCKET
  const serviceAccountKey = process.env.GCS_SERVICE_ACCOUNT_KEY
  
  if (!projectId || !bucketName || !serviceAccountKey) {
    console.error('❌ Missing environment variables:')
    console.log('GCP_PROJECT_ID:', !!projectId)
    console.log('GCS_BUCKET:', !!bucketName)
    console.log('GCS_SERVICE_ACCOUNT_KEY:', !!serviceAccountKey)
    return
  }
  
  try {
    const storage = new Storage({
      projectId,
      credentials: JSON.parse(serviceAccountKey),
    })
    
    const bucket = storage.bucket(bucketName)
    const [exists] = await bucket.exists()
    
    if (exists) {
      console.log('✅ Google Cloud Storage ready!')
      console.log(`📦 Project: ${projectId}`)
      console.log(`🪣 Bucket: ${bucketName}`)
    } else {
      console.error('❌ Bucket not accessible')
    }
    
  } catch (error) {
    console.error('❌ GCS test failed:', error.message)
  }
}

testGCS()
