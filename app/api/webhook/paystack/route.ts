import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-helpers'
import { verifyWebhookSignature } from '@/lib/paystack'

// POST /api/webhook/paystack — Paystack webhook handler
export async function POST(req: NextRequest) {
  try {
    const payload = await req.text()
    const signature = req.headers.get('x-paystack-signature') || ''

    if (!verifyWebhookSignature(payload, signature)) {
      return errorResponse('Invalid signature', 401)
    }

    const event = JSON.parse(payload)
    const data = event.data
    const reference = data.reference as string

    if (event.event === 'charge.success') {
      await prisma.purchase.updateMany({
        where: { paystackRef: reference },
        data: { status: 'SUCCESS' },
      })
    } else if (event.event === 'charge.failed') {
      await prisma.purchase.updateMany({
        where: { paystackRef: reference },
        data: { status: 'FAILED' },
      })
    } else if (event.event === 'refund.processed') {
      await prisma.purchase.updateMany({
        where: { paystackRef: reference },
        data: { status: 'REFUNDED' },
      })
    }

    return successResponse({ received: true })
  } catch (err: any) {
    console.error('[PAYSTACK WEBHOOK]', err)
    return errorResponse('Webhook processing failed', 500)
  }
}
