import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { getR2Client, getBucketName, getPublicUrl } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { createClient } from "@/lib/supabase/server";

const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return errorResponse("Unauthorized", 401);
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return errorResponse("No file provided", 400);
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return errorResponse("Invalid file type. Allowed: JPG, PNG, WebP, GIF", 400);
    }

    if (file.size > MAX_SIZE) {
      return errorResponse("File too large. Max 2MB", 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop() || "jpg";
    const key = `avatars/${authUser.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

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

    return successResponse({ url: publicUrl });
  } catch (err: any) {
    console.error("[AVATAR UPLOAD]", err);
    return errorResponse(err?.message || "Failed to upload avatar", 500);
  }
}
