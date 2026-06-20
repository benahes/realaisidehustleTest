import { prisma } from "@/lib/prisma";

import { errorResponse } from "@/lib/api-helpers";

import { createClient } from "@/lib/supabase/server";

export async function requireUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: errorResponse("Unauthorized", 401) };
  }

  const dbUser = await prisma.user.findUnique({
    where: { supabaseUid: user.id },
    select: {
      id: true,
      supabaseUid: true,
      email: true,
      name: true,
      role: true,
      avatarUrl: true,
      isSubscribed: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!dbUser) {
    return { error: errorResponse("User not synced", 400) };
  }

  return { user, dbUser };
}

export async function requireAdmin() {
  const result = await requireUser();

  if ("error" in result) return result;

  if (result.dbUser.role !== "ADMIN" && result.dbUser.role !== "SUPER_ADMIN") {
    return { error: errorResponse("Forbidden", 403) };
  }

  return result;
}

export async function requireSuperAdmin() {
  const result = await requireUser();

  if ("error" in result) return result;

  if (result.dbUser.role !== "SUPER_ADMIN") {
    return { error: errorResponse("Forbidden", 403) };
  }

  return result;
}
