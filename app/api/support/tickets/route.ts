import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse, validateBody } from "@/lib/api-helpers";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const TicketSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
});

// GET /api/support/tickets — list user's tickets
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return errorResponse("Unauthorized", 401);

    const dbUser = await prisma.user.findUnique({
      where: { supabaseUid: user.id },
      select: { id: true },
    });
    if (!dbUser) return errorResponse("User not found", 404);

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const tickets = await prisma.supportTicket.findMany({
      where: {
        userId: dbUser.id,
        ...(status ? { status } : {}),
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return successResponse({ tickets });
  } catch (err: any) {
    console.error("[SUPPORT TICKETS GET]", err);
    return errorResponse("Failed to fetch tickets", 500);
  }
}

// POST /api/support/tickets — create a ticket
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return errorResponse("Unauthorized", 401);

    const dbUser = await prisma.user.findUnique({
      where: { supabaseUid: user.id },
      select: { id: true },
    });
    if (!dbUser) return errorResponse("User not found", 404);

    const body = await validateBody(req, TicketSchema);

    const ticket = await prisma.supportTicket.create({
      data: {
        userId: dbUser.id,
        title: body.title,
        description: body.description,
        priority: body.priority,
      },
    });

    return successResponse({ ticket }, 201);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return errorResponse(err.errors[0]?.message || "Invalid input", 400);
    }
    console.error("[SUPPORT TICKETS POST]", err);
    return errorResponse("Failed to create ticket", 500);
  }
}
