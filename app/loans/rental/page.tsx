import type { Metadata } from 'next';
import { LOAN_PROGRAMS_FULL } from '@/lib/constants';
import { LoanProgramLayout } from '@/components/loans/LoanProgramLayout';

const program = LOAN_PROGRAMS_FULL.find((p) => p.slug === 'rental')!;

export const metadata: Metadata = {
  title: 'DSCR Rental Loans | No Income Docs Required | Capital Cove',
  description:
    'Long-term rental property financing based on property cash flow. 30-year fixed available, no tax returns required, and unlimited properties.',
};

export default function RentalPage() {
  return <LoanProgramLayout program={program} />;
}
