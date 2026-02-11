import {
  Minus,
  Plus,
  RotateCcw,
} from 'lucide-react';
import clsx from 'clsx';

interface ItemCounterProps {
  index: number;
  name: string;
  count: number;
  expectedCount?: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (value: number) => void;
  onReset: () => void;
}

export function ItemCounter({
  index,
  name,
  count,
  expectedCount,
  onIncrement,
  onDecrement,
  onChange,
  onReset,
}: ItemCounterProps) {
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
        'flex flex-col gap-4 rounded-xl border p-4 transition-colors flex-wrap sm:flex-row sm:items-center sm:justify-between sm:p-5',
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
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--color-station-border)] text-white sm:h-14 sm:w-14">
          <span className="text-xl font-bold sm:text-2xl">{index}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-white sm:text-lg">{name}</h3>
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
      <div className="flex shrink-0 items-center self-end gap-1 rounded-lg border border-[var(--color-station-border)] bg-[var(--color-station-bg)] p-1 sm:self-auto">
        {/* Reset Button */}
        <button
          onClick={onReset}
          disabled={isZero}
          className={clsx(
            'flex h-10 w-10 items-center justify-center rounded-md transition-all sm:h-12 sm:w-12',
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
            'flex h-10 w-10 items-center justify-center rounded-md text-xl font-medium transition-all sm:h-12 sm:w-12 sm:text-2xl',
            'bg-[var(--color-station-border)]',
            isZero
              ? 'cursor-not-allowed text-white/50'
              : 'text-white hover:bg-[var(--color-station-border-hover)] active:scale-95'
          )}
        >
          <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
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
            'h-10 w-12 border-none bg-transparent p-0 text-center font-mono text-lg font-bold sm:h-12 sm:w-16 sm:text-xl',
            'focus:ring-0 focus:outline-none',
            isZero ? 'text-white/50' : 'text-white'
          )}
        />

        {/* Plus Button */}
        <button
          onClick={onIncrement}
          className={clsx(
            'flex h-10 w-10 items-center justify-center rounded-md text-xl font-medium transition-all active:scale-95 sm:h-12 sm:w-12 sm:text-2xl',
            isZero
              ? 'bg-[var(--color-station-border)] text-[var(--color-station-primary)] hover:bg-[var(--color-station-primary)] hover:text-white'
              : 'bg-[var(--color-station-primary)] text-white shadow-lg shadow-blue-500/20 hover:bg-blue-600'
          )}
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
}
