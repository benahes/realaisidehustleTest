import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { getR2Client, getBucketName, getPublicUrl } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { requireAdmin } from "@/lib/auth";

const MAX_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_TYPES = ["application/pdf"];

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
      return errorResponse("Invalid file type. Only PDF is allowed", 400);
    }

    if (file.size > MAX_SIZE) {
      return errorResponse("File too large. Max 20MB", 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = "pdf";
    const key = `course-pdfs/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

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
    console.error("[PDF UPLOAD]", err);
    return errorResponse(err?.message || "Failed to upload PDF", 500);
  }
}
