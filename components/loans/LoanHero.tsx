import { CTAButton } from '@/components/shared/CTAButton';

interface LoanHeroProps {
  name: string;
  tagline: string;
  slug: string;
  keyStats: { label: string; value: string }[];
}

export function LoanHero({ name, tagline, slug, keyStats }: LoanHeroProps) {
  return (
    <section className="bg-navy py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-display text-hero text-white">{name}</h1>
        <p className="text-body-lg text-white/90 mt-4 max-w-3xl mx-auto">
          {tagline}
        </p>

        <div className="mt-8 inline-flex flex-wrap justify-center gap-4">
          {keyStats.map((stat) => (
            <span
              key={stat.label}
              className="bg-white/10 rounded-full px-4 py-2 inline-flex items-center gap-2 text-sm text-white"
            >
              <span className="font-medium text-white/70">{stat.label}:</span>
              <span className="font-semibold">{stat.value}</span>
            </span>
          ))}
        </div>

        <div className="mt-10">
          <CTAButton href={`/apply?type=${slug}`} variant="primary" size="lg">
            Apply for {name}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
