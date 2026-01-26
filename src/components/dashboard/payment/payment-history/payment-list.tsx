'use client';

import { Payment } from '@/src/lib/api/payment-api';
import { PaymentListItem } from './payment-list-item';

interface PaymentListProps {
  payments: Payment[];
  isLoading: boolean;
}

export function PaymentList({ payments, isLoading }: PaymentListProps) {
  if (isLoading) {
    return (
      <div className='space-y-4'>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className='h-24 w-full animate-pulse rounded-xl bg-slate-800'
          />
        ))}
      </div>
    );
  }

  if (!payments?.length) {
    return (
      <div className='flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900 p-8 text-center'>
        <p className='text-slate-400'>Belum ada riwayat pembayaran.</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {payments.map((payment) => (
        <PaymentListItem key={payment.id} payment={payment} />
      ))}
    </div>
  );
}
