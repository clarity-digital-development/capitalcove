'use client';

interface ButtonOption {
  value: string;
  label: string;
  icon?: string;
}

interface ButtonSelectorProps {
  options: ButtonOption[];
  value: string;
  onChange: (val: string) => void;
  columns?: number;
}

export default function ButtonSelector({
  options,
  value,
  onChange,
  columns = 2,
}: ButtonSelectorProps) {
  const gridColsClass =
    columns === 1
      ? 'grid-cols-1'
      : columns === 3
        ? 'grid-cols-3'
        : columns === 4
          ? 'grid-cols-4'
          : 'grid-cols-2';

  return (
    <div className={`grid ${gridColsClass} gap-3`}>
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`min-h-[56px] px-4 py-3 rounded-input border-2 text-sm font-medium transition-all duration-200 cursor-pointer
              ${
                isSelected
                  ? 'border-teal bg-teal/10 text-teal-dark'
                  : 'border-gray-100 bg-white text-gray-900 hover:border-teal-light hover:bg-gray-100/50'
              }
            `}
          >
            {option.icon && <span className="mr-2 text-lg">{option.icon}</span>}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
