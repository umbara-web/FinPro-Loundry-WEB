'use client';

import { useState } from 'react';
import { Search, Hand } from 'lucide-react';
import {
  StationTask,
  StationType,
  getStationConfig,
} from '@/src/types/station';
import { TaskQueueCard } from './task-queue-card';
import { TaskQueueSkeleton } from './task-queue-skeleton';
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
    <aside className='flex h-full w-full shrink-0 flex-col border-r border-slate-200 bg-white lg:w-95 dark:border-slate-800 dark:bg-slate-900'>
      {/* Station Tabs (Desktop) */}
      {stationTabs && onStationChange && (
        <div className='hidden border-b border-slate-200 lg:flex dark:border-slate-800'>
          {stationTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onStationChange(tab.id)}
              className={clsx(
                'flex-1 py-3 text-center text-sm font-semibold transition-colors',
                stationType === tab.id
                  ? 'border-b-2 text-slate-900 dark:text-white'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
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
      <div className='sticky top-0 z-10 flex flex-col gap-4 border-b border-slate-200 bg-white/50 p-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-base font-bold text-slate-900 dark:text-white'>
              Stasiun {config.nameBahasa}
            </h2>
            <p className='text-sm text-slate-500 dark:text-slate-400'>
              {filteredMineTasks.length} Aktif · {filteredPoolTasks.length}{' '}
              Tersedia
            </p>
          </div>
        </div>

        <div className='relative'>
          <Search className='absolute top-2.5 left-2.5 h-4 w-4 text-slate-400' />
          <Input
            placeholder='Cari Invoice / Customer...'
            className='w-full border-slate-200 bg-slate-50 pl-9 text-slate-900 placeholder:text-slate-400 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Task Lists - Stacked Layout */}
      <div className='flex-1 overflow-y-auto'>
        {isLoading ? (
          <TaskQueueSkeleton />
        ) : (
          <>
            {/* MY ACTIVE TASKS (Top Section) */}
            <div className='p-4'>
              <h3 className='mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400'>
                <span className='flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20'>
                  {filteredMineTasks.length}
                </span>
                Tugas Saya
              </h3>
              {filteredMineTasks.length === 0 ? (
                <div className='rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400'>
                  Tidak ada tugas aktif
                </div>
              ) : (
                <div className='space-y-3'>
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
            <div className='mx-4 border-t border-slate-200 dark:border-slate-800' />

            {/* AVAILABLE TASKS (Bottom Section) */}
            <div className='p-4'>
              <h3 className='mb-3 flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400'>
                <span className='flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/20'>
                  {filteredPoolTasks.length}
                </span>
                Antrean Outlet
              </h3>
              {filteredPoolTasks.length === 0 ? (
                <div className='rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400'>
                  Tidak ada tugas tersedia
                </div>
              ) : (
                <div className='space-y-3'>
                  {filteredPoolTasks.map((task) => (
                    <div key={task.id} className='relative'>
                      <TaskQueueCard
                        task={task}
                        isActive={false}
                        onClick={() => { }}
                        isPoolTask
                      />
                      <button
                        onClick={() => handleClaimTask(task)}
                        disabled={claimMutation.isPending}
                        className='absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-amber-600 disabled:opacity-50 dark:text-black dark:hover:bg-amber-400'
                      >
                        <Hand className='h-3.5 w-3.5' />
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
