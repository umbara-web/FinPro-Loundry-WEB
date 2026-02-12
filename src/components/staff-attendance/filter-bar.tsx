import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils/utils';
import { Calendar } from '@/src/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import type { DateRange } from '@/src/hooks/use-staff-attendance-report';

const calendarThemeOverrides = {
  '--background': 'oklch(0.15 0.02 240)',
  '--foreground': 'oklch(0.9 0 0)',
  '--popover': 'oklch(0.15 0.02 240)',
  '--popover-foreground': 'oklch(0.9 0 0)',
  '--muted-foreground': 'oklch(0.7 0.03 240)',
  '--accent': 'oklch(0.25 0.02 240)',
  '--accent-foreground': 'oklch(0.9 0 0)',
  '--primary': 'oklch(0.55 0.2 260)',
  '--primary-foreground': 'oklch(1 0 0)',
  '--border': 'oklch(0.3 0.02 240)',
  '--input': 'oklch(0.3 0.02 240)',
  '--ring': 'oklch(0.55 0.2 260)',
} as React.CSSProperties;

interface FilterBarProps {
  date: DateRange | undefined;
  onDateChange: (range: DateRange | undefined) => void;
  staffType: string;
  onStaffTypeChange: (value: string) => void;
}

export function FilterBar({
  date,
  onDateChange,
  staffType,
  onStaffTypeChange,
}: FilterBarProps) {
  return (
    <div className='mb-6 flex flex-col items-end gap-4 rounded-xl border border-[#223649] bg-[#182634] p-4 md:flex-row md:items-center'>
      {/* Date Range Picker */}
      <div className='grid gap-2'>
        <span className='text-xs font-medium text-[#8fadcc]'>
          Periode Tanggal
        </span>
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                'flex w-75 items-center justify-start gap-2 rounded-lg border border-[#223649] bg-[#101922] px-3 py-2 text-left text-sm font-normal text-white transition-colors hover:border-[#0a7ff5]/50',
                !date && 'text-[#8fadcc]'
              )}
            >
              <CalendarIcon className='h-4 w-4 text-[#8fadcc]' />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'dd MMM yyyy')} –{' '}
                    {format(date.to, 'dd MMM yyyy')}
                  </>
                ) : (
                  format(date.from, 'dd MMM yyyy')
                )
              ) : (
                <span>Pilih tanggal</span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent
            className='w-auto border-[#223649] bg-[#182634] p-0'
            align='start'
            style={calendarThemeOverrides}
          >
            <Calendar
              initialFocus
              mode='range'
              defaultMonth={date?.from}
              selected={date}
              onSelect={(range) => {
                if (range?.from) {
                  onDateChange({
                    from: range.from,
                    to: range.to || range.from,
                  });
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Staff Type Filter */}
      <div className='grid gap-2'>
        <span className='text-xs font-medium text-[#8fadcc]'>Tipe Staff</span>
        <Select value={staffType} onValueChange={onStaffTypeChange}>
          <SelectTrigger className='w-45 border-[#223649] bg-[#101922] text-white hover:border-[#0a7ff5]/50'>
            <SelectValue placeholder='Semua Staff' />
          </SelectTrigger>
          <SelectContent className='border-[#223649] bg-[#182634]'>
            <SelectItem value='ALL' className='text-white hover:bg-[#223649]'>
              Semua Staff
            </SelectItem>
            <SelectItem
              value='WORKER'
              className='text-white hover:bg-[#223649]'
            >
              Worker
            </SelectItem>
            <SelectItem
              value='DRIVER'
              className='text-white hover:bg-[#223649]'
            >
              Driver
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
