'use client';

import { useState } from 'react';
import { TaskCard, Task } from './task-card';
import clsx from 'clsx';

// Mock data - replace with real API data when available
const mockTasks: Task[] = [
  {
    id: '1',
    orderNumber: '4023',
    title: 'Premium Wash',
    priority: 'urgent',
    weight: '5.0 kg',
    items: '12 pcs',
    dueTime: '2:00 PM',
    notes: 'Use organic detergent only.',
    arrivedAgo: '10m ago',
    isStarted: true,
  },
  {
    id: '2',
    orderNumber: '4025',
    title: 'Dry Clean Only',
    priority: 'standard',
    weight: null,
    items: '2 Suits',
    dueTime: 'Tomorrow',
    notes: 'Separate by color before start.',
    arrivedAgo: '25m ago',
    isStarted: false,
  },
  {
    id: '3',
    orderNumber: '4100',
    title: 'Bulk Bedding',
    priority: 'standard',
    weight: '12.5 kg',
    items: '20 pcs',
    dueTime: '4:00 PM',
    notes: 'High temperature wash requested.',
    arrivedAgo: '1h ago',
    isStarted: false,
  },
];

const filters = [
  { id: 'all', label: 'All Tasks' },
  { id: 'urgent', label: 'High Priority' },
  { id: 'standard', label: 'Standard' },
  { id: 'delicate', label: 'Delicates' },
];

export function TaskList() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTasks =
    activeFilter === 'all'
      ? mockTasks
      : mockTasks.filter((task) => task.priority === activeFilter);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Incoming Tasks
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Washing Station Queue
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex max-w-full self-start overflow-x-auto rounded-lg bg-slate-100 p-1 sm:self-auto dark:bg-slate-800">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={clsx(
                'whitespace-nowrap rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
                activeFilter === filter.id
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStart={() => console.log('Start task', task.id)}
            onAccept={() => console.log('Accept task', task.id)}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-12 text-center dark:border-slate-700">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            No tasks found for this filter.
          </p>
        </div>
      )}
    </section>
  );
}
