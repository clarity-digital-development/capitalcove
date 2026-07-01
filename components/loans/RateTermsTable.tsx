import type { RateTermRow } from '@/lib/constants';

interface RateTermsTableProps {
  rows: readonly RateTermRow[];
}

export function RateTermsTable({ rows }: RateTermsTableProps) {
  return (
    <div className="rounded-card overflow-hidden border border-gray-100">
      <table className="w-full">
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={row.label}
              className={idx % 2 === 0 ? 'bg-white' : 'bg-warm-gray'}
            >
              <td className="px-6 py-4 font-medium text-gray-600 w-1/3 align-top">
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
