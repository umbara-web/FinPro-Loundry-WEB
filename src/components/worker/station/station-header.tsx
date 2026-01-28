'use client';

import { Bell, ClipboardCheck, Waves, Flame, Package } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import { StationType, getStationConfig } from '@/src/types/station';
import clsx from 'clsx';

interface StationHeaderProps {
  stationType?: StationType;
  onAttendanceClick?: () => void;
}

const stationIcons: Record<StationType, React.ElementType> = {
  WASHING: Waves,
  IRONING: Flame,
  PACKING: Package,
};

export function StationHeader({
  stationType = 'WASHING',
  onAttendanceClick,
}: StationHeaderProps) {
  const { user } = useAuth();
  const config = getStationConfig(stationType);
  const StationIcon = stationIcons[stationType];

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[--color-station-border] bg-[--color-station-bg] px-4 md:px-6">
      {/* Logo & Station Name */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${config.color}20` }}
        >
          <StationIcon
            className="h-6 w-6"
            style={{ color: config.color }}
          />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight tracking-tight text-white">
            {config.name}
          </h1>
          <p className="text-xs font-normal text-[--color-station-text-muted]">
            Worker Dashboard
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Attendance Button */}
        <button
          onClick={onAttendanceClick}
          className={clsx(
            'flex h-10 items-center gap-2 rounded-lg px-4',
            'bg-[--color-station-primary] hover:bg-blue-600',
            'text-sm font-bold text-white shadow-lg shadow-blue-500/20',
            'transition-colors'
          )}
        >
          <ClipboardCheck className="h-5 w-5" />
          <span className="hidden sm:inline">Log Absensi</span>
        </button>

        {/* Notification Bell */}
        <button
          className={clsx(
            'relative flex h-10 w-10 items-center justify-center rounded-lg',
            'bg-[--color-station-border] hover:bg-[--color-station-border-hover]',
            'text-white transition-colors'
          )}
        >
          <Bell className="h-5 w-5" />
          {/* Notification Badge */}
          <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full border border-[--color-station-border] bg-red-500" />
        </button>
      </div>
    </header>
  );
}
