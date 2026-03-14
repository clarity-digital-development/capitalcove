'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/shared/SectionHeading';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

const termOptions = [6, 9, 12, 18];
const pointOptions = [1, 1.5, 2, 2.5, 3];

export default function CalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState(300000);
  const [rehabBudget, setRehabBudget] = useState(75000);
  const [arv, setArv] = useState(475000);
  const [loanAmount, setLoanAmount] = useState(Math.round(300000 * 0.85));
  const [interestRate, setInterestRate] = useState(11);
  const [loanTermMonths, setLoanTermMonths] = useState(12);
  const [originationPoints, setOriginationPoints] = useState(2);
  const [holdingCostsPerMonth, setHoldingCostsPerMonth] = useState(1500);
  const [sellingCostsPct, setSellingCostsPct] = useState(8);
  const [reviewEmail, setReviewEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Auto-calc loan amount when purchase price changes
  function handlePurchasePriceChange(val: number) {
    setPurchasePrice(val);
    setLoanAmount(Math.round(val * 0.85));
  }

  const results = useMemo(() => {
    const originationFee = loanAmount * (originationPoints / 100);
    const totalInterest = loanAmount * (interestRate / 100 / 12) * loanTermMonths;
    const totalHoldingCosts = holdingCostsPerMonth * loanTermMonths;
    const sellingCosts = arv * (sellingCostsPct / 100);

    const totalProjectCost =
      purchasePrice + rehabBudget + originationFee + totalInterest + totalHoldingCosts + sellingCosts;

    const estimatedProfit = arv - totalProjectCost;
    const cashNeeded = purchasePrice - loanAmount + rehabBudget + originationFee;
    const roi = cashNeeded > 0 ? (estimatedProfit / cashNeeded) * 100 : 0;

    return {
      totalProjectCost,
      estimatedProfit,
      roi,
      cashNeeded,
      originationFee,
      totalInterest,
      totalHoldingCosts,
      sellingCosts,
    };
  }, [purchasePrice, rehabBudget, arv, loanAmount, interestRate, loanTermMonths, originationPoints, holdingCostsPerMonth, sellingCostsPct]);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reviewEmail) return;
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: reviewEmail,
          source: 'Website - Calculator Review',
          message: `Calculator review request: Purchase ${formatCurrency(purchasePrice)}, Rehab ${formatCurrency(rehabBudget)}, ARV ${formatCurrency(arv)}, Loan ${formatCurrency(loanAmount)}, Profit ${formatCurrency(results.estimatedProfit)}`,
        }),
      });
      setEmailSubmitted(true);
    } catch {
      // silent fail
    }
  }

  const isProfitable = results.estimatedProfit > 0;

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-hero text-white">
            Fix and Flip Profit Calculator
          </h1>
          <p className="text-body-lg text-white/80 mt-4 max-w-2xl mx-auto">
            Run the numbers on your next deal in seconds.
          </p>
        </div>
      </section>

      <section className="py-section bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Inputs */}
            <div className="space-y-6">
              <SectionHeading title="Deal Inputs" badge="Calculator" />

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Purchase Price
                </label>
                <input
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => handlePurchasePriceChange(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Rehab Budget
                </label>
                <input
                  type="number"
                  value={rehabBudget}
                  onChange={(e) => setRehabBudget(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  After Repair Value (ARV)
                </label>
                <input
                  type="number"
                  value={arv}
                  onChange={(e) => setArv(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Loan Amount (auto-calculated as 85% of purchase, adjustable)
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Interest Rate: {interestRate}%
                </label>
                <input
                  type="range"
                  min={7}
                  max={16}
                  step={0.25}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-teal"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>7%</span>
                  <span>16%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Loan Term (months)
                </label>
                <div className="flex gap-2">
                  {termOptions.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setLoanTermMonths(term)}
                      className={`flex-1 py-2 rounded-button text-sm font-medium transition-colors cursor-pointer ${
                        loanTermMonths === term
                          ? 'bg-teal text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Origination Points
                </label>
                <div className="flex gap-2">
                  {pointOptions.map((pts) => (
                    <button
                      key={pts}
                      type="button"
                      onClick={() => setOriginationPoints(pts)}
                      className={`flex-1 py-2 rounded-button text-sm font-medium transition-colors cursor-pointer ${
                        originationPoints === pts
                          ? 'bg-teal text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {pts}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Holding Costs / Month
                </label>
                <input
                  type="number"
                  value={holdingCostsPerMonth}
                  onChange={(e) => setHoldingCostsPerMonth(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Selling Costs: {sellingCostsPct}%
                </label>
                <input
                  type="range"
                  min={4}
                  max={12}
                  step={0.5}
                  value={sellingCostsPct}
                  onChange={(e) => setSellingCostsPct(Number(e.target.value))}
                  className="w-full accent-teal"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>4%</span>
                  <span>12%</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div>
              <div className="sticky top-24 space-y-6">
                <SectionHeading title="Deal Analysis" badge="Results" />

                <div className="bg-warm-gray rounded-card p-6 space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Project Cost</span>
                    <span className="font-bold text-gray-900">
                      {formatCurrency(results.totalProjectCost)}
                    </span>
                  </div>

                  <div
                    className={`flex justify-between items-center py-3 border-b border-gray-200 ${
                      isProfitable ? 'text-success' : 'text-error'
                    }`}
                  >
                    <span className="font-medium">Estimated Profit</span>
                    <span className="text-2xl font-bold">
                      {formatCurrency(results.estimatedProfit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">ROI</span>
                    <span
                      className={`text-xl font-bold ${
                        isProfitable ? 'text-success' : 'text-error'
                      }`}
                    >
                      {formatPercent(results.roi)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Cash Needed to Close</span>
                    <span className="font-bold text-gray-900">
                      {formatCurrency(results.cashNeeded)}
                    </span>
                  </div>
                </div>

                {/* Cost breakdown */}
                <div className="bg-warm-gray rounded-card p-6">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                    Cost Breakdown
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Purchase Price</span>
                      <span>{formatCurrency(purchasePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rehab Budget</span>
                      <span>{formatCurrency(rehabBudget)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Origination Fee</span>
                      <span>{formatCurrency(results.originationFee)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest</span>
                      <span>{formatCurrency(results.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Holding Costs</span>
                      <span>{formatCurrency(results.totalHoldingCosts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Selling Costs</span>
                      <span>{formatCurrency(results.sellingCosts)}</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/apply"
                  className="block w-full text-center py-4 bg-gold text-navy-dark rounded-button font-bold text-lg hover:bg-gold-light transition-colors"
                >
                  Like the numbers? Submit your deal &rarr;
                </Link>

                {/* Email capture */}
                <div className="bg-navy/5 rounded-card p-6">
                  <p className="text-sm font-medium text-gray-900 mb-3">
                    Want us to review your deal? Drop your email.
                  </p>
                  {emailSubmitted ? (
                    <p className="text-sm text-teal font-medium">
                      Thanks! We&apos;ll be in touch soon.
                    </p>
                  ) : (
                    <form onSubmit={handleEmailSubmit} className="flex gap-2">
                      <input
                        type="email"
                        value={reviewEmail}
                        onChange={(e) => setReviewEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-input text-sm text-gray-900 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-teal text-white text-sm font-semibold rounded-button hover:bg-teal-dark transition-colors cursor-pointer"
                      >
                        Send
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
