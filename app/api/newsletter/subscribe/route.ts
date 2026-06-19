import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { NewsletterSubscribeSchema } from '@/lib/zod/schemas'
import { successResponse, errorResponse, validateBody, handleZodError } from '@/lib/api-helpers'
import { ZodError } from 'zod'

// POST /api/newsletter/subscribe — public subscription
export async function POST(req: NextRequest) {
  try {
    const body = await validateBody(req, NewsletterSubscribeSchema)

    const existing = await prisma.newsletterSub.findUnique({
      where: { email: body.email },
    })

    if (existing) {
      if (!existing.isActive) {
        await prisma.newsletterSub.update({
          where: { email: body.email },
          data: { isActive: true },
        })
      }
      return successResponse({ message: 'Already subscribed, reactivated' })
    }

    const sub = await prisma.newsletterSub.create({
      data: { email: body.email },
    })

    return successResponse({ message: 'Subscribed successfully', sub }, 201)
  } catch (err: any) {
    if (err instanceof ZodError) return handleZodError(err)
    console.error('[NEWSLETTER SUB]', err)
    return errorResponse('Subscription failed', 500)
  }
}
