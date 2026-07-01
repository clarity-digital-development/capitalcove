import { Clock, Users } from 'lucide-react';
import { FUNDED_DEALS } from '@/lib/constants';

export function FundedDeals() {
  return (
    <section className="bg-white py-(--spacing-section)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="uppercase tracking-wide text-teal font-semibold text-sm">
            REAL DEALS. REAL INVESTORS.
          </span>
          <h2 className="text-section font-bold text-gray-900 mt-2">
            Deals We&apos;ve Funded
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {FUNDED_DEALS.map((deal) => (
            <div
              key={deal.borrowers}
              className="bg-white rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-200 p-8 border border-gray-100 flex flex-col"
            >
              {/* Amount */}
              <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-gray-100">
                <span className="text-3xl font-bold text-navy">
                  {deal.loanAmount}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-teal bg-teal/10 rounded-full px-3 py-1">
                  {deal.program}
                </span>
              </div>

              {/* Borrowers */}
              <h3 className="text-lg font-semibold text-gray-900 mt-4">
                {deal.borrowers}
              </h3>
              <p className="text-sm text-gray-600">{deal.location}</p>

              {/* Highlights */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-warm-gray rounded-full px-3 py-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal" />
                  {deal.closingHighlight}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-warm-gray rounded-full px-3 py-1.5">
                  <Users className="w-3.5 h-3.5 text-teal" />
                  {deal.borrowerType}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-4 flex-1">{deal.notes}</p>

              {deal.quote && (
                <blockquote className="mt-4 pt-4 border-t border-gray-100 italic text-gray-700">
                  &ldquo;{deal.quote}&rdquo;
                </blockquote>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
