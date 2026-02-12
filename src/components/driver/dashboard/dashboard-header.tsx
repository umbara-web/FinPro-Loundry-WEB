'use client';

import clsx from 'clsx';
import { User } from '@/src/context/AuthContext';
import { useAuth } from '@/src/context/AuthContext';

interface DashboardHeaderProps {
  user: any;
  isOnline: boolean;
  onStatusChange: (status: boolean) => void;
}

export function DashboardHeader({
  user,
  isOnline,
  onStatusChange,
}: DashboardHeaderProps) {
  return (
    <div className='mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
      <div className='flex items-center gap-4'>
        <div
          className='dark:border-primary/20 size-20 overflow-hidden rounded-full border-2 border-slate-200 bg-cover bg-center bg-no-repeat dark:border-blue-500/20 md:size-28'
          style={{
            backgroundImage: user?.profile_picture_url
              ? `url(${user.profile_picture_url})`
              : 'none',
          }}
        >
          {!user?.profile_picture_url && (
            <div className='bg-slate-100 flex h-full w-full items-center justify-center text-3xl font-bold text-blue-600 dark:bg-slate-800 dark:text-blue-400'>
              {user?.name?.charAt(0).toUpperCase() || 'D'}
            </div>
          )}
        </div>
        <div>
          <p className='text-2xl font-bold text-slate-900 dark:text-white md:text-3xl'>
            Halo, {user?.name || 'Driver'}
          </p>
          <div className='mt-1 flex items-center gap-2'>
            <span
              className={clsx(
                'h-2 w-2 rounded-full',
                isOnline ? 'animate-pulse bg-green-500' : 'bg-slate-400 dark:bg-slate-500'
              )}
            />
            <p className='text-sm text-slate-500 dark:text-slate-400'>
              Driver ID: #{user?.id?.slice(-4).toUpperCase() || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Status Toggle */}
      <div className='bg-white dark:bg-slate-900 dark:border-slate-700 flex min-w-70 flex-1 flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center'>
        <div className='flex flex-col gap-1'>
          <p className='text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white'>
            Status Driver
          </p>
          <p className='text-xs text-slate-500 dark:text-slate-400'>
            {isOnline ? 'Online & Siap Menerima' : 'Offline'}
          </p>
        </div>
        <label className='relative flex h-7.75 w-12.75 cursor-pointer items-center rounded-full border-none bg-slate-200 p-0.5 transition-all has-checked:justify-end has-checked:bg-blue-600 dark:bg-slate-700 dark:has-checked:bg-blue-500'>
          <div className='h-full w-6.75 rounded-full bg-white shadow-md'></div>
          <input
            type='checkbox'
            checked={isOnline}
            onChange={() => onStatusChange(!isOnline)}
            className='invisible absolute'
          />
        </label>
      </div>
    </div>
  );
}
