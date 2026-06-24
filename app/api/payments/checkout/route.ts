import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { CheckoutSchema } from "@/lib/zod/schemas";
import {
  successResponse,
  errorResponse,
  validateBody,
  handleZodError,
} from "@/lib/api-helpers";
import { initializeTransaction } from "@/lib/paystack";
import { createClient } from "@/lib/supabase/server";
import { ZodError } from "zod";

// POST /api/payments/checkout — initiate Paystack payment
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.email) {
      return errorResponse("Unauthorized", 401);
    }

    const body = await validateBody(req, CheckoutSchema);
    const { itemType, itemId, email } = body;
    const deliveryEmail = email?.trim() || user.email;

    // Verify item exists and fetch price
    let item: any;
    if (itemType === "COURSE") {
      item = await prisma.course.findUnique({
        where: { id: itemId, isPublished: true },
        select: { id: true, title: true, price: true, currency: true },
      });
    } else {
      item = await prisma.tool.findUnique({
        where: { id: itemId, isPublished: true },
        select: { id: true, name: true, price: true },
      });
    }

    if (!item) return errorResponse("Item not found", 404);
    if (item.price === 0) return errorResponse("Item is free", 400);

    // Create pending purchase record
    const dbUser = await prisma.user.findUnique({
      where: { supabaseUid: user.id },
      select: { id: true },
    });
    if (!dbUser) return errorResponse("User not synced", 400);

    // Check if already purchased
    const existing = await prisma.purchase.findFirst({
      where: {
        userId: dbUser.id,
        itemType,
        ...(itemType === "COURSE" ? { courseId: itemId } : { toolId: itemId }),
        status: "SUCCESS",
      },
    });
    if (existing) return errorResponse("Already purchased", 409);

    const reference = `RAISH-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const purchase = await prisma.purchase.create({
      data: {
        userId: dbUser.id,
        itemType,
        ...(itemType === "COURSE" ? { courseId: itemId } : { toolId: itemId }),
        amount: item.price,
        currency: item.currency || "NGN",
        status: "PENDING",
        paystackRef: reference,
        deliveryEmail,
      },
    });

    // Initialize Paystack transaction
    const paystackData = await initializeTransaction({
      email: deliveryEmail,
      amount: item.price,
      reference,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/verify`,
      metadata: {
        purchaseId: purchase.id,
        itemType,
        itemId,
        itemName: itemType === "COURSE" ? item.title : item.name,
      },
    });

    return successResponse({
      authorizationUrl: paystackData.authorization_url,
      reference,
      purchaseId: purchase.id,
    });
  } catch (err: any) {
    if (err instanceof ZodError) return handleZodError(err);
    console.error("[CHECKOUT]", err);
    return errorResponse("Payment initiation failed", 500);
  }
}
