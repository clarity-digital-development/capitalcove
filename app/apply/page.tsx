import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Shield, FileCheck, CreditCard } from 'lucide-react';
import FullApplicationForm from '@/components/forms/FullApplicationForm';

export const metadata: Metadata = {
  title: 'Apply for Funding | The Capital Cove',
  description:
    'Submit your deal for fast private lending approval. Close in as few as 5 days. No income verification.',
};

const trustBadges = [
  { icon: Shield, label: 'No credit check to apply' },
  { icon: FileCheck, label: 'No obligation' },
  { icon: CreditCard, label: 'LLC required' },
];

function FormSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-2 bg-gray-100 rounded-full" />
      <div className="h-5 w-1/3 bg-gray-100 rounded" />
      <div className="space-y-3">
        <div className="h-12 bg-gray-100 rounded" />
        <div className="h-12 bg-gray-100 rounded" />
        <div className="h-12 bg-gray-100 rounded" />
      </div>
      <div className="h-12 bg-gray-100 rounded" />
    </div>
  );
}

export default function ApplyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-12 lg:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-hero text-white">
            Submit Your Deal
          </h1>
          <p className="text-body-lg text-white/80 mt-4">
            Tell us about your deal. Dalton reviews every application personally.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-(--spacing-section) bg-warm-gray">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-card shadow-card p-6 sm:p-8">
            <Suspense fallback={<FormSkeleton />}>
              <FullApplicationForm />
            </Suspense>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
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
