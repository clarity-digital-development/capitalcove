import type { Metadata } from 'next';
import { Shield, FileCheck, CreditCard } from 'lucide-react';
import FullApplicationForm from '@/components/forms/FullApplicationForm';

export const metadata: Metadata = {
  title: 'Apply for Funding',
  description:
    'Submit your real estate deal for fast private financing. No obligation, no credit check to get started. Get a term sheet within 24 hours.',
};

const trustBadges = [
  { icon: Shield, label: '256-bit Encryption' },
  { icon: FileCheck, label: 'No Obligation' },
  { icon: CreditCard, label: 'No Credit Check' },
];

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-12 lg:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-hero text-white">
            Apply for Funding
          </h1>
          <p className="text-body-lg text-white/80 mt-4">
            Tell us about your deal and get a term sheet within 24 hours.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-section bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <FullApplicationForm />

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-teal" />
                  <span>{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
