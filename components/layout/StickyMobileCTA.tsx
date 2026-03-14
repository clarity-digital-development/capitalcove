'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-x-0 bottom-0 z-50 flex min-h-[56px] items-center gap-3 bg-navy-dark px-4 py-2 md:hidden"
        >
          <a
            href={SITE_CONFIG.phoneHref}
            className="flex flex-1 items-center justify-center gap-2 rounded-radius-button border border-white/20 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          <Link
            href="/apply"
            className="flex flex-1 items-center justify-center rounded-radius-button bg-gold py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold-dark"
          >
            Get Your Rate &rarr;
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
