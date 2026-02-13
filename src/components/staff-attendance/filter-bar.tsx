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
import type { TimePreset } from '@/src/types/staff-attendance';
import { timePresetLabels } from '@/src/types/staff-attendance';

interface FilterBarProps {
  date: DateRange | undefined;
  onDateChange: (range: DateRange | undefined) => void;
  staffType: string;
  onStaffTypeChange: (value: string) => void;
  selectedPreset: TimePreset;
  onPresetChange: (preset: TimePreset) => void;
}

const presetOptions: TimePreset[] = [
  'TODAY',
  'YESTERDAY',
  'THIS_WEEK',
  'THIS_MONTH',
  'LAST_MONTH',
  'CUSTOM',
];

export function FilterBar({
  date,
  onDateChange,
  staffType,
  onStaffTypeChange,
  selectedPreset,
  onPresetChange,
}: FilterBarProps) {
  return (
    <div className='mb-6 flex flex-col items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-start dark:border-slate-700 dark:bg-[#182634]'>
      {/* Time Preset Filter */}
      <div className='grid w-full gap-2 sm:w-auto'>
        <span className='text-xs font-medium text-slate-500 dark:text-slate-400'>
          Periode Waktu
        </span>
        <Select
          value={selectedPreset}
          onValueChange={(val) => onPresetChange(val as TimePreset)}
        >
          <SelectTrigger className='w-full border-slate-300 bg-slate-50 text-slate-900 hover:border-blue-500/50 sm:w-50 dark:border-slate-700 dark:bg-[#101922] dark:text-white dark:hover:border-[#0a7ff5]/50'>
            <SelectValue placeholder='Pilih periode' />
          </SelectTrigger>
          <SelectContent className='border-slate-200 bg-white dark:border-slate-700 dark:bg-[#182634]'>
            {presetOptions.map((preset) => (
              <SelectItem
                key={preset}
                value={preset}
                className='text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'
              >
                {timePresetLabels[preset]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {date?.from && (
          <span className='text-xs text-slate-400 dark:text-[#8fadcc]'>
            {format(date.from, 'dd MMM yyyy')}
            {date.to && date.to.getTime() !== date.from.getTime()
              ? ` – ${format(date.to, 'dd MMM yyyy')}`
              : ''}
          </span>
        )}
      </div>

      {/* Custom Date Range Picker — only visible when CUSTOM is selected */}
      {selectedPreset === 'CUSTOM' && (
        <div className='grid w-full gap-2 sm:w-auto'>
          <span className='text-xs font-medium text-slate-500 dark:text-slate-400'>
            Rentang Tanggal
          </span>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  'flex h-10 w-full items-center justify-start gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 text-left text-sm font-normal text-slate-900 transition-colors hover:border-blue-500/50 sm:w-75 dark:border-slate-700 dark:bg-[#101922] dark:text-white dark:hover:border-[#0a7ff5]/50',
                  !date && 'text-slate-400 dark:text-[#8fadcc]'
                )}
              >
                <CalendarIcon className='h-4 w-4 text-slate-400 dark:text-[#8fadcc]' />
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
              className='w-auto border-slate-200 bg-white p-0 dark:border-slate-700 dark:bg-[#182634]'
              align='start'
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
      )}

      {/* Staff Type Filter */}
      <div className='grid w-full gap-2 sm:w-auto'>
        <span className='text-xs font-medium text-slate-500 dark:text-slate-400'>
          Tipe Staff
        </span>
        <Select value={staffType} onValueChange={onStaffTypeChange}>
          <SelectTrigger className='w-full border-slate-300 bg-slate-50 text-slate-900 hover:border-blue-500/50 sm:w-45 dark:border-slate-700 dark:bg-[#101922] dark:text-white dark:hover:border-[#0a7ff5]/50'>
            <SelectValue placeholder='Semua Staff' />
          </SelectTrigger>
          <SelectContent className='border-slate-200 bg-white dark:border-slate-700 dark:bg-[#182634]'>
            <SelectItem
              value='ALL'
              className='text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'
            >
              Semua Staff
            </SelectItem>
            <SelectItem
              value='WORKER'
              className='text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'
            >
              Worker
            </SelectItem>
            <SelectItem
              value='DRIVER'
              className='text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700'
            >
              Driver
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
