import { Waves, RectangleVertical, Package } from 'lucide-react';
import clsx from 'clsx';
import { StationType } from '@/src/types/station';

interface WorkerMobileNavProps {
  activeStation: StationType;
  onStationChange: (station: StationType) => void;
}

export function WorkerMobileNav({
  activeStation,
  onStationChange,
}: WorkerMobileNavProps) {
  const tabs: { id: StationType; label: string; icon: React.ElementType }[] = [
    { id: 'WASHING', label: 'Cuci', icon: Waves },
    { id: 'IRONING', label: 'Setrika', icon: RectangleVertical },
    { id: 'PACKING', label: 'Packing', icon: Package },
  ];

  return (
    <div className='fixed right-0 bottom-0 left-0 z-50 flex h-20 items-center justify-around border-t border-(--color-station-border) bg-(--color-station-surface)/95 px-6 pb-4 backdrop-blur-md lg:hidden'>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeStation === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onStationChange(tab.id)}
            className={clsx(
              'flex flex-col items-center gap-1 transition-colors',
              isActive
                ? 'text-(--color-station-primary)'
                : 'text-(--color-station-text-muted) hover:text-white'
            )}
          >
            <div
              className={clsx(
                'flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                isActive && 'bg-(--color-station-primary)/10'
              )}
            >
              <Icon className='h-5 w-5' />
            </div>
            <span
              className={clsx('text-xs font-medium', isActive && 'font-bold')}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
