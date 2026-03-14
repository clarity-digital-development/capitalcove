const trustItems = [
  'NMLS #XXXXXX',
  'Equal Housing Lender',
  'AAPL Member',
  'Licensed in XX States',
];

export function TrustBar() {
  return (
    <section className="bg-navy-dark py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {trustItems.map((item, index) => (
            <span key={item} className="inline-flex items-center gap-x-6">
              <span className="text-sm text-white font-mono tracking-wide">
                {item}
              </span>
              {index < trustItems.length - 1 && (
                <span className="text-white/40 hidden sm:inline" aria-hidden="true">
                  |
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
