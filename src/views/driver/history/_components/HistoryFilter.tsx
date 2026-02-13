interface HistoryFilterProps {
  filter: 'all' | 'pickup' | 'delivery';
  setFilter: (filter: 'all' | 'pickup' | 'delivery') => void;
}

export const HistoryFilter = ({ filter, setFilter }: HistoryFilterProps) => {
  return (
    <div className='mb-6 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-[#1a2632]'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='flex flex-wrap items-center gap-4'>
          <div className='flex flex-col gap-1.5'>
            <span className='text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400'>
              Filter Type
            </span>
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as 'all' | 'pickup' | 'delivery')
              }
              className='min-w-40 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-600 dark:bg-[#101922] dark:text-white dark:focus:border-blue-500'
            >
              <option value='all'>Semua</option>
              <option value='pickup'>Jemput</option>
              <option value='delivery'>Antar</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
