'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useDeliveryDetail } from './_hooks/useDeliveryDetail';
import { DeliveryProgress } from './_components/DeliveryProgress';
import { CustomerInfoCard } from './_components/CustomerInfoCard';
import { DeliveryActions } from './_components/DeliveryActions';
import { DeliveryMap } from './_components/DeliveryMap';

export function DriverDeliveryDetailView() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;

  const {
    delivery,
    currentStep,
    loading,
    updating,
    fetchDelivery,
    updateStatus,
  } = useDeliveryDetail(taskId);

  useEffect(() => {
    fetchDelivery();
  }, [fetchDelivery]);

  if (loading) {
    return (
      <div className='flex h-full items-center justify-center bg-slate-50 text-slate-900 dark:bg-[#101922] dark:text-white'>
        <p>Memuat...</p>
      </div>
    );
  }

  if (!delivery) {
    return (
      <div className='flex h-full items-center justify-center bg-slate-50 text-slate-900 dark:bg-[#101922] dark:text-white'>
        <p>Delivery tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className='flex min-h-full flex-col bg-slate-50 dark:bg-[#101922]'>
      {/* Header */}
      <header className='sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-10 dark:border-slate-800 dark:bg-[#101922]'>
        <div className='flex items-center gap-4'>
          <Link
            href='/driver-dashboard'
            className='flex items-center gap-2 text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          >
            <ArrowLeft className='h-5 w-5' />
            <span className='text-sm font-medium'>Dashboard</span>
          </Link>
          <div className='mx-2 h-4 w-px bg-slate-200 dark:bg-slate-700' />
          <h2 className='text-lg font-bold text-slate-900 dark:text-white'>
            Delivery #
            {delivery.order?.order_number ||
              `ORD-${delivery.order_id.slice(-4).toUpperCase()}`}
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1 px-4 py-6 md:px-10'>
        <div className='mx-auto max-w-240'>
          {/* Map */}
          <DeliveryMap delivery={delivery} />

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
            {/* Progress Timeline */}
            <div className='lg:col-span-7'>
              <DeliveryProgress currentStep={currentStep} />
            </div>

            {/* Customer Info */}
            <div className='lg:col-span-5'>
              <CustomerInfoCard delivery={delivery} />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <DeliveryActions
        currentStep={currentStep}
        delivery={delivery}
        onUpdateStatus={updateStatus}
        updating={updating}
        router={router}
      />
    </div>
  );
}
