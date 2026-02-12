'use client';

import { useState, useEffect } from 'react';
import {
  TaskQueueSidebar,
  TaskDetailPanel,
} from '@/src/components/worker/station';
import { useStationTasks } from '@/src/hooks/use-station-tasks';
import { StationTask, StationType } from '@/src/types/station';
import clsx from 'clsx';

import { AlertCircle, ClipboardList } from 'lucide-react';

const STATION_TABS: { id: StationType; label: string; color: string }[] = [
  { id: 'WASHING', label: 'Cuci', color: '#3b82f6' },
  { id: 'IRONING', label: 'Setrika', color: '#f59e0b' },
  { id: 'PACKING', label: 'Packing', color: '#10b981' },
];

import { WorkerMobileNav } from '@/src/components/worker/station/worker-mobile-nav';

export function WorkerDashboardView() {
  const [activeStation, setActiveStation] = useState<StationType>('WASHING');
  const [selectedTask, setSelectedTask] = useState<StationTask | null>(null);
  const [viewMode, setViewMode] = useState<'LIST' | 'DETAIL'>('LIST');
  const { data, isLoading, isError, error } = useStationTasks(activeStation);

  useEffect(() => {
    setSelectedTask(null);
    setViewMode('LIST');
  }, [activeStation]);

  const handleTaskSelect = (task: StationTask) => {
    setSelectedTask(task);
    setViewMode('DETAIL');
  };

  const handleBackToList = () => {
    setSelectedTask(null);
    setViewMode('LIST');
  };

  useEffect(() => {
    if (!selectedTask && data?.mine && data.mine.length > 0) {
      const inProgressTask = data.mine.find((t) => t.status === 'IN_PROGRESS');
      if (inProgressTask) {
        setSelectedTask(inProgressTask);
      }
    }
  }, [data, selectedTask]);

  return (
    <>
      {isError ? (
        <div className='flex h-full w-full flex-col items-center justify-center bg-(--color-station-bg) p-6 text-center text-white'>
          <div className='mb-4 rounded-full bg-red-500/20 p-4 text-red-500'>
            <AlertCircle className='h-8 w-8' />
          </div>
          <h3 className='text-lg font-bold'>Gagal memuat data</h3>
          <p className='mt-2 text-sm text-(--color-station-text-muted)'>
            {(error as Error)?.message ||
              'Terjadi kesalahan saat mengambil data antrian.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className='mt-6 rounded-lg bg-(--color-station-primary) px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-600'
          >
            Coba Lagi
          </button>
        </div>
      ) : (
        <>
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
              onStationChange={setActiveStation}
            />
          </div>

          {/* Detail Panel: Visible on Desktop/Tablet Landscape OR Mobile Detail Mode */}
          {!isError && (
            <div
              className={clsx(
                'flex-1 flex-col overflow-hidden bg-(--color-station-bg) pb-20 lg:pb-0',
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
                  <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--color-station-surface) text-(--color-station-text-muted)'>
                    <ClipboardList className='h-8 w-8' />
                  </div>
                  <h3 className='text-lg font-bold text-white'>
                    Belum ada tugas dipilih
                  </h3>
                  <p className='mt-2 text-sm text-(--color-station-text-muted)'>
                    Silakan pilih tugas dari tab Antrean.
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Bottom Navigation (Mobile Only) - Station Switcher */}
      <WorkerMobileNav
        activeStation={activeStation}
        onStationChange={setActiveStation}
      />
    </>
  );
}
