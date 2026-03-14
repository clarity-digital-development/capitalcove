'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQQuestion {
  question: string;
  answer: string;
}

interface FAQCategoryData {
  category: string;
  questions: FAQQuestion[];
}

interface FAQAccordionProps {
  categories: FAQCategoryData[];
}

export default function FAQAccordion({ categories }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  function toggle(key: string) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <div className="space-y-12">
      {categories.map((cat) => (
        <div key={cat.category}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {cat.category}
          </h2>
          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {cat.questions.map((q, idx) => {
              const key = `${cat.category}-${idx}`;
              const isOpen = openItems.has(key);
              return (
                <div key={key}>
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
                  >
                    <span className="text-base font-medium text-gray-900 pr-4 group-hover:text-teal transition-colors">
                      {q.question}
                    </span>
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-teal" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-600" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-gray-600 leading-relaxed pr-10">
                          {q.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
