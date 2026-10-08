/**
 * Kerniva SaaS Multi-Tenant Operational Contracts
 * Polylolli is one vertical tenant on the Kerniva platform.
 */

export type TenantId = 'polylolli-art-lik' | 'crowlee-art' | 'future-tenant';

export type EventStatus = 
  | 'ENQUIRY_RECEIVED'
  | 'QUOTE_SENT'
  | 'QUOTE_ACCEPTED'
  | 'DEPOSIT_PENDING'
  | 'CONFIRMED'
  | 'IN_PREPARATION'
  | 'COMPLETED'
  | 'CANCELLED';

export type ChangeRequestStatus = 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';

export interface Customer {
  id: string;
  tenantId: TenantId;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface ServicePackage {
  id: string;
  tenantId: TenantId;
  slug: string;
  name: { en: string; es: string };
  tagline: { en: string; es: string };
  price: number;
  depositRequired: number;
  durationHours: number;
  maxChildren: number;
  ageRange: string;
  colorTheme: string;
  accentHex: string;
  features: { en: string[]; es: string[] };
  suitableFor: { en: string; es: string };
}

export interface LowRiskPreferences {
  estimatedChildren: number;
  allergies: string;
  accessibilityNotes: string;
  musicPreferences: string;
  themePreferences: string;
  venueParkingNotes: string;
  generalNotes: string;
}

export interface ChangeRequest {
  id: string;
  tenantId: TenantId;
  bookingRef: string;
  requestedAt: string;
  requestedBy: 'CUSTOMER' | 'BUSINESS';
  field: string;
  currentValue: string;
  requestedValue: string;
  reason: string;
  status: ChangeRequestStatus;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewerNotes?: string;
}

export interface Quote {
  id: string;
  tenantId: TenantId;
  bookingRef: string;
  packageId: string;
  packageName: string;
  subtotal: number;
  travelFee: number;
  total: number;
  depositAmount: number;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'EXPIRED';
  acceptedAt?: string;
  termsVersion: string;
}

export interface PaymentRecord {
  id: string;
  tenantId: TenantId;
  bookingRef: string;
  amount: number;
  type: 'DEPOSIT' | 'BALANCE' | 'REFUND';
  status: 'PENDING' | 'SUCCEEDED' | 'FAILED';
  paidAt: string;
  providerReference: string;
  paymentMethod: string;
}

export interface EventDetails {
  id: string;
  tenantId: TenantId;
  bookingRef: string;
  celebrantName: string;
  celebrantAge: number;
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  durationHours: number;
  venueName: string;
  venueAddress: string;
  packageId: string;
  packageName: string;
  theme: string;
  status: EventStatus;
  preferences: LowRiskPreferences;
}

export interface Booking {
  publicId: string; // Opaque customer visible ref e.g. "PLY-26-8K2F"
  tenantId: TenantId;
  customerId: string;
  eventId: string;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
  totalAmount: number;
  depositPaid: number;
  outstandingBalance: number;
  depositPaidAt?: string;
}

export interface SmartEvent {
  id: string;
  tenantId: TenantId;
  eventType: 
    | 'enquiry.created'
    | 'quote.sent'
    | 'quote.accepted'
    | 'deposit.requested'
    | 'payment.completed'
    | 'booking.confirmed'
    | 'booking.change_requested'
    | 'booking.change_resolved'
    | 'customer.preferences_updated';
  title: string;
  description: string;
  payload: Record<string, any>;
  timestamp: string;
  severity: 'info' | 'action_required' | 'success';
}

export interface AuditLogEntry {
  id: string;
  tenantId: TenantId;
  entityType: 'BOOKING' | 'QUOTE' | 'PAYMENT' | 'CHANGE_REQUEST' | 'PREFERENCES';
  entityId: string;
  action: string;
  performedBy: string;
  details: string;
  timestamp: string;
}
