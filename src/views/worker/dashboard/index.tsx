'use client';

import { useState, useEffect } from 'react';
import { TaskQueueSidebar, TaskDetailPanel } from '@/src/components/worker/station';
import { useStationTasks } from '@/src/hooks/use-station-tasks';
import { StationTask, StationType } from '@/src/types/station';

export function WorkerDashboardView() {
  // Station type - can be made dynamic based on user assignment
  const stationType: StationType = 'WASHING';

  const [selectedTask, setSelectedTask] = useState<StationTask | null>(null);
  const { data: tasks, isLoading } = useStationTasks(stationType);

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
      <TaskQueueSidebar
        tasks={tasks || []}
        activeTaskId={selectedTask?.id}
        onTaskSelect={setSelectedTask}
        stationType={stationType}
        isLoading={isLoading}
      />
      <TaskDetailPanel task={selectedTask} stationType={stationType} />

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
