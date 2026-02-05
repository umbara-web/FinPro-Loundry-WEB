'use client';

import { useState } from 'react';
import { Search, Hand } from 'lucide-react';
import { StationTask, StationType, getStationConfig } from '@/src/types/station';
import { TaskQueueCard } from './task-queue-card';
import { Input } from '@/src/components/ui/input';
import { useClaimTask } from '@/src/hooks/use-station-tasks';
import clsx from 'clsx';

interface StationTab {
  id: StationType;
  label: string;
  color: string;
}

interface TaskQueueSidebarProps {
  mineTasks: StationTask[];
  poolTasks: StationTask[];
  activeTaskId?: string;
  onTaskSelect: (task: StationTask) => void;
  stationType: StationType;
  isLoading?: boolean;
  stationTabs?: StationTab[];
  onStationChange?: (station: StationType) => void;
}

export function TaskQueueSidebar({
  mineTasks,
  poolTasks,
  activeTaskId,
  onTaskSelect,
  stationType,
  isLoading = false,
  stationTabs,
  onStationChange,
}: TaskQueueSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const config = getStationConfig(stationType);
  const claimMutation = useClaimTask();

  const filterTasks = (tasks: StationTask[]) => {
    if (!searchQuery) return tasks;
    const query = searchQuery.toLowerCase();
    return tasks.filter((task) => {
      const invoiceMatch = task.invoiceNumber.toLowerCase().includes(query);
      const customerMatch = task.customerName.toLowerCase().includes(query);
      const orderIdMatch = task.orderId.toLowerCase().includes(query);
      return invoiceMatch || customerMatch || orderIdMatch;
    });
  };

  const filteredMineTasks = filterTasks(mineTasks);
  const filteredPoolTasks = filterTasks(poolTasks);

  const handleClaimTask = (task: StationTask) => {
    claimMutation.mutate({ taskId: task.id, stationType });
  };

  return (
    <aside className="flex h-full w-full shrink-0 flex-col border-r border-[var(--color-station-border)] bg-[var(--color-station-bg)] md:w-[380px]">
      {/* Station Tabs (Desktop) */}
      {stationTabs && onStationChange && (
        <div className="hidden border-b border-[var(--color-station-border)] md:flex">
          {stationTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onStationChange(tab.id)}
              className={clsx(
                'flex-1 py-3 text-center text-sm font-semibold transition-colors',
                stationType === tab.id
                  ? 'border-b-2 text-white'
                  : 'text-[var(--color-station-text-muted)] hover:text-white'
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

      {/* Header with Search */}
      <div className="sticky top-0 z-10 flex flex-col gap-4 border-b border-[var(--color-station-border)] bg-[var(--color-station-bg)]/50 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">
              Stasiun {config.nameBahasa}
            </h2>
            <p className="text-sm text-[var(--color-station-text-muted)]">
              {filteredMineTasks.length} Aktif · {filteredPoolTasks.length} Tersedia
            </p>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--color-station-text-muted)]" />
          <Input 
            placeholder="Cari Invoice / Customer..." 
            className="w-full border-[var(--color-station-border)] bg-[var(--color-station-surface)] pl-9 text-white placeholder:text-[var(--color-station-text-muted)] focus-visible:ring-[var(--color-station-primary)]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Task Lists - Stacked Layout */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          // Loading skeletons
          <div className="space-y-3 p-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl bg-[var(--color-station-surface)] p-4"
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
          </div>
        ) : (
          <>
            {/* MY ACTIVE TASKS (Top Section) */}
            <div className="p-4">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20">
                  {filteredMineTasks.length}
                </span>
                Tugas Saya
              </h3>
              {filteredMineTasks.length === 0 ? (
                <div className="rounded-lg border border-dashed border-[var(--color-station-border)] bg-[var(--color-station-surface)]/50 p-4 text-center text-sm text-[var(--color-station-text-muted)]">
                  Tidak ada tugas aktif
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredMineTasks.map((task) => (
                    <TaskQueueCard
                      key={task.id}
                      task={task}
                      isActive={activeTaskId === task.id}
                      onClick={() => onTaskSelect(task)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="mx-4 border-t border-[var(--color-station-border)]" />

            {/* AVAILABLE TASKS (Bottom Section) */}
            <div className="p-4">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-amber-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20">
                  {filteredPoolTasks.length}
                </span>
                Antrean Outlet
              </h3>
              {filteredPoolTasks.length === 0 ? (
                <div className="rounded-lg border border-dashed border-[var(--color-station-border)] bg-[var(--color-station-surface)]/50 p-4 text-center text-sm text-[var(--color-station-text-muted)]">
                  Tidak ada tugas tersedia
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredPoolTasks.map((task) => (
                    <div key={task.id} className="relative">
                      <TaskQueueCard
                        task={task}
                        isActive={false}
                        onClick={() => {}}
                        isPoolTask
                      />
                      <button
                        onClick={() => handleClaimTask(task)}
                        disabled={claimMutation.isPending}
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-black transition-colors hover:bg-amber-400 disabled:opacity-50"
                      >
                        <Hand className="h-3.5 w-3.5" />
                        Ambil
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
