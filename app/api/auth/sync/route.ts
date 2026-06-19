import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { errorResponse, successResponse } from '@/lib/api-helpers'

/**
 * POST /api/auth/sync
 * Syncs a Supabase auth user into our Prisma User table.
 * Call this after sign-up or on first page load.
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return errorResponse('Unauthorized', 401)
    }

    const existing = await prisma.user.findUnique({
      where: { supabaseUid: user.id },
    })

    if (existing) {
      // Update email/name if changed
      const updated = await prisma.user.update({
        where: { supabaseUid: user.id },
        data: {
          email: user.email || existing.email,
          name: user.user_metadata?.full_name || existing.name,
        },
      })
      return successResponse({ user: updated, created: false })
    }

    const created = await prisma.user.create({
      data: {
        supabaseUid: user.id,
        email: user.email!,
        name: user.user_metadata?.full_name || null,
        role: 'USER',
      },
    })

    return successResponse({ user: created, created: true }, 201)
  } catch (err: any) {
    console.error('[AUTH SYNC]', err)
    return errorResponse('Sync failed', 500)
  }
}
