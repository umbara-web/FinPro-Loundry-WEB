'use client';

import {
  TaskQueueSidebar,
  TaskDetailPanel,
  WorkerMobileNav,
} from '@/src/views/Worker/Dashboard/_components';
import { useWorkerDashboard } from '@/src/views/Worker/Dashboard/_hooks/use-worker-dashboard';
import { StationType } from '@/src/views/Worker/Dashboard/_types';
import clsx from 'clsx';
import { AlertCircle, ClipboardList } from 'lucide-react';

const STATION_TABS: { id: StationType; label: string; color: string }[] = [
  { id: 'WASHING', label: 'Cuci', color: '#3b82f6' },
  { id: 'IRONING', label: 'Setrika', color: '#f59e0b' },
  { id: 'PACKING', label: 'Packing', color: '#10b981' },
];

export function WorkerDashboardView() {
  const {
    activeStation,
    selectedTask,
    viewMode,
    data,
    isLoading,
    isError,
    error,
    handleTaskSelect,
    handleBackToList,
    handleStationChange,
  } = useWorkerDashboard();

  return (
    <>
      {isError ? (
        <div className='flex h-full w-full flex-col items-center justify-center bg-slate-50 p-6 text-center text-slate-900 dark:bg-slate-900 dark:text-white'>
          <div className='mb-4 rounded-full bg-red-100 p-4 text-red-500 dark:bg-red-900/20'>
            <AlertCircle className='h-8 w-8' />
          </div>
          <h3 className='text-lg font-bold'>Gagal memuat data</h3>
          <p className='mt-2 text-sm text-slate-500 dark:text-slate-400'>
            {(error as Error)?.message ||
              'Terjadi kesalahan saat mengambil data antrian.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className='mt-6 rounded-lg bg-blue-600 px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700'
          >
            Coba Lagi
          </button>
        </div>
      ) : (
        <div className='flex h-full w-full flex-row overflow-hidden'>
          {/* Sidebar: Visible on Desktop/Tablet Landscape OR Mobile List Mode */}
          <div
            className={clsx(
              'flex-1 flex-col overflow-hidden pb-20 lg:w-95 lg:flex-none lg:pb-0',
              viewMode === 'DETAIL' ? 'hidden lg:flex' : 'flex'
            )}
          >
            <TaskQueueSidebar
              mineTasks={data?.mine || []}
              poolTasks={data?.pool || []}
              activeTaskId={selectedTask?.id}
              onTaskSelect={handleTaskSelect}
              stationType={activeStation}
              isLoading={isLoading}
              stationTabs={STATION_TABS}
              onStationChange={handleStationChange}
            />
          </div>

          {/* Detail Panel: Visible on Desktop/Tablet Landscape OR Mobile Detail Mode */}
          {!isError && (
            <div
              className={clsx(
                'flex-1 flex-col overflow-hidden bg-slate-50 pb-20 lg:pb-0 dark:bg-slate-900',
                viewMode === 'LIST' ? 'hidden lg:flex' : 'flex'
              )}
            >
              {selectedTask ? (
                <TaskDetailPanel
                  task={selectedTask}
                  stationType={activeStation}
                  onBack={handleBackToList}
                />
              ) : (
                /* Empty State (Mobile & Desktop) */
                <div className='flex flex-1 flex-col items-center justify-center p-8 text-center'>
                  <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500'>
                    <ClipboardList className='h-8 w-8' />
                  </div>
                  <h3 className='text-lg font-bold text-slate-900 dark:text-white'>
                    Belum ada tugas dipilih
                  </h3>
                  <p className='mt-2 text-sm text-slate-500 dark:text-slate-400'>
                    Silakan pilih tugas dari tab Antrean.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Bottom Navigation (Mobile Only) - Station Switcher */}
      <WorkerMobileNav
        activeStation={activeStation}
        onStationChange={handleStationChange}
      />
    </>
  );
}
