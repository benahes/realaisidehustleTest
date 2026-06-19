import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { getR2Client, getBucketName, getPublicUrl } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { requireAdmin } from "@/lib/auth";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return errorResponse("No file provided", 400);
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return errorResponse("Invalid file type. Allowed: JPG, PNG, WebP, GIF, SVG", 400);
    }

    if (file.size > MAX_SIZE) {
      return errorResponse("File too large. Max 5MB", 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop() || "jpg";
    const key = `blog-images/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const r2 = getR2Client();
    const bucket = getBucketName();

    await r2.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        ACL: "public-read",
      }),
    );

    const publicUrl = getPublicUrl(key);

    return successResponse({ url: publicUrl, key });
  } catch (err: any) {
    console.error("[IMAGE UPLOAD]", err);
    return errorResponse(err?.message || "Failed to upload image", 500);
  }
}
