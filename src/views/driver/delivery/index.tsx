'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useDeliveryList } from './_hooks/useDeliveryList';
import { DeliveryCard } from './_components/DeliveryCard';

export function DriverDeliveryListView() {
  const { deliveries, loading, fetchDeliveries, acceptDelivery } =
    useDeliveryList();

  useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  const handleAccept = async (orderId: string) => {
    try {
      const taskId = await acceptDelivery(orderId);
      window.location.href = `/driver-delivery/${taskId}`;
    } catch (error) {
      // Error handled in hook
    }
  };

  return (
    <div className='min-h-full bg-slate-50 text-slate-900 dark:bg-[#101922] dark:text-white'>
      {/* Header */}
      <header className='sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-10 dark:border-slate-800 dark:bg-[#101922]'>
        <div className='flex items-center gap-4'>
          <Link
            href='/driver-dashboard'
            className='flex items-center gap-2 text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          >
            <ArrowLeft className='h-5 w-5' />
            <span className='text-sm font-medium'>Dashboard</span>
          </Link>
          <div className='mx-2 h-4 w-px bg-slate-200 dark:bg-slate-700' />
          <h2 className='text-lg font-bold'>Delivery Requests</h2>
        </div>
        <button
          onClick={fetchDeliveries}
          className='flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700'
        >
          <RefreshCw className='h-4 w-4' />
          Refresh
        </button>
      </header>

      <main className='mx-auto max-w-240 px-4 py-6 md:px-10'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold'>Daftar Request Antar</h1>
          <p className='text-slate-500 dark:text-slate-400'>
            {deliveries.length} request tersedia
          </p>
        </div>

        <div className='flex flex-col gap-4'>
          {loading ? (
            <div className='py-12 text-center text-slate-500 dark:text-slate-400'>
              Memuat...
            </div>
          ) : deliveries.length === 0 ? (
            <div className='py-12 text-center text-slate-500 dark:text-slate-400'>
              Tidak ada delivery request saat ini.
            </div>
          ) : (
            deliveries.map((delivery) => (
              <DeliveryCard
                key={delivery.id}
                delivery={delivery}
                onAccept={handleAccept}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
