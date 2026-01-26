'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
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

export function HeaderCart() {
  const { cartCount, activeOrders } = useWallet();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='relative flex size-10 cursor-pointer items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-[#233648] dark:text-white dark:hover:bg-[#324d67]'
        >
          <ShoppingCart className='h-5.5 w-5.5' />
          {cartCount > 0 && (
            <span className='border-card-dark absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white'>
              {cartCount}
            </span>
          )}
        </Button>
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
  );
}
