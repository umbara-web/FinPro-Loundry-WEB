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
  const { notificationCount, notifications, clearNotifications } = useWallet();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='relative flex size-10 cursor-pointer items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-[#233648] dark:text-white dark:hover:bg-[#324d67]'
        >
          <Bell className='h-5.5 w-5.5' />
          {notificationCount > 0 && (
            <span className='border-card-dark absolute top-2 right-2 size-2 rounded-full border-2 bg-red-500'></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-72'>
        <DropdownMenuLabel>Notifikasi ({notificationCount})</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications && notifications.length > 0 ? (
          <>
            {notifications.slice(0, 3).map((notif) => (
              <DropdownMenuItem
                key={notif.id}
                className={notif.read ? 'opacity-60' : ''}
              >
                <div className='flex w-full flex-col gap-1'>
                  <div className='flex justify-between'>
                    <span className='text-sm font-medium'>{notif.title}</span>
                    {!notif.read && (
                      <span className='h-2 w-2 rounded-full bg-red-500'></span>
                    )}
                  </div>
                  <span className='line-clamp-2 text-xs text-slate-500 dark:text-slate-400'>
                    {notif.message}
                  </span>
                  <span className='text-right text-[10px] text-slate-400'>
                    {notif.time}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={clearNotifications}
              className='cursor-pointer justify-center text-blue-500 focus:text-blue-600'
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
