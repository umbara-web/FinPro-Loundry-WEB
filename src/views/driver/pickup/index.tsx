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
import { api } from '@/src/lib/api/axios-instance';

export function DriverPickupListView() {
  const [pickups, setPickups] = useState<AvailablePickupRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPickups = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/driver/pickups');
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
      await api.post(`/driver/pickups/${requestId}/accept`);
      window.location.href = `/driver-pickup/${requestId}`;
    } catch (error: any) {
      console.error('Error accepting pickup:', error);
      alert(error.response?.data?.message || 'Gagal menerima request');
    }
  };

  return (
    <div className="min-h-full bg-[#101922] text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#223649] bg-[#101922] px-4 py-3 md:px-10">
        <div className="flex items-center gap-4">
          <Link
            href="/driver-dashboard"
            className="flex items-center gap-2 text-[#8fadcc] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <div className="mx-2 h-4 w-px bg-[#223649]" />
          <h2 className="text-lg font-bold">Pickup Requests</h2>
        </div>
        <button
          onClick={fetchPickups}
          className="flex items-center gap-2 rounded-lg bg-[#223649] px-4 py-2 text-sm font-medium transition-colors hover:bg-[#304d69]"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </header>

      <main className="mx-auto max-w-[960px] px-4 py-6 md:px-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Daftar Request Jemput</h1>
          <p className="text-[#8fadcc]">
            {pickups.length} request tersedia
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="py-12 text-center text-[#8fadcc]">Memuat...</div>
          ) : pickups.length === 0 ? (
            <div className="py-12 text-center text-[#8fadcc]">
              Tidak ada pickup request saat ini.
            </div>
          ) : (
            pickups.map((pickup) => (
              <div
                key={pickup.id}
                className="flex flex-col gap-4 rounded-xl border border-transparent bg-[#182634] p-5 shadow-sm transition-all hover:border-[#0a7ff5]/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-orange-500/10 p-3">
                      <Package className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">
                        Jemput - {pickup.notes || 'Laundry'}
                      </p>
                      <p className="text-sm text-[#8fadcc]">
                        #{pickup.id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                  </div>
                  {pickup.distance && (
                    <div className="flex items-center gap-1 text-sm font-bold text-[#0a7ff5]">
                      <Navigation className="h-4 w-4" />
                      {pickup.distance} km
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#8fadcc]">
                    <User className="h-4 w-4" />
                    <span>{pickup.customer?.name || 'Pelanggan'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8fadcc]">
                    <MapPin className="h-4 w-4" />
                    <span>{pickup.customer_address?.address || 'Alamat'}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleAccept(pickup.id)}
                    className="flex-1 rounded-lg bg-[#0a7ff5] py-3 text-sm font-bold text-white transition-colors hover:bg-[#0a7ff5]/90"
                  >
                    Terima Request
                  </button>
                  <Link
                    href={`/driver-pickup/${pickup.id}`}
                    className="rounded-lg bg-[#223649] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#304d69]"
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
