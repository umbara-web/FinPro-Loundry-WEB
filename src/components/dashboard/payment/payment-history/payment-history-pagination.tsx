import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  page: number;
  setPage: (p: number) => void;
  totalPages: number;
  totalItems: number;
  limit: number;
}

export function PaymentHistoryPagination({
  page,
  setPage,
  totalPages,
  totalItems,
  limit,
}: Props) {
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalItems);

  return (
    <div className='flex flex-col items-center justify-between gap-4 border-t border-[#233648] p-4 sm:flex-row'>
      <p className='text-sm text-[#92adc9]'>
        Menampilkan{' '}
        <span className='font-bold text-white'>
          {startItem}-{endItem}
        </span>{' '}
        dari <span className='font-bold text-white'>{totalItems}</span>{' '}
        transaksi
      </p>
      <div className='flex items-center gap-2'>
        <button
          className='flex h-8 w-8 items-center justify-center rounded-lg border border-[#233648] text-[#92adc9] transition-colors hover:bg-[#233648] hover:text-white disabled:opacity-50'
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <ChevronLeft className='text-[16px]' />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${
              page === p
                ? 'bg-primary text-white'
                : 'border border-[#233648] text-[#92adc9] hover:bg-[#233648] hover:text-white'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          className='flex h-8 w-8 items-center justify-center rounded-lg border border-[#233648] text-[#92adc9] transition-colors hover:bg-[#233648] hover:text-white disabled:opacity-50'
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
        >
          <ChevronRight className='text-[16px]' />
        </button>
      </div>
    </div>
  );
}
