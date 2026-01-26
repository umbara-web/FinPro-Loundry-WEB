'use client';

import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Search, Filter, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';

interface Props {
  searchPromise: string;
  setSearch: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export function PaymentHistoryFilters({
  searchPromise,
  setSearch,
  statusFilter,
  setStatusFilter,
}: Props) {
  const getStatusLabel = (value: string) => {
    switch (value) {
      case 'PENDING':
        return 'Menunggu';
      case 'PAID':
        return 'Berhasil';
      case 'FAILED_GROUP':
        return 'Tidak Berhasil';
      default:
        return 'Semua';
    }
  };

  return (
    <div className='flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center dark:border-[#233648] dark:bg-[#101922]'>
      <div className='relative flex-1'>
        <Search className='absolute top-2.5 left-3 h-4 w-4 text-slate-500' />
        <Input
          placeholder='Cari No. Pesanan...'
          value={searchPromise}
          onChange={(e) => setSearch(e.target.value)}
          className='border-slate-200 bg-slate-50 pl-9 text-slate-900 focus-visible:ring-blue-600 dark:border-[#233648] dark:bg-[#111a22] dark:text-white'
        />
      </div>
      <div className='flex gap-2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='w-40 cursor-pointer justify-between border-slate-200 bg-slate-50 text-slate-900 dark:border-[#233648] dark:bg-[#111a22] dark:text-white'
            >
              {getStatusLabel(statusFilter)}
              <ChevronDown className='h-4 w-4 opacity-50' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-40 dark:border-[#233648] dark:bg-[#111a22]'>
            <DropdownMenuItem onClick={() => setStatusFilter('all')}>
              Semua
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('PENDING')}>
              Menunggu
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('PAID')}>
              Berhasil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('FAILED_GROUP')}>
              Tidak Berhasil
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant='outline'
          className='cursor-pointer gap-2 border-slate-200 bg-slate-50 text-slate-900 hover:bg-slate-100 dark:border-[#233648] dark:bg-[#111a22] dark:text-white dark:hover:bg-[#233648]'
        >
          <Filter className='h-4 w-4' />
          Filter
        </Button>
      </div>
    </div>
  );
}
