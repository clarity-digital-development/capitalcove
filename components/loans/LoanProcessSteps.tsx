import { ArrowRight } from 'lucide-react';

interface LoanProcessStepsProps {
  steps: { title: string; description: string }[];
}

export function LoanProcessSteps({ steps }: LoanProcessStepsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
      {steps.map((step, idx) => (
        <div key={step.title} className="flex items-start gap-4 md:flex-col md:items-center md:text-center relative">
          {/* Connecting arrow between steps (desktop only) */}
          {idx < steps.length - 1 && (
            <div className="hidden md:flex absolute top-5 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] items-center justify-center z-0">
              <div className="h-px bg-gray-200 flex-1" />
              <ArrowRight className="w-4 h-4 text-gray-300 -ml-1" />
            </div>
          )}

          {/* Step number badge */}
          <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-semibold text-sm">
            {idx + 1}
          </div>

          <div className="md:mt-4">
            <h3 className="font-semibold text-gray-900 text-lg">{step.title}</h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
