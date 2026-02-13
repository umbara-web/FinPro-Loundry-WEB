import Link from 'next/link';
import { CheckCircle2, Package, Truck } from 'lucide-react';
import clsx from 'clsx';
import { DashboardHistoryItem } from '../_hooks/useDriverDashboard';

interface HistoryTabProps {
  history: DashboardHistoryItem[];
}

export function HistoryTab({ history }: HistoryTabProps) {
  if (history.length === 0) {
    return (
      <div className='py-12 text-center text-slate-500 dark:text-slate-400'>
        Belum ada tugas selesai hari ini.
      </div>
    );
  }

  return (
    <div>
      {/* Summary Bar */}
      <div className='mb-4 flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800 dark:shadow-none'>
        <CheckCircle2 className='h-5 w-5 text-green-500' />
        <p className='text-sm font-bold text-slate-900 dark:text-white'>
          {history.filter((h) => h.type === 'PICKUP').length} Jemput
          {' · '}
          {history.filter((h) => h.type === 'DELIVERY').length} Antar
        </p>
        <span className='text-xs text-slate-500 dark:text-slate-400'>
          Hari ini
        </span>
      </div>

      {/* Compact History List */}
      <div className='space-y-3'>
        {history.map((item) => (
          <div
            key={item.id}
            className='flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800 dark:shadow-none'
          >
            <div
              className={clsx(
                'rounded-lg p-2',
                item.type === 'PICKUP'
                  ? 'bg-orange-100 dark:bg-orange-500/10'
                  : 'bg-blue-100 dark:bg-blue-500/10'
              )}
            >
              {item.type === 'PICKUP' ? (
                <Package className='h-4 w-4 text-orange-600 dark:text-orange-500' />
              ) : (
                <Truck className='h-4 w-4 text-blue-600 dark:text-blue-500' />
              )}
            </div>
            <div className='min-w-0 flex-1'>
              <div className='flex items-center gap-2'>
                <p className='truncate text-sm font-bold text-slate-900 dark:text-white'>
                  {item.type === 'PICKUP' ? 'Jemput' : 'Antar'} -{' '}
                  {item.customer_name}
                </p>
                <span className='rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold whitespace-nowrap text-green-600 dark:bg-green-500/10 dark:text-green-500'>
                  Selesai
                </span>
              </div>
              <p className='truncate text-xs text-slate-500 dark:text-slate-400'>
                {item.order_number} · {item.address}
              </p>
            </div>
            <p className='text-xs whitespace-nowrap text-slate-500 dark:text-slate-400'>
              {item.completed_at
                ? new Date(item.completed_at).toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '-'}
            </p>
          </div>
        ))}
      </div>

      {/* Link to full history */}
      <div className='mt-4 text-center'>
        <Link
          href='/driver-history'
          className='text-sm font-bold text-blue-600 hover:underline dark:text-blue-500'
        >
          Lihat Semua Riwayat →
        </Link>
      </div>
    </div>
  );
}
