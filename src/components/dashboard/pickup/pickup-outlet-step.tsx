'use client';

import { useQuery } from '@tanstack/react-query';
import { pickupApi } from '@/src/lib/api/pickup-api';
import { Address } from '@/src/types/address';
import {
  Store,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

interface PickupOutletStepProps {
  selectedAddress?: Address;
}

function SectionHeader() {
  return (
    <div className='mb-4 border-t border-slate-300 pt-4 dark:border-slate-700'>
      <div className='mb-2 flex items-center gap-3'>
        <div className='flex items-center justify-center rounded-lg bg-blue-500/20 p-2 text-blue-500'>
          <Store className='h-6 w-6' />
        </div>
        <h2 className='text-xl font-bold text-black dark:text-white'>
          4. Outlet Terdekat
        </h2>
      </div>
      <p className='text-sm text-gray-600 dark:text-gray-400'>
        Proses pencarian outlet terdekat berdasarkan titik koordinat antara
        alamat user dan outlet-outlet yang tersedia.
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className='flex items-center justify-center gap-3 rounded-xl border border-slate-300 bg-slate-200 p-8 dark:border-slate-700 dark:bg-slate-800'>
      <Loader2 className='h-6 w-6 animate-spin text-blue-500' />
      <span className='text-gray-500 dark:text-gray-400'>
        Mencari outlet terdekat...
      </span>
    </div>
  );
}

function NoAddressState() {
  return (
    <div className='flex items-center gap-3 rounded-xl border border-dashed border-slate-400 bg-slate-100 p-6 dark:border-slate-600 dark:bg-slate-800/50'>
      <MapPin className='h-6 w-6 text-gray-400' />
      <p className='text-gray-500 dark:text-gray-400'>
        Pilih alamat terlebih dahulu untuk mencari outlet terdekat
      </p>
    </div>
  );
}

function OutletNotFoundState() {
  return (
    <div className='rounded-xl border border-orange-300 bg-orange-50 p-6 dark:border-orange-700 dark:bg-orange-900/20'>
      <div className='flex items-start gap-4'>
        <div className='flex size-12 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/40'>
          <AlertTriangle className='h-6 w-6 text-orange-500' />
        </div>
        <div>
          <p className='text-sm text-orange-600 dark:text-orange-300'>
            outlet terdekat tidak di temukan karena jarak di luar jangkauan
            outlet
          </p>
        </div>
      </div>
    </div>
  );
}

function OutletFoundState({
  name,
  address,
  distance,
}: {
  name: string;
  address: string;
  distance: number;
}) {
  return (
    <div className='rounded-xl border border-green-300 bg-green-50 p-6 dark:border-green-700 dark:bg-green-900/20'>
      <div className='flex items-start gap-4'>
        <div className='flex size-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/40'>
          <CheckCircle2 className='h-6 w-6 text-green-500' />
        </div>
        <div className='flex-1'>
          <h3 className='mb-1 font-bold text-green-700 dark:text-green-400'>
            {name}
          </h3>
          <p className='mb-2 text-sm text-green-600 dark:text-green-300'>
            {address}
          </p>
          <div className='flex items-center gap-2'>
            <MapPin className='h-4 w-4 text-green-500' />
            <span className='text-sm font-medium text-green-600 dark:text-green-300'>
              Jarak: {distance} km dari lokasi Anda
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PickupOutletStep({ selectedAddress }: PickupOutletStepProps) {
  const { data, isLoading } = useQuery({
    queryKey: [
      'nearest-outlet',
      selectedAddress?.latitude,
      selectedAddress?.longitude,
    ],
    queryFn: () =>
      pickupApi.findNearestOutlet(
        selectedAddress!.latitude!.toString(),
        selectedAddress!.longitude!.toString()
      ),
    enabled: !!selectedAddress?.latitude && !!selectedAddress?.longitude,
  });

  const renderContent = () => {
    if (!selectedAddress) return <NoAddressState />;
    if (isLoading) return <LoadingState />;
    if (!data?.isWithinRange || !data?.outlet) return <OutletNotFoundState />;
    return (
      <OutletFoundState
        name={data.outlet.name}
        address={data.outlet.address}
        distance={data.distance!}
      />
    );
  };

  return (
    <section>
      <SectionHeader />
      {renderContent()}
    </section>
  );
}
