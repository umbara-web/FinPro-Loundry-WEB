'use client';

import { Button } from '@/src/components/ui/button';
import { Calendar } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover';
import { Calendar as CalendarComponent } from '@/src/components/ui/calendar';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export function OrderDateFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const dateFrom = searchParams.get('dateFrom');

  const handleDateSelect = (date: Date | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (date) {
      params.set('dateFrom', date.toISOString());
      params.set('dateTo', date.toISOString());
    } else {
      params.delete('dateFrom');
      params.delete('dateTo');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className='cursor-pointer gap-2 border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white'
        >
          <Calendar className='h-4 w-4' />
          {dateFrom
            ? format(new Date(dateFrom), 'dd MMM yyyy', { locale: id })
            : 'Tanggal'}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-auto p-0 dark:border-slate-700 dark:bg-[#101922]'
        align='end'
      >
        <CalendarComponent
          mode='single'
          selected={dateFrom ? new Date(dateFrom) : undefined}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
