import { NextRequest } from "next/server";
import { errorResponse } from "@/lib/api-helpers";
import { getR2Client, getBucketName } from "@/lib/r2";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (!key) {
      return errorResponse("Missing key", 400);
    }

    const r2 = getR2Client();
    const bucket = getBucketName();

    const object = await r2.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );

    const contentType = object.ContentType || "image/jpeg";
    const body = await object.Body?.transformToByteArray();

    if (!body) {
      return errorResponse("Image not found", 404);
    }

    return new Response(Buffer.from(body), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err: any) {
    console.error("[AVATAR GET]", err);
    return errorResponse(err?.message || "Failed to load image", 500);
  }
}
