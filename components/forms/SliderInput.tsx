'use client';

import { useCallback } from 'react';

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
}

function formatCurrency(val: number): string {
  return val.toLocaleString('en-US');
}

function parseCurrencyInput(raw: string): number {
  const stripped = raw.replace(/[^0-9]/g, '');
  return stripped ? parseInt(stripped, 10) : 0;
}

export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 5000,
}: SliderInputProps) {
  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseCurrencyInput(e.target.value);
      onChange(Math.min(parsed, max));
    },
    [onChange, max]
  );

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
    },
    [onChange]
  );

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm">$</span>
        <input
          type="text"
          inputMode="numeric"
          value={formatCurrency(value)}
          onChange={handleTextChange}
          className="w-full pl-7 pr-4 py-3 border border-gray-200 rounded-input text-gray-900 text-sm focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
        className="w-full mt-3 accent-teal cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span>${formatCurrency(min)}</span>
        <span>${formatCurrency(max)}</span>
      </div>
    </div>
  );
}
