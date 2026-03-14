interface ComparisonChartProps {
  rows: { feature: string; dalton: string; traditional: string }[];
}

export function ComparisonChart({ rows }: ComparisonChartProps) {
  return (
    <div className="rounded-card overflow-hidden border border-gray-100">
      <table className="w-full">
        <thead>
          <tr className="bg-navy text-white">
            <th className="px-6 py-4 text-left font-semibold text-sm">
              Feature
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm border-l-2 border-teal">
              Capital Cove
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm">
              Traditional Bank
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={row.feature}
              className={idx % 2 === 0 ? 'bg-white' : 'bg-warm-gray'}
            >
              <td className="px-6 py-4 font-medium text-gray-600 text-sm">
                {row.feature}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 text-sm border-l-2 border-teal bg-teal/5">
                {row.dalton}
              </td>
              <td className="px-6 py-4 text-gray-600 text-sm">
                {row.traditional}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
