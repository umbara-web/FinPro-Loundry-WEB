import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import {
  Search,
  Calendar as CalendarIcon,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useDebounce } from '@/src/hooks/use-debounce';
import { useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover';
import { Calendar } from '@/src/components/ui/calendar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';

interface OrderFiltersProps {
  onSearchChange: (value: string) => void;
  onStatusChange: (status: string) => void;
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  onDateChange: (dateFrom: Date | undefined, dateTo: Date | undefined) => void;
}

const STATUS_FILTERS = [
  { label: 'Semua', value: '' },
  { label: 'Pesanan Baru', value: 'CREATED' },
  { label: 'Menunggu Bayar', value: 'WAITING_PAYMENT' },
  { label: 'Proses', value: 'ongoing' }, // Simplified group for washing/ironing/packing
  { label: 'Dikirim', value: 'shipping' },
  { label: 'Selesai', value: 'completed' },
  { label: 'Batal', value: 'cancelled' },
];

export function OrderFilters({
  onSearchChange,
  onStatusChange,
  onSortChange,
  onDateChange,
}: OrderFiltersProps) {
  const [searchValue, setSearchValue] = useState('');
  const [activeStatus, setActiveStatus] = useState('');
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  const handleStatusClick = (status: string) => {
    setActiveStatus(status);
    onStatusChange(status);
  };

  const handleDateSelect = (range: DateRange | undefined) => {
    setDate(range);
    onDateChange(range?.from, range?.to);
  };

  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDate(undefined);
    onDateChange(undefined, undefined);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        {/* Search Bar */}
        <div className='w-full md:max-w-md'>
          <div className='group relative flex w-full items-center'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <Search className='text-gray-400 group-focus-within:text-blue-600' />
            </div>
            <Input
              className='py-2.5 pr-3 pl-10 dark:bg-[#233648]'
              placeholder='Cari ID Pesanan...'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        {/* Sort/Date Actions */}
        <div className='flex w-full cursor-pointer gap-2 overflow-x-auto md:w-auto'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={`flex cursor-pointer items-center gap-2 whitespace-nowrap ${
                  date
                    ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-900/20'
                    : ''
                }`}
              >
                <CalendarIcon className='text-lg' />
                <span>
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'dd MMM', { locale: id })} -{' '}
                        {format(date.to, 'dd MMM', { locale: id })}
                      </>
                    ) : (
                      format(date.from, 'dd MMM', { locale: id })
                    )
                  ) : (
                    'Tanggal'
                  )}
                </span>
                {date && (
                  <div
                    role='button'
                    onClick={clearDate}
                    className='ml-1 rounded-full p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800'
                  >
                    <X className='h-3 w-3' />
                  </div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='end'>
              <Calendar
                initialFocus
                mode='range'
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleDateSelect}
                numberOfMonths={2}
                locale={id}
              />
            </PopoverContent>
          </Popover>

          <Button
            variant='outline'
            className='flex cursor-pointer items-center gap-2 whitespace-nowrap'
            onClick={() => onSortChange('created_at', 'desc')}
          >
            <SlidersHorizontal className='text-lg' />
            <span>Urutkan</span>
          </Button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className='scrollbar-hide flex cursor-pointer gap-2 overflow-x-auto pb-2'>
        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => handleStatusClick(filter.value)}
            className={`flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
              activeStatus === filter.value
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:scale-105'
                : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-transparent dark:bg-[#233648] dark:text-[#92adc9] dark:hover:bg-[#2c3f52]'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
