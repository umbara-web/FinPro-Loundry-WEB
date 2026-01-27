'use client';

import { ArrowRight, AlertTriangle, Info, Droplet, Tag } from 'lucide-react';
import clsx from 'clsx';

export interface Task {
  id: string;
  orderNumber: string;
  title: string;
  priority: 'urgent' | 'standard' | 'delicate';
  weight: string | null;
  items: string;
  dueTime: string;
  notes: string;
  arrivedAgo: string;
  isStarted?: boolean;
}

interface TaskCardProps {
  task: Task;
  onStart?: () => void;
  onAccept?: () => void;
}

const priorityConfig = {
  urgent: {
    label: 'Urgent',
    icon: AlertTriangle,
    bgClass: 'bg-red-50 dark:bg-red-900/20',
    textClass: 'text-red-600 dark:text-red-400',
    borderClass: 'border-red-100 dark:border-red-800',
  },
  standard: {
    label: 'Standard',
    icon: null,
    bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    textClass: 'text-blue-600 dark:text-blue-400',
    borderClass: 'border-blue-100 dark:border-blue-800',
  },
  delicate: {
    label: 'Delicate',
    icon: null,
    bgClass: 'bg-purple-50 dark:bg-purple-900/20',
    textClass: 'text-purple-600 dark:text-purple-400',
    borderClass: 'border-purple-100 dark:border-purple-800',
  },
};

const noteIcons: Record<string, React.ElementType> = {
  organic: Info,
  color: Tag,
  temperature: Droplet,
};

export function TaskCard({ task, onStart, onAccept }: TaskCardProps) {
  const priority = priorityConfig[task.priority];
  const PriorityIcon = priority.icon;

  return (
    <div className="group flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-teal-500/30 hover:shadow-md dark:border-slate-800 dark:bg-[#151a1f]">
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Order #{task.orderNumber}
            </span>
            <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              {task.title}
            </h3>
          </div>
          <span
            className={clsx(
              'flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold',
              priority.bgClass,
              priority.textClass,
              priority.borderClass
            )}
          >
            {PriorityIcon && <PriorityIcon className="h-3.5 w-3.5" />}
            {priority.label}
          </span>
        </div>

        <div className="my-1 flex gap-4 border-y border-slate-50 py-3 dark:border-slate-800/50">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase text-slate-400">
              Weight
            </span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {task.weight || '--'}
            </span>
          </div>
          <div className="w-px bg-slate-100 dark:bg-slate-800"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase text-slate-400">
              Items
            </span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {task.items}
            </span>
          </div>
          <div className="w-px bg-slate-100 dark:bg-slate-800"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase text-slate-400">
              Due
            </span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {task.dueTime}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Info className="h-4 w-4" />
          <span>{task.notes}</span>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-b-xl border-t border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/30">
        <span className="text-xs font-medium text-slate-400">
          Arrived {task.arrivedAgo}
        </span>
        {task.isStarted ? (
          <button
            onClick={onStart}
            className="flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-teal-600"
          >
            Start Process <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={onAccept}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
          >
            Accept
          </button>
        )}
      </div>
    </div>
  );
}
