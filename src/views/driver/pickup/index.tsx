'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Package,
  MapPin,
  User,
  Navigation,
  RefreshCw,
} from 'lucide-react';
import { AvailablePickupRequest } from '@/src/types/driver';
import { driverService } from '@/src/services/driver';

export function DriverPickupListView() {
  const [pickups, setPickups] = useState<AvailablePickupRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPickups = useCallback(async () => {
    setLoading(true);
    try {
      const data = await driverService.getAvailablePickups();
      setPickups(data.data || []);
    } catch (error) {
      console.error('Error fetching pickups:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPickups();
  }, [fetchPickups]);

  const handleAccept = async (requestId: string) => {
    try {
      await driverService.acceptPickup(requestId);
      window.location.href = `/driver-pickup/${requestId}`;
    } catch (error: any) {
      console.error('Error accepting pickup:', error);
      alert(error.response?.data?.message || 'Gagal menerima request');
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
          <h2 className='text-lg font-bold'>Pickup Requests</h2>
        </div>
        <button
          onClick={fetchPickups}
          className='flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700'
        >
          <RefreshCw className='h-4 w-4' />
          Refresh
        </button>
      </header>

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
              <div
                key={pickup.id}
                className='flex flex-col gap-4 rounded-xl border border-transparent bg-white p-5 shadow-sm transition-all hover:border-blue-500/50 dark:bg-slate-800'
              >
                <div className='flex items-start justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='rounded-lg bg-orange-100 p-3 dark:bg-orange-500/10'>
                      <Package className='h-6 w-6 text-orange-600 dark:text-orange-500' />
                    </div>
                    <div>
                      <p className='text-lg font-bold text-slate-900 dark:text-white'>
                        Jemput - {pickup.notes || 'Laundry'}
                      </p>
                      <p className='text-sm text-slate-500 dark:text-slate-400'>
                        #{pickup.id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                  </div>
                  {pickup.distance && (
                    <div className='flex items-center gap-1 text-sm font-bold text-blue-600 dark:text-blue-500'>
                      <Navigation className='h-4 w-4' />
                      {pickup.distance} km
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400'>
                    <User className='h-4 w-4' />
                    <span>{pickup.customer?.name || 'Pelanggan'}</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400'>
                    <MapPin className='h-4 w-4' />
                    <span>{pickup.customer_address?.address || 'Alamat'}</span>
                  </div>
                </div>

                <div className='flex gap-2 pt-2'>
                  <button
                    onClick={() => handleAccept(pickup.id)}
                    className='flex-1 rounded-lg bg-blue-600 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500'
                  >
                    Terima Request
                  </button>
                  <Link
                    href={`/driver-pickup/${pickup.id}`}
                    className='rounded-lg bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'
                  >
                    Detail
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
