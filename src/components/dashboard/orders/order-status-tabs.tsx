'use client';

import { OrderTabButton } from './order-tab-button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useOrderStats } from '@/src/hooks/use-order-stats';

export function OrderStatusTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get('status') || 'all';
  const { data: statsData } = useOrderStats();
  const stats = statsData?.data;

  const tabs = [
    { label: 'Semua', value: 'all', count: stats?.all },
    { label: 'Diproses', value: 'ONGOING', count: stats?.ONGOING },
    { label: 'Dikirim', value: 'DELIVERY', count: stats?.DELIVERY },
    { label: 'Selesai', value: 'COMPLETED', count: stats?.COMPLETED },
    { label: 'Dibatalkan', value: 'CANCELLED', count: stats?.CANCELLED },
  ];

  const handleTabClick = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (status === 'all') params.delete('status');
    else params.set('status', status);

    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='no-scrollbar flex w-full gap-2 overflow-x-auto pb-2'>
      {tabs.map((tab) => (
        <OrderTabButton
          key={tab.value}
          label={`${tab.label}${tab.count && tab.count > 0 ? ` (${tab.count})` : ''}`}
          value={tab.value}
          isActive={
            currentStatus === tab.value ||
            (tab.value === 'all' && !currentStatus)
          }
          onClick={handleTabClick}
        />
      ))}
    </div>
  );
}
