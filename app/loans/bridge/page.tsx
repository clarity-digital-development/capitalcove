import type { Metadata } from 'next';
import { LOAN_PROGRAMS_FULL } from '@/lib/constants';
import { LoanProgramLayout } from '@/components/loans/LoanProgramLayout';

const program = LOAN_PROGRAMS_FULL.find((p) => p.slug === 'bridge')!;

export const metadata: Metadata = {
  title: 'Bridge Loans | Short-Term Real Estate Financing | Capital Cove',
  description:
    'Flexible bridge loans from $100K to $5M. Close in as fast as 7 days with interest-only payments and no income documentation required.',
};

export default function BridgePage() {
  return <LoanProgramLayout program={program} />;
}
