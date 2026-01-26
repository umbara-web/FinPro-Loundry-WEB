import { ShoppingBag, LucideIcon } from 'lucide-react';

interface OrderEmptyStateProps {
  message?: string;
  icon?: LucideIcon;
}

export function OrderEmptyState({
  message,
  icon: Icon = ShoppingBag,
}: OrderEmptyStateProps) {
  return (
    <div className='flex min-h-100 flex-col items-center justify-center text-center'>
      <div className='mb-4 rounded-full bg-slate-100 p-6 dark:bg-[#1a2632]'>
        <Icon className='h-12 w-12 text-slate-300 dark:text-slate-600' />
      </div>
      <p className='text-slate-500'>
        {message || 'Tidak ada pesanan ditemukan.'}
      </p>
    </div>
  );
}
