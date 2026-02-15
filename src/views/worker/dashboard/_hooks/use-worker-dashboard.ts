'use client';

import { useState, useEffect } from 'react';
import { StationTask, StationType } from '@/src/views/worker/dashboard/_types';
import { useStationTasks } from '@/src/hooks/use-station-tasks';

export const useWorkerDashboard = () => {
  const [activeStation, setActiveStation] = useState<StationType>('WASHING');
  const [selectedTask, setSelectedTask] = useState<StationTask | null>(null);
  const [viewMode, setViewMode] = useState<'LIST' | 'DETAIL'>('LIST');
  const { data, isLoading, isError, error } = useStationTasks(activeStation);

  useEffect(() => {
    setSelectedTask(null);
    setViewMode('LIST');
  }, [activeStation]);

  const handleTaskSelect = (task: StationTask) => {
    setSelectedTask(task);
    setViewMode('DETAIL');
  };

  const handleBackToList = () => {
    setSelectedTask(null);
    setViewMode('LIST');
  };

  const handleStationChange = (station: StationType) => {
    setActiveStation(station);
  };

  useEffect(() => {
    if (!selectedTask && data?.mine && data.mine.length > 0) {
      const inProgressTask = data.mine.find((t) => t.status === 'IN_PROGRESS');
      if (inProgressTask) {
        setSelectedTask(inProgressTask);
      }
    }
  }, [data, selectedTask]);

  return {
    activeStation,
    selectedTask,
    viewMode,
    data,
    isLoading,
    isError,
    error,
    handleTaskSelect,
    handleBackToList,
    handleStationChange,
  };
};
