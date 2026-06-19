import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
})

const BUCKET = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'raish-assets'

export async function getPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn = 900 // 15 minutes
) {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  })

  return getSignedUrl(r2Client, command, { expiresIn })
}

export async function getPresignedDownloadUrl(key: string, expiresIn = 900) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  })

  return getSignedUrl(r2Client, command, { expiresIn })
}

export function getPublicUrl(key: string) {
  const base = process.env.CLOUDFLARE_R2_PUBLIC_URL
  if (!base) return null
  return `${base}/${key}`
}

// Cloudflare Stream helpers
export async function createStreamUploadUrl() {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_STREAM_ACCOUNT_ID}/stream?direct_user=true`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_STREAM_TOKEN}`,
      },
    }
  )
  const data = await res.json()
  return data.result as {
    uid: string
    uploadURL: string
  }
}

export async function getStreamPlaybackUrl(videoUid: string) {
  return `https://customer-${process.env.CLOUDFLARE_STREAM_ACCOUNT_ID}.cloudflarestream.com/${videoUid}/manifest/video.m3u8`
}
