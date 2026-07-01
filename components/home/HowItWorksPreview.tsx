'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import type { LottieRefCurrentProps } from 'lottie-react';

// Lottie ships ~50KB of player + 30-65KB per animation JSON. Lazy-load to
// keep the homepage TTI sharp; SSR off because Lottie needs window.
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

import submitDealAnim from '@/public/lotties/submit-deal.json';
import getTermsAnim from '@/public/lotties/get-terms.json';
import closeFundAnim from '@/public/lotties/close-fund.json';

interface Step {
  title: string;
  description: string;
  animation: object;
}

const steps: Step[] = [
  {
    title: 'Submit Your Deal',
    description:
      'Fill out our 2-minute application with your property details. Dalton reviews it personally — same day.',
    animation: submitDealAnim,
  },
  {
    title: 'Get Your Terms',
    description:
      'Receive a term sheet outlining your rate, leverage, and loan structure. No credit pull, no obligation.',
    animation: getTermsAnim,
  },
  {
    title: 'Close & Fund',
    description:
      'We coordinate with title, schedule closing, and wire funds. Close in as few as 5 days.',
    animation: closeFundAnim,
  },
];

/** Total duration the connecting line takes to traverse left → right. */
const LINE_DURATION_S = 3.0;
/** Stagger between each lottie trigger as the line passes its tile. */
const STAGGER_MS = (LINE_DURATION_S * 1000) / (steps.length + 1); // ~750ms

export function HowItWorksPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

  // lottie-react requires a MutableRefObject — declare three statically.
  const submitRef = useRef<LottieRefCurrentProps>(null);
  const termsRef = useRef<LottieRefCurrentProps>(null);
  const fundRef = useRef<LottieRefCurrentProps>(null);
  const lottieRefs = [submitRef, termsRef, fundRef];

  useEffect(() => {
    if (!isInView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    steps.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          lottieRefs[i].current?.goToAndPlay(0, true);
        }, (i + 1) * STAGGER_MS),
      );
    });
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <section className="py-(--spacing-section) bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="uppercase tracking-wide text-teal font-semibold text-sm">
            HOW IT WORKS
          </span>
          <h2 className="text-section font-bold text-gray-900 mt-2">
            From Application to Funding
          </h2>
        </div>

        <div ref={sectionRef} className="relative">
          {/* Connecting line — desktop only. Sits behind the lottie tiles,
              animates its scaleX from 0 → 1 left-to-right when in view.
              Vertical position matches the center of the 144px tiles. */}
          <div className="hidden md:block absolute left-[16.6667%] right-[16.6667%] top-[72px] h-[3px] pointer-events-none">
            {/* Background rail (subtle) */}
            <div className="absolute inset-0 bg-gray-200 rounded-full" />
            {/* Animated teal fill */}
            <motion.div
              className="absolute inset-0 bg-teal rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: LINE_DURATION_S, ease: 'easeInOut' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col items-center text-center"
              >
                {/* Tile — white background hides the line crossing behind it
                    so the line visually "connects to" the tile edges. */}
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center bg-white">
                  <Lottie
                    lottieRef={lottieRefs[i]}
                    animationData={step.animation}
                    loop={false}
                    autoplay={false}
                    className="w-full h-full"
                    rendererSettings={{
                      preserveAspectRatio: 'xMidYMid meet',
                    }}
                  />
                </div>

                <h3 className="font-semibold text-card text-gray-900 mt-4">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 max-w-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/how-it-works"
            className="text-navy font-semibold hover:text-teal transition-colors inline-flex items-center gap-1"
          >
            See Our Full Process <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
