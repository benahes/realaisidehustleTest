import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { NewsletterSendSchema } from "@/lib/zod/schemas";
import {
  successResponse,
  errorResponse,
  validateBody,
  handleZodError,
} from "@/lib/api-helpers";
import { requireAdmin } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { ZodError } from "zod";

// POST /api/newsletter/send — admin campaign send
export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const body = await validateBody(req, NewsletterSendSchema);

    let where: any = { isActive: true };
    if (body.segment === "subscribed") {
      where = { isActive: true };
    } else if (body.segment === "purchasers") {
      // Get emails of users with successful purchases
      const purchaserEmails = await prisma.purchase.findMany({
        where: { status: "SUCCESS" },
        select: { user: { select: { email: true } } },
        distinct: ["userId"],
      });
      const emails = purchaserEmails.map((p) => p.user.email).filter(Boolean);
      where = { email: { in: emails }, isActive: true };
    }

    const subs = await prisma.newsletterSub.findMany({
      where,
      select: { email: true },
    });
    const emails = subs.map((s) => s.email);

    // Send via Resend API
    const resendRes = await fetch("https://api.resend.com/emails/batch", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "RAISH Newsletter <newsletter@raish.com>",
        subject: body.subject,
        html: body.content,
        to: emails,
      }),
    });

    if (!resendRes.ok) {
      const errData = await resendRes.json();
      // Log failed campaign
      await prisma.newsletterCampaign.create({
        data: {
          subject: body.subject,
          content: body.content,
          segment: body.segment,
          recipientCount: emails.length,
          status: "FAILED",
        },
      });
      return errorResponse("Failed to send newsletter", 502, errData);
    }

    // Log successful campaign
    await prisma.newsletterCampaign.create({
      data: {
        subject: body.subject,
        content: body.content,
        segment: body.segment,
        recipientCount: emails.length,
        status: "SENT",
      },
    });

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    await logAudit(
      "NEWSLETTER_SEND",
      { subject: body.subject, recipients: emails.length },
      {
        userId: auth.dbUser.id,
        ip: clientIp,
        userAgent: req.headers.get("user-agent") || "",
      },
    );

    return successResponse({
      sent: true,
      recipients: emails.length,
      subject: body.subject,
    });
  } catch (err: any) {
    if (err instanceof ZodError) return handleZodError(err);
    console.error("[NEWSLETTER SEND]", err);
    return errorResponse("Failed to send newsletter", 500);
  }
}
