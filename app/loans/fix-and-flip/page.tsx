import type { Metadata } from 'next';
import { LOAN_PROGRAMS_FULL } from '@/lib/constants';
import { LoanProgramLayout } from '@/components/loans/LoanProgramLayout';

const program = LOAN_PROGRAMS_FULL.find((p) => p.slug === 'fix-and-flip')!;

export const metadata: Metadata = {
  title: 'Fix & Flip Loans | Fast Rehab Financing | Capital Cove',
  description:
    'Close in as little as 10 days. Up to 90% LTC and 100% rehab financing for residential fix and flip projects. No income docs required.',
};

export default function FixAndFlipPage() {
  return <LoanProgramLayout program={program} />;
}
