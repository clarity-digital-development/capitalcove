'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import ProgressBar from './ProgressBar';
import FormStep from './FormStep';
import ButtonSelector from './ButtonSelector';
import FormSuccess from './FormSuccess';
import { US_STATES, isExcludedState, SMS_CONSENT_COPY, SITE_CONFIG } from '@/lib/constants';
import { readAttribution } from '@/lib/attribution';

const fullApplicationSchema = z.object({
  // Step 1 - Deal Info
  loanPurpose: z.string().min(1, 'Required'),
  loanType: z.string().min(1, 'Required'),
  propertyType: z.string().min(1, 'Required'),
  // Step 2 - Property
  street: z.string().min(1, 'Required'),
  city: z.string().min(1, 'Required'),
  state: z.string().min(1, 'Required'),
  zip: z.string().regex(/^\d{5}$/, 'Enter a valid 5-digit ZIP'),
  purchasePrice: z.number().min(1, 'Required'),
  rehabBudget: z.number().optional(),
  arv: z.number().optional(),
  estimatedPropertyValue: z.number().optional(),
  monthlyRentalIncome: z.number().optional(),
  // Step 3 - Loan
  loanAmount: z.number().min(1, 'Required'),
  desiredTimeline: z.string().min(1, 'Required'),
  exitStrategy: z.string().min(1, 'Required'),
  // Step 4 - Experience (entityName always required — LLC mandatory)
  dealsCompleted: z.string().min(1, 'Required'),
  entityType: z.string().min(1, 'Required'),
  entityName: z.string().min(1, 'Entity name is required'),
  entityState: z.string().min(1, 'Required'),
  // Step 5 - Contact
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  phone: z
    .string()
    .regex(
      /^(\+1)?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      'Enter a valid US phone number',
    ),
  preferredContact: z.string().min(1, 'Required'),
  smsConsent: z.literal(true, { message: 'SMS consent is required' }),
  referralSource: z.string().optional(),
});

type FullApplicationData = z.infer<typeof fullApplicationSchema>;

const STORAGE_KEY = 'capitalcove_full_application';

const loanPurposeOptions = [
  { value: 'purchase', label: 'Purchase' },
  { value: 'refinance', label: 'Refinance' },
  { value: 'cash-out-refi', label: 'Cash-Out Refi' },
];

const loanTypeOptions = [
  { value: 'fix-and-flip', label: 'Fix & Flip' },
  { value: 'bridge', label: 'Bridge' },
  { value: 'rental', label: 'Rental / DSCR' },
  { value: 'new-construction', label: 'New Construction' },
];

const propertyTypeOptions = [
  { value: 'single-family', label: 'Single Family' },
  { value: '2-4-unit', label: '2-4 Unit' },
  { value: '5-plus-unit', label: '5+ Unit' },
  { value: 'mixed-use', label: 'Mixed Use' },
];

const timelineOptions = [
  { value: 'asap', label: 'ASAP' },
  { value: '30-days', label: '30 Days' },
  { value: '60-days', label: '60 Days' },
  { value: 'exploring', label: 'Just Exploring' },
];

const exitStrategyOptions = [
  { value: 'sell', label: 'Sell / Flip' },
  { value: 'refinance-permanent', label: 'Refinance to Permanent' },
  { value: 'hold-rental', label: 'Hold as Rental' },
  { value: 'other', label: 'Other' },
];

const dealsCompletedOptions = [
  { value: '0', label: '0' },
  { value: '1-4', label: '1-4' },
  { value: '5-10', label: '5-10' },
  { value: '10-20', label: '10-20' },
  { value: '20+', label: '20+' },
];

// Spec: LLC/Corporation/Trust/Other. No Individual option (LLC mandatory).
const entityTypeList = ['LLC', 'Corporation', 'Trust', 'Other'];

const contactMethodOptions = [
  { value: 'phone', label: 'Phone' },
  { value: 'email', label: 'Email' },
  { value: 'text', label: 'Text' },
];

const referralSources = [
  'Instagram',
  'Referral',
  'Google Search',
  'Facebook',
  'Other',
];

