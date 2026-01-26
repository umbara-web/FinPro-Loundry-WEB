'use client';

import { CheckCircle, CreditCard, MapPin } from 'lucide-react';
import { useWallet } from '@/src/context/WalletContext';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import Link from 'next/link';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  time: string;
}

export function ActivityWidget() {
  const { notifications } = useWallet();
  const recentNotifications = notifications.slice(0, 10);

  return (
    <div className='dark:bg-surface-dark bg-surface-light flex flex-1 flex-col rounded-xl border border-slate-200 shadow-sm dark:border-[#324d67]'>
      <ActivityHeader />
      <ActivityList notifications={recentNotifications} />
      <ActivityFooter />
    </div>
  );
}

function ActivityHeader() {
  return (
    <div className='flex items-center justify-between border-b border-slate-100 p-4 dark:border-[#324d67]'>
      <h3 className='text-base font-bold text-slate-900 dark:text-white'>
        Aktivitas Terbaru
      </h3>
    </div>
  );
}

function ActivityList({ notifications }: { notifications: Notification[] }) {
  return (
    <div className='flex flex-col gap-5 p-4'>
      {notifications.map((item) => (
        <ActivityItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function ActivityItem({ item }: { item: Notification }) {
  const formattedTime = useRelativeTime(item.time);

  return (
    <div className='flex gap-3'>
      <ActivityIconWrapper type={item.type} />
      <ActivityContent title={item.title} time={formattedTime} />
    </div>
  );
}

function ActivityIconWrapper({ type }: { type: string }) {
  const iconClasses = getIconClasses(type);
  return (
    <div className='relative'>
      <div
        className={`relative z-10 flex size-8 items-center justify-center rounded-full ${iconClasses}`}
      >
        <ActivityIcon type={type} />
      </div>
      <div className='absolute top-8 left-4 z-0 h-full w-px bg-slate-200 dark:bg-[#324d67]'></div>
    </div>
  );
}

function ActivityContent({ title, time }: { title: string; time: string }) {
  return (
    <div>
      <p className='text-sm font-medium text-slate-900 dark:text-white'>
        {title}
      </p>
      <p className='text-xs text-slate-500 dark:text-[#92adc9]'>{time}</p>
    </div>
  );
}

// Helper Hooks / Functions
function useRelativeTime(timeStr: string) {
  try {
    const date = new Date(timeStr);
    if (!isNaN(date.getTime())) {
      return formatDistanceToNow(date, { addSuffix: true, locale: id });
    }
  } catch (e) {}
  return timeStr;
}

function getIconClasses(type: string): string {
  if (type === 'success')
    return 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400';
  if (type === 'info')
    return 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400';
  if (type === 'warning')
    return 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400';
  return 'bg-slate-100 text-slate-600 dark:bg-[#324d67] dark:text-slate-400';
}

function ActivityIcon({ type }: { type: string }) {
  if (type === 'success') return <CheckCircle className='h-4 w-4' />;
  if (type === 'info') return <CreditCard className='h-4 w-4' />;
  if (type === 'warning') return <MapPin className='h-4 w-4' />;
  return <MapPin className='h-4 w-4' />;
}

function ActivityFooter() {
  return (
    <div className='mt-auto border-t border-slate-100 p-4 dark:border-[#324d67]'>
      <Link href='/dashboard/notifications'>
        <button className='hover:text-primary w-full cursor-pointer text-center text-sm font-medium text-slate-500 transition-colors dark:text-[#92adc9]'>
          Lihat Semua Notifikasi
        </button>
      </Link>
    </div>
  );
}
