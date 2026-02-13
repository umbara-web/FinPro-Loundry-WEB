import dynamic from 'next/dynamic';
import { Map } from 'lucide-react';
import { DeliveryDetail } from '../_types';

const MapView = dynamic(
  () => import('@/src/components/dashboard/address/map/map-view'),
  {
    ssr: false,
    loading: () => (
      <div className='flex h-full items-center justify-center bg-slate-100 dark:bg-[#1a2634]'>
        <Map className='h-16 w-16 text-slate-400 dark:text-[#304d69]' />
      </div>
    ),
  }
);

interface DeliveryMapProps {
  delivery: DeliveryDetail;
}

export function DeliveryMap({ delivery }: DeliveryMapProps) {
  return (
    <div className='mb-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-[#182634]'>
      <div className='aspect-video w-full'>
        {delivery.order?.pickup_request?.customer_address?.lat &&
        delivery.order?.pickup_request?.customer_address?.long ? (
          <MapView
            center={[
              parseFloat(delivery.order.pickup_request.customer_address.lat),
              parseFloat(delivery.order.pickup_request.customer_address.long),
            ]}
            onLocationSelect={() => {}}
            zoom={15}
          />
        ) : (
          <div className='flex h-full items-center justify-center bg-slate-100 dark:bg-[#1a2634]'>
            <Map className='h-16 w-16 text-slate-400 dark:text-[#304d69]' />
          </div>
        )}
      </div>
    </div>
  );
}
