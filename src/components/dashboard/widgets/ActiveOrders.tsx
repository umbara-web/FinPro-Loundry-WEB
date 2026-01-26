'use client';

import { Button } from '@/src/components/ui/button';
import Link from 'next/link';
import { useWallet } from '@/src/context/WalletContext';
import { OrderCard } from './OrderCard';
import { PromoBanner } from './PromoBanner';

export function ActiveOrders() {
  const { activeOrders } = useWallet();

  return (
    <div className='flex flex-col gap-6 xl:col-span-2'>
      <OrdersHeader />
      {activeOrders.length === 0 ? (
        <EmptyState />
      ) : (
        <OrdersList orders={activeOrders.slice(0, 3)} />
      )}
      <PromoBanner />
    </div>
  );
}

function OrdersHeader() {
  return (
    <div className='flex items-center justify-between'>
      <h3 className='text-xl font-bold text-slate-900 dark:text-white'>
        Pesanan Berlangsung
      </h3>
      <Link
        href='/dashboard/orders?tab=history'
        className='text-primary text-sm font-medium hover:text-blue-400 hover:underline dark:text-white dark:hover:text-blue-500'
      >
        Lihat Semua
      </Link>
    </div>
  );
}

function EmptyState() {
  return (
    <div className='dark:bg-surface-dark bg-surface-light rounded-xl border border-slate-200 p-8 text-center shadow-sm dark:border-[#324d67]'>
      <p className='text-slate-500 dark:text-[#92adc9]'>
        Belum ada pesanan aktif saat ini.
      </p>
      <Link href='/customer/pickup/new'>
        <Button variant='link' className='mt-2 cursor-pointer text-blue-500'>
          Buat Pesanan Baru
        </Button>
      </Link>
    </div>
  );
}

function OrdersList({ orders }: { orders: any[] }) {
  return (
    <>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </>
  );
}
