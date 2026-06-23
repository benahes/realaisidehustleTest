import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { GenerateBlogSchema } from "@/lib/zod/schemas";
import {
  successResponse,
  errorResponse,
  validateBody,
  handleZodError,
} from "@/lib/api-helpers";
import { requireAdmin } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { aiRateLimit } from "@/lib/rate-limit";
import { generateBlogWithGemini } from "@/lib/gemini";
import { generateBlogPost, generateOpenAI } from "@/lib/grok";
import { generateBlogWithOpenRouter } from "@/lib/openrouter";
import { ZodError } from "zod";

// POST /api/ai/generate-blog — generate blog via AI (admin)
export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { allowed, remaining } = await aiRateLimit(clientIp);
    if (!allowed) {
      return errorResponse(
        "AI rate limit exceeded. Try again in 1 minute.",
        429,
      );
    }

    const body = await validateBody(req, GenerateBlogSchema);

    let generated: any;
    let usedFallback = false;
    let lastError = "";

    // 1. Try OpenRouter first (uses provided API key / free tier)
    if (process.env.OPENROUTER_API_KEY) {
      try {
        generated = await generateBlogWithOpenRouter({
          topic: body.topic,
          tone: body.tone,
          length: body.length,
        });
      } catch (openrouterErr: any) {
        lastError = openrouterErr?.response?.data?.error?.message || openrouterErr?.message || "OpenRouter failed";
        console.error("[AI GENERATE] OpenRouter failed:", lastError, "status:", openrouterErr?.response?.status);
        usedFallback = true;
      }
    }

    // 2. Fallback to Gemini (free tier)
    if (!generated && process.env.GEMINI_API_KEY) {
      try {
        generated = await generateBlogWithGemini({
          topic: body.topic,
          tone: body.tone,
          length: body.length,
        });
        usedFallback = true;
      } catch (geminiErr: any) {
        lastError = geminiErr?.response?.data?.error?.message || geminiErr?.message || "Gemini failed";
        console.error("[AI GENERATE] Gemini failed:", lastError);
        if (typeof lastError === "string" && lastError.toLowerCase().includes("quota exceeded")) {
          lastError = "Gemini free tier quota exceeded. Try again later or add a billing account at aistudio.google.com.";
        }
      }
    }

    // 3. Fallback to Grok
    if (!generated) {
      try {
        generated = await generateBlogPost({
          topic: body.topic,
          tone: body.tone,
          length: body.length,
        });
        usedFallback = true;
      } catch (grokErr: any) {
        lastError = grokErr?.response?.data?.error || grokErr?.message || "Grok failed";
        console.error("[AI GENERATE] Grok failed:", lastError);
      }
    }

    // 3. Fallback to OpenAI
    if (!generated && process.env.OPENAI_API_KEY) {
      try {
        generated = await generateOpenAI({
          prompt: `Write a ${body.length} blog post about "${body.topic}" in a ${body.tone} tone. Return JSON with: title, slug, excerpt, content (markdown), category, tags.`,
        });
        usedFallback = true;
      } catch (openaiErr: any) {
        lastError = openaiErr?.message || "OpenAI failed";
        console.error("[AI GENERATE] OpenAI failed:", lastError);
      }
    }

    if (!generated) {
      return errorResponse(
        `AI generation failed. ${lastError}`,
        502,
      );
    }

    // Validate generated content has required fields
    if (!generated.title || !generated.slug || !generated.content) {
      return errorResponse("AI returned incomplete content", 502);
    }

    // Save as draft
    const blog = await prisma.blogPost.create({
      data: {
        title: generated.title,
        slug: generated.slug,
        excerpt: generated.excerpt || generated.content.slice(0, 200) + "...",
        content: generated.content,
        category: generated.category || "AI",
        tags: generated.tags || [body.topic],
        published: false,
        aiGenerated: true,
        authorId: auth.dbUser.id,
        coverImage: "",
      },
    });

    await logAudit(
      "AI_GENERATE_BLOG",
      { blogId: blog.id, topic: body.topic },
      {
        userId: auth.dbUser.id,
        ip: clientIp,
        userAgent: req.headers.get("user-agent") || "",
      },
    );

    return successResponse({
      blog,
      remaining,
      usedFallback,
      message: usedFallback
        ? "Blog generated via fallback AI. Review before publishing."
        : "Blog generated with OpenRouter. Review before publishing.",
    });
  } catch (err: any) {
    if (err instanceof ZodError) return handleZodError(err);
    console.error("[AI GENERATE]", err);
    return errorResponse("AI generation failed", 500);
  }
}
