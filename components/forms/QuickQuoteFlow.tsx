'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import QuickQuoteForm, { type QuickQuoteSubmitData } from './QuickQuoteForm';
import EligibilityGates, { type GateAnswers } from './EligibilityGates';
import IneligibleMessage, { type IneligibilityReason } from './IneligibleMessage';
import TermSheetPreview from './TermSheetPreview';
import FormSuccess from './FormSuccess';
import { estimateTermSheet, type TermSheetEstimate } from '@/lib/termSheet';
import { FEATURE_FLAGS } from '@/lib/featureFlags';
import { readAttribution } from '@/lib/attribution';

type Phase = 'gates' | 'form' | 'preview' | 'success-legacy' | 'ineligible';

/**
 * Orchestrator for the homepage Quick Quote flow.
 *
 * Always-on: eligibility gates run before any form input is collected. Gates
 * are compliance-required, NOT coupled to the term-sheet preview feature flag.
 *
 * Feature-flagged: when FEATURE_FLAGS.TERM_SHEET_PREVIEW_ENABLED is true AND
 * the loan type is fix-and-flip, after the form submits successfully the user
 * sees the TermSheetPreview screen. Otherwise the legacy FormSuccess shows.
 */
export default function QuickQuoteFlow() {
  const [phase, setPhase] = useState<Phase>('gates');
  const [gateAnswers, setGateAnswers] = useState<GateAnswers | null>(null);
  const [ineligibilityReason, setIneligibilityReason] = useState<IneligibilityReason | null>(
    null,
  );
  const [preview, setPreview] = useState<{
    estimate: TermSheetEstimate;
    propertyState: string;
  } | null>(null);

  const handleGatesPass = useCallback((answers: GateAnswers) => {
    setGateAnswers(answers);
    setPhase('form');
  }, []);

  const handleGatesFail = useCallback((reason: IneligibilityReason) => {
    setIneligibilityReason(reason);
    setPhase('ineligible');
  }, []);

  const handleIneligibleBack = useCallback(() => {
    setIneligibilityReason(null);
    setPhase('gates');
  }, []);

  /**
   * Single submission handler — owns the POST so it can include the gate
   * confirmations and optionally the estimate. The form delegates to this
   * via its onExternalSubmit prop, then renders nothing once submitted so
   * the orchestrator can take over the UI.
   */
  const handleFormSubmit = useCallback(
    async (data: QuickQuoteSubmitData) => {
      const showPreview =
        FEATURE_FLAGS.TERM_SHEET_PREVIEW_ENABLED && data.loanType === 'fix-and-flip';

      const estimate = showPreview
        ? estimateTermSheet({
            loanType: data.loanType,
            purchasePrice: data.purchasePrice,
            loanAmount: data.loanAmount,
          })
        : null;

      const payload: Record<string, unknown> = {
        ...data,
        attribution: readAttribution(),
        borrowerEntity: gateAnswers?.borrower ?? 'entity',
        nonOwnerOccupied: gateAnswers?.occupancy === 'no',
      };

      if (estimate) {
        payload.estimate = {
          rateLow: estimate.rate.low,
          rateHigh: estimate.rate.high,
          monthlyPaymentLow: estimate.monthlyPayment.low,
          monthlyPaymentHigh: estimate.monthlyPayment.high,
          cashToCloseLow: estimate.cashToClose.low,
          cashToCloseHigh: estimate.cashToClose.high,
        };
      }

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Submit failed');
      }

      if (estimate) {
        setPreview({ estimate, propertyState: data.propertyState });
        setPhase('preview');
      } else {
        setPhase('success-legacy');
      }
    },
    [gateAnswers],
  );

  return (
    <AnimatePresence mode="wait">
      {phase === 'gates' && (
        <motion.div
          key="gates"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <EligibilityGates onPass={handleGatesPass} onFail={handleGatesFail} />
        </motion.div>
      )}

      {phase === 'ineligible' && ineligibilityReason && (
        <motion.div
          key="ineligible"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <IneligibleMessage reason={ineligibilityReason} onBack={handleIneligibleBack} />
        </motion.div>
      )}

      {phase === 'form' && (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <QuickQuoteForm
            onExternalSubmit={handleFormSubmit}
            suppressBuiltInSuccess
          />
        </motion.div>
      )}

      {phase === 'preview' && preview && (
        <motion.div
          key="preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <TermSheetPreview
            estimate={preview.estimate}
            propertyState={preview.propertyState}
          />
        </motion.div>
      )}

      {phase === 'success-legacy' && (
        <motion.div
          key="success-legacy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <FormSuccess type="quick-quote" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
