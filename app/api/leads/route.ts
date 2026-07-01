import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createContact, createOpportunity } from '@/lib/ghl';

const attributionSchema = z
  .object({
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
    utmTerm: z.string().optional(),
    utmContent: z.string().optional(),
    gclid: z.string().optional(),
    fbclid: z.string().optional(),
    referrer: z.string().optional(),
    landingPage: z.string().optional(),
    capturedAt: z.string().optional(),
  })
  .optional();

const estimateSchema = z
  .object({
    rateLow: z.number(),
    rateHigh: z.number(),
    monthlyPaymentLow: z.number(),
    monthlyPaymentHigh: z.number(),
    cashToCloseLow: z.number(),
    cashToCloseHigh: z.number(),
  })
  .optional();

const leadSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
  loanType: z.string().optional(),
  propertyState: z.string().optional(),
  propertyType: z.string().optional(),
  purchasePrice: z.number().optional(),
  loanAmount: z.number().optional(),
  /** TCPA/SMS opt-in — captured on the Quick Quote form. */
  smsConsent: z.boolean().optional(),
  attribution: attributionSchema,
  /** Gate confirmation: borrower confirms LLC/Corp/Trust ('entity'). */
  borrowerEntity: z.enum(['entity', 'individual']).optional(),
  /** Gate confirmation: borrower confirms property is non-owner-occupied. */
  nonOwnerOccupied: z.boolean().optional(),
  /** Term-sheet preview estimate values shown to borrower (when flag is on). */
  estimate: estimateSchema,
});

const LOAN_TYPE_DISPLAY: Record<string, string> = {
  'fix-and-flip': 'Fix & Flip',
  bridge: 'Bridge',
  rental: 'Rental / DSCR',
  'new-construction': 'New Construction',
};

function loanTypeDisplay(slug?: string): string | undefined {
  if (!slug) return undefined;
  return LOAN_TYPE_DISPLAY[slug] ?? slug;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    const nameParts = (data.name || '').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const loanTypeDisplayName = loanTypeDisplay(data.loanType);

    const customFields: Array<{ key: string; value: string }> = [];

    if (data.loanType) {
      customFields.push({ key: 'loan_type', value: loanTypeDisplayName! });
    }
    if (data.propertyState) {
      customFields.push({ key: 'property_state', value: data.propertyState });
    }
    if (data.propertyType) {
      customFields.push({ key: 'property_type', value: data.propertyType });
    }
    if (data.purchasePrice) {
      customFields.push({ key: 'purchase_price', value: String(data.purchasePrice) });
    }
    if (data.loanAmount) {
      customFields.push({
        key: 'loan_amount_requested',
        value: String(data.loanAmount),
      });
    }
    if (data.message) {
      customFields.push({ key: 'lead_notes', value: data.message });
    }

    // TCPA/SMS consent — persist an auditable opt-in record with a timestamp
    if (data.smsConsent) {
      customFields.push({ key: 'sms_consent', value: 'true' });
      customFields.push({
        key: 'sms_consent_timestamp',
        value: new Date().toISOString(),
      });
    }

    // Attribution custom fields — first-touch UTM, referrer, landing page
    const attr = data.attribution;
    if (attr) {
      if (attr.utmSource) customFields.push({ key: 'utm_source', value: attr.utmSource });
      if (attr.utmMedium) customFields.push({ key: 'utm_medium', value: attr.utmMedium });
      if (attr.utmCampaign) customFields.push({ key: 'utm_campaign', value: attr.utmCampaign });
      if (attr.utmTerm) customFields.push({ key: 'utm_term', value: attr.utmTerm });
      if (attr.utmContent) customFields.push({ key: 'utm_content', value: attr.utmContent });
      if (attr.gclid) customFields.push({ key: 'gclid', value: attr.gclid });
      if (attr.fbclid) customFields.push({ key: 'fbclid', value: attr.fbclid });
      if (attr.referrer) customFields.push({ key: 'referrer', value: attr.referrer });
      if (attr.landingPage) customFields.push({ key: 'landing_page', value: attr.landingPage });
    }

    // Gate confirmations — borrower attested to entity + non-owner-occupied
    if (data.borrowerEntity) {
      customFields.push({
        key: 'entity_borrower_confirmed',
        value: data.borrowerEntity === 'entity' ? 'true' : 'false',
      });
    }
    if (typeof data.nonOwnerOccupied === 'boolean') {
      customFields.push({
        key: 'non_owner_occupied_confirmed',
        value: data.nonOwnerOccupied ? 'true' : 'false',
      });
    }

    // Term-sheet estimate shown to borrower (when preview flag is enabled)
    const est = data.estimate;
    if (est) {
      customFields.push({ key: 'estimate_rate_low', value: String(est.rateLow) });
      customFields.push({ key: 'estimate_rate_high', value: String(est.rateHigh) });
      customFields.push({ key: 'estimate_monthly_low', value: String(est.monthlyPaymentLow) });
      customFields.push({ key: 'estimate_monthly_high', value: String(est.monthlyPaymentHigh) });
      customFields.push({ key: 'estimate_cash_to_close_low', value: String(est.cashToCloseLow) });
      customFields.push({ key: 'estimate_cash_to_close_high', value: String(est.cashToCloseHigh) });
    }

    const contact = await createContact({
      firstName,
      lastName,
      email: data.email,
      phone: data.phone || '',
      source: data.source || 'Website - Quick Quote',
      customFields,
    });

    // Opportunity name format per spec: "Name - PropertyState - LoanType"
    const label = data.name || data.email;
    const state = data.propertyState ?? '—';
    const program = loanTypeDisplayName ?? 'Contact Inquiry';
    const oppName = `${label} - ${state} - ${program}`;

    await createOpportunity({
      contactId: contact.id,
      name: oppName,
      status: 'open',
      monetaryValue: data.loanAmount,
    });

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been submitted successfully.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid form data. Please check your inputs.',
          errors: error.issues,
        },
        { status: 400 },
      );
    }

    console.error('Lead submission error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your request. Please try again.',
      },
      { status: 500 },
    );
  }
}