const STEP_LABELS = ['Deal', 'Property', 'Loan', 'Experience', 'Contact'];

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
  value: number | undefined;
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
          className={`w-full pl-7 pr-4 py-3 border rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal ${
            error ? 'border-red-400' : 'border-gray-200'
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function ConditionalField({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function FullApplicationForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const initialLoanType = (() => {
    const param = searchParams.get('type');
    if (!param) return '';
    const match = loanTypeOptions.find((opt) => opt.value === param);
    return match ? match.value : '';
  })();

  const defaultValues: FullApplicationData = {
    loanPurpose: '',
    loanType: initialLoanType,
    propertyType: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    purchasePrice: 0,
    rehabBudget: undefined,
    arv: undefined,
    estimatedPropertyValue: undefined,
    monthlyRentalIncome: undefined,
    loanAmount: 0,
    desiredTimeline: '',
    exitStrategy: '',
    dealsCompleted: '',
    entityType: '',
    entityName: '',
    entityState: '',
    name: '',
    email: '',
    phone: '',
    preferredContact: '',
    smsConsent: undefined as unknown as true,
    referralSource: '',
  };

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FullApplicationData>({
    resolver: zodResolver(fullApplicationSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const loanType = watch('loanType');
  const loanPurpose = watch('loanPurpose');
  const propertyState = watch('state');

  const showRehabBudget =
    loanType === 'fix-and-flip' || loanType === 'new-construction';
  const showArv = loanType === 'fix-and-flip';
  const showEstimatedValue =
    loanPurpose === 'refinance' || loanPurpose === 'cash-out-refi';
  const showMonthlyRental = loanType === 'rental';
  // Hard block: we do not lend in CA/AZ/HI/PR — cannot proceed past this step.
  const stateBlocked = Boolean(propertyState) && isExcludedState(propertyState);

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (initialLoanType) {
          parsed.loanType = initialLoanType;
        }
        reset(parsed);
      }
    } catch {
      // ignore
    }
  }, [reset, initialLoanType]);

  const saveToStorage = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(getValues()));
    } catch {
      // ignore
    }
  }, [getValues]);

  const stepFieldMap: Record<number, (keyof FullApplicationData)[]> = {
    1: ['loanPurpose', 'loanType', 'propertyType'],
    2: ['street', 'city', 'state', 'zip', 'purchasePrice'],
    3: ['loanAmount', 'desiredTimeline', 'exitStrategy'],
    4: ['dealsCompleted', 'entityType', 'entityName', 'entityState'],
    5: ['name', 'email', 'phone', 'preferredContact', 'smsConsent'],
  };

  const goForward = useCallback(async () => {
    // Hard-block excluded states — cannot advance past the property step
    if (step === 2 && isExcludedState(getValues('state'))) return;
    const fields = stepFieldMap[step];
    const valid = await trigger(fields);
    if (valid) {
      saveToStorage();
      setDirection('forward');
      setStep((s) => Math.min(s + 1, 5));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, trigger, saveToStorage, getValues]);

  const goBack = useCallback(() => {
    setDirection('back');
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const onSubmit = useCallback(async (data: FullApplicationData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, attribution: readAttribution() }),
      });
      if (!res.ok) throw new Error('Submit failed');
      localStorage.removeItem(STORAGE_KEY);
      setSubmitted(true);
    } catch {
      setSubmitError(
        `Something went wrong on our end. Your information wasn't submitted. Please try again, or call ${SITE_CONFIG.phone} and we'll take your deal over the phone.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  if (submitted) {
    return <FormSuccess type="full-application" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto">
      <ProgressBar currentStep={step} totalSteps={5} labels={STEP_LABELS} />

      <FormStep direction={direction} stepKey={step}>
        {/* Step 1: Deal Info */}
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-navy">Deal Information</h3>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Loan Purpose
              </label>
              <Controller
                control={control}
                name="loanPurpose"
                render={({ field }) => (
                  <ButtonSelector
                    options={loanPurposeOptions}
                    value={field.value}
                    onChange={field.onChange}
                    columns={3}
                  />
                )}
              />
              {errors.loanPurpose && (
                <p className="text-red-500 text-xs mt-1">{errors.loanPurpose.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Loan Type
              </label>
              <Controller
                control={control}
                name="loanType"
                render={({ field }) => (
                  <ButtonSelector
                    options={loanTypeOptions}
                    value={field.value}
                    onChange={field.onChange}
                    columns={2}
                  />
                )}
              />
              {errors.loanType && (
                <p className="text-red-500 text-xs mt-1">{errors.loanType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Property Type
              </label>
              <Controller
                control={control}
                name="propertyType"
                render={({ field }) => (
                  <ButtonSelector
                    options={propertyTypeOptions}
                    value={field.value}
                    onChange={field.onChange}
                    columns={2}
                  />
                )}
              />
              {errors.propertyType && (
                <p className="text-red-500 text-xs mt-1">{errors.propertyType.message}</p>
              )}
            </div>

            <button
              type="button"
              onClick={goForward}
              className="w-full py-3 bg-teal text-white rounded-button text-sm font-semibold hover:bg-teal-dark transition-colors cursor-pointer"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Property */}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-navy">Property Details</h3>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900">Property Address</h4>
              <Controller
                control={control}
                name="street"
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      placeholder="Street Address"
                      className={`w-full px-4 py-3 border rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal ${errors.street ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {errors.street && (
                      <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>
                    )}
                  </div>
                )}
              />
              <div className="grid grid-cols-3 gap-3">
                <Controller
                  control={control}
                  name="city"
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type="text"
                        placeholder="City"
                        className={`w-full px-4 py-3 border rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal ${errors.city ? 'border-red-400' : 'border-gray-200'}`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name="state"
                  render={({ field }) => (
                    <div>
                      <select
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className={`w-full px-4 py-3 border rounded-input text-sm text-gray-900 bg-white focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal ${errors.state ? 'border-red-400' : 'border-gray-200'}`}
                      >
                        <option value="">State</option>
                        {US_STATES.map((st) => (
                          <option key={st.value} value={st.value}>
                            {st.value}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name="zip"
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type="text"
                        inputMode="numeric"
                        maxLength={5}
                        placeholder="ZIP"
                        className={`w-full px-4 py-3 border rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal ${errors.zip ? 'border-red-400' : 'border-gray-200'}`}
                      />
                      {errors.zip && (
                        <p className="text-red-500 text-xs mt-1">{errors.zip.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
              {stateBlocked && (
                <div className="rounded-input border border-error/40 bg-error/10 p-3 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-error shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-700">
                    We do not currently lend in this state.
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Purchase Price
              </label>
              <Controller
                control={control}
                name="purchasePrice"
                render={({ field }) => (
                  <CurrencyInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="500,000"
                    error={errors.purchasePrice?.message}
                  />
                )}
              />
            </div>

            <ConditionalField show={showRehabBudget}>
              <div className="pt-1">
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Rehab Budget
                </label>
                <Controller
                  control={control}
                  name="rehabBudget"
                  render={({ field }) => (
                    <CurrencyInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="75,000"
                    />
                  )}
                />
              </div>
            </ConditionalField>

            <ConditionalField show={showArv}>
              <div className="pt-1">
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  After Repair Value (ARV)
                </label>
                <Controller
                  control={control}
                  name="arv"
                  render={({ field }) => (
                    <CurrencyInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="650,000"
                    />
                  )}
                />
              </div>
            </ConditionalField>

            <ConditionalField show={showEstimatedValue}>
              <div className="pt-1">
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Estimated Property Value
                </label>
                <Controller
                  control={control}
                  name="estimatedPropertyValue"
                  render={({ field }) => (
                    <CurrencyInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="500,000"
                    />
                  )}
                />
              </div>
            </ConditionalField>

            <ConditionalField show={showMonthlyRental}>
              <div className="pt-1">
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Monthly Rental Income
                </label>
                <Controller
                  control={control}
                  name="monthlyRentalIncome"
                  render={({ field }) => (
                    <CurrencyInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="3,000"
                    />
                  )}
                />
              </div>
            </ConditionalField>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={goBack}
                className="px-6 py-3 border border-gray-200 rounded-button text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goForward}
                disabled={stateBlocked}
                className="flex-1 py-3 bg-teal text-white rounded-button text-sm font-semibold hover:bg-teal-dark transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Loan */}
        {step === 3 && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-navy">Loan Request</h3>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Loan Amount Requested
              </label>
              <Controller
                control={control}
                name="loanAmount"
                render={({ field }) => (
                  <CurrencyInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="400,000"
                    error={errors.loanAmount?.message}
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Desired Timeline
              </label>
              <Controller
                control={control}
                name="desiredTimeline"
                render={({ field }) => (
                  <ButtonSelector
                    options={timelineOptions}
                    value={field.value}
                    onChange={field.onChange}
                    columns={2}
                  />
                )}
              />
              {errors.desiredTimeline && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.desiredTimeline.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Exit Strategy
              </label>
              <Controller
                control={control}
                name="exitStrategy"
                render={({ field }) => (
                  <ButtonSelector
                    options={exitStrategyOptions}
                    value={field.value}
                    onChange={field.onChange}
                    columns={2}
                  />
                )}
              />
              {errors.exitStrategy && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.exitStrategy.message}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={goBack}
                className="px-6 py-3 border border-gray-200 rounded-button text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goForward}
                disabled={stateBlocked}
                className="flex-1 py-3 bg-teal text-white rounded-button text-sm font-semibold hover:bg-teal-dark transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Borrower Profile */}
        {step === 4 && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-navy">Borrower Profile</h3>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Deals Completed in Last 24 Months
              </label>
              <Controller
                control={control}
                name="dealsCompleted"
                render={({ field }) => (
                  <ButtonSelector
                    options={dealsCompletedOptions}
                    value={field.value}
                    onChange={field.onChange}
                    columns={5}
                  />
                )}
              />
              {errors.dealsCompleted && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dealsCompleted.message}
                </p>
              )}
            </div>

            <div className="rounded-input bg-warm-gray border border-gray-100 p-3">
              <p className="text-xs text-gray-700">
                <span className="font-semibold">LLC required.</span> All loans close
                in a business entity. If you don&apos;t have one yet, we can point you
                to resources to get set up quickly.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Entity Name
              </label>
              <Controller
                control={control}
                name="entityName"
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Your LLC name (or “Forming LLC” if in progress)"
                    className={`w-full px-4 py-3 border rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal ${errors.entityName ? 'border-red-400' : 'border-gray-200'}`}
                  />
                )}
              />
              {errors.entityName && (
                <p className="text-red-500 text-xs mt-1">{errors.entityName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Entity Type
              </label>
              <Controller
                control={control}
                name="entityType"
                render={({ field }) => (
                  <select
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className={`w-full px-4 py-3 border rounded-input text-sm text-gray-900 bg-white focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal ${errors.entityType ? 'border-red-400' : 'border-gray-200'}`}
                  >
                    <option value="">Select entity type</option>
                    {entityTypeList.map((et) => (
                      <option key={et} value={et}>
                        {et}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.entityType && (
                <p className="text-red-500 text-xs mt-1">{errors.entityType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                State of Entity
              </label>
              <Controller
                control={control}
                name="entityState"
                render={({ field }) => (
                  <select
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className={`w-full px-4 py-3 border rounded-input text-sm text-gray-900 bg-white focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal ${errors.entityState ? 'border-red-400' : 'border-gray-200'}`}
                  >
                    <option value="">Select state</option>
                    {US_STATES.map((st) => (
                      <option key={st.value} value={st.value}>
                        {st.label}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.entityState && (
                <p className="text-red-500 text-xs mt-1">{errors.entityState.message}</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={goBack}
                className="px-6 py-3 border border-gray-200 rounded-button text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goForward}
                disabled={stateBlocked}
                className="flex-1 py-3 bg-teal text-white rounded-button text-sm font-semibold hover:bg-teal-dark transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Contact */}
        {step === 5 && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-navy">Contact Information</h3>

            <p className="text-xs text-gray-700 bg-teal/5 border border-teal/20 rounded-input p-3">
              No tax returns or W-2s needed. We verify capital with a recent bank
              statement.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Full Name
              </label>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="John Smith"
                    className={`w-full px-4 py-3 border rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
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
                    className={`w-full px-4 py-3 border rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
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
                    className={`w-full px-4 py-3 border rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal ${errors.phone ? 'border-red-400' : 'border-gray-200'}`}
                  />
                )}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Preferred Contact Method
              </label>
              <Controller
                control={control}
                name="preferredContact"
                render={({ field }) => (
                  <ButtonSelector
                    options={contactMethodOptions}
                    value={field.value}
                    onChange={field.onChange}
                    columns={3}
                  />
                )}
              />
              {errors.preferredContact && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.preferredContact.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                How Did You Hear About Us?
              </label>
              <Controller
                control={control}
                name="referralSource"
                render={({ field }) => (
                  <select
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className="w-full px-4 py-3 border border-gray-200 rounded-input text-sm text-gray-900 bg-white focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
                  >
                    <option value="">Select one (optional)</option>
                    {referralSources.map((src) => (
                      <option key={src} value={src}>
                        {src}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            <div className="flex items-start gap-2">
              <Controller
                control={control}
                name="smsConsent"
                render={({ field }) => (
                  <input
                    id="apply-sms-consent"
                    type="checkbox"
                    checked={field.value === true}
                    onChange={(e) =>
                      field.onChange(e.target.checked ? true : undefined)
                    }
                    onBlur={field.onBlur}
                    className="mt-1 accent-teal h-4 w-4"
                  />
                )}
              />
              <label
                htmlFor="apply-sms-consent"
                className="text-xs text-gray-600 leading-relaxed"
              >
                {SMS_CONSENT_COPY}
              </label>
            </div>
            {errors.smsConsent && (
              <p className="text-red-500 text-xs">{errors.smsConsent.message}</p>
            )}

            <div className="flex gap-3">
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
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit My Deal'
                )}
              </button>
            </div>
            {submitError && (
              <p className="text-error text-sm text-center mt-3 bg-error/10 border border-error/20 rounded-input px-3 py-2">
                {submitError}
              </p>
            )}
          </div>
        )}
      </FormStep>
    </form>
  );
}
