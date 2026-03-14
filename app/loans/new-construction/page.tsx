import type { Metadata } from 'next';
import { LOAN_PROGRAMS_FULL } from '@/lib/constants';
import { LoanProgramLayout } from '@/components/loans/LoanProgramLayout';

const program = LOAN_PROGRAMS_FULL.find((p) => p.slug === 'new-construction')!;

export const metadata: Metadata = {
  title: 'New Construction Loans | Ground-Up Financing | Capital Cove',
  description:
    'Finance ground-up residential construction with up to 85% of project costs. Fast draw processing, flexible terms, and close in 14–21 days.',
};

export default function NewConstructionPage() {
  return <LoanProgramLayout program={program} />;
}
