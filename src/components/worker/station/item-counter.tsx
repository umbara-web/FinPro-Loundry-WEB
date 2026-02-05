'use client';

import {
  Shirt,
  Briefcase,
  Package,
  Minus,
  Plus,
  RotateCcw,
  LucideIcon,
} from 'lucide-react';
import clsx from 'clsx';

// Icon mapping for laundry items
const iconMap: Record<string, LucideIcon> = {
  Shirt: Shirt,
  Briefcase: Briefcase,
  Package: Package,
  Jacket: Shirt,
};

interface ItemCounterProps {
  icon: string;
  name: string;
  subtitle: string;
  count: number;
  expectedCount?: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (value: number) => void;
  onReset: () => void;
}

export function ItemCounter({
  icon,
  name,
  subtitle,
  count,
  expectedCount,
  onIncrement,
  onDecrement,
  onChange,
  onReset,
}: ItemCounterProps) {
  const IconComponent = iconMap[icon] || Package;
  const isZero = count === 0;
  const isMatch = expectedCount !== undefined && count === expectedCount;
  const hasExpected = expectedCount !== undefined && expectedCount > 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Handle empty input
    if (rawValue === '') {
      onChange(0);
      return;
    }
    // Parse and strip leading zeros
    const value = parseInt(rawValue, 10);
    if (!isNaN(value) && value >= 0) {
      onChange(value);
    }
  };

  return (
    <div
      className={clsx(
        'flex items-center justify-between rounded-xl border p-5 transition-colors',
        'bg-[var(--color-station-surface)]',
        'group hover:border-[var(--color-station-primary)]/50',
        // Items with target > 0: green if match, default border otherwise
        hasExpected && isMatch && 'border-green-500',
        hasExpected && !isMatch && 'border-yellow-500/50',
        // Items without target: subtle border
        !hasExpected && 'border-[var(--color-station-border)]'
      )}
    >
      {/* Item Info */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[var(--color-station-border)] text-white">
          <IconComponent className="h-7 w-7" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <p className="text-sm text-[var(--color-station-text-muted)]">{subtitle}</p>
          {hasExpected && (
            <p className={clsx(
              'mt-1 text-xs font-semibold',
              isMatch ? 'text-green-400' : 'text-yellow-400'
            )}>
              Target: {expectedCount}
            </p>
          )}
        </div>
      </div>

      {/* Counter Controls */}
      <div className="flex items-center gap-1 rounded-lg border border-[var(--color-station-border)] bg-[var(--color-station-bg)] p-1">
        {/* Reset Button */}
        <button
          onClick={onReset}
          disabled={isZero}
          className={clsx(
            'flex h-12 w-12 items-center justify-center rounded-md transition-all',
            isZero
              ? 'cursor-not-allowed text-white/30'
              : 'text-red-400 hover:bg-red-500/20 active:scale-95'
          )}
          title="Reset ke 0"
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        {/* Minus Button */}
        <button
          onClick={onDecrement}
          disabled={isZero}
          className={clsx(
            'flex h-12 w-12 items-center justify-center rounded-md text-2xl font-medium transition-all',
            'bg-[var(--color-station-border)]',
            isZero
              ? 'cursor-not-allowed text-white/50'
              : 'text-white hover:bg-[var(--color-station-border-hover)] active:scale-95'
          )}
        >
          <Minus className="h-5 w-5" />
        </button>

        {/* Count Input */}
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={count === 0 ? '0' : String(count)}
          onChange={handleInputChange}
          onFocus={(e) => e.target.select()}
          className={clsx(
            'h-12 w-16 border-none bg-transparent p-0 text-center font-mono text-xl font-bold',
            'focus:ring-0 focus:outline-none',
            isZero ? 'text-white/50' : 'text-white'
          )}
        />

        {/* Plus Button */}
        <button
          onClick={onIncrement}
          className={clsx(
            'flex h-12 w-12 items-center justify-center rounded-md text-2xl font-medium transition-all active:scale-95',
            isZero
              ? 'bg-[var(--color-station-border)] text-[var(--color-station-primary)] hover:bg-[var(--color-station-primary)] hover:text-white'
              : 'bg-[var(--color-station-primary)] text-white shadow-lg shadow-blue-500/20 hover:bg-blue-600'
          )}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
