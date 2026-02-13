'use client';

import { useDriverHistory } from './_hooks/useDriverHistory';
import { HistoryHeader } from './_components/HistoryHeader';
import { HistoryStats } from './_components/HistoryStats';
import { HistoryFilter } from './_components/HistoryFilter';
import { HistoryList } from './_components/HistoryList';
import { HistoryPagination } from './_components/HistoryPagination';

export function DriverHistoryView() {
  const {
    jobs,
    loading,
    filter,
    setFilter,
    page,
    setPage,
    totalPages,
    filteredJobs,
  } = useDriverHistory();

  return (
    <div className='min-h-full bg-slate-50 text-slate-900 dark:bg-[#101922] dark:text-white'>
      <HistoryHeader totalJobs={jobs.length} />

      <main className='mx-auto max-w-300 px-4 py-8 md:px-10'>
        <HistoryStats totalJobs={jobs.length} />

        <HistoryFilter filter={filter} setFilter={setFilter} />

        <HistoryList loading={loading} jobs={filteredJobs} />

        <HistoryPagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </main>
    </div>
  );
}
