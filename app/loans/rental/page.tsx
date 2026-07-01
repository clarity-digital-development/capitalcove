import type { Metadata } from 'next';
import { PlaceholderProgramTemplate } from '@/components/loans/PlaceholderProgramTemplate';
import { PHASE_2_PROGRAMS } from '@/lib/constants';

const program = PHASE_2_PROGRAMS.find((p) => p.slug === 'rental')!;

export const metadata: Metadata = {
  title: program.metaTitle,
  description: program.metaDescription,
};

export default function RentalPage() {
  return <PlaceholderProgramTemplate program={program} />;
}
