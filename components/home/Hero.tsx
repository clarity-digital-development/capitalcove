'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CTAButton } from '@/components/shared/CTAButton';
import { CheckCircle } from 'lucide-react';
import { HERO_TRUST_PILLS } from '@/lib/constants';

/**
 * Hero fills 100vh minus the 64px (h-16) sticky navbar at the top, so it
 * occupies the entire visible viewport on first paint.
 *
 * Desktop: founder photo is absolutely positioned, full-bleeding the right
 * 50% of the viewport edge-to-edge, top to bottom. Slashed left edge acts
 * as the visual divider. Text content is vertically centered in the left half.
 * `object-top` anchors the photo so the head stays in frame.
 *
 * Mobile: image stacks above text. Section still fills the viewport (content
 * can scroll naturally if it overflows).
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
  const mobileClipPath = 'polygon(6% 0%, 100% 0%, 100% 100%, 0% 100%)';

  return (
    <section className="relative bg-warm-gray overflow-hidden min-h-[calc(100vh-4rem)] flex">
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

      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:pl-0 lg:pr-8 py-12 lg:py-0 z-10 flex items-center">
        <div className="flex flex-col-reverse lg:block w-full">
          {/* Mobile image — stacks above text */}
          <div className="lg:hidden mt-10">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden shadow-card-hover"
              style={{ clipPath: mobileClipPath }}
            >
              <Image
                src="/images/dalton-hero.jpg"
                alt="Dalton Guinn, founder of The Capital Cove"
                fill
                sizes="100vw"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Text content — left half on desktop, vertically centered */}
          <div className="w-full lg:w-[50%] lg:pr-8">
            <h1 className="font-display text-hero text-navy-dark">
              Close Your Next Deal in 5 Days
            </h1>
            <p className="text-body-lg text-gray-600 mt-6 max-w-xl">
              Fix &amp; flip funding from 9%. 100% rehab financing. No income
              verification. Built by an investor who&apos;s been in your shoes.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <CTAButton href="#quick-quote" variant="primary" size="lg">
                Get Your Rate
              </CTAButton>
              <CTAButton href="/how-it-works" variant="ghost" size="lg">
                See How It Works
              </CTAButton>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8">
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
      </div>
    </section>
  );
}
