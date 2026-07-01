import type { Metadata } from 'next';
import { PlaceholderProgramTemplate } from '@/components/loans/PlaceholderProgramTemplate';
import { PHASE_2_PROGRAMS } from '@/lib/constants';

const program = PHASE_2_PROGRAMS.find((p) => p.slug === 'bridge')!;

export const metadata: Metadata = {
  title: program.metaTitle,
  description: program.metaDescription,
};

export default function BridgePage() {
  return <PlaceholderProgramTemplate program={program} />;
}
