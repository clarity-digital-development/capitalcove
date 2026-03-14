'use client';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export default function ProgressBar({ currentStep, totalSteps, labels }: ProgressBarProps) {
  // Endowed progress: start at ~15%, so step 1/4 = ~25%, step 4/4 = 100%
  const baseProgress = 15;
  const remainingProgress = 100 - baseProgress;
  const progressPercent = baseProgress + (currentStep / totalSteps) * remainingProgress;

  return (
    <div className="w-full mb-6">
      {labels && labels.length > 0 && (
        <div className="relative flex justify-between mb-3">
          {labels.map((label, idx) => {
            const isCompleted = idx + 1 <= currentStep;
            const isCurrent = idx + 1 === currentStep;
            return (
              <div key={label} className="flex flex-col items-center flex-1">
                <div
                  className={`w-3 h-3 rounded-full mb-1 transition-colors duration-300 ${
                    isCompleted
                      ? 'bg-teal'
                      : isCurrent
                        ? 'bg-teal-light'
                        : 'bg-gray-200'
                  }`}
                />
                <span
                  className={`text-xs transition-colors duration-300 ${
                    isCompleted || isCurrent ? 'text-teal font-medium' : 'text-gray-600'
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {!labels && (
        <p className="text-sm text-gray-600 mb-2">
          Step {currentStep} of {totalSteps}
        </p>
      )}

      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
