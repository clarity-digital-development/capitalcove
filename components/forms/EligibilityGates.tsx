'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export interface GateAnswers {
  /** 'entity' = LLC/Corp/Trust (qualifies). 'individual' = personal name (blocks). */
  borrower: 'entity' | 'individual';
  /** 'no' = investment only (qualifies). 'yes' = owner-occupied (blocks). */
  occupancy: 'yes' | 'no';
}

interface EligibilityGatesProps {
  onPass: (answers: GateAnswers) => void;
  onFail: (reason: 'individual-borrower' | 'owner-occupied') => void;
}

type BorrowerSelection = GateAnswers['borrower'] | null;
type OccupancySelection = GateAnswers['occupancy'] | null;

interface ChoiceButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  qualifying?: boolean;
}

function ChoiceButton({ selected, onClick, children }: ChoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[56px] px-4 py-3 rounded-button border-2 text-sm font-semibold transition-all cursor-pointer text-left
        ${
          selected
            ? 'border-teal bg-teal/10 text-navy'
            : 'border-gray-200 bg-white text-gray-700 hover:border-teal/40 hover:bg-warm-gray'
        }`}
    >
      {children}
    </button>
  );
}

export default function EligibilityGates({ onPass, onFail }: EligibilityGatesProps) {
  const [borrower, setBorrower] = useState<BorrowerSelection>(null);
  const [occupancy, setOccupancy] = useState<OccupancySelection>(null);

  const canContinue = borrower !== null && occupancy !== null;

  function handleContinue() {
    if (!canContinue) return;
    if (borrower === 'individual') {
      onFail('individual-borrower');
      return;
    }
    if (occupancy === 'yes') {
      onFail('owner-occupied');
      return;
    }
    onPass({ borrower, occupancy });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div>
        <span className="inline-block text-xs font-semibold tracking-wider text-gold uppercase">
          Eligibility
        </span>
        <h3 className="text-lg font-semibold text-navy mt-2">
          Two quick questions first.
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          We only fund business-purpose loans on investment property. Takes 5 seconds.
        </p>
      </div>

      {/* Question 1: borrower entity */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-1">
          Are you applying as an LLC, corporation, or trust?
        </label>
        <p className="text-xs text-gray-600 mb-3">
          Planning to form one before close? That counts — choose Yes.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ChoiceButton selected={borrower === 'entity'} onClick={() => setBorrower('entity')}>
            Yes
          </ChoiceButton>
          <ChoiceButton
            selected={borrower === 'individual'}
            onClick={() => setBorrower('individual')}
          >
            No / Individual
          </ChoiceButton>
        </div>
      </div>

      {/* Question 2: occupancy */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-1">
          Will this property be owner-occupied (your primary residence or second home)?
        </label>
        <p className="text-xs text-gray-600 mb-3">
          We only fund non-owner-occupied investment property.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ChoiceButton selected={occupancy === 'no'} onClick={() => setOccupancy('no')}>
            No
          </ChoiceButton>
          <ChoiceButton selected={occupancy === 'yes'} onClick={() => setOccupancy('yes')}>
            Yes
          </ChoiceButton>
        </div>
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={!canContinue}
        className="w-full py-3 bg-teal text-white rounded-button text-sm font-semibold hover:bg-teal-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Continue to rate quote
      </button>
    </motion.div>
  );
}
