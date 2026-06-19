import { NextRequest, NextResponse } from 'next/server'
import { ZodSchema, ZodError } from 'zod'
import { prisma } from './prisma'

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function errorResponse(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ success: false, error: message, details }, { status })
}

export async function validateBody<T>(req: NextRequest, schema: ZodSchema<T>): Promise<T> {
  const body = await req.json()
  return schema.parse(body)
}

export function handleZodError(error: ZodError) {
  const issues = error.issues.map((i) => `${i.path.join('.')}: ${i.message}`)
  return errorResponse('Validation failed', 422, issues)
}

export async function getUserFromRequest(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) return null

  const token = authHeader.slice(7)
  try {
    // In middleware we already validated the session.
    // Here we just need to find the DB user.
    // Alternative: pass user context from middleware.
    const { createClient } = await import('./supabase/server')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser(token)
    if (!user) return null

    return prisma.user.findUnique({
      where: { supabaseUid: user.id },
    })
  } catch {
    return null
  }
}
