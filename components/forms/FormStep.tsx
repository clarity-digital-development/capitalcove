'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormStepProps {
  children: ReactNode;
  direction: 'forward' | 'back';
  stepKey: string | number;
}

const variants = {
  enter: (direction: 'forward' | 'back') => ({
    x: direction === 'forward' ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: 'forward' | 'back') => ({
    x: direction === 'forward' ? -80 : 80,
    opacity: 0,
  }),
};

export default function FormStep({ children, direction, stepKey }: FormStepProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={stepKey}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
