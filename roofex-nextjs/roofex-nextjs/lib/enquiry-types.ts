export type EnquiryType =
  | 'general'
  | 'product'
  | 'order-on-demand'
  | 'bulk'
  | 'order'
  | 'business'
  | 'other'

export type EnquiryEmailStatus = 'sent' | 'skipped' | 'failed'

export type Enquiry = {
  id: string
  createdAt: string
  name: string
  email: string
  phone?: string
  type: EnquiryType | string
  subject: string
  message: string
  productName?: string
  quantity?: number
  moq?: number
  emailStatus: EnquiryEmailStatus
  emailError?: string
}

export type CreateEnquiryInput = {
  name: string
  email: string
  phone?: string
  type?: string
  subject: string
  message: string
  productName?: string
  quantity?: number
  moq?: number
}

export const ENQUIRY_TYPE_LABELS: Record<string, string> = {
  general: 'General Inquiry',
  product: 'Product Enquiry',
  'order-on-demand': 'Order on Demand',
  bulk: 'Bulk / Corporate Order',
  order: 'Order Status',
  business: 'Business & Partnerships',
  other: 'Other',
}
