import { z } from 'zod';

// ---------------------------------------------------------------------------
// Shared patterns & helpers
// ---------------------------------------------------------------------------

/** Matches US phone numbers: (xxx) xxx-xxxx, xxx-xxx-xxxx, xxxxxxxxxx, etc. */
const US_PHONE_REGEX = /^\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

// ---------------------------------------------------------------------------
// Quick Quote Schema
// ---------------------------------------------------------------------------

export const quickQuoteSchema = z.object({
  loanType: z.enum(
    ['fix-and-flip', 'bridge', 'rental', 'new-construction'],
    { message: 'Please select a loan type' },
  ),
  propertyState: z
    .string({ message: 'Please select a state' })
    .min(2, 'Please select a state'),
  propertyType: z.enum(
    [
      'single-family',
      'multi-family-2-4',
      'multi-family-5-plus',
      'townhome-condo',
      'mixed-use',
      'commercial',
    ],
    { message: 'Please select a property type' },
  ),
  purchasePrice: z.coerce
    .number({ message: 'Please enter the purchase price' })
    .min(50000, 'Minimum purchase price is $50,000'),
  loanAmount: z.coerce
    .number({ message: 'Please enter the loan amount' })
    .min(50000, 'Minimum loan amount is $50,000'),
  name: z
    .string({ message: 'Please enter your name' })
    .min(2, 'Name must be at least 2 characters'),
  phone: z
    .string({ message: 'Please enter your phone number' })
    .regex(US_PHONE_REGEX, 'Please enter a valid US phone number'),
  email: z
    .string({ message: 'Please enter your email' })
    .email('Please enter a valid email address'),
  smsConsent: z.literal(true, {
    message: 'You must consent to receive SMS messages',
  }),
});

export type QuickQuoteData = z.infer<typeof quickQuoteSchema>;

// ---------------------------------------------------------------------------
// Full Application Schema (5-step form)
// ---------------------------------------------------------------------------

export const fullApplicationSchema = z.object({
  // Step 1 — Loan Info
  loanType: z.enum(
    ['fix-and-flip', 'bridge', 'rental', 'new-construction'],
    { message: 'Please select a loan type' },
  ),
  loanPurpose: z.enum(
    ['purchase', 'refinance', 'cash-out-refinance'],
    { message: 'Please select the loan purpose' },
  ),
  purchasePrice: z.coerce
    .number({ message: 'Please enter the purchase price' })
    .min(50000, 'Minimum purchase price is $50,000'),
  loanAmount: z.coerce
    .number({ message: 'Please enter the loan amount' })
    .min(50000, 'Minimum loan amount is $50,000'),
  rehabBudget: z.coerce.number().min(0).optional(),
  afterRepairValue: z.coerce.number().min(0).optional(),
  constructionBudget: z.coerce.number().min(0).optional(),
  monthlyRent: z.coerce.number().min(0).optional(),

  // Step 2 — Property Info
  propertyAddress: z
    .string({ message: 'Please enter the property address' })
    .min(5, 'Please enter a valid address'),
  propertyCity: z
    .string({ message: 'Please enter the city' })
    .min(2, 'Please enter a valid city'),
  propertyState: z
    .string({ message: 'Please select a state' })
    .min(2, 'Please select a state'),
  propertyZip: z
    .string({ message: 'Please enter the ZIP code' })
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  propertyType: z.enum(
    [
      'single-family',
      'multi-family-2-4',
      'multi-family-5-plus',
      'townhome-condo',
      'mixed-use',
      'commercial',
    ],
    { message: 'Please select a property type' },
  ),
  propertyCondition: z.enum(
    ['excellent', 'good', 'fair', 'poor', 'land-only'],
    { message: 'Please select the property condition' },
  ),
  occupancy: z.enum(
    ['vacant', 'tenant-occupied', 'owner-occupied', 'not-applicable'],
    { message: 'Please select the occupancy status' },
  ),

  // Step 3 — Borrower Info
  firstName: z
    .string({ message: 'Please enter your first name' })
    .min(1, 'First name is required'),
  lastName: z
    .string({ message: 'Please enter your last name' })
    .min(1, 'Last name is required'),
  email: z
    .string({ message: 'Please enter your email' })
    .email('Please enter a valid email address'),
  phone: z
    .string({ message: 'Please enter your phone number' })
    .regex(US_PHONE_REGEX, 'Please enter a valid US phone number'),
  entityName: z.string().optional(),
  entityType: z
    .enum(['llc', 'corporation', 'trust', 'individual', 'other'])
    .optional(),

  // Step 4 — Experience & Financials
  experienceLevel: z.enum(
    ['new', 'experienced', 'high-volume'],
    { message: 'Please select your experience level' },
  ),
  dealsCompleted: z.coerce
    .number({ message: 'Please enter the number of deals completed' })
    .min(0),
  estimatedCreditScore: z.enum(
    ['below-620', '620-659', '660-699', '700-739', '740-plus'],
    { message: 'Please select your estimated credit score range' },
  ),
  hasForeclosures: z.boolean().optional(),
  hasBankruptcy: z.boolean().optional(),
  exitStrategy: z.enum(
    ['sell', 'refinance', 'hold-rental', 'other'],
    { message: 'Please select your exit strategy' },
  ),
  exitTimelineMonths: z.coerce.number().min(1).max(360).optional(),

  // Step 5 — Consent & Submit
  additionalNotes: z.string().max(2000).optional(),
  preferredContact: z
    .enum(['phone', 'email', 'text'])
    .optional(),
  howDidYouHear: z.string().optional(),
  smsConsent: z.literal(true, {
    message: 'You must consent to receive SMS messages',
  }),
  termsConsent: z.literal(true, {
    message: 'You must agree to the terms and conditions',
  }),
});

export type FullApplicationData = z.infer<typeof fullApplicationSchema>;

// ---------------------------------------------------------------------------
// Contact Form Schema
// ---------------------------------------------------------------------------

export const contactFormSchema = z.object({
  name: z
    .string({ message: 'Please enter your name' })
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string({ message: 'Please enter your email' })
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(US_PHONE_REGEX, 'Please enter a valid US phone number')
    .optional()
    .or(z.literal('')),
  message: z
    .string({ message: 'Please enter a message' })
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be under 5,000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
