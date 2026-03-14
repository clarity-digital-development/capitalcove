'use client';

import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ProgressBar from './ProgressBar';
import FormStep from './FormStep';
import ButtonSelector from './ButtonSelector';
import FormSuccess from './FormSuccess';

const quickQuoteSchema = z.object({
  loanType: z.string().min(1, 'Please select a loan type'),
  propertyState: z.string().min(1, 'Please select a state'),
  propertyType: z.string().min(1, 'Please select a property type'),
  purchasePrice: z.number().min(50000, 'Minimum $50,000'),
  loanAmount: z.number().min(50000, 'Minimum $50,000'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^(\+1)?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Enter a valid US phone number'),
  email: z.string().email('Enter a valid email address'),
  smsConsent: z.literal(true, { message: 'SMS consent is required' }),
});

type QuickQuoteData = z.infer<typeof quickQuoteSchema>;

const loanTypeOptions = [
  { value: 'fix-flip', label: 'Fix & Flip' },
  { value: 'bridge', label: 'Bridge' },
  { value: 'rental', label: 'Rental' },
  { value: 'new-construction', label: 'New Construction' },
];

const propertyTypeOptions = [
  { value: 'single-family', label: 'Single Family' },
  { value: 'multi-family', label: 'Multi-Family' },
  { value: 'commercial', label: 'Commercial' },
];

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
];

function formatCurrency(val: number): string {
  return val.toLocaleString('en-US');
}

function parseCurrencyString(raw: string): number {
  const stripped = raw.replace(/[^0-9]/g, '');
  return stripped ? parseInt(stripped, 10) : 0;
}

function CurrencyInput({
  value,
  onChange,
  placeholder,
  error,
}: {
  value: number;
  onChange: (val: number) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm">$</span>
        <input
          type="text"
          inputMode="numeric"
          value={value ? formatCurrency(value) : ''}
          onChange={(e) => onChange(parseCurrencyString(e.target.value))}
          placeholder={placeholder}
          className={`w-full pl-7 pr-4 py-3 border rounded-input text-gray-900 text-sm focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal ${
            error ? 'border-red-400' : 'border-gray-200'
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function QuickQuoteForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuickQuoteData>({
    resolver: zodResolver(quickQuoteSchema),
    defaultValues: {
      loanType: '',
      propertyState: '',
      propertyType: '',
      purchasePrice: 0,
      loanAmount: 0,
      name: '',
      phone: '',
      email: '',
      smsConsent: undefined as unknown as true,
    },
    mode: 'onTouched',
  });

  const goForward = useCallback(() => {
    setDirection('forward');
    setStep((s) => Math.min(s + 1, 4));
  }, []);

  const goBack = useCallback(() => {
    setDirection('back');
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const handleLoanTypeSelect = useCallback(
    (val: string) => {
      setValue('loanType', val);
      goForward();
    },
    [setValue, goForward]
  );

  const handleStep2Next = useCallback(async () => {
    const valid = await trigger(['propertyState', 'propertyType']);
    if (valid) goForward();
  }, [trigger, goForward]);

  const handleStep3Next = useCallback(async () => {
    const valid = await trigger(['purchasePrice', 'loanAmount']);
    if (valid) goForward();
  }, [trigger, goForward]);

  const onSubmit = useCallback(
    async (data: QuickQuoteData) => {
      setIsSubmitting(true);
      try {
        const res = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Submit failed');
        setSubmitted(true);
      } catch {
        // Could add error handling UI here
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  if (submitted) {
    return <FormSuccess type="quick-quote" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto">
      <ProgressBar currentStep={step} totalSteps={4} />

      <FormStep direction={direction} stepKey={step}>
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold text-navy mb-4">What type of loan do you need?</h3>
            <Controller
              control={control}
              name="loanType"
              render={({ field }) => (
                <ButtonSelector
                  options={loanTypeOptions}
                  value={field.value}
                  onChange={handleLoanTypeSelect}
                  columns={2}
                />
              )}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold text-navy mb-4">Tell us about the property</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Property State</label>
                <Controller
                  control={control}
                  name="propertyState"
                  render={({ field }) => (
                    <select
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-4 py-3 border rounded-input text-sm text-gray-900 bg-white focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal ${
                        errors.propertyState ? 'border-red-400' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select a state</option>
                      {US_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.propertyState && (
                  <p className="text-red-500 text-xs mt-1">{errors.propertyState.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Property Type</label>
                <Controller
                  control={control}
                  name="propertyType"
                  render={({ field }) => (
                    <ButtonSelector
                      options={propertyTypeOptions}
                      value={field.value}
                      onChange={field.onChange}
                      columns={3}
                    />
                  )}
                />
                {errors.propertyType && (
                  <p className="text-red-500 text-xs mt-1">{errors.propertyType.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={goBack}
                className="px-6 py-3 border border-gray-200 rounded-button text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleStep2Next}
                className="flex-1 py-3 bg-teal text-white rounded-button text-sm font-semibold hover:bg-teal-dark transition-colors cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold text-navy mb-4">Loan details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Purchase Price</label>
                <Controller
                  control={control}
                  name="purchasePrice"
                  render={({ field }) => (
                    <CurrencyInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="250,000"
                      error={errors.purchasePrice?.message}
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Loan Amount Needed</label>
                <Controller
                  control={control}
                  name="loanAmount"
                  render={({ field }) => (
                    <CurrencyInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="200,000"
                      error={errors.loanAmount?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={goBack}
                className="px-6 py-3 border border-gray-200 rounded-button text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleStep3Next}
                className="flex-1 py-3 bg-teal text-white rounded-button text-sm font-semibold hover:bg-teal-dark transition-colors cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="text-lg font-semibold text-navy mb-4">How can we reach you?</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Full Name</label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="John Smith"
                      className={`w-full px-4 py-3 border rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal ${
                        errors.name ? 'border-red-400' : 'border-gray-200'
                      }`}
                    />
                  )}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Phone</label>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      placeholder="(555) 555-5555"
                      className={`w-full px-4 py-3 border rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal ${
                        errors.phone ? 'border-red-400' : 'border-gray-200'
                      }`}
                    />
                  )}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Email</label>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 border rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal ${
                        errors.email ? 'border-red-400' : 'border-gray-200'
                      }`}
                    />
                  )}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div className="flex items-start gap-2">
                <Controller
                  control={control}
                  name="smsConsent"
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value === true}
                      onChange={(e) => field.onChange(e.target.checked ? true : undefined)}
                      onBlur={field.onBlur}
                      className="mt-1 accent-teal"
                    />
                  )}
                />
                <label className="text-xs text-gray-600">
                  I consent to receive SMS messages about my loan inquiry. Message &amp; data rates may apply.
                </label>
              </div>
              {errors.smsConsent && (
                <p className="text-red-500 text-xs">{errors.smsConsent.message}</p>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={goBack}
                className="px-6 py-3 border border-gray-200 rounded-button text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 bg-gold text-navy rounded-button text-sm font-bold hover:bg-gold-light transition-colors disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Get My Rate Quote'
                )}
              </button>
            </div>
            <p className="text-xs text-gray-600 text-center mt-3">
              No credit check required. No obligation.
            </p>
          </div>
        )}
      </FormStep>
    </form>
  );
}
