'use client';

import {
  Shirt,
  Briefcase,
  Package,
  Minus,
  Plus,
  LucideIcon,
} from 'lucide-react';
import clsx from 'clsx';

// Icon mapping for laundry items
const iconMap: Record<string, LucideIcon> = {
  Shirt: Shirt,
  Briefcase: Briefcase,
  Package: Package,
  Jacket: Shirt, // Fallback to Shirt for Jacket
};

interface ItemCounterProps {
  icon: string;
  name: string;
  subtitle: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function ItemCounter({
  icon,
  name,
  subtitle,
  count,
  onIncrement,
  onDecrement,
}: ItemCounterProps) {
  const IconComponent = iconMap[icon] || Package;
  const isZero = count === 0;

  return (
    <div
      className={clsx(
        'flex items-center justify-between rounded-xl border p-5 transition-colors',
        'bg-[--color-station-surface] border-[--color-station-border]',
        'group hover:border-[--color-station-primary]/50'
      )}
    >
      {/* Item Info */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[--color-station-border] text-white">
          <IconComponent className="h-7 w-7" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <p className="text-sm text-[--color-station-text-muted]">{subtitle}</p>
        </div>
      </div>

      {/* Counter Controls */}
      <div className="flex items-center gap-1 rounded-lg border border-[--color-station-border] bg-[--color-station-bg] p-1">
        {/* Minus Button */}
        <button
          onClick={onDecrement}
          disabled={isZero}
          className={clsx(
            'flex h-12 w-12 items-center justify-center rounded-md text-2xl font-medium transition-all',
            'bg-[--color-station-border]',
            isZero
              ? 'cursor-not-allowed text-white/50'
              : 'text-white hover:bg-[--color-station-border-hover] active:scale-95'
          )}
        >
          <Minus className="h-5 w-5" />
        </button>

        {/* Count Display */}
        <input
          type="number"
          value={count}
          readOnly
          className={clsx(
            'h-12 w-16 border-none bg-transparent p-0 text-center font-mono text-xl font-bold',
            'focus:ring-0',
            isZero ? 'text-white/50' : 'text-white'
          )}
        />

        {/* Plus Button */}
        <button
          onClick={onIncrement}
          className={clsx(
            'flex h-12 w-12 items-center justify-center rounded-md text-2xl font-medium transition-all active:scale-95',
            isZero
              ? 'bg-[--color-station-border] text-[--color-station-primary] hover:bg-[--color-station-primary] hover:text-white'
              : 'bg-[--color-station-primary] text-white shadow-lg shadow-blue-500/20 hover:bg-blue-600'
          )}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
