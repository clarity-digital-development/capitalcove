import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createContact, createOpportunity } from '@/lib/ghl';

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
  entityName: z.string().optional(),
  entityState: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(1),
  preferredContact: z.string().min(1),
  smsConsent: z.literal(true),
  referralSource: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = applicationSchema.parse(body);

    const nameParts = data.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const customFields: Array<{ key: string; value: string }> = [
      { key: 'loan_type', value: data.loanType },
      { key: 'property_type', value: data.propertyType },
      { key: 'property_address', value: `${data.street}, ${data.city}, ${data.state} ${data.zip}` },
      { key: 'property_state', value: data.state },
      { key: 'purchase_price', value: String(data.purchasePrice) },
      { key: 'loan_amount_requested', value: String(data.loanAmount) },
      { key: 'desired_timeline', value: data.desiredTimeline },
      { key: 'deal_exit_strategy', value: data.exitStrategy },
      { key: 'deals_completed', value: data.dealsCompleted },
      { key: 'entity_type', value: data.entityType },
      { key: 'preferred_contact', value: data.preferredContact },
    ];

    if (data.rehabBudget) {
      customFields.push({ key: 'rehab_budget', value: String(data.rehabBudget) });
    }
    if (data.arv) {
      customFields.push({ key: 'arv', value: String(data.arv) });
    }
    if (data.estimatedPropertyValue) {
      customFields.push({ key: 'estimated_property_value', value: String(data.estimatedPropertyValue) });
    }
    if (data.monthlyRentalIncome) {
      customFields.push({ key: 'monthly_rental_income', value: String(data.monthlyRentalIncome) });
    }
    if (data.entityName) {
      customFields.push({ key: 'entity_name', value: data.entityName });
    }
    if (data.entityState) {
      customFields.push({ key: 'entity_state', value: data.entityState });
    }
    if (data.referralSource) {
      customFields.push({ key: 'lead_source_detail', value: data.referralSource });
    }

    const contact = await createContact({
      firstName,
      lastName,
      email: data.email,
      phone: data.phone,
      source: 'Website - Full Application',
      customFields,
    });

    const oppName = `${data.name} - ${data.city}, ${data.state} - ${data.loanType}`;

    await createOpportunity({
      contactId: contact.id,
      name: oppName,
      status: 'open',
      monetaryValue: data.loanAmount,
    });

    return NextResponse.json({
      success: true,
      message: 'Your application has been submitted successfully. We will be in touch within 24 hours.',
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
