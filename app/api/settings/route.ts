import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse, validateBody } from "@/lib/api-helpers";
import { createClient } from "@/lib/supabase/server";
import { ZodError } from "zod";
import { z } from "zod";

const SettingsUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
});

// GET /api/settings — fetch current user settings
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return errorResponse("Unauthorized", 401);

    const dbUser = await prisma.user.findUnique({
      where: { supabaseUid: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
      },
    });
    if (!dbUser) return errorResponse("User not found", 404);

    return successResponse({ settings: dbUser });
  } catch (err: any) {
    console.error("[SETTINGS GET]", err);
    return errorResponse("Failed to fetch settings", 500);
  }
}

// PUT /api/settings — update user settings
export async function PUT(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return errorResponse("Unauthorized", 401);

    const dbUser = await prisma.user.findUnique({
      where: { supabaseUid: user.id },
      select: { id: true },
    });
    if (!dbUser) return errorResponse("User not found", 404);

    const body = await validateBody(req, SettingsUpdateSchema);

    const updated = await prisma.user.update({
      where: { id: dbUser.id },
      data: body,
      select: { id: true, name: true },
    });

    return successResponse({ settings: updated });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return errorResponse(err.errors[0]?.message || "Invalid input", 400);
    }
    console.error("[SETTINGS PUT]", err);
    return errorResponse("Failed to update settings", 500);
  }
}
