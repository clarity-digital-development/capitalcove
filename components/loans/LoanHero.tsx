import { CTAButton } from '@/components/shared/CTAButton';

interface LoanHeroProps {
  name: string;
  tagline: string;
  applyHref: string;
  applyLabel: string;
  pills?: readonly string[];
}

export function LoanHero({ name, tagline, applyHref, applyLabel, pills }: LoanHeroProps) {
  return (
    <section className="bg-navy py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-display text-hero text-white">{name}</h1>
        <p className="text-body-lg text-white/90 mt-4 max-w-3xl mx-auto">
          {tagline}
        </p>

        {pills && pills.length > 0 && (
          <div className="mt-8 inline-flex flex-wrap justify-center gap-3">
            {pills.map((pill) => (
              <span
                key={pill}
                className="bg-white/10 rounded-full px-4 py-2 text-sm font-semibold text-white"
              >
                {pill}
              </span>
            ))}
          </div>
        )}

        <div className="mt-10">
          <CTAButton href={applyHref} variant="primary" size="lg">
            {applyLabel}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
