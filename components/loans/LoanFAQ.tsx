'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface LoanFAQProps {
  faqs: { question: string; answer: string }[];
}

export function LoanFAQ({ faqs }: LoanFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="rounded-card border border-gray-100 divide-y divide-gray-100 overflow-hidden">
      {faqs.map((faq, idx) => (
        <div key={faq.question}>
          <button
            onClick={() => toggle(idx)}
            className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-warm-gray transition-colors duration-150"
            aria-expanded={openIndex === idx}
          >
            <span className="font-semibold text-gray-900 pr-4">
              {faq.question}
            </span>
            <span className="flex-shrink-0 text-gray-400">
              {openIndex === idx ? (
                <Minus className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === idx && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
