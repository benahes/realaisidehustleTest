import { NextRequest } from "next/server";
import { getPresignedUploadUrl } from "@/lib/cloudflare";
import { PresignSchema } from "@/lib/zod/schemas";
import {
  successResponse,
  errorResponse,
  validateBody,
  handleZodError,
} from "@/lib/api-helpers";
import { requireAdmin } from "@/lib/auth";
import { ZodError } from "zod";

// POST /api/upload/presign — generate R2 presigned upload URL
export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const body = await validateBody(req, PresignSchema);
    const ext = body.filename.split(".").pop() || "";
    const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const url = await getPresignedUploadUrl(key, body.contentType);

    return successResponse({
      presignedUrl: url,
      publicUrl: `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`,
      key,
    });
  } catch (err: any) {
    if (err instanceof ZodError) return handleZodError(err);
    console.error("[UPLOAD PRESIGN]", err);
    return errorResponse("Failed to generate upload URL", 500);
  }
}
