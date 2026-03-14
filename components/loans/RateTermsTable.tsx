import type { LoanProgramRates } from '@/lib/constants';

interface RateTermsTableProps {
  rates: LoanProgramRates;
  eligiblePropertyTypes?: string[];
}

const rateLabels: { key: Exclude<keyof LoanProgramRates, 'eligiblePropertyTypes'>; label: string }[] = [
  { key: 'interestRate', label: 'Interest Rate Range' },
  { key: 'originationPoints', label: 'Origination Points' },
  { key: 'maxLTV', label: 'LTV (Purchase)' },
  { key: 'maxLTVARV', label: 'LTV (ARV)' },
  { key: 'loanRange', label: 'Loan Amounts' },
  { key: 'termLength', label: 'Term Length' },
  { key: 'closingTimeline', label: 'Closing Timeline' },
];

export function RateTermsTable({ rates, eligiblePropertyTypes }: RateTermsTableProps) {
  const rows = [
    ...rateLabels.map((row) => ({
      label: row.label,
      value: rates[row.key] || '—',
    })),
    ...(eligiblePropertyTypes?.length
      ? [{ label: 'Eligible Property Types', value: eligiblePropertyTypes.join(', ') }]
      : []),
  ];

  return (
    <div className="rounded-card overflow-hidden border border-gray-100">
      <table className="w-full">
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={row.label}
              className={idx % 2 === 0 ? 'bg-white' : 'bg-warm-gray'}
            >
              <td className="px-6 py-4 font-medium text-gray-600 w-1/3">
                {row.label}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
