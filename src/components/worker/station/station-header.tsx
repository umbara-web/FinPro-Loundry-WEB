'use client';

import {
  Bell,
  ClipboardCheck,
  Waves,
  Flame,
  Package,
  LogOut,
  User,
} from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import { StationType, getStationConfig } from '@/src/types/station';
import Link from 'next/link';
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
  const { user, logout } = useAuth();
  const config = getStationConfig(stationType);
  const StationIcon = stationIcons[stationType];

  return (
    <header className='flex h-16 shrink-0 items-center justify-between border-b border-(--color-station-border) bg-(--color-station-bg) px-4 md:px-6'>
      {/* Logo & Station Name */}
      <div className='flex items-center gap-3'>
        <div
          className='flex h-10 w-10 items-center justify-center rounded-lg'
          style={{ backgroundColor: `${config.color}20` }}
        >
          <StationIcon className='h-6 w-6' style={{ color: config.color }} />
        </div>
        <div>
          <h1 className='text-lg leading-tight font-bold tracking-tight text-white'>
            {config.name}
          </h1>
          <p className='text-xs font-normal text-(--color-station-text-muted)'>
            Worker Dashboard
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className='flex items-center gap-3'>
        {/* Attendance Button */}
        <button
          onClick={onAttendanceClick}
          className={clsx(
            'flex h-10 items-center gap-2 rounded-lg px-4',
            'bg-(--color-station-primary) hover:bg-blue-600',
            'text-sm font-bold text-white shadow-lg shadow-blue-500/20',
            'transition-colors'
          )}
        >
          <ClipboardCheck className='h-5 w-5' />
          <span className='hidden sm:inline'>Log Absensi</span>
        </button>

        {/* Profile Link */}
        <Link
          href='/worker-profile'
          className='flex items-center gap-3 rounded-lg border border-(--color-station-border) bg-(--color-station-bg) p-1.5 pr-3 transition-colors hover:bg-(--color-station-border)'
        >
          <div className='relative h-8 w-8 overflow-hidden rounded-md bg-slate-700'>
            {user?.profile_picture_url ? (
              <img
                src={user.profile_picture_url}
                alt={user.name}
                className='h-full w-full object-cover'
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center bg-slate-800 text-xs font-bold text-white'>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <div className='hidden flex-col text-right sm:flex'>
            <span className='text-xs leading-none font-bold text-white'>
              {user?.name || 'Worker'}
            </span>
            <span className='text-[10px] leading-none text-(--color-station-text-muted) uppercase'>
              {user?.role || 'Worker'}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
