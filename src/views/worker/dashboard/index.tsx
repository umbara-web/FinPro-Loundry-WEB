'use client';

import { useState, useEffect } from 'react';
import { TaskQueueSidebar, TaskDetailPanel } from '@/src/components/worker/station';
import { useStationTasks } from '@/src/hooks/use-station-tasks';
import { StationTask, StationType } from '@/src/types/station';
import clsx from 'clsx';

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

  // Reset selected task when station changes
  useEffect(() => {
    setSelectedTask(null);
    setViewMode('LIST');
  }, [activeStation]);

  // Handle task selection
  const handleTaskSelect = (task: StationTask) => {
    setSelectedTask(task);
    setViewMode('DETAIL');
  };

  // Back to list handler
  const handleBackToList = () => {
    setSelectedTask(null);
    setViewMode('LIST');
  };

  // Auto-select first in-progress task if none selected (Desktop only usually, but logic is shared)
  useEffect(() => {
    if (!selectedTask && data?.mine && data.mine.length > 0) {
      const inProgressTask = data.mine.find((t) => t.status === 'IN_PROGRESS');
      if (inProgressTask) {
        setSelectedTask(inProgressTask);
        // Do NOT auto-switch viewMode here to avoid jarring UX on load
      }
    }
  }, [data, selectedTask]);

  return (
    <>
      {/* Top Station Tabs - REMOVED for mobile, now driven by Bottom Nav */}

      {isError ? (
        <div className="flex h-full w-full flex-col items-center justify-center bg-[var(--color-station-bg)] p-6 text-center text-white">
          <div className="mb-4 rounded-full bg-red-500/20 p-4 text-red-500">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold">Gagal memuat data</h3>
          <p className="mt-2 text-sm text-[var(--color-station-text-muted)]">
            {(error as Error)?.message || 'Terjadi kesalahan saat mengambil data antrian.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-[var(--color-station-primary)] px-6 py-2 text-sm font-bold text-white hover:bg-blue-600 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      ) : (
        <>
          {/* Sidebar: Visible on Desktop/Tablet Landscape OR Mobile List Mode */}
          <div className={clsx(
            "flex-1 lg:flex-none lg:w-[380px] flex-col overflow-hidden pb-20 lg:pb-0",
            viewMode === 'DETAIL' ? 'hidden lg:flex' : 'flex'
          )}>
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
          {(!isError) && (
            <div className={clsx(
              "flex-1 flex-col overflow-hidden bg-[var(--color-station-bg)] pb-20 lg:pb-0",
              viewMode === 'LIST' ? 'hidden lg:flex' : 'flex'
            )}>
              {selectedTask ? (
                <TaskDetailPanel
                  task={selectedTask}
                  stationType={activeStation}
                  onBack={handleBackToList}
                />
              ) : (
                /* Empty State (Mobile & Desktop) */
                <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-station-surface)] text-[var(--color-station-text-muted)]">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white">Belum ada tugas dipilih</h3>
                  <p className="mt-2 text-sm text-[var(--color-station-text-muted)]">
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
