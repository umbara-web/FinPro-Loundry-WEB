'use client';

import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import {
  Search,
  Calendar as CalendarIcon,
  RotateCcw,
  LayoutGrid,
} from 'lucide-react';
import { useDebounce } from '@/src/hooks/use-debounce';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { DateRange } from 'react-day-picker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover';
import { Calendar } from '@/src/components/ui/calendar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/src/lib/utils/utils';

interface OrderHistoryFilterProps {
  currentSearch?: string;
  currentStatus?: string;
  currentSortBy?: string;
  currentSortOrder?: string;
  currentDateFrom?: Date;
  currentDateTo?: Date;
  onSearchChange: (value: string) => void;
  onStatusChange: (status: string) => void;
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  onDateChange: (dateFrom: Date | undefined, dateTo: Date | undefined) => void;
}

const STATUS_OPTIONS = [
  { label: 'Semua Status', value: 'all' },
  { label: 'Pesanan Baru', value: 'CREATED' },
  { label: 'Menunggu Pembayaran', value: 'WAITING_PAYMENT' },
  { label: 'Sedang Diproses', value: 'ongoing' },
  { label: 'Sedang Dikirim', value: 'shipping' },
  { label: 'Selesai', value: 'COMPLETED' },
  { label: 'Dibatalkan', value: 'CANCELLED' },
];

export function OrderHistoryFilter({
  currentSearch = '',
  currentStatus = '',
  currentSortBy = 'created_at',
  currentSortOrder = 'desc',
  currentDateFrom,
  currentDateTo,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onDateChange,
}: OrderHistoryFilterProps) {
  const [searchValue, setSearchValue] = useState(currentSearch);
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    if (currentSearch !== searchValue) {
      if (!searchValue && currentSearch) setSearchValue(currentSearch);
    }
  }, [currentSearch]);

  useEffect(() => {
    if (debouncedSearch !== currentSearch) {
      onSearchChange(debouncedSearch);
    }
  }, [debouncedSearch, onSearchChange, currentSearch]);

  const dateRange: DateRange | undefined =
    currentDateFrom || currentDateTo
      ? {
          from: currentDateFrom,
          to: currentDateTo,
        }
      : undefined;

  const handleDateSelect = (range: DateRange | undefined) => {
    onDateChange(range?.from, range?.to);
  };

  const resetFilter = () => {
    setSearchValue('');
    onSearchChange('');
    onStatusChange('');
    onSortChange('created_at', 'desc');
    onDateChange(undefined, undefined);
  };

  const currentSortValue = `${currentSortBy}-${currentSortOrder}`;

  return (
    <div className='flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#1c2732]'>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-12'>
        <div className='lg:col-span-7'>
          <div className='relative'>
            <Search className='absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400' />
            <Input
              className='focus-visible:ring-primary/20 h-12 w-full rounded-xl border-gray-200 bg-gray-50 pl-12 text-sm placeholder:text-gray-400 dark:border-slate-700 dark:bg-[#151e26] dark:text-white'
              placeholder='Cari nomor pesanan atau item laundry...'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div className='flex items-center gap-3 lg:col-span-5'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={cn(
                  'h-12 w-full cursor-pointer justify-start rounded-xl border-gray-200 bg-gray-50 px-4 text-left font-normal hover:bg-gray-100 dark:border-slate-700 dark:bg-[#151e26] dark:text-white dark:hover:bg-[#1f2b36]',
                  !dateRange && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'dd/MM/yyyy')} -{' '}
                      {format(dateRange.to, 'dd/MM/yyyy')}
                    </>
                  ) : (
                    format(dateRange.from, 'dd/MM/yyyy')
                  )
                ) : (
                  <span>Pilih Tanggal</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='end'>
              <Calendar
                initialFocus
                mode='range'
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={handleDateSelect}
                numberOfMonths={2}
                locale={id}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className='grid grid-cols-1 items-center gap-4 md:grid-cols-4 lg:grid-cols-12'>
        <div className='relative lg:col-span-3'>
          <Select
            value={currentStatus || 'all'}
            onValueChange={(val: string) =>
              onStatusChange(val === 'all' ? '' : val)
            }
          >
            <SelectTrigger className='h-12 w-full cursor-pointer rounded-xl border-gray-200 bg-gray-50 dark:border-slate-700 dark:bg-[#151e26] dark:text-white'>
              <SelectValue placeholder='Semua Status' />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((status) => (
                <SelectItem
                  key={status.value}
                  value={status.value}
                  className='cursor-pointer'
                >
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='relative lg:col-span-3'>
          <Select disabled value='all'>
            <SelectTrigger className='h-12 w-full rounded-xl border-gray-200 bg-gray-50 dark:border-slate-700 dark:bg-[#151e26] dark:text-white'>
              <SelectValue placeholder='Semua Kategori' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Semua Kategori</SelectItem>
            </SelectContent>
          </Select>
          <LayoutGrid className='pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400' />
        </div>

        <div className='relative lg:col-span-3'>
          <Select
            value={currentSortValue}
            onValueChange={(val: string) => {
              const [sortBy, sortOrder] = val.split('-');
              onSortChange(sortBy, sortOrder as 'asc' | 'desc');
            }}
          >
            <SelectTrigger className='h-12 w-full cursor-pointer rounded-xl border-gray-200 bg-gray-50 dark:border-slate-700 dark:bg-[#151e26] dark:text-white'>
              <SelectValue placeholder='Urutkan' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='created_at-desc' className='cursor-pointer'>
                Terbaru
              </SelectItem>
              <SelectItem value='created_at-asc' className='cursor-pointer'>
                Terlama
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='lg:col-span-3'>
          <Button
            onClick={resetFilter}
            className='group h-12 w-full cursor-pointer gap-2 rounded-xl bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-800'
            variant='ghost'
          >
            <RotateCcw className='h-5 w-5 transition-transform duration-300 group-active:-rotate-180' />
            <span className='font-semibold'>Reset Filter</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
