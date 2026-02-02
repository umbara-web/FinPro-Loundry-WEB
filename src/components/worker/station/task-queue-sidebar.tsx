'use client';

import { Filter } from 'lucide-react';
import { StationTask, StationType, getStationConfig } from '@/src/types/station';
import { TaskQueueCard } from './task-queue-card';
import clsx from 'clsx';

interface StationTab {
  id: StationType;
  label: string;
  color: string;
}

interface TaskQueueSidebarProps {
  tasks: StationTask[];
  activeTaskId?: string;
  onTaskSelect: (task: StationTask) => void;
  stationType: StationType;
  isLoading?: boolean;
  stationTabs?: StationTab[];
  onStationChange?: (station: StationType) => void;
}

export function TaskQueueSidebar({
  tasks,
  activeTaskId,
  onTaskSelect,
  stationType,
  isLoading = false,
  stationTabs,
  onStationChange,
}: TaskQueueSidebarProps) {
  const config = getStationConfig(stationType);
  const pendingCount = tasks.filter((t) => t.status === 'WAITING').length;

  return (
    <aside className="flex h-full w-full shrink-0 flex-col border-r border-[--color-station-border] bg-[--color-station-bg] md:w-[380px]">
      {/* Station Tabs (Desktop) */}
      {stationTabs && onStationChange && (
        <div className="hidden border-b border-[--color-station-border] md:flex">
          {stationTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onStationChange(tab.id)}
              className={clsx(
                'flex-1 py-3 text-center text-sm font-semibold transition-colors',
                stationType === tab.id
                  ? 'border-b-2 text-white'
                  : 'text-[--color-station-text-muted] hover:text-white'
              )}
              style={{
                borderColor: stationType === tab.id ? tab.color : 'transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[--color-station-border] bg-[--color-station-bg]/50 p-4 backdrop-blur-sm">
        <div>
          <h2 className="text-base font-bold text-white">
            Antrian {config.nameBahasa}
          </h2>
          <p className="text-sm text-[--color-station-text-muted]">
            {pendingCount} Pending Jobs
          </p>
        </div>
        <button className="text-[--color-station-text-muted] transition-colors hover:text-white">
          <Filter className="h-5 w-5" />
        </button>
      </div>

      {/* Task List */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {isLoading ? (
          // Loading skeletons
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl bg-[--color-station-surface] p-4"
              >
                <div className="mb-3 flex justify-between">
                  <div className="h-6 w-24 rounded-full bg-slate-700" />
                  <div className="h-4 w-16 rounded bg-slate-700" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-700" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 rounded bg-slate-700" />
                    <div className="h-3 w-32 rounded bg-slate-700" />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : tasks.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[--color-station-surface] text-[--color-station-text-muted]">
              <Filter className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Tidak ada antrian</h3>
            <p className="mt-2 text-sm text-[--color-station-text-muted]">
              Semua task sudah selesai diproses
            </p>
          </div>
        ) : (
          // Task cards
          tasks.map((task) => (
            <TaskQueueCard
              key={task.id}
              task={task}
              isActive={activeTaskId === task.id}
              onClick={() => onTaskSelect(task)}
            />
          ))
        )}
      </div>
    </aside>
  );
}
