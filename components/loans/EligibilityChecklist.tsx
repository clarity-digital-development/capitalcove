import { Check, X } from 'lucide-react';

interface EligibilityChecklistProps {
  whatWeLookFor: string[];
  whatWeDontRequire: string[];
}

export function EligibilityChecklist({
  whatWeLookFor,
  whatWeDontRequire,
}: EligibilityChecklistProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-card shadow-card p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          What We Look For
        </h3>
        <ul className="space-y-4">
          {whatWeLookFor.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-green-600" />
              </span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-card shadow-card p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          What We Don&apos;t Require
        </h3>
        <ul className="space-y-4">
          {whatWeDontRequire.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-3.5 h-3.5 text-red-500" />
              </span>
              <span className="text-gray-600 line-through decoration-gray-300">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
