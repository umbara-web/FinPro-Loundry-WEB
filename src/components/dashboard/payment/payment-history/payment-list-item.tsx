'use client';

import { Payment } from '@/src/lib/api/payment-api';
import { formatCurrency } from '@/src/lib/utils/format';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface PaymentListItemProps {
  payment: Payment;
}

export function PaymentListItem({ payment }: PaymentListItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'text-green-400 bg-green-400/10';
      case 'PENDING':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'FAILED':
        return 'text-red-400 bg-red-400/10';
      case 'EXPIRED':
        return 'text-gray-400 bg-gray-400/10';
      case 'REFUNDED':
        return 'text-blue-400 bg-blue-400/10';
      default:
        return 'text-slate-400 bg-slate-400/10';
    }
  };

  return (
    <div className='flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 transition-all hover:bg-slate-800/50 sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-3'>
          <span className='font-mono text-sm font-medium text-slate-400'>
            #{payment.id.slice(0, 8).toUpperCase()}
          </span>
          <span className='rounded-full bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-300'>
            {format(new Date(payment.created_at), 'dd MMM yyyy', {
              locale: id,
            })}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <p className='text-lg font-bold text-white'>
            {formatCurrency(payment.amount || 0)}
          </p>
          <span className='text-xs text-slate-500'>
            • {payment.method || 'N/A'}
          </span>
        </div>
        <div className='text-sm text-slate-400'>
          {payment.order?.pickup_request?.customer_address?.address || 'N/A'},{' '}
          {payment.order?.pickup_request?.customer_address?.city || 'N/A'}
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <div
          className={`rounded-lg px-3 py-1 text-sm font-medium ${getStatusColor(payment.status)}`}
        >
          {payment.status}
        </div>
      </div>
    </div>
  );
}
