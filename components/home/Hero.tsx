'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CTAButton } from '@/components/shared/CTAButton';
import { CheckCircle } from 'lucide-react';
import { HERO_TRUST_PILLS } from '@/lib/constants';

/**
 * Desktop: fills 100vh minus the 64px navbar. Founder photo is absolutely
 * positioned, full-bleeding the right 50% with a slashed left edge. Text is
 * left-aligned and vertically centered in the left half.
 *
 * Mobile: NO photo. Everything is centered — headline, subheader, the two CTAs
 * side by side (Get Your Rate | See How It Works), then the check-mark stats.
 * The TrustBar section that follows sits directly beneath, at the bottom.
 */
export function Hero() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const desktopClipPath = 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)';

  return (
    <section className="relative bg-warm-gray overflow-hidden min-h-[calc(100dvh-4rem)] lg:min-h-[calc(100vh-4rem)] flex">
      {/* Desktop image — full bleed right 50%, edge-to-edge top + bottom */}
      {isDesktop && (
        <div
          className="hidden lg:block absolute inset-y-0 right-0 w-1/2 z-0"
          style={{ clipPath: desktopClipPath }}
        >
          <Image
            src="/images/dalton-hero.jpg"
            alt="Dalton Guinn, founder of The Capital Cove"
            fill
            sizes="50vw"
            className="object-cover object-top"
            priority
          />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:pl-0 lg:pr-8 py-14 lg:py-0 z-10 flex items-center">
        {/* Text content — centered on mobile, left half on desktop */}
        <div className="w-full lg:w-[50%] lg:pr-8 text-center lg:text-left">
          <h1 className="font-display text-hero text-navy-dark">
            Close Your Next Deal in 5 Days
          </h1>
          <p className="text-body-lg text-gray-600 mt-6 max-w-xl mx-auto lg:mx-0">
            Fix &amp; flip funding from 9%. 100% rehab financing. No income
            verification. Built by an investor who&apos;s been in your shoes.
          </p>

          <div className="flex gap-3 mt-8 justify-center lg:justify-start">
            <CTAButton
              href="#quick-quote"
              variant="primary"
              size="sm"
              className="flex-1 lg:flex-none lg:px-8 lg:py-4 lg:text-lg"
            >
              Get Your Rate
            </CTAButton>
            <CTAButton
              href="/how-it-works"
              variant="ghost"
              size="sm"
              className="flex-1 lg:flex-none lg:px-8 lg:py-4 lg:text-lg"
            >
              See How It Works
            </CTAButton>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-8 lg:justify-start">
            {HERO_TRUST_PILLS.map((metric) => (
              <span
                key={metric}
                className="inline-flex items-center gap-2 text-sm text-gray-600"
              >
                <CheckCircle className="w-4 h-4 text-teal flex-shrink-0" />
                {metric}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
