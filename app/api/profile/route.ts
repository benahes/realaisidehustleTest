import { NextRequest } from 'next/server'
import { successResponse, errorResponse } from '@/lib/api-helpers'
import { createClient } from '@/lib/supabase/server'
import { getPublicUrl, getR2KeyFromUrl } from '@/lib/r2'

const isDev = process.env.NODE_ENV === 'development'

export async function GET(_req: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma')
    const supabase = await createClient()
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()

    if (authError || !authUser) {
      return errorResponse('Unauthorized', 401)
    }

    // Auto-sync user into Prisma DB if missing
    let dbUser = await prisma.user.findUnique({
      where: { supabaseUid: authUser.id },
    })

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          supabaseUid: authUser.id,
          email: authUser.email ?? '',
          name: authUser.user_metadata?.full_name ?? authUser.user_metadata?.name ?? '',
          role: 'USER',
          isSubscribed: false,
        },
      })
    }

    // Optional stats — wrapped individually so missing tables don't break the whole profile
    let purchaseCount = 0
    let totalRevenue = 0
    let courseProgressCount = 0
    let newsletterActive = false
    let recentPurchases: any[] = []

    try {
      purchaseCount = await prisma.purchase.count({ where: { userId: dbUser.id } })
    } catch { /* table may not exist yet */ }

    try {
      const revenueAgg = await prisma.purchase.aggregate({
        where: { userId: dbUser.id, status: 'SUCCESS' },
        _sum: { amount: true },
      })
      totalRevenue = revenueAgg._sum.amount || 0
    } catch { /* table may not exist yet */ }

    try {
      courseProgressCount = await prisma.courseProgress.count({ where: { userId: dbUser.id } })
    } catch { /* table may not exist yet */ }

    try {
      const sub = await prisma.newsletterSub.findFirst({
        where: {
          OR: [{ userId: dbUser.id }, { email: dbUser.email }],
          isActive: true,
        },
        select: { id: true },
      })
      newsletterActive = !!sub
    } catch { /* table may not exist yet */ }

    try {
      const purchases = await prisma.purchase.findMany({
        where: { userId: dbUser.id },
        orderBy: { createdAt: 'desc' },
        take: 8,
        select: {
          id: true,
          itemType: true,
          amount: true,
          currency: true,
          status: true,
          createdAt: true,
          course: { select: { title: true } },
          tool: { select: { name: true } },
        },
      })
      recentPurchases = purchases.map((p) => ({
        id: p.id,
        itemType: p.itemType,
        itemName: p.itemType === 'COURSE' ? p.course?.title || 'Course' : p.tool?.name || 'Tool',
        amount: p.amount,
        currency: p.currency,
        status: p.status,
        createdAt: p.createdAt,
      }))
    } catch { /* table may not exist yet */ }

    return successResponse({
      profile: {
        id: dbUser.id,
        email: dbUser.email,
        fullName:
          authUser?.user_metadata?.full_name ||
          dbUser.name ||
          '',
        avatarUrl: dbUser.avatarUrl
          ? (getR2KeyFromUrl(dbUser.avatarUrl)
            ? getPublicUrl(getR2KeyFromUrl(dbUser.avatarUrl)!)
            : dbUser.avatarUrl)
          : '',
        organization: authUser?.user_metadata?.organization || '',
        role: dbUser.role,
        isSubscribed: dbUser.isSubscribed,
        createdAt: dbUser.createdAt,
      },
      stats: {
        purchaseCount,
        totalRevenue,
        courseProgressCount,
        newsletterActive,
      },
      recentPurchases,
    })
  } catch (err: any) {
    console.error('[PROFILE GET]', err)
    const message = isDev && err?.message ? `${err.message}` : 'Failed to load profile'
    return errorResponse(message, 500, isDev ? err?.stack : undefined)
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma')
    const supabase = await createClient()
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()

    if (authError || !authUser) {
      return errorResponse('Unauthorized', 401)
    }

    // Auto-sync user into Prisma DB if missing
    let dbUser = await prisma.user.findUnique({
      where: { supabaseUid: authUser.id },
    })

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          supabaseUid: authUser.id,
          email: authUser.email ?? '',
          name: authUser.user_metadata?.full_name ?? authUser.user_metadata?.name ?? '',
          role: 'USER',
          isSubscribed: false,
        },
      })
    }

    const body = await req.json()
    const fullName = String(body?.fullName || '').trim()
    const organization = String(body?.organization || '').trim()
    const avatarUrl = String(body?.avatarUrl || '').trim()

    if (!fullName) {
      return errorResponse('Full name is required', 400)
    }

    const { error: updateAuthError } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        organization,
      },
    })

    if (updateAuthError) {
      return errorResponse(updateAuthError.message || 'Failed to update profile', 400)
    }

    // Convert legacy R2 URLs to proxy URLs before saving
    const normalizedAvatarUrl = avatarUrl
      ? (getR2KeyFromUrl(avatarUrl)
        ? getPublicUrl(getR2KeyFromUrl(avatarUrl)!)
        : avatarUrl)
      : '';

    const updateData: any = { name: fullName }
    if (normalizedAvatarUrl) updateData.avatarUrl = normalizedAvatarUrl

    const updated = await prisma.user.update({
      where: { id: dbUser.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        role: true,
        isSubscribed: true,
        createdAt: true,
      },
    })

    return successResponse({
      profile: {
        id: updated.id,
        email: updated.email,
        fullName: updated.name || fullName,
        avatarUrl: updated.avatarUrl || '',
        organization,
        role: updated.role,
        isSubscribed: updated.isSubscribed,
        createdAt: updated.createdAt,
      },
    })
  } catch (err: any) {
    console.error('[PROFILE PUT]', err)
    const message = isDev && err?.message ? `${err.message}` : 'Failed to update profile'
    return errorResponse(message, 500, isDev ? err?.stack : undefined)
  }
}
