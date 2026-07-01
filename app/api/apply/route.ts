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

const applicationSchema = z.object({
  loanPurpose: z.string().min(1),
  loanType: z.string().min(1),
  propertyType: z.string().min(1),
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
  purchasePrice: z.number().min(1),
  rehabBudget: z.number().optional(),
  arv: z.number().optional(),
  estimatedPropertyValue: z.number().optional(),
  monthlyRentalIncome: z.number().optional(),
  loanAmount: z.number().min(1),
  desiredTimeline: z.string().min(1),
  exitStrategy: z.string().min(1),
  dealsCompleted: z.string().min(1),
  entityType: z.string().min(1),
  entityName: z.string().min(1),
  entityState: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(1),
  preferredContact: z.string().min(1),
  smsConsent: z.literal(true),
  referralSource: z.string().optional(),
  attribution: attributionSchema,
});

const LOAN_TYPE_DISPLAY: Record<string, string> = {
  'fix-and-flip': 'Fix & Flip',
  bridge: 'Bridge',
  rental: 'Rental / DSCR',
  'new-construction': 'New Construction',
};

function loanTypeDisplay(slug: string): string {
  return LOAN_TYPE_DISPLAY[slug] ?? slug;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = applicationSchema.parse(body);

    const nameParts = data.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const customFields: Array<{ key: string; value: string }> = [
      { key: 'loan_type', value: loanTypeDisplay(data.loanType) },
      { key: 'property_type', value: data.propertyType },
      {
        key: 'property_address',
        value: `${data.street}, ${data.city}, ${data.state} ${data.zip}`,
      },
      { key: 'property_state', value: data.state },
      { key: 'purchase_price', value: String(data.purchasePrice) },
      { key: 'loan_amount_requested', value: String(data.loanAmount) },
      { key: 'desired_timeline', value: data.desiredTimeline },
      { key: 'deal_exit_strategy', value: data.exitStrategy },
      { key: 'deals_completed', value: data.dealsCompleted },
      { key: 'entity_type', value: data.entityType },
      // Writes into Dalton's existing GHL "LLC Name" field (key: llc_name)
      { key: 'llc_name', value: data.entityName },
      { key: 'entity_state', value: data.entityState },
      { key: 'preferred_contact', value: data.preferredContact },
      // TCPA/SMS consent — required to submit (literal true), stored with a timestamp
      { key: 'sms_consent', value: 'true' },
      { key: 'sms_consent_timestamp', value: new Date().toISOString() },
    ];

    if (data.rehabBudget) {
      customFields.push({ key: 'rehab_budget', value: String(data.rehabBudget) });
    }
    if (data.arv) {
      customFields.push({ key: 'arv', value: String(data.arv) });
    }
    if (data.estimatedPropertyValue) {
      customFields.push({
        key: 'estimated_property_value',
        value: String(data.estimatedPropertyValue),
      });
    }
    if (data.monthlyRentalIncome) {
      customFields.push({
        key: 'monthly_rental_income',
        value: String(data.monthlyRentalIncome),
      });
    }
    if (data.referralSource) {
      customFields.push({ key: 'lead_source_detail', value: data.referralSource });
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

    const contact = await createContact({
      firstName,
      lastName,
      email: data.email,
      phone: data.phone,
      source: 'Website - Full Application',
      customFields,
    });

    // Opportunity name format per spec: "Name - PropertyState - LoanType"
    const oppName = `${data.name} - ${data.state} - ${loanTypeDisplay(data.loanType)}`;

    await createOpportunity({
      contactId: contact.id,
      name: oppName,
      status: 'open',
      monetaryValue: data.loanAmount,
    });

    return NextResponse.json({
      success: true,
      message:
        "We've got your deal. Dalton will reach out within minutes — check your phone.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid application data. Please review your submission.',
          errors: error.issues,
        },
        { status: 400 },
      );
    }

    console.error('Application submission error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your application. Please try again.',
      },
      { status: 500 },
    );
  }
}
