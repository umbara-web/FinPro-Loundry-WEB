'use client';

import { AlertCircle, Package, ShieldAlert, XCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils/utils';

export type ComplaintType = 'DAMAGE' | 'LOST' | 'NOT_MATCH' | 'REJECTED';

interface ComplaintTypeOption {
  value: ComplaintType;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const complaintTypes: ComplaintTypeOption[] = [
  {
    value: 'DAMAGE',
    label: 'Kerusakan',
    description: 'Pakaian rusak atau sobek setelah laundry',
    icon: <AlertCircle className='h-6 w-6' />,
  },
  {
    value: 'LOST',
    label: 'Kehilangan',
    description: 'Ada item yang hilang atau tidak dikembalikan',
    icon: <Package className='h-6 w-6' />,
  },
  {
    value: 'NOT_MATCH',
    label: 'Tidak Sesuai',
    description: 'Hasil laundry tidak sesuai dengan pesanan',
    icon: <ShieldAlert className='h-6 w-6' />,
  },
  {
    value: 'REJECTED',
    label: 'Ditolak',
    description: 'Pesanan ditolak tanpa alasan yang jelas',
    icon: <XCircle className='h-6 w-6' />,
  },
];

interface ComplaintTypeSelectorProps {
  value: ComplaintType | null;
  onChange: (value: ComplaintType) => void;
}

export function ComplaintTypeSelector({
  value,
  onChange,
}: ComplaintTypeSelectorProps) {
  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
      {complaintTypes.map((type) => (
        <button
          key={type.value}
          type='button'
          onClick={() => onChange(type.value)}
          className={cn(
            'flex items-start gap-4 rounded-xl border-2 p-4 text-left transition-all',
            value === type.value
              ? 'border-primary bg-primary/5 dark:border-primary dark:bg-primary/10'
              : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
          )}
        >
          <div
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg',
              value === type.value
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
            )}
          >
            {type.icon}
          </div>
          <div className='flex-1'>
            <h4
              className={cn(
                'font-bold',
                value === type.value
                  ? 'text-primary'
                  : 'text-gray-900 dark:text-white'
              )}
            >
              {type.label}
            </h4>
            <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
              {type.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

export function getComplaintTypeLabel(type: ComplaintType): string {
  const found = complaintTypes.find((t) => t.value === type);
  return found?.label || type;
}
