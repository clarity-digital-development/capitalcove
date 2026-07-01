'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, Phone } from 'lucide-react';
import {
  type TermSheetEstimate,
  TERM_SHEET_DISCLAIMER_DRAFT,
  formatDollar,
  formatDollarRange,
  formatPercentRange,
} from '@/lib/termSheet';
import { SITE_CONFIG, US_STATES } from '@/lib/constants';

interface TermSheetPreviewProps {
  estimate: TermSheetEstimate;
  /** 2-letter state code for the interpolated loader copy. */
  propertyState?: string;
  /** Called when the borrower clicks the primary CTA to confirm submission. */
  onConfirm?: () => void;
}

const STAT_REVEAL_DELAY = 0.08; // staggered fade-in per stat
const LOADER_DURATION_MS = 1200;

interface StatProps {
  label: string;
  value: string;
  helper: string;
  prominent?: boolean;
  delay: number;
}

function Stat({ label, value, helper, prominent, delay }: StatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className={prominent ? 'col-span-1 sm:col-span-2' : ''}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
        {label}
      </p>
      <p
        className={`mt-1 font-bold text-navy ${
          prominent ? 'text-3xl sm:text-4xl' : 'text-xl'
        }`}
      >
        {value}
      </p>
      <p className="text-xs text-gray-600 mt-1 leading-snug">{helper}</p>
    </motion.div>
  );
}

function Loader({ stateLabel }: { stateLabel: string }) {
  return (
    <motion.div
      key="loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <div className="relative w-3 h-3 mb-5">
        <span className="absolute inset-0 rounded-full bg-teal animate-ping opacity-75" />
        <span className="relative inline-flex rounded-full w-3 h-3 bg-teal" />
      </div>
      <p className="text-base font-medium text-navy">Pricing your deal...</p>
      <p className="text-sm text-gray-600 mt-1">
        Pulling current rate band for {stateLabel} fix &amp; flip.
      </p>
    </motion.div>
  );
}

export default function TermSheetPreview({
  estimate,
  propertyState,
  onConfirm,
}: TermSheetPreviewProps) {
  const [phase, setPhase] = useState<'loading' | 'reveal'>('loading');

  useEffect(() => {
    const timer = setTimeout(() => setPhase('reveal'), LOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  const stateLabel =
    US_STATES.find((s) => s.value === propertyState)?.label ?? 'your state';

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {phase === 'loading' && <Loader key="loader" stateLabel={stateLabel} />}

        {phase === 'reveal' && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div>
              <span className="inline-block text-xs font-semibold tracking-wider text-gold uppercase">
                Estimate — Preview
              </span>
              <h3 className="text-xl font-semibold text-navy mt-2">
                Here&apos;s the shape of your deal.
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Based on what you told us. Subject to underwriting.
              </p>
            </div>

            {/* Stat card */}
            <div className="mt-5 bg-white border border-gray-200 rounded-card overflow-hidden">
              {/* Prominent rate range */}
              <div className="px-6 py-6 border-b border-gray-100">
                <Stat
                  label="Estimated Rate Range"
                  value={formatPercentRange(estimate.rate)}
                  helper={estimate.loanTermLabel}
                  prominent
                  delay={0}
                />
              </div>

              {/* 2x2 stat grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 px-6 py-5 border-b border-gray-100">
                <Stat
                  label="Loan Amount Estimate"
                  value={formatDollar(estimate.loanAmount)}
                  helper="From your input"
                  delay={STAT_REVEAL_DELAY}
                />
                <Stat
                  label="Monthly Payment Estimate"
                  value={formatDollarRange(estimate.monthlyPayment)}
                  helper="Interest-only, range reflects rate band"
                  delay={STAT_REVEAL_DELAY * 2}
                />
                <Stat
                  label="Estimated Cash to Close"
                  value={formatDollarRange(estimate.cashToClose)}
                  helper="Down payment + estimated closing costs"
                  delay={STAT_REVEAL_DELAY * 3}
                />
                <Stat
                  label="Max Loan Based on ARV"
                  value="Up to ~75% of ARV"
                  helper={estimate.arvRule}
                  delay={STAT_REVEAL_DELAY * 4}
                />
              </div>

              {/* Conspicuous disclaimer — same card, same font weight, adjacent */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: STAT_REVEAL_DELAY * 5, duration: 0.3 }}
                className="bg-warm-gray px-6 py-4 flex items-start gap-3"
              >
                <Info className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                <p className="text-sm text-gray-800 leading-relaxed">
                  {TERM_SHEET_DISCLAIMER_DRAFT}
                </p>
              </motion.div>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: STAT_REVEAL_DELAY * 6, duration: 0.3 }}
              className="mt-5 space-y-3"
            >
              <button
                type="button"
                onClick={onConfirm}
                className="w-full py-3 bg-gold text-navy rounded-button text-sm font-bold hover:bg-gold-light transition-colors cursor-pointer"
              >
                Get my real term sheet
              </button>
              <a
                href={SITE_CONFIG.phoneHref}
                className="block text-center text-sm text-navy hover:text-teal transition-colors"
              >
                <Phone className="inline w-4 h-4 mr-1 -mt-0.5" />
                Or call {SITE_CONFIG.phone} to walk through it now
              </a>
            </motion.div>

            {/* Success band */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: STAT_REVEAL_DELAY * 7, duration: 0.3 }}
              className="mt-5 bg-teal/5 border border-teal/30 rounded-input px-4 py-3 flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-teal shrink-0" />
              <p className="text-sm text-gray-800">
                <span className="font-semibold">We&apos;ve got your deal.</span>{' '}
                Dalton will reach out within minutes — check your phone.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
