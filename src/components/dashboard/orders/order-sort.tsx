'use client';

import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { ArrowUpDown } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export function OrderSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSort = (sortBy: string, sortOrder: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', sortBy);
    params.set('sortOrder', sortOrder);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='cursor-pointer gap-2 border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white'
        >
          <ArrowUpDown className='h-4 w-4' />
          Urutkan
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='dark:border-slate-700 dark:bg-[#101922]'
      >
        <DropdownMenuItem onClick={() => handleSort('created_at', 'desc')}>
          Terbaru
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort('created_at', 'asc')}>
          Terlama
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
