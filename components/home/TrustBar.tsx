import { TRUST_BAR_ITEMS } from '@/lib/constants';

export function TrustBar() {
  return (
    <section className="bg-navy-dark py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-2">
          {TRUST_BAR_ITEMS.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2.5 text-sm font-medium tracking-wide text-white"
            >
              <span className="h-px w-4 bg-gold shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
