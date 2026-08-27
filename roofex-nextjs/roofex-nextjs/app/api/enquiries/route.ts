import { NextResponse } from 'next/server'
import { createEnquiry, listEnquiries, updateEnquiryEmailStatus } from '@/lib/enquiry-store'
import type { CreateEnquiryInput } from '@/lib/enquiry-types'
import { ENQUIRY_TYPE_LABELS } from '@/lib/enquiry-types'
import { isResendConfigured, sendEnquiryEmail } from '@/lib/resend'

function parseBody(raw: unknown): CreateEnquiryInput | null {
  if (!raw || typeof raw !== 'object') return null
  const body = raw as Record<string, unknown>
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const message = String(body.message || '').trim()
  const subjectRaw = String(body.subject || '').trim()
  const typeRaw = String(body.type || body.enquiryType || '').trim()

  if (!name || !email || !message) return null

  const type = typeRaw || (ENQUIRY_TYPE_LABELS[subjectRaw] ? subjectRaw : 'general')
  const subject =
    subjectRaw.length > 40 || !ENQUIRY_TYPE_LABELS[subjectRaw]
      ? subjectRaw || ENQUIRY_TYPE_LABELS[type] || 'Website enquiry'
      : ENQUIRY_TYPE_LABELS[subjectRaw] || subjectRaw

  const quantity = Number(body.quantity)
  const moq = Number(body.moq)

  return {
    name,
    email,
    phone: String(body.phone || '').trim() || undefined,
    type,
    subject,
    message,
    productName: String(body.productName || '').trim() || undefined,
    quantity: Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : undefined,
    moq: Number.isFinite(moq) && moq > 0 ? Math.floor(moq) : undefined,
  }
}

export async function GET() {
  try {
    const enquiries = await listEnquiries()
    return NextResponse.json(
      { enquiries, resendConfigured: isResendConfigured() },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load enquiries'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const input = parseBody(json)
    if (!input) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 },
      )
    }

    const draft = await createEnquiry(input, { emailStatus: 'skipped' })
    const emailResult = await sendEnquiryEmail(draft)

    const emailStatus =
      emailResult.status === 'sent'
        ? 'sent'
        : emailResult.status === 'failed'
          ? 'failed'
          : 'skipped'
    const emailError =
      emailResult.status === 'failed'
        ? emailResult.error
        : emailResult.status === 'skipped'
          ? emailResult.reason
          : undefined

    await updateEnquiryEmailStatus(draft.id, emailStatus, emailError)
    const enquiry = { ...draft, emailStatus, emailError }

    return NextResponse.json({
      ok: true,
      enquiry,
      email: emailResult,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to submit enquiry'
    console.error('[api/enquiries POST]', error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
