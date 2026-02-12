'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Truck,
  MapPin,
  User,
  Navigation,
  RefreshCw,
} from 'lucide-react';
import { AvailableDeliveryRequest } from '@/src/types/driver';
import { driverService } from '@/src/services/driver.service';

export function DriverDeliveryListView() {
  const [deliveries, setDeliveries] = useState<AvailableDeliveryRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeliveries = useCallback(async () => {
    setLoading(true);
    try {
      const data = await driverService.getAvailableDeliveries();
      setDeliveries(data.data || []);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  const handleAccept = async (orderId: string) => {
    try {
      const data = await driverService.acceptDelivery(orderId);
      const taskId = data.data.id;
      window.location.href = `/driver-delivery/${taskId}`;
    } catch (error: any) {
      console.error('Error accepting delivery:', error);
      alert(error.response?.data?.message || 'Gagal menerima delivery');
    }
  };

  return (
    <div className='min-h-full bg-[#101922] text-white'>
      {/* Header */}
      <header className='sticky top-0 z-10 flex items-center justify-between border-b border-[#223649] bg-[#101922] px-4 py-3 md:px-10'>
        <div className='flex items-center gap-4'>
          <Link
            href='/driver-dashboard'
            className='flex items-center gap-2 text-[#8fadcc] transition-colors hover:text-white'
          >
            <ArrowLeft className='h-5 w-5' />
            <span className='text-sm font-medium'>Dashboard</span>
          </Link>
          <div className='mx-2 h-4 w-px bg-[#223649]' />
          <h2 className='text-lg font-bold'>Delivery Requests</h2>
        </div>
        <button
          onClick={fetchDeliveries}
          className='flex items-center gap-2 rounded-lg bg-[#223649] px-4 py-2 text-sm font-medium transition-colors hover:bg-[#304d69]'
        >
          <RefreshCw className='h-4 w-4' />
          Refresh
        </button>
      </header>

      <main className='mx-auto max-w-240 px-4 py-6 md:px-10'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold'>Daftar Request Antar</h1>
          <p className='text-[#8fadcc]'>{deliveries.length} request tersedia</p>
        </div>

        <div className='flex flex-col gap-4'>
          {loading ? (
            <div className='py-12 text-center text-[#8fadcc]'>Memuat...</div>
          ) : deliveries.length === 0 ? (
            <div className='py-12 text-center text-[#8fadcc]'>
              Tidak ada delivery request saat ini.
            </div>
          ) : (
            deliveries.map((delivery) => (
              <div
                key={delivery.id}
                className='flex flex-col gap-4 rounded-xl border border-transparent bg-[#182634] p-5 shadow-sm transition-all hover:border-[#0a7ff5]/50'
              >
                <div className='flex items-start justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='rounded-lg bg-blue-500/10 p-3'>
                      <Truck className='h-6 w-6 text-blue-500' />
                    </div>
                    <div>
                      <p className='text-lg font-bold'>
                        Antar - Order #
                        {delivery.order_number || delivery.id.slice(-4)}
                      </p>
                      <p className='text-sm text-[#8fadcc]'>
                        #{delivery.id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                  </div>
                  {delivery.distance && (
                    <div className='flex items-center gap-1 text-sm font-bold text-[#0a7ff5]'>
                      <Navigation className='h-4 w-4' />
                      {delivery.distance} km
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center gap-2 text-sm text-[#8fadcc]'>
                    <User className='h-4 w-4' />
                    <span>
                      {delivery.pickup_request?.customer?.name || 'Pelanggan'}
                    </span>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-[#8fadcc]'>
                    <MapPin className='h-4 w-4' />
                    <span>
                      {delivery.pickup_request?.customer_address?.address ||
                        'Alamat'}
                    </span>
                  </div>
                </div>

                <div className='flex gap-2 pt-2'>
                  <button
                    onClick={() => handleAccept(delivery.id)}
                    className='flex-1 rounded-lg bg-[#0a7ff5] py-3 text-sm font-bold text-white transition-colors hover:bg-[#0a7ff5]/90'
                  >
                    Terima Request
                  </button>
                  <Link
                    href={`/driver-delivery/${delivery.id}`}
                    className='rounded-lg bg-[#223649] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#304d69]'
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
