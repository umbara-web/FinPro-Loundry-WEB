'use client';

import { CheckCircle, CreditCard, MapPin, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import clsx from 'clsx';

interface NotificationProps {
  notification: {
    id: string;
    type: 'success' | 'info' | 'warning';
    title: string;
    time: string;
    message: string;
    read: boolean;
  };
  onDelete: (id: string) => void;
}

export function NotificationItem({
  notification,
  onDelete,
}: NotificationProps) {
  const { id, type, read } = notification;
  return (
    <div
      className={clsx(
        'group relative flex flex-col gap-4 rounded-xl border bg-white p-4 transition-all hover:shadow-md sm:flex-row sm:items-start dark:bg-[#111a22]',
        read
          ? 'border-slate-100 dark:border-[#324d67]'
          : 'border-blue-100 bg-blue-50/30 dark:border-blue-900/30 dark:bg-blue-900/10'
      )}
    >
      <NotificationIcon type={type} />
      <NotificationContent notification={notification} />
      <DeleteButton onClick={() => onDelete(id)} />
    </div>
  );
}

function NotificationIcon({ type }: { type: string }) {
  return (
    <div
      className={clsx(
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
        type === 'success' &&
          'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400',
        type === 'info' &&
          'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
        type === 'warning' &&
          'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'
      )}
    >
      {type === 'success' && <CheckCircle className='h-5 w-5' />}
      {type === 'info' && <CreditCard className='h-5 w-5' />}
      {type === 'warning' && <MapPin className='h-5 w-5' />}
    </div>
  );
}

function NotificationContent({ notification }: { notification: any }) {
  return (
    <div className='flex min-w-0 flex-1 flex-col gap-1'>
      <div className='flex items-start justify-between gap-4'>
        <h4 className='text-base font-bold text-slate-900 dark:text-white'>
          {notification.title}
        </h4>
        <TimeDisplay time={notification.time} className='hidden sm:block' />
      </div>
      <p className='text-sm leading-relaxed text-slate-600 dark:text-slate-300'>
        {notification.message}
      </p>
      <div className='mt-2 flex items-center justify-between sm:hidden'>
        <TimeDisplay time={notification.time} className='' />
      </div>
    </div>
  );
}

function TimeDisplay({ time, className }: { time: string; className: string }) {
  let displayTime = time;
  try {
    const date = new Date(time);
    if (!isNaN(date.getTime())) {
      displayTime = format(date, 'dd MMM, HH:mm', { locale: id });
    }
  } catch (e) {
    // Fallback to original string if invalid
  }

  return (
    <p
      className={clsx(
        'shrink-0 text-xs text-slate-500 dark:text-[#92adc9]',
        className
      )}
    >
      {displayTime}
    </p>
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className='absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500 sm:static sm:opacity-0 sm:group-hover:opacity-100'
      title='Hapus notifikasi'
    >
      <Trash2 className='h-4 w-4 cursor-pointer' />
    </button>
  );
}
