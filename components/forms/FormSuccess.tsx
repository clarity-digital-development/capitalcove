'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface FormSuccessProps {
  type: 'quick-quote' | 'full-application';
}

export default function FormSuccess({ type }: FormSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center mb-6"
      >
        <motion.svg
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-10 h-10 text-teal"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </motion.svg>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-2xl font-bold text-navy mb-3"
      >
        Deal Submitted!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-gray-600 mb-8 max-w-sm"
      >
        We&apos;ve received your deal. Expect a text within minutes.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {type === 'quick-quote' ? (
          <Link
            href="/apply"
            className="inline-block px-8 py-3 bg-gold text-navy font-semibold rounded-button hover:bg-gold-light transition-colors"
          >
            Want to complete the full application?
          </Link>
        ) : (
          <Link
            href="/apply"
            className="inline-block px-8 py-3 bg-gold text-navy font-semibold rounded-button hover:bg-gold-light transition-colors"
          >
            Submit Another Deal
          </Link>
        )}
      </motion.div>
    </div>
  );
}
