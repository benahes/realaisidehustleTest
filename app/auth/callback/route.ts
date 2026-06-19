import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (!code) {
    return NextResponse.redirect(new URL(next, origin))
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) {
    return NextResponse.redirect(new URL('/login?error=oauth', origin))
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const existing = await prisma.user.findUnique({ where: { supabaseUid: user.id } })
    if (existing) {
      await prisma.user.update({
        where: { supabaseUid: user.id },
        data: {
          email: user.email || existing.email,
          name: user.user_metadata?.full_name || existing.name,
        },
      })
    } else {
      await prisma.user.create({
        data: {
          supabaseUid: user.id,
          email: user.email || '',
          name: user.user_metadata?.full_name || null,
          role: 'USER',
        },
      })
    }
  }

  return NextResponse.redirect(new URL(next, origin))
}
