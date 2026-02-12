import { Minus, Plus, RotateCcw } from 'lucide-react';
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

    if (rawValue === '') {
      onChange(0);
      return;
    }

    const value = parseInt(rawValue, 10);
    if (!isNaN(value) && value >= 0) {
      onChange(value);
    }
  };

  return (
    <div
      className={clsx(
        'flex flex-col flex-wrap gap-4 rounded-xl border p-4 transition-colors sm:flex-row sm:items-center sm:justify-between sm:p-5',
        'bg-white dark:bg-slate-800',
        'group hover:border-blue-500/50',
        hasExpected && isMatch && 'border-green-500',
        hasExpected && !isMatch && 'border-yellow-500/50',
        !hasExpected && 'border-slate-200 dark:border-slate-700'
      )}
    >
      {/* Item Info */}
      <div className='flex min-w-0 flex-1 items-center gap-4'>
        <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-900 sm:h-14 sm:w-14 dark:bg-slate-700 dark:text-white'>
          <span className='text-xl font-bold sm:text-2xl'>{index}</span>
        </div>
        <div className='min-w-0 flex-1'>
          <h3 className='truncate text-base font-bold text-slate-900 sm:text-lg dark:text-white'>
            {name}
          </h3>
          {hasExpected && (
            <p
              className={clsx(
                'mt-1 text-xs font-semibold',
                isMatch ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'
              )}
            >
              Target: {expectedCount}
            </p>
          )}
        </div>
      </div>

      {/* Counter Controls */}
      <div className='flex shrink-0 items-center gap-1 self-end rounded-lg border border-slate-200 bg-slate-50 p-1 sm:self-auto dark:border-slate-700 dark:bg-slate-900'>
        {/* Reset Button */}
        <button
          onClick={onReset}
          disabled={isZero}
          className={clsx(
            'flex h-10 w-10 items-center justify-center rounded-md transition-all sm:h-12 sm:w-12',
            isZero
              ? 'cursor-not-allowed text-slate-300 dark:text-slate-600'
              : 'text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 active:scale-95'
          )}
          title='Reset ke 0'
        >
          <RotateCcw className='h-4 w-4' />
        </button>

        {/* Minus Button */}
        <button
          onClick={onDecrement}
          disabled={isZero}
          className={clsx(
            'flex h-10 w-10 items-center justify-center rounded-md text-xl font-medium transition-all sm:h-12 sm:w-12 sm:text-2xl',
            'bg-white dark:bg-slate-800',
            isZero
              ? 'cursor-not-allowed text-slate-300 dark:text-slate-600'
              : 'text-slate-700 hover:bg-slate-50 dark:text-white dark:hover:bg-slate-700 active:scale-95'
          )}
        >
          <Minus className='h-4 w-4 sm:h-5 sm:w-5' />
        </button>

        {/* Count Input */}
        <input
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          value={count === 0 ? '0' : String(count)}
          onChange={handleInputChange}
          onFocus={(e) => e.target.select()}
          className={clsx(
            'h-10 w-12 border-none bg-transparent p-0 text-center font-mono text-lg font-bold sm:h-12 sm:w-16 sm:text-xl',
            'focus:ring-0 focus:outline-none',
            isZero ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
          )}
        />

        {/* Plus Button */}
        <button
          onClick={onIncrement}
          className={clsx(
            'flex h-10 w-10 items-center justify-center rounded-md text-xl font-medium transition-all active:scale-95 sm:h-12 sm:w-12 sm:text-2xl',
            isZero
              ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50'
              : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700'
          )}
        >
          <Plus className='h-4 w-4 sm:h-5 sm:w-5' />
        </button>
      </div>
    </div>
  );
}
