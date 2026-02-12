import {
  AvailablePickupRequest,
  AvailableDeliveryRequest,
} from '@/src/types/driver';
import { PickupRequestCard } from '@/src/components/driver/dashboard/pickup-request-card';
import { DeliveryRequestCard } from '@/src/components/driver/dashboard/delivery-request-card';

interface RequestsTabProps {
  pickups: AvailablePickupRequest[];
  deliveries: AvailableDeliveryRequest[];
  isLoading: boolean;
  onAcceptPickup: (id: string) => void;
  onAcceptDelivery: (id: string) => void;
}

export function RequestsTab({
  pickups,
  deliveries,
  isLoading,
  onAcceptPickup,
  onAcceptDelivery,
}: RequestsTabProps) {
  if (isLoading) {
    return (
      <div className='col-span-2 py-12 text-center text-slate-500 dark:text-slate-400'>
        Memuat data...
      </div>
    );
  }

  if (pickups.length === 0 && deliveries.length === 0) {
    return (
      <div className='col-span-2 py-12 text-center text-slate-500 dark:text-slate-400'>
        Tidak ada request baru saat ini.
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      {/* Pickup Cards */}
      {pickups.map((pickup) => (
        <PickupRequestCard
          key={pickup.id}
          pickup={pickup}
          onAccept={onAcceptPickup}
        />
      ))}

      {/* Delivery Cards */}
      {deliveries.map((delivery) => (
        <DeliveryRequestCard
          key={delivery.id}
          delivery={delivery}
          onAccept={onAcceptDelivery}
        />
      ))}
    </div>
  );
}
