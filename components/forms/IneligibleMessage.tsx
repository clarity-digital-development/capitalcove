'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Info, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export type IneligibilityReason = 'individual-borrower' | 'owner-occupied';

interface IneligibleMessageProps {
  reason: IneligibilityReason;
  onBack: () => void;
}

export default function IneligibleMessage({ reason, onBack }: IneligibleMessageProps) {
  const isEntityIssue = reason === 'individual-borrower';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center text-center py-6 px-2"
    >
      <div className="w-14 h-14 rounded-full bg-warm-gray flex items-center justify-center mb-5">
        <Info className="w-6 h-6 text-navy" />
      </div>

      <h3 className="text-xl font-semibold text-navy mb-3">
        We&apos;re not the right fit — but here&apos;s why.
      </h3>

      <p className="text-gray-700 leading-relaxed max-w-md">
        {isEntityIssue
          ? 'We only lend to entity borrowers (LLC, corporation, or trust) for business-purpose loans.'
          : 'We do not offer consumer or owner-occupied loans. Our loans are for non-owner-occupied investment property only.'}
      </p>

      {isEntityIssue && (
        <div className="mt-5 bg-warm-gray rounded-input p-4 max-w-md text-sm text-gray-700">
          <p className="font-semibold text-navy mb-1">Planning to form an LLC?</p>
          <p>
            That&apos;s the path most of our borrowers take. Text Dalton with the
            details of your deal and he can point you to the resources he uses
            himself.
          </p>
        </div>
      )}

      {!isEntityIssue && (
        <p className="mt-5 text-sm text-gray-600 max-w-md">
          If this is an investment property and you&apos;ll be holding it in an
          entity, head back and try again.
        </p>
      )}

      <div className="mt-7 flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 border border-gray-200 rounded-button text-gray-700 text-sm font-semibold hover:bg-warm-gray transition-colors cursor-pointer"
        >
          Back
        </button>
        <Link
          href="/"
          className="flex-1 py-3 bg-teal text-white rounded-button text-sm font-semibold hover:bg-teal-dark transition-colors text-center"
        >
          Got it — homepage
        </Link>
      </div>

      <a
        href={SITE_CONFIG.phoneHref}
        className="mt-5 inline-flex items-center gap-2 text-sm text-navy hover:text-teal transition-colors"
      >
        <Phone className="w-4 h-4" />
        Questions? Text Dalton at {SITE_CONFIG.phone}
      </a>
    </motion.div>
  );
}
