import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createContact, createOpportunity } from '@/lib/ghl';

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
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    const nameParts = (data.name || '').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const customFields: Array<{ key: string; value: string }> = [];

    if (data.loanType) {
      customFields.push({ key: 'loan_type', value: data.loanType });
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
      customFields.push({ key: 'loan_amount_requested', value: String(data.loanAmount) });
    }
    if (data.message) {
      customFields.push({ key: 'notes', value: data.message });
    }

    const contact = await createContact({
      firstName,
      lastName,
      email: data.email,
      phone: data.phone || '',
      source: data.source || 'Website - Quick Quote',
      customFields,
    });

    const oppName = data.loanType
      ? `${data.name || data.email} - ${data.loanType}`
      : `${data.name || data.email} - Contact Inquiry`;

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
