import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { ModeToggle } from '@/src/components/ui/mode-toggle';
import { NavbarUserMenu } from './navbar-user-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { useWallet } from '@/src/context/WalletContext';
import { User } from '@/src/context/AuthContext';

interface NavbarActionsProps {
  isLoggedIn: boolean;
  user: User | null;
}

export function NavbarActions({ isLoggedIn, user }: NavbarActionsProps) {
  const {
    cartCount,
    notificationCount,
    clearNotifications,
    activeOrders,
    notifications,
    toggleNotificationRead,
  } = useWallet();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className='z-10 hidden items-center lg:flex'
    >
      <ModeToggle />

      {isLoggedIn && user ? (
        <div className='ml-2 flex items-center gap-3'>
          {/* Notification Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='relative cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600'
              >
                <Bell className='h-5 w-5 text-gray-600 dark:text-gray-300' />
                {notificationCount > 0 && (
                  <span className='absolute top-1.5 right-1.5 h-2 w-2 rounded-full border border-white bg-red-500 dark:border-black' />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-72'>
              <DropdownMenuLabel className='flex items-center justify-between'>
                <span>Notifikasi ({notificationCount})</span>
                <Link
                  href='/dashboard/notifications'
                  className='text-xs font-semibold text-blue-600 hover:underline'
                >
                  Lihat
                </Link>
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
                            <span className='text-sm font-medium'>
                              {notif.title}
                            </span>
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
                  </div>
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
                  <span className='text-slate-500'>
                    Tidak ada notifikasi baru
                  </span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Divider */}
          <div className='h-8 w-px bg-gray-200 dark:bg-gray-700' />

          {/* User Dropdown */}
          <NavbarUserMenu user={user} />
        </div>
      ) : (
        <>
          {/* Divider */}
          <div className='ml-3 flex items-center gap-4'>
            <div className='h-8 w-px bg-gray-200 dark:bg-gray-700' />

            <Link href='/auth/login'>
              <Button className='text-primary h-10 cursor-pointer items-center justify-center rounded-lg bg-transparent px-5 text-sm font-bold transition-colors hover:scale-105 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-500'>
                Login
              </Button>
            </Link>
            <Link href='/auth/register'>
              <Button className='bg-primary-dark flex h-10 cursor-pointer items-center justify-center rounded-lg px-5 text-sm font-bold text-white shadow-sm shadow-blue-500/90 transition-all hover:scale-105 hover:bg-gray-500'>
                Daftar
              </Button>
            </Link>
          </div>
        </>
      )}
    </motion.div>
  );
}
