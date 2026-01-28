'use client';

import { useState, useEffect } from 'react';
import { Hand } from 'lucide-react';
import {
  StationTask,
  StationType,
  LAUNDRY_ITEMS,
  ItemCountData,
  getStationConfig,
} from '@/src/types/station';
import { ItemCounter } from './item-counter';
import { ValidationAlert } from './validation-alert';
import { ActionBar } from './action-bar';
import { useCompleteTask, useBypassRequest } from '@/src/hooks/use-station-tasks';
import clsx from 'clsx';

interface TaskDetailPanelProps {
  task: StationTask | null;
  stationType: StationType;
}

export function TaskDetailPanel({ task, stationType }: TaskDetailPanelProps) {
  const config = getStationConfig(stationType);
  const [itemCounts, setItemCounts] = useState<ItemCountData>({});
  const [showMismatchAlert, setShowMismatchAlert] = useState(false);

  const completeTask = useCompleteTask();
  const bypassRequest = useBypassRequest();

  // Reset counts when task changes
  useEffect(() => {
    if (task) {
      const initialCounts: ItemCountData = {};
      LAUNDRY_ITEMS.forEach((item) => {
        initialCounts[item.id] = 0;
      });
      setItemCounts(initialCounts);
      setShowMismatchAlert(false);
    }
  }, [task?.id]);

  // Calculate total items and progress
  const totalItems = Object.values(itemCounts).reduce((sum, count) => sum + count, 0);
  const expectedItems = task ? Math.round(task.weight * 3) : 0; // Rough estimate: 3 items per kg
  const progress = expectedItems > 0 ? Math.round((totalItems / expectedItems) * 100) : 0;

  // Check for mismatch (demo: show alert when items count is significant but doesn't match expected)
  useEffect(() => {
    if (totalItems > 0 && Math.abs(totalItems - expectedItems) > 5) {
      setShowMismatchAlert(true);
    } else {
      setShowMismatchAlert(false);
    }
  }, [totalItems, expectedItems]);

  const handleIncrement = (itemId: string) => {
    setItemCounts((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const handleDecrement = (itemId: string) => {
    setItemCounts((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  const handleComplete = () => {
    if (!task) return;
    completeTask.mutate({
      taskId: task.id,
      stationType,
      itemCounts,
    });
  };

  const handleBypassRequest = () => {
    if (!task) return;
    bypassRequest.mutate({
      taskId: task.id,
      stationType,
      reason: 'Weight mismatch',
    });
  };

  // Mobile placeholder when no task selected
  if (!task) {
    return (
      <div className="hidden flex-1 flex-col items-center justify-center bg-[--color-station-bg] p-8 text-center md:flex">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[--color-station-surface] text-[--color-station-text-muted]">
          <Hand className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-bold text-white">Pilih task</h3>
        <p className="mt-2 text-sm text-[--color-station-text-muted]">
          Klik pada card di daftar antrian untuk melihat detail.
          <br />
          Gunakan mode landscape untuk tampilan lebih baik.
        </p>
      </div>
    );
  }

  return (
    <main className="relative hidden flex-1 flex-col overflow-hidden md:flex">
      {/* Content Header */}
      <div className="p-6 pb-4 md:p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Proses Cucian #{task.invoiceNumber}
              </h2>
              <span
                className="rounded-md px-3 py-1 text-sm font-semibold"
                style={{
                  backgroundColor: `${config.color}20`,
                  color: config.color,
                }}
              >
                {task.serviceType} Wash
              </span>
            </div>
            <p className="text-base text-[--color-station-text-muted]">
              Input detail item cucian untuk verifikasi berat sebelum mencuci.
            </p>
          </div>
          <div className="hidden text-right xl:block">
            <p className="mb-1 text-sm text-[--color-station-text-muted]">
              Total Berat
            </p>
            <p className="font-mono text-2xl font-bold text-white">
              {task.weight}{' '}
              <span className="text-base text-[--color-station-text-muted]">
                kg
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Form Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 md:px-8">
        {/* Validation Alert */}
        {showMismatchAlert && (
          <div className="mb-8">
            <ValidationAlert
              title="Data tidak sesuai!"
              message={`Jumlah item yang diinput (${totalItems}) tidak sesuai dengan estimasi berat ${task.weight}kg.`}
              onBypassRequest={handleBypassRequest}
              isLoading={bypassRequest.isPending}
            />
          </div>
        )}

        {/* Item Input Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {LAUNDRY_ITEMS.map((item) => (
            <ItemCounter
              key={item.id}
              icon={item.icon}
              name={item.name}
              subtitle={item.subtitle}
              count={itemCounts[item.id] || 0}
              onIncrement={() => handleIncrement(item.id)}
              onDecrement={() => handleDecrement(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <ActionBar
        progress={progress}
        progressLabel={progress >= 100 ? 'Complete!' : 'Checking...'}
        onComplete={handleComplete}
        isLoading={completeTask.isPending}
      />
    </main>
  );
}
