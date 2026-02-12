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
          className='size-20 rounded-full border-2 border-[#0a7ff5]/20 bg-cover bg-center bg-no-repeat md:size-28'
          style={{
            backgroundImage: user?.profile_picture_url
              ? `url(${user.profile_picture_url})`
              : 'none',
            backgroundColor: !user?.profile_picture_url ? '#223649' : undefined,
          }}
        >
          {!user?.profile_picture_url && (
            <div className='flex h-full w-full items-center justify-center text-3xl font-bold text-[#0a7ff5]'>
              {user?.name?.charAt(0).toUpperCase() || 'D'}
            </div>
          )}
        </div>
        <div>
          <p className='text-2xl font-bold text-white md:text-3xl'>
            Halo, {user?.name || 'Driver'}
          </p>
          <div className='mt-1 flex items-center gap-2'>
            <span
              className={clsx(
                'h-2 w-2 rounded-full',
                isOnline ? 'animate-pulse bg-green-500' : 'bg-slate-500'
              )}
            />
            <p className='text-sm text-[#8fadcc]'>
              Driver ID: #{user?.id?.slice(-4).toUpperCase() || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Status Toggle */}
      <div className='flex min-w-70 flex-1 flex-col items-start justify-between gap-4 rounded-xl border border-[#304d69] bg-[#101a23] p-4 md:flex-row md:items-center'>
        <div className='flex flex-col gap-1'>
          <p className='text-sm font-bold tracking-wider text-white uppercase'>
            Status Driver
          </p>
          <p className='text-xs text-[#8fadcc]'>
            {isOnline ? 'Online & Siap Menerima' : 'Offline'}
          </p>
        </div>
        <label className='relative flex h-7.75 w-12.75 cursor-pointer items-center rounded-full border-none bg-[#223649] p-0.5 transition-all has-checked:justify-end has-checked:bg-[#0a7ff5]'>
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
