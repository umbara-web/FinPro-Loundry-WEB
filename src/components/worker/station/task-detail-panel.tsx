'use client';

import { useState, useEffect, useMemo } from 'react';
import { Hand, ArrowLeft } from 'lucide-react';
import {
  StationTask,
  StationType,
  ItemCountData,
  getStationConfig,
} from '@/src/types/station';
import { ItemCounter } from './item-counter';
import { ActionBar } from './action-bar';
import { TaskHeader } from '@/src/components/worker/detail/task-header';
import {
  useCompleteTask,
  useBypassRequest,
} from '@/src/hooks/use-station-tasks';
import { useLaundryItems } from '@/src/hooks/use-master-data';

interface TaskDetailPanelProps {
  task: StationTask | null;
  stationType: StationType;
  onBack?: () => void;
}

export function TaskDetailPanel({
  task,
  stationType,
  onBack,
}: TaskDetailPanelProps) {
  const config = getStationConfig(stationType);
  const [itemCounts, setItemCounts] = useState<ItemCountData>({});
  const [showMismatchAlert, setShowMismatchAlert] = useState(false);

  const completeTask = useCompleteTask();
  const bypassRequest = useBypassRequest();
  const { data: laundryItems = [] } = useLaundryItems();

  useEffect(() => {
    if (task && laundryItems.length > 0) {
      const initialCounts: ItemCountData = {};
      laundryItems.forEach((item) => {
        initialCounts[item.id] = 0;
      });
      setItemCounts(initialCounts);
      setShowMismatchAlert(false);
    }
  }, [task?.id, laundryItems]);

  const expectedCountsMap = useMemo(() => {
    const map: Record<string, number> = {};
    task?.items?.forEach((item) => {
      map[item.id] = item.qty;
    });
    return map;
  }, [task?.items]);

  const sortedLaundryItems = useMemo(() => {
    return [...laundryItems].sort((a, b) => {
      const aHasTarget = (expectedCountsMap[a.id] || 0) > 0;
      const bHasTarget = (expectedCountsMap[b.id] || 0) > 0;
      if (aHasTarget && !bHasTarget) return -1;
      if (!aHasTarget && bHasTarget) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [laundryItems, expectedCountsMap]);

  const totalItems = Object.values(itemCounts).reduce(
    (sum, count) => sum + count,
    0
  );
  const expectedTotal =
    task?.items?.reduce((sum, item) => sum + item.qty, 0) || 0;
  const progress =
    expectedTotal > 0 ? Math.round((totalItems / expectedTotal) * 100) : 0;

  const isInputEmpty = totalItems === 0;

  useEffect(() => {
    if (!task || totalItems === 0) {
      setShowMismatchAlert(false);
      return;
    }

    let hasMismatch = false;

    for (const item of task.items || []) {
      const inputCount = itemCounts[item.id] || 0;
      if (inputCount !== item.qty) {
        hasMismatch = true;
        break;
      }
    }

    if (!hasMismatch) {
      for (const [itemId, count] of Object.entries(itemCounts)) {
        if (count > 0 && !expectedCountsMap[itemId]) {
          hasMismatch = true;
          break;
        }
      }
    }

    setShowMismatchAlert(hasMismatch);
  }, [itemCounts, task, expectedCountsMap, totalItems]);

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

  const handleChange = (itemId: string, value: number) => {
    setItemCounts((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const handleReset = (itemId: string) => {
    setItemCounts((prev) => ({
      ...prev,
      [itemId]: 0,
    }));
  };

  const handleResetAll = () => {
    const resetCounts: ItemCountData = {};
    laundryItems.forEach((item) => {
      resetCounts[item.id] = 0;
    });
    setItemCounts(resetCounts);
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
      reason: 'Item count mismatch',
    });
  };

  if (!task) {
    return (
      <div className='hidden flex-1 flex-col items-center justify-center bg-slate-50 p-8 text-center md:flex dark:bg-slate-900'>
        <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500'>
          <Hand className='h-8 w-8' />
        </div>
        <h3 className='text-lg font-bold text-slate-900 dark:text-white'>Pilih task</h3>
        <p className='mt-2 text-sm text-slate-500 dark:text-slate-400'>
          Klik pada card di daftar antrian untuk melihat detail.
          <br />
          Gunakan mode landscape untuk tampilan lebih baik.
        </p>
      </div>
    );
  }

  return (
    <main className='relative flex flex-1 flex-col overflow-hidden'>
      {/* Content Header */}
      <TaskHeader
        task={task}
        config={config}
        expectedTotal={expectedTotal}
        onBack={onBack}
      />

      {/* Scrollable Form Area */}
      <div
        className={`flex-1 overflow-y-auto px-6 md:px-8 ${showMismatchAlert ? 'pb-56' : 'pb-44'}`}
      >
        {/* Item Input Grid */}
        <div className='grid grid-cols-1 gap-4'>
          {sortedLaundryItems.map((item, index) => {
            return (
              <ItemCounter
                key={item.id}
                index={index + 1}
                name={item.name}
                count={itemCounts[item.id] || 0}
                expectedCount={expectedCountsMap[item.id]}
                onIncrement={() => handleIncrement(item.id)}
                onDecrement={() => handleDecrement(item.id)}
                onChange={(value) => handleChange(item.id, value)}
                onReset={() => handleReset(item.id)}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <ActionBar
        currentCount={totalItems}
        targetCount={expectedTotal}
        hasMismatch={showMismatchAlert}
        onComplete={showMismatchAlert ? handleBypassRequest : handleComplete}
        onResetAll={handleResetAll}
        isLoading={
          showMismatchAlert ? bypassRequest.isPending : completeTask.isPending
        }
        isDisabled={isInputEmpty}
        variant={showMismatchAlert && !isInputEmpty ? 'warning' : 'primary'}
        actionLabel={
          showMismatchAlert && !isInputEmpty ? 'Request Bypass' : 'Selesai'
        }
        message={
          showMismatchAlert && !isInputEmpty
            ? 'Data tidak sesuai! Jumlah item tidak cocok dengan order.'
            : undefined
        }
      />
    </main>
  );
}
