'use client';

import { useDriverPickupList } from './_hooks/useDriverPickupList';
import { PickupListHeader } from './_components/PickupListHeader';
import { PickupCard } from './_components/PickupCard';

export function DriverPickupListView() {
  const { pickups, loading, fetchPickups, handleAccept } =
    useDriverPickupList();

  return (
    <div className='min-h-full bg-slate-50 text-slate-900 dark:bg-[#101922] dark:text-white'>
      <PickupListHeader onRefresh={fetchPickups} />

      <main className='mx-auto max-w-240 px-4 py-6 md:px-10'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold'>Daftar Request Jemput</h1>
          <p className='text-slate-500 dark:text-slate-400'>
            {pickups.length} request tersedia
          </p>
        </div>

        <div className='flex flex-col gap-4'>
          {loading ? (
            <div className='py-12 text-center text-slate-500 dark:text-slate-400'>
              Memuat...
            </div>
          ) : pickups.length === 0 ? (
            <div className='py-12 text-center text-slate-500 dark:text-slate-400'>
              Tidak ada pickup request saat ini.
            </div>
          ) : (
            pickups.map((pickup) => (
              <PickupCard
                key={pickup.id}
                pickup={pickup}
                onAccept={handleAccept}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
