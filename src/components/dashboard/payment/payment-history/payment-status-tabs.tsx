'use client';

import { OrderTabButton } from '@/src/components/dashboard/orders/order-tab-button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { usePaymentStats } from '@/src/hooks/use-payment-stats';

export function PaymentStatusTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get('status') || 'all';

  // Fetch counts from new stats endpoint
  const { data: statsData } = usePaymentStats();
  const counts = statsData?.data;

  // Define tabs with dynamic counts
  const tabs = [
    { label: 'Semua', value: 'all', count: counts?.all },
    { label: 'Menunggu', value: 'PENDING', count: counts?.PENDING },
    { label: 'Berhasil', value: 'PAID', count: counts?.PAID },
    {
      label: 'Tidak Berhasil',
      value: 'FAILED_GROUP',
      count: counts?.FAILED_GROUP,
    },
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
