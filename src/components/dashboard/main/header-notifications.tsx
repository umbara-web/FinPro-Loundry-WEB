'use client';

import { Bell } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { useWallet } from '@/src/context/WalletContext';

export function HeaderNotifications() {
  const {
    notificationCount,
    notifications,
    clearNotifications,
    toggleNotificationRead,
  } = useWallet();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='relative flex size-10 cursor-pointer items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600'
        >
          <Bell className='h-5 w-5' />
          {notificationCount > 0 && (
            <span className='absolute top-2 right-2 size-2 rounded-full bg-red-500'></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-72'>
        <DropdownMenuLabel className='flex items-center justify-between'>
          <span>Notifikasi ({notificationCount})</span>
          <a
            href='/dashboard/notifications'
            className='text-xs font-semibold text-black hover:text-blue-500 hover:underline dark:text-white dark:hover:text-blue-500'
          >
            Lihat
          </a>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications && notifications.length > 0 ? (
          <>
            <div className='max-h-40 overflow-y-auto'>
              {notifications.map((notif) => (
                <DropdownMenuItem
                  key={notif.id}
                  className={notif.read ? 'opacity-60' : ''}
                  onClick={() => toggleNotificationRead(notif.id)}
                >
                  <div className='flex w-full flex-col gap-1'>
                    <div className='flex items-center justify-between gap-2'>
                      <span className='text-sm font-medium'>{notif.title}</span>
                      {!notif.read && (
                        <span className='h-2 w-2 rounded-full bg-red-500'></span>
                      )}
                    </div>
                    <span className='line-clamp-2 text-xs text-slate-500 dark:text-slate-300'>
                      {notif.message}
                    </span>
                    <span className='text-right text-[10px] text-slate-400 dark:text-slate-300'>
                      {notif.time}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={clearNotifications}
              className='cursor-pointer justify-center font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-900'
            >
              Tandai semua sudah dibaca
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem disabled>
            <span className='text-slate-500'>Tidak ada notifikasi baru</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
