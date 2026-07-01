'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll } from 'framer-motion';
import type { LottieRefCurrentProps } from 'lottie-react';
import { PROCESS_STEPS } from '@/lib/constants';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

import submitDealAnim from '@/public/lotties/submit-deal.json';
import getTermsAnim from '@/public/lotties/get-terms.json';
import uploadDocsAnim from '@/public/lotties/upload-docs.json';
import underwritingAnim from '@/public/lotties/underwriting.json';
import closeFundAnim from '@/public/lotties/close-fund.json';

interface StepLottie {
  data: object;
  /** Optional override class for the tile size. Default tile is w-28/h-28 (mobile) lg:w-32/h-32 (desktop). */
  sizeClass?: string;
}

const TILE_SIZE_DEFAULT = 'w-28 h-28 lg:w-32 lg:h-32';
// Upload is the only step user wanted slightly bigger
const TILE_SIZE_LARGE = 'w-32 h-32 lg:w-40 lg:h-40';

const stepLotties: StepLottie[] = [
  { data: submitDealAnim }, // Submit Your Deal
  { data: getTermsAnim }, // Get Your Term Sheet
  { data: uploadDocsAnim, sizeClass: TILE_SIZE_LARGE }, // Upload Documents — slightly bigger per request
  { data: underwritingAnim }, // Underwriting
  { data: closeFundAnim }, // Close & Fund
];

// Scroll-progress thresholds for each step's reveal — calibrated to fire as
// the connecting line reaches each tile.
const STEP_TRIGGERS = [0.08, 0.28, 0.48, 0.68, 0.88];

/**
 * Self-contained lottie tile that plays exactly once when `shouldPlay` flips
 * to true. Handles both race conditions: lottie loaded → scroll triggers
 * later (useEffect path) AND scroll triggered → lottie loads later (onDOMLoaded path).
 */
function StepTile({
  animation,
  shouldPlay,
  loop = false,
  sizeClass = TILE_SIZE_DEFAULT,
}: {
  animation: object;
  shouldPlay: boolean;
  loop?: boolean;
  sizeClass?: string;
}) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const isLoadedRef = useRef(false);
  const hasPlayedRef = useRef(false);

  const attemptPlay = () => {
    if (hasPlayedRef.current) return;
    if (!isLoadedRef.current) return;
    if (!lottieRef.current) return;
    lottieRef.current.goToAndPlay(0, true);
    hasPlayedRef.current = true;
  };

  // Path 1: lottie already loaded, shouldPlay just flipped to true.
  useEffect(() => {
    if (shouldPlay) attemptPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldPlay]);

  return (
    <div className={`relative rounded-full bg-white ${sizeClass}`}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animation}
        loop={loop}
        autoplay={false}
        className="w-full h-full"
        rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
        onDOMLoaded={() => {
          isLoadedRef.current = true;
          // Path 2: scroll trigger already fired, lottie just finished loading.
          if (shouldPlay) attemptPlay();
        }}
      />
    </div>
  );
}

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 60%'],
  });

  // shouldPlay[i] flips true when scroll progress >= STEP_TRIGGERS[i].
  // Once true, never goes false (animations only trigger forward).
  const [shouldPlay, setShouldPlay] = useState<boolean[]>(
    new Array(PROCESS_STEPS.length).fill(false),
  );

  useEffect(() => {
    const evaluate = (latest: number) => {
      setShouldPlay((prev) => {
        let changed = false;
        const next = prev.map((wasPlaying, i) => {
          if (!wasPlaying && latest >= STEP_TRIGGERS[i]) {
            changed = true;
            return true;
          }
          return wasPlaying;
        });
        return changed ? next : prev;
      });
    };

    // Initial check — handle the case where page loaded already scrolled past.
    evaluate(scrollYProgress.get());

    return scrollYProgress.on('change', evaluate);
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative mt-16">
      {/* DESKTOP — center vertical line */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gray-200" />
        <motion.div
          className="absolute top-0 left-0 right-0 bg-teal origin-top"
          style={{ height: '100%', scaleY: scrollYProgress }}
        />
      </div>

      {/* MOBILE — left vertical line, centered behind the tiles */}
      <div className="lg:hidden absolute left-14 top-0 bottom-0 w-0.5 -translate-x-1/2 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gray-200" />
        <motion.div
          className="absolute top-0 left-0 right-0 bg-teal origin-top"
          style={{ height: '100%', scaleY: scrollYProgress }}
        />
      </div>

      <div className="space-y-20 lg:space-y-24">
        {PROCESS_STEPS.map((step, i) => {
          const isLeft = i % 2 === 0;
          const stepLottie = stepLotties[i];
          return (
            <div key={step.number} className="relative">
              {/* DESKTOP — alternating L/R text, lottie centered on the line */}
              <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                {isLeft ? (
                  <>
                    <div className="text-right pr-20">
                      <h3 className="text-xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mt-2">{step.description}</p>
                      <span className="inline-block mt-3 px-3 py-1 bg-teal/10 text-teal text-sm font-medium rounded-full">
                        {step.timeline}
                      </span>
                    </div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div className="pl-20">
                      <h3 className="text-xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mt-2">{step.description}</p>
                      <span className="inline-block mt-3 px-3 py-1 bg-teal/10 text-teal text-sm font-medium rounded-full">
                        {step.timeline}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* DESKTOP — centered lottie sits on the line */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <StepTile
                  animation={stepLottie.data}
                  shouldPlay={shouldPlay[i]}
                  sizeClass={stepLottie.sizeClass}
                />
              </div>

              {/* MOBILE — left lottie + right text */}
              <div className="lg:hidden flex items-start gap-4">
                <div className="flex-shrink-0 relative z-10 -ml-2">
                  <StepTile
                    animation={stepLottie.data}
                    shouldPlay={shouldPlay[i]}
                    sizeClass={stepLottie.sizeClass}
                  />
                </div>
                <div className="pt-6 flex-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mt-1 text-sm">{step.description}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-teal/10 text-teal text-xs font-medium rounded-full">
                    {step.timeline}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
