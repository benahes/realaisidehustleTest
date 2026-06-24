import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-helpers'
import { verifyTransaction } from '@/lib/paystack'
import { sendPdfDeliveryEmail } from '@/lib/email'

// GET /api/payments/verify?reference=...
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const reference = searchParams.get('reference')
    if (!reference) return errorResponse('Reference required', 400)

    // Verify with Paystack
    const txn = await verifyTransaction(reference)
    if (!txn || txn.status !== 'success') {
      await prisma.purchase.updateMany({
        where: { paystackRef: reference },
        data: { status: 'FAILED' },
      })
      return errorResponse('Payment verification failed', 400)
    }

    // Update purchase status
    const updated = await prisma.purchase.updateMany({
      where: { paystackRef: reference },
      data: { status: 'SUCCESS' },
    })

    if (updated.count === 0) {
      return errorResponse('Purchase record not found', 404)
    }

    // For course purchases with a PDF, deliver it via email
    const purchase = await prisma.purchase.findFirst({
      where: { paystackRef: reference },
      include: { course: true },
    })

    if (purchase?.course?.pdfUrl && purchase.deliveryEmail) {
      try {
        await sendPdfDeliveryEmail(
          purchase.deliveryEmail,
          purchase.course.title,
          purchase.course.pdfUrl,
        )
      } catch (emailErr: any) {
        console.error('[VERIFY] PDF delivery email failed:', emailErr)
      }
    }

    return successResponse({
      verified: true,
      reference,
      amount: txn.amount,
      currency: txn.currency,
    })
  } catch (err: any) {
    console.error('[VERIFY]', err)
    return errorResponse('Verification failed', 500)
  }
}
