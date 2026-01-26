import { motion } from 'framer-motion';
import { Bell, ShoppingCart } from 'lucide-react';
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
          {/* Shopping Cart Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='relative cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600'>
                <ShoppingCart className='h-5 w-5 text-gray-600 dark:text-gray-300' />
                {cartCount > 0 && (
                  <span className='absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white'>
                    {cartCount}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-64'>
              <DropdownMenuLabel>Pesanan Aktif ({cartCount})</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {activeOrders && activeOrders.length > 0 ? (
                activeOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className='px-2 py-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-bold'>
                        #{order.id.slice(0, 8)}
                      </span>
                      <span className='rounded-full bg-blue-100 px-2 py-0.5 text-[10px] text-blue-700 dark:bg-blue-900 dark:text-blue-300'>
                        {order.status}
                      </span>
                    </div>
                    <p className='mt-1 text-xs text-slate-500 dark:text-slate-400'>
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                    <DropdownMenuSeparator className='mt-2' />
                  </div>
                ))
              ) : (
                <div className='p-2 text-sm text-slate-500'>
                  Tidak ada pesanan aktif.
                </div>
              )}
              <DropdownMenuItem asChild>
                <Link
                  href='/dashboard/orders'
                  className='w-full cursor-pointer text-center font-medium text-blue-500'
                >
                  Lihat Semua Pesanan
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notification Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='relative cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600'>
                <Bell className='h-5 w-5 text-gray-600 dark:text-gray-300' />
                {notificationCount > 0 && (
                  <span className='absolute top-1.5 right-1.5 h-2 w-2 rounded-full border border-white bg-red-500 dark:border-black' />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-72'>
              <DropdownMenuLabel>
                Notifikasi ({notificationCount})
              </DropdownMenuLabel>
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
              <Button className='text-lp-primary h-10 cursor-pointer items-center justify-center rounded-lg bg-transparent px-5 text-sm font-bold transition-colors hover:scale-105 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800'>
                Login
              </Button>
            </Link>
            <Link href='/auth/register'>
              <Button className='bg-lp-primary-dark hover:bg-lp-primary flex h-10 cursor-pointer items-center justify-center rounded-lg px-5 text-sm font-bold text-white shadow-sm shadow-blue-500/30 transition-all hover:scale-105'>
                Daftar
              </Button>
            </Link>
          </div>
        </>
      )}
    </motion.div>
  );
}
