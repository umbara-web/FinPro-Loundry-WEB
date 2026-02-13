'use client';

import { CheckCircle, Navigation, Package } from 'lucide-react';
import { useDriverPickupDetail } from './_hooks/useDriverPickupDetail';
import { PickupDetailHeader } from './_components/PickupDetailHeader';
import { PickupMap } from './_components/PickupMap';
import { PickupProgress } from './_components/PickupProgress';
import { CustomerInfoCard } from './_components/CustomerInfoCard';
import { PickupActionBar } from './_components/PickupActionBar';

const steps = [
  {
    key: 'ON_THE_WAY',
    label: 'Menuju Lokasi Pelanggan',
    icon: <Navigation className='h-4 w-4' />,
  },
  {
    key: 'PICKED_UP',
    label: 'Pickup Selesai',
    icon: <Package className='h-4 w-4' />,
  },
  {
    key: 'ARRIVED_OUTLET',
    label: 'Sampai di Outlet',
    icon: <CheckCircle className='h-4 w-4' />,
  },
];

export function DriverPickupDetailView() {
  const {
    pickupId,
    pickup,
    loading,
    currentStep,
    updating,
    handleAcceptPickup,
    handleUpdateStatus,
    getCurrentStepIndex,
  } = useDriverPickupDetail();

  const isWaitingDriver = pickup?.status === 'WAITING_DRIVER';

  if (loading) {
    return (
      <div className='flex h-full items-center justify-center bg-slate-50 text-slate-900 dark:bg-[#101922] dark:text-white'>
        <p>Memuat...</p>
      </div>
    );
  }

  if (!pickup) {
    return (
      <div className='flex h-full items-center justify-center bg-slate-50 text-slate-900 dark:bg-[#101922] dark:text-white'>
        <p>Pickup tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className='flex min-h-full flex-col bg-slate-50 dark:bg-[#101922]'>
      <PickupDetailHeader pickupId={pickupId} />

      <main className='flex-1 px-4 py-6 md:px-10'>
        <div className='mx-auto max-w-240'>
          <PickupMap
            center={
              getCurrentStepIndex() >= 1 && pickup.outlet
                ? [
                    parseFloat(pickup.outlet.lat),
                    parseFloat(pickup.outlet.long),
                  ]
                : [
                    parseFloat(pickup.customer_address.lat!),
                    parseFloat(pickup.customer_address.long!),
                  ]
            }
          />

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
            {!isWaitingDriver && (
              <div className='lg:col-span-7'>
                <PickupProgress
                  steps={steps}
                  currentStep={currentStep}
                  getCurrentStepIndex={getCurrentStepIndex}
                />
              </div>
            )}

            <CustomerInfoCard
              pickup={pickup}
              isWaitingDriver={!!isWaitingDriver}
              currentStepIndex={getCurrentStepIndex()}
            />
          </div>
        </div>
      </main>

      <PickupActionBar
        isWaitingDriver={!!isWaitingDriver}
        updating={updating}
        currentStep={currentStep}
        handleAcceptPickup={handleAcceptPickup}
        handleUpdateStatus={handleUpdateStatus}
        getCurrentStepIndex={getCurrentStepIndex}
      />
    </div>
  );
}
