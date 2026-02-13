import dynamic from 'next/dynamic';
import { Map } from 'lucide-react';

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

interface PickupMapProps {
  center: [number, number];
  zoom?: number;
}

export const PickupMap = ({ center, zoom = 15 }: PickupMapProps) => {
  return (
    <div className='mb-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-[#182634]'>
      <div className='aspect-video w-full'>
        {center[0] && center[1] ? (
          <MapView center={center} onLocationSelect={() => {}} zoom={zoom} />
        ) : (
          <div className='flex h-full items-center justify-center bg-slate-100 dark:bg-[#1a2634]'>
            <Map className='h-16 w-16 text-slate-400 dark:text-[#304d69]' />
          </div>
        )}
      </div>
    </div>
  );
};
