'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronDown, Phone } from 'lucide-react';
import { NAV_ITEMS, SITE_CONFIG } from '@/lib/constants';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (label: string) => {
    setExpandedSection((prev) => (prev === label ? null : label));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black lg:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
              <Image
                src="/images/logo.svg"
                alt="The Capital Cove"
                width={140}
                height={38}
              />
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-gray-900" />
              </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) =>
                  item.children ? (
                    <li key={item.label}>
                      <button
                        onClick={() => toggleSection(item.label)}
                        className="flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-warm-gray"
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${
                            expandedSection === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {expandedSection === item.label && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className="block rounded-md py-2.5 pl-8 pr-3 text-sm text-gray-600 transition-colors hover:bg-warm-gray hover:text-teal"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <Link
                        href={item.href!}
                        onClick={onClose}
                        className="block rounded-md px-3 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-warm-gray"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            {/* Bottom CTA area */}
            <div className="border-t border-gray-100 px-4 py-6">
              <a
                href={SITE_CONFIG.phoneHref}
                className="mb-3 flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-warm-gray"
              >
                <Phone className="h-4 w-4" />
                {SITE_CONFIG.phone}
              </a>
              <Link
                href="/apply"
                onClick={onClose}
                className="flex w-full items-center justify-center rounded-radius-button bg-gold px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-gold-dark"
              >
                Get Your Rate &rarr;
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
