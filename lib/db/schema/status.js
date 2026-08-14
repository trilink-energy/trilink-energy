export const BUSINESS_STATUSES = {
  OPPORTUNITY: [
    'new',
    'qualified',
    'proposal',
    'negotiation',
    'won',
    'lost',
    'cancelled'
  ],

  ORDER: [
    'draft',
    'pending_approval',
    'approved',
    'processing',
    'fulfilled',
    'cancelled'
  ],

  SHIPMENT: [
    'planned',
    'booked',
    'in_transit',
    'customs',
    'delivered',
    'delayed',
    'cancelled'
  ],

  INVOICE: [
    'draft',
    'issued',
    'partially_paid',
    'paid',
    'overdue',
    'cancelled'
  ],

  AI_TASK: [
    'queued',
    'running',
    'waiting_approval',
    'completed',
    'failed',
    'cancelled'
  ],

  APPROVAL: [
    'pending',
    'approved',
    'rejected',
    'expired',
    'cancelled'
  ]
}
