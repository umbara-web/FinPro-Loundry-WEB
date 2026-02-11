'use client';

import Link from 'next/link';
import { Truck, Navigation, User, MapPin } from 'lucide-react';
import { AvailableDeliveryRequest } from '@/src/types/driver';

interface DeliveryRequestCardProps {
  delivery: AvailableDeliveryRequest;
  onAccept: (id: string) => void;
}

export function DeliveryRequestCard({ delivery, onAccept }: DeliveryRequestCardProps) {
  return (
    <div
      className="flex flex-col gap-4 rounded-xl border border-transparent bg-[#182634] p-5 shadow-sm transition-all hover:border-[#0a7ff5]/50"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-2">
            <Truck className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="font-bold text-white">
              Antar - Order #{delivery.order_number || delivery.id.slice(-4)}
            </p>
            <p className="text-xs text-[#8fadcc]">
              #{delivery.id.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>
        {delivery.distance && (
          <div className="flex items-center gap-1 text-sm font-bold text-[#0a7ff5]">
            <Navigation className="h-4 w-4" />
            {delivery.distance} km
          </div>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-[#8fadcc]">
          <User className="h-4 w-4" />
          <span>
            {delivery.pickup_request?.customer?.name ||
              'Pelanggan'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#8fadcc]">
          <MapPin className="h-4 w-4" />
          <span className="truncate">
            {delivery.pickup_request?.customer_address?.address ||
              'Alamat'}
          </span>
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <button
          onClick={() => onAccept(delivery.id)}
          className="flex-1 rounded-lg bg-[#0a7ff5] py-2 text-sm font-bold text-white transition-colors hover:bg-[#0a7ff5]/90"
        >
          Terima Request
        </button>
        <Link
          href={`/driver-delivery/${delivery.id}`}
          className="rounded-lg bg-[#223649] px-3 py-2 text-sm font-bold text-white"
        >
          Detail
        </Link>
      </div>
    </div>
  );
}
