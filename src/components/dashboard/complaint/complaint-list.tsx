'use client';

import { Complaint } from '@/src/lib/api/complaint-api';
import { ComplaintListItem } from './complaint-list-item';
import { AlertCircle, LucideIcon } from 'lucide-react';
import { OrderEmptyState } from '@/src/components/dashboard/orders/order-empty-state';

interface ComplaintListProps {
  complaints: Complaint[];
  isLoading: boolean;
  emptyMessage?: string;
  emptyIcon?: LucideIcon;
}

export function ComplaintList({
  complaints,
  isLoading,
  emptyMessage = 'Belum ada riwayat komplain.',
  emptyIcon = AlertCircle,
}: ComplaintListProps) {
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

  if (!complaints?.length) {
    return <OrderEmptyState message={emptyMessage} icon={emptyIcon} />;
  }

  return (
    <div className='space-y-4'>
      {complaints.map((complaint) => (
        <ComplaintListItem key={complaint.id} complaint={complaint} />
      ))}
    </div>
  );
}
