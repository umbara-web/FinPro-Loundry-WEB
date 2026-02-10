'use client';

import { Complaint } from '@/src/lib/api/complaint-api';
import { getComplaintTypeLabel } from '@/src/components/dashboard/complaint';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Link from 'next/link';

interface ComplaintListItemProps {
  complaint: Complaint;
}

export function ComplaintListItem({ complaint }: ComplaintListItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'text-blue-400 bg-blue-400/10';
      case 'IN_REVIEW':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'RESOLVED':
        return 'text-green-400 bg-green-400/10';
      case 'REJECTED':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-slate-400 bg-slate-400/10';
    }
  };

  return (
    <div className='flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 transition-all hover:bg-slate-800/50 sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-3'>
          <span className='font-mono text-sm font-medium text-slate-400'>
            #{complaint.id.slice(0, 8).toUpperCase()}
          </span>
          <span className='rounded-full bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-300'>
            {format(new Date(complaint.created_at), 'dd MMM yyyy', {
              locale: id,
            })}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <p className='text-lg font-bold text-white'>
            {getComplaintTypeLabel(complaint.type)}
          </p>
          <span className='text-xs text-slate-500'>
            • Order #{complaint.order?.id?.slice(0, 8)}
          </span>
        </div>
        <div className='line-clamp-2 text-sm text-slate-400'>
          {complaint.description}
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <div
          className={`rounded-lg px-3 py-1 text-sm font-medium ${getStatusColor(complaint.status)}`}
        >
          {complaint.status.replace(/_/g, ' ')}
        </div>
        <div className='flex gap-2'>
          <Link
            href={`/dashboard/complaints/${complaint.id}`}
            className='text-primary text-xs font-medium hover:text-blue-400 hover:underline'
          >
            Detail & Chat
          </Link>
          <Link
            href={`/dashboard/orders/${complaint.order_id}`}
            className='text-primary text-xs font-medium hover:text-blue-400 hover:underline'
          >
            Lihat Pesanan
          </Link>
        </div>
      </div>
    </div>
  );
}
