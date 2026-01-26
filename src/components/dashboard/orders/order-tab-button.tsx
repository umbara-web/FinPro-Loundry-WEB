'use client';

import { cn } from '@/src/lib/utils/utils';

interface OrderTabButtonProps {
  label: string;
  value: string;
  isActive: boolean;
  onClick: (value: string) => void;
}

export function OrderTabButton({
  label,
  value,
  isActive,
  onClick,
}: OrderTabButtonProps) {
  return (
    <button
      onClick={() => onClick(value)}
      className={cn(
        'cursor-pointer rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors',
        isActive
          ? 'bg-blue-600 text-white'
          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
      )}
    >
      {label}
    </button>
  );
}
