'use client';

import { useWorkerHistory } from './_hooks/use-worker-history';
import { HistoryHeader } from './_components/HistoryHeader';
import { HistoryStats } from './_components/HistoryStats';
import { FilterBar } from './_components/FilterBar';
import { HistoryList } from './_components/HistoryList';
import { HistoryPagination } from './_components/HistoryPagination';

export function WorkerHistoryView() {
  const {
    jobs,
    loading,
    page,
    totalPages,
    setPage,
    selectedPreset,
    date,
    taskType,
    handlePresetChange,
    handleCustomDateChange,
    handleTaskTypeChange,
  } = useWorkerHistory();

  return (
    <div className='flex flex-1 flex-col overflow-y-auto bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white'>
      {/* Header */}
      <HistoryHeader jobCount={jobs.length} />

      <main className='w-full px-4 py-8 md:px-10'>
        {/* Filter Bar */}
        <FilterBar
          date={date}
          onDateChange={handleCustomDateChange}
          taskType={taskType}
          onTaskTypeChange={handleTaskTypeChange}
          selectedPreset={selectedPreset}
          onPresetChange={handlePresetChange}
        />

        {/* Stats Summary */}
        <HistoryStats jobCount={jobs.length} />

        {/* Job History List */}
        <HistoryList jobs={jobs} loading={loading} />

        {/* Pagination */}
        <HistoryPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </main>
    </div>
  );
}
