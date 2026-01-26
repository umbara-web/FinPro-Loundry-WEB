'use client';

import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import {
  Search,
  Calendar as CalendarIcon,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover';
import { Calendar } from '@/src/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import clsx from 'clsx';
import React from 'react';

interface FiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  sortOrder: 'asc' | 'desc';
  onSortChange: () => void;
}

export function NotificationFilters(props: FiltersProps) {
  return (
    <div className='flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:p-6 dark:border-[#324d67] dark:bg-[#111a22]'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center'>
        <SearchBar value={props.searchTerm} onChange={props.onSearchChange} />
        <div className='flex cursor-pointer items-center gap-2 overflow-x-auto pb-1 md:pb-0'>
          <DateFilter
            dateRange={props.dateRange}
            onChange={props.onDateRangeChange}
          />
          <SortFilter
            sortOrder={props.sortOrder}
            onChange={props.onSortChange}
          />
        </div>
      </div>
    </div>
  );
}

function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className='relative flex-1'>
      <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400' />
      <Input
        placeholder='Cari notifikasi...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='pl-9 dark:bg-[#1a2632]'
      />
    </div>
  );
}

function DateFilter({
  dateRange,
  onChange,
}: {
  dateRange: DateRange | undefined;
  onChange: (r: DateRange | undefined) => void;
}) {
  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={clsx(
            'flex cursor-pointer items-center gap-2 whitespace-nowrap',
            dateRange &&
              'cursor-pointer border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-900/20'
          )}
        >
          <CalendarIcon className='h-4 w-4' />
          <DateLabel dateRange={dateRange} />
          {dateRange && <ClearButton onClick={clearDate} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='end'>
        <Calendar
          initialFocus
          mode='range'
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={onChange}
          numberOfMonths={1}
          locale={id}
        />
      </PopoverContent>
    </Popover>
  );
}

function DateLabel({ dateRange }: { dateRange: DateRange | undefined }) {
  if (!dateRange?.from) return <span>Tanggal</span>;

  const fromStr = format(dateRange.from, 'dd MMM', { locale: id });
  const toStr = dateRange.to
    ? format(dateRange.to, 'dd MMM', { locale: id })
    : '';

  return (
    <>
      <span className='hidden sm:inline'>
        {toStr ? `${fromStr} - ${toStr}` : fromStr}
      </span>
      <span className='sm:hidden'>Filter Tgl</span>
    </>
  );
}

function ClearButton({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  return (
    <div
      role='button'
      onClick={onClick}
      className='ml-1 cursor-pointer rounded-full p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800'
    >
      <X className='h-3 w-3' />
    </div>
  );
}

function SortFilter({
  sortOrder,
  onChange,
}: {
  sortOrder: 'asc' | 'desc';
  onChange: () => void;
}) {
  return (
    <Button
      variant='outline'
      onClick={onChange}
      className='flex cursor-pointer items-center gap-2 whitespace-nowrap'
    >
      <SlidersHorizontal className='h-4 w-4' />
      <span>{sortOrder === 'desc' ? 'Terbaru' : 'Terlama'}</span>
    </Button>
  );
}
