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

export function WorkerDashboardView() {
  const [activeStation, setActiveStation] = useState<StationType>('WASHING');
  const [selectedTask, setSelectedTask] = useState<StationTask | null>(null);
  const { data: tasks, isLoading } = useStationTasks(activeStation);

  // Reset selected task when station changes
  useEffect(() => {
    setSelectedTask(null);
  }, [activeStation]);

  // Auto-select first in-progress task if none selected
  useEffect(() => {
    if (!selectedTask && tasks && tasks.length > 0) {
      const inProgressTask = tasks.find((t) => t.status === 'IN_PROGRESS');
      if (inProgressTask) {
        setSelectedTask(inProgressTask);
      }
    }
  }, [tasks, selectedTask]);

  return (
    <>
      {/* Station Selector Tabs */}
      <div className="flex border-b border-[--color-station-border] bg-[--color-station-surface] md:hidden">
        {STATION_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveStation(tab.id)}
            className={clsx(
              'flex-1 py-3 text-center text-sm font-semibold transition-colors',
              activeStation === tab.id
                ? 'border-b-2 text-white'
                : 'text-[--color-station-text-muted] hover:text-white'
            )}
            style={{
              borderColor: activeStation === tab.id ? tab.color : 'transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <TaskQueueSidebar
        tasks={tasks || []}
        activeTaskId={selectedTask?.id}
        onTaskSelect={setSelectedTask}
        stationType={activeStation}
        isLoading={isLoading}
        stationTabs={STATION_TABS}
        onStationChange={setActiveStation}
      />
      <TaskDetailPanel task={selectedTask} stationType={activeStation} />

      {/* Mobile placeholder - shows instead of TaskDetailPanel on small screens */}
      <div className="flex flex-1 flex-col items-center justify-center bg-[--color-station-bg] p-8 text-center md:hidden">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[--color-station-surface] text-[--color-station-text-muted]">
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white">Pilih task</h3>
        <p className="mt-2 text-sm text-[--color-station-text-muted]">
          Ketuk card di daftar untuk melihat detail.
          <br />
          Gunakan mode landscape untuk tampilan lebih baik.
        </p>
      </div>
    </>
  );
}
