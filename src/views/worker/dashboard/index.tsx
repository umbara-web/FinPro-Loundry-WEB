'use client';

import { AttendanceTimerCard } from '@/src/components/worker/attendance-timer-card';
import { WeeklyStatsCard } from '@/src/components/worker/weekly-stats-card';
import { OvertimeCard } from '@/src/components/worker/overtime-card';
import { TaskList } from '@/src/components/worker/task-list';

export function WorkerDashboardView() {
  return (
    <div className="flex flex-col gap-8">
      {/* Attendance Hero Section */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <AttendanceTimerCard />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <WeeklyStatsCard />
          <OvertimeCard />
        </div>
      </section>

      {/* Tasks Section */}
      <TaskList />

      {/* Footer */}
      <div className="mb-6 mt-12 text-center">
        <p className="text-xs text-slate-400 dark:text-slate-600">
          © {new Date().getFullYear()} CleanFlow Laundry Management System
        </p>
      </div>
    </div>
  );
}
