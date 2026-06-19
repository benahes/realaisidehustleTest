import { NextRequest } from 'next/server'
import { successResponse } from '@/lib/api-helpers'
import { requireUser } from '@/lib/auth'

export async function GET(_req: NextRequest) {
  const auth = await requireUser()
  if ('error' in auth) return auth.error

  return successResponse({
    user: {
      id: auth.dbUser.id,
      email: auth.dbUser.email,
      name: auth.dbUser.name,
      role: auth.dbUser.role,
    },
  })
}
