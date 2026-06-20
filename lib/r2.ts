import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME || "realaisidehustle-avatars";

export function getR2Client() {
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("R2 credentials not configured");
  }
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export function getBucketName() {
  return bucketName;
}

export function getPublicUrl(key: string) {
  // Always proxy through /api/avatar so the browser only needs to resolve
  // the app domain. The server fetches the actual image from R2 internally.
  // Direct .r2.dev URLs often fail client-side with ERR_NAME_NOT_RESOLVED.
  return `/api/avatar?key=${encodeURIComponent(key)}`;
}

export function getR2KeyFromUrl(url: string): string | null {
  if (url.startsWith('/api/avatar?key=')) {
    const params = new URLSearchParams(url.split('?')[1]);
    return params.get('key');
  }
  // Legacy direct R2 URL — try to extract key
  if (url.includes('.r2.dev/')) {
    return url.split('.r2.dev/')[1] || null;
  }
  if (url.includes('.r2.cloudflarestorage.com/')) {
    return url.split('.r2.cloudflarestorage.com/')[1]?.split('/').slice(1).join('/') || null;
  }
  return null;
}
