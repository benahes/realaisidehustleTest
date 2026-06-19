import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body?.email || "")
      .trim()
      .toLowerCase();
    const password = String(body?.password || "");
    const metadata = body?.metadata || {};

    if (!email || !password) {
      return errorResponse("Email and password are required", 400);
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });

    if (error) {
      return errorResponse(error.message || "Registration failed", 400);
    }

    let syncWarning: string | null = null;

    if (data.user) {
      try {
        const existing = await prisma.user.findUnique({
          where: { supabaseUid: data.user.id },
        });

        if (existing) {
          await prisma.user.update({
            where: { supabaseUid: data.user.id },
            data: {
              email: data.user.email || existing.email,
              name: data.user.user_metadata?.full_name || existing.name,
            },
          });
        } else {
          await prisma.user.create({
            data: {
              supabaseUid: data.user.id,
              email: data.user.email || email,
              name: data.user.user_metadata?.full_name || null,
              role: "USER",
            },
          });
        }
      } catch (syncErr: any) {
        console.error("[AUTH SIGNUP SYNC]", syncErr);
        syncWarning =
          "Account created, but local database sync is unavailable. Start PostgreSQL and run sync later.";
      }
    }

    return successResponse({
      user: data.user,
      session: data.session,
      warning: syncWarning,
    });
  } catch (err: any) {
    console.error("[AUTH SIGNUP]", err);
    return errorResponse("Registration failed", 500);
  }
}
